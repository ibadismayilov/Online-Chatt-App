import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login({ username, password });
    }

    return (
        <div className='login-wrapper'>
            <div className='login-window'>
                <form class="form" onSubmit={handleSubmit}>
                    <p class="form-title">Sign in to your account</p>
                    <div class="input-container">
                        <input type="text" placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                        <span></span>
                    </div>
                    <div class="input-container">
                        <input type="password" placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" class="submit" disabled={loading}>
                        {loading ? <div>Loading...</div> : 'Sign in'}
                    </button>

                    <p class="signup-link">
                        No account?
                        <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div >
    )
}

export default Login