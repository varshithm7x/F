import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp, useClerk } from '@clerk/clerk-react';
import './Login.css';

const LoginBackup = () => {
    const { isDarkTheme } = useTheme();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isSignUp, setIsSignUp] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();
    const { openSignIn } = useClerk();

    const handleEmailPasswordSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            if (isSignUp) {
                const result = await signUp.create({
                    emailAddress: email,
                    password,
                });
                
                if (result.status === 'complete') {
                    await signIn.create({
                        identifier: email,
                        password,
                    });
                    navigate('/dashboard');
                } else {
                    console.log("Verification needed:", result);
                }
            } else {
                const result = await signIn.create({
                    identifier: email,
                    password,
                });
                
                if (result.status === 'complete') {
                    navigate('/dashboard');
                }
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error with authentication:", error);
            setError(error.message || "Authentication failed. Please try again.");
        }
    };
    
    const handleGoogleSignIn = () => {
        setError('');
        openSignIn({ redirectUrl: '/dashboard' });
    };

    return (
        <div className={`login-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="login-card">
                {/* ... rest of your existing login UI ... */}
            </div>
        </div>
    );
};

export default LoginBackup; 