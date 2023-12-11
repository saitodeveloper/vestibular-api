# Summary

This project is the future admin dashboard.

-   [Requiriments](#requiriments)
-   [Getting Started](#getting-started)

# Requiriments

The project was developed using the following versions:

-   [Node.js (v20.10.0)](https://nodejs.org/en/)
-   [NPM (10.2.3)](https://nodejs.org/en/)
-   [Docker (24.0.2)](https://docs.docker.com/get-docker/)
-   [Docker Compose (2.18.1)](https://docs.docker.com/compose/install/)

# Getting Started

1. Generate the .env file using the:

```cmd
$ npm run init:dotenv -- local
```

2. Start the services using docker-compose:

```cmd
$ docker-compose up -d
```

3. Install the project dependencies:

```cmd
$ npm ci
```

4. If necessary install dependencies and update package.lock:

```cmd
$ npm install
```

5. Migrate the MySQL database:

```cmd
$ npm run migrate -- up
```

6. Start the application for development:

```cmd
$ npm run dev
```
