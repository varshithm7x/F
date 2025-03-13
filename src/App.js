import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignUp } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ThemeToggle from './components/ThemeToggle';
import AboutUs from './components/AboutUs';
import Help from './components/Help';
import './App.css';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Protected route component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Create a separate component for the routes to use the theme context
const AppRoutes = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/help" element={<Help />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/*" element={
        <div className={`login-container ${isDarkTheme ? 'dark' : 'light'}`}>
          <div className="login-card">
            <SignUp 
              routing="path" 
              path="/signup" 
              signInUrl="/login"
              redirectUrl="/dashboard"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
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
                  colorBackground: isDarkTheme ? '#121212' : '#ffffff',
                  colorInputBackground: isDarkTheme ? '#1e1e1e' : '#f5f5f5',
                  colorInputText: isDarkTheme ? '#ffffff' : '#000000',
                  colorButtonText: isDarkTheme ? '#000000' : '#ffffff',
                },
              }}
            />
          </div>
        </div>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <ClerkProvider 
      publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => window.location.href = to}
      options={{
        cookieOptions: {
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        },
        tokenCache: 'cookie'
      }}
    >
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <AppRoutes />
            <ThemeToggle />
          </div>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
