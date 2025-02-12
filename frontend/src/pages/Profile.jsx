import React from 'react';
import { IoArrowBack, IoCamera } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
    const { authUser } = useAuthContext();

    if (!authUser) return null;

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-header">
                    <Link to="/" className="back-button">
                        <IoArrowBack />
                    </Link>
                    <h1>Profile</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-avatar-section">
                        <div className="avatar-container">
                            <img 
                                src={authUser.profilePic} 
                                alt="Profile" 
                                className="profile-avatar"
                            />
                            <button className="change-avatar-button">
                                <IoCamera />
                            </button>
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-value">256</span>
                                <span className="stat-label">Kontaktlar</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">1.2K</span>
                                <span className="stat-label">Mesajlar</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">85</span>
                                <span className="stat-label">Media</span>
                            </div>
                        </div>

                        <div className="info-group">
                            <label>Ad Soyad</label>
                            <input 
                                type="text"
                                placeholder="Ad Soyad"
                                defaultValue={authUser.fullname}
                                readOnly
                            />
                        </div>

                        <div className="info-group">
                            <label>Custom ID</label>
                            <input 
                                type="text"
                                placeholder="@username"
                                defaultValue={authUser.customID || "@" + authUser.username}
                                readOnly
                            />
                        </div>

                        <div className="info-group">
                            <label>Bio</label>
                            <textarea 
                                placeholder="Özünüz haqqında məlumat..."
                                rows="4"
                                defaultValue={authUser.bio}
                            />
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            <input 
                                type="email"
                                placeholder="Email"
                                defaultValue={authUser.email}
                                readOnly
                            />
                        </div>

                        <button className="save-profile-button">
                            Məlumatları Yenilə
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 