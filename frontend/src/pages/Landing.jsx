import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiImage, FiSmile, FiLock, FiZap, FiGlobe, FiBell, FiUser, FiHeart } from 'react-icons/fi';

const Landing = () => {
    return (
        <div className="landing-container">
            {/* Header */}
            <header className="landing-header">
                <div className="nav-container">
                    <div className="logo-container">
                        <img src="/img/talksy-high-resolution-logo.png" alt="Talksy Logo" />
                        <h1>Talksy</h1>
                    </div>
                    <div className="nav-buttons">
                        <Link to="/login" className="auth-button login">Login</Link>
                        <Link to="/signup" className="auth-button signup">Sign Up</Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Connect with friends through <span>instant messaging</span></h1>
                    <p>
                        Experience real-time communication with a modern and secure chat platform. 
                        Share messages, images, and emotions with friends and family instantly.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/signup" className="cta-button primary">Get Started</Link>
                        <Link to="/about" className="cta-button secondary">Learn More</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="floating-card card-1">
                        <div className="card-avatar">
                            <FiBell />
                        </div>
                        <div className="card-content">
                            <div className="card-title">New Message</div>
                            <div className="card-subtitle">Just now</div>
                        </div>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-avatar">
                            <FiUser />
                        </div>
                        <div className="card-content">
                            <div className="card-title">Online</div>
                            <div className="card-subtitle">Active now</div>
                        </div>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-avatar">
                            <FiHeart />
                        </div>
                        <div className="card-content">
                            <div className="card-title">New Like</div>
                            <div className="card-subtitle">2m ago</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Why Choose Talksy?</h2>
                    <p>Discover the features that make our chat platform stand out from the rest</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiMessageSquare />
                        </div>
                        <h3>Real-time Chat</h3>
                        <p>Experience instant messaging with real-time message delivery and typing indicators.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiImage />
                        </div>
                        <h3>Image Sharing</h3>
                        <p>Share your favorite moments with friends through instant image sharing.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiSmile />
                        </div>
                        <h3>Emoji Support</h3>
                        <p>Express yourself better with our wide range of emoji support.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiLock />
                        </div>
                        <h3>Secure Messaging</h3>
                        <p>Your conversations are protected with end-to-end encryption.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiZap />
                        </div>
                        <h3>Fast & Reliable</h3>
                        <p>Built with modern technology to ensure speed and reliability.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiGlobe />
                        </div>
                        <h3>Cross Platform</h3>
                        <p>Access your messages from any device, anywhere, anytime.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing; 