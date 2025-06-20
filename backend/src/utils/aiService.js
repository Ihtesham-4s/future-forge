import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configuration for Groq API
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama3-8b-8192';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Main simulation function
export const simulateScenario = async (scenario) => {
    try {
        if (process.env.NODE_ENV === 'development') console.log('Starting AI simulation...');

        const { budget, timeline, location, description } = scenario;

        // Format the prompt for the model
        const messages = [
            {
                role: "system",
                content: 'You are a business consultant. Only respond in valid JSON. Do NOT include any introduction or explanation. Use this format: {"recommendations": "...", "marketAnalysis": {...}, "risks": [...]}'
            },
            {
                role: "user",
                content: `Analyze this business scenario and provide specific recommendations. Return ONLY the JSON object, no additional text:

Business Details:
- Title: ${scenario.title}
- Budget: $${budget}
- Location: ${location}
- Timeline: ${timeline}
- Description: ${description}

Return ONLY this JSON structure, no other text:
{
    "recommendations": "Your specific recommendations for this business",
    "marketAnalysis": {
        "marketSize": "small/medium/large",
        "competitionLevel": "low/medium/high",
        "growthPotential": "low/moderate/high"
    },
    "risks": [
        {
            "type": "risk category",
            "level": "low/medium/high",
            "description": "specific risk description"
        }
    ]
}`
            }
        ];

        if (process.env.NODE_ENV === 'development') console.log('Making request to Groq API...');
        const response = await axios.post(
            GROQ_API_URL,
            {
                model: MODEL,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 0.9,
                stream: false
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`
                },
                timeout: 30000 // 30 second timeout
            }
        );

        if (process.env.NODE_ENV === 'development') console.log('API Response received.');

        // Extract the response content
        const generatedText = response.data.choices[0].message.content;
        if (process.env.NODE_ENV === 'development') console.log('Generated text length:', generatedText.length);

        // Parse the response with fallback extraction
        let simulationResult;
        try {
            // First try direct JSON parse
            simulationResult = JSON.parse(generatedText);
        } catch (parseError) {
            if (process.env.NODE_ENV === 'development') console.log('Direct JSON parse failed, trying to extract JSON from text...');
            try {
                // Extract JSON using regex
                const jsonStart = generatedText.indexOf('{');
                const jsonEnd = generatedText.lastIndexOf('}');
                if (jsonStart !== -1 && jsonEnd !== -1) {
                    const jsonString = generatedText.substring(jsonStart, jsonEnd + 1);
                    simulationResult = JSON.parse(jsonString);
                } else {
                    throw new Error('No JSON object found in response');
                }
            } catch (extractError) {
                console.error('Error extracting JSON:', extractError);
                // If all parsing attempts fail, format the response into a structured object
                simulationResult = {
                    recommendations: generatedText,
                    marketAnalysis: {
                        marketSize: "medium",
                        competitionLevel: "medium",
                        growthPotential: "moderate"
                    },
                    risks: [{
                        type: "General",
                        level: "medium",
                        description: "Market conditions and competition"
                    }]
                };
            }
        }

        if (process.env.NODE_ENV === 'development') console.log('AI Service returning simulationResult:', JSON.stringify(simulationResult, null, 2));
        return simulationResult;
    } catch (error) {
        console.error('Error in simulation:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }
        // Fallback response with more specific error message
        return {
            recommendations: `We're having trouble generating recommendations right now. Please try again in a few moments. (Error: ${error.message})`,
            marketAnalysis: {
                marketSize: "medium",
                competitionLevel: "medium",
                growthPotential: "moderate"
            },
            risks: [{
                type: "System",
                level: "high",
                description: "Temporary service disruption"
            }]
        };
    }
};