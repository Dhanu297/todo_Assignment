# Todo App (Full Stack)

This is a simple full-stack Todo application built using React (Vite) on the frontend and Node.js + Express on the backend.
Table of Contents

- Overview
- Features
- Tech stack
- Project Structure
- Description
- Installation
- Environment Variables
- Running the Application
- API Endpoints
- Future Enhancement

-------------------------------------------------------------------------------

## Overview
The project is structured as a single repository with two separate folders:
- Client : for the frontend
- Server : for the backend

The backend is deployed on Render, and the frontend is deployed on Vercel.

-------------------------------------------------------------------------------

## Features implemented

You can:
- Create new todos
- Edit todo titles 
- Set and update due dates
- Mark todos as completed or active
- Delete todos

To make the list easier to manage, the app also supports:
- Filtering (All / Active / Completed / Overdue)
- Sorting (by due date, title, or status)
- In a glance you can get a count of all todo items
-------------------------------------------------------------------------------

## Tech stack

### Frontend
- React
- Vite
- Context API for state management
- Custom hooks for business logic
- Axios for API calls

### Backend
- Node.js
- Express
- REST API
- Modular structure (routes, controllers, services)
- Database integration
-------------------------------------------------------------------------------

## Project structure
TODO
├── Client/
│ ├── public/
│ ├── src/
│ │ ├── api/ # Axios API functions
│ │ ├── components/ # UI components
│ │ ├── context/ # Global state
│ │ ├── hooks/ # Business Logic
│ │ ├── pages
│ │ ├── styles
│ │ └── utils/ #Helpers
│ ├── index.html
│ ├── .env
│ ├── package.json
│ └── vite.config.js
│
└── Server/
├── db/
├── src/
│ ├── controller/
│ ├── middleware/
│ ├── routes/
│ └── services/
├── server.js
├── package.json


-------------------------------------------------------------------------------

## Description

- The frontend talks to the backend through a REST API.
- API calls are handled through a small Axios wrapper.
- The backend follows a simple flow:
  routes → controllers → services → database
- The frontend API base URL is controlled using environment variables.

-------------------------------------------------------------------------------

## Installation

1. Clone the repository

git clone (https://github.com/Dhanu297/todo_Assignment.git)
cd <cloned-dir>

2. Start the server
cd Server
npm install express cors sqlite sqlite3 dotenv nodemon
npm start
server runs on port 5000 

3. Start the client
cd Client
npm install axios bootstrap bootstrap-icons
npm run dev


Frontend runs on:

http://localhost:5173

4. Environment variables
Create .env file in client and add following value
Client/.env
VITE_API_URL=http://localhost:5000 (Make sure the port is same as port in the server's .env file)

Create .env file in server and add following value
PORT = 5000 or any desitred port
-------------------------------------------------------------------------------
## API Endpoints
GET    /api/todos
POST   /api/todos
PATCH  /api/todos/:id/title
PATCH  /api/todos/:id/due-date
PATCH  /api/todos/:id/status
DELETE /api/todos/:id

-------------------------------------------------------------------------------
## Future Enhancement

Add priorities to todos
Calendar or timeline view
Drag-and-drop reordering
Dark mode
User authentication