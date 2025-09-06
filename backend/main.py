from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)
#TESR


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY


@app.post("/process")
async def process_file(file: UploadFile = None, text: str = Form(None)):
    # 1. Get content (text or file)
    if file:
        content = (await file.read()).decode("utf-8", errors="ignore")
    else:
        content = text

    # 2. Call Gemini API
    prompt = f"""
    I am a student. From the following notes, do two things:
    1. Summarize them clearly.
    2. Generate 5 possible exam questions.

    Notes:
    {content}
    """

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(GEMINI_URL, json=payload, headers=headers)

    if response.status_code != 200:
        error_detail = response.text
        try:
            error_json = response.json()
            if "error" in error_json:
                error_detail = f"API Error: {error_json['error'].get('message', error_detail)}"
        except:
            pass
        return {"error": error_detail}

    result = response.json()
    
    # Check if the response has the expected structure
    if "candidates" not in result or not result["candidates"]:
        return {"error": "Unexpected API response format"}
    
    ai_output = result["candidates"][0]["content"]["parts"][0]["text"]

    return {"result": ai_output}


if __name__ == "__main__":
    # Get port from environment variable (for deployment)
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "127.0.0.1")
    
    uvicorn.run(app, host=host, port=port)
