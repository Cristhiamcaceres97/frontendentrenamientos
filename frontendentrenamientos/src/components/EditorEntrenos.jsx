import React, { useState } from 'react';
import { Button, Table, Spin, Typography, Input, Popconfirm, Modal } from 'antd';
import '../App.css';
import CerrarSesion from './CerrarSesion';
import Perfil from './Perfil';
import BuscarUsuarios from './BuscarUsuarios';
import HomePage from './HomePage';

const { Text, Title } = Typography;

const EditableCell = ({ value, onChange }) => {
    const [editing, setEditing] = useState(false);

    const toggleEdit = () => {
        setEditing(!editing);
        if (!editing) {
            onChange(value);
        }
    };

    return (
        <div onClick={toggleEdit} style={{ width: '100%', display: 'inline-block' }}>
            {editing ? (
                <Input
                    className='campo-editor'
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    autoFocus
                    onBlur={toggleEdit}
                    onPressEnter={toggleEdit}
                />
            ) : (
                <div style={{ width: '100%', display: 'inline-block' }}>
                    {value}
                </div>
            )}
        </div>
    );
};

const EditorEntrenos = ({ userData, onLogout }) => {
    const [schedule, setSchedule] = useState([]);
    const [showPossibleSchedulesButton, setShowPossibleSchedulesButton] = useState(true);
    const [showAssignButton, setShowAssignButton] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [columnas, setColumnas] = useState([]);
    const [totalKilometros, setTotalKilometros] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [columnNames, setColumnNames] = useState({
        day: 'Día',
        activity: 'Actividad de Entrenamiento',
        distance: 'Distancia',
    });

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const activities = ['semi Fondo', 'fondo', 'cuji - cenabastos - la cemento - cuji', 'contrarreloj: km5 - la cemento - km5.', 'la california', 'cucuta- pamplona', 'cucuta- la cuchilla'];
    const distances = ['150km', '20km', '50km', '200km'];

    const [profileImage, setProfileImage] = useState(null);

    const handleProfileImageChange = (newImage) => {
        setProfileImage(newImage);
        console.log('Imagen del perfil actualizada:', newImage);
    };

    const handleShowPossibleSchedules = () => {
        const possibleSchedules = days.map((day, index) => {
            return {
                key: (index + 1).toString(),
                day: day,
                activity: activities[index % activities.length],
                distance: distances[index % distances.length],
            };
        });
        setSchedule(possibleSchedules);
        setShowPossibleSchedulesButton(false);
        setShowAssignButton(true);
    };

    const handleAssignMyOwnSchedule = () => {
        setIsLoading(true);
        setShowAssignButton(false);
        setTimeout(() => {
            const myOwnSchedule = [
                { key: '1', day: 'Sábado', activity: 'contrarreloj: km5 - la cemento - km5.', distance: '8 Km' },
                { key: '2', day: 'Domingo', activity: 'Carro chocado', distance: '60 Km' },
                { key: '3', day: 'Lunes', activity: 'Descanso', distance: '0 Km' },
                // INICIO SEGUNDA SEMANA
                { key: '4', day: 'Martes', activity: '5 Cronos cortas de 2 km', distance: '35 Km' },
                { key: '5', day: 'Miercoles', activity: 'Patillales - km 5', distance: '45 Km' },
                { key: '6', day: 'Jueves', activity: 'La bascula', distance: '50 Km' },
                { key: '7', day: 'Viernes', activity: '6 Repeticiones en la pollera ', distance: '40 Km' },
                { key: '8', day: 'Sabado', activity: '2 vueltas planes y 1 CRI plana', distance: '35 Km' },
                { key: '9', day: 'Domingo', activity: 'Pico del aguila - (destapado)', distance: '40 Km' },
                { key: '10', day: 'Lunes', activity: 'Descanso', distance: '0 Km' },
                // INICIO TERCERA SEMANA
                { key: '11', day: 'Martes', activity: 'Trabajitos', distance: '40 Km' },
                { key: '12', day: 'Miercoles', activity: 'La rinconada y hasta el KM 5', distance: '50 Km' },
                { key: '13', day: 'Jueves', activity: 'Pamplonita o Pamplona (POR CONFIRMAR)', distance: '60 Km' },
                { key: '14', day: 'Viernes', activity: 'Repeticiones en el club tenis', distance: '40 Km' },
                { key: '15', day: 'Sabado', activity: '2 CRI - KM 5 - la cemento', distance: '30 Km' },
                { key: '16', day: 'Domingo', activity: 'Chinacota por la escuela paez - (destapado)', distance: '85 Km' },
                { key: '17', day: 'Lunes', activity: 'Descanso', distance: '0 Km' },
                // INICIO ULTIMA SEMANA 
                { key: '18', day: 'Martes', activity: 'Trabajitos de sprint', distance: '40 Km' },
                { key: '19', day: 'Miercoles', activity: 'La rinconada y hasta montebello', distance: '67 Km' },
                { key: '20', day: 'Jueves', activity: 'Puerto lleras y una vuelta plana', distance: '60 Km' },
                { key: '21', day: 'Viernes', activity: '8 repeticiones en la pollera', distance: '55 Km' },
                { key: '22', day: 'Sabado', activity: '1 CRI - POLLERA-CUJI-KM 5 - la cemento', distance: '30 Km' },
                { key: '23', day: 'Domingo', activity: 'Fondo (POR CONFIRMAR)', distance: 'Entre 90km A 110km' },
                // FIN DE LA "MTB"
                { key: '24', day: 'Lunes', activity: 'Descanso', distance: '0 Km' },
                // INICIO BICI DE "RUTA"
            ];
            setSchedule(myOwnSchedule);
            setIsLoading(false);
            setShowTitle(true);
        }, 2600);
    };

    const handleCellChange = (key, dataIndex, newValue) => {
        const updatedSchedule = [...schedule];
        const index = updatedSchedule.findIndex(item => key === item.key);
        if (index > -1) {
            updatedSchedule[index][dataIndex] = newValue;
            setSchedule(updatedSchedule);
        }
    };

    const handleDeleteRow = key => {
        const updatedSchedule = schedule.filter(item => item.key !== key);
        setSchedule(updatedSchedule);
    };

    const handleAddRow = () => {
        const newRow = {
            key: (schedule.length + 1).toString(),
            day: '',
            activity: '',
            distance: '',
        };
        setSchedule([...schedule, newRow]);
    };

    const handleAddColumn = () => {
        const newColumnKey = `customColumn${columnas.length + 1}`;
        const newColumnTitle = `Columna ${columnas.length + 1}`;

        const newColumn = {
            title: newColumnTitle,
            dataIndex: newColumnKey,
            key: newColumnKey,
            render: (text, record) => (
                <EditableCell
                    editable
                    value={text}
                    onChange={newValue => handleCellChange(record.key, newColumnKey, newValue)}
                />
            ),
        };

        setColumnas([...columnas, newColumn]);

        const updatedSchedule = schedule.map(item => {
            return { ...item, [newColumnKey]: '' };
        });
        setSchedule(updatedSchedule);

        setColumnNames({
            ...columnNames,
            [newColumnKey]: newColumnTitle,
        });
    };

    const calculateTotalKilometros = () => {
        const total = schedule.reduce((acc, item) => {
            const distanceString = item.distance;
            const distance = parseInt(distanceString.replace(' Km', ''));
            if (!isNaN(distance)) {
                return acc + distance;
            } else {
                return acc;
            }
        }, 0);
        setTotalKilometros(total);
        setShowModal(true);
    };


    const handleOkModal = () => {
        setShowModal(false);
    };

    const columns = [
        {
            title: (
                <EditableCell
                    editable
                    value={columnNames.day}
                    onChange={newValue => {
                        setColumnNames({ ...columnNames, day: newValue });
                    }}
                />
            ),
            dataIndex: 'day',
            key: 'day',
            render: (text, record) => (
                <EditableCell
                    editable
                    value={text}
                    onChange={newValue => handleCellChange(record.key, 'day', newValue)}
                />
            ),
        },
        {
            title: (
                <EditableCell
                    editable
                    value={columnNames.activity}
                    onChange={newValue => {
                        setColumnNames({ ...columnNames, activity: newValue });
                    }}
                />
            ),
            dataIndex: 'activity',
            key: 'activity',
            render: (text, record) => (
                <EditableCell
                    editable
                    value={text}
                    onChange={newValue => handleCellChange(record.key, 'activity', newValue)}
                />
            ),
        },
        {
            title: (
                <EditableCell
                    editable
                    value={columnNames.distance}
                    onChange={newValue => {
                        setColumnNames({ ...columnNames, distance: newValue });
                    }}
                />
            ),
            dataIndex: 'distance',
            key: 'distance',
            render: (text, record) => (
                <EditableCell
                    editable
                    value={text}
                    onChange={newValue => handleCellChange(record.key, 'distance', newValue)}
                />
            ),
        },
        {
            title: 'Acciones',
            dataIndex: 'actions',
            render: (text, record) =>
                schedule.length >= 1 ? (
                    <Popconfirm title="¿Estás seguro de eliminar?" onConfirm={() => handleDeleteRow(record.key)}>
                        <Button type="link">Eliminar</Button>
                    </Popconfirm>
                ) : null,
        },
        ...columnas.map(column => ({
            ...column,
            title: (
                <EditableCell
                    editable
                    value={columnNames[column.dataIndex] || column.title}
                    onChange={newValue => {
                        setColumnNames({ ...columnNames, [column.dataIndex]: newValue });
                    }}
                />
            ),
        })),
    ];
    // 

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <CerrarSesion />
                <Perfil userData={userData} avatarUrl={userData?.avatarUrl} onProfileImageChange={handleProfileImageChange} />
                <BuscarUsuarios />
                <HomePage />
                {/* <Button type='link' icon={<BellOutlined />}></Button> */}
            </div>

            {showPossibleSchedulesButton && <Button type="primary" onClick={handleShowPossibleSchedules}>Mostrar Posibles Entrenamientos</Button>}
            {showAssignButton && <Button type="primary" onClick={handleAssignMyOwnSchedule}>Asignar Mi Propio Entrenamiento</Button>}
            {isLoading ?
                <div className="loading-container">
                    <Spin className="large-spin" />
                    <p className="loading-text typewriter">Estamos preparando tu entrenamiento PRO...</p>
                </div> :
                <>
                    {showTitle && <Title level={3} style={{ color: "#4285F4" }}>Estos han sido tus entrenamientos para lo que queda de esta semana</Title>}
                    <div className="table-container">
                        <Table
                            columns={columns}
                            dataSource={schedule}
                            pagination={false}
                            onCell={(record, rowIndex) => {
                                return {
                                    onMouseDown: handleMouseDown,
                                    onMouseMove: handleMouseMove,
                                    onMouseUp: handleMouseUp,
                                };
                            }}
                        />
                        <div>

                            <Button
                                onClick={calculateTotalKilometros}
                                style={{ marginTop: '1rem' }}
                                disabled={showAssignButton}
                            >
                                Total de Kilómetros
                            </Button>

                        </div>
                        <Modal
                            title="Total de Kilómetros"
                            open={showModal}
                            onOk={handleOkModal}
                            onCancel={handleOkModal}
                        >
                            <p>Tiene un total de <Text strong>{totalKilometros}</Text> kilómetros para este plan de entrenamiento.</p>
                        </Modal>
                        <Button onClick={handleAddRow} style={{ marginTop: '1rem' }}>Agregar Fila</Button>
                    </div>
                </>
            }
        </div>
    );
};

export default EditorEntrenos;