# 🎓 KL University AI/ML Level-2 Training Portal

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math%20Engine-329894?logo=latex&logoColor=white)](https://katex.org/)
[![Status](https://img.shields.io/badge/Deployment-Production%20Ready-success)](#)

> **Official Interactive Learning & Lab Portal** for the **KL University 3-Day Intensive AI/ML Level-2 Training Program**  
> 🗓️ **Dates:** 5 - 7 October 2026 | 📍 **Venue:** KL University, Vaddeswaram, Andhra Pradesh | ⏱️ **Duration:** 18 Hours of Lectures & Hands-on Labs

---

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [Curriculum Breakdown](#-3-day-curriculum-breakdown)
  - [Day 1: Classical Machine Learning & Neural Foundations](#day-1-classical-machine-learning--neural-foundations)
  - [Day 2: Advanced Deep Learning, NLP & Computer Vision](#day-2-advanced-deep-learning-nlp--computer-vision)
  - [Day 3: Generative AI, Large Language Models & Capstone Project](#day-3-generative-ai-large-language-models--capstone-project)
- [Key Interactive Features](#-key-interactive-features)
  - [1. In-Browser Python Code Runner (12 Interactive Labs)](#1-in-browser-python-code-runner-12-interactive-labs)
  - [2. Publication-Quality Mathematical Formulations (KaTeX)](#2-publication-quality-mathematical-formulations-katex)
  - [3. Capstone RAG Document Q&A Assistant](#3-capstone-rag-document-qa-assistant)
  - [4. Interactive Educational Visualizers](#4-interactive-educational-visualizers)
  - [5. One-Click Course Materials Library](#5-one-click-course-materials-library)
- [System Architecture](#-system-architecture)
- [Repository Structure](#-repository-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [Building & Deployment](#-building--deployment)
- [Academic Integrity & Credits](#-academic-integrity--credits)

---

## 🚀 Executive Overview

The **KL University AI/ML Level-2 Portal** is a production-grade educational platform engineered specifically for engineering students, faculty, and industry researchers. It bridges the gap between pure mathematical theory and hands-on production engineering using:

- **Direct High-Level Industry Frameworks**: Utilizes **Scikit-Learn**, **TensorFlow / Keras**, **OpenCV**, **NLTK / Hugging Face Transformers**, and **LangChain + ChromaDB** rather than raw low-level math implementations.
- **Unified Design System**: A sleek, dark-mode **Deep Indigo & Slate** aesthetic designed for clarity, focus, and visual consistency across all interactive components.
- **Zero-Friction Student Sandbox**: Instant execution of lab exercises, code resets, one-click Colab export, and real-time terminal outputs directly within the browser without requiring local environment setup.

---

## 📅 3-Day Curriculum Breakdown

### Day 1: Classical Machine Learning & Neural Foundations
*Focus: Supervised/Unsupervised Algorithms, Regularization, Loss Formulations & Neural Foundations*

- **Forenoon Session (09:00 AM – 12:30 PM) — Classical Machine Learning:**
  - **Topic 01: Linear Regression** — Ordinary Least Squares (OLS), Gradient Descent updates, Mean Squared Error (MSE), R-squared evaluation metrics.
  - **Topic 02: Logistic Regression** — Sigmoid activation, Log-Loss / Binary Cross-Entropy, Decision Boundaries, Confusion Matrix analysis.
  - **Topic 03: Support Vector Machines (SVM)** — Hyperplane optimization, Margin maximization, Slack variables, RBF and Polynomial Kernels.
  - **Topic 04: K-Means Clustering** — Centroid initialization, Inertia/Within-Cluster Sum of Squares (WCSS), Elbow Method, Silhouette Analysis.
- **Afternoon Session (01:30 PM – 05:00 PM) — Neural Foundations & Optimization:**
  - **Topic 05: Artificial Neural Networks (ANN)** — Forward propagation, Matrix activations (ReLU, Softmax), Backpropagation with Chain Rule, Categorical Cross-Entropy.
  - **Topic 06: Convolutional Neural Networks (CNN)** — 2D Convolution kernels, Feature Maps, Stride, Padding, MaxPooling, and Dense classification heads.
  - **Topic 07: Regularization & Optimization** — Batch Normalization, Dropout layers, L1/L2 Weight Decay, and Adam optimizer dynamics.
- **Hands-on Lab**: Building and training an end-to-end MNIST handwritten digit classifier using TensorFlow/Keras with Dropout and Batch Normalization.

---

### Day 2: Advanced Deep Learning, NLP & Computer Vision
*Focus: Tokenization, Embeddings, Edge Detection, Attention Mechanisms & Transformer Architecture*

- **Forenoon Session (09:00 AM – 12:30 PM) — Natural Language Processing & Vision:**
  - **Topic 08: Text Preprocessing & Tokenization** — Regex tokenizers, Stopword stripping, Lemmatization, and Vocabulary indexing.
  - **Topic 09: Word Representations & Embeddings** — TF-IDF vectorization, Word2Vec (Skip-Gram & CBOW), and Semantic Cosine Similarity.
  - **Topic 10: Vision Feature Extraction** — Spatial 2D convolution filters, Sobel kernel gradient operators, Canny Edge Detection, and Morphological operations.
- **Afternoon Session (01:30 PM – 05:00 PM) — Sequence Modeling & Transformers:**
  - **Topic 11: Sequential Models (RNN & LSTM)** — Vanishing gradients, Recurrent hidden states, LSTM Forget/Input/Output gates, Cell State updates.
  - **Topic 12: Attention Mechanism** — Scaled Dot-Product Attention: Attention(Q, K, V) = softmax((QK^T) / sqrt(d_k)) * V.
  - **Topic 13: The Transformer Architecture** — Multi-Head Self-Attention, Sinusoidal Positional Encoding, Layer Normalization, Residual Connections, and Encoder-Decoder pipelines.
- **Hands-on Lab**: Sentiment classification on customer reviews using fine-tuned DistilBERT / Hugging Face Transformers.

---

### Day 3: Generative AI, Large Language Models & Capstone Project
*Focus: Generative Architectures, Latent Spaces, Diffusion, and Production RAG System*

- **Forenoon Session (09:00 AM – 12:30 PM) — Generative Deep Learning:**
  - **Topic 14: Variational Autoencoders (VAEs)** — Encoder-Decoder networks, Latent parameterization (mu, sigma), Reparameterization Trick, and Evidence Lower Bound (ELBO) Loss.
  - **Topic 15: Diffusion Models** — Forward Markov noise corruption, Reverse Denoising U-Net, Score matching, and classifier-free guidance.
  - **Topic 16: Retrieval-Augmented Generation (RAG)** — Hallucination mitigation, Non-parametric memory injection, and Dense vector search.
- **Afternoon Session (01:30 PM – 05:00 PM) — Production Capstone Project:**
  - **Topic 17: Production RAG Capstone**: Engineering an interactive Document Q&A Assistant using LangChain, ChromaDB, and Hugging Face inference.

---

## ⚡ Key Interactive Features

### 1. In-Browser Python Code Runner (12 Interactive Labs)
Located on the `/notebooks` page, students have access to a clean sandbox code runner with:
- **Instant Search & Filter**: Real-time filtering by algorithm, library, or topic tag across all 12 modules.
- **Interactive Code Editor**: Syntax-highlighted Python editor with line numbers, copy to clipboard, and reset options.
- **Simulated Terminal Output**: Instant execution of Scikit-Learn models, confusion matrices, CNN training logs, and RAG retrieval pipelines.
- **Direct Colab & Python Download**: One-click export to Google Colab for GPU acceleration or local .py script download.

### 2. Publication-Quality Mathematical Formulations (KaTeX)
Every topic accordion contains a dedicated Math & Formulas tab powered by the KaTeX math engine:
- Full TeX equation rendering for loss functions, backprop gradients, matrix attention, and Bayesian formulations.
- **Interactive Raw LaTeX / Rendered Toggle**: Allows students to inspect and copy raw TeX source code for university assignments and reports.
- Comprehensive variable definition tables detailing each mathematical symbol and parameter.

### 3. Capstone RAG Document Q&A Assistant
Located on the `/project` page, an end-to-end simulation of a production RAG system:
- **Vector Document Indexing**: Pre-indexed with the Official KL University AI/ML Syllabus and RAG Architecture Guide.
- **Interactive Document Uploader**: Allows students to drag and drop custom text or PDF files into the local vector store.
- **Grounded Citations**: Responses feature highlighted source document titles, excerpt snippets, and page numbers.
- **Architecture Tabs**: Visual 9-Step Pipeline diagram, full LangChain Python script, and Hugging Face API key setup guide.

### 4. Interactive Educational Visualizers
Embedded across daily hubs for intuitive conceptual understanding:
- **Attention Matrix Demo**: Real-time interactive visualization of query-key attention heatmaps between words in a sequence.
- **Diffusion Slider Demo**: Step-by-step slider showing noise addition and reverse denoising reconstruction.
- **Edge Detection Demo**: Interactive Sobel and Canny convolution filters applied to visual feature maps.
- **Tokenization Sandbox**: Live text tokenization breaking sentences into subword tokens and ID mappings.

### 5. One-Click Course Materials Library
Located on the `/resources` page:
- Centralized downloads for lecture slides (Markdown/PDF), Jupyter Notebooks (.ipynb), synthetic CSV datasets, and formula cheatsheets.
- **Complete Project Bundle (.ZIP)**: Downloads the entire RAG Capstone starter project package including app.py, rag_pipeline.py, sample documents, and requirements.txt.
- **Live Download Feedback**: Button feedback showing download preparation and floating toast confirmations.

---

## 🏗️ System Architecture

```
                  ┌──────────────────────────────────────────────┐
                  │       KL University Portal (React 19)        │
                  │   Tailwind CSS v4 + KaTeX + Lucide Icons     │
                  └──────────────────────┬───────────────────────┘
                                         │
        ┌────────────────────────────────┼───────────────────────────────┐
        ▼                                ▼                               ▼
┌───────────────┐               ┌────────────────┐              ┌────────────────┐
│ Curriculum    │               │  Interactive   │              │  Client-Side   │
│ Day Hubs      │               │  Notebooks     │              │  RAG Engine    │
│ (Days 1, 2, 3)│               │  Code Runner   │              │  (Vector Q&A)  │
└───────┬───────┘               └────────┬───────┘              └────────┬───────┘
        │                                │                               │
        ├─ Overview & Intuition          ├─ 12 Topic Notebooks           ├─ Indexed Docs
        ├─ KaTeX LaTeX Formulas          ├─ Scikit-Learn / Keras         ├─ ChromaDB Sim
        ├─ Runnable Python Code          ├─ Simulated Sandbox Exec       ├─ Cosine Sim
        ├─ Pitfalls & Solutions          ├─ One-Click Colab Export       ├─ Source Citations
        └─ Hands-on Practice             └─ .py Script Download          └─ Custom Upload
```

---

## 📁 Repository Structure

```plaintext
KLU-Vijayavada/
├── public/                     # Static assets, SVG icons, and logos
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.svg
├── src/
│   ├── assets/                 # Brand images and illustration assets
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Breadcrumbs.tsx # Breadcrumb navigation trail
│   │   │   ├── CodeBlock.tsx   # Syntax-highlighted code block with Run button
│   │   │   ├── DayCard.tsx     # Curriculum summary card (Forenoon/Afternoon)
│   │   │   ├── Footer.tsx      # Global footer with university credits
│   │   │   ├── MathRenderer.tsx# KaTeX formula engine with TeX toggle
│   │   │   ├── Navbar.tsx      # Responsive header navigation
│   │   │   ├── QuizComponent.tsx# Self-assessment module
│   │   │   ├── ScrollToTop.tsx # Smooth back-to-top floating action
│   │   │   └── TopicAccordion.tsx# 5-Tab deep-dive module component
│   │   └── interactive/        # Interactive visual demos
│   │       ├── AttentionMatrixDemo.tsx # Scaled Dot-Product attention visualizer
│   │       ├── DiffusionSliderDemo.tsx # Generative reverse diffusion demo
│   │       ├── EdgeDetectionDemo.tsx   # Computer vision Sobel/Canny demo
│   │       ├── NeuralHeroCanvas.tsx    # Interactive particle neural canvas
│   │       ├── RagWorkflowDemo.tsx     # 9-Step RAG pipeline visualizer
│   │       └── TokenizationDemo.tsx    # NLTK/BPE subword tokenizer demo
│   ├── data/                   # Structured curriculum & course database
│   │   ├── curriculumData.ts   # Complete 14-topic syllabus, math, code & pitfalls
│   │   ├── notebooksData.ts    # 12 runnable lab notebooks & simulated outputs
│   │   ├── resourcesData.ts    # Downloadable course resources registry
│   │   └── sampleDocsData.ts   # Indexed syllabus documents for RAG chatbot
│   ├── pages/                  # Top-level dynamic routed pages
│   │   ├── AboutPage.tsx       # Workshop objectives & mentors overview
│   │   ├── Day1Page.tsx        # Day 1: Classical ML & Neural Foundations
│   │   ├── Day2Page.tsx        # Day 2: Deep Learning, NLP & Computer Vision
│   │   ├── Day3Page.tsx        # Day 3: Generative AI, LLMs & Capstone Project
│   │   ├── HomePage.tsx        # Landing portal with curriculum roadmap
│   │   ├── NotebooksPage.tsx   # In-browser Python sandbox & catalog
│   │   ├── NotFoundPage.tsx    # 404 handler
│   │   ├── ProjectPage.tsx     # Capstone RAG Document Assistant & Guide
│   │   ├── ResourcesPage.tsx   # Centralized materials download library
│   │   └── SchedulePage.tsx    # 3-Day timetable & quick focus hubs
│   ├── types/                  # TypeScript interface contracts
│   ├── utils/                  # Helper utilities
│   │   ├── downloadHelper.ts   # File generator & JSZip project archiver
│   │   └── ragEngine.ts        # Client-side RAG vector similarity engine
│   ├── App.tsx                 # Root application & state router
│   ├── index.css               # Global Tailwind CSS directives & animations
│   └── main.tsx                # React 19 entrypoint with KaTeX styles
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Getting Started & Installation

### Prerequisites
- **Node.js**: Version `20.19+` or `22.12+` (v22.9+ supported)
- **Package Manager**: `npm` (v10+ or v11+)

### 1. Clone the Repository
```bash
git clone https://github.com/Hiteshgottapu/KLU-Vijayawada-.git
cd KLU-Vijayawada-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📦 Building & Deployment

### Production Build
To create a production-optimized static bundle:
```bash
npm run build
```
This runs TypeScript type-checking (`tsc -b`) followed by Vite's production bundler. The compiled static output will be located in the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```

### Deployment Platforms
The output in `dist/` is 100% static and can be deployed directly to:
- **Vercel** (`vercel --prod`)
- **Netlify** (`netlify deploy --prod --dir=dist`)
- **GitHub Pages** (using the `gh-pages` branch or GitHub Actions)

---

## 📜 Academic Integrity & Credits

- **Host Institution**: **Koneru Lakshmaiah Education Foundation (KL University)**, Vaddeswaram, Guntur, AP, India.
- **Department**: Department of Artificial Intelligence & Data Science (AI&DS).
- **Curriculum Design**: Tailored for the **AI/ML Level-2 Skill Enhancement Initiative**.
- **Libraries & Tooling**: Built with React 19, Vite, Tailwind CSS, KaTeX, Lucide Icons, Canvas Confetti, and JSZip.

---

*Designed and engineered for KL University students to master advanced Machine Learning, Deep Learning, and Generative AI.*
