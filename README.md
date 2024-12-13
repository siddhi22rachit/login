# Login, Register, and Profile MERN Stack Application

This project is a full-stack application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides functionalities for user registration, login, and profile management.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Technologies Used

- **MongoDB** - NoSQL database for storing user data
- **Express.js** - Web framework for Node.js
- **React.js** - Frontend library for building user interfaces
- **Node.js** - JavaScript runtime environment for the backend
- **JWT (JSON Web Tokens)** - Authentication mechanism for secure login
- **Bcrypt.js** - For password hashing
- **Axios** - For making HTTP requests from the frontend
- **Cors** - To handle cross-origin requests

---

## Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Backend Setup

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/siddhi22rachit/login.git
   cd login/backend
   ```

2. **Install Dependencies**

   Navigate to the backend folder and install the required dependencies using npm:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root of the backend directory with the following variables:

   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   - **MONGO_URI**: Your MongoDB connection string. If you're using MongoDB Atlas, you can find this in your MongoDB dashboard.
   - **JWT_SECRET**: Secret key for signing JWT tokens (ensure this is a random and secure string).
   - **PORT**: The port on which your backend will run (default is `5000`).

4. **Start the Backend Server**

   To start the backend server, run:

   ```bash
   npm start
   ```

   Your backend will be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**

   Change to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   Install the required dependencies for the frontend:

   ```bash
   npm install
   ```

3. **Configure API URL**

   In your frontend, configure the API URL in the code (typically in the environment file or the Axios configuration). If you are running both the frontend and backend locally, set the API URL to:

   ```javascript
   const API_URL = "http://localhost:5000";
   ```

4. **Start the Frontend Server**

   Start the frontend server:

   ```bash
   npm start
   ```

   The frontend will be running on `http://localhost:3000`.

---

## Running the Application

1. **Start Backend**: 

   Ensure the backend server is running by executing:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`.

2. **Start Frontend**:

   In the frontend folder, run:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

- **POST /api/auth/register**  
  - Register a new user with email and password.
  - Request Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**  
  - Login an existing user and receive a JWT token.
  - Request Body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt_token_here" }`

- **GET /api/auth/profile**  
  - Get the profile of the logged-in user.
  - Headers: `Authorization: Bearer <jwt_token>`
  - Response: `{ "email": "user@example.com", "profileData": { ... } }`

---

## License

This project is licensed under the MIT License.

---

You can copy and paste this template into a `README.md` file in your project root directory. Don't forget to replace placeholders with your actual project details if necessary!
