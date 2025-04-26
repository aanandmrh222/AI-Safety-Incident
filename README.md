# AI Safety Incident Log API

This project implements a simple RESTful API service for logging and managing hypothetical AI safety incidents, as part of the HumanChain Backend Intern Take-Home Assignment. The API allows creating, retrieving, updating, and deleting incident records stored in a MongoDB database.

## Technologies Used

*   **Language:** JavaScript
*   **Framework:** Express.js
*   **Database:** MongoDB
*   **ODM:** Mongoose


## Prerequisites

*   Node.js and npm
*   mongoDB Server

## Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/aanandmrh222/AI-Safety-Incident
    cd AI-Safety-Incident
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the project root directory.
    *   Add the following variables to the `.env` file (replace with your actual values):

        ```
        PORT=3000
        MONGODB_URI="YOUR_MONGODB_CONNECTION_STRING"
        ```

        *   `PORT`:  The port on which the server will run (default: 3000).
        *   `MONGODB_URI`: Your MongoDB connection string.  If you're using MongoDB Atlas, you can find the connection string in the Atlas dashboard.  If you're using a local MongoDB installation, it will typically be something like: `mongodb://localhost:27017/humanchain_incidents` (replace `humanchain_incidents` with your database name).

4.  **Start the Server:**
    ```bash
    npm start
    ```

    You should see a message in the console indicating that the server is running and connected to MongoDB.

## Database Setup

The database schema is defined using Mongoose models in the `models/Incident.js` file. Mongoose will automatically create the necessary collections in your MongoDB database when you connect. No manual schema setup is required.

## API Endpoints

All endpoints expect and return JSON data. Example usage is shown using `curl`.

**1. GET /incidents:** Retrieve All Incidents

*   **Description:** Retrieves all incidents currently stored in the database.
*   **HTTP Method:** GET
*   **Example:**

    ```bash
    curl http://localhost:3000/incidents
    ```

*   **Example Response:**

    ```json
    [
        {
            "id": "654321abcdef1234567890",
            "title": "AI Hallucination",
            "description": "AI model provided a factually incorrect response.",
            "severity": "Medium",
            "reported_at": "2023-11-01T12:00:00.000Z",
            "__v": 0
        },
        {
            "id": "987654zyxwvu9876543210",
            "title": "Data Bias",
            "description": "AI model showed bias against a demographic group.",
            "severity": "High",
            "reported_at": "2023-11-01T13:00:00.000Z",
            "__v": 0
        }
    ]
    ```

**2. POST /incidents:** Log a New Incident

*   **Description:** Logs a new incident to the database.
*   **HTTP Method:** POST
*   **Request Body:** JSON object containing `title`, `description`, and `severity`.

*   **Example:**

    ```bash
    curl -X POST \
      http://localhost:3000/incidents \
      -H 'Content-Type: application/json' \
      -d '{
        "title": "AI Model Bias Detected",
        "description": "The model exhibits bias against a specific demographic group.",
        "severity": "High"
      }'
    ```

*   **Example Response:**

    ```json
    {
        "id": "1a2b3c4d5e6f78901234abcd",
        "title": "AI Model Bias Detected",
        "description": "The model exhibits bias against a specific demographic group.",
        "severity": "High",
        "reported_at": "2023-11-01T14:00:00.000Z",
        "__v": 0
    }
    ```

**3. GET /incidents/{id}:** Retrieve a Specific Incident

*   **Description:** Retrieves a specific incident by its ID.
*   **HTTP Method:** GET
*   **Path Parameter:** `{id}` - The unique ID of the incident.

*   **Example:**

    ```bash
    curl http://localhost:3000/incidents/654321abcdef1234567890
    ```

*   **Example Response (Success):**

    ```json
    {
        "id": "654321abcdef1234567890",
        "title": "AI Hallucination",
        "description": "AI model provided a factually incorrect response.",
        "severity": "Medium",
        "reported_at": "2023-11-01T12:00:00.000Z",
        "__v": 0
    }
    ```

*   **Example Response (Not Found):**

    ```json
    {
        "message": "Incident not found"
    }
    ```

**4. DELETE /incidents/{id}:** Delete an Incident

*   **Description:** Deletes the incident with the specified ID from the database.
*   **HTTP Method:** DELETE
*   **Path Parameter:** `{id}` - The unique ID of the incident to delete.

*   **Example:**

    ```bash
    curl -X DELETE http://localhost:3000/incidents/654321abcdef1234567890
    ```

*   **Example Response (Success - 204 No Content):**

    (No body)

*   **Example Response (Not Found):**

    ```json
    {
        "message": "Incident not found"
    }
    ```


## Future Enhancements

*   Add authentication and authorization to protect the API endpoints.
*   Implement more robust error handling and logging.
*   Add pagination to the GET /incidents endpoint.
*   Implement search and filtering capabilities.
*   Add support for different data formats (e.g., XML).
