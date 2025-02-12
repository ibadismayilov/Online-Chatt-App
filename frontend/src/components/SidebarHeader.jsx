import React, { useState } from 'react'
import SearchInput from './SearchInput'
import { IoSearchOutline } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import LogoutButtons from './LogoutButtons';
const SidebarHeader = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className='sidebar-header'>
            <div className='header-content'>
                {/* Logo */}
                <div className='logo'>
                    <h2>Logo</h2>
                </div>

                {/* Actions */}
                <div className='header-actions'>
                    <button 
                        className='action-button search-btn'
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        <IoSearchOutline />
                    </button>
                    
                    <div className='options-container'>
                        <button 
                            className='action-button options-btn'
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <IoEllipsisVerticalSharp />
                        </button>

                        {showOptions && (
                            <div className='options-menu'>
                                <ul>
                                    <li>Profile</li>
                                    <li>Settings</li>
                                    <li>
                                        <LogoutButtons />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Input */}
            {showSearch && (
                <div className='search-container'>
                    <SearchInput />
                </div>
            )}
        </div>
    )
}

export default SidebarHeader