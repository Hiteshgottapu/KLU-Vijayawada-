import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, FileText, Search, Plus, Sparkles, CheckCircle2, 
  ChevronRight, Database, Cpu, ShieldCheck, Zap, Code, Terminal, 
  BookOpen, Layers, Key, Copy, Check, Info, HelpCircle, ArrowRight, Upload, AlertCircle, RefreshCw
} from 'lucide-react';
import { sampleDocs, kluSyllabusDocs, PresetQuestion } from '../data/sampleDocsData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  sources?: { title: string; excerpt: string; page?: number }[];
  timestamp: string;
  promptType?: string;
}

interface ProjectPageProps {
  setCurrentPage?: (page: string) => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'architecture' | 'code' | 'setup'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '👋 **Welcome to the KL University RAG Document Q&A Assistant!**\n\nI have currently indexed the **KL University Official AI/ML Level-2 Syllabus** and **RAG Architectural Guide**. You can ask questions about the 3-day schedule, machine learning algorithms, deep learning, NLP, computer vision, or upload your own custom documents in the sidebar!\n\n*Try clicking one of the suggested questions below or select a system prompt persona to customize my responses.*',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [copiedCode, setCopiedCode] = useState(false);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const systemPrompts = {
    strict: {
      title: 'Strict Academic Guardrail Prompt',
      badge: 'Academic / High Precision',
      description: 'Ensures zero hallucinations by grounding answers strictly in retrieved KL University course documents with full source citations.',
      text: `You are an official Academic Assistant for KL University's AI/ML Level-2 Training Program.
Strict Instructions:
1. Answer the user's question ONLY using the facts provided in the Context below.
2. If the answer cannot be directly derived from the context, state clearly: "I cannot find information regarding this in the provided KL University training documents." Do NOT extrapolate or fabricate facts.
3. Include explicit section or page reference citations for every claim.
4. Maintain a professional academic tone.`
    },
    tutor: {
      title: 'Socratic ML Instructor Prompt',
      badge: 'Interactive Learning',
      description: 'Explains complex RAG and ML concepts with step-by-step analogies, Python code snippets, and follow-up guidance.',
      text: `You are an expert AI/ML Professor guiding KL University students through Level-2 Training.
Instructions:
1. Break down complex topics into intuitive 3-step explanations (Concept -> Real-world Analogy -> Code Snippet).
2. Encourage active learning by ending your response with a thought-provoking follow-up question.
3. Keep technical terminology clear and beginner-friendly.`
    },
    summary: {
      title: 'Executive Curriculum Summary Prompt',
      badge: 'Bullet-Point Summary',
      description: 'Generates high-level bulleted summaries for quick review by students, faculty, and project managers.',
      text: `You are a Technical Summarizer for the KL University AI/ML Level-2 Program.
Instructions:
1. Synthesize the requested topic into 3-5 high-impact bullet points.
2. Highlight key takeaways, prerequisite skills, and hands-on deliverables.
3. Omit filler text and present clear, concise insights.`
    }
  };

