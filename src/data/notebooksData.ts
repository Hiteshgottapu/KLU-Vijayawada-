import { NotebookItem } from '../types';

export const notebooksData: NotebookItem[] = [
  // Day 1 Notebooks
  {
    id: 'nb-d1-linreg',
    title: '01. Linear Regression (Scikit-Learn)',
    day: 1,
    category: 'Machine Learning',
    description: 'Train a direct LinearRegression model using Scikit-Learn with train_test_split, R2 evaluation, and coefficient extraction.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# 1. Generate sample training dataset
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1) * 0.5

# 2. Split into Train & Test partitions
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Direct Scikit-Learn Model Initialization & Training
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Model Inference & Evaluation
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("=== Scikit-Learn Linear Regression ===")
print(f"Fitted Slope (w): {model.coef_[0][0]:.4f} (True: 3.0000)")
print(f"Fitted Intercept (b): {model.intercept_[0]:.4f} (True: 4.0000)")
print(f"Test Mean Squared Error (MSE): {mse:.4f}")
print(f"Coefficient of Determination (R2 Score): {r2:.4f}")

# Predict on new sample
new_sample = np.array([[3.5]])
prediction = model.predict(new_sample)
print(f"Prediction for X = 3.5: y = {prediction[0][0]:.4f}")`,
    simulatedOutput: `=== Scikit-Learn Linear Regression ===
Fitted Slope (w): 2.9431 (True: 3.0000)
Fitted Intercept (b): 4.1205 (True: 4.0000)
Test Mean Squared Error (MSE): 0.2418
Coefficient of Determination (R2 Score): 0.9234
Prediction for X = 3.5: y = 14.4214`
  },

  {
    id: 'nb-d1-logreg',
    title: '02. Logistic Regression (Scikit-Learn)',
    day: 1,
    category: 'Machine Learning',
    description: 'Direct binary classification using Scikit-Learn LogisticRegression with probability calibration and classification reports.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.datasets import make_classification

# 1. Generate 2-class classification dataset
X, y = make_classification(n_samples=200, n_features=2, n_informative=2, 
                           n_redundant=0, n_clusters_per_class=1, random_state=42)

# 2. Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 3. Direct Scikit-Learn Logistic Regression Classifier
clf = LogisticRegression(solver='lbfgs', random_state=42)
clf.fit(X_train, y_train)

# 4. Predict Class Probabilities & Labels
y_probs = clf.predict_proba(X_test)[:, 1]
y_pred = clf.predict(X_test)

print("=== Scikit-Learn Logistic Regression Classifier ===")
print(f"Test Accuracy: {accuracy_score(y_test, y_pred) * 100:.1f}%")
print("\\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=["Class 0", "Class 1"]))`,
    simulatedOutput: `=== Scikit-Learn Logistic Regression Classifier ===
Test Accuracy: 96.0%

Confusion Matrix:
[[25  1]
 [ 1 23]]

Classification Report:
              precision    recall  f1-score   support

     Class 0       0.96      0.96      0.96        26
     Class 1       0.96      0.96      0.96        24

    accuracy                           0.96        50
   macro avg       0.96      0.96      0.96        50
weighted avg       0.96      0.96      0.96        50`
  },

  {
    id: 'nb-d1-svm',
    title: '03. Support Vector Machine (Scikit-Learn SVC)',
    day: 1,
    category: 'Machine Learning',
    description: 'Non-linear decision boundary classification using Scikit-Learn SVC with RBF kernel and standard feature scaling pipeline.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from sklearn.svm import SVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Generate concentric non-linearly separable circles
X, y = make_circles(n_samples=300, noise=0.08, factor=0.5, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. Direct Scikit-Learn SVM Pipeline with RBF Kernel
svm_model = make_pipeline(
    StandardScaler(),
    SVC(kernel='rbf', C=1.0, gamma='scale', probability=True, random_state=42)
)

svm_model.fit(X_train, y_train)

# 3. Evaluate Support Vectors & Accuracy
y_pred = svm_model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
svc_step = svm_model.named_steps['svc']

print("=== Scikit-Learn Support Vector Classifier (RBF) ===")
print(f"Kernel Type: {svc_step.kernel}")
print(f"Total Support Vectors: {len(svc_step.support_)}")
print(f"Support Vectors per Class: {svc_step.n_support_}")
print(f"Test Accuracy: {acc * 100:.2f}%")`,
    simulatedOutput: `=== Scikit-Learn Support Vector Classifier (RBF) ===
Kernel Type: rbf
Total Support Vectors: 52
Support Vectors per Class: [26 26]
Test Accuracy: 100.00%`
  },

  {
    id: 'nb-d1-kmeans',
    title: '04. K-Means Clustering (Scikit-Learn)',
    day: 1,
    category: 'Machine Learning',
    description: 'Unsupervised partitioning using Scikit-Learn KMeans with centroid convergence and inertia metrics.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score

# 1. Generate synthetic 2D data with 3 true clusters
X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.8, random_state=42)

# 2. Direct Scikit-Learn KMeans Clustering
kmeans = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)
cluster_labels = kmeans.fit_predict(X)

# 3. Model Inspection
sil_score = silhouette_score(X, cluster_labels)

print("=== Scikit-Learn K-Means Clustering ===")
print(f"Number of Clusters (k): {kmeans.n_clusters}")
print(f"Converged Iterations: {kmeans.n_iter_}")
print(f"Cluster Inertia (WCSS): {kmeans.inertia_:.2f}")
print(f"Silhouette Score: {sil_score:.4f}")
print("\\nOptimal Learned Centroids:")
for i, center in enumerate(kmeans.cluster_centers_):
    print(f"  Cluster {i}: ({center[0]:.3f}, {center[1]:.3f})")`,
    simulatedOutput: `=== Scikit-Learn K-Means Clustering ===
Number of Clusters (k): 3
Converged Iterations: 2
Cluster Inertia (WCSS): 374.82
Silhouette Score: 0.7412

Optimal Learned Centroids:
  Cluster 0: (-2.684, 9.043)
  Cluster 1: (4.654, 2.012)
  Cluster 2: (-6.892, -6.643)`
  },

  {
    id: 'nb-d1-ann',
    title: '05. Deep Neural Network / ANN (TensorFlow Keras)',
    day: 1,
    category: 'Deep Learning',
    description: 'Construct and train a Multi-Layer Perceptron (MLP) with TensorFlow Keras Sequential API, ReLU activations, Dropout, and Adam optimizer.',
    colabUrl: 'https://colab.research.google.com/',
    code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split

# 1. Generate dataset
X, y = make_moons(n_samples=1000, noise=0.2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Direct TensorFlow Keras Sequential Architecture
model = Sequential([
    Dense(64, activation='relu', input_shape=(2,), name='dense_input'),
    BatchNormalization(),
    Dense(32, activation='relu', name='dense_hidden'),
    Dropout(0.2),
    Dense(1, activation='sigmoid', name='dense_output')
])

# 3. Model Compilation with Adam & Binary Crossentropy
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.01),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# 4. Model Training
history = model.fit(X_train, y_train, epochs=20, batch_size=32, verbose=0, validation_split=0.2)

# 5. Model Evaluation
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)

print("=== TensorFlow Keras Deep Neural Network (ANN) ===")
print(model.summary())
print(f"\\nFinal Test Loss: {test_loss:.4f}")
print(f"Final Test Accuracy: {test_acc * 100:.2f}%")`,
    simulatedOutput: `=== TensorFlow Keras Deep Neural Network (ANN) ===
Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 dense_input (Dense)         (None, 64)                192       
 batch_normalization (BN)    (None, 64)                256       
 dense_hidden (Dense)        (None, 32)                2080      
 dropout (Dropout)           (None, 32)                0         
 dense_output (Dense)        (None, 1)                 33        
=================================================================
Total params: 2,561 (10.00 KB)
Trainable params: 2,433 (9.50 KB)
Non-trainable params: 128 (512 B)
_________________________________________________________________

Final Test Loss: 0.1248
Final Test Accuracy: 97.50%`
  },

  {
    id: 'nb-d1-cnn',
    title: '06. Convolutional Neural Network / CNN (TensorFlow Keras)',
    day: 1,
    category: 'Deep Learning',
    description: 'Direct 2D Convolutional neural network for image feature extraction using Conv2D, MaxPooling2D, Flatten, and Softmax classification.',
    colabUrl: 'https://colab.research.google.com/',
    code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# 1. Direct TensorFlow Keras CNN Architecture for (28, 28, 1) Images
model = Sequential([
    # Conv Layer 1
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1), name='conv2d_1'),
    MaxPooling2D(pool_size=(2, 2), name='maxpool_1'),
    
    # Conv Layer 2
    Conv2D(64, kernel_size=(3, 3), activation='relu', name='conv2d_2'),
    MaxPooling2D(pool_size=(2, 2), name='maxpool_2'),
    
    # Classification Head
    Flatten(name='flatten'),
    Dense(128, activation='relu', name='fc_dense'),
    Dropout(0.3, name='dropout'),
    Dense(10, activation='softmax', name='output_softmax')
])

# 2. Compile CNN Model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print("=== TensorFlow Keras CNN Model Architecture ===")
model.summary()
print("\\nCNN Feature Extractor initialized successfully with trainable kernel weights.")`,
    simulatedOutput: `=== TensorFlow Keras CNN Model Architecture ===
Model: "sequential_1"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 conv2d_1 (Conv2D)           (None, 26, 26, 32)        320       
 maxpool_1 (MaxPooling2D)    (None, 13, 13, 32)        0         
 conv2d_2 (Conv2D)           (None, 11, 11, 64)        18496     
 maxpool_2 (MaxPooling2D)    (None, 5, 5, 64)          0         
 flatten (Flatten)           (None, 1600)              0         
 fc_dense (Dense)            (None, 128)               204928    
 dropout (Dropout)           (None, 128)               0         
 output_softmax (Dense)      (None, 10)                1290      
=================================================================
Total params: 225,034 (879.04 KB)
Trainable params: 225,034 (879.04 KB)
Non-trainable params: 0 (0.00 Byte)
_________________________________________________________________

CNN Feature Extractor initialized successfully with trainable kernel weights.`
  },

  // Day 2 Notebooks
  {
    id: 'nb-d2-nlp',
    title: '07. NLP Text Vectorization & Classification (Scikit-Learn & NLTK)',
    day: 2,
    category: 'Natural Language Processing',
    description: 'Direct TF-IDF Vectorization and Multinomial Naive Bayes text classification pipeline using Scikit-Learn.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# 1. Corpus data
train_corpus = [
    "Machine learning neural networks achieve great accuracy in classification",
    "Deep learning convolution models recognize images and visual patterns",
    "Transformer attention mechanisms power large language models",
    "Stock prices and corporate financial quarterly statements",
    "Banking interest rates, loan approvals, and investment portfolios",
    "Federal reserve monetary policy and market inflation rates"
]
labels = ["AI/Tech", "AI/Tech", "AI/Tech", "Finance", "Finance", "Finance"]

# 2. Direct Scikit-Learn NLP Pipeline
nlp_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2), stop_words='english')),
    ('classifier', MultinomialNB(alpha=0.1))
])

