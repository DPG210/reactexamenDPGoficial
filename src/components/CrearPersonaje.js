import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class CrearPersonaje extends Component {

    url = Global.urlSeries

    state = {
        series: [],
        personajes: false
    }

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    loadSeries = () => {
        var request = "api/series";
        axios.get(this.url + request).then(response => {
            console.log("Cargando las series");
            this.setState({
                series: response.data
            })
        })
    }
    crearPersonaje = (event) => {
        event.preventDefault();
        var request = "api/personajes"

        var personaje = {
            idPersonaje: 1,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        }

        axios.post(this.url + request, personaje).then(response => {
            console.log("Creando")
            this.setState({
                personajes: true
            })
        })
    }
    componentDidMount = () => {
        this.loadSeries()
    }

    render() {
        return (
            <div>
                {
                    this.state.personajes === true &&
                    <Navigate to={"/personajes/" + this.selectSerie.current.value}></Navigate>
                }
                <h1>Crear Personaje</h1>
                <form>
                    <label>Nombre</label><br></br>
                    <input type='text' ref={this.cajaNombre} className='form-control'></input><br></br>
                    <label>Imagen</label><br></br>
                    <input type='text' ref={this.cajaImagen} className='form-control'></input><br></br>
                    <label>Serie</label><br></br>
                    <select ref={this.selectSerie} className='form-control'>
                        {
                            this.state.series.map((serie, index) => {
                                return (<option key={index} value={serie.idSerie}>
                                    {serie.nombre}
                                </option>)
                            })
                        }
                    </select><br></br>
                    <button onClick={this.crearPersonaje}>Crear Personaje</button>
                </form>
            </div>
        )
    }
}
