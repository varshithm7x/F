import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser, useClerk, SignedIn, SignedOut } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
    const { isDarkTheme } = useTheme();
    const [showDropdown, setShowDropdown] = useState(false);
    const { user } = useUser();
    const { signOut } = useClerk();

    const handleSignOut = async () => {
        try {
            await signOut();
            setShowDropdown(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={`navbar ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="nav-brand">
                <Link to="/">
                    <img 
                        src={isDarkTheme ? "/image.png" : "/math-light.png"} 
                        alt="Logo" 
                        className="nav-logo" 
                    />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/courses">courses</Link>
                <Link to="/help">help</Link>
                <Link to="/about">about us</Link>
                
                <SignedIn>
                    <div className="user-profile">
                        <div className="profile-trigger" onClick={toggleDropdown}>
                            {user?.imageUrl ? (
                                <img 
                                    src={user.imageUrl} 
                                    alt="Profile" 
                                    className="profile-photo" 
                                />
                            ) : (
                                <div className="profile-initial">
                                    {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 
                                     user?.emailAddresses?.[0]?.emailAddress.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="user-name">
                                {user?.firstName || user?.emailAddresses?.[0]?.emailAddress.split('@')[0]}
                            </span>
                        </div>
                        
                        {showDropdown && (
                            <div className="profile-dropdown">
                                <Link to="/dashboard" onClick={() => setShowDropdown(false)}>Dashboard</Link>
                                <Link to="/profile" onClick={() => setShowDropdown(false)}>Profile</Link>
                                <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
                            </div>
                        )}
                    </div>
                </SignedIn>
                <SignedOut>
                    <Link to="/login" className="login-btn">login</Link>
                </SignedOut>
            </div>
        </nav>
    );
};

export default Navbar; 