nlp_pipeline.fit(train_corpus, labels)

# 3. Classify New Unseen Sentences
test_sentences = [
    "Convolutional filters extract spatial features from images",
    "Inflation and high mortgage interest rates affect banks"
]
predictions = nlp_pipeline.predict(test_sentences)

print("=== Scikit-Learn TF-IDF Text Classification ===")
for text, pred in zip(test_sentences, predictions):
    print(f"Text: '{text}'")
    print(f"  -> Predicted Category: [{pred}]\\n")`,
    simulatedOutput: `=== Scikit-Learn TF-IDF Text Classification ===
Text: 'Convolutional filters extract spatial features from images'
  -> Predicted Category: [AI/Tech]

Text: 'Inflation and high mortgage interest rates affect banks'
  -> Predicted Category: [Finance]`
  },

  {
    id: 'nb-d2-cv',
    title: '08. Computer Vision: Canny Edge & Sobel (OpenCV)',
    day: 2,
    category: 'Computer Vision',
    description: 'Direct OpenCV image filtering using GaussianBlur, cv2.Canny, and cv2.Sobel gradients.',
    colabUrl: 'https://colab.research.google.com/',
    code: `import cv2
import numpy as np

# 1. Create synthetic test image (80x80 with white square)
image = np.zeros((80, 80), dtype=np.uint8)
image[20:60, 20:60] = 255

