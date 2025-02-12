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
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!message && !image) return;
        
        // Mesajı göndər
        await sendMessage(message, image);
        
        // State'ləri sıfırla
        setMessage("");
        setImage(null);
        setShowEmoji(false);

        // Bütün cihazlar üçün klaviatura və focus davranışı
        if (textareaRef.current) {
            // Android və iOS üçün focus saxla
            textareaRef.current.focus();
            
            // Scroll pozisiyasını qoru
            const scrollPos = window.scrollY;
            
            // Timeout ilə klaviatura problemini həll et
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
                textareaRef.current.focus();
            }, 100);
        }
    };

    // Klaviatura və focus davranışını idarə et
    useEffect(() => {
        const handleFocusChange = () => {
            if (document.hasFocus() && textareaRef.current) {
                textareaRef.current.focus();
            }
        };

        const handleVisibilityChange = () => {
            if (!document.hidden && textareaRef.current) {
                textareaRef.current.focus();
            }
        };

        // Event listener'ları əlavə et
        document.addEventListener('focusin', handleFocusChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocusChange);

        // Cleanup
        return () => {
            document.removeEventListener('focusin', handleFocusChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocusChange);
        };
    }, []);

    // Textarea auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const submitEvent = new Event('submit', { 
                bubbles: true, 
                cancelable: true 
            });
            formRef.current.dispatchEvent(submitEvent);
        }
    };

    return (
        <form ref={formRef} className='messages-input-form' onSubmit={handleSubmit}>
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

                    <button 
                        type='submit' 
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            const submitEvent = new Event('submit', { 
                                bubbles: true, 
                                cancelable: true 
                            });
                            formRef.current.dispatchEvent(submitEvent);
                        }}
                    >
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