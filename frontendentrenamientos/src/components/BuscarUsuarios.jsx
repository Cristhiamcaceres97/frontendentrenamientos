import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, notification, Badge, Popover, List } from 'antd';
import { UserAddOutlined, BellOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';


const BuscarUsuarios = () => {
    const [username, setUsername] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);
    const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
    const [amigos, setAmigos] = useState([]);
    const [visible, setVisible] = useState(false);
    const [solicitudesCount, setSolicitudesCount] = useState(0);
    const location = useLocation();
    const usuarioId = location.state?.userId;
    console.log("idusuario", usuarioId);

    useEffect(() => {
        getFriendRequests(usuarioId);
    }, [usuarioId]);

    const getFriendRequests = async (userId) => {
        try {
            const response = await axios.get(`https://bw3vb6q6-5000.use2.devtunnels.ms/api/friend-requests?userId=${userId}`);
            console.log('Solicitudes de amistad recibidas:', response.data);
            setSolicitudesRecibidas(response.data);
            setSolicitudesCount(response.data.length);
        } catch (error) {
            console.error('Error al obtener las solicitudes de amistad:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://bw3vb6q6-5000.use2.devtunnels.ms/api/search-users?username=${username}`);
            setSearchUsers(response.data.filter(user => {
                const yaEsAmigo = amigos.some(amigo => amigo._id === user._id);
                const solicitudEnviada = solicitudesEnviadas.some(solicitud => solicitud._id === user._id);
                return user._id !== usuarioId && !yaEsAmigo && !solicitudEnviada;
            }));
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
        }
    };


    const sendFriendRequest = async (friendId) => {
        try {
            await axios.post('https://bw3vb6q6-5000.use2.devtunnels.ms/api/send-friend-request', { userId: usuarioId, friendId });
            notification.success({ message: 'Solicitud de amistad enviada correctamente' });
            setSolicitudesEnviadas([...solicitudesEnviadas, { _id: friendId }]);
        } catch (error) {
            console.error('Error al enviar solicitud de amistad:', error);
            notification.error({ message: 'Error al enviar solicitud de amistad' });
        }
    };

    const acceptFriendRequest = async (friendId) => {
        try {
            await axios.post('https://bw3vb6q6-5000.use2.devtunnels.ms/api/accept-friend-request', { userId: usuarioId, friendId });
            notification.success({ message: 'Solicitud de amistad aceptada correctamente' });
            getFriendRequests(usuarioId);
        } catch (error) {
            console.error('Error al aceptar la solicitud de amistad:', error);
            notification.error({ message: 'Error al aceptar la solicitud de amistad' });
        }
    };

    const rejectFriendRequest = async (friendId) => {
        try {
            await axios.post('https://bw3vb6q6-5000.use2.devtunnels.ms/api/reject-friend-request', { userId: usuarioId, friendId });
            notification.success({ message: 'Solicitud de amistad rechazada correctamente' });
            getFriendRequests(usuarioId);
        } catch (error) {
            console.error('Error al rechazar la solicitud de amistad:', error);
            notification.error({ message: 'Error al rechazar la solicitud de amistad' });
        }
    };

    const handleVisibleChange = (visible) => {
        setVisible(visible);
        if (!visible) {
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [usuarioId]); 

    const getAllUsers = async () => {
        try {
            const response = await axios.get('https://bw3vb6q6-5000.use2.devtunnels.ms/api/users/data');
            const allUsers = response.data.filter(user => user._id !== usuarioId);
            setSearchUsers(allUsers);
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
        }
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Buscar usuario por nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={handleSearch}>Buscar</Button>
            <ul>
                {searchUsers.map((user) => (
                    <li key={user._id}>
                        Nombre: {user.fullName} <br />
                        Email: {user.email} <br />
                        Club: {user.club}
                    </li>
                ))}
            </ul>
            
            <Badge count={solicitudesCount} style={{ backgroundColor: '#ff4d4f' }}>
                <Button type='link' icon={<BellOutlined />} onClick={() => setVisible(true)} />
            </Badge>

            <Popover
                content={
                    <List
                        dataSource={solicitudesRecibidas}
                        renderItem={(item) => (
                            <List.Item key={item._id}>
                                {item.username}
                                <Button type='link' onClick={() => acceptFriendRequest(item._id)}>Aceptar</Button>
                                <Button type='link' onClick={() => rejectFriendRequest(item._id)}>Rechazar</Button>
                            </List.Item>
                        )}
                    />
                }
                title="Solicitudes de amistad pendientes"
                trigger="click"
                open={visible}
                onOpenChange={handleVisibleChange}
            >
                <Button type='link' icon={<BellOutlined />} />
            </Popover>
            <ul>
                {Array.isArray(searchUsers) && searchUsers?.map((user) => {
                    const yaEsAmigo = amigos.some(amigo => amigo._id === user._id);
                    const solicitudEnviada = solicitudesEnviadas.some(solicitud => solicitud._id === user._id);
                    return (
                        <li key={user._id}>
                            Nombre: {user.fullName} <br />
                            Email: {user.email} <br />
                            Club: {user.club}
                            {solicitudEnviada ? (
                                <Button type='link' icon={<UserAddOutlined />} disabled>
                                    Solicitud enviada
                                </Button>
                            ) : yaEsAmigo ? (
                                <Button type='link' icon={<UserAddOutlined />} disabled>
                                    Ya son amigos
                                </Button>
                            ) : (
                                <Button type='link' icon={<UserAddOutlined />} onClick={() => sendFriendRequest(user._id)}>
                                    Enviar solicitud de amistad
                                </Button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BuscarUsuarios;