import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import SidebarHeader from './SidebarHeader'

const Sidebar = () => {
    return (
        <div className='sidebar' >
            <div>
                <SidebarHeader/>
            </div>
            {/* <div className=''>
                <SearchInput />
            </div> */}
            <div>
                <Conversations />
            </div>
        </div>
    )
}

export default Sidebar