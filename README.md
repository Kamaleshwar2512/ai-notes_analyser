# AI Study Assistant - Smart Notes + Q Generator

An intelligent study assistant that uses AI to summarize notes and generate exam questions.

## Project Structure

```
├── backend/          # FastAPI backend with Gemini AI integration
├── frontend/         # React frontend application
└── README.md         # This file
```

## Quick Start

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend will run on http://127.0.0.1:8000

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:3000

## Features

- **Text Input**: Paste your study notes directly
- **File Upload**: Upload text files with your notes
- **AI Summarization**: Get clear summaries of your notes
- **Question Generation**: Generate 5 potential exam questions
- **Modern UI**: Clean, responsive interface

## How It Works

1. User inputs notes (text or file)
2. Frontend sends data to FastAPI backend
3. Backend processes content and sends to Gemini AI
4. AI generates summary and exam questions
5. Results are displayed in the frontend

## Technologies Used

- **Backend**: FastAPI, Python, Gemini AI API
- **Frontend**: React, Vite, CSS
- **AI**: Google Gemini Pro

## API Endpoints

- `POST /process` - Process notes and generate AI content
  - Parameters: `file` (optional), `text` (optional)
  - Returns: AI-generated summary and questions

## Troubleshooting

- **Connection Error**: Make sure both backend and frontend are running
- **CORS Issues**: Backend is configured to allow all origins
- **API Key**: Ensure your Gemini API key is valid in `backend/main.py`
