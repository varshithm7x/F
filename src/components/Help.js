import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Help.css';

const Help = () => {
    const { isDarkTheme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I get started?",
            answer: "Start by exploring our courses section. Choose a topic that interests you or matches your current level. Each course begins with fundamentals and progressively moves to advanced concepts."
        },
        {
            question: "Are the courses free?",
            answer: "Yes, most of our basic content is free. We also offer premium courses with additional features, practice problems, and personalized feedback."
        },
        {
            question: "Can I track my progress?",
            answer: "Yes! Once you create an account, you can track your progress across all courses, save your favorite lessons, and earn certificates as you complete modules."
        },
        {
            question: "What topics do you cover?",
            answer: "We cover a wide range of mathematical topics including Algebra, Geometry, Calculus, Statistics, and more. Each topic has multiple difficulty levels to suit different learning needs."
        },
        {
            question: "Do you provide practice problems?",
            answer: "Yes, each lesson includes interactive practice problems with step-by-step solutions to help reinforce your understanding."
        },
        {
            question: "Is there a mobile app available?",
            answer: "We're currently developing our mobile app. For now, our website is fully responsive and works great on mobile devices."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={`help-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <section className="help-hero">
                <h1>Help Center</h1>
                <p className="subtitle">Find answers to your questions</p>
            </section>

            <section className="help-content">
                <div className="contact-section">
                    <h2>Need Support?</h2>
                    <div className="contact-options">
                        <div className="contact-card">
                            <div className="icon email-icon"></div>
                            <h3>Email Us</h3>
                            <p>Get a response within 24 hours</p>
                            <a href="mailto:support@themathguy.com">support@mathproject.com</a>
                        </div>
                        <div className="contact-card">
                            <div className="icon chat-icon"></div>
                            <h3>Live Chat</h3>
                            <p>Available 9 AM - 5 PM EST</p>
                            <button className="chat-button">Start Chat</button>
                        </div>
                    </div>
                </div>

                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="faq-question">
                                    <h3>{faq.question}</h3>
                                    <span className="arrow"></span>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Help; 