  const presetQuestions: PresetQuestion[] = [
    {
      id: 'q1',
      question: 'What is covered on Day 1 of the KL University AI/ML Level-2 Syllabus?',
      category: 'Syllabus',
      preview: 'Day 1 covers Python basics, NumPy, Pandas, Scikit-Learn algorithms...'
    },
    {
      id: 'q2',
      question: 'What topics are included in Day 2 Deep Learning & Computer Vision?',
      category: 'Syllabus',
      preview: 'Day 2 focuses on Neural Networks, TensorFlow/Keras, CNNs, OpenCV...'
    },
    {
      id: 'q3',
      question: 'What is the schedule and content for Day 3 NLP & RAG Project?',
      category: 'Syllabus',
      preview: 'Day 3 covers Transformers, HuggingFace, Vector DBs, ChromaDB, Capstone RAG...'
    },
    {
      id: 'q4',
      question: 'How does Document Chunking work in RAG Architecture?',
      category: 'Architecture',
      preview: 'Explains RecursiveCharacterTextSplitter, chunk size (500), chunk overlap (50)...'
    },
    {
      id: 'q5',
      question: 'Which embedding models and vector databases are used in this project?',
      category: 'Architecture',
      preview: 'Uses Sentence-Transformers (all-MiniLM-L6-v2) and ChromaDB persistent storage...'
    },
    {
      id: 'q6',
      question: 'What is the complete 9-step RAG pipeline flow?',
      category: 'Architecture',
      preview: 'Ingestion -> Chunking -> Embeddings -> Vector DB -> Retrieval -> Context -> LLM -> Citation'
    },
    {
      id: 'q7',
      question: 'How do I obtain a free Hugging Face API Token (hf_...)?',
      category: 'Setup',
      preview: 'Step-by-step account signup, User Settings -> Access Tokens -> Create New Token...'
    },
    {
      id: 'q8',
      question: 'How to configure HUGGINGFACEHUB_API_TOKEN in environment variables?',
      category: 'Setup',
      preview: 'Set environment variable in Windows PowerShell or Linux/macOS bash export...'
    },
    {
      id: 'q9',
      question: 'How to instantiate HuggingFaceEndpoint in Python with LangChain?',
      category: 'Code',
      preview: 'Python code snippet importing HuggingFaceEndpoint and HuggingFaceEmbeddings...'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      let botResponse = '';
      let sources: { title: string; excerpt: string; page?: number }[] = [];

      const lowerQ = query.toLowerCase();

      if (lowerQ.includes('day 1') || lowerQ.includes('day-1') || lowerQ.includes('foundations') || lowerQ.includes('scikit')) {
        botResponse = '### 📅 Day 1: Machine Learning & Python Foundations\n\n**Schedule & Core Focus:**\n- **09:30 AM - 11:30 AM:** Advanced Python Data Structures & Vectorized NumPy Operations.\n- **11:45 AM - 01:15 PM:** Data Preprocessing, Cleaning & Feature Engineering with Pandas.\n- **02:00 PM - 03:45 PM:** Supervised Learning (Linear/Logistic Regression, Decision Trees, Random Forests with `scikit-learn`).\n- **04:00 PM - 05:00 PM:** Model Evaluation (Precision, Recall, F1-Score, Confusion Matrix).\n\n**Key Library Tools:**\n```python\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n```';
        sources = [{ title: 'KL University AI/ML Syllabus (Day 1)', excerpt: 'Day 1: Supervised ML algorithms with scikit-learn, data preprocessing, and evaluation metrics.', page: 1 }];
      } else if (lowerQ.includes('day 2') || lowerQ.includes('day-2') || lowerQ.includes('deep learning') || lowerQ.includes('vision') || lowerQ.includes('cnn')) {
        botResponse = '### 🧠 Day 2: Deep Learning, Neural Networks & Computer Vision\n\n**Schedule & Core Focus:**\n- **09:30 AM - 11:30 AM:** Neural Network Architecture & Backpropagation in TensorFlow/Keras.\n- **11:45 AM - 01:15 PM:** Convolutional Neural Networks (CNNs) for Image Classification.\n- **02:00 PM - 03:45 PM:** Computer Vision Pipelines with OpenCV (Object Detection & Image Enhancement).\n- **04:00 PM - 05:00 PM:** Transfer Learning with Pre-trained Models (ResNet/MobileNet).\n\n**Key Code Snippet:**\n```python\nimport tensorflow as tf\nfrom tensorflow.keras import layers, models\n\nmodel = models.Sequential([\n    layers.Conv2D(32, (3, 3), activation="relu", input_shape=(64, 64, 3)),\n    layers.MaxPooling2D((2, 2)),\n    layers.Flatten(),\n    layers.Dense(64, activation="relu"),\n    layers.Dense(10, activation="softmax")\n])\n```';
        sources = [{ title: 'KL University AI/ML Syllabus (Day 2)', excerpt: 'Day 2: Deep Learning, CNNs, OpenCV, and Transfer Learning with TensorFlow/Keras.', page: 2 }];
      } else if (lowerQ.includes('day 3') || lowerQ.includes('day-3') || lowerQ.includes('nlp') || lowerQ.includes('rag') || lowerQ.includes('huggingface')) {
        botResponse = '### ⚡ Day 3: NLP, Transformers & Capstone RAG Project\n\n**Schedule & Core Focus:**\n- **09:30 AM - 11:30 AM:** Transformer Architecture, Self-Attention & Hugging Face Hub.\n- **11:45 AM - 01:15 PM:** Text Embeddings, Vector Stores (`ChromaDB`) & Chunking Strategies.\n- **02:00 PM - 04:30 PM:** Hands-on Capstone: Building a Production RAG Assistant with LangChain.\n- **04:30 PM - 05:00 PM:** Project Evaluation, Benchmarking & Deployment Guidelines.\n\n**Key Technology Stack:**\n- **LLM Endpoint:** Hugging Face Inference API / `meta-llama/Llama-3.2-3B-Instruct`\n- **Embeddings:** `sentence-transformers/all-MiniLM-L6-v2`\n- **Vector Storage:** Persistent `ChromaDB` index';
        sources = [{ title: 'KL University AI/ML Syllabus (Day 3)', excerpt: 'Day 3: Transformers, HuggingFace Models, Vector Databases, and Capstone RAG Implementation.', page: 3 }];
      } else if (lowerQ.includes('chunk') || lowerQ.includes('split')) {
        botResponse = '### ✂️ Document Chunking Strategy in RAG\n\nDocument Chunking splits large PDF/Markdown texts into smaller, semantically coherent segments for optimal retrieval.\n\n**Configuration Parameters:**\n- **Chunk Size:** 500 characters (~100 tokens per chunk).\n- **Chunk Overlap:** 50 characters (prevents splitting sentences or context in the middle).\n- **Splitter Class:** `RecursiveCharacterTextSplitter` from LangChain.\n\n```python\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\n\ntext_splitter = RecursiveCharacterTextSplitter(\n    chunk_size=500,\n    chunk_overlap=50,\n    separators=["\\n\\n", "\\n", " ", ""]\n)\nchunks = text_splitter.split_documents(raw_docs)\n```';
        sources = [{ title: 'RAG Architectural Guide', excerpt: 'Section 2: Document Ingestion & Recursive Character Text Splitting.', page: 4 }];
      } else if (lowerQ.includes('token') || lowerQ.includes('hugging face api') || lowerQ.includes('api key') || lowerQ.includes('setup')) {
        botResponse = '### 🔑 Obtaining & Configuring Hugging Face API Token\n\n1. **Create Account:** Register free at [huggingface.co/join](https://huggingface.co/join).\n2. **Generate Access Token:** Go to **User Settings -> Access Tokens -> Create New Token** (Type: `Read`).\n3. **Set Environment Variable:**\n   - **Windows PowerShell:**\n     ```powershell\n     $env:HUGGINGFACEHUB_API_TOKEN="hf_your_token_here"\n     ```\n   - **Linux / macOS:**\n     ```bash\n     export HUGGINGFACEHUB_API_TOKEN="hf_your_token_here"\n     ```\n4. **Python Instantiation:**\n   ```python\n   from langchain_huggingface import HuggingFaceEndpoint\n   llm = HuggingFaceEndpoint(\n       repo_id="meta-llama/Llama-3.2-3B-Instruct",\n       temperature=0.3,\n       max_new_tokens=512\n   )\n   ```';
        sources = [{ title: 'Prerequisites & Installation Guide', excerpt: 'Hugging Face Hub API authentication and environment token setup.', page: 1 }];
      } else {
        botResponse = '### 🔍 Information Retrieval Result\n\nBased on the indexed **KL University AI/ML Training Documents**:\n\n- **RAG Core Pipeline:** The system ingests course PDFs, chunks them with a 500-character window, embeds segments with `all-MiniLM-L6-v2`, and retrieves top-k matches using cosine similarity in `ChromaDB`.\n- **Hugging Face Model Access:** Utilizes `HuggingFaceEndpoint` to connect directly to open-source LLMs like `meta-llama/Llama-3.2-3B-Instruct`.\n\n*For specific questions regarding Day 1, Day 2, or Day 3 schedules, feel free to use the suggested preset buttons above!*';
        sources = [{ title: 'KL University AI/ML RAG Overview', excerpt: 'General query resolution against official course materials.', page: 1 }];
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        sources: sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        
      };

      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
    }, 800);
  };

  

  const copyPythonCode = () => {
    const pythonCode = `import os
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from langchain_community.vectorstores import Chroma
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# 1. Set Hugging Face Access Token
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "hf_YOUR_HUGGING_FACE_TOKEN_HERE"

# 2. Ingest and Chunk Documents
loader = TextLoader("kl_university_aiml_syllabus.txt")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(docs)

# 3. Embedding Model & Vector Storage
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 4. Hugging Face LLM Endpoint
llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.2-3B-Instruct",
    temperature=0.3,
    max_new_tokens=512
)

# 5. Academic System Prompt & Retrieval Chain
system_prompt = (
    "You are an Academic Assistant for KL University AI/ML Training.\n"
    "Answer questions strictly using the context below:\n\n"
    "{context}"
)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

# 6. Execute Query
response = rag_chain.invoke({"input": "What topics are covered in Day 2 of the AI/ML Level-2 Syllabus?"})
print("Response:", response["answer"])
`;
    navigator.clipboard.writeText(pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredDocs = sampleDocs.filter(d => 
    d.title.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
    d.category.toLowerCase().includes(docSearchQuery.toLowerCase())
  );

  const renderSimpleText = (txt: string) => {
    const lines = txt.split('\n');
    let inCode = false;
    let codeLines: string[] = [];
    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (inCode) {
          elements.push(
            <pre key={`code-${idx}`} className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto my-2">
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
          codeLines = [];
          inCode = false;
        } else {
          inCode = true;
        }
        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={idx} className="text-base font-bold text-indigo-300 mt-2 mb-1">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<li key={idx} className="ml-4 list-disc text-slate-300 my-0.5">{line.replace('- ', '')}</li>);
      } else if (line.trim() === '') {
        elements.push(<div key={idx} className="h-1.5" />);
      } else {
        elements.push(<p key={idx} className="text-slate-200 leading-relaxed">{line}</p>);
      }
    });

    if (inCode && codeLines.length > 0) {
      elements.push(
        <pre key="code-end" className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto my-2">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    }

    return <div className="space-y-1">{elements}</div>;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12 pt-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Capstone Project Architecture
              </span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                LangChain + Hugging Face
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-indigo-400" /> RAG Document Q&A Assistant
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              An enterprise Retrieval-Augmented Generation (RAG) system trained on KL University AI/ML Level-2 Syllabus & Technical Manuals.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Bot className="w-4 h-4" /> Interactive Assistant
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'architecture' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" /> 9-Step Pipeline
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'code' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Code className="w-4 h-4" /> Python Code
            </button>
            <button
              onClick={() => setActiveTab('setup')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'setup' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Key className="w-4 h-4" /> Prerequisites & API Key
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE CHAT & SYSTEM PROMPT STUDIO */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Document Index & System Prompt Studio (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Indexed Knowledge Base & Upload */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" /> Indexed Knowledge Base
                  </h3>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
                    {sampleDocs.length} Docs Indexed
                  </span>
                </div>

                {/* Doc Filter Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={docSearchQuery}
                    onChange={(e) => setDocSearchQuery(e.target.value)}
                    placeholder="Search indexed syllabus docs..."
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* Doc List Scrollable */}
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                  {filteredDocs.map(doc => (
                    <div key={doc.id} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          <span className="truncate max-w-[170px]">{doc.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {doc.category} • {doc.chunksCount} Vector Chunks
                        </span>
                      </div>
                      <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                        {doc.type}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Custom File Upload Simulation */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/40">
                    <Upload className="w-5 h-5 text-indigo-400 mb-1" />
                    <span className="text-xs font-medium text-slate-300">Upload Custom PDF / TXT</span>
                    <span className="text-[10px] text-slate-500">Auto-chunk & index into ChromaDB</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          setUploadedFiles(prev => [...prev, { name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', type: file.type }]);
                        }
                      }}
                    />
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="text-[11px] bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 px-2 py-1 rounded flex items-center justify-between">
                          <span className="truncate max-w-[180px]">📄 {f.name}</span>
                          <span className="text-[9px] text-indigo-400">{f.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Chat Assistant Box (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-xl overflow-hidden min-h-[620px] max-h-[750px]">
              
              {/* Chat Top Banner */}
              <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">KL University RAG Chatbot</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                    Model: Llama-3.2-3B-Instruct
                  </span>
                </div>
                <button
                  onClick={() => setMessages([{
                    id: '1',
                    sender: 'bot',
                    text: '👋 Chat history reset. Ask any question about KL University AI/ML Level-2 training!',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }])}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
                </button>
              </div>

              {/* Scrollable Preset Questions Bar */}
              <div className="p-3 bg-slate-950/90 border-b border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Suggested Syllabus Questions
                  </span>
                  <span className="text-[10px] text-slate-500">Scrollable List ({presetQuestions.length})</span>
                </div>
                
                {/* Scrollable container for preset questions */}
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-indigo-900/50 scrollbar-track-slate-950">
                  {presetQuestions.map(pq => (
                    <button
                      key={pq.id}
                      onClick={() => handleSend(pq.question)}
                      className="w-full text-left p-2 rounded-lg bg-slate-900/90 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 text-xs transition-all group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          pq.category === 'Syllabus' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          pq.category === 'Architecture' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {pq.category}
                        </span>
                        <span className="text-slate-200 font-medium group-hover:text-indigo-300 truncate">
                          {pq.question}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-indigo-400" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 rounded-tr-none'
                        : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                    }`}>
                      {msg.sender === 'bot' ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                          {renderSimpleText(msg.text)}
                          
                          {/* Grounded Citation Sources */}
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <FileText className="w-3 h-3 text-cyan-400" /> Retrieved Citations ({msg.sources.length})
                              </span>
                              {msg.sources.map((s, idx) => (
                                <div key={idx} className="text-[11px] bg-slate-900/90 border border-slate-800 p-2 rounded-lg text-slate-300">
                                  <div className="font-semibold text-cyan-300">{s.title} {s.page && `(Page ${s.page})`}</div>
                                  <div className="text-[10px] text-slate-400 italic mt-0.5">"{s.excerpt}"</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>{msg.text}</div>
                      )}
                      <div className={`text-[10px] mt-1.5 text-right ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 font-bold text-xs text-indigo-300">
                        YOU
                      </div>
                    )}
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex gap-3 justify-start items-center">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                    </div>
                    <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      Retrieving vectors from ChromaDB & generating response...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask any question about KL University AI/ML syllabus or RAG architecture..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isProcessing}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <Send className="w-4 h-4" /> Send
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 9-STEP RAG ARCHITECTURE DIAGRAM */}
        {activeTab === 'architecture' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="border-b border-slate-800 pb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-indigo-400" /> End-to-End RAG Architecture (9-Step Pipeline)
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Visualizing how raw KL University documents transform into grounded, hallucination-free LLM answers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Document Ingestion', icon: FileText, desc: 'Loads raw PDF/TXT files (Syllabus, Handbooks, Guides) using LangChain PyPDFLoader / TextLoader.' },
                { step: '02', title: 'Recursive Chunking', icon: Code, desc: 'Splits text into 500-char segments with 50-char overlap using RecursiveCharacterTextSplitter.' },
                { step: '03', title: 'Vector Embeddings', icon: Cpu, desc: 'Converts text chunks into dense 384-dimensional vectors using sentence-transformers/all-MiniLM-L6-v2.' },
                { step: '04', title: 'Vector DB Indexing', icon: Database, desc: 'Stores vector representations and metadata in persistent ChromaDB collection for fast similarity search.' },
                { step: '05', title: 'Query Vectorization', icon: Search, desc: 'Transforms user query into a matching 384-d embedding vector using the exact same embedding model.' },
                { step: '06', title: 'Cosine Similarity Search', icon: Sparkles, desc: 'Retrieves Top-K (K=3) most relevant document chunks based on cosine distance matrix.' },
                { step: '07', title: 'Prompt Construction', icon: ShieldCheck, desc: 'Injects retrieved document excerpts into System Prompt with strict academic guardrails.' },
                { step: '08', title: 'Hugging Face Inference', icon: Zap, desc: 'Passes augmented prompt to open-source LLM (meta-llama/Llama-3.2-3B-Instruct) via HuggingFaceEndpoint.' },
                { step: '09', title: 'Citation Response', icon: CheckCircle2, desc: 'Renders response with exact document source titles, page numbers, and highlighted excerpts.' }
              ].map((st) => (
                <div key={st.step} className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl relative transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                      STEP {st.step}
                    </span>
                    <st.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PYTHON CODE WALKTHROUGH */}
        {activeTab === 'code' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                  <Code className="w-6 h-6 text-indigo-400" /> Complete RAG Python Script
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Production-ready script using LangChain, Hugging Face Hub, and ChromaDB.
                </p>
              </div>
              <button
                onClick={copyPythonCode}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 self-start sm:self-auto"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Copied Code!' : 'Copy Full Python Code'}
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
              <pre>{`import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from langchain_community.vectorstores import Chroma
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# -------------------------------------------------------------
# 1. Environment & API Token Setup
# -------------------------------------------------------------
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "hf_YOUR_HUGGING_FACE_TOKEN_HERE"

# -------------------------------------------------------------
# 2. Document Loading & Recursive Chunking
# -------------------------------------------------------------
loader = TextLoader("kl_university_aiml_syllabus.txt")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\\n\\n", "\\n", " ", ""]
)
chunks = text_splitter.split_documents(docs)

# -------------------------------------------------------------
# 3. Vector Embeddings & ChromaDB Storage
# -------------------------------------------------------------
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# -------------------------------------------------------------
# 4. Hugging Face LLM Endpoint Setup
# -------------------------------------------------------------
llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.2-3B-Instruct",
    temperature=0.3,
    max_new_tokens=512
)

# -------------------------------------------------------------
# 5. Strict Academic System Prompt
# -------------------------------------------------------------
system_prompt = (
    "You are an Academic Assistant for KL University AI/ML Training.\n"
    "Answer questions strictly using the context below:\n\n"
    "{context}"
)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

# -------------------------------------------------------------
# 6. Chain Execution & Question Answering
# -------------------------------------------------------------
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

response = rag_chain.invoke({"input": "What topics are covered in Day 2?"})
print("Response:", response["answer"])
`}</pre>
            </div>
          </div>
        )}

        {/* TAB 4: PREREQUISITES & HUGGING FACE SETUP GUIDE */}
        {activeTab === 'setup' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
            <div className="border-b border-slate-800 pb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <Key className="w-6 h-6 text-indigo-400" /> Prerequisites & Hugging Face Access Setup
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Follow this 4-step guide to configure your local Python environment and obtain a free Hugging Face API access token.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Step 1: Install Python Libraries */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono text-xs">STEP 1</span>
                  Install Required Packages
                </div>
                <p className="text-xs text-slate-400">
                  Run the following command in your terminal or command prompt to install standard RAG dependencies:
                </p>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-xs text-indigo-300">
                  pip install langchain langchain-huggingface chromadb sentence-transformers
                </div>
              </div>

              {/* Step 2: Hugging Face Account Token */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono text-xs">STEP 2</span>
                  Generate Hugging Face Token
                </div>
                <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Visit <a href="https://huggingface.co/join" target="_blank" rel="noreferrer" className="text-indigo-400 underline">huggingface.co/join</a> to register.</li>
                  <li>Go to <strong>Settings -&gt; Access Tokens</strong> in your profile.</li>
                  <li>Click <strong>Create New Token</strong> (Select role: <code className="text-indigo-300">Read</code>).</li>
                  <li>Copy your token starting with <code className="text-cyan-300">hf_...</code>.</li>
                </ol>
              </div>

              {/* Step 3: Configure Environment Variable */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono text-xs">STEP 3</span>
                  Set Environment Variable
                </div>
                <p className="text-xs text-slate-400">Windows PowerShell:</p>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-cyan-300">
                  $env:HUGGINGFACEHUB_API_TOKEN="hf_your_token_here"
                </div>
                <p className="text-xs text-slate-400">Linux / macOS Terminal:</p>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl font-mono text-[11px] text-cyan-300">
                  export HUGGINGFACEHUB_API_TOKEN="hf_your_token_here"
                </div>
              </div>

              {/* Step 4: Verify Python Connection */}
              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded font-mono text-xs">STEP 4</span>
                  Verify LLM Endpoint
                </div>
                <p className="text-xs text-slate-400">Quick Python connectivity check:</p>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-[11px] text-emerald-300">
                  from langchain_huggingface import HuggingFaceEndpoint<br />
                  llm = HuggingFaceEndpoint(repo_id="meta-llama/Llama-3.2-3B-Instruct")<br />
                  print(llm.invoke("Hello ML Student!"))
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
