import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class MenuRutas extends Component {
    url = Global.urlSeries;

    state = {
        series: []
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
    componentDidMount = () => {
        this.loadSeries()
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Navigate className="navbar-brand" to="#">Navbar</Navigate>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to="/crear" className="nav-link" aria-current="page">Crear Personaje</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to="/modificar" className="nav-link" aria-current="page">Modificar Personaje</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Series
                                    </a>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.series.map((series, index) => {
                                                return (<NavLink key={index} className='dropdown-item' to={"/series/" + series.idSerie}>
                                                    {series.nombre}
                                                </NavLink>)
                                            })
                                        }
                                    </ul>
                                </li>
                                <li className="nav-item">
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
