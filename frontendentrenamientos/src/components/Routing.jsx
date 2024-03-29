


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register.jsx';
import EditorEntrenos from './EditorEntrenos';
import CerrarSesion from './CerrarSesion';
import Perfil from './Perfil';
import ContraseñaOTP from './ContraseñaOTP';
import BuscarUsuarios from './BuscarUsuarios';
import HomePage from './HomePage';
import UserVistaPrevia from './UserVistaPrevia';

const Routing = ({ authenticatedUser }) => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/editor-entrenos" element={<EditorEntrenos authenticatedUser={authenticatedUser} />} />
                <Route path="/cerrar-sesion" element={<CerrarSesion />} />
                <Route path="/perfil" element={<Perfil userData={authenticatedUser} />} />
                <Route path="/contraseña-otp" element={<ContraseñaOTP />} />
                <Route path="/buscar-usuarios" element={<BuscarUsuarios />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/user/:id" component={<UserVistaPrevia />} /> {/* Ruta para la vista previa del usuario */}
                <Route path="*" element={<Login />} />

            </Routes>
        </Router>
    );
};

export default Routing;