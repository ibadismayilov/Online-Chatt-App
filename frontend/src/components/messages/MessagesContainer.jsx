import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { IoIosArrowBack } from 'react-icons/io';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [isActive, setIsActive] = useState(false);

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
        <div className={`messages-container ${isActive ? 'active' : ''}`}>
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
                                    alt={selectedConversation.fullName}
                                />
                            </div>
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