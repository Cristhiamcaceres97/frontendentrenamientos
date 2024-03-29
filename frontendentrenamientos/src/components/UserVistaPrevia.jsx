import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserVistaPrevia = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://bw3vb6q6-5000.use2.devtunnels.ms/api/users/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>{user.fullName}</h1>
            <p>{user.email}</p>
        </div>
    );
};

export default UserVistaPrevia;