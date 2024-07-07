# Lucia Auth Project in Next.js

This project sets up authentication in a Next.js application using Lucia Auth, integrating Google and GitHub as authentication providers.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A GitHub account
- A Google account
- A Next.js project (if you don't have one, you can create it by running `npx create-next-app@latest`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Generate prisma client and run migrate:

    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ````

## Configuration

1. Set up your Google and GitHub OAuth applications:

   - **Google:**
     - Go to the [Google Developers Console](https://console.developers.google.com/).
     - Create a new project.
     - Navigate to the OAuth consent screen and configure it.
     - Create OAuth 2.0 credentials.
     - Note the Client ID and Client Secret.
    
    For tutorial explaination: [Check Google Setup Chapter](https://www.youtube.com/watch?v=ot9yuKg15iA&t=456s&ab_channel=BuildSaaSwithEthan)

   - **GitHub:**
     - Go to [GitHub Developer Settings](https://github.com/settings/developers).
     - Create a new OAuth application.
     - Note the Client ID and Client Secret.

    For tutorial explaination: [Check the official documentation](https://lucia-auth.com/tutorials/github-oauth/nextjs-app)

    Note: Please use appropriate callback URI's

2. Create a `.env` file in the root of your project and add the following environment variables:

   ```env
   NEXT_APP_URL="http://localhost:3000"
   GITHUB_CLIENT_ID=your-google-client-id
   GITHUB_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CLIENT_ID=your-github-client-id
   GOOGLE_CLIENT_SECRET=your-github-client-secret
   ```


## Running the project

- Run the project using:

  ```bash
  npm run dev
  ```
