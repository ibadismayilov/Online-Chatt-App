import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isActive, setIsActive] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (selectedConversation) {
            setIsActive(true);
            document.querySelector('.sidebar')?.classList.add('hidden');
        }

        // Klaviatura dəyişikliyini izləmək
        const detectKeyboard = () => {
            const isKeyboard = window.visualViewport.height < window.innerHeight;
            setIsKeyboardOpen(isKeyboard);
            
            if (messagesContainerRef.current) {
                messagesContainerRef.current.style.height = 
                    `${window.visualViewport.height}px`;
            }
        };

        window.visualViewport?.addEventListener('resize', detectKeyboard);
        
        return () => {
            window.visualViewport?.removeEventListener('resize', detectKeyboard);
        };
    }, [selectedConversation]);

    const handleBack = () => {
        setIsActive(false);
        setSelectedConversation(null);
        document.querySelector('.sidebar')?.classList.remove('hidden');
    };

    return (
        <div 
            ref={messagesContainerRef}
            className={`messages-container ${isActive ? 'active' : ''} ${isKeyboardOpen ? 'keyboard-open' : ''}`}
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
                    <Messages />
                    <MessagesInput />
                </>
            ) : (
                <NoChatSelected />
            )}
        </div>
    )
}

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='welcome-container'>
            <h1>Welcome {authUser.fullname} 👋</h1>
            <p>Please select a chat to start messaging</p>
        </div>
    )
}

export default MessagesContainer;