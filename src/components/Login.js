import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SignIn } from '@clerk/clerk-react';
import './Login.css';

const Login = () => {
    const { isDarkTheme } = useTheme();

    return (
        <div className={`login-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="login-card">
                <SignIn 
                    routing="path" 
                    path="/login"
                    redirectUrl="/dashboard"
                    appearance={{
                        elements: {
                            rootBox: "clerk-root",
                            card: "clerk-card",
                            headerTitle: "clerk-title",
                            headerSubtitle: "clerk-subtitle",
                            socialButtonsBlockButton: "clerk-social-button",
                            formButtonPrimary: "clerk-primary-button",
                            formFieldInput: "clerk-input",
                            footerAction: "clerk-footer-action",
                            footer: "clerk-footer",
                            powerButton: "clerk-powered-by",
                        },
                        variables: {
                            colorPrimary: isDarkTheme ? '#ffffff' : '#000000',
                            colorText: isDarkTheme ? '#ffffff' : '#000000',
                            colorBackground: isDarkTheme ? '#000000' : '#f5f5f5',
                            colorInputBackground: isDarkTheme ? '#1e1e1e' : '#f5f5f5',
                            colorInputText: isDarkTheme ? '#ffffff' : '#000000',
                            colorButtonText: isDarkTheme ? '#000000' : '#ffffff',
                        },
                    }}
                    signUpUrl="/signup"
                    afterSignInUrl="/dashboard"
                    afterSignUpUrl="/dashboard"
                />
            </div>
        </div>
    );
};

export default Login; 