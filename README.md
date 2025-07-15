# StudiQ - AI-Powered Study Assistant

A comprehensive web-based study application that harnesses the power of DeepSeek AI to revolutionize your learning experience. StudiQ provides intelligent quiz generation, flashcard creation, personalized study plans, task management, and an AI study assistant.

## ✨ Features

### 📊 **Dashboard**
- Study statistics and progress tracking
- Recent activity overview
- Study streak monitoring
- Performance metrics

### 🧠 **AI-Powered Quiz System**
- Generate custom quizzes on any topic
- Multiple difficulty levels (Easy, Medium, Hard)
- Various question types (Multiple Choice, True/False)
- Instant feedback and detailed explanations
- Progress tracking and quiz history

### 🗂️ **Smart Flashcard System**
- AI-generated flashcard sets
- Interactive flip animations
- Spaced repetition tracking
- Difficulty rating system
- Multiple study modes

### 📅 **Intelligent Study Plans**
- Personalized study schedules
- Calendar integration
- Progress tracking
- Adaptive learning paths
- Goal-oriented planning

### ✅ **Task Management**
- Create and organize study tasks
- Priority levels and categories
- Due date tracking
- Progress monitoring
- Completion statistics

### 🤖 **AI Study Assistant**
- Real-time chat with AI tutor
- Concept explanations
- Study tips and strategies
- Homework help
- 24/7 availability

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open StudiQ:**
   Navigate to `http://localhost:3000` in your browser

## 🔧 Configuration

The application uses your provided DeepSeek API key: `sk-7b760952b5ad437f8d5da7ddcf16853a`

To change the API key:
- Set the `DEEPSEEK_API_KEY` environment variable, or
- Modify the `DEEPSEEK_API_KEY` constant in `server.js`

## 📖 How to Use StudiQ

### 🎯 **Getting Started**
1. Access the dashboard to see your study overview
2. Navigate between sections using the sidebar
3. All your progress is automatically saved

### 🧠 **Creating Quizzes**
1. Go to the **Quizzes** section
2. Click "Generate Quiz"
3. Enter your topic (e.g., "World War II", "Calculus", "Biology")
4. Select difficulty and question count
5. Take the quiz and get instant feedback

### 🗂️ **Using Flashcards**
1. Visit the **Flashcards** section
2. Click "Generate Flashcards"
3. Specify your topic and preferences
4. Study with interactive flip cards
5. Rate difficulty for spaced repetition

### 📅 **Study Planning**
1. Navigate to **Study Plan**
2. Click "Create Study Plan"
3. Enter subject, duration, and goals
4. Follow your personalized schedule
5. Track progress on the calendar

### ✅ **Managing Tasks**
1. Go to the **Tasks** section
2. Click "Add Task"
3. Set priority, due date, and category
4. Check off completed tasks
5. Monitor your productivity

### 🤖 **AI Assistant**
1. Access the **AI Assistant** section
2. Ask questions about any topic
3. Get explanations and study tips
4. Request homework help
5. Chat naturally with the AI

## 🔍 API Endpoints

StudiQ provides several REST API endpoints:

### Chat Assistant
- `POST /api/chat` - Send message to AI assistant

### Quiz Generation
- `POST /api/generate-quiz` - Generate custom quiz
- `POST /api/study-suggestions` - Get personalized study suggestions

### Flashcard System
- `POST /api/generate-flashcards` - Create flashcard sets

### Study Planning
- `POST /api/generate-study-plan` - Create personalized study plans

### Task Management
- `POST /api/tasks` - Create new tasks

### Utilities
- `POST /api/explain-concept` - Get detailed concept explanations
- `GET /api/health` - Check server health

## 💾 Data Storage

StudiQ uses localStorage for client-side data persistence:
- Quiz history and results
- Flashcard sets and progress
- Study plans and schedules
- Task lists and completion status
- Chat conversation history

## 🎨 User Interface

