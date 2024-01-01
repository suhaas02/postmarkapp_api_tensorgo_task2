# Testing out postmarkapp API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

This is a task i have done as a part of the 2nd round of tensorgo assesment. Task is to create a communication platform within a SaaS application, allowing users to log in using
Google OAuth, view their communication details, and interact with the Postmarkapp.com API for email
communication. This assignment aims to assess your skills in integrating third-party services,
implementing OAuth authentication, and building a microservices architecture.

## Getting Started

### Prerequisites

- Node.js 
- npm 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git

2. Navigate to that repository

    ```bash
    cd repo-name

3. Install dependencies

    ```bash
    npm install

4. Go the google developer console and generate your API token(cliendId, clientSecret) for working of OAuth2.0 and replace it in the passport.js file

5. Next go to postmarkapp.com website and generate the server token id and replace in the code whereever required.

6. Navigate to mongoDB atlas website and setup a new database or use an existing one and generate the DB URI link and replace it in the server.js file

7. Finally run the code using nodemon

    ```bash
    nodemon server.js

8. Now copy the below url and paste in the web browser

    ```bash
    http://localhost:3000/



