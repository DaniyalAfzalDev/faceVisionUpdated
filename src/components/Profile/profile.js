import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faCamera, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import './profile.css';
import Default_picture from '../../assets/profile.jpg';

function ProfileSettings() {
    // State for profile data
    const [profileData, setProfileData] = useState({
        profileName: 'Kevin Heart',
        username: 'kevinunhuy',
        status: 'On duty',
        about: 'Discuss only on work hours, unless you wanna discuss about music 🎵',
        profilePicture: Default_picture, // Set imported default profile picture
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        });
    };

    // Handle profile picture change
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData({
                ...profileData,
                profilePicture: URL.createObjectURL(file), // Update profile picture with selected file
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile data saved:', profileData);
    };

    return (
        <div className="profile-settings">
            <form onSubmit={handleSubmit}>
                <div className="profile-picture-container">
                    <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
                    <input type="file" id="file-input" onChange={handleProfilePictureChange} style={{ display: 'none' }} />
                    <div className="profile-buttons">
                        <button type="button" onClick={() => document.getElementById('file-input').click()}>
                            <FontAwesomeIcon icon={faCamera} /> Change picture
                        </button>
                        <button type="button" onClick={() => setProfileData({ ...profileData, profilePicture: Default_picture })}>
                            <FontAwesomeIcon icon={faTrash} /> Delete picture
                        </button>
                    </div>
                </div>

                <div>
                    <label>Profile Name:</label>
                    <input
                        type="text"
                        name="profileName"
                        value={profileData.profileName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Status Recently:</label>
                    <input
                        type="text"
                        name="status"
                        value={profileData.status}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>About Me:</label>
                    <textarea
                        name="about"
                        value={profileData.about}
                        onChange={handleChange}
                    />
                </div>

                <button className='profile-submit' type="submit">Save changes</button>
            </form>
        </div>
    );
}

export default ProfileSettings;
