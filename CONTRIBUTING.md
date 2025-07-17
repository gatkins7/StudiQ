# Contributing to StudiQ

We love your input! We want to make contributing to StudiQ as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints
5. Issue that pull request!

## Branch Naming

Use descriptive branch names:
- `feature/add-user-authentication`
- `bugfix/fix-quiz-scoring`
- `hotfix/security-patch`
- `docs/update-readme`

## Commit Messages

Write clear, descriptive commit messages:
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when applicable

Examples:
```
Add user authentication system

Fix quiz scoring calculation bug
- Resolve issue with percentage calculation
- Add proper rounding for display
- Fixes #123

Update README with deployment instructions
```

## Code Style

### JavaScript
- Use ES6+ features when appropriate
- Use descriptive variable and function names
- Add comments for complex logic
- Follow existing indentation (4 spaces)
- Use semicolons consistently

### CSS
- Use CSS custom properties (variables) for colors and spacing
- Follow BEM methodology for class naming when applicable
- Group related styles together
- Use meaningful class names

### HTML
- Use semantic HTML elements
- Include proper accessibility attributes
- Maintain consistent indentation
- Use lowercase for all element and attribute names

## File Structure

When adding new files:
- Frontend code goes in `public/`
- Server-side logic in `server.js`
- Documentation in the root directory
- Keep files organized and well-named

## Testing

### Manual Testing
Before submitting a PR:
- Test on desktop and mobile
- Verify all features work as expected
- Check for console errors
- Test with different study topics and difficulties

### Automated Testing
We welcome contributions to add automated testing:
- Unit tests for utility functions
- Integration tests for API endpoints
- End-to-end tests for user workflows

## Bug Reports

Bug reports should include:
- **Summary**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to recreate the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, device type
- **Screenshots**: If applicable

Use this template:
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Actual Behavior
A clear description of what actually happened.

## Screenshots
If applicable, add screenshots to help explain your problem.

## Environment
- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone12, Desktop]
```

## Feature Requests

Feature requests should include:
- **Problem Statement**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: What other solutions did you consider?
- **Additional Context**: Screenshots, mockups, etc.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/StudiQ.git
   cd StudiQ
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your API keys
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Make your changes**

7. **Test thoroughly**

8. **Create a pull request**

## Development Guidelines

### Adding New Features
- Ensure features are accessible
- Consider mobile users
- Add appropriate error handling
- Update documentation
- Consider performance impact

### API Development
- Follow RESTful conventions
- Include proper error responses
- Add input validation
- Document new endpoints

### UI/UX Changes
- Maintain design consistency
- Consider accessibility
- Test on different screen sizes
- Follow existing patterns

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

## Questions?

Don't hesitate to ask questions! You can:
- Open an issue with the "question" label
- Start a discussion in the GitHub Discussions tab
- Reach out to the maintainers

## Recognition

Contributors will be recognized in the following ways:
- Listed in the contributors section of the README
- Mentioned in release notes for significant contributions
- Invited to become maintainers for consistent, high-quality contributions

Thank you for contributing to StudiQ! 🎓✨ 