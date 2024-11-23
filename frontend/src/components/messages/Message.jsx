import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {

    const style = {
        background: '#243647',
        color: 'white'
    };

    const { authUser, setAuthUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderID === authUser._id;
    const chatClassName = fromMe ? 'justify-content-end' : 'justify-content-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? { background: '#1980e6', color: 'white' } : style;
    const formattedTime = extractTime(message.createdAt);

    const shakeClass = message ? "animate__animated animate__fadeInRight" : "";


    return (
        <>
            <div className={`message ${chatClassName} ${shakeClass}`}>
                <div className={`user-message ${shakeClass} `} style={bubbleBgColor}>
                    <p className=''>{message.message}</p>
                    {/* Şəklin göstərilməsi */}
                    {message.imageUrl && (
                        <img src={message.imageUrl} alt="Sent image" className="message-image" />
                    )}
                </div>
                <div className='message-user-logo'>
                    <img src={profilePic} alt="" />
                </div>
                <div className='message-time'>
                    {formattedTime}
                </div>
            </div>
        </>
    )
}

export default Message

export function extractTime(dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}