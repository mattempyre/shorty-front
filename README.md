# Shorty - URL Shortener Web App

Shorty is a simple and user-friendly web application for shortening long URLs and managing them effectively.

For the back-end code and additional details, visit the [Shorty Backend Repository](https://github.com/mattempyre/shorty-back).

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Back-End Repository](#back-end-repository)

## Introduction

Shorty is a powerful yet easy-to-use URL shortener that simplifies sharing long and complex URLs. With Shorty, you can:

- Shorten URLs to make them more manageable.
- Keep track of the click count and analytics of your shortened URLs.
- Customize your short URLs with meaningful aliases.
- Edit and update long URLs associated with your short URLs.

Whether you're sharing links on social media or optimizing your website's user experience, Shorty has you covered.

![Screenshot](https://github.com/mattempyre/shorty-front/blob/main/public/screenshot.png)

## Getting Started

To get started with Shorty, follow these steps:

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) (version 8 or later)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Maven](https://maven.apache.org/)

### Installation

#### Front-End (Shorty Frontend)

1. Clone the Shorty front-end repository to your local machine:

   ```shell
   git clone https://github.com/mattempyre/shorty-front.git
   ```

2. Change to the project directory:

   ```shell
   cd shorty-front
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

#### Run a Redis Server in Docker

To set up and run a Redis server locally with Docker, follow these steps:

1. **Install Docker:** If you haven't already, download and install Docker for your specific operating system. You can find the installation instructions for various platforms on the [Docker website](https://docs.docker.com/get-docker/).

2. **Open a Terminal (Command Prompt):** Open a terminal or command prompt on your local machine.

3. **Pull the Redis Docker Image:**

   Run the following command to pull the official Redis Docker image from Docker Hub:

   ```bash
   docker pull redis
   ```

   This command will download the latest Redis image to your local machine.

4. **Run a Redis Container:**

   Once the Redis image is downloaded, you can start a Redis container by running the following command:

   ```bash
   docker run -d -p 6379:6379 --name redis-server redis
   ```

   - `-d`: This flag runs the container in detached mode, which means it runs in the background.
   - `-p 6379:6379`: This flag maps port 6379 inside the container to port 6379 on your local machine. This is the default Redis port.
   - `--name redis-server`: This assigns the name "redis-server" to the running container.
   - `redis`: This is the name of the Docker image we pulled earlier.

5. **Verify Redis Container Status:**

   You can check if the Redis container is running by executing:

   ```bash
   docker ps
   ```

   This command lists all the running containers. You should see the "redis-server" container in the list.

6. **Access the Redis Server:**

   You can access the Redis server using a Redis client or by running commands inside the container. To access it using a Redis client, you can install the Redis CLI tool on your local machine.

   - **Install Redis CLI on Linux/Mac:**

     ```bash
     sudo apt-get install redis-tools   # On Ubuntu/Debian
     ```

     -OR-

     ```bash
     brew install redis                # On macOS with Homebrew
     ```

   - **Install Redis CLI on Windows:**

     You can download the Windows version of the Redis CLI from the [official GitHub repository](https://github.com/microsoftarchive/redis/releases).

7. **Connect to the Redis Server:**

   You can connect to the Redis server using the Redis CLI with the following command:

   ```bash
   redis-cli
   ```

   This should open a Redis command prompt, allowing you to interact with the Redis server.

8. **Test Redis:**

   To test if Redis is running correctly, you can run a simple Redis command, such as:

   ```bash
   ping
   ```

   You should receive a "PONG" response, indicating that Redis is up and running.


#Backend

## Back-End (Shorty Backend)

1. Clone the Shorty back-end repository to your local machine:

   ```shell
   git clone https://github.com/mattempyre/shorty-back.git
   ```

2. Change to the project directory:

   ```shell
   cd shorty-back
   ```

3. Build the project using Maven:

   ```shell
   mvn clean install
   ```

## Usage

To use Shorty, follow these steps:

1. Start the back-end server (Shorty Backend).

   ```shell
   mvn spring-boot:run
   ```

   The back-end server should now be running on `http://localhost:9000`.

2. Start the front-end development server (Shorty Frontend):

   ```shell
   npm run dev
   ```

3. Open your web browser and visit `http://localhost:5173/` to access the front-end application.

4. Create a new account or log in if you already have one.

5. Once logged in, you can shorten URLs and manage them through the user dashboard.

For the back-end code and additional details, visit the [Shorty Backend Repository](https://github.com/mattempyre/shorty-back).
