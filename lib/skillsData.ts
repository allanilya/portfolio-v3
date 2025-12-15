/**
 * SKILLS DATA
 * ===========
 * Centralized skill categories and color mappings used across Skills and Projects components.
 * This ensures consistency and provides a single source of truth for skill categorization.
 */

export interface SkillCategory {
  title: string;
  skills: string[];
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
    skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "R", "Swift", "PHP"],
    colors: {
      bg: 'from-purple-500 to-pink-500',
      text: 'text-purple-400',
      badge: 'bg-purple-900 text-purple-200'
    }
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Radix UI"],
    colors: {
      bg: 'from-blue-500 to-cyan-500',
      text: 'text-blue-400',
      badge: 'bg-blue-900 text-blue-200'
    }
  },
  {
    title: "Backend",
    skills: ["Flask", "Django", "Spring Boot", "Node.js", "REST APIs"],
    colors: {
      bg: 'from-green-500 to-emerald-500',
      text: 'text-green-400',
      badge: 'bg-green-900 text-green-200'
    }
  },
  {
    title: "AI/ML",
    skills: ["LangChain", "LangGraph", "TensorFlow", "PyTorch", "Scikit-learn", "AWS Bedrock"],
    colors: {
      bg: 'from-orange-500 to-red-500',
      text: 'text-orange-400',
      badge: 'bg-orange-900 text-orange-200'
    }
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "DynamoDB", "Elastic Beanstalk", "Lambda", "API Gateway"],
    colors: {
      bg: 'from-indigo-500 to-purple-500',
      text: 'text-indigo-400',
      badge: 'bg-indigo-900 text-indigo-200'
    }
  },
  {
    title: "Data Science",
    skills: ["Pandas", "NumPy", "Plotly", "Spark", "NLTK", "Spacy", "Beautiful Soup"],
    colors: {
      bg: 'from-teal-500 to-cyan-500',
      text: 'text-teal-400',
      badge: 'bg-teal-900 text-teal-200'
    }
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "Pinecone", "FAISS", "Vector Databases"],
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
    if (category.skills.some(skill => skill.toLowerCase() === tech.toLowerCase())) {
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
