# Rabbit Management System - Frontend

## Overview
This project is a Rabbit Management System that allows users to manage data related to rabbits. The frontend is built using React and provides a user-friendly interface for performing CRUD operations on rabbit data.

## Features
- **Register Rabbit**: Users can register new rabbits by providing details such as race, code, sex, age, weight, and purpose.
- **Edit Rabbit**: Users can edit the details of existing rabbits.
- **Delete Rabbit**: Users can delete rabbits from the system.
- **View Rabbits**: Users can view a list of all registered rabbits and filter them by race or code.

## Project Structure
```
frontend
├── public
│   └── index.html          # Main HTML file for the React application
├── src
│   ├── components          # Contains reusable components
│   │   ├── SidebarMenu.jsx # Sidebar for navigation
│   │   ├── RabbitForm.jsx  # Form for registering rabbits
│   │   ├── RabbitList.jsx  # List of registered rabbits
│   │   ├── RabbitEdit.jsx  # Component for editing rabbit details
│   │   └── RabbitDelete.jsx # Component for confirming rabbit deletion
│   ├── pages               # Contains page components
│   │   ├── RegisterRabbit.jsx # Page for registering rabbits
│   │   ├── EditRabbit.jsx  # Page for editing rabbits
│   │   └── DeleteRabbit.jsx # Page for deleting rabbits
│   ├── utils               # Utility functions
│   │   └── validations.js   # Validation functions for user input
│   ├── App.jsx             # Main application component
│   └── index.js            # Entry point for the React application
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application
To start the frontend application, run:
```
npm start
```
This will launch the application in your default web browser.

## Dependencies
- React
- React Router

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.