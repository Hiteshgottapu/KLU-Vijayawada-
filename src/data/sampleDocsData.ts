export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  type: string;
  chunksCount: number;
  size: string;
  lastUpdated: string;
  content: string;
}

export interface PresetQuestion {
  id: string;
  question: string;
  category: 'Syllabus' | 'Architecture' | 'Setup' | 'Code';
  preview: string;
}

export const sampleDocs: SampleDoc[] = [
  {
    id: 'doc-1',
    title: 'KL University AI/ML Level-2 Syllabus (Official)',
    category: 'Curriculum',
    type: 'PDF',
    chunksCount: 28,
    size: '1.4 MB',
    lastUpdated: '5-7 October 2026',
    content: 'Day 1: Machine Learning & Python Foundations (Scikit-Learn, Pandas, NumPy).\nDay 2: Deep Learning, Neural Networks & Computer Vision (TensorFlow/Keras, CNNs, OpenCV).\nDay 3: NLP, Transformers, Vector Databases & Capstone RAG Project.'
  },
  {
    id: 'doc-2',
    title: 'RAG Architecture & LangChain Implementation Manual',
    category: 'Architecture',
    type: 'PDF',
    chunksCount: 42,
    size: '2.8 MB',
    lastUpdated: 'October 2026',
    content: 'Comprehensive guide to Retrieval-Augmented Generation (RAG) using LangChain, Hugging Face Hub inference API (Llama-3.2-3B-Instruct), Sentence Transformers (all-MiniLM-L6-v2), and persistent ChromaDB vector storage.'
  },
  {
    id: 'doc-3',
    title: 'Hugging Face Hub & Access Token Setup Guide',
    category: 'Setup',
    type: 'MARKDOWN',
    chunksCount: 15,
    size: '450 KB',
    lastUpdated: 'October 2026',
    content: 'Step-by-step guide to generating Hugging Face access tokens (hf_...), setting environment variables (HUGGINGFACEHUB_API_TOKEN), and invoking HuggingFaceEndpoint in Python.'
  }
];

export const kluSyllabusDocs = sampleDocs;
