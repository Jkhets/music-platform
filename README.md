# Music Marketplace 🎵

## Project Overview

This is a **music marketplace** where listeners can purchase songs uploaded by artists. The platform allows artists to upload and manage their own songs, while listeners can explore and buy music from various artists. The platform supports role-based navigation, providing customized experiences for both listeners and artists.

## Features

- **User Authentication**: Artists and listeners can sign up, log in, and access role-specific functionalities.
- **Song Upload**: Artists can upload songs with metadata (title, file, etc.) for purchase.
- **Marketplace**: Listeners can browse and purchase songs from various artists.
- **Purchased Songs**: Listeners can view and listen to songs they’ve purchased.
- **Artist Songs**: Artists can view and listen to their own uploaded songs.

## Tech Stack

- **Frontend**:
  - React.js
  - Styled Components
  - React Router for navigation
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose for data modeling
- **Other**:
  - JWT for authentication
  - RESTful APIs for backend services


 ## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Jkhets/music-marketplace.git
   ```

2. **Navigate into the project directories**:

   - **Backend**

   ```bash
   cd music-platform-backend
   ```
   - **Frontend**

    ```bash
     cd music-platform-frontend
    ```

3. **Install Dependencies**:
   
   Run the following command in both the frontend and backend directories:

   ```bash
     npm install
   ```

4. **Set up environment variables**:
   
   Create a .env file in the backend directory with the following values:
   
   ```bash
     MONGO_URI=mongodb://localhost:27017/
     JWT_SECRET=5G4zL7q!A9wE2vD*1@U8F6bY&K3mH^P0jX7L@iZ3oO+N9rQ$uT
   ```

6. **Run script to populate the database**:
   
   In the Backend directory, run this script:
   
   ```bash
     node populateDatabase.js
   ```

7. **Run the application**:

   In the backend directory:
   
   ```bash
     npm start
   ```
   In the frontend directory:
   
   ```bash
     npm start
   ```
   

   
