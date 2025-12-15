/**
 * SKILLS DATA
 * ===========
 * Centralized skill categories and color mappings used across Skills and Projects components.
 * This ensures consistency and provides a single source of truth for skill categorization.
 */

export interface SkillCategory {
  title: string;
  description: string;
  skills: Array<{
    name: string;
    description: string;
  }>;
  colors: {
    bg: string;
    text: string;
    badge: string;
  };
}

/**
 * Main skill categories with their associated colors
 * Add new skills to the appropriate category, and they'll automatically
 * appear in both Skills section and get proper colors in Projects section
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages for full-stack development, data science, and AI/ML applications",
    skills: [
      { name: "Python", description: "Primary language for AI/ML, data science, backend APIs, and automation scripting" },
      { name: "TypeScript", description: "Type-safe JavaScript for building robust, scalable frontend and backend applications" },
      { name: "JavaScript", description: "Dynamic language for web development, Node.js backends, and interactive UIs" },
      { name: "Java", description: "Enterprise-grade language for backend systems and Spring Boot applications" },
      { name: "SQL", description: "Database query language for relational database management and data analysis" },
      { name: "R", description: "Statistical computing language for data analysis, visualization, and machine learning" },
      { name: "Swift", description: "Apple's language for iOS, macOS, and native app development" },
      { name: "PHP", description: "Server-side scripting language for web development and content management systems" }
    ],
    colors: {
      bg: 'from-purple-500 to-pink-500',
      text: 'text-purple-400',
      badge: 'bg-purple-900 text-purple-200'
    }
  },
  {
    title: "Frontend",
    description: "Modern frontend frameworks and libraries for building responsive, interactive web applications",
    skills: [
      { name: "React", description: "Component-based JavaScript library for building dynamic user interfaces and SPAs" },
      { name: "Next.js", description: "React framework with server-side rendering, routing, and optimized performance" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid, responsive UI development" },
      { name: "Radix UI", description: "Unstyled, accessible UI component library for building design systems" }
    ],
    colors: {
      bg: 'from-blue-500 to-cyan-500',
      text: 'text-blue-400',
      badge: 'bg-blue-900 text-blue-200'
    }
  },
  {
    title: "Backend",
    description: "Server-side frameworks and technologies for building scalable APIs and web services",
    skills: [
      { name: "Flask", description: "Lightweight Python web framework for building RESTful APIs and microservices" },
      { name: "Django", description: "Full-featured Python framework for rapid development of secure web applications" },
      { name: "Spring Boot", description: "Java framework for building production-grade enterprise applications and APIs" },
      { name: "Node.js", description: "JavaScript runtime for building fast, scalable server-side applications" },
      { name: "REST APIs", description: "Architectural style for designing networked applications with HTTP methods" }
    ],
    colors: {
      bg: 'from-green-500 to-emerald-500',
      text: 'text-green-400',
      badge: 'bg-green-900 text-green-200'
    }
  },
  {
    title: "AI/ML",
    description: "Machine learning frameworks and tools for building intelligent systems and AI applications",
    skills: [
      { name: "LangChain", description: "Framework for developing LLM-powered applications with chains and agents" },
      { name: "LangGraph", description: "Library for building stateful, multi-actor LLM applications with graph workflows" },
      { name: "TensorFlow", description: "End-to-end machine learning platform for training and deploying ML models" },
      { name: "PyTorch", description: "Deep learning framework with dynamic computation graphs for research and production" },
      { name: "Scikit-learn", description: "Machine learning library for classification, regression, and clustering algorithms" },
      { name: "AWS Bedrock", description: "Fully managed service for building and scaling generative AI applications" }
    ],
    colors: {
      bg: 'from-orange-500 to-red-500',
      text: 'text-orange-400',
      badge: 'bg-orange-900 text-orange-200'
    }
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure and deployment tools for scalable, reliable application hosting",
    skills: [
      { name: "AWS", description: "Cloud computing platform for hosting, storage, databases, and serverless functions" },
      { name: "Docker", description: "Containerization platform for packaging applications with their dependencies" },
      { name: "DynamoDB", description: "NoSQL database service for high-performance, scalable applications" },
      { name: "Elastic Beanstalk", description: "PaaS for deploying and managing applications without infrastructure management" },
      { name: "Lambda", description: "Serverless compute service for running code without managing servers" },
      { name: "API Gateway", description: "Service for creating, publishing, and managing secure APIs at scale" }
    ],
    colors: {
      bg: 'from-indigo-500 to-purple-500',
      text: 'text-indigo-400',
      badge: 'bg-indigo-900 text-indigo-200'
    }
  },
  {
    title: "Data Science",
    description: "Data analysis, manipulation, and visualization libraries for extracting insights from data",
    skills: [
      { name: "Pandas", description: "Data manipulation library for analyzing structured data with DataFrames" },
      { name: "NumPy", description: "Numerical computing library for array operations and mathematical functions" },
      { name: "Plotly", description: "Interactive visualization library for creating charts, dashboards, and graphs" },
      { name: "Spark", description: "Distributed computing framework for big data processing and analytics" },
      { name: "NLTK", description: "Natural Language Toolkit for text processing, tokenization, and NLP tasks" },
      { name: "Spacy", description: "Industrial-strength NLP library for advanced text processing and entity recognition" },
      { name: "Beautiful Soup", description: "Web scraping library for parsing HTML and extracting data from web pages" }
    ],
    colors: {
      bg: 'from-teal-500 to-cyan-500',
      text: 'text-teal-400',
      badge: 'bg-teal-900 text-teal-200'
    }
  },
  {
    title: "Databases",
    description: "Database systems for storing, retrieving, and managing structured and unstructured data",
    skills: [
      { name: "MySQL", description: "Popular relational database for web applications with ACID compliance" },
      { name: "MongoDB", description: "NoSQL document database for flexible, scalable data storage" },
      { name: "Pinecone", description: "Vector database for similarity search and ML embedding storage" },
      { name: "FAISS", description: "Library for efficient similarity search of dense vectors and embeddings" },
      { name: "Vector Databases", description: "Specialized databases for storing and querying high-dimensional vectors for AI" }
    ],
    colors: {
      bg: 'from-pink-500 to-rose-500',
      text: 'text-pink-400',
      badge: 'bg-pink-900 text-pink-200'
    }
  }
];

/**
 * Additional technologies not in main skill categories
 * Used for project tech stacks that don't fit the main categories
 */
