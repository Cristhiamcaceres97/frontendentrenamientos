import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [message, setMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/users/data');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const usersData = await response.json();
                setUsers(usersData.filter(user => user._id !== currentUserId));
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, [currentUserId]);

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`https://bw3vb6q6-5000.use2.devtunnels.ms/api/users/${selectedUser}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: message }),
            });
            if (!response.ok) {
                throw new Error('Error al enviar el mensaje');
            }
            console.log('Mensaje enviado');
            setMessage('');
            setSelectedUser(null);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    return (
        <div>
            <h1>Sugerencia de amigos</h1>
            {users.map(user => (
                <div key={user._id}>
                    <Link to={`/users/${user._id}`}>{user.fullName}</Link>
                    <p>{user.email}</p>
                    <Button onClick={() => setSelectedUser(user._id)}>Enviar mensaje</Button>
                    {selectedUser === user._id && (
                        <div>
                            <Input value={message} onChange={e => setMessage(e.target.value)} />
                            <Button onClick={handleSendMessage}>Enviar</Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomePage;