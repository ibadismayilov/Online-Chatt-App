import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isActive, setIsActive] = useState(false);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (selectedConversation) {
            setIsActive(true);
            document.querySelector('.sidebar')?.classList.add('hidden');
        }
    }, [selectedConversation]);

    const handleBack = () => {
        setIsActive(false);
        setSelectedConversation(null);
        document.querySelector('.sidebar')?.classList.remove('hidden');
    };

    return (
        <div 
            className={`messages-container ${isActive ? 'active' : ''}`}
            ref={messagesContainerRef}
        >
            {selectedConversation ? (
                <>
                    <div className="header">
                        <div className="header-left">
                            <button className="back-button" onClick={handleBack}>
                                <IoIosArrowBack />
                            </button>
                            <div className="user-avatar">
                                <img
                                    src={selectedConversation.profilePic}
                                    alt={selectedConversation.fullname}
                                />
                            </div>
                        </div>
                        <div className='user-fullname'>{selectedConversation.fullname}</div>
                    </div>
                    
                    <div className="messages-content">
                        <Messages />
                    </div>
                    
                    <MessagesInput />
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    )
}

export default MessagesContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='welcome-container'>
            <h1>Welcome {authUser.fullname} 👋</h1>
            <p>Please select a chat to start messaging</p>
        </div>
    )
}