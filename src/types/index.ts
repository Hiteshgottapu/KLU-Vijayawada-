export type PageId =
  | 'home'
  | 'schedule'
  | 'day1'
  | 'day2'
  | 'day3'
  | 'project'
  | 'resources'
  | 'notebooks'
  | 'about'
  | '404';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PitfallItem {
  mistake: string;
  solution: string;
}

export interface TopicItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  definition: string;
  whyUsed: string;
  applications: string[];
  intuition: string;
  formula?: {
    math: string;
    explanation?: string;
    description?: string;
    variables?: { symbol?: string; meaning?: string; name?: string; desc?: string }[];
  };
  diagramDesc?: string;
  codeSnippet: string;
  codeLanguage?: string;
  expectedOutput?: string;
  isIllustrativeOutput?: boolean;
  commonPitfalls?: PitfallItem[];
  commonMistakes?: PitfallItem[];
  practiceExercise?: {
    task: string;
    starterCode?: string;
    solution: string;
    solutionCode?: string;
    hint?: string;
  };
  handsOnExercise?: {
    title: string;
    task: string;
    starterCode: string;
    solutionCode: string;
  };
  quiz: QuizQuestion[];
}

export interface PracticalExercise {
  title: string;
  subtitle?: string;
  taskDescription?: string;
  description?: string;
  steps?: string[];
  starterCode?: string;
  solutionCode?: string;
  evaluationRubric?: string[];
}

export interface DayCurriculum {
  dayNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  themeColor: string;
  date: string;
  forenoonTitle: string;
  forenoonTopics: TopicItem[];
  afternoonTitle: string;
  afternoonTopics: TopicItem[];
  practicalExercise?: PracticalExercise;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'slides' | 'notebook' | 'dataset' | 'cheatsheet' | 'project' | 'reading';
  day: 'day1' | 'day2' | 'day3' | 'project' | 'general' | 'all';
  fileType: string;
  fileSize: string;
  filename: string;
  downloadUrl?: string;
  contentGenerator?: () => string;
}

export interface NotebookItem {
  id: string;
  title: string;
  day: 1 | 2 | 3;
  category?: string;
  topicTag?: string;
  description: string;
  colabUrl: string;
  code: string;
  simulatedOutput: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  sources?: {
    docName: string;
    chunkId?: string;
    score?: number;
    snippet?: string;
    relevance?: number;
  }[];
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'syllabus' | 'notes' | 'capstone' | 'custom' | 'paper';
  wordCount: number;
  content: string;
  chunks: string[];
}