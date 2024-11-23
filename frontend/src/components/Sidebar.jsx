import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Settings from './Settings'

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <div className=''>
                <SearchInput />
            </div>
            <div>
                <Conversations />
            </div>
            <div className='setting-buttons'>
                <Settings />
            </div>
        </div>
    )
}

export default Sidebar