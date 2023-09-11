# Shorty - URL Shortener Web App

![Shorty Logo](https://github.com/mattempyre/shorty-front/blob/main/public/logo.png)

Shorty is a simple and user-friendly web application for shortening long URLs and managing them effectively.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
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

#### Back-End (Shorty Backend)

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
   java -jar target/shorty-backend.jar
   ```

   The back-end server should now be running on `http://localhost:9000`.

2. Start the front-end development server (Shorty Frontend):

   ```shell
   npm start
   ```

3. Open your web browser and visit `http://localhost:5173/` to access the front-end application.

4. Create a new account or log in if you already have one.

5. Once logged in, you can shorten URLs and manage them through the user dashboard.

For the back-end code and additional details, visit the [Shorty Backend Repository](https://github.com/mattempyre/shorty-back).
