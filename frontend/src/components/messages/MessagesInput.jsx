import React, { useState, useRef } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import { PiImage } from "react-icons/pi";
import { useAuthContext } from '../../context/AuthContext';
import { RiSendPlaneLine } from "react-icons/ri";

const MessagesInput = () => {
    const { loading, sendMessage } = useSendMessage();
    const { authUser } = useAuthContext();

    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);  // Şəkil vəziyyəti yarat
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);  // Fayl seçimi üçün ref yarat

    const handleChange = (e) => {
        const textarea = textareaRef.current;
        setMessage(e.target.value);

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);  // Şəkili vəziyyətə qoy
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !image) return;
    
        try {
            let imageUrl = null;
    
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
    
                const response = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await response.json();
    
                if (!response.ok) {
                    throw new Error(`Failed to upload image: ${response.status}`);
                }
    
                imageUrl = data.imageUrl;  // Backend-dən qaytarılan şəkil URL-si
                setImage(null);  // Şəkil uğurla göndərildikdən sonra sıfırla
            }
    
            if (message || imageUrl) {
                await sendMessage({ text: message, imageUrl });  // Mesaj və şəkil URL-ni göndərin
                setMessage("");  // Mesajı sıfırla
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    
    

    return (
        <div className='message-input'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='user-image'>
                    <img src={authUser.profilePic} alt="" />
                </div>
                <div className='input-box'>
                    <textarea
                        ref={textareaRef}
                        className='textarea'
                        placeholder='Type a message'
                        value={message}
                        onChange={handleChange}
                        rows={1}
                        style={{ resize: 'none', overflow: 'hidden' }}
                    />
                    <div className='message-send-button'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}  // Fayl seçimi gizli olsun
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button 
                            type='button' 
                            className='send-image-button'
                            onClick={() => fileInputRef.current.click()}  // Fayl seçimi açmaq üçün klik
                        >
                            <PiImage className='send-image-icon' />
                        </button>
                        <button type='submit' className='send-button'>
                            <RiSendPlaneLine className='send-icon' />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MessagesInput;
