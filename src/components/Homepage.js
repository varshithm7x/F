import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Homepage.css';

const Homepage = () => {
    const { isDarkTheme } = useTheme();

    useEffect(() => {
        document.querySelector('.homepage').classList.add('loaded');
    }, []);

    return (
        <div className={`homepage ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="hero">
                <div className="hero-content">
                    <div className="logo-container">
                        <img 
                            src={isDarkTheme ? "homepage-mid-logo-dark.png" : "homepage-mid-logo-light.png"}
                            alt="Math Logo" 
                            className="hero-logo"
                        />
                    </div>
                    <h1 className="animate-up">StudyPy</h1>
                    <p className="animate-up delay-1">Math isn't just numbers</p>
                    <p className="animate-up delay-2">it's the key to understanding the universe!</p>
                    <button className="start-btn animate-up delay-3">Start Learning</button>
                </div>
            </div>

            <section className="features">
                <h2>What We Offer</h2>
                <div className="feature-items">
                    <div className="feature-item">
                        <h3>Learn by Level</h3>
                        <p>From elementary to advanced mathematics, find content suited to your level</p>
                    </div>
                    <div className="feature-item">
                        <h3>Explore Fields</h3>
                        <p>Discover different mathematical fields from algebra to calculus</p>
                    </div>
                    <div className="feature-item">
                        <h3>Interactive Tools</h3>
                        <p>Use our calculators and interactive demonstrations to enhance learning</p>
                    </div>
                    <div className="feature-item">
                        <h3>Visual Learning</h3>
                        <p>Watch animated demonstrations of mathematical concepts</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Choose Your Path</h3>
                        <p>Select your math level or field of interest</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Learn Interactively</h3>
                        <p>Engage with dynamic content and real-time examples</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Master Concepts</h3>
                        <p>Practice with exercises and track your progress</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage; 