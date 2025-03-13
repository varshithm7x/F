import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser, useClerk } from '@clerk/clerk-react';
import './Profile.css';

const Profile = () => {
    const { isDarkTheme } = useTheme();
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    
    // Form fields
    const [displayName, setDisplayName] = useState(user?.firstName || '');
    const [bio, setBio] = useState(user?.unsafeMetadata?.bio || '');
    const [interests, setInterests] = useState(user?.unsafeMetadata?.interests || []);
    const [newInterest, setNewInterest] = useState('');
    
    // Profile photo
    const [photoURL, setPhotoURL] = useState(user?.imageUrl || '');
    const [photoFile, setPhotoFile] = useState(null);
    const fileInputRef = useRef(null);
    
    // Tabs
    const [activeTab, setActiveTab] = useState('general');
    
    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };
    
    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoFile(file);
            
            // Create a temporary URL for preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAddInterest = () => {
        if (newInterest.trim() !== '' && !interests.includes(newInterest.trim())) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest('');
        }
    };
    
    const handleRemoveInterest = (interest) => {
        setInterests(interests.filter(item => item !== interest));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });
        
        try {
            // First update the basic profile info
            await user.update({
                firstName: displayName,
            });

            // Then update the metadata with both bio and interests
            await user.update({
                unsafeMetadata: {
                    bio: bio,
                    interests: interests
                }
            });
            
            // If there's a new profile photo, upload it
            if (photoFile) {
                await user.setProfileImage({ file: photoFile });
            }
            
            setMessage({ 
                text: 'Profile updated successfully!', 
                type: 'success' 
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ 
                text: 'Failed to update profile. Please try again.', 
                type: 'error' 
            });
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <div className={`profile-container ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="profile-header">
                <h1>Your Profile</h1>
                <p>Manage your account settings and preferences</p>
            </div>
            
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
            
            <div className="profile-content">
                <div className="profile-sidebar">
                    <div className="profile-photo-container" onClick={handlePhotoClick}>
                        {photoURL ? (
                            <img src={photoURL} alt="Profile" className="profile-photo" />
                        ) : (
                            <div className="profile-photo-placeholder">
                                {displayName ? displayName.charAt(0).toUpperCase() : user?.primaryEmailAddress?.emailAddress.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="photo-edit-overlay">Change Photo</div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handlePhotoChange} 
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                    
                    <div className="profile-tabs">
                        <button 
                            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`}
                            onClick={() => setActiveTab('preferences')}
                        >
                            Preferences
                        </button>
                    </div>
                </div>
                
                <div className="profile-main">
                    <form onSubmit={handleSubmit} className="profile-form">
                        {activeTab === 'general' && (
                            <div className="form-section">
                                <h2>General Information</h2>
                                
                                <div className="form-group">
                                    <label htmlFor="displayName">Display Name</label>
                                    <input
                                        id="displayName"
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your display name"
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="email-info">
                                        <span>{user?.primaryEmailAddress?.emailAddress}</span>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="bio">Bio</label>
                                    <textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself"
                                        rows={4}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Interests</label>
                                    <div className="interests-container">
                                        {interests.map((interest, index) => (
                                            <div key={index} className="interest-tag">
                                                {interest}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveInterest(interest)}
                                                    className="remove-interest"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="add-interest">
                                        <input
                                            type="text"
                                            value={newInterest}
                                            onChange={(e) => setNewInterest(e.target.value)}
                                            placeholder="Add an interest"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={handleAddInterest}
                                            className="add-interest-btn"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <label>Account Management</label>
                                    <p className="field-note">
                                        Manage your account settings, password, and security options.
                                    </p>
                                    <button 
                                        type="button" 
                                        className="clerk-button"
                                        onClick={() => {
                                            openUserProfile({
                                                tab: "security"
                                            });
                                        }}
                                    >
                                        Manage Account
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'preferences' && (
                            <div className="form-section">
                                <h2>Preferences</h2>
                                
                                <div className="form-group">
                                    <label>Theme Preference</label>
                                    <p className="field-note">
                                        You can change your theme using the theme toggle button in the corner of the screen.
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="save-button"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                className="cancel-button"
                                onClick={() => navigate('/dashboard')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile; 