import React from 'react';
import Conversation from './Conversation';
import useGetContacts from '../hooks/useGetContacs'; 
import ConversationsSkeleton from './skeleton/ConversationsSkeleton';

const Conversations = () => {
    const { loading, contacts } = useGetContacts();

    return (
        <div className='conversations mt-3'>
            <ul className='users-list'>
                {contacts?.map((conversation, index) => (
                    <li className='list-group-item'
                        key={conversation._id}>
                        <Conversation conversation={conversation} lastIndex={index === contacts.length - 1} />
                    </li>
                ))}
                {loading && [...Array(5)].map((_, idx) =>
                    <ConversationsSkeleton key={idx} />
                )}
            </ul>
        </div>
    )
}

export default Conversations;
