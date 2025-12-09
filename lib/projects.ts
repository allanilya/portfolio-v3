export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Codify AI",
    description: "An AI-powered programming tutor that helps students learn coding through interactive conversations without just providing pasted code. Features real-time code assistance powered by Claude 4.5 haiku via AWS Bedrock, with intelligent agentic workflows that adapt to each student's learning pace.",
    techStack: ["React", "Flask", "AWS Bedrock", "Claude Sonnet 4.5", "DynamoDB", "Elastic Beanstalk", "Docker", "LangChain"],
    liveUrl: "https://codifyai.org"
  },
  {
    id: 2,
    title: "Time Series Forecasting for Financial Markets",
    description: "A comprehensive stock prediction system that analyzes and forecasts prices for AAPL, NVDA, and LYFT using multiple machine learning approaches. Combines traditional ARIMA statistical models with deep learning architectures (LSTM and GRU) to achieve highly accurate predictions across 1,458+ trading days.",
    techStack: ["Python", "TensorFlow", "Statsmodels", "LSTM", "GRU", "ARIMA", "yfinance"],
    githubUrl: "https://github.com/allanilya/Stock-analytics"
  },
  {
    id: 3,
    title: "Multimodal Video Analysis",
    description: "A full-stack video analysis platform that enables intelligent searching and interaction with video content. Features visual search using CLIP embeddings, transcript search, and an AI chat interface powered by Gemini 2.5 Flash that can answer questions about video content with conversational memory.",
    techStack: ["Flask", "Next.js", "CLIP", "Gemini 2.5 Flash", "Python", "React", "Async Processing"],
    githubUrl: "https://github.com/allanilya/Multimodal-Video-Analysis"
  },
    {
    id: 4,
    title: "NoScroll Content Blocker Script",
    description: "Custom CSS rules designed to block short-form content on Instagram and YouTube while browsing on iOS and macOS Safari. Works with content blocking extensions like 1Blocker or AdGuard to help users avoid infinite scrolling and focus on intentional content consumption.",
    techStack: ["CSS", "1Blocker"],
    githubUrl: "https://github.com/allanilya/NoScroll"
  },
  {
    id: 5,
    title: "Diabetes Risk Prediction",
    description: "A machine learning study comparing lifestyle versus demographic factors as predictors of diabetes risk using 230K+ patient records. Analyzes which factors—such as diet, exercise, and family history—are most significant in predicting diabetes, using ensemble methods and cross-validation for robust predictions.",
    techStack: ["Python", "Scikit-learn", "SMOTE", "Random Forest", "Logistic Regression", "KNN", "Pandas"],
    githubUrl: "https://github.com/allanilya/Diabetes-Prediction"
  },
  {
    id: 6,
    title: "Student Performance Analytics",
    description: "An analytical exploration of factors affecting student academic performance through classification algorithms and data visualization. Examines how study time, internet access, alcohol consumption, and other variables correlate with student GPA to identify key predictors of academic success.",
    techStack: ["Python", "Scikit-learn", "Naive Bayes", "Random Forest", "Logistic Regression", "Decision Tree", "Pandas", "Jupyter Notebook"],
    githubUrl: "https://github.com/allanilya/Diabetes-Prediction"
  },
  {
    id: 7,
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS featuring an interactive Matrix-style background, project showcases, and smooth navigation. Optimized for performance and SEO with server-side rendering and static generation.",
    techStack: ["Next.js", "Tailwind CSS", "React", "JavaScript", "Vercel"],
    githubUrl: "https://github.com/allanilya/Portfolio-v1",
    liveUrl: "https://allanilyasov.com"
  },
  {
    id: 8,
    title: "Gapminder Global Trends",
    description: "An interactive web application that visualizes global trends in life expectancy, population growth, and economic development using the Gapminder dataset. Features dynamic charts and maps built with R Shiny that allow users to explore historical patterns and regional differences across decades.",
    techStack: ["R", "Shiny"],
    githubUrl: "https://github.com/allanilya/Gapminder-Global-Trends"
  }
  // Add your projects here following the same format
  // Example:
  // {
  //   id: 2,
  //   title: "Your Project Name",
  //   description: "Brief description of your project",
  //   techStack: ["Tech1", "Tech2", "Tech3"],
  //   githubUrl: "https://github.com/yourusername/project",
  //   liveUrl: "https://yourproject.com" // optional
  // },
];
