# Rian Takser

## Overview

This Task Management Application allows users to manage their tasks efficiently by categorizing them into three sections: To-Do, In Progress, and Done. Users can add, edit, delete, and reorder tasks using a drag-and-drop interface. The application supports Firebase Authentication for secure login and ensures real-time

## Live Links

- [Live Demo](https://task-management-cp.web.app)

## Dependencies

- **@dnd-kit/core:** Drag and drop utilities for React.
- **@tanstack/react-query:** Data fetching and synchronization library for React.
- **axios:** Promise-based HTTP client.
- **firebase:** Firebase library for authentication and database.
- **react:** JavaScript library for building user interfaces.
- **react-hook-form:** Form handling and validation library for React.
- **react-router:** Routing library for React.
- **zustand:** Lightweight state management library.
- **tailwindcss:** Utility-first CSS framework.




## Technologies Used

- **React**: A powerful frontend library used for building dynamic user interfaces.
- **Tailwind CSS**: A utility-first CSS framework that provides rapid styling capabilities.
- **Firebase**: A comprehensive backend service used for authentication, database management, and real-time data syncing.
- **React Router**: A standard library for routing and navigation in React applications.
- **React Beautiful DnD**: A drag-and-drop library for smooth and accessible drag-and-drop interactions.
- **React Toastify**: A notification library that provides easy-to-use, customizable toast messages.
- **Node.js & Express.js**: Used for building server-side applications and managing backend operations.



## Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/rianhasansiam/Task-Management-App.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Task-Management-App
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables:
    ```dotenv
    VITE_BASE_API_URL=http://localhost:5000/api
    VITE_FIREBASE_API_KEY=your-firebase-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-firebase-app-id
    VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
    ```

5. Start the frontend development server:
    ```bash
    npm start
    ```





