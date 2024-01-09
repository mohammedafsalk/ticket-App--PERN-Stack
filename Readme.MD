# Ticket Mangement App - PERN(Postgres,Express,Node,React)

This project is a simple PERN(Postgres,Express,Node,React) App in which users can create tickets and assign to their respective targets (another users)

This project has 2 modules , Admin and user.

Users can create tickets.Also they can view tickets created by them and assigned to them

Admin can view all the tickets and user details such as count.Admin have the control to update the status of the tickets created by user

## Tech Stack

- **Server Side:**

  - Node.js
  - Express
  - Postgres SQL
  - Docker (for DB Configuration)
  - Sequelize
  - JWT

- **Client Side:**
  - React
  - Vite
  - Tailwind css
  - Material UI

## Features

- Authentication and authorization using JWT.
- Dynamic data of user in client side which is fetched from server.
- Server built with Node.js and Express.
- Client built with React and Vite for a fast development experience.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mohammedafsalk/ticket-App--PERN-Stack.git
   ```
2. **Install Docker and its configs:**
   ```bash
     cd server
     npm install
   ```
2. **Install Dependencies for server:**
   ```bash
     cd server
     npm install
   ```

4. **Install Dependencies for client:**
   ```bash
     cd client
     npm install
   ```
5. **Starting server:**
   ```bash
     cd server
     npm start
   ```
6. **Starting client:**
   ```bash
     cd client
     npm run dev
   ```
