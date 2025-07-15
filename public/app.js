// StudiQ App - Enhanced with Setup, Settings, and Blue Theme

class StudiQApp {
    constructor() {
        this.currentSection = 'home';
        this.currentStudySet = null;
        this.currentContentType = 'text';
        this.currentQuizIndex = 0;
        this.currentFlashcardIndex = 0;
        this.quizAnswers = [];
        this.studySets = [];
        this.chatConversation = [];
        this.settings = {
            emailNotifications: false,
            studyReminders: true,
            darkMode: true,
            reducedMotion: false,
            largeText: false,
            autoSaveProgress: true,
            quizTimer: false,
            showHints: true,
            dataCollection: false,
            analytics: false
        };
        this.userData = {
            name: '',
            setupComplete: false,
            privacyAccepted: false,
            tosAccepted: false
        };
        
        this.initializeApp();
    }

    initializeApp() {
        this.loadData();
        
        // Check if first-time setup is needed
        if (!this.userData.setupComplete) {
            this.showSetupScreen();
        } else {
            this.hideSetupScreen();
            this.updateUserDisplay();
        }
        
        this.setupNavigation();
        this.setupEventListeners();
        this.updateProfileStats();
        this.loadLibrary();
        this.createNotificationSystem();
        this.setupSettings();
    }

    // First-time Setup Screen
    showSetupScreen() {
        const setupOverlay = document.getElementById('setup-overlay');
        setupOverlay.style.display = 'flex';
        
        // Setup form event listener
        document.getElementById('setup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.completeSetup();
        });

        // Validate checkboxes
        const checkboxes = document.querySelectorAll('.setup-checkbox');
        const submitButton = document.getElementById('setup-submit');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                const nameField = document.getElementById('user-name');
                const nameValid = nameField.value.trim().length > 0;
                
