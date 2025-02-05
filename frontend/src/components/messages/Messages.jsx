import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
// import Skeleton from 'react-loading-skeleton';
import useListenMessages from '../../hooks/useListenMessages';
import MessageSkeleton from '../skeleton/MessageSkeleton';

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const lastMessage = useRef();
    useListenMessages();

    useEffect(() => {
        setTimeout(() => {
            lastMessage.current?.scrollIntoView({ behavior: "smooth" })
        }, 100);
    }, [messages])

    return (
        <div className='messages'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessage}>
                        <Message message={message} />
                    </div>
                ))}

            {loading && [...Array(2)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center' style={{ color: 'white', fontSize: "25px" }}>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
