import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


export default class Series extends Component {

    url = Global.urlSeries;

    state = {
        serie: [],
        personajes: false
    }

    loadSeries = () => {
        var idserie = this.props.idserie
        var request = "api/series/" + idserie

        axios.get(this.url + request).then(response => {
            console.log(response.data)
            this.setState({
                serie: response.data
            })
        })
    }

    cargarPersonajes = () => {
        this.setState({
            personajes: true
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }
    componentDidUpdate = (oldProps) => {
        if (oldProps.idserie != this.props.idserie) {
            this.loadSeries()
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.personajes === true &&
                    <Navigate to={"/personajes/" + this.state.serie.idSerie}></Navigate>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Puntuacion</th>
                            <th>Año</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{this.state.serie.nombre}</td>
                                <td>
                                    <img src={this.state.serie.imagen} style={{ width: "50px", height: "50px" }}></img>
                                </td>
                                <td>{this.state.serie.puntuacion}</td>
                                <td>{this.state.serie.año}</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <button onClick={this.cargarPersonajes}>Personajes</button>
            </div>
        )
    }
}