export const extraTechColors: Record<string, string> = {
  // AI/ML - Orange
  'claude sonnet 4.5': 'bg-orange-900 text-orange-200',
  'lstm': 'bg-orange-900 text-orange-200',
  'gru': 'bg-orange-900 text-orange-200',
  'arima': 'bg-orange-900 text-orange-200',
  'random forest': 'bg-orange-900 text-orange-200',
  'logistic regression': 'bg-orange-900 text-orange-200',
  'knn': 'bg-orange-900 text-orange-200',
  'naive bayes': 'bg-orange-900 text-orange-200',
  'decision tree': 'bg-orange-900 text-orange-200',
  'smote': 'bg-orange-900 text-orange-200',

  // Cloud & DevOps - Indigo
  'vercel': 'bg-indigo-900 text-indigo-200',

  // Data Science - Teal
  'statsmodels': 'bg-teal-900 text-teal-200',
  'yfinance': 'bg-teal-900 text-teal-200',
  'jupyter notebook': 'bg-teal-900 text-teal-200',

  // Languages - Purple (R framework)
  'shiny': 'bg-purple-900 text-purple-200',

  // Frontend - Blue
  'css': 'bg-blue-900 text-blue-200',

  // Other
  '1blocker': 'bg-gray-700 text-gray-200',
};

/**
 * Get the badge color class for a given technology
 * Checks main skill categories first, then extra mappings, then defaults to gray
 */
export function getTechColor(tech: string): string {
  // Check if tech exists in main skill categories
  for (const category of skillCategories) {
    if (category.skills.some(skill => skill.name.toLowerCase() === tech.toLowerCase())) {
      return category.colors.badge;
    }
  }

  // Check extra tech mappings
  const normalized = tech.toLowerCase();
  if (extraTechColors[normalized]) {
    return extraTechColors[normalized];
  }

  // Default gray for anything else
  return 'bg-gray-700 text-gray-200';
}
