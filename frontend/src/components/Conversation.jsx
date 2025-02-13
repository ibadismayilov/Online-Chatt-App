import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../context/SocketContext';
import useAddContact from '../hooks/useAddContacts';
import useGetContacts from '../hooks/useGetContacs';
import useRemoveContacts from '../hooks/useRemoveContacts';


const Conversation = ({ conversation }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const [isOpen, setIsOpen] = useState(false);
    const { addContact, loading: addLoading } = useAddContact();
    const { contacts } = useGetContacts();
    const { removeContacts, loading: removeLoading } = useRemoveContacts();
    const isAdded = contacts.some((c) => c._id === conversation._id);

    console.log("Conversation Object:", conversation);


    return (
        <div className='search-result-item'>
            <div className="user-avatar-container" onClick={() => setSelectedConversation(conversation)}>
                <img 
                    src={conversation.profilePic} 
                    alt={conversation.fullname}
                    className="avatar-image"
                    onClick={() => setIsOpen(true)}
                />
                <span className={`status-indicator ${isOnline ? 'online' : 'offline'}`} />
            </div>

            <div className='user-info' onClick={() => setSelectedConversation(conversation)}>
                <span className='name'>{conversation.fullname}</span>
                <span className='id'>@{conversation.customID}</span>
            </div>

            <div className="action-buttons">
                {isAdded ? (
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            removeContacts(conversation._id);
                        }}
                        disabled={removeLoading}
                        className="remove-button"
                    >
                        {removeLoading ? 'Deleted...' : 'Delete'}
                    </button>
                ) : (
                    <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            addContact(conversation._id);
                        }}
                        disabled={addLoading}
                        className="add-button"
                    >
                        {addLoading ? 'It is added...' : 'Add'}
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content">
                        <img 
                            src={conversation.profilePic} 
                            alt={conversation.fullname} 
                            className="large-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Conversation;
