import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import * as icon from 'react-bootstrap-icons';
import { UserContext } from '../../UserContext';

export default function VisitorNavbar() {
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
                <Link to='/'>
                    My Blog
                </Link>
            </div>
            <div className="nav-toggle" onClick={toggleNavVisibility}>
                {isNavVisible ? <icon.X /> : <icon.List />} {/* Toggle icons based on state */}
            </div>
            <div className={`nav ${isNavVisible ? 'visible' : ''}`}>
                <NavLink to='/' className='navItem'>
                    Home
                </NavLink>

                <NavLink to='/about' className='navItem'>
                    About Us
                </NavLink>
            </div>
        </div>
    );
}
