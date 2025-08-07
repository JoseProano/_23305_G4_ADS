# Rabbit Management System

## Overview
The Rabbit Management System is a full-stack application designed to manage data related to rabbits. It allows users (breeders) to register, edit, delete, and consult information about rabbits, including their breed, code, sex, age, weight, and purpose.

## Features
- **CRUD Operations**: Users can create, read, update, and delete rabbit records.
- **Data Validation**: Ensures that all input data meets specified criteria before being processed.
- **User-Friendly Interface**: A React-based frontend provides an intuitive interface for managing rabbit data.
- **MongoDB Integration**: The application uses MongoDB for data storage, ensuring persistence and scalability.

## Technologies Used
- **Backend**: 
  - Node.js
  - Express
  - MongoDB (Mongoose)
- **Frontend**: 
  - React
  - React Router

## Project Structure
```
rabbit-management-system
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Backend Setup
1. Navigate to the `backend` directory.
2. Create a `.env` file and add your MongoDB connection string:

3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage
- Access the frontend application through your web browser.
- Use the sidebar menu to navigate between different functionalities such as registering, editing, and deleting rabbit records.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
