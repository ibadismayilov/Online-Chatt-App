import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isActive, setIsActive] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        if (selectedConversation) {
            setIsActive(true);
            document.querySelector('.sidebar')?.classList.add('hidden');
        }
    }, [selectedConversation]);

    useEffect(() => {
        const detectKeyboard = () => {
            // Mobil cihazlarda klaviatura açıq/bağlı vəziyyətini təyin edirik
            const isKeyboard = window.visualViewport.height < window.innerHeight;
            setIsKeyboardOpen(isKeyboard);
            
            if (isKeyboard) {
                // Klaviatura hündürlüyünü CSS dəyişəninə mənimsədirik
                document.documentElement.style.setProperty(
                    '--keyboard-height',
                    `${window.innerHeight - window.visualViewport.height}px`
                );
            }
        };

        // visualViewport dəyişikliklərini izləyirik
        window.visualViewport?.addEventListener('resize', detectKeyboard);
        
        return () => {
            window.visualViewport?.removeEventListener('resize', detectKeyboard);
        };
    }, []);

    const handleBack = () => {
        setIsActive(false);
        setSelectedConversation(null);
        document.querySelector('.sidebar')?.classList.remove('hidden');
    };

    return (
        <div className={`messages-container ${isActive ? 'active' : ''} ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
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
                            <div className='user-fullname'>{selectedConversation.fullname}</div>
                        </div>
                    </div>
                    <Messages />
                    <MessagesInput />
                </>
            ) : (
                <div className="no-messages">
                    <NoChatSelected />
                </div>
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