                submitButton.disabled = !(allChecked && nameValid);
            });
        });

        // Name field validation
        document.getElementById('user-name').addEventListener('input', (e) => {
            const nameValid = e.target.value.trim().length > 0;
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            submitButton.disabled = !(allChecked && nameValid);
        });
    }

    hideSetupScreen() {
        const setupOverlay = document.getElementById('setup-overlay');
        setupOverlay.style.display = 'none';
    }

    completeSetup() {
        const userName = document.getElementById('user-name').value.trim();
        const privacyAccepted = document.getElementById('privacy-agree').checked;
        const tosAccepted = document.getElementById('tos-agree').checked;

        if (!userName || !privacyAccepted || !tosAccepted) {
            this.showNotification('Please complete all required fields', 'error');
            return;
        }

        this.userData = {
            name: userName,
            setupComplete: true,
            privacyAccepted: privacyAccepted,
            tosAccepted: tosAccepted
        };

        this.saveData();
        this.hideSetupScreen();
        this.updateUserDisplay();
        this.showNotification(`Welcome to StudiQ, ${userName}! 🎉`, 'success');
    }

    updateUserDisplay() {
        const displayName = this.userData.name || 'Student';
        document.getElementById('display-user-name').textContent = displayName;
        document.getElementById('home-user-name').textContent = displayName;
        document.getElementById('settings-name').value = displayName;
    }

    // Settings Management
    setupSettings() {
        // Initialize settings toggles
        Object.keys(this.settings).forEach(settingKey => {
            const toggle = document.querySelector(`[data-setting="${settingKey}"]`);
            if (toggle) {
                toggle.classList.toggle('active', this.settings[settingKey]);
            }
        });

        // Update settings name field
        document.getElementById('settings-name').addEventListener('change', (e) => {
            this.userData.name = e.target.value;
            this.updateUserDisplay();
            this.saveData();
        });
    }

    // Enhanced Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        document.getElementById(sectionName).classList.add('active');
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        this.currentSection = sectionName;
        
        // Initialize section-specific content
        if (sectionName === 'library') {
            this.loadLibrary();
        } else if (sectionName === 'profile') {
            this.updateProfileStats();
        } else if (sectionName === 'settings') {
            this.setupSettings();
        }
    }

    // Enhanced Event Listeners
    setupEventListeners() {
        // Study set creation form
        document.getElementById('study-set-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createStudySet();
        });

        // Content navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const contentType = tab.dataset.content;
                this.switchContent(contentType);
            });
        });

        // Chat input
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    // Enhanced Notification System
    createNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        `;
        document.body.appendChild(notificationContainer);
    }

    showNotification(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            pointer-events: auto;
            min-width: 320px;
            padding: 16px 20px;
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(148, 163, 184, 0.3);
            border-radius: var(--border-radius-sm);
            color: var(--text-primary);
            box-shadow: var(--shadow-lg);
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };
        
        notification.innerHTML = `
            <span style="font-size: 1.2rem;">${icons[type]}</span>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2rem; padding: 0; margin: 0;">×</button>
        `;
        
        document.getElementById('notification-container').appendChild(notification);
        
        // Add slide-in animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Auto-remove after duration
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    // Enhanced Loading System
    showLoading(title = 'Generating Study Set...', message = 'Creating comprehensive study materials for you') {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        overlay.innerHTML = `
            <div style="background: rgba(30, 41, 59, 0.9); backdrop-filter: blur(20px); border-radius: var(--border-radius-lg); padding: 48px; text-align: center; box-shadow: var(--shadow-xl); border: 2px solid rgba(148, 163, 184, 0.3); max-width: 400px; width: 90%;">
                <div style="width: 60px; height: 60px; border: 4px solid rgba(148, 163, 184, 0.3); border-top: 4px solid var(--accent-blue); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 24px;"></div>
                <h2 style="color: var(--text-primary); font-size: 1.5rem; font-weight: 600; margin-bottom: 12px;">${title}</h2>
                <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 24px;">${message}</p>
                <div style="width: 100%; height: 8px; background: rgba(30, 41, 59, 0.8); border-radius: 4px; overflow: hidden;">
                    <div id="progress-bar" style="height: 100%; background: var(--accent-blue); border-radius: 4px; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Animate progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 90) {
                clearInterval(interval);
                progress = 90;
            }
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 90)}%`;
            }
        }, 300);
        
        return interval;
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                progressBar.style.width = '100%';
            }
            
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
    }

    // Unified Study Set Creation
    async createStudySet() {
        const title = document.getElementById('study-title').value;
        const description = document.getElementById('study-description').value;
        const difficulty = document.getElementById('study-difficulty').value;
        const focus = document.getElementById('study-focus').value;

        if (!title || !description) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const loadingInterval = this.showLoading('Creating Study Set...', 'Generating text summary, quiz questions, and flashcards...');

        try {
            // Generate comprehensive study materials
            const response = await fetch('/api/generate-study-set', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    difficulty,
                    focus
                })
            });

            const data = await response.json();

            if (data.success) {
                // Create study set object
                const studySet = {
                    id: Date.now(),
                    title,
                    description,
                    difficulty,
                    focus,
                    studyText: data.studyText,
                    quiz: data.quiz,
                    flashcards: data.flashcards,
                    createdAt: new Date().toISOString(),
                    lastAccessed: new Date().toISOString(),
                    completed: false,
                    quizScore: null
                };

                // Save to library
                this.studySets.push(studySet);
                this.saveData();
                
                this.hideLoading();
                this.showNotification('Study set created successfully! 🎉', 'success');
                
                // Auto-redirect to study viewer
                setTimeout(() => {
                    this.openStudySet(studySet);
                }, 1500);
                
            } else {
                throw new Error(data.error || 'Failed to create study set');
            }
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to create study set. Please try again.', 'error');
            console.error('Study set creation error:', error);
        }
    }

    // Study Set Viewer
    openStudySet(studySet) {
        this.currentStudySet = studySet;
        this.currentContentType = 'text';
        this.currentQuizIndex = 0;
        this.currentFlashcardIndex = 0;
        this.quizAnswers = [];

        // Update study set access time
        studySet.lastAccessed = new Date().toISOString();
        this.saveData();

        // Update UI
        document.getElementById('study-set-title').textContent = studySet.title;
        document.getElementById('study-set-subtitle').textContent = studySet.description;

        // Switch to viewer
        this.switchSection('study-viewer');
        
        // Hide tab navigation for sequential flow
        document.querySelector('.content-navigation').style.display = 'none';
        
        // Start with text content
        this.switchContent('text');
        
        // Show welcome message for sequential flow
        setTimeout(() => {
            this.showNotification('📖 Start by reading the study text, then proceed through flashcards and quiz!', 'info');
        }, 500);
    }

    // Content Navigation
    switchContent(contentType) {
        this.currentContentType = contentType;

        // Update tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-content="${contentType}"]`).classList.add('active');

        // Render content
        const contentArea = document.getElementById('content-area');
        
        switch(contentType) {
            case 'text':
                this.renderStudyText(contentArea);
                break;
            case 'quiz':
                this.renderQuiz(contentArea);
                break;
            case 'flashcards':
                this.renderFlashcards(contentArea);
                break;
        }
    }

    // Render Study Text
    renderStudyText(container) {
        if (!this.currentStudySet || !this.currentStudySet.studyText) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No study text available.</p>';
            return;
        }

        container.innerHTML = `
            <div class="study-text-container" style="max-width: 900px; margin: 0 auto;">
                <div class="study-text-content" style="color: var(--text-primary); font-size: 1.1rem; line-height: 1.8; margin-bottom: 48px;">
                    ${this.formatStudyText(this.currentStudySet.studyText)}
                </div>
                <div style="display: flex; justify-content: center; margin-top: 48px;">
                    <button class="btn btn-primary" onclick="app.proceedToFlashcards()" style="padding: 16px 32px; font-size: 1.1rem; font-weight: 600;">
                        <i class="fas fa-arrow-right" style="margin-right: 8px;"></i>
                        Next: Study Flashcards
                    </button>
                </div>
            </div>
        `;
    }

    formatStudyText(text) {
        // Remove markdown symbols and create natural, readable text
        let formatted = text
            // Remove markdown headers (##, ###, etc.)
            .replace(/^#{1,6}\s+(.+)$/gm, '<h3 class="study-heading">$1</h3>')
            // Remove bold markdown but keep the emphasis
            .replace(/\*\*(.*?)\*\*/g, '<strong class="study-emphasis">$1</strong>')
            // Remove italic markdown but keep the emphasis
            .replace(/\*(.*?)\*/g, '<em class="study-highlight">$1</em>')
            // Remove numbered lists and make them natural
            .replace(/^\d+\.\s+(.+)$/gm, '<div class="study-point">$1</div>')
            // Remove bullet points and make them natural
            .replace(/^[\-\*]\s+(.+)$/gm, '<div class="study-point">$1</div>')
            // Convert double line breaks to paragraphs
            .replace(/\n\n/g, '</p><p class="study-paragraph">')
            // Convert single line breaks to spaces (more natural flow)
            .replace(/\n/g, ' ')
            // Wrap in paragraphs
            .replace(/^/, '<p class="study-paragraph">')
            .replace(/$/, '</p>')
            // Clean up any multiple spaces
            .replace(/\s+/g, ' ');

        // Add custom styling for study text elements
        const style = `
            <style>
                .study-heading {
                    color: var(--text-primary);
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin: 32px 0 16px 0;
                    padding-bottom: 8px;
                    border-bottom: 2px solid rgba(148, 163, 184, 0.3);
                }
                .study-paragraph {
                    margin-bottom: 20px;
                    color: var(--text-primary);
                    text-align: justify;
                }
                .study-emphasis {
                    color: var(--accent-primary);
                    font-weight: 600;
                }
                .study-highlight {
                    color: var(--text-secondary);
                    font-style: normal;
                    background: rgba(59, 130, 246, 0.1);
                    padding: 2px 4px;
                    border-radius: 4px;
                }
                .study-point {
                    margin: 12px 0;
                    padding-left: 20px;
                    position: relative;
                    color: var(--text-primary);
                }
                .study-point::before {
                    content: "•";
                    color: var(--accent-primary);
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                }
            </style>
        `;

        return style + formatted;
    }

    // New sequential flow functions
    proceedToFlashcards() {
        this.switchContent('flashcards');
        this.showNotification('Time to study with flashcards! 📚', 'info');
    }

    proceedToQuiz() {
        this.currentQuizIndex = 0;
        this.quizAnswers = [];
        this.switchContent('quiz');
        this.showNotification('Ready to test your knowledge? 🧠', 'info');
    }

    // Render Quiz
    renderQuiz(container) {
        if (!this.currentStudySet || !this.currentStudySet.quiz) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No quiz available.</p>';
            return;
        }

        const quiz = this.currentStudySet.quiz;
        const currentQuestion = quiz[this.currentQuizIndex];

        if (!currentQuestion) {
            this.showQuizResults(container);
            return;
        }

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(20px); border-radius: var(--border-radius); padding: 40px; box-shadow: var(--shadow-lg); border: 2px solid rgba(148, 163, 184, 0.3);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <div style="color: var(--text-secondary); font-weight: 600;">Question ${this.currentQuizIndex + 1} of ${quiz.length}</div>
                        <div style="color: var(--text-muted);">${Math.round(((this.currentQuizIndex + 1) / quiz.length) * 100)}%</div>
                    </div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 24px; line-height: 1.4;">${currentQuestion.question}</div>
                    <div style="display: grid; gap: 16px; margin-bottom: 32px;">
                        ${currentQuestion.options.map((option, index) => `
                            <div class="option" onclick="app.selectQuizOption(${index})" data-option="${index}" style="background: rgba(30, 41, 59, 0.8); border: 2px solid rgba(148, 163, 184, 0.3); border-radius: var(--border-radius-sm); padding: 20px; cursor: pointer; transition: all var(--transition-medium); backdrop-filter: blur(10px);">
                                <div style="color: var(--text-primary); font-weight: 500; font-size: 1.1rem;">${option}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 32px;">
                        <button class="btn btn-secondary" onclick="app.previousQuestion()" ${this.currentQuizIndex === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left"></i>
                            Previous
                        </button>
                        <button class="btn btn-primary" onclick="app.nextQuestion()" id="next-question-btn" disabled>
                            ${this.currentQuizIndex === quiz.length - 1 ? 'Finish Quiz' : 'Next'}
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    selectQuizOption(optionIndex) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
            option.style.borderColor = 'rgba(148, 163, 184, 0.3)';
            option.style.boxShadow = 'none';
        });

        // Add selection to clicked option
        const selectedOption = document.querySelector(`[data-option="${optionIndex}"]`);
        selectedOption.classList.add('selected');
        selectedOption.style.borderColor = 'var(--accent-blue)';
        selectedOption.style.boxShadow = '0 0 0 4px rgba(96, 165, 250, 0.2)';

        // Save answer
        this.quizAnswers[this.currentQuizIndex] = optionIndex;

        // Enable next button
        document.getElementById('next-question-btn').disabled = false;
    }

    nextQuestion() {
        if (this.currentQuizIndex < this.currentStudySet.quiz.length - 1) {
            this.currentQuizIndex++;
            this.switchContent('quiz');
        } else {
            this.finishQuiz();
        }
    }

    previousQuestion() {
        if (this.currentQuizIndex > 0) {
            this.currentQuizIndex--;
            this.switchContent('quiz');
        }
    }

    finishQuiz() {
        // Calculate score
        const quiz = this.currentStudySet.quiz;
        let correctAnswers = 0;
        
        for (let i = 0; i < quiz.length; i++) {
            if (this.quizAnswers[i] === quiz[i].correctAnswer) {
                correctAnswers++;
            }
        }
        
        const score = Math.round((correctAnswers / quiz.length) * 100);
        
        // Save score
        this.currentStudySet.quizScore = score;
        this.currentStudySet.completed = true;
        this.saveData();
        
        // Show results
        this.showQuizResults(document.getElementById('content-area'));
    }

    showQuizResults(container) {
        const score = this.currentStudySet.quizScore || 0;
        const quiz = this.currentStudySet.quiz;
        
        // Update library since quiz is complete
        this.loadLibrary();
        this.updateProfileStats();
        
        // Re-show tab navigation for review
        document.querySelector('.content-navigation').style.display = 'flex';
        
        container.innerHTML = `
            <div style="text-align: center; padding: 48px;">
                <div style="font-size: 4rem; margin-bottom: 24px;">${score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}</div>
                <h2 style="color: var(--text-primary); font-size: 2.5rem; margin-bottom: 16px;">Study Set Complete!</h2>
                <div style="font-size: 3rem; font-weight: 900; color: var(--accent-blue); margin-bottom: 24px;">
                    ${score}%
                </div>
                <p style="color: var(--text-secondary); font-size: 1.2rem; margin-bottom: 16px;">
                    You got ${quiz.filter((q, i) => this.quizAnswers[i] === q.correctAnswer).length} out of ${quiz.length} questions correct
                </p>
                <div style="background: rgba(34, 197, 94, 0.1); border: 2px solid rgba(34, 197, 94, 0.3); border-radius: var(--border-radius); padding: 20px; margin: 24px 0; display: flex; align-items: center; justify-content: center; gap: 12px;">
                    <i class="fas fa-check-circle" style="color: #22c55e; font-size: 1.5rem;"></i>
                    <span style="color: var(--text-primary); font-weight: 600;">
                        "${this.currentStudySet.title}" has been saved to your library!
                    </span>
                </div>
                <div style="display: flex; justify-content: center; gap: 16px; margin-top: 32px;">
                    <button class="btn btn-secondary" onclick="app.retakeQuiz()">
                        <i class="fas fa-redo"></i>
                        Retake Quiz
                    </button>
                    <button class="btn btn-primary" onclick="app.switchSection('library')">
                        <i class="fas fa-book"></i>
                        View Library
                    </button>
                </div>
            </div>
        `;
    }

    retakeQuiz() {
        this.currentQuizIndex = 0;
        this.quizAnswers = [];
        this.switchContent('quiz');
    }

    // Render Flashcards
    renderFlashcards(container) {
        if (!this.currentStudySet || !this.currentStudySet.flashcards) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No flashcards available.</p>';
            return;
        }

        const flashcards = this.currentStudySet.flashcards;
        const currentCard = flashcards[this.currentFlashcardIndex];

        if (!currentCard) {
            container.innerHTML = '<p style="color: var(--text-secondary);">No more flashcards to study.</p>';
            return;
        }

        const isLastCard = this.currentFlashcardIndex === flashcards.length - 1;

        container.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <span style="color: var(--text-secondary); font-weight: 500;">
                        Card ${this.currentFlashcardIndex + 1} of ${flashcards.length}
                    </span>
                </div>
                
                <div style="background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(20px); border-radius: var(--border-radius); min-height: 300px; display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: all var(--transition-medium); box-shadow: var(--shadow-lg); border: 2px solid rgba(148, 163, 184, 0.3); margin-bottom: 32px;" onclick="app.flipFlashcard()" id="current-flashcard">
                    <div style="padding: 40px;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary); line-height: 1.4;" id="flashcard-text">
                            ${currentCard.front}
                        </div>
                        <div style="margin-top: 16px; color: var(--text-muted); font-size: 0.9rem;">
                            Click to flip
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 16px; margin-top: 24px;">
                    <button class="btn btn-secondary" onclick="app.previousFlashcard()" ${this.currentFlashcardIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i>
                        Previous
                    </button>
                    ${isLastCard ? `
                        <button class="btn btn-primary" onclick="app.proceedToQuiz()" style="padding: 16px 32px; font-size: 1.1rem; font-weight: 600;">
                            <i class="fas fa-arrow-right" style="margin-right: 8px;"></i>
                            Next: Take Quiz
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="app.nextFlashcard()">
                            Next
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    `}
                </div>
            </div>
        `;
    }

    flipFlashcard() {
        const flashcard = document.getElementById('current-flashcard');
        const flashcardText = document.getElementById('flashcard-text');
        const currentCard = this.currentStudySet.flashcards[this.currentFlashcardIndex];
        
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
            flashcardText.textContent = currentCard.front;
        } else {
            flashcard.classList.add('flipped');
            flashcardText.textContent = currentCard.back;
        }
    }

    nextFlashcard() {
        if (this.currentFlashcardIndex < this.currentStudySet.flashcards.length - 1) {
            this.currentFlashcardIndex++;
            this.switchContent('flashcards');
        }
    }

    previousFlashcard() {
        if (this.currentFlashcardIndex > 0) {
            this.currentFlashcardIndex--;
            this.switchContent('flashcards');
        }
    }

    // Library Management
    loadLibrary() {
        const libraryGrid = document.getElementById('library-grid');
        
        if (this.studySets.length === 0) {
            libraryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px;">
                    <div style="font-size: 3rem; margin-bottom: 24px; opacity: 0.5;">📚</div>
                    <h3 style="color: var(--text-primary); margin-bottom: 16px;">No study sets yet</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 32px;">Create your first study set to get started!</p>
                    <button class="btn btn-primary" onclick="showStudyCreator()">
                        <i class="fas fa-plus"></i>
                        Create Study Set
                    </button>
                </div>
            `;
            return;
        }

        libraryGrid.innerHTML = this.studySets.map(studySet => `
            <div style="background: rgba(30, 41, 59, 0.8); backdrop-filter: blur(20px); border-radius: var(--border-radius); padding: 24px; border: 2px solid rgba(148, 163, 184, 0.3); cursor: pointer; transition: all var(--transition-medium); position: relative; overflow: hidden;" onclick="app.openStudySet(${JSON.stringify(studySet).replace(/"/g, '&quot;')})" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--shadow-lg)'; this.style.borderColor='var(--accent-blue)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(148, 163, 184, 0.3)';">
                <h3 style="color: var(--text-primary); font-size: 1.3rem; font-weight: 700; margin-bottom: 12px;">${studySet.title}</h3>
                <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.95rem;">${studySet.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(148, 163, 184, 0.3);">
                    <div style="color: var(--text-muted); font-size: 0.85rem;">
                        Created ${new Date(studySet.createdAt).toLocaleDateString()}
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <div style="padding: 4px 8px; background: var(--accent-blue); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">Text</div>
                        <div style="padding: 4px 8px; background: var(--accent-blue); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">Quiz</div>
                        <div style="padding: 4px 8px; background: var(--accent-blue); color: white; border-radius: 4px; font-size: 0.75rem; font-weight: 500;">Cards</div>
                    </div>
                </div>
                ${studySet.completed ? `
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px; color: #10b981;">
                        <i class="fas fa-check-circle"></i>
                        <span style="font-size: 0.9rem;">Completed (${studySet.quizScore}%)</span>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    // Profile Statistics
    updateProfileStats() {
        const totalStudySets = this.studySets.length;
        const completedSets = this.studySets.filter(set => set.completed);
        const averageScore = completedSets.length > 0 
            ? Math.round(completedSets.reduce((sum, set) => sum + set.quizScore, 0) / completedSets.length)
            : 0;
        
        // Calculate study streak (simplified)
        const today = new Date();
        const daysSinceLastStudy = this.studySets.length > 0 
            ? Math.floor((today - new Date(this.studySets[this.studySets.length - 1].lastAccessed)) / (1000 * 60 * 60 * 24))
            : 0;
        const studyStreak = daysSinceLastStudy <= 1 ? this.studySets.length : 0;

        // Update UI
        document.getElementById('total-study-sets').textContent = totalStudySets;
        document.getElementById('total-quiz-score').textContent = `${averageScore}%`;
        document.getElementById('study-streak').textContent = studyStreak;
    }

    // Chat System
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    conversation: this.chatConversation
                })
            });

            const data = await response.json();

            if (data.success) {
                this.hideTypingIndicator();
                this.addChatMessage(data.response, 'ai');
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addChatMessage('Sorry, I encountered an error. Please try again.', 'ai');
            console.error('Chat error:', error);
        }
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        
        messageElement.className = 'message';
        messageElement.style.cssText = `
            max-width: 80%;
            padding: 16px 20px;
            border-radius: var(--border-radius-sm);
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
            margin-bottom: 12px;
        `;

        if (sender === 'user') {
            messageElement.style.alignSelf = 'flex-end';
            messageElement.style.background = 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%)';
            messageElement.style.color = 'white';
            messageElement.style.marginLeft = 'auto';
        } else {
            messageElement.style.alignSelf = 'flex-start';
            messageElement.style.background = 'rgba(30, 41, 59, 0.9)';
            messageElement.style.border = '2px solid rgba(148, 163, 184, 0.3)';
            messageElement.style.color = 'var(--text-primary)';
        }

        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Save to conversation history
        this.chatConversation.push({ role: sender, content: message });
        if (this.chatConversation.length > 20) {
            this.chatConversation = this.chatConversation.slice(-20);
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.style.cssText = `
            align-self: flex-start;
            background: rgba(30, 41, 59, 0.9);
            border: 2px solid rgba(148, 163, 184, 0.3);
            color: var(--text-primary);
            padding: 16px 20px;
            border-radius: var(--border-radius-sm);
            margin-bottom: 12px;
            max-width: 80%;
        `;
        indicator.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="display: flex; gap: 4px;">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 1.5s infinite;"></div>
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 1.5s infinite 0.5s;"></div>
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 1.5s infinite 1s;"></div>
                </div>
                <span>AI is typing...</span>
            </div>
        `;
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat?')) {
            const messagesContainer = document.getElementById('chat-messages');
            messagesContainer.innerHTML = `
                <div class="message" style="max-width: 80%; padding: 16px 20px; border-radius: var(--border-radius-sm); backdrop-filter: blur(10px); animation: fadeIn 0.3s ease; align-self: flex-start; background: rgba(30, 41, 59, 0.9); border: 2px solid rgba(148, 163, 184, 0.3); color: var(--text-primary);">
                    👋 Hello! I'm your AI study assistant. I can help you with explanations, study tips, homework help, and more. How can I assist you today?
                </div>
            `;
            this.chatConversation = [];
        }
    }

    // Data Persistence
    saveData() {
        const data = {
            studySets: this.studySets,
            chatConversation: this.chatConversation,
            settings: this.settings,
            userData: this.userData
        };
        localStorage.setItem('studiq_data', JSON.stringify(data));
    }

    loadData() {
        const data = localStorage.getItem('studiq_data');
        if (data) {
            const parsedData = JSON.parse(data);
            this.studySets = parsedData.studySets || [];
            this.chatConversation = parsedData.chatConversation || [];
            this.settings = { ...this.settings, ...parsedData.settings };
            this.userData = { ...this.userData, ...parsedData.userData };
        }
    }
}

// Global App Instance
const app = new StudiQApp();

// Global Functions
function showStudyCreator() {
    app.switchSection('study-creator');
}

function sendMessage() {
    app.sendMessage();
}

function clearChat() {
    app.clearChat();
}

function toggleSetting(toggle) {
    toggle.classList.toggle('active');
    app.showNotification('Setting updated successfully', 'success', 1500);
}

function showPrivacyPolicy() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    modal.innerHTML = `
        <div style="background: rgba(30, 41, 59, 0.9); backdrop-filter: blur(20px); border-radius: var(--border-radius-lg); padding: 40px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border: 2px solid rgba(148, 163, 184, 0.3);">
            <h2 style="color: var(--text-primary); font-size: 1.8rem; margin-bottom: 24px;">Privacy Policy</h2>
            <div style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
                <p style="margin-bottom: 16px;">StudiQ is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.</p>
                <p style="margin-bottom: 16px;"><strong>Information We Collect:</strong></p>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li>Name and basic profile information</li>
                    <li>Study materials and progress data</li>
                    <li>Usage analytics (if enabled)</li>
                </ul>
                <p style="margin-bottom: 16px;"><strong>How We Use Your Information:</strong></p>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li>To provide personalized study experiences</li>
                    <li>To improve our AI-powered features</li>
                    <li>To send study reminders (if enabled)</li>
                </ul>
                <p style="margin-bottom: 16px;"><strong>Data Protection:</strong></p>
                <p>All data is stored locally on your device and encrypted. We do not sell or share your personal information with third parties.</p>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showTermsOfService() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    modal.innerHTML = `
        <div style="background: rgba(30, 41, 59, 0.9); backdrop-filter: blur(20px); border-radius: var(--border-radius-lg); padding: 40px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; border: 2px solid rgba(148, 163, 184, 0.3);">
            <h2 style="color: var(--text-primary); font-size: 1.8rem; margin-bottom: 24px;">Terms of Service</h2>
            <div style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
                <p style="margin-bottom: 16px;">By using StudiQ, you agree to the following terms and conditions.</p>
                <p style="margin-bottom: 16px;"><strong>Acceptable Use:</strong></p>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li>Use StudiQ for educational purposes only</li>
                    <li>Do not share inappropriate content</li>
                    <li>Respect intellectual property rights</li>
                </ul>
                <p style="margin-bottom: 16px;"><strong>AI-Generated Content:</strong></p>
                <p style="margin-bottom: 16px;">StudiQ uses AI to generate study materials. While we strive for accuracy, please verify important information with authoritative sources.</p>
                <p style="margin-bottom: 16px;"><strong>Service Availability:</strong></p>
                <p>We aim to provide consistent service but cannot guarantee 100% uptime. Features may be updated or modified without notice.</p>
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function resetAllData() {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
        localStorage.removeItem('studiq_data');
        location.reload();
    }
} 