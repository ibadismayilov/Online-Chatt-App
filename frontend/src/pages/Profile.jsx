import React from 'react';
import { IoArrowBack, IoCamera } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Profile = () => {
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
                                src="https://example.com/avatar.jpg" 
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
                                value="Farid Rahimli"
                                readOnly
                            />
                        </div>

                        <div className="info-group">
                            <label>Custom ID</label>
                            <input 
                                type="text"
                                placeholder="@username"
                                value="@52JdL"
                                readOnly
                            />
                        </div>

                        <div className="info-group">
                            <label>Bio</label>
                            <textarea 
                                placeholder="Özünüz haqqında məlumat..."
                                rows="4"
                            />
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            <input 
                                type="email"
                                placeholder="Email"
                                value="example@mail.com"
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