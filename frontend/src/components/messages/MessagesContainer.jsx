import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessagesInput from './MessagesInput'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const MessagesContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation();
    }, [setSelectedConversation]);

    return (
        <div className='messages-container'>
            {!selectedConversation ? (<NoChatSelected />) :
                (<>
                    <header className='header'>
                        <div className='user-fullname'>{selectedConversation.fullname}</div>
                    </header>
                    <main>
                        <div>
                            <Messages />
                        </div>
                        <div className='messages-container-inputjsx'>
                            <MessagesInput />
                        </div>
                    </main>
                </>)}
        </div>
    )
}

export default MessagesContainer;

const NoChatSelected = () => {

    const { authUser } = useAuthContext();
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <h1 style={{ color: 'white' }}>Welcome {authUser.fullname}</h1>
        </div>
    )
}