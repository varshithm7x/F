import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle-container">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                />
                <span className="slider">
                    <span className="slider-text">
                        {isDarkTheme ? 'Dark' : 'Light'}
                    </span>
                </span>
            </label>
        </div>
    );
};

export default ThemeToggle; 