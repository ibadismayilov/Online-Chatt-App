import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({ conversation, lastIndex }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;

    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`conversation ${isSelected ? 'conversation-bg' : ''}`} >
            <div className='d-flex align-items-center'>
                <div className='users-logo'>
                    <img src={conversation.profilePic} alt="Profile Small" className="small-image" onClick={() => setIsOpen(true)} />

                    <div>
                        {isOpen && (
                            <div className="modal-effect" onClick={() => setIsOpen(false)}>
                                <img src={conversation.profilePic} alt="Profile Large" className="large-image" />
                            </div>
                        )}
                    </div>
                </div>
                <div className='users-name mx-4' onClick={() => setSelectedConversation(conversation)}>
                    <p style={{ color: 'white' }}>{conversation.fullname}</p>
                </div>
            </div>
            <div className={`online-user ${isOnline ? 'online' : 'offline'}`}></div>
        </div>
    )
}

export default Conversation;
