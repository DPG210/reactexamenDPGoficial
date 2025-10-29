import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'

export default class Personajes extends Component {

    url = Global.urlSeries

    state = {
        personajes: []
    }


    loadPersonajes = () => {
        let serie = this.props.serie
        var request = "api/series/personajesserie/" + serie

        axios.get(this.url + request).then(response => {
            console.log("Cargando personajes")
            console.log(response.data)
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes()
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (<tr key={index}>
                                    <td>{personaje.nombre}</td>
                                    <td>
                                        <img src={personaje.imagen} style={{ width: "50px", height: "50px" }}></img>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
