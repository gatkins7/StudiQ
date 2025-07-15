# StudiQ - AI-Powered Study Assistant

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![DeepSeek](https://img.shields.io/badge/AI-DeepSeek-4285F4?style=for-the-badge&logo=openai&logoColor=white)](https://deepseek.com)

> **Transform your learning experience with AI-powered study materials, interactive quizzes, and intelligent flashcards.**

---

## 🚀 Live Demo

**🌐 [Try StudiQ Now](https://your-deployment-url.vercel.app)**

---

## ✨ Features

### 🏠 **Smart Dashboard**
- Personal greeting and user profiles
- Study statistics and progress tracking
- Recent activity overview
- Study streak monitoring
- Performance metrics and analytics

### 🧠 **AI-Powered Study Content Generation**
- **Study Text**: Comprehensive summaries tailored to your needs
- **Interactive Quizzes**: 10 AI-generated questions with instant feedback
- **Smart Flashcards**: 15 cards with flip animations for effective memorization
- **Difficulty Levels**: 🌱 Beginner, 📚 Intermediate, 🚀 Advanced

### 📚 **Study Library**
- Save and organize all your study sets
- Track completion status and quiz scores
- Quick access to previous materials
- Beautiful grid layout with material cards

### 🤖 **AI Study Assistant**
- Real-time chat with intelligent AI tutor
- Get explanations on any topic
- Study tips and personalized recommendations
- Context-aware responses based on your study history

### 🎨 **Modern UI/UX**
- **Dark Theme**: Eye-friendly design with glass morphism
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Intuitive Navigation**: Easy-to-use sidebar and content switching

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **AI Engine** | DeepSeek API |
| **Deployment** | Vercel |
| **Database** | LocalStorage (Client-side) |
| **Styling** | Custom CSS with CSS Variables |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18.0.0 or higher)
- DeepSeek API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/gatkins7/StudiQ.git
   cd StudiQ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your DeepSeek API key:
   ```
   DEEPSEEK_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `DEEPSEEK_API_KEY`
   - Deploy!

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DEEPSEEK_API_KEY` | Your DeepSeek API key for AI functionality | ✅ Yes |
| `PORT` | Server port (auto-set by Vercel) | ❌ No |
| `NODE_ENV` | Environment mode (auto-set by Vercel) | ❌ No |

---

## 📱 Usage

### 1. **First-Time Setup**
- Enter your name
- Accept privacy policy and terms
- Click "Get Started"

### 2. **Create Study Set**
- Click "Create Study Set" from dashboard
- Enter title and description
- Select difficulty level
- Add focus areas (optional)
- AI generates comprehensive materials

### 3. **Study Flow**
- **Read Study Text**: Comprehensive overview
- **Practice with Flashcards**: Interactive flip cards
- **Take Quiz**: 10 questions with instant feedback
- **Review Results**: Track progress and scores

### 4. **AI Assistant**
- Ask questions about any topic
- Get study tips and explanations
- Receive personalized recommendations

---

## 🎯 Key Features in Detail

### AI Study Generation
- **Smart Content**: AI analyzes your topic and creates relevant study materials
- **Adaptive Difficulty**: Content adjusts to your selected skill level
- **Comprehensive Coverage**: Text, quiz, and flashcards all generated together

### Interactive Quiz System
- **10 Multiple Choice Questions** per study set
- **Instant Feedback** with correct answer explanations
- **Progress Tracking** with percentage scores
- **Retake Capability** for practice

### Flashcard System
- **15 Cards** per study set
- **Flip Animation** for engaging study experience
- **Sequential Learning** with navigation controls
- **Front/Back Design** for effective memorization

### Study Library
- **Persistent Storage** of all your study sets
- **Completion Tracking** with quiz scores
- **Easy Access** to previous materials
- **Visual Organization** with card-based layout

---

## 🔧 API Endpoints

### Study Set Generation
```http
POST /api/generate-study-set
Content-Type: application/json

{
  "title": "Biology Basics",
  "description": "Introduction to cell biology",
  "difficulty": "intermediate",
  "focus": "cell structure, organelles"
}
```

### AI Chat Assistant
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Explain photosynthesis",
  "conversation": []
}
```

---

## 🎨 Design Features

### Visual Design
- **Glass Morphism**: Modern translucent design elements
- **Dark Theme**: Reduced eye strain with elegant dark interface
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Engaging micro-interactions

### User Experience
- **Intuitive Navigation**: Clear sidebar with visual indicators
- **Progressive Disclosure**: Information revealed as needed
- **Consistent Patterns**: Familiar interactions throughout
- **Accessibility**: Designed for all users

---

## 🔒 Privacy & Security

- **Local Storage**: User data stored client-side
- **Secure API**: Environment variables for sensitive data
- **Privacy First**: No unnecessary data collection
- **Transparent Terms**: Clear privacy policy and terms of service

---

## 🚧 Future Enhancements

### Planned Features
- [ ] User accounts and cloud sync
- [ ] Collaborative study sets
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multiple AI model support
- [ ] Study reminders and notifications
- [ ] Export to PDF/Anki
- [ ] Voice-to-text input

### Technical Improvements
- [ ] Database integration (PostgreSQL)
- [ ] Advanced caching strategies
- [ ] Real-time multiplayer features
- [ ] Offline functionality
- [ ] Performance optimizations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 👤 Author

**Gregory Atkins**
- GitHub: [@gatkins7](https://github.com/gatkins7)
- Project: [StudiQ](https://github.com/gatkins7/StudiQ)

---

## 🙏 Acknowledgments

- **DeepSeek AI** for powering the intelligent study generation
- **Vercel** for seamless deployment and hosting
- **Font Awesome** for beautiful icons
- **Google Fonts** for the Inter font family

---

## 🔗 Links

- [Live Demo](https://your-deployment-url.vercel.app)
- [GitHub Repository](https://github.com/gatkins7/StudiQ)
- [Documentation](https://github.com/gatkins7/StudiQ/wiki)
- [Issue Tracker](https://github.com/gatkins7/StudiQ/issues)

---

<div align="center">

### ⭐ If you find StudiQ helpful, please consider giving it a star!

**Made with ❤️ and AI**

</div> 