# 2. Direct OpenCV Gaussian Blur to remove high-frequency noise
blurred = cv2.GaussianBlur(image, (5, 5), 1.4)

# 3. Direct OpenCV Sobel Gradient Computation
sobel_x = cv2.Sobel(blurred, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(blurred, cv2.CV_64F, 0, 1, ksize=3)
grad_mag = np.sqrt(sobel_x**2 + sobel_y**2)

# 4. Direct OpenCV Canny Edge Detector (Hysteresis Thresholding)
edges = cv2.Canny(image, threshold1=50, threshold2=150)

print("=== OpenCV Edge Detection Pipeline ===")
print(f"Original Image Dimensions: {image.shape}")
print(f"Max Gradient Magnitude: {grad_mag.max():.2f}")
print(f"Detected Edge Pixels Count: {np.count_nonzero(edges)}")
print("Edge boundaries isolated successfully via Canny algorithm.")`,
    simulatedOutput: `=== OpenCV Edge Detection Pipeline ===
Original Image Dimensions: (80, 80)
Max Gradient Magnitude: 1020.00
Detected Edge Pixels Count: 160
Edge boundaries isolated successfully via Canny algorithm.`
  },

  {
    id: 'nb-d2-attn',
    title: '09. Multi-Head Attention (TensorFlow Keras)',
    day: 2,
    category: 'Transformers',
    description: 'Direct MultiHeadAttention layer execution in TensorFlow Keras for sequence token modeling.',
    colabUrl: 'https://colab.research.google.com/',
    code: `import tensorflow as tf
from tensorflow.keras.layers import MultiHeadAttention, LayerNormalization, Dense

# Sequence parameters: Batch=2, Sequence Length=4 tokens, Dimension d_model=64
batch_size, seq_len, d_model = 2, 4, 64
query = tf.random.normal((batch_size, seq_len, d_model))
value = query  # Self-attention: Q = K = V

# 1. Direct TensorFlow Keras MultiHeadAttention Layer
mha_layer = MultiHeadAttention(num_heads=4, key_dim=16, name="multi_head_attention")
layernorm = LayerNormalization(epsilon=1e-6)

# 2. Forward pass with Attention Output & Attention Weights
attn_output, attn_weights = mha_layer(query, value, return_attention_scores=True)

# 3. Residual Connection + LayerNorm (Transformer Block)
normed_output = layernorm(query + attn_output)

print("=== TensorFlow Keras Multi-Head Attention ===")
print(f"Input Query Tensor Shape: {query.shape}")
print(f"Attention Output Tensor Shape: {attn_output.shape}")
print(f"Attention Score Weights Shape (Batch, Heads, Q_len, K_len): {attn_weights.shape}")
print(f"LayerNorm Output Shape: {normed_output.shape}")`,
    simulatedOutput: `=== TensorFlow Keras Multi-Head Attention ===
Input Query Tensor Shape: (2, 4, 64)
Attention Output Tensor Shape: (2, 4, 64)
Attention Score Weights Shape (Batch, Heads, Q_len, K_len): (2, 4, 4, 4)
LayerNorm Output Shape: (2, 4, 64)`
  },

  // Day 3 Notebooks
  {
    id: 'nb-d3-vae',
    title: '10. Variational Autoencoder / VAE (TensorFlow Keras)',
    day: 3,
    category: 'Generative AI',
    description: 'Direct VAE sampling layer and encoder-decoder architecture constructed using TensorFlow Keras Model API.',
    colabUrl: 'https://colab.research.google.com/',
    code: `import tensorflow as tf
from tensorflow.keras import layers, Model

# 1. Differentiable Reparameterization Sampling Layer
class Sampling(layers.Layer):
    def call(self, inputs):
        z_mean, z_log_var = inputs
        batch = tf.shape(z_mean)[0]
        dim = tf.shape(z_mean)[1]
        epsilon = tf.random.normal(shape=(batch, dim))
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon

# 2. VAE Encoder Architecture
latent_dim = 2
encoder_inputs = layers.Input(shape=(784,), name="encoder_input")
x = layers.Dense(256, activation="relu")(encoder_inputs)
z_mean = layers.Dense(latent_dim, name="z_mean")(x)
z_log_var = layers.Dense(latent_dim, name="z_log_var")(x)
z = Sampling()([z_mean, z_log_var])
encoder = Model(encoder_inputs, [z_mean, z_log_var, z], name="encoder")

# 3. VAE Decoder Architecture
latent_inputs = layers.Input(shape=(latent_dim,), name="z_sampling")
x = layers.Dense(256, activation="relu")(latent_inputs)
decoder_outputs = layers.Dense(784, activation="sigmoid")(x)
decoder = Model(latent_inputs, decoder_outputs, name="decoder")

print("=== TensorFlow Keras VAE Architecture ===")
print(encoder.summary())
print(decoder.summary())
print("\\nContinuous Latent Space Generator initialized successfully.")`,
    simulatedOutput: `=== TensorFlow Keras VAE Architecture ===
Model: "encoder"
__________________________________________________________________________________________________
 Layer (type)                Output Shape              Param #   Connected to                     
==================================================================================================
 encoder_input (InputLayer)  [(None, 784)]             0         []                               
 dense (Dense)               (None, 256)               200960    ['encoder_input[0][0]']          
 z_mean (Dense)              (None, 2)                 514       ['dense[0][0]']                  
 z_log_var (Dense)           (None, 2)                 514       ['dense[0][0]']                  
 sampling (Sampling)         (None, 2)                 0         ['z_mean[0][0]',                 
                                                                  'z_log_var[0][0]']              
==================================================================================================
Total params: 201,988 (789.02 KB)
Trainable params: 201,988 (789.02 KB)
Non-trainable params: 0 (0.00 Byte)
__________________________________________________________________________________________________

Continuous Latent Space Generator initialized successfully.`
  },

  {
    id: 'nb-d3-diff',
    title: '11. Hugging Face Transformers Pipeline (NLP / GenAI)',
    day: 3,
    category: 'Generative AI',
    description: 'Direct model inference using Hugging Face Transformers pipeline for text classification and sentiment analysis.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from transformers import pipeline

# 1. Direct Hugging Face Pretrained Transformer Pipeline
classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# 2. Inference on sample queries
texts = [
    "The 3-day AI/ML Level-2 training program at KL University is intensely practical and well-structured!",
    "The loss function diverged because the learning rate was excessively large."
]

results = classifier(texts)

print("=== Hugging Face Transformers Pipeline ===")
for text, res in zip(texts, results):
    print(f"Text: '{text}'")
    print(f"  -> Predicted Label: {res['label']}, Confidence: {res['score']:.4f}\\n")`,
    simulatedOutput: `=== Hugging Face Transformers Pipeline ===
Text: 'The 3-day AI/ML Level-2 training program at KL University is intensely practical and well-structured!'
  -> Predicted Label: POSITIVE, Confidence: 0.9998

Text: 'The loss function diverged because the learning rate was excessively large.'
  -> Predicted Label: NEGATIVE, Confidence: 0.9984`
  },

  {
    id: 'nb-d3-rag',
    title: '12. Complete RAG Pipeline (LangChain + ChromaDB)',
    day: 3,
    category: 'Generative AI',
    description: 'Direct production RAG architecture using LangChain, RecursiveCharacterTextSplitter, and ChromaDB vector store.',
    colabUrl: 'https://colab.research.google.com/',
    code: `from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

# 1. Initialize Document Chunks
doc_text = """
KL University AI/ML Level-2 Training Program:
Day 1 covers Classical Machine Learning (Linear/Logistic Regression, SVM, K-Means) and Deep Learning (ANN, CNN).
Day 2 covers NLP (Tokenization, Word2Vec, LSTMs), Computer Vision (OpenCV, Canny), and Transformers (Self-Attention).
Day 3 covers Generative AI (VAEs, Diffusion Models) and the Capstone RAG Document Q&A Chatbot.
"""

# 2. Semantic Text Chunking
text_splitter = RecursiveCharacterTextSplitter(chunk_size=150, chunk_overlap=20)
chunks = text_splitter.split_text(doc_text)

# 3. Direct Vector Store Ingestion (ChromaDB + SentenceTransformers)
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_db = Chroma.from_texts(texts=chunks, embedding=embeddings)

# 4. Semantic Similarity Search
query = "What topics are taught on Day 2?"
results = vector_db.similarity_search(query, k=2)

print("=== LangChain + ChromaDB RAG Retrieval ===")
print(f"Query: '{query}'\\n")
print("Retrieved Top Context Chunks:")
for i, res in enumerate(results):
    print(f"[{i+1}] {res.page_content.strip()}\\n")`,
    simulatedOutput: `=== LangChain + ChromaDB RAG Retrieval ===
Query: 'What topics are taught on Day 2?'

Retrieved Top Context Chunks:
[1] Day 2 covers NLP (Tokenization, Word2Vec, LSTMs), Computer Vision (OpenCV, Canny), and Transformers (Self-Attention).

[2] Day 3 covers Generative AI (VAEs, Diffusion Models) and the Capstone RAG Document Q&A Chatbot.`
  }
];