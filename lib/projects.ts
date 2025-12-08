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
    description: "AI-powered programming tutor leveraging AWS Bedrock (Claude 4.5 haiku), achieving 50% response time improvement through optimized prompt engineering, and LangChain-based agentic workflows.",
    techStack: ["React", "AWS Bedrock", "Flask", "DynamoDB", "Docker", "LangChain"],
    liveUrl: "https://codifyai.org"
  },
  {
    id: 2,
    title: "Time Series Forecasting for Financial Markets",
    description: "Built ARIMA, LSTM, and GRU models for stock prediction (AAPL, NVDA, LYFT), achieving 64-82% RMSE reduction. Implemented grid search across 36 ARIMA configurations and built 2-layer LSTM/GRU architectures with dropout regularization. Conducted stationarity analysis using ADF tests and automated data extraction for 1,458+ trading days via yfinance API.",
    techStack: ["Python", "TensorFlow", "Statsmodels", "LSTM", "GRU", "ARIMA", "yfinance"],
    githubUrl: "https://github.com/allanilya/Stock-analytics"
  },
  {
    id: 3,
    title: "Multimodal Video Analysis",
    description: "Built full-stack AI video analysis platform with Flask/Next.js featuring CLIP-based visual search, transcript search, and Gemini 2.5 Flash multimodal chat with conversational memory. Engineered async parallel processing pipeline achieving <3s response time via background frame extraction and normalized cosine similarity for instant semantic search.",
    techStack: ["Flask", "Next.js", "CLIP", "Gemini 2.5 Flash", "Python", "React", "Async Processing"],
    githubUrl: "https://github.com/allanilya/Multimodal-Video-Analysis"
  },
    {
    id: 4,
    title: "NoScroll Content Blocker Script",
    description: "Created CSS rules to block any access to short form content, while navigating Instagram & Youtube on iOS & MacOs Safari browser. To be used on any content blocking extension that supports custom CSS, such as '1Blocker' or 'AdGuard'.",
    techStack: ["CSS", "1Blocker"],
    githubUrl: "https://github.com/allanilya/NoScroll"
  },
  {
    id: 5,
    title: "Diabetes Risk Prediction",
    description: "Tested whether lifestyle or demographic factors are greater predictors of diabetes using a dataset of 230K+ patient records. Employed advanced data wrangling (imputation, encoding, outlier detection) and addressed class imbalance with SMOTE. Developed ML algorithms (Random Forest, Logistic Regression, KNN) with 5-fold cross-validation to predict diabetes risk.",
    techStack: ["Python", "Scikit-learn", "SMOTE", "Random Forest", "Logistic Regression", "KNN", "Pandas"],
    githubUrl: "https://github.com/allanilya/Diabetes-Prediction"
  },
  {
    id: 6,
    title: "Student Performance Analytics",
    description: "Utilized classification algorithms and data visualization methods to reveal the correlations of different attributes predicted to affect student academic performance. There are many factors explored, such as how study time, internet access, and alcohol consumption relate to student GPA.",
    techStack: ["Python", "Scikit-learn", "Naive Bayes", "Random Forest", "Logistic Regression", "Decision Tree", "Pandas", "Jupyter Notebook"],
    githubUrl: "https://github.com/allanilya/Diabetes-Prediction"
  },
  {
    id: 7,
    title: "Personal Portfolio Website",
    description: "Developed a responsive personal portfolio website using Next.js and Tailwind CSS to showcase projects and skills. Implemented dark mode support and optimized for performance and SEO.",
    techStack: ["Next.js", "Tailwind CSS", "React", "JavaScript", "Vercel"],
    githubUrl: "https://github.com/allanilya/Portfolio-v1",
    liveUrl: "https://allanilyasov.com"
  },
  {
    id: 8,
    title: "Gapminder Global Trends",
    description: "Created different visualizations in the Gapminder dataset to reveal global trends in life expectancy, population growth, and economic development over time. Used Shiny to create an interactive web application that allows users to explore these trends through dynamic charts and maps.",
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
