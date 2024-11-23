import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({ conversation, lastIndex }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <div className={`conversation ${isSelected ? 'conversation-bg' : ''}`} onClick={() => setSelectedConversation(conversation)} >
            <div className='d-flex align-items-center'>
                <div className='users-logo'>
                    <img src={conversation.profilePic} alt="" />
                </div>
                <div className='users-name mx-4'>
                    <p style={{ color: 'white' }}>{conversation.fullname}</p>
                </div>
            </div>
            <div className={`online-user ${isOnline ? 'online' : 'offline'}`}></div>
        </div>
    )
}

export default Conversation;
