# Task Management System

This project is a simple task management system that allows users to manage tasks with drag-and-drop functionality, create tasks, and manage users. It includes a dashboard, task creation page, and user profile management.

## Features

### `Dashboard`

* Displays tasks categorized by their current status.

* Allows users to drag and drop tasks between columns to update their status.

* Includes buttons to add new tasks and navigate to the profile page.

### `Add Task Page`

* Create new tasks with a title, description, and assignee.

* Fetches the list of users from the backend API for task assignment.

### `Profile Page`

* Displays user details such as name, email, and role in a table format.

* Allows adding, editing, and deleting user details.

## Live Demo

* Frontend (Deployed): Task Management System Frontend

* Backend Repository: Task Management System Backend

## Setup Instructions

### Frontend Setup

* Clone the frontend repository:

 `git clone https://github.com/R-Kavi-yarasu/task-frontend.git `
 `cd task-frontend`

* Install dependencies:

`npm install`

* Update the backend API URL:Ensure the frontend is pointing to the correct backend API. For development, update the API URL to:

`const API_BASE_URL = "http://localhost:5000";`

For production, it should point to your deployed backend.

* Start the frontend server:

`npm start`

The frontend will run at [http://localhost:3000].

### Backend Setup

* Clone the backend repository:

`git clone https://github.com/R-Kavi-yarasu/task-backend.git`
`cd task-backend`

* Install dependencies:

`npm install`

* Set up environment variables:Create a .env file in the backend directory with the following:

`PORT=5000`
`MONGO_URI=<your-mongodb-connection-string>`

* Start the backend server:

`npm start`

The backend will run at [http://localhost:5000].

# API Documentation

## Task API

### GET `/task`

* Fetch all tasks.

* Response: Array of tasks.

### POST `/task`

* Create a new task.

* Body:

`{`
  `"title": "Task Title",`
  `"description": "Task Description",`
  `"assignedto": "User ID",`
  `"taskstatus": "todo/In Progress/Done"`
`}`

* Response: Created task object.

### PUT `/task/:id`

* Update an existing task by ID.

* Body: Fields to update (e.g., `taskstatus`).

* Response: Updated task object.

### DELETE /task/:id

* Delete a task by ID.

* Response: Success message.

## User API

### GET /user

* Fetch all users.

* Response: Array of users.

### POST /user

* Create a new user.

* Body:

`{`
  `"name": "User Name",`
  `"email": "user@example.com",`
  `"role": "User Role"`
`}`

* Response: Created user object.

### PUT /user/:id

* Update an existing user by ID.

* Body: Fields to update (e.g., name, email, role).

* Response: Updated user object.

### DELETE /user/:id

* Delete a user by ID.

* Response: Success message.

## How to Use

### Start the backend server on http://localhost:5000.

### Start the frontend server on http://localhost:3000.

### Open the application in your browser:

* Use the Dashboard to view and manage tasks.

* Use the Add Task Page to create new tasks.

* Use the Profile Page to manage user information.