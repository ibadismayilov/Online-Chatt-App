import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isActive, setIsActive] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const messagesContainerRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Klaviatura yüksəkliyini izləmək
    useEffect(() => {
        const detectKeyboard = () => {
            if (window.visualViewport) {
                const height = window.innerHeight - window.visualViewport.height;
                setKeyboardHeight(height > 0 ? height : 0);
                document.documentElement.style.setProperty('--keyboard-height', `${height}px`);
            }
        };

        window.visualViewport?.addEventListener('resize', detectKeyboard);
        return () => window.visualViewport?.removeEventListener('resize', detectKeyboard);
    }, []);

    // Mesajların sonuna scroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedConversation]);

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
            className={`messages-container ${isActive ? 'active' : ''} ${keyboardHeight > 0 ? 'keyboard-open' : ''}`}
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
                        <div ref={messagesEndRef} />
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