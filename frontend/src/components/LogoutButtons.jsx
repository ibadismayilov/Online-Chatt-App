import React from 'react'
import useLogout from '../hooks/useLogout'
import { BiLogOutCircle } from "react-icons/bi";

const LogoutButtons = () => {

    const { loading, logout } = useLogout();

    return (
        <div className='logout-button'>
            {!loading ? (
                <button
                    onClick={logout}
                    type='button'
                    style={{ cursor: 'pointer' }}><BiLogOutCircle className='logout-icon' /></button>

            ) : (
                <div class="spinner"></div>
            )}
        </div>
    )
}

export default LogoutButtons