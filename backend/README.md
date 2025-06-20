# FutureForge Backend

This is the backend service for the FutureForge AI-powered decision simulation platform.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futureforge
HF_API_KEY=your_huggingface_api_key_here
NODE_ENV=development
```

3. Start MongoDB:
Make sure MongoDB is installed and running on your system.

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### POST /api/simulate
Simulates a business scenario using AI.

Request body:
```json
{
  "title": "string",
  "budget": number,
  "location": "string",
  "timeline": "string",
  "description": "string"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "scenario": {
      "title": "string",
      "budget": number,
      "location": "string",
      "timeline": "string",
      "description": "string",
      "createdAt": "date"
    },
    "simulation": {
      "financial": {
        "netProfit": number,
        "roi": number
      },
      "environmental": {
        "carbonFootprint": number
      },
      "risks": [
        {
          "name": "string",
          "level": "high|medium|low"
        }
      ]
    }
  }
}
```

## Development

- The backend uses Express.js and MongoDB with Mongoose
- AI integration is handled through the Hugging Face Inference API
- Mock data is returned if no HF_API_KEY is provided
- All AI logic is contained in `utils/aiService.js` 