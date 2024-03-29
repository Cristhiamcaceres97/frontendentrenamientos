import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Perfil from './Perfil';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // const handleLoginSuccess = (response) => {
    //     message.success(response.message);
    //     setAuthenticatedUser(response.user);
    //     navigate('/editor-entrenos');
    // };

    const handleLoginSuccess = (response) => {
        message.success(response.message);
        setAuthenticatedUser(response.user);
        navigate('/buscar-usuarios', { state: { userId: response.user._id } });
        // navigate('/editor-entrenos');
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                handleLoginSuccess(user);
            } else {
                message.error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            message.error('Error del servidor');
        }
        finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        return email && password;
    };

    return (
        <>
            <div style={{ display: "flex", overflow: "hidden" }}>
                <div className='padre-login' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundImage: `url(/nuevo1.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    height: '92vh',
                    width: '60%',
                    overflow: "hidden",
                    backgroundr: "#B1B1B1"
                }}>
                </div>

                <div className='login-container' style={{ width: '30%', height: '70%' }}>
                    <h1>Iniciar Sesión</h1>
                    <Form onFinish={handleLogin}>
                        <div>
                            <Form.Item className="form-group">
                                <Input
                                    className={`input-field ${isFormValid() ? 'valid' : ''}`}
                                    type="email"
                                    placeholder="Correo electrónico"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item className="form-group">
                                <Input.Password
                                    className={`input-password ${isFormValid() ? 'valid' : ''}`}
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{
                                        borderBottom: "2px solid #ccc"
                                    }}
                                />
                            </Form.Item>
                            <Form.Item className="forgot-password-link">
                                <Link to="/contraseña-otp">¿Olvidaste tu contraseña?</Link>
                            </Form.Item>
                            <div className='inicia-sesion'>
                                <Form.Item className="form-group">
                                    <Button type="link" htmlType="submit" disabled={!isFormValid()} loading={isLoading}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item className="register-link">
                            <Link to="/register">Registrarse</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {authenticatedUser && (
                <Perfil userData={authenticatedUser} />
            )}
        </>
    );
};

export default Login;