import React, { useState } from 'react';
import { Input, Button, Form, Checkbox, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Login from './Login';

const Register = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [cycling, setCycling] = useState(false);
    const [club, setClub] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    birthDate,
                    cycling,
                    club,
                    email,
                    password,
                    confirmPassword
                }),
            });
            if (response.ok) {
                message.success('Usuario registrado exitosamente');
                navigate('/login');
            } else {
                message.error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            message.error('Error del servidor');
        }
    };

    if (redirectToLogin) {
        return <Login to="/login" />;
    }

    return (
        <>
            <div style={{ display: "flex", overflow: "hidden" }}>
                <div className='padre-login' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundImage: `url(/nuevo2.svg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    height: '92vh',
                    width: '60%',
                    overflow: "hidden",
                    backgroundr: "#B1B1B1"
                }}>
                </div>

                <div className='register-container' style={{ width: '30%', height: '70%' }}>
                    <h1>Registrarse</h1>
                    <Form onFinish={handleSubmit}>
                        <Form.Item>
                            <Input
                                placeholder="Nombre completo"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="date"
                                placeholder="Fecha de cumpleaños"
                                value={birthDate}
                                onChange={e => setBirthDate(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox
                                checked={cycling}
                                onChange={e => setCycling(e.target.checked)}
                            >
                                ¿Eres ciclista?
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Input
                                placeholder="Nombre de tu club"
                                value={club}
                                onChange={e => setClub(e.target.value)}
                                name="club"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                suffix={emailError ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                type="email"
                                placeholder="Confirmar correo electrónico"
                                value={confirmEmail}
                                onChange={e => setConfirmEmail(e.target.value)}
                                suffix={emailError ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                placeholder="Contraseña"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                suffix={passwordError ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                suffix={passwordError ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Registrarse
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to="/login">Iniciar sesión</Link>
                        </Form.Item>
                    </Form>
                    {redirectToLogin && (
                        <Login to="/login" />
                    )}
                </div>
            </div>
        </>
    );
};

export default Register;