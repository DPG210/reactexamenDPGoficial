import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class ModificarPersonaje extends Component {

    url = Global.urlSeries

    state = {
        series: [],
        personajes: [],
        pag: false
    }

    loadSeries = () => {
        var request = "api/series";
        axios.get(this.url + request).then(response => {
            console.log("Cargando las series");
            this.setState({
                series: response.data
            })
        })
    }

    loadPersonajes = () => {
        var request = "api/personajes"

        axios.get(this.url + request).then(response => {
            console.log("Cargando personajes")
            this.setState({
                personajes: response.data
            })
        })
    }

    moverPersonaje = (event) => {
        event.preventDefault();

        var serie = this.selectSerie.current.value
        var personaje = this.selectNombre.current.value

        var request = "api/personajes/" + personaje + "/" + serie;

        axios.put(this.url + request).then(response => {
            console.log("Cambiado")
            this.setState({
                pag: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes()
    }

    selectNombre = React.createRef();
    selectSerie = React.createRef();

    render() {
        return (
            <div>
                {
                    this.state.pag === true &&
                    <Navigate to={"/personajes/" + this.selectSerie.current.value}></Navigate>
                }
                <h1>Modificar personaje</h1>
                <select ref={this.selectNombre} className='form-control'>
                    {
                        this.state.personajes.map((personaje, index) => {
                            return (<option key={index} value={personaje.idPersonaje}>
                                {personaje.nombre}
                            </option>)
                        })
                    }
                </select><br></br>
                <select ref={this.selectSerie} className='form-control'>
                    {
                        this.state.series.map((serie, index) => {
                            return (<option key={index} value={serie.idSerie}>
                                {serie.nombre}
                            </option>)
                        })
                    }
                </select><br></br>
                <button onClick={this.moverPersonaje}>Guardar cambios</button>
            </div>
        )
    }
}
