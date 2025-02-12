import React from 'react'

const ConversationsSkeleton = () => {
    return (
        <div className="conversation-skeleton">
            <div className="avatar-skeleton"></div>
            <div className="content-skeleton">
                <div className="name-skeleton"></div>
                <div className="text-skeleton"></div>
            </div>
            <div className="status-skeleton"></div>
        </div>
    )
}

export default ConversationsSkeleton