### Modern Design
- Gradient backgrounds and smooth animations
- Responsive layout for all devices
- Intuitive navigation and controls
- Interactive elements and feedback

### Accessibility
- Clear typography and color contrast
- Keyboard navigation support
- Screen reader compatible
- Mobile-friendly interface

## 🛠️ Technical Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **DeepSeek API** - AI intelligence
- **UUID** - Unique identifier generation

### Frontend
- **Vanilla JavaScript** - Interactive functionality
- **HTML5 & CSS3** - Modern web standards
- **Font Awesome** - Icon library
- **CSS Grid & Flexbox** - Responsive layouts

### Features
- **Real-time AI Integration** - Instant responses
- **Local Storage** - Data persistence
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Graceful degradation

## 🔒 Security & Privacy

- API keys are server-side only
- No personal data stored remotely
- Local storage for user preferences
- Secure HTTPS recommended for production

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Development with auto-reload
```

### Production
```bash
npm start    # Production server
```

### Environment Variables
```bash
PORT=3000
DEEPSEEK_API_KEY=your_api_key_here
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

StudiQ is optimized for:
- **Fast Loading** - Minimal dependencies
- **Smooth Animations** - Hardware acceleration
- **Efficient API Usage** - Smart caching
- **Responsive Interface** - Sub-second interactions

## 🔧 Customization

### Themes
Modify CSS variables in `public/index.html` to customize colors and styling.

### AI Behavior
Adjust system prompts in `server.js` to modify AI assistant personality and responses.

### Features
Enable/disable features by modifying the frontend JavaScript in `public/app.js`.

## 📱 Mobile Experience

StudiQ is fully optimized for mobile devices:
- Touch-friendly interface
- Responsive navigation
- Optimized for small screens
- Gesture support for flashcards

## 🎓 Educational Benefits

### For Students
- **Personalized Learning** - Adaptive content
- **Progress Tracking** - Visual feedback
- **Spaced Repetition** - Effective memorization
- **Goal Setting** - Structured learning

### For Educators
- **Assessment Tools** - Quiz generation
- **Progress Monitoring** - Student analytics
- **Content Creation** - Automated materials
- **Flexible Integration** - Easy deployment

## 🆘 Troubleshooting

### Common Issues

1. **API Key Problems**
   - Verify your DeepSeek API key is valid
   - Check API usage limits
   - Ensure network connectivity

2. **Server Issues**
   - Restart the server: `npm start`
   - Check port availability: `lsof -i :3000`
   - Review server logs for errors

3. **Browser Issues**
   - Clear browser cache
   - Enable JavaScript
   - Try in incognito mode

4. **Data Loss**
   - Check localStorage permissions
   - Backup data regularly
   - Use browser dev tools to inspect storage

## 📞 Support

For technical support:
- Check browser console for errors
- Review server logs
- Verify API key validity
- Test network connectivity

## 🌟 Future Enhancements

Potential future features:
- **Multi-user Support** - Shared study groups
- **Advanced Analytics** - Detailed progress reports
- **Offline Mode** - Local AI processing
- **Voice Integration** - Speech-to-text
- **Gamification** - Achievements and rewards

## 📄 License

MIT License - Free to use, modify, and distribute!

## 🌐 Deployment

### Environment Variables Setup

1. **Create environment file:**
```bash
cp .env.example .env
```

2. **Add your DeepSeek API key to `.env`:**
```
DEEPSEEK_API_KEY=your_actual_api_key_here
```

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub
   - Click "New Project" and select your repository
   - Add environment variable: `DEEPSEEK_API_KEY` = `your_api_key_here`
   - Click "Deploy"

Your app will be live at `yourproject.vercel.app`!

### Alternative Deployment Options
- **Railway**: [railway.app](https://railway.app)
- **Render**: [render.com](https://render.com)
- **Heroku**: [heroku.com](https://heroku.com)

---

**Happy Studying with StudiQ! 🎓✨**

Transform your learning journey with AI-powered study tools designed for academic success. 