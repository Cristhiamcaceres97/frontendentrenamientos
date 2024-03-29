import React, { useState, useEffect } from 'react';
import { Button, Drawer, Image, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Perfil = ({ userData, onProfileImageChange, authenticatedUser }) => {
    const [visible, setVisible] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(userData?.avatarUrl || null);
    const [userId, setUserId] = useState(null);
    const [fetchedUserData, setFetchedUserData] = useState(null); 

    console.log("autenticated", authenticatedUser);

    useEffect(() => {
        if (userData?.avatarUrl) {
            setUploadedImageUrl(userData.avatarUrl);
        }
    }, [userData]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/users/data');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const usersData = await response.json();
                setFetchedUserData(usersData);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);


    const handleUpload = async info => {
        const formData = new FormData();
        formData.append('imagen', info.file.originFileObj);
        formData.append('userId', authenticatedUser?._id || '');

        try {
            const response = await fetch('https://7cq4hrc8-5000.use2.devtunnels.ms/api/imagenes', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
            }

            const data = await response.json();
            onProfileImageChange(info.file.originFileObj);
            setUploadedImageUrl(data.url);
            console.log('URL de la imagen subida:', data.url);

            await fetch(`https://7cq4hrc8-5000.use2.devtunnels.ms/api/usuarios/${authenticatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ avatarUrl: data.url }),
            });
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    useEffect(() => {
        const fetchAvatarUrl = async () => {
            try {
                const response = await fetch(`https://7cq4hrc8-5000.use2.devtunnels.ms/api/usuarios/${authenticatedUser._id}`);
                const data = await response.json();
                setUploadedImageUrl(data.avatarUrl);
            } catch (error) {
                console.error('Error al obtener la URL del avatar:', error);
            }
        };

        if (authenticatedUser && authenticatedUser._id) {
            fetchAvatarUrl();
        }
    }, [authenticatedUser]);

    const customRequest = async ({ file, onProgress, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('imagen', file);

        try {
            const response = await fetch('https://7cq4hrc8-5000.use2.devtunnels.ms/api/imagenes', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
            }

            const data = await response.json();
            onSuccess(data, file);
            console.log('Imagen subida exitosamente:', data);
            if (data.url) {
                setUploadedImageUrl(data.url);
            }
        } catch (error) {
            onError(error);
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <>
            <div style={{ width: "200px", height: '200px' }}>
                <Button
                    type="link"
                    onClick={showDrawer}
                    icon={
                        <Image
                            src={uploadedImageUrl || userData?.avatarUrl}
                            width={150}
                            height={150}
                        />
                    }
                />
            </div>
            <Drawer
                title={`Bienvenido, ${userData?.fullName}`}
                placement="right"
                closable={false}
                onClose={onClose}
                open={visible}
            >
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <Upload
                        customRequest={customRequest}
                        onChange={handleUpload}
                        showUploadList={false}
                    >
                        <Button type='link' icon={<UploadOutlined />}>
                            Subir foto
                        </Button>
                    </Upload>
                </div>
                <p><Text>Nombre completo:</Text> {userData?.fullName}</p>
                <p><Text>Nombre de usuario:</Text> {userData?.username}</p>
                <p><Text>Email:</Text> {userData?.email}</p>
                <p><Text>Club:</Text> {userData?.club}</p>
            </Drawer>
        </>
    );
};

export default Perfil;