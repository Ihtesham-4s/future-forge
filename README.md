# FutureForge: AI-Powered Business Scenario Simulator

FutureForge is an innovative web application designed to help entrepreneurs and business owners test their ideas and make informed decisions. By leveraging advanced AI models (currently using Groq's `llama3-8b-8192`), it simulates various business scenarios and provides actionable recommendations, market analysis, and risk assessments.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [AI Model Integration](#ai-model-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

-   **Scenario Creation**: Input details about your business idea including title, budget, location, timeline, and a detailed description.
-   **AI-Powered Simulation**: Get instant, comprehensive analysis from a large language model, including:
    -   **Recommendations**: Actionable advice tailored to your scenario.
    -   **Market Analysis**: Insights into market size, competition level, and growth potential.
    -   **Risk Assessment**: Identification of potential risks with severity levels.
-   **Dashboard**: View and manage all your past business scenarios and their simulations in a clean, organized interface.
-   **Responsive Design**: A user-friendly interface that adapts to various screen sizes.

## Technologies Used

**Backend (Node.js/Express):**
-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
-   **Mongoose**: MongoDB object modeling for Node.js.
-   **MongoDB**: NoSQL database for storing scenario data.
-   **Axios**: Promise-based HTTP client for making API requests.
-   **Dotenv**: Loads environment variables from a `.env` file.

**Frontend (React):**
-   **React.js**: JavaScript library for building user interfaces.
-   **React Router DOM**: Declarative routing for React.
-   **Axios**: HTTP client for making API requests to the backend.
-   **Bootstrap**: CSS framework for responsive and modern UI components.
-   **React Icons / Bootstrap Icons**: For various icons used throughout the UI.

**AI Service:**
-   **Groq API**: High-speed inference for large language models.
-   **Model**: `llama3-8b-8192` (a fast, reliable, and free LLM on GroqCloud).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:
-   Node.js (LTS version recommended)
-   npm (comes with Node.js) or Yarn
-   MongoDB (local or Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ihtesham-4s/future-forge.git
    cd "Future_forge Full Proj Ass 4"
    ```

2.  **Set up Backend:**
    Navigate to the `backend` directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory and add your MongoDB URI and Groq API Key:
    ```
    MONGODB_URI=mongodb://localhost:27017/futureforge
    GROQ_API_KEY=YOUR_GROQ_API_KEY
    NODE_ENV=development
    PORT=5000
    FRONTEND_URL=http://localhost:3000
    JWT_SECRET=your_jwt_secret
    ```

3.  **Set up Frontend:**
    Navigate to the `futureforge-frontend` directory and install dependencies:
    ```bash
    cd ../futureforge-frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    From the `backend` directory:
    ```bash
    cd backend
    npm start
    ```
    The backend server will run on `http://localhost:5000`.

2.  **Start the Frontend Development Server:**
    From the `futureforge-frontend` directory:
    ```bash
    cd ../futureforge-frontend
    npm start
    ```
    The frontend application will open in your browser, usually at `http://localhost:3000`.

## Project Structure

```
Future_forge Full Proj Ass 4/
├── backend/                 # Node.js Express server
│   ├── src/                # Backend source code
│   │   ├── auth/           # Authentication-related code
│   │   ├── controllers/    # Express route controllers
│   │   ├── models/         # Mongoose schemas and models
│   │   ├── routes/         # API route definitions
│   │   └── utils/          # Utility functions (e.g., aiService.js)
│   ├── package.json        # Backend dependencies and scripts
│   └── server.js           # Main backend entry point
│
├── futureforge-frontend/   # React client application
│   ├── public/             # Static assets
│   ├── src/                # Frontend source code
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Main page components (e.g., Dashboard.jsx, Scenario.jsx)
│   │   ├── routes/         # Frontend routes
│   │   └── utils/          # Frontend utility functions
│   ├── package.json        # Frontend dependencies and scripts
│   └── README.md           # Frontend-specific README (optional)
│
└── README.md                # Project-wide README (this file)
```

## AI Model Integration

FutureForge utilizes Groq's API for high-speed LLM inference. The `backend/src/utils/aiService.js` file handles the interaction with the Groq API. It sends business scenario prompts and parses the AI-generated JSON responses.

To change the AI model, modify the `MODEL` constant in `backend/src/utils/aiService.js` to a different model available on Groq.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 