import React, { useState, useRef, useEffect } from 'react';
import { BsSendFill } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import useSendMessage from '../hooks/useSendMessage';
import EmojiPicker from './EmojiPicker';

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const { loading, sendMessage } = useSendMessage();
    const imageRef = useRef(null);
    const textareaRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message && !image) return;
        await sendMessage(message, image);
        setMessage("");
        setImage(null);
        setShowEmoji(false);
        // Klavyaturanı bağlama
        if (textareaRef.current) {
            textareaRef.current.blur();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Textarea auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [message]);

    return (
        <form className='messages-input-form' onSubmit={handleSubmit}>
            <div className="input-area">
                <label className="image-upload-label">
                    <IoImageOutline className='upload-icon' />
                    <input
                        type="file"
                        className='hidden-input'
                        ref={imageRef}
                        onChange={(e) => setImage(e.target.files[0])}
                        accept='image/*'
                    />
                </label>

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Mesaj yazın...'
                    className='message-textarea'
                    rows={1}
                />

                <div className='input-actions'>
                    <button
                        type='button'
                        className='emoji-button'
                        onClick={() => setShowEmoji(!showEmoji)}
                    >
                        <IoMdHappy />
                    </button>

                    <button type='submit' disabled={loading}>
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            <BsSendFill className='send-icon' />
                        )}
                    </button>
                </div>
            </div>

            {showEmoji && (
                <div className="emoji-picker-container">
                    <EmojiPicker
                        onEmojiSelect={(emoji) => setMessage(prev => prev + emoji)}
                        onClose={() => setShowEmoji(false)}
                    />
                </div>
            )}

            {image && (
                <div className="image-preview">
                    <img src={URL.createObjectURL(image)} alt="Selected" />
                    <button
                        type="button"
                        className="remove-image"
                        onClick={() => setImage(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </form>
    );
};

export default MessageInput; 