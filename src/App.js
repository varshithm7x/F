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

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

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

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/help" element={<Help />} />
            </Routes>
            <ThemeToggle />
          </div>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;
