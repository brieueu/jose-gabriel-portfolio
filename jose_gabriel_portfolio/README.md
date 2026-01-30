# José Gabriel - Portfolio

[![Cloud Run](https://img.shields.io/badge/Cloud%20Run-Deployed-4285F4?logo=google-cloud)](https://portfolio-challenge-633123616006.us-central1.run.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=three.js)](https://threejs.org/)

Professional portfolio showcasing AI and Computer Vision projects, built with React, TypeScript, and Three.js. Winner of 1st place at Microsoft AI Challenge II (2025).

## 🚀 Live Demo

- **Production**: [https://portfolio-challenge-633123616006.us-central1.run.app/](https://portfolio-challenge-633123616006.us-central1.run.app/)
- **GitHub**: [https://github.com/brieueu/jose-gabriel-portfolio](https://github.com/brieueu/jose-gabriel-portfolio)

## ✨ Features

- **Interactive 3D Effects**: WebGL liquid gradient background with Three.js and custom GLSL shaders
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **AI Chatbot**: Google Gemini-powered assistant for portfolio information
- **Modern Stack**: React 19, TypeScript, Vite, Three.js
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Cloud Native**: Dockerized and deployed on Google Cloud Run

## 🎨 Sections

1. **Hero**: Presentation with dynamic cursor effects
2. **About Me**: Background, education, and tech stack
3. **Projects**: Featured work including Microsoft AI Challenge winner
4. **Articles**: Technical blog posts and insights
5. **Contact**: Interactive contact section with liquid effects

## 🛠️ Tech Stack

### Frontend
- React 19.2 with TypeScript
- Three.js + React Three Fiber
- Tailwind CSS
- Vite (build tool)

### AI & APIs
- Google Gemini AI (Chatbot)
- Azure Computer Vision (Project showcase)

### Infrastructure
- Docker + Nginx
- Google Cloud Run
- GitHub Actions (CI/CD ready)

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/brieueu/jose-gabriel-portfolio.git
cd jose-gabriel-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Environment Variables

Create a `.env` file in the root directory (never commit this file):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get your Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy and paste it into your `.env` file

⚠️ **Security Note**: The `.env` file is already in `.gitignore` and will not be committed to the repository.

## 🐳 Docker

```bash
# Build image
docker build -t jose-gabriel-portfolio .

# Run container
docker run -p 8080:80 -e GEMINI_API_KEY=your_key_here jose-gabriel-portfolio
```

## ☁️ Deploy to Google Cloud Run

```bash
# Deploy directly from source with environment variables
gcloud run deploy jose-gabriel-portfolio \
  --source . \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=8080 \
  --set-env-vars GEMINI_API_KEY=your_key_here

# Or build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/jose-gabriel-portfolio
gcloud run deploy jose-gabriel-portfolio \
  --image gcr.io/PROJECT_ID/jose-gabriel-portfolio \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key_here
```

## 🏆 Achievements

- **1st Place** - Microsoft AI Challenge II (2025)
- Azure Computer Vision integration
- YOLOv8 pest detection system (F1-Score: 0.93)

## 📫 Contact

- **Email**: jg.vieira.dev@gmail.com
- **LinkedIn**: [gabriel-work](https://www.linkedin.com/in/gabriel-work/)
- **GitHub**: [@brieueu](https://github.com/brieueu)
- **Schedule a Call**: [cal.com/jose-gabriel-mulcbp](https://cal.com/jose-gabriel-mulcbp)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by José Gabriel** | Computer Engineering Student @ UFAL
