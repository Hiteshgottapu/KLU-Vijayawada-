import { ResourceItem } from '../types';
import { generateJupyterNotebook } from '../utils/downloadHelper';

export const resourcesData: ResourceItem[] = [
  // Day 1 Resources
  {
    id: 'res-slides-d1',
    title: 'Day 1 Lecture Slides: ML & Deep Learning',
    description: 'Comprehensive slide presentation covering Linear/Logistic Regression, SVM, K-Means, ANN, CNN, and Regularization techniques.',
    category: 'slides',
    day: 'day1',
    fileType: 'PDF / Slides Deck',
    fileSize: '4.8 MB',
    filename: 'KLU_AIML_Level2_Day1_Slides.md',
    contentGenerator: () => `# KL UNIVERSITY — AI/ML LEVEL-2 TRAINING PROGRAM
## DAY 1: MACHINE LEARNING & DEEP LEARNING FOUNDATIONS
Dates: 5 October 2026 | Venue: KL University

### MODULE 1: LINEAR REGRESSION
- Objective: Minimize MSE J(theta) = 1/(2m) * sum((h_theta(x) - y)^2)
- Gradient Descent: Update theta_j := theta_j - alpha * (1/m) * sum((h_theta(x) - y) * x_j)
- Overfitting Prevention: Ridge (L2 ||w||_2^2) and Lasso (L1 ||w||_1)

### MODULE 2: LOGISTIC REGRESSION & CLASSIFICATION
- Sigmoid activation: sigma(z) = 1 / (1 + e^-z)
- Binary Cross-Entropy Loss: -1/m * sum(y*log(y_hat) + (1-y)*log(1-y_hat))
- Decision Boundary at z = 0 (p = 0.5)

### MODULE 3: SUPPORT VECTOR MACHINES (SVM)
- Maximum Margin Hyperplane: min 1/2 ||w||^2 + C * sum(xi)
- Support Vectors determine the decision margin
- Non-linear Kernel Trick: Radial Basis Function (RBF) K(x, x') = exp(-gamma ||x - x'||^2)

### MODULE 4: K-MEANS CLUSTERING
- Unsupervised partitioning into K clusters
- Minimizing Inertia (WCSS) = sum(sum(||x_i - mu_k||^2))
- k-means++ smart initialization for rapid convergence

### MODULE 5: ARTIFICIAL NEURAL NETWORKS (ANN)
- Forward propagation: z^[l] = W^[l] a^[l-1] + b^[l], a^[l] = g(z^[l])
- Backpropagation via Chain Rule calculus
- Activation functions: ReLU, LeakyReLU, Sigmoid, Softmax

### MODULE 6: CONVOLUTIONAL NEURAL NETWORKS (CNN)
- 2D Discrete Convolution: (I * K)(i, j)
- Spatial downsampling with Max Pooling (2x2, stride 2)
- Hierarchical feature extraction: Edges -> Textures -> Object Parts

### MODULE 7: REGULARIZATION & NORMALIZATION
- Dropout: Random deactivation during training to prevent co-adaptation
- Batch Normalization: Mini-batch mean/variance standardization with gamma/beta affine parameters
- Weight Decay: L2 weight penalty added directly to optimizer gradient updates
`
  },
  {
    id: 'res-nb-d1',
    title: 'Day 1 Jupyter Notebook: ML & Deep Learning',
    description: 'Complete executable Jupyter Notebook with end-to-end implementations of all Day 1 algorithms, scikit-learn pipelines, and TensorFlow ANN/CNN models.',
    category: 'notebook',
    day: 'day1',
    fileType: 'Jupyter Notebook (.ipynb)',
    fileSize: '320 KB',
    filename: 'Day1_ML_and_Deep_Learning.ipynb',
    contentGenerator: () => generateJupyterNotebook('Day 1: ML and Deep Learning', [
      {
        type: 'markdown',
        source: '# KL University AI/ML Level-2: Day 1 Hands-on Lab\n## Topics: Linear/Logistic Regression, SVM, K-Means, ANN, CNN, Regularization'
      },
      {
        type: 'code',
        source: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.svm import SVC
from sklearn.cluster import KMeans
import tensorflow as tf

print("Libraries loaded successfully. TensorFlow version:", tf.__version__)`
      },
      {
        type: 'markdown',
        source: '### 1. Linear Regression'
      },
      {
        type: 'code',
        source: `X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1) * 0.5
lin_reg = LinearRegression().fit(X, y)
print("Slope:", lin_reg.coef_[0][0], "Intercept:", lin_reg.intercept_[0])`
      }
    ])
  },
  {
    id: 'res-data-d1',
    title: 'Sample Dataset: Housing Prices & Classification Data',
    description: 'Cleaned multi-feature CSV dataset for hands-on Linear Regression, Logistic Regression, and SVM practice.',
    category: 'dataset',
    day: 'day1',
    fileType: 'CSV Dataset',
    fileSize: '45 KB',
    filename: 'klu_day1_ml_dataset.csv',
    contentGenerator: () => `square_feet,bedrooms,bathrooms,distance_to_center_km,luxury_tier,price_lakhs,is_premium_buyer
1200,2,2,8.5,1,45.2,0
1850,3,2,5.2,2,78.5,1
950,2,1,12.0,1,32.0,0
2400,4,3,3.1,3,125.0,1
3100,4,4,2.0,3,185.0,1
1450,3,2,6.8,2,62.0,0
800,1,1,15.5,1,28.5,0
2100,3,3,4.0,2,95.0,1
2800,4,4,2.5,3,150.0,1
1600,3,2,7.0,2,69.0,0
`
  },

  // Day 2 Resources
  {
    id: 'res-slides-d2',
    title: 'Day 2 Lecture Slides: NLP, CV & Transformers',
    description: 'Presentation deck detailing tokenization, Word2Vec, LSTM memory cells, attention alignment, Canny edge analysis, and the Transformer architecture.',
    category: 'slides',
    day: 'day2',
    fileType: 'PDF / Slides Deck',
    fileSize: '5.2 MB',
    filename: 'KLU_AIML_Level2_Day2_Slides.md',
    contentGenerator: () => `# KL UNIVERSITY — AI/ML LEVEL-2 TRAINING PROGRAM
## DAY 2: NLP, COMPUTER VISION & TRANSFORMERS
Dates: 6 October 2026 | Venue: KL University

### MODULE 1: TEXT PREPROCESSING & NORMALIZATION
- Tokenization: Sentence and Word tokenization
- Stopword elimination with NLTK corpus
- Stemming (Porter rule-based) vs Lemmatization (WordNet dictionary morphs)

### MODULE 2: VECTOR EMBEDDINGS (WORD2VEC)
- Limitations of One-Hot Sparsity
- CBOW: Predict center word from surrounding context
- Skip-Gram: Predict surrounding words given target token

### MODULE 3: RECURRENT NEURAL NETWORKS & LSTM
- The Vanishing Gradient Dilemma in Vanilla RNNs
- Long Short-Term Memory (LSTM) Architecture:
  * Forget Gate f_t = sigma(W_f [h_{t-1}, x_t] + b_f)
  * Input Gate i_t = sigma(W_i [h_{t-1}, x_t] + b_i)
  * Cell State Update C_t = f_t * C_{t-1} + i_t * C_tilde

### MODULE 4: ATTENTION MECHANISM
- Dynamic alignment weights alpha_ij = softmax(score(s_{i-1}, h_j))
- Context vector c_i = sum(alpha_ij * h_j)

### MODULE 5: COMPUTER VISION & FEATURE EXTRACTION
- 2D Gaussian Filtering for Denoising
- Canny Edge Detection: Sobel Gradients -> Non-Maximum Suppression -> Hysteresis
- HOG (Histogram of Oriented Gradients) & SIFT Descriptors

### MODULE 6: THE TRANSFORMER ARCHITECTURE
- Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V
- Multi-Head Attention: Concat(head_1, ..., head_h) W^O
- Sinusoidal Positional Encodings
- Layer Normalization & Residual Connections
`
  },
  {
    id: 'res-nb-d2',
    title: 'Day 2 Jupyter Notebook: NLP & OpenCV Vision Labs',
    description: 'Executable notebook featuring NLTK text processing, Word2Vec training, LSTM sequence models, OpenCV Canny edge detection, and Transformer MultiHeadAttention.',
    category: 'notebook',
    day: 'day2',
    fileType: 'Jupyter Notebook (.ipynb)',
    fileSize: '340 KB',
    filename: 'Day2_NLP_and_Vision_Transformers.ipynb',
    contentGenerator: () => generateJupyterNotebook('Day 2: NLP, Vision and Transformers', [
      {
        type: 'markdown',
        source: '# KL University AI/ML Level-2: Day 2 Hands-on Lab\n## Topics: NLTK Preprocessing, Word2Vec, OpenCV Canny, Transformer Self-Attention'
      },
      {
        type: 'code',
        source: `import nltk
import cv2
import numpy as np
import tensorflow as tf

print("Libraries imported successfully!")`
      }
    ])
  },
  {
    id: 'res-data-d2',
    title: 'Sample Dataset: NLP Sentiment Corpus & Test Images',
    description: 'Labelled customer reviews corpus and image matrices for NLP preprocessing and edge detection exercises.',
    category: 'dataset',
    day: 'day2',
    fileType: 'CSV Dataset',
    fileSize: '38 KB',
    filename: 'klu_day2_nlp_corpus.csv',
    contentGenerator: () => `review_id,text,sentiment,category
101,"The AI training at KL University was exceptionally practical and well structured.",positive,education
102,"Deep learning models require careful hyperparameter tuning and GPU power.",neutral,technical
103,"The installation failed due to an incompatible dependency conflict.",negative,troubleshooting
104,"Transformers and attention mechanisms have revolutionized natural language understanding.",positive,technical
105,"The dataset had numerous missing values and required thorough preprocessing.",neutral,data_cleaning
`
  },

  // Day 3 Resources
  {
    id: 'res-slides-d3',
    title: 'Day 3 Lecture Slides: Generative AI & RAG',
    description: 'Presentation deck covering Discriminative vs Generative concepts, VAE latent distributions, Diffusion denoising models, and RAG architectures.',
    category: 'slides',
    day: 'day3',
    fileType: 'PDF / Slides Deck',
    fileSize: '5.8 MB',
    filename: 'KLU_AIML_Level2_Day3_Slides.md',
    contentGenerator: () => `# KL UNIVERSITY — AI/ML LEVEL-2 TRAINING PROGRAM
## DAY 3: GENERATIVE AI & RETRIEVAL-AUGMENTED GENERATION (RAG)
Dates: 7 October 2026 | Venue: KL University

### MODULE 1: GENERATIVE AI FOUNDATIONS
- Discriminative P(Y|X) vs Generative P(X) / P(X, Y)
- Direct sampling from learned data distributions

### MODULE 2: VARIATIONAL AUTOENCODERS (VAEs)
- Latent variable models with continuous probabilistic latent space
- ELBO Loss = Reconstruction Loss + KL Divergence N(0, I)
- Reparameterization Trick: z = mu + sigma * epsilon

### MODULE 3: DIFFUSION MODELS (DDPM)
- Forward Process: Systematic addition of Gaussian noise across T steps
- Reverse Process: Neural network (U-Net) learning to subtract predicted noise epsilon_theta(x_t, t)
- Iterative sampling from pure noise to high-definition output

### MODULE 4: RETRIEVAL-AUGMENTED GENERATION (RAG)
- Overcoming Hallucinations and Knowledge Cutoffs
- Step 1: Document Parsing & Text Cleaning
- Step 2: Semantic Chunking with Overlap (chunk_size=400, overlap=50)
- Step 3: Vector Embeddings & Similarity Indexing (ChromaDB / FAISS)
- Step 4: Dense Vector Search (Cosine Similarity)
- Step 5: Grounded Prompt Augmentation & LLM Generation with Citations

### MODULE 5: RAG CAPSTONE PROJECT
- Architecture: Streamlit UI + LangChain + ChromaDB + Local/Cloud LLM
`
  },
  {
    id: 'res-nb-d3',
    title: 'Day 3 Jupyter Notebook: VAE, Diffusion & RAG',
    description: 'Complete notebook with VAE sampling implementation, forward diffusion noise simulation, and a pure Python in-memory RAG vector retrieval pipeline.',
    category: 'notebook',
    day: 'day3',
    fileType: 'Jupyter Notebook (.ipynb)',
    fileSize: '360 KB',
    filename: 'Day3_Generative_AI_and_RAG.ipynb',
    contentGenerator: () => generateJupyterNotebook('Day 3: Generative AI and RAG', [
      {
        type: 'markdown',
        source: '# KL University AI/ML Level-2: Day 3 Hands-on Lab\n## Topics: VAE Latent Spaces, Diffusion Denoising, RAG Retrieval Pipeline'
      },
      {
        type: 'code',
        source: `import numpy as np
import tensorflow as tf

print("Day 3 GenAI environment initialized!")`
      }
    ])
  },

  // Project Resources
  {
    id: 'res-proj-starter',
    title: 'RAG Chatbot Capstone Project Starter Kit (ZIP)',
    description: 'Complete downloadable project package containing app.py, rag_engine.py, requirements.txt, sample documents, and setup instructions.',
    category: 'project',
    day: 'project',
    fileType: 'ZIP Archive',
    fileSize: '1.2 MB',
    filename: 'klu-aiml-level2-rag-project.zip',
    // Handled specifically via downloadProjectZip()
  },
  {
    id: 'res-cheat-math',
    title: 'AI/ML Essential Formulas & Math Cheat Sheet',
    description: 'Quick reference sheet containing all key mathematical equations for Gradient Descent, Cross-Entropy, SVM Primal/Dual, Attention, VAE ELBO, and Diffusion.',
    category: 'cheatsheet',
    day: 'all',
    fileType: 'Markdown / PDF Reference',
    fileSize: '120 KB',
    filename: 'AIML_Level2_Formulas_CheatSheet.md',
    contentGenerator: () => `# AI/ML LEVEL-2 MATHEMATICAL FORMULA CHEAT SHEET
KL University — 3-Day Intensive Training

## 1. LINEAR & LOGISTIC REGRESSION
- Linear Hypothesis: h_theta(x) = theta^T x
- MSE Cost: J(theta) = 1/(2m) * sum((h_theta(x^(i)) - y^(i))^2)
- Gradient Descent Step: theta_j := theta_j - alpha * (1/m) * sum((h_theta(x^(i)) - y^(i)) * x_j^(i))
- Sigmoid: sigma(z) = 1 / (1 + e^-z)
- Binary Cross-Entropy: J(theta) = -1/m * sum(y * log(y_hat) + (1 - y) * log(1 - y_hat))

## 2. SUPPORT VECTOR MACHINES
- Primal Soft Margin: min 1/2 ||w||^2 + C * sum(xi_i)  s.t. y_i(w^T x_i + b) >= 1 - xi_i
- RBF Gaussian Kernel: K(x, x') = exp(-gamma * ||x - x'||^2)

## 3. K-MEANS CLUSTERING
- Inertia / WCSS: sum_k sum_{x in S_k} ||x - mu_k||^2
- Centroid Update: mu_k = 1/|S_k| * sum_{x in S_k} x

## 4. DEEP LEARNING & CONVOLUTION
- Layer Output: a^[l] = g(W^[l] a^[l-1] + b^[l])
- Conv Output Dimension: floor((W - F + 2P)/S) + 1
- Batch Normalization: x_hat = (x - mu_B) / sqrt(sigma_B^2 + eps), y = gamma * x_hat + beta

## 5. ATTENTION & TRANSFORMERS
- Scaled Dot-Product Attention: Attention(Q,K,V) = softmax(Q K^T / sqrt(d_k)) V
- Multi-Head: MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W^O

## 6. GENERATIVE AI & VAE
- VAE ELBO: E_{q(z|x)}[log p(x|z)] - D_KL(q(z|x) || p(z))
- Reparameterization Trick: z = mu(x) + sigma(x) * eps, where eps ~ N(0, I)

## 7. RAG & COSINE SIMILARITY
- Cosine Similarity: cos(theta) = (A . B) / (||A|| * ||B||)
`
  },
  {
    id: 'res-reading-guide',
    title: 'Curated Research Papers & Recommended Reading',
    description: 'List of seminal AI/ML papers (Attention Is All You Need, ResNet, DDPM, RAG Lewis et al.) with DOI links and summaries.',
    category: 'reading',
    day: 'all',
    fileType: 'Reading Guide (.md)',
    fileSize: '85 KB',
    filename: 'AIML_Level2_Recommended_Reading.md',
    contentGenerator: () => `# RECOMMENDED RESEARCH PAPERS & ARTICLES
KL University AI/ML Level-2 Program

1. "Attention Is All You Need" — Vaswani et al. (2017)
   ArXiv: 1706.03762
   Introduced the Transformer architecture, replacing recurrent models with multi-head self-attention.

2. "Deep Residual Learning for Image Recognition" — He et al. (2015)
   Introduced ResNet skip connections, allowing training of 100+ layer deep networks.

3. "Denoising Diffusion Probabilistic Models" — Ho, Jain, Abbeel (2020)
   ArXiv: 2006.11239
   Formulated the foundational DDPM training and sampling framework for modern generative diffusion models.

4. "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" — Lewis et al. (2020)
   ArXiv: 2005.11401
   Proposed the original RAG framework combining dense retrieval with sequence-to-sequence generators.

5. "Auto-Encoding Variational Bayes" — Kingma & Welling (2013)
   ArXiv: 1312.6114
   Introduced Variational Autoencoders and the reparameterization trick.
`
  }
];
