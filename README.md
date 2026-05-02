# Campus Hiring Evaluation Portal

This project is a full-stack web application designed for campus hiring evaluation tasks. It consists of a frontend application, a backend script for priority processing, and a custom logging utility.

## Project Structure

- `notification_app_fe`: Next.js frontend application.
- `notification_app_be`: Node.js scripts for processing notifications and priority sorting.
- `logging_middleware`: Custom NPM package utility for secure API tracing and logging.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Setup and Installation

1. For the middleware, run `npm install` inside the `logging_middleware` folder.
2. For the backend, run `npm install` inside the `notification_app_be` folder.
3. For the frontend, run `npm install` inside the `notification_app_fe` folder.

## Environment Variables

Ensure the required environment variables are set. 
- A `.env` file in the root directory for global access tokens.
- A `.env.local` file inside `notification_app_fe` for the Next.js application.

## Running the Application

### Frontend

Navigate to `notification_app_fe` and start the development server:

```bash
cd notification_app_fe
npm run dev
```

The application will be available at `http://localhost:3000`.

### Backend Priority Inbox Script

Navigate to `notification_app_be` and execute the script:

```bash
cd notification_app_be
node priority_inbox.js
```

## Features

- Notification Viewing: Displays a list of all notifications fetched from the external API.
- Priority Inbox: Filters and sorts notifications based on specific criteria (Placement, Result, Event) and chronological order.
- Secure Logging: All application activity is logged via the custom middleware, subject to strict character limits.
- State Persistence: Tracks read and unread status cleanly.

## Demo Video

You can watch a full demonstration of the application in action here:
[View Demo Video on Google Drive](https://drive.google.com/file/d/1-psc3DAqKYJfatWgbkYcu7ysR-CAmW4x/view?usp=sharing)

## Screenshots

![Screenshot 1](screenshots/Screenshot%202026-05-02%20123851.png)
![Screenshot 2](screenshots/Screenshot%202026-05-02%20123905.png)

## Technical Stack

- Frontend: Next.js, React, Material UI
- Backend Utilities: Node.js
