

# 💬 Online Chat Application

This is a simple real-time chat application built using Node.js and Socket.IO. It allows users to send messages instantly and see who has joined or left the chat.

## 🚀 Key Features

- Real-time Messaging: Messages are instantly visible to all users.
- Usernames: Everyone can join the chat by entering their name.
- User Notifications: Notifications show who joined or left the chat.
- Clean Design: Simple and user-friendly interface.

## 🛠️ Technologies Used

### Front-end

- HTML: For structuring the page.
- CSS: For styling and visual appearance.
- JavaScript: For front-end logic and user interactions.

### Back-end

- Node.js: For the server side.
- Express.js: To create the web server.
- Socket.IO: For real-time, bi-directional communication between server and browser.

## 🌐 Live Demo

You can check the live version of the app here:  
[Online Chat Application](https://online-chatt-app-11.onrender.com)

## 💻 Running Locally

To run the project on your local machine, follow these steps:

- Clone the repository:  
git clone https://github.com/YourUsername/YourProjectName.git

- Navigate into the project folder:  
cd YourProjectName

- Install the required dependencies:  
npm install

- Create a `.env` file in the root directory and add the following environment variables:  
JWT_SECRET=your_jwt_secret_key  
MONGODB_URI=your_mongodb_connection_string  
NODE_ENV=development  
PORT=3000  
VITE_SOCKET_URL=http://localhost:3000  

- Variable descriptions:  
  - JWT_SECRET: Secret key used for signing JSON Web Tokens.  
  - MONGODB_URI: Connection string for your MongoDB database.  
  - NODE_ENV: Environment mode (development or production).  
  - PORT: Port number where the server will run (default: 3000).  
  - VITE_SOCKET_URL: URL for Socket.IO connection on the client side.

Make sure to replace the placeholder values with your actual configuration.

- Start the application:  
npm start

- Open your browser and go to:  
http://localhost:3000

## 👨‍💻 Author

İbad İsmayılov

[LinkedIn]([your-linkedin-url](https://www.linkedin.com/in/ibad-ismayılov-90a669317/)

