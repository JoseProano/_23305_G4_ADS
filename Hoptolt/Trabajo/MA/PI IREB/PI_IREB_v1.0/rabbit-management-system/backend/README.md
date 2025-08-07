# Rabbit Management System - Backend

## Overview
The Rabbit Management System is a full-stack application designed to manage data related to rabbits. This backend section is built using Node.js and Express, and it connects to a MongoDB database to perform CRUD operations on rabbit data.

## Features
- **Register Rabbit**: Allows users to add new rabbits with details such as race, code, sex, age, weight, and purpose.
- **Edit Rabbit**: Enables users to modify existing rabbit data.
- **Delete Rabbit**: Provides functionality to remove rabbits from the database.
- **Consult Rabbit**: Users can search for rabbits by their code or filter by race.

## Technologies Used
- Node.js
- Express
- MongoDB (via Mongoose)
- dotenv (for environment variable management)

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd rabbit-management-system/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the backend directory and add your MongoDB connection string:

5. Start the server:
   ```
   npm start
   ```

## API Endpoints
- `POST /api/rabbits`: Register a new rabbit.
- `GET /api/rabbits/:code`: Retrieve rabbit details by code.
- `PUT /api/rabbits/:code`: Edit existing rabbit details.
- `DELETE /api/rabbits/:code`: Delete a rabbit by code.
- `GET /api/rabbits`: Retrieve all rabbits or filter by race.

## Validation
The backend includes validation logic to ensure that all data entered meets the specified criteria, including:
- Code format (first letter of the race followed by three digits)
- Age (must be a positive integer not exceeding 12 months)
- Weight (must be a positive real number with a maximum of 2.5 kg and two decimal places)
- Purpose (must be either "Reproducción" or "Engorde")

## Contribution
Feel free to contribute to this project by submitting issues or pull requests.

## License
This project is licensed under the MIT License.
