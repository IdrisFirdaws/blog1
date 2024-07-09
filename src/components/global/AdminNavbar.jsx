import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons';
import { UserContext } from '../../UserContext';

export default function AdminNavbar() {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const { setUserInfo, userInfo } = useContext(UserContext);
    // const [redirectLogin, setRedirectLogin] = useState(false);

    const toggleNavVisibility = () => {
        setIsNavVisible(!isNavVisible);
    };

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                });
            }
        });
    }, [setUserInfo]);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(() => {
            setUserInfo(null);
            // setRedirectLogin(true); // Set redirection state to true
        });
    }

    const username = userInfo?.username;

    // if (redirectLogin) {
    //     return <Navigate to={'/login'} />;
    // }

    return (
        <div className='navbar'>
            <div className="brand">
                <Link to='/admin'>
                    My Blog
                </Link>
            </div>
            <div className="nav-toggle" onClick={toggleNavVisibility}>
                {isNavVisible ? <icon.X /> : <icon.List />} {/* Toggle icons based on state */}
            </div>
            <div className={`nav ${isNavVisible ? 'visible' : ''}`}>
                {username ? (
                    <>
                        <NavLink to='/admin/create' className='navItem' onClick={toggleNavVisibility}>
                            Create new post
                        </NavLink>
                        <a className='navItem' onClick={() => { toggleNavVisibility(); logout(); }}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <NavLink className='navItem' to='/admin/about' onClick={toggleNavVisibility}>
                            About
                        </NavLink>
                        <NavLink className='navItem' to='/admin/contact' onClick={toggleNavVisibility}>
                            Contact
                        </NavLink>
                        <NavLink className='navItem' to='/admin/login' onClick={toggleNavVisibility}>
                            Login
                        </NavLink>
                        <NavLink className='navItem' to='/admin/register' onClick={toggleNavVisibility}>
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}
