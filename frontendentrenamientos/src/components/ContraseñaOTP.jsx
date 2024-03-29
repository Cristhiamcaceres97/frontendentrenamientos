import React, { useState } from 'react';
import { Input, Button, Form, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const ContraseñaOTP = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOTPFields, setShowOTPFields] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestOTP = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const responseData = await response.json();

            console.log(responseData);

            if (response.ok) {
                message.success('Se ha enviado un correo electrónico con el código OTP.');
                setShowOTPFields(true);
            } else {
                message.error('Hubo un error al solicitar el código OTP.');
            }
        } catch (error) {
            console.error('Error al solicitar el código OTP:', error);
            message.error('Error del servidor');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await fetch('https://bw3vb6q6-5000.use2.devtunnels.ms/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
            });

            const responseData = await response.json();

            console.log(responseData);

            if (response.ok) {
                message.success('Contraseña restablecida exitosamente.');
                navigate('/login');
            } else {
                message.error('Hubo un error al restablecer la contraseña.');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            message.error('Error del servidor');
        }
    };

    const isFormValid = () => {
        return email && otp && newPassword && confirmPassword && newPassword === confirmPassword;
    };

    return (
        <div className='forgot-password-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <h1 style={{ marginBottom: '20px' }}>Restablecer Contraseña</h1>
            <Form onFinish={handleRequestOTP} style={{ width: '300px' }}>
                <Form.Item className="form-group" style={{ marginBottom: '20px' }}>
                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ width: '100%' }}
                        suffix={isLoading ? <Spin /> : <RightOutlined onClick={handleRequestOTP} />}
                    />
                </Form.Item>
                {showOTPFields && (
                    <>
                        <Form.Item className="form-group" style={{ marginBottom: '20px' }}>
                            <Input
                                type="text"
                                placeholder="Código OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item className="form-group" style={{ marginBottom: '20px' }}>
                            <Input.Password
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item className="form-group" style={{ marginBottom: '20px' }}>
                            <Input.Password
                                placeholder="Confirmar nueva contraseña"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                        <Form.Item className="form-group" style={{ marginBottom: '20px' }}>
                            <Button type="primary" onClick={handleResetPassword} style={{ width: '100%' }} disabled={!isFormValid()}>
                                Restablecer contraseña
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form>
        </div>
    );
};

export default ContraseñaOTP;