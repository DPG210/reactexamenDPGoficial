import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import MenuRutas from './MenuRutas'
import Home from './Home'
import Series from './Series'
import Personajes from './Personajes'
import CrearPersonaje from './CrearPersonaje'
import ModificarPersonaje from './ModificarPersonaje'

export default class Router extends Component {
    render() {

        function SeriesElement() {
            let { idserie } = useParams();
            return <Series idserie={idserie}></Series>
        }
        function PersonajesElement() {
            let { serie } = useParams();
            return <Personajes serie={serie}></Personajes>
        }
        return (
            <BrowserRouter>
                <MenuRutas></MenuRutas>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/series/:idserie" element={<SeriesElement></SeriesElement>}></Route>
                    <Route path="/personajes/:serie" element={<PersonajesElement></PersonajesElement>}></Route>
                    <Route path="/crear" element={<CrearPersonaje></CrearPersonaje>}></Route>
                    <Route path="/modificar" element={<ModificarPersonaje></ModificarPersonaje>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
