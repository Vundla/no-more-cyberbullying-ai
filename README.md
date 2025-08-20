https://no-more-cyberbullying-ai-1.onrender.com/
No More Cyberbullying AI
Overview

No More Cyberbullying AI is a full-stack application designed to detect and prevent cyberbullying across online platforms. By leveraging machine learning and natural language processing, the system identifies harmful content and provides real-time feedback to users, promoting safer digital interactions.

🧩 Project Structure
no-more-cyberbullying-ai/
├── backend/                 # Server-side application
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies and scripts
│   └── .env                 # Environment variables
├── frontend/                # Client-side application
│   ├── vite-project/        # Vite-based React project
│   └── ...                  # Other frontend assets
└── .gitignore               # Git ignore rules

🚀 Getting Started
Prerequisites

Node.js (v16 or higher recommended)

npm (v7 or higher)

Installation

Clone the repository:

git clone https://github.com/Vundla/no-more-cyberbullying-ai.git
cd no-more-cyberbullying-ai


Install backend dependencies:

cd backend
npm install


Install frontend dependencies:

cd ../frontend/vite-project
npm install

⚙️ Environment Variables

Create a .env file in the backend/ directory with the following variables:

OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_connection_string
PORT=5000


Replace your_openai_api_key and your_database_connection_string with your actual OpenAI API key and database connection string.

🛠️ Running the Application Locally

To run both the backend and frontend simultaneously during development:

cd backend
npm run dev:all


This command uses concurrently to start both the backend server and the frontend development server.

📦 Deployment on Render
1. Connect GitHub Repository

Log in to Render
.

Click on "New +" and select "Web Service".

Connect your GitHub account and select the no-more-cyberbullying-ai repository.

2. Configure Build & Start Commands

In the Render dashboard:

Build Command:

npm install --prefix backend && npm run build --prefix frontend/vite-project


Start Command:

npm start --prefix backend

3. Set Environment Variables

In the Render dashboard:

Navigate to the "Environment" tab.

Add the following environment variables:

OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_connection_string
PORT=5000


Replace the placeholders with your actual values.

🔄 CI/CD Workflow

Render automatically sets up continuous deployment:

On each push to the main branch, Render will rebuild and redeploy the application.

Ensure that your main branch is up-to-date with the latest changes.

📄 License

This project is licensed under the MIT License.

📚 References

Cyberbullying: What is it and how to stop it

Artificial Intelligence to Address Cyberbullying, Harassment
