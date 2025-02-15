import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput'
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import LogoutButtons from './LogoutButtons';

const SidebarHeader = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className='sidebar-header'>
            <div className='header-content'>
                <SearchInput />
                
                <div className='header-actions'>
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
                                    <li>
                                        <Link to="/profile" onClick={() => setShowOptions(false)}>
                                            Profile
                                        </Link>
                                    </li>
                                    {/* <li>Settings</li> */}
                                    <li>
                                        <LogoutButtons />
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarHeader