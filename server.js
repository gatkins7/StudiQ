const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

if (!DEEPSEEK_API_KEY) {
    console.error('❌ DEEPSEEK_API_KEY environment variable is required');
    process.exit(1);
}
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to call DeepSeek API
async function callDeepSeekAPI(messages, temperature = 0.7, maxTokens = 2048) {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: temperature,
                max_tokens: maxTokens,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API Error:', error);
        throw error;
    }
}

// Helper function to clean JSON response
function cleanJsonResponse(response) {
    try {
        // Remove markdown code blocks if present
        let cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        
        // Remove any text before the first { or [
        const jsonStart = Math.min(
            cleaned.indexOf('{') !== -1 ? cleaned.indexOf('{') : Infinity,
            cleaned.indexOf('[') !== -1 ? cleaned.indexOf('[') : Infinity
        );
        
        if (jsonStart !== Infinity) {
            cleaned = cleaned.substring(jsonStart);
        }
        
        // Remove any text after the last } or ]
        const jsonEnd = Math.max(
            cleaned.lastIndexOf('}'),
            cleaned.lastIndexOf(']')
        );
        
        if (jsonEnd !== -1) {
            cleaned = cleaned.substring(0, jsonEnd + 1);
        }
        
        return JSON.parse(cleaned);
    } catch (error) {
        console.error('JSON parsing error:', error);
        console.error('Raw response:', response);
        throw new Error('Failed to parse JSON response');
    }
}

// UNIFIED STUDY SET CREATION ENDPOINT
app.post('/api/generate-study-set', async (req, res) => {
    try {
        const { title, description, difficulty, focus } = req.body;
        
        console.log('Generating comprehensive study set:', { title, description, difficulty, focus });
        
        // Step 1: Generate Study Text Summary
        const textPrompt = `Write a comprehensive study guide about "${title}" based on this topic: "${description}". 
        
        Difficulty level: ${difficulty}
        ${focus ? `Focus areas: ${focus}` : ''}
        
        Create an engaging, educational text that reads like a well-written textbook chapter. Include:
        
        - Clear introduction to the topic
        - Key concepts explained in detail with examples
        - Important principles and how they work
        - Real-world applications and relevance
        - Essential points students should remember
        
        Writing style requirements:
        - Use natural, conversational language appropriate for ${difficulty} level
        - Write in flowing paragraphs, not bullet points or lists
        - Avoid obvious AI phrases like "In conclusion" or "It's important to note"
        - Make it engaging and interesting to read
        - Use specific examples and concrete details
        - Write as if explaining to a friend who is curious about the topic
        
        Do not use markdown formatting, headers with #, or bullet points. Write in plain text with natural paragraph breaks.`;
        
        const studyText = await callDeepSeekAPI([{
            role: 'user',
            content: textPrompt
        }], 0.3, 2048);
        
        // Step 2: Generate Enhanced Quiz Questions
        const quizPrompt = `Based on the study material about "${title}" (${description}), create exactly 10 multiple-choice quiz questions.
        
        Difficulty level: ${difficulty}
        
        Create 10 multiple-choice questions (4 options each) that test understanding of key concepts.
        
        Return ONLY a JSON array of quiz questions in this exact format:
        [
            {
                "type": "multiple-choice",
                "question": "Question text here?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": 0
            }
        ]
        
        Requirements:
        - All questions must be multiple-choice with exactly 4 options
        - correctAnswer is the index (0-3) of the correct option
        - Questions should test understanding of key concepts from the study material
        - Make options plausible but clearly distinguish the correct answer
        - Vary question difficulty appropriately for ${difficulty} level
        - Cover different aspects of the topic
        - Return ONLY the JSON array, no other text or formatting`;
        
        const quizResponse = await callDeepSeekAPI([{
            role: 'user',
            content: quizPrompt
        }], 0.1, 2048);
        
        const quiz = cleanJsonResponse(quizResponse);
        
        // Step 3: Generate Flashcards
        const flashcardPrompt = `Based on the study material about "${title}" (${description}), create exactly 15 flashcards.
        
        Difficulty level: ${difficulty}
        
        Return ONLY a JSON array of flashcards in this exact format:
        [
            {
                "front": "Term, concept, or question",
                "back": "Definition, explanation, or answer"
            }
        ]
        
        Requirements:
        - Create flashcards for key terms, concepts, and important facts
        - Front side should be concise (term, concept, or question)
        - Back side should be clear and informative
        - Appropriate for ${difficulty} level
        - Return ONLY the JSON array, no other text or formatting`;
        
        const flashcardResponse = await callDeepSeekAPI([{
            role: 'user',
            content: flashcardPrompt
        }], 0.1, 2048);
        
        const flashcards = cleanJsonResponse(flashcardResponse);
        
        // Validate generated content
        if (!Array.isArray(quiz) || quiz.length === 0) {
            throw new Error('Invalid quiz format generated');
        }
        
        if (!Array.isArray(flashcards) || flashcards.length === 0) {
            throw new Error('Invalid flashcard format generated');
        }
        
        // Validate quiz structure - all questions should be multiple choice
        for (const question of quiz) {
            if (!question.question || !question.type) {
                throw new Error('Invalid quiz question structure: missing question or type');
            }
            
            // All questions must be multiple choice
            if (question.type !== 'multiple-choice') {
                throw new Error('All quiz questions must be multiple-choice');
            }
            
            if (!question.options || !Array.isArray(question.options) || 
                question.options.length !== 4 || typeof question.correctAnswer !== 'number') {
                throw new Error('Invalid multiple-choice question structure');
            }
        }
        
        // Validate flashcard structure
        for (const card of flashcards) {
            if (!card.front || !card.back) {
                throw new Error('Invalid flashcard structure');
            }
        }
        
        console.log('Study set generated successfully:', {
            studyTextLength: studyText.length,
            quizQuestions: quiz.length,
            flashcardCount: flashcards.length
        });
        
        res.json({
            success: true,
            studyText,
            quiz,
            flashcards
        });
        
    } catch (error) {
        console.error('Study set generation error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate study set'
        });
    }
});

// AI Chat Assistant Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversation = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const messages = [
            { 
                role: 'system', 
                content: 'You are StudiQ, an AI study assistant. Help users with their studies, answer questions, provide explanations, and offer study tips. Be encouraging and educational.' 
            },
            ...conversation,
            { role: 'user', content: message }
        ];

        const response = await callDeepSeekAPI(messages);
        res.json({ success: true, response: response });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ success: false, error: 'Failed to process chat message' });
    }
});

// Quiz Generation Endpoint
app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { topic, difficulty, questionCount, questionType } = req.body;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const difficultyLevel = difficulty || 'medium';
        const numQuestions = questionCount || 10;
        const type = questionType || 'multiple-choice';

        const prompt = `Generate a ${type} quiz about "${topic}" with ${numQuestions} questions at ${difficultyLevel} difficulty level. 

IMPORTANT: Respond ONLY with valid JSON in this exact format (no additional text):

{
    "title": "Quiz About ${topic}",
    "topic": "${topic}",
    "difficulty": "${difficultyLevel}",
    "questions": [
        {
            "id": 1,
            "question": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option A",
            "explanation": "Brief explanation of why this answer is correct"
        }
    ]
}

Make sure:
- All questions are educational and accurate
- Options are clear and distinct
- Correct answer matches exactly one of the options
- Explanations are brief but informative
- Use proper JSON formatting with no extra text`;

        const messages = [
            { role: 'system', content: 'You are an expert quiz generator. Respond ONLY with valid JSON. Do not include any explanatory text before or after the JSON.' },
            { role: 'user', content: prompt }
        ];

        const response = await callDeepSeekAPI(messages, 0.1, 4000);
        
        try {
            // Clean the response to extract JSON
            const cleanedResponse = cleanJsonResponse(response);
            const quizData = JSON.parse(cleanedResponse);
            
            // Validate the structure
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                throw new Error('Invalid quiz structure: missing questions array');
            }
            
            // Add metadata
            quizData.id = uuidv4();
            quizData.createdAt = new Date().toISOString();
            
            res.json(quizData);
        } catch (parseError) {
            console.error('Quiz parsing error:', parseError);
            console.error('Raw response:', response);
            res.status(500).json({ error: 'Failed to generate valid quiz format' });
        }

    } catch (error) {
        console.error('Quiz generation error:', error);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
});

// Flashcard Generation Endpoint
app.post('/api/generate-flashcards', async (req, res) => {
    try {
        const { topic, cardCount, difficulty } = req.body;

        if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
        }

        const numCards = cardCount || 15;
        const difficultyLevel = difficulty || 'medium';

        const prompt = `Generate ${numCards} flashcards about "${topic}" at ${difficultyLevel} difficulty level.

IMPORTANT: Respond ONLY with valid JSON in this exact format (no additional text):

{
    "title": "Flashcards: ${topic}",
    "topic": "${topic}",
    "difficulty": "${difficultyLevel}",
    "cards": [
        {
            "id": 1,
            "front": "Question or term",
            "back": "Answer or definition",
            "category": "subcategory"
        }
    ]
}

Make sure:
- Flashcards are educational and progressive
- Front side has clear questions/terms
- Back side has complete answers/definitions
- Use proper JSON formatting with no extra text`;

        const messages = [
            { role: 'system', content: 'You are an expert flashcard creator. Respond ONLY with valid JSON. Do not include any explanatory text before or after the JSON.' },
            { role: 'user', content: prompt }
        ];

        const response = await callDeepSeekAPI(messages, 0.1, 4000);
        
        try {
            // Clean the response to extract JSON
            const cleanedResponse = cleanJsonResponse(response);
            const flashcardData = JSON.parse(cleanedResponse);
            
            // Validate the structure
            if (!flashcardData.cards || !Array.isArray(flashcardData.cards)) {
                throw new Error('Invalid flashcard structure: missing cards array');
            }
            
            // Add metadata
            flashcardData.id = uuidv4();
            flashcardData.createdAt = new Date().toISOString();
            
            res.json(flashcardData);
        } catch (parseError) {
            console.error('Flashcard parsing error:', parseError);
            console.error('Raw response:', response);
            res.status(500).json({ error: 'Failed to generate valid flashcard format' });
        }

    } catch (error) {
        console.error('Flashcard generation error:', error);
        res.status(500).json({ error: 'Failed to generate flashcards' });
    }
});

// Study Plan Generation Endpoint
app.post('/api/generate-study-plan', async (req, res) => {
    try {
        const { subject, duration, currentLevel, goals, studyTime } = req.body;

        if (!subject) {
            return res.status(400).json({ error: 'Subject is required' });
        }

        const planDuration = duration || '4 weeks';
        const level = currentLevel || 'beginner';
        const dailyTime = studyTime || '1 hour';

        const prompt = `Create a comprehensive study plan for "${subject}" over ${planDuration} for a ${level} level student who can study ${dailyTime} per day.

${goals ? `Goals: ${goals}` : ''}

IMPORTANT: Respond ONLY with valid JSON in this exact format (no additional text):

{
    "title": "Study Plan: ${subject}",
    "subject": "${subject}",
    "duration": "${planDuration}",
    "level": "${level}",
    "dailyTime": "${dailyTime}",
    "weeks": [
        {
            "week": 1,
            "title": "Week 1 Title",
            "focus": "Main focus areas",
            "days": [
                {
                    "day": 1,
                    "date": "Day 1",
                    "topics": ["Topic 1", "Topic 2"],
                    "activities": ["Activity 1", "Activity 2"],
                    "duration": "60 minutes"
                }
            ]
        }
    ],
    "resources": ["Resource 1", "Resource 2"],
    "tips": ["Tip 1", "Tip 2"]
}

Make it practical, progressive, and achievable.`;

        const messages = [
            { role: 'system', content: 'You are an expert study planner. Respond ONLY with valid JSON. Do not include any explanatory text before or after the JSON.' },
            { role: 'user', content: prompt }
        ];

        const response = await callDeepSeekAPI(messages, 0.1, 5000);
        
        try {
            // Clean the response to extract JSON
            const cleanedResponse = cleanJsonResponse(response);
            const studyPlanData = JSON.parse(cleanedResponse);
            
            // Add metadata
            studyPlanData.id = uuidv4();
            studyPlanData.createdAt = new Date().toISOString();
            
            res.json(studyPlanData);
        } catch (parseError) {
            console.error('Study plan parsing error:', parseError);
            console.error('Raw response:', response);
            res.status(500).json({ error: 'Failed to generate valid study plan format' });
        }

    } catch (error) {
        console.error('Study plan generation error:', error);
        res.status(500).json({ error: 'Failed to generate study plan' });
    }
});

// Task Management Endpoints
app.post('/api/tasks', (req, res) => {
    try {
        const { title, description, dueDate, priority, category } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Task title is required' });
        }

        const task = {
            id: uuidv4(),
            title,
            description: description || '',
            dueDate: dueDate || null,
            priority: priority || 'medium',
            category: category || 'general',
            completed: false,
            createdAt: new Date().toISOString()
        };

        res.json(task);
    } catch (error) {
        console.error('Task creation error:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Get study suggestions based on performance
app.post('/api/study-suggestions', async (req, res) => {
    try {
        const { quizResults, studyHistory, weakAreas } = req.body;

        const prompt = `Based on the following study data, provide personalized study suggestions:

Quiz Results: ${JSON.stringify(quizResults)}
Study History: ${JSON.stringify(studyHistory)}
Weak Areas: ${JSON.stringify(weakAreas)}

Format the response as a JSON object with this structure:
{
    "suggestions": [
        {
            "type": "focus_area",
            "title": "Focus on X",
            "description": "Detailed suggestion",
            "priority": "high/medium/low"
        }
    ],
    "recommendedTopics": ["Topic 1", "Topic 2"],
    "studyTips": ["Tip 1", "Tip 2"]
}

Provide actionable, personalized advice.`;

        const messages = [
            { role: 'system', content: 'You are a study advisor. Analyze student performance and provide personalized study recommendations.' },
            { role: 'user', content: prompt }
        ];

        const response = await callDeepSeekAPI(messages, 0.3, 2000);
        
        try {
            const suggestions = JSON.parse(response);
            res.json(suggestions);
        } catch (parseError) {
            console.error('Suggestions parsing error:', parseError);
            res.status(500).json({ error: 'Failed to generate valid suggestions format' });
        }

    } catch (error) {
        console.error('Study suggestions error:', error);
        res.status(500).json({ error: 'Failed to generate study suggestions' });
    }
});

// Explain concept endpoint
app.post('/api/explain-concept', async (req, res) => {
    try {
        const { concept, subject, level } = req.body;

        if (!concept) {
            return res.status(400).json({ error: 'Concept is required' });
        }

        const prompt = `Explain the concept "${concept}" ${subject ? `in ${subject}` : ''} at a ${level || 'general'} level.

Provide:
1. Clear definition
2. Key points
3. Examples
4. Common misconceptions (if any)
5. How it relates to other concepts

Make it educational and easy to understand.`;

        const messages = [
            { role: 'system', content: 'You are an expert teacher. Explain concepts clearly and comprehensively.' },
            { role: 'user', content: prompt }
        ];

        const response = await callDeepSeekAPI(messages, 0.3, 2000);
        res.json({ explanation: response });

    } catch (error) {
        console.error('Concept explanation error:', error);
        res.status(500).json({ error: 'Failed to explain concept' });
    }
});


// AI Answer Grading Endpoint
app.post('/api/grade-answer', async (req, res) => {
    try {
        const { question, expectedAnswer, keywords, userAnswer } = req.body;

        if (!question || !userAnswer) {
            return res.status(400).json({ error: 'Question and user answer are required' });
        }

        const gradingPrompt = `You are an AI teacher grading a short answer question. 

Question: "${question}"
Expected Answer: "${expectedAnswer}"
Key Concepts: ${keywords ? keywords.join(', ') : 'Not specified'}
Student Answer: "${userAnswer}"

Grade the student's answer on a scale of 0.0 to 1.0 where:
- 1.0 = Perfect answer, demonstrates complete understanding
- 0.8-0.9 = Very good, covers most key points with minor gaps
- 0.6-0.7 = Good, shows understanding but missing some important details
- 0.4-0.5 = Partial understanding, some correct elements but significant gaps
- 0.2-0.3 = Limited understanding, few correct elements
- 0.0-0.1 = Incorrect or no understanding shown

Consider:
- Accuracy of factual content
- Coverage of key concepts
- Understanding demonstrated
- Completeness of explanation

Respond with ONLY a JSON object in this format:
{
    "score": 0.85,
    "feedback": "Brief explanation of the grade"
}`;

        const response = await callDeepSeekAPI([{
            role: 'user',
            content: gradingPrompt
        }], 0.3, 500);

        const grading = cleanJsonResponse(response);
        
        res.json({ 
            success: true, 
            score: grading.score,
            feedback: grading.feedback 
        });

    } catch (error) {
        console.error('Answer grading error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to grade answer' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        apiKey: DEEPSEEK_API_KEY ? DEEPSEEK_API_KEY.substring(0, 10) + '...' : 'Not configured'
    });
});

app.listen(PORT, () => {
    console.log(`🎓 StudiQ running on http://localhost:${PORT}`);
    console.log(`📚 AI-powered study assistant ready!`);
    console.log(`🔑 Using DeepSeek API key: ${DEEPSEEK_API_KEY ? DEEPSEEK_API_KEY.substring(0, 10) + '...' : 'Not configured'}`);
}); 