import React from 'react'

const MessageSkeleton = ({ isRight }) => {
    return (
        <div className={`message-skeleton ${isRight ? 'right' : ''}`}>
            <div className="avatar-skeleton"></div>
            <div className="content-skeleton">
                <div className="name-skeleton"></div>
                <div className="text-skeleton"></div>
                <div className="text-skeleton"></div>
            </div>
        </div>
    )
}

const MessageSkeletonList = () => {
    return (
        <div className="messages-skeleton-container">
            {[1, 2, 3].map((_, index) => (
                <MessageSkeleton key={index} isRight={index % 2 === 0} />
            ))}
        </div>
    )
}

export default MessageSkeletonList;
