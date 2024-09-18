# Express REST API Project

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Docker Setup](#docker-setup)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [Architecture](#architecture)
- [Contributing](#contributing)

## Overview

This project is a RESTful API built with Express.js and TypeScript, providing endpoints for user and product management in a store application. It uses MongoDB for data storage, JWT for authentication, and Zod for input validation.

## Tech Stack

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema declaration and validation library
- [JSON Web Token (JWT)](https://jwt.io/) - Secure way of transmitting information between parties as a JSON object
- [Docker](https://www.docker.com/) - Platform for developing, shipping, and running applications
- [Docker Compose](https://docs.docker.com/compose/) - Tool for defining and running multi-container Docker applications
- [Jest](https://jestjs.io/) - Tool for running unit test in node.js app

## Project Structure

```
.
├── src/
│   ├── controllers/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── routes/
│   ├── middleware/
│   ├── config/
|   ├── utils/
│   └── index.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Docker and Docker Compose
- MongoDB (local instance or Atlas account)
- Jest


### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Expertech-1/mainstack.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGO_URI_ATLAS=mongodb://localhost:27017/your-database
   MONGO_URI_DOCKER=mongodb://localhost:27017/your-database
   JWT_SECRET=your-secret-key
   NODE_ENV="development" | "production"
   ```

### Running the Application

1. Start the application in development mode:
   ```bash
   npm run dev
   ```

2. Build and run the application in production mode:
   ```bash
   npm run build
   npm start
   ```

## API Documentation

For detailed API documentation, please refer to our [Postman Documentation](https://documenter.getpostman.com/view/25909156/2sAXqqbhFR).

The API provides the following main endpoints:

- `/api/v1/users` - User management
- `/api/v1/products` - Product management

Each endpoint supports standard CRUD operations (GET, POST, PUT, DELETE).

## Test with jest

To run the test:

1. Make sure Jest is installed installed on your system.

2. Run the following in terminal to run test:
   ```bash
   npm run test
   ```

## Docker Setup

To run the application using Docker:

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

This command will start both the API and MongoDB containers.

To stop the containers:
```bash
docker-compose down
```

## MongoDB Atlas Setup

If you prefer using MongoDB Atlas:

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Set up a new cluster and obtain the connection string.
3. Update the `MONGODB_URI` in your `.env` file with the Atlas connection string.

## Architecture

This project follows a layered architecture:

1. **Controllers**: Handle HTTP requests and responses.
2. **Services**: Contain business logic and interact with models.
3. **Models**: Define data structures and interact with the database.
4. **Schemas**: Define input validation rules using Zod.

The flow of a typical request:

```
Request → Route → Controller → Service → Model → Database
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


# mainstack
