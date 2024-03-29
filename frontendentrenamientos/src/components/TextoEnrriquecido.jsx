



import React, { useState, useRef } from 'react';
import { Button, Input, Select, Tooltip } from 'antd';
import {
    LinkOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined, HighlightOutlined,
    AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, OrderedListOutlined,
    UnorderedListOutlined, FontSizeOutlined, FontColorsOutlined,
    CodeOutlined, PictureOutlined, SmileOutlined, VideoCameraOutlined
} from '@ant-design/icons';


function TextoEnrriquecido() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const contentEditableRef = useRef(null);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showFontSizeInput, setShowFontSizeInput] = useState(false);
    const [showFontFamilyInput, setShowFontFamilyInput] = useState(false);
    const [fontSize, setFontSize] = useState(0);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [showVariablesSelect, setShowVariablesSelect] = useState(false);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showEmojiInput, setShowEmojiInput] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [showVideoInput, setShowVideoInput] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const handleTextSelection = (event) => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0 && selection.toString().trim() !== '') {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setTooltipPosition({
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY - 40
            });
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    };

    const applyStyle = (style) => {
        document.execCommand(style, false);
        setShowTooltip(false);
    };

    const applyColor = (color) => {
        document.execCommand('foreColor', false, color);
        setShowTooltip(false);
    };

    const applyBackgroundColor = (color) => {
        document.execCommand('backColor', false, color);
        setShowTooltip(false);
    };

    const applyLink = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const link = document.createElement('a');
        link.href = linkUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.color = 'blue';
        link.style.textDecoration = 'underline';
        link.style.cursor = 'pointer';
        const range = selection.getRangeAt(0);
        const selectedContents = range.cloneContents();
        link.appendChild(selectedContents);
        range.deleteContents();
        range.insertNode(link);
        setShowTooltip(false);
        setShowLinkInput(false);
        setLinkUrl('');
    };

    const applyImage = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.maxWidth = '100%';
        range.insertNode(img);
        setShowImageInput(false);
        setImageUrl('');
    };

    const applyVideo = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const video = document.createElement('video');
        video.src = videoUrl;
        video.controls = true;
        video.style.maxWidth = '100%';
        range.insertNode(video);
        setShowVideoInput(false);
        setVideoUrl('');
    };


    const openFontSizeInput = () => {
        setIsToolbarOpen(true);
        setShowFontSizeInput(true);
    };

    const closeFontSizeInput = () => {
        setIsToolbarOpen(false);
        setShowFontSizeInput(false);
    };


    const applyFontSize = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const span = document.createElement('span');
        span.style.fontSize = `${fontSize}px`;
        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
        setShowFontSizeInput(false);
        setFontSize('');
    };

    const applyFontFamily = () => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const span = document.createElement('span');
        span.style.fontFamily = fontFamily;
        console.log(`Applying font family: ${fontFamily}`);
        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
        setShowFontFamilyInput(false);
        setFontFamily('');
    };

    const applyEmoji = (emoji) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.textContent = emoji;
        range.insertNode(span);
    };

    const fontFamilies = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana', 'Comic Sans MS'];

    const variables = {
        nombre: "Paco",
        apellido: "Andres",
        asesino: "Jefry",
        cantante: "Ñengo",
    };



    const openVariableSelector = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            setSelectedRange(range);
        }
        setShowVariablesSelect(true);
    };

    const applyVariable = () => {
        const span = document.createElement('span');
        span.textContent = variables[selectedVariable] || '';
        selectedRange.deleteContents();
        selectedRange.insertNode(span);
        setShowVariablesSelect(false);
        setSelectedVariable(null);
    };

    return (
        <div>
            <div>
                {showTooltip && (
                    <div
                        style={{
                            position: "absolute",
                            top: `${tooltipPosition.y}px`,
                            left: `${tooltipPosition.x}px`,
                            backgroundColor: "white",
                            border: "1px solid black",
                            padding: "5px"
                        }}
                    >
                        Barra de herramientas
                    </div>
                )}
                <div
                    ref={contentEditableRef}
                    contentEditable
                    onMouseUp={handleTextSelection}
                    style={{ border: '1px solid #ccc', minWidth: "200px ", padding: '10px', minHeight: '20px', cursor: 'text' }}
                >
                    Escribe algo y luego selecciona el texto...
                </div>
            </div>
            {showTooltip && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${tooltipPosition.y}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                        display: 'flex',
                        gap: '4px',
                    }}
                >
                    <Tooltip title='Crear enlace'>
                        <Button onClick={() => setShowLinkInput(true)}>
                            <LinkOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Aplicar negrita'>
                        <Button onClick={() => applyStyle('bold')}>
                            <BoldOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Aplicar cursiva'>
                        <Button onClick={() => applyStyle('italic')}>
                            <ItalicOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Subrayar texto'>
                        <Button onClick={() => applyStyle('underline')}>
                            <UnderlineOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Tachar texto'>
                        <Button onClick={() => applyStyle('strikeThrough')}>
                            <StrikethroughOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Cambiar color de texto a rojo'>
                        <Button onClick={() => applyColor('red')}>
                            <FontColorsOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Cambiar color de fondo a amarillo'>
                        <Button onClick={() => applyBackgroundColor('yellow')}>
                            <HighlightOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Alinear texto a la izquierda'>
                        <Button onClick={() => document.execCommand('justifyLeft', false)}>
                            <AlignLeftOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Centrar texto'>
                        <Button onClick={() => document.execCommand('justifyCenter', false)}>
                            <AlignCenterOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Alinear texto a la derecha'>
                        <Button onClick={() => document.execCommand('justifyRight', false)}>
                            <AlignRightOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar lista ordenada'>
                        <Button onClick={() => document.execCommand('insertOrderedList', false)}>
                            <OrderedListOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar lista desordenada'>
                        <Button onClick={() => document.execCommand('insertUnorderedList', false)}>
                            <UnorderedListOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Disminuir indentación'>
                        <Button onClick={() => document.execCommand('outdent', false)}>
                            {/* <OutdentOutlined /> */}
                        </Button>
                    </Tooltip>

                    <Tooltip title='Aumentar indentación'>
                        <Button onClick={() => document.execCommand('indent', false)}>
                            {/* <IndentOutlined /> */}
                        </Button>
                    </Tooltip>

                    <Tooltip title='Cambiar tamaño de fuente'>
                        <Button onClick={openFontSizeInput}>
                            <FontSizeOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Cambiar tipo de letra'>
                        <Button onClick={() => setShowFontFamilyInput(true)}>
                            <FontColorsOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar variable'>
                        <Button onClick={() => openVariableSelector(true)}>
                            <CodeOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar imagen'>
                        <Button onClick={() => setShowImageInput(true)}>
                            <PictureOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar emoji'>
                        <Button onClick={() => setShowEmojiInput(true)}>
                            <SmileOutlined />
                        </Button>
                    </Tooltip>

                    <Tooltip title='Insertar video'>
                        <Button onClick={() => setShowVideoInput(true)}>
                            <VideoCameraOutlined />
                        </Button>
                    </Tooltip>


                </div>
            )}
            {showLinkInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="Ingresa la URL del enlace"
                        style={{ marginRight: '5px' }}
                    />
                    <Button onClick={applyLink}>✓</Button>
                    <Button onClick={() => setShowLinkInput(false)}>✕</Button>
                </div>
            )}

            {showFontSizeInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Input
                        type="number"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        placeholder="Ingresa el tamaño de fuente en píxeles"
                        style={{ marginRight: '5px' }}
                    />
                    <Button onClick={applyFontSize}>Aplicar</Button>
                    <Button onClick={() => setShowFontSizeInput(false)}>Cancelar</Button>
                </div>
            )}

            {showFontFamilyInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 60}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Select
                        value={fontFamily}
                        onChange={(value) => setFontFamily(value)}
                        style={{ marginRight: '5px', width: '200px' }}
                    >
                        {fontFamilies.map((font) => (
                            <Select.Option key={font} value={font}>
                                {font}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button onClick={applyFontFamily}>Aplicar</Button>
                    <Button onClick={() => setShowFontFamilyInput(false)}>Cancelar</Button>
                </div>
            )}

            {showVariablesSelect && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Select
                        value={selectedVariable}
                        onChange={(value) => setSelectedVariable(value)}
                        style={{ marginRight: '5px', width: '200px' }}
                    >
                        {Object.entries(variables).map(([key, value]) => (
                            <Select.Option key={key} value={key}>
                                {key}
                            </Select.Option>
                        ))}
                    </Select>


                    <Button onClick={() => setSelectedVariable(null)}>Eliminar</Button>
                    <Button onClick={applyVariable}>Insertar</Button>
                    <Button onClick={() => setShowVariablesSelect(false)}>Cancelar</Button>
                </div>
            )}

            {showImageInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Ingresa la URL de la imagen"
                        style={{ marginRight: '5px' }}
                    />
                    <Button onClick={applyImage}>Aplicar</Button>
                    <Button onClick={() => setShowImageInput(false)}>Cancelar</Button>
                </div>
            )}

            {showEmojiInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        placeholder="Ingresa el emoji"
                        style={{ marginRight: '5px' }}
                    />
                    <Button onClick={applyEmoji}>Aplicar</Button>
                    <Button onClick={() => setShowEmojiInput(false)}>Cancelar</Button>
                </div>
            )}

            {showVideoInput && (
                <div
                    style={{
                        position: 'absolute',
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y + 30}px`,
                        padding: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}
                >
                    <Input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Ingresa la URL del video"
                        style={{ marginRight: '5px' }}
                    />
                    <Button onClick={applyVideo}>Aplicar</Button>
                    <Button onClick={() => setShowVideoInput(false)}>Cancelar</Button>
                </div>
            )}

        </div>
    );
}

export default TextoEnrriquecido;