import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderID._id === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-300';
    const textColor = fromMe ? 'text-white' : 'text-gray-800';

    const renderMessageContent = () => {
        if (message.image) {
            // Convert the array buffer to base64
            const arrayBufferToBase64 = (buffer) => {
                let binary = '';
                const bytes = new Uint8Array(buffer);
                for (let i = 0; i < bytes.byteLength; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return window.btoa(binary);
            };

            const base64String = arrayBufferToBase64(message.image.data.data);
            const imageUrl = `data:${message.image.contentType};base64,${base64String}`;
            
            return (
                <div className={`message ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
                    <div className="message-content">
                        <img 
                            src={imageUrl} 
                            alt={message.image.fileName} 
                            className="message-image"
                            loading="lazy"
                        />
                        {message.message && (
                            <p className={`message-text ${textColor}`}>{message.message}</p>
                        )}
                    </div>
                    <div className="message-info">
                        <span className="message-sender">{fromMe ? 'You' : message.senderID.fullName}</span>
                        <span className="message-time">{extractTime(message.createdAt)}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={`message ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
                <div className="message-content">
                    <p className={`message-text ${textColor}`}>{message.message}</p>
                </div>
                <div className="message-info">
                    <span className="message-sender">{fromMe ? 'You' : message.senderID.fullName}</span>
                    <span className="message-time">{extractTime(message.createdAt)}</span>
                </div>
            </div>
        );
    };

    return (
        <div className={`message-container ${fromMe ? 'from-me' : 'from-other'}`}>
            <div className="message-avatar">
                <img 
                    src={profilePic} 
                    alt={fromMe ? 'Your avatar' : `${selectedConversation?.fullName}'s avatar`}
                    className="avatar-image"
                />
            </div>
            {renderMessageContent()}
        </div>
    );
};

export default Message;