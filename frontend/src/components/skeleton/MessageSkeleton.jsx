import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => {
    return (
        <ContentLoader viewBox="0 0 233 80" {...props}>
            <circle cx="10" cy="12" r="8" />
            <rect x="20" y="6" rx="3" ry="3" width="110" height="5" />
            <rect x="20" y="15" rx="3" ry="3" width="110" height="5" />
            <circle cx="210" cy="35" r="8" />
            <rect x="90" y="38" rx="3" ry="3" width="110" height="5" />
            <rect x="90" y="29" rx="3" ry="3" width="110" height="5" />
            <circle cx="10" cy="58" r="8" />
            <rect x="22" y="52" rx="3" ry="3" width="110" height="5" />
            <rect x="22" y="61" rx="3" ry="3" width="110" height="5" />
        </ContentLoader>
    )
}

export default Skeleton;
