import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CerrarSesion = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/login');
    };

    return (
        <Button onClick={handleLogout}>Cerrar sesión</Button>
    );
};

export default CerrarSesion;





