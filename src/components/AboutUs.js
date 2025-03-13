import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './AboutUs.css';

const AboutUs = () => {
    const { isDarkTheme } = useTheme();

    return (
        <div className={`about-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <section className="about-hero">
                <h1>About Us</h1>
                <p className="subtitle">Making mathematics accessible to everyone</p>
            </section>

            <section className="about-content">
                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        We believe that mathematics is not just a subject, but a powerful tool 
                        for understanding the world around us. Our mission is to make mathematics 
                        accessible, engaging, and enjoyable for everyone.
                    </p>
                </div>

                <div className="team-section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-photo">
                                {/* Add team member photo */}
                            </div>
                            <h3>John Doe</h3>
                            <p className="role">Founder & Lead Instructor</p>
                            <p className="bio">
                                Mathematics PhD with 10+ years of teaching experience. 
                                Passionate about making complex concepts simple.
                            </p>
                        </div>

                        <div className="team-member">
                            <div className="member-photo">
                                {/* Add team member photo */}
                            </div>
                            <h3>Jane Smith</h3>
                            <p className="role">Content Director</p>
                            <p className="bio">
                                Educational content specialist with expertise in 
                                creating engaging learning materials.
                            </p>
                        </div>

                        <div className="team-member">
                            <div className="member-photo">
                                {/* Add team member photo */}
                            </div>
                            <h3>Mike Johnson</h3>
                            <p className="role">Technical Lead</p>
                            <p className="bio">
                                Software engineer focused on creating interactive 
                                mathematical tools and visualizations.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="values-section">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <h3>Accessibility</h3>
                            <p>Making math education available to everyone, everywhere.</p>
                        </div>
                        <div className="value-item">
                            <h3>Innovation</h3>
                            <p>Using technology to create better learning experiences.</p>
                        </div>
                        <div className="value-item">
                            <h3>Excellence</h3>
                            <p>Maintaining high standards in all our educational content.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs; 