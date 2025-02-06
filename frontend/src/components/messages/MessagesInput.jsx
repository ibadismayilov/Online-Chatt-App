import React, { useState, useRef } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import { BsSend } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";
import { useAuthContext } from '../../context/AuthContext';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const MessagesInput = () => {
    const { loading, sendMessage } = useSendMessage();
    const { authUser } = useAuthContext();
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !selectedImage) return;

        const formData = new FormData();
        if (message.trim()) formData.append("message", message);
        if (selectedImage) formData.append("image", selectedImage);

        await sendMessage(formData);
        setMessage("");
        setSelectedImage(null);
        setShowPicker(false);

        setTimeout(() => {
            textareaRef.current.focus();
        }, 100);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
        } else {
            alert('Please select an image file');
        }
    };

    const handleEmojiSelect = (emoji) => {
        setMessage((prev) => prev + emoji.native);
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    };

    return (
        <div className="messages-input-container">
            <form onSubmit={handleSubmit} className="messages-input-form">
                <div className="input-area">
                    <label className="image-upload-label">
                        <HiOutlinePhoto className="upload-icon" />
                        <input
                            type="file"
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden-input"
                        />
                    </label>

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            adjustTextareaHeight();
                        }}
                        placeholder="Type a message..."
                        className="message-textarea"
                        rows={1}
                    />
                    
                    <div className="input-actions">
                        <button 
                            type="button" 
                            className="emoji-button"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            {!showPicker ? <div className='open-emoji hidden'>😀</div> : <div className='close-emoji setting'>❌</div>}
                        </button>

                        <button 
                            type="submit" 
                            className="send-button"
                            disabled={loading || (!message.trim() && !selectedImage)}
                        >
                            {loading ? <div class="spinner"></div> : <BsSend className="send-icon" />}
                        </button>
                    </div>
                </div>
            </form>

            {showPicker && (
                <div className="emoji-picker-container">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
            )}

            {selectedImage && (
                <div className="image-preview">
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                    <button 
                        type="button" 
                        className="remove-image"
                        onClick={() => setSelectedImage(null)}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default MessagesInput;
