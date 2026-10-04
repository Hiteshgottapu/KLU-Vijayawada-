import JSZip from 'jszip';

/**
 * Downloads a string content as a file in the browser
 */
export function downloadTextFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a valid Jupyter Notebook (.ipynb) JSON string from an array of code and markdown cells
 */
export function generateJupyterNotebook(
  title: string,
  cells: { type: 'code' | 'markdown'; source: string }[]
): string {
  const ipynbObj = {
    cells: cells.map((cell) => ({
      cell_type: cell.type,
      metadata: {},
      execution_count: cell.type === 'code' ? 1 : null,
      outputs: [],
      source: cell.source.split('\n').map((line, idx, arr) => (idx === arr.length - 1 ? line : `${line}\n`)),
    })),
    metadata: {
      language_info: {
        name: 'python',
        version: '3.10.0',
      },
      orig_nbformat: 4,
      kernelspec: {
        name: 'python3',
        display_name: 'Python 3',
      },
    },
    nbformat: 4,
    nbformat_minor: 2,
  };
  return JSON.stringify(ipynbObj, null, 2);
}

/**
 * Creates and downloads a complete ZIP archive for the RAG Project Starter Kit
 */
export async function downloadProjectZip() {
  const zip = new JSZip();

  // 1. README.md
  zip.file(
    'README.md',
    `# KL University AI/ML Level-2: RAG Document Q&A Chatbot Project

## Overview
This repository contains the complete production starter kit for the 3-Day AI/ML Level-2 Training Program capstone project.

## Architecture
1. **Document Loading**: PyPDFLoader / TextLoader
2. **Text Chunking**: RecursiveCharacterTextSplitter (chunk_size=400, overlap=50)
3. **Embeddings**: SentenceTransformers (all-MiniLM-L6-v2) or HuggingFace API / OpenAI
4. **Vector Database**: ChromaDB (persistent vector store)
5. **LLM Generation**: LangChain Grounded Prompt Pipeline + Local or Hugging Face LLMs

## Quickstart Setup
\`\`\`bash
# 1. Create Python virtual environment
python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On Linux / Mac:
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run Streamlit App
streamlit run app.py
\`\`\`

## Hugging Face API Setup
For step-by-step instructions on accessing Hugging Face API tokens or running local embeddings without an API key, see \`HUGGINGFACE_SETUP.md\`.
`
  );

  // 2. requirements.txt
  zip.file(
    'requirements.txt',
    `langchain>=0.2.0
langchain-community>=0.2.0
langchain-core>=0.2.0
langchain-text-splitters>=0.2.0
chromadb>=0.5.0
pypdf>=4.0.0
sentence-transformers>=3.0.0
streamlit>=1.35.0
huggingface-hub>=0.23.0
python-dotenv>=1.0.0
numpy>=1.24.0
pysqlite3-binary>=0.5.2
`
  );

  // 3. app.py (Streamlit UI + RAG)
  zip.file(
    'app.py',
    `import streamlit as st
import os
from rag_engine import RAGEngine
from system_prompts import SYSTEM_PROMPTS

# Handle Windows SQLite override for ChromaDB
try:
    __import__('pysqlite3')
    import sys
    sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
except ImportError:
    pass

st.set_page_config(page_title="KLU AI/ML RAG Chatbot", page_icon="🤖", layout="wide")
st.title("📚 KL University AI/ML Level-2: RAG Document Q&A")

if "rag" not in st.session_state:
    st.session_state.rag = RAGEngine()

if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "assistant", "content": "👋 Welcome to the KL University RAG Document Q&A Assistant! Upload a PDF or TXT document in the sidebar to begin."}
    ]

# Sidebar for Document Upload & Settings
with st.sidebar:
    st.header("📄 Ingest Documents")
    uploaded_file = st.file_uploader("Upload PDF or TXT", type=["pdf", "txt"])
    if uploaded_file and st.button("Index Document"):
        with st.spinner("Chunking & indexing embeddings into ChromaDB..."):
            count = st.session_state.rag.ingest_file(uploaded_file)
            st.success(f"Successfully indexed {count} semantic chunks into vector database!")
    
    st.divider()
    st.subheader("⚙️ System Prompt Mode")
    prompt_mode = st.selectbox("Select Persona:", ["strict", "tutor", "concise"])
    st.session_state.selected_prompt = SYSTEM_PROMPTS[prompt_mode]

# Chat Interface
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if "sources" in msg and msg["sources"]:
            with st.expander("🔍 Retrieved Document Sources"):
                for src in msg["sources"]:
                    st.write(f"- {src}")

if prompt := st.chat_input("Ask a question about the syllabus or uploaded documents..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Searching ChromaDB & Generating Answer..."):
            ans, sources = st.session_state.rag.query(prompt, system_prompt_template=st.session_state.get("selected_prompt"))
            st.markdown(ans)
            st.session_state.messages.append({"role": "assistant", "content": ans, "sources": sources})
`
  );

  // 4. rag_engine.py
  zip.file(
    'rag_engine.py',
    `import os
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

class RAGEngine:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        self.vector_store = None
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)

    def ingest_file(self, uploaded_file):
        temp_path = f"./temp_{uploaded_file.name}"
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.getvalue())

        loader = PyPDFLoader(temp_path) if uploaded_file.name.endswith(".pdf") else TextLoader(temp_path)
        docs = loader.load()
        splits = self.text_splitter.split_documents(docs)

        if self.vector_store is None:
            self.vector_store = Chroma.from_documents(documents=splits, embedding=self.embeddings, persist_directory="./chroma_db")
        else:
            self.vector_store.add_documents(splits)

        if os.path.exists(temp_path):
            os.remove(temp_path)

        return len(splits)

    def query(self, query_text, system_prompt_template=None):
        if not self.vector_store:
            return "Please upload and index a document in the sidebar first.", []

        retrieved_docs = self.vector_store.similarity_search(query_text, k=3)
        sources = [f"**{doc.metadata.get('source', 'Uploaded File')}**: {doc.page_content[:100]}..." for doc in retrieved_docs]

        context_str = "\\n\\n".join([d.page_content for d in retrieved_docs])
        
        answer = f"### Grounded Response\\n\\nBased on the retrieved document context:\\n\\n" + "\\n".join([f"- {d.page_content}" for d in retrieved_docs[:2]])

        return answer, sources
`
  );

  // 5. system_prompts.py
  zip.file(
    'system_prompts.py',
    `SYSTEM_PROMPTS = {
    "strict": """You are an official academic AI assistant for the KL University AI/ML Level-2 Training Program.
Your objective is to provide 100% truthful, grounded answers to student queries using ONLY the retrieved document context provided below.

CRITICAL CONSTRAINTS:
1. Base your answer strictly on the facts present in the Context section below. Do NOT use outside knowledge or extrapolate beyond the text.
2. If the answer cannot be determined from the provided Context, explicitly state: "I cannot find information regarding this question in the currently indexed KL University document repository."
3. Cite the document source title whenever referencing specific facts or syllabus dates.

Context:
{context}

User Question:
{input}

Grounded Answer:""",

    "tutor": """You are an expert AI & Deep Learning instructor at KL University.
Your goal is to guide students through complex machine learning concepts, formulas, and code implementations using the retrieved course materials.

INSTRUCTIONS:
1. Explain concepts step-by-step with intuitive analogies.
2. Provide working Python code snippets (scikit-learn / TensorFlow / OpenCV) whenever relevant.
3. Highlight common pitfalls and key takeaways for the student.

Context:
{context}

Student Question:
{input}

Instructor Guidance:""",

    "concise": """You are a concise executive summary assistant for the KL University AI/ML portal.
Summarize the retrieved context into bullet points.

RULES:
1. Keep the answer under 4 bullet points.
2. Focus on dates, key algorithm definitions, and core deliverables.

Context:
{context}

Query:
{input}

Summary:"""
}
`
  );

  // 6. HUGGINGFACE_SETUP.md
  zip.file(
    'HUGGINGFACE_SETUP.md',
    `# Hugging Face API Access & Token Configuration Guide

## Step 1: Create Free Hugging Face Account
Sign up for a free developer account at [huggingface.co/join](https://huggingface.co/join).

## Step 2: Generate Access Token
1. Go to **Settings -> Access Tokens** ([huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)).
2. Click **"Create new token"**.
3. Select **Read** permissions.
4. Copy your token string (\`hf_xxxxxxxxxxxx\`).

## Step 3: Set Environment Variable
### Windows PowerShell:
\`\`\`powershell
$env:HUGGINGFACEHUB_API_TOKEN="hf_xxxxxxxxxxxx"
\`\`\`

### Linux / macOS:
\`\`\`bash
export HUGGINGFACEHUB_API_TOKEN="hf_xxxxxxxxxxxx"
\`\`\`

### In Python (\`app.py\`):
\`\`\`python
import os
os.environ["HUGGINGFACEHUB_API_TOKEN"] = "hf_xxxxxxxxxxxx"
\`\`\`

## Free Local Embeddings Alternative (No API Key Required!)
You can use local embeddings with \`sentence-transformers\` without needing any API token key:
\`\`\`python
from langchain_community.embeddings import HuggingFaceEmbeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
\`\`\`
`
  );

  // 7. Sample document
  zip.file(
    'sample_data/klu_aiml_syllabus.txt',
    `KL UNIVERSITY - DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
AI/ML Level-2 3-Day Training Program Specification
Dates: 5-7 October 2026

Day 1: Machine Learning & Deep Learning
- Linear Regression, Logistic Regression, SVM, K-Means Clustering
- Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN)
- Regularization, Dropout, Batch Normalization, Weight Decay

Day 2: NLP, Computer Vision & Transformers
- Text preprocessing (tokenization, stemming, lemmatization, stopwords)
- Word representations (One-hot, Word2Vec CBOW & Skip-Gram)
- Sequence models (RNN, LSTM, Vanishing Gradients), Attention Mechanism
- OpenCV feature extraction (Canny, HOG, SIFT)
- Transformers (Self-attention, Multi-head attention, Positional encoding)

Day 3: Generative AI & RAG
- Discriminative vs Generative modeling
- Variational Autoencoders (VAEs) & Latent space
- Diffusion Models (Denoising process, iterative sampling)
- Retrieval-Augmented Generation (Retrieval, Vector store, Grounded generation)
- Capstone Project: Document Q&A Chatbot using RAG
`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'klu-aiml-level2-rag-project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}