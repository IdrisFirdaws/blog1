import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                const userInfo = await response.json();
                console.log('Login successful:', userInfo);
                setUserInfo(userInfo);
                setRedirect(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    }

    if (redirect) {
        return <Navigate to={'/admin'} />;
    }

    return (
        <div className='register'>
            <div className="registerTitle">
                Login
            </div>
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder='username'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}
