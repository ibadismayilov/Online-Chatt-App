import React, { useState } from 'react';
import { RiSettings4Line } from "react-icons/ri";
import LogoutButtons from './LogoutButtons';
import { MdOutlineAccountCircle } from "react-icons/md";

const Settings = () => {

    const [setting, setSetting] = useState(false);

    const toggle = () => {
        setSetting(!setting);
    }

    return (
        <div className='setting'>
            <button type='button' onClick={toggle}>
                <RiSettings4Line className='setting-icon' />
            </button>
            <div className='setting-list'>
                <ul className={`elements ${setting ? 'open' : ''}`}>
                    <li className='list-group-item'><LogoutButtons /></li>
                    <li className='list-group-item account'><MdOutlineAccountCircle className='account-icon' /> Account</li>
                </ul>
            </div>
        </div >
    );
}

export default Settings;
