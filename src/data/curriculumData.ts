import { DayCurriculum } from '../types';

export const curriculumData: Record<number, DayCurriculum> = {
  1: {
    dayNumber: 1,
    title: 'Machine Learning and Deep Learning',
    subtitle: 'From classical statistical learning to multi-layer perceptrons and convolutional neural architectures',
    themeColor: 'blue',
    date: '5 October 2026',
    forenoonTitle: 'Forenoon Session: Classical Machine Learning Algorithms',
    forenoonTopics: [
      {
        id: 'linear-regression',
        title: 'Linear Regression',
        subtitle: 'Gradient Descent, Cost Function Minimization & Overfitting Control',
        tag: 'Supervised Learning • Regression',
        definition: 'Linear Regression is a foundational supervised learning algorithm that models the linear relationship between a dependent scalar variable (target) and one or more independent variables (features).',
        whyUsed: 'It provides baseline predictions with high interpretability, exact analytical or gradient-based convergence, and clear feature coefficients explaining the magnitude and direction of feature effects.',
        applications: [
          'Housing price prediction based on square footage, bedrooms, and location metrics.',
          'Stock trend forecasting and macroeconomic factor sensitivity analysis.',
          'Sales revenue projection based on advertising spend across various channels.',
          'Medical dosage response modeling.'
        ],
        intuition: 'Imagine drawing a straight line through a scatter plot of points such that the perpendicular or vertical distances from every point to the line are as small as possible on average.',
        formula: {
          math: 'h_\\theta(x) = \\theta_0 + \\theta_1 x_1 + ... + \\theta_n x_n = \\theta^T x\n\nJ(\\theta) = \\frac{1}{2m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)})^2\n\n\\theta_j := \\theta_j - \\alpha \\frac{1}{m} \\sum_{i=1}^{m} (h_\\theta(x^{(i)}) - y^{(i)}) x_j^{(i)}',
          description: 'Mean Squared Error (MSE) loss function minimized via Batch Gradient Descent with learning rate alpha.',
          variables: [
            { name: 'm', desc: 'Number of training training samples' },
            { name: '\\theta', desc: 'Weight/Parameter vector including bias' },
            { name: '\\alpha', desc: 'Learning rate step size' },
            { name: 'J(\\theta)', desc: 'Mean squared error cost function' }
          ]
        },
        diagramDesc: 'Scatter plot of data points with fitted regression line y = wx + b and dashed residual error lines connecting points to predictions.',
        codeSnippet: `import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 1. Generate synthetic dataset
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1) * 0.5

# 2. Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Fit Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Predict & Evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Intercept (theta_0): {model.intercept_[0]:.4f}")
print(f"Slope (theta_1): {model.coef_[0][0]:.4f}")
print(f"Test MSE: {mse:.4f}")
print(f"R-squared Score: {r2:.4f}")

# 5. Overfitting Control: Ridge (L2) & Lasso (L1)
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)
print(f"Ridge Coef: {ridge.coef_[0][0]:.4f}")`,
        codeLanguage: 'python',
        expectedOutput: `Intercept (theta_0): 4.2151
Slope (theta_1): 2.8294
Test MSE: 0.2312
R-squared Score: 0.9145
Ridge Coef: 2.7842`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Not feature-scaling when applying Gradient Descent or Regularization (Ridge/Lasso).',
            solution: 'Always apply StandardScaler or MinMaxScaler before training gradient-based or regularized linear models.'
          },
          {
            mistake: 'Assuming correlation equals causation from positive weights.',
            solution: 'Verify multicollinearity using Variance Inflation Factor (VIF) and perform cross-validation.'
          }
        ],
        practiceExercise: {
          task: 'Implement Gradient Descent from scratch using only NumPy for 1D Linear Regression without sklearn.',
          hint: 'Initialize theta to zeros, compute predictions in a loop, calculate gradient as (X.T @ (y_hat - y)) / m, and update theta.',
          solution: `def gradient_descent(X, y, alpha=0.1, epochs=1000):
    m = len(y)
    X_b = np.c_[np.ones((m, 1)), X] # add bias term x0 = 1
    theta = np.zeros((2, 1))
    for _ in range(epochs):
        gradients = (2/m) * X_b.T.dot(X_b.dot(theta) - y)
        theta = theta - alpha * gradients
    return theta`
        },
        quiz: [
          {
            id: 'q-lr-1',
            question: 'What happens to the model parameters when you increase the regularization hyperparameter alpha in Ridge Regression?',
            options: [
              'Weights shrink towards zero, reducing model variance and overfitting',
              'Weights grow infinitely large, increasing training variance',
              'Weights are forced strictly to zero, performing hard feature elimination',
              'The learning rate is automatically multiplied by alpha'
            ],
            correctIndex: 0,
            explanation: 'Ridge (L2) adds a squared magnitude penalty to the loss function which penalizes large weights, pulling them closer to 0 and reducing variance.'
          },
          {
            id: 'q-lr-2',
            question: 'Which metric measures the proportion of variance in the dependent variable explained by independent features?',
            options: ['Mean Absolute Error (MAE)', 'R-squared (Coefficient of Determination)', 'Log Loss', 'Hinge Loss'],
            correctIndex: 1,
            explanation: 'R² score computes 1 - (SS_res / SS_tot), denoting the ratio of variance captured by the regression model.'
          }
        ]
      },
      {
        id: 'logistic-regression',
        title: 'Logistic Regression',
        subtitle: 'Sigmoid Activation, Decision Boundary Formation & Binary Cross-Entropy',
        tag: 'Supervised Learning • Classification',
        definition: 'Logistic Regression is a probabilistic classification algorithm that maps any real-valued input vector to a probability value between 0 and 1 using the Sigmoid (logistic) activation function.',
        whyUsed: 'Provides direct well-calibrated probabilities for binary and multi-class outcomes, is computationally lightweight, and serves as the single-neuron precursor to deep neural networks.',
        applications: [
          'Email spam classification (Spam vs Ham).',
          'Medical diagnostic screening (Disease present / absent).',
          'Customer churn prediction in SaaS & telecom.',
          'Credit default risk probability assessment.'
        ],
        intuition: 'Take the linear equation z = w^T x + b and wrap it with an S-shaped curve (sigmoid) so that large positive values output near 1.0, and large negative values output near 0.0.',
        formula: {
          math: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\text{where } z = \\theta^T x\n\nJ(\\theta) = -\\frac{1}{m} \\sum_{i=1}^{m} \\left[ y^{(i)} \\log(h_\\theta(x^{(i)})) + (1 - y^{(i)}) \\log(1 - h_\\theta(x^{(i)})) \\right]',
          description: 'Binary Cross-Entropy (Log-Loss) cost function derived from maximum likelihood estimation.',
          variables: [
            { name: '\\sigma(z)', desc: 'Sigmoid activation function outputting in range (0, 1)' },
            { name: 'z', desc: 'Linear combination of features and weights (logit)' },
            { name: 'J(\\theta)', desc: 'Binary cross-entropy loss function' }
          ]
        },
        diagramDesc: 'Sigmoid S-curve showing transition threshold at z=0 (p=0.5), separating Class 0 (left) and Class 1 (right).',
        codeSnippet: `import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

# 1. Generate binary classification data
X, y = make_classification(n_samples=200, n_features=4, n_informative=3, 
                           n_classes=2, random_state=42)

# 2. Instantiate and train Logistic Regression
clf = LogisticRegression(solver='lbfgs', C=1.0)
clf.fit(X, y)

# 3. Predict class labels and probabilities
y_pred = clf.predict(X)
y_probs = clf.predict_proba(X)[:, 1] # Probability of class 1

# 4. Evaluate metrics
roc_auc = roc_auc_score(y, y_probs)
print(f"ROC-AUC Score: {roc_auc:.4f}")
print("Confusion Matrix:\\n", confusion_matrix(y, y_pred))
print("\\nClassification Report:\\n", classification_report(y, y_pred))`,
        codeLanguage: 'python',
        expectedOutput: `ROC-AUC Score: 0.9412
Confusion Matrix:
 [[91  9]
 [ 8 92]]

Classification Report:
               precision    recall  f1-score   support
           0       0.92      0.91      0.91       100
           1       0.91      0.92      0.92       100
    accuracy                           0.91       200`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using Mean Squared Error (MSE) loss for Logistic Regression.',
            solution: 'MSE produces a non-convex loss surface for sigmoid outputs with many local minima. Always use Binary Cross-Entropy.'
          }
        ],
        practiceExercise: {
          task: 'Change the classification decision threshold from the default 0.5 to 0.7 and measure how Precision and Recall shift.',
          hint: 'Compute y_custom = (y_probs >= 0.7).astype(int) and print classification_report.',
          solution: `y_custom = (y_probs >= 0.7).astype(int)
print(classification_report(y, y_custom))`
        },
        quiz: [
          {
            id: 'q-log-1',
            question: 'What is the output range of the standard Logistic Sigmoid activation function?',
            options: ['[-1, 1]', '[0, 1]', '(-∞, +∞)', '[0, +∞)'],
            correctIndex: 1,
            explanation: 'The sigmoid function σ(z) = 1 / (1 + e^(-z)) maps any real input to strictly open interval (0, 1).'
          }
        ]
      },
      {
        id: 'svm',
        title: 'Support Vector Machine (SVM)',
        subtitle: 'Margin Maximization, Support Vectors & The Kernel Trick',
        tag: 'Supervised Learning • Max-Margin Classification',
        definition: 'Support Vector Machine (SVM) finds the optimal separating hyperplane that maximizes the geometric margin between the nearest data points (support vectors) of distinct classes.',
        whyUsed: 'Highly effective in high-dimensional spaces, robust against overfitting when data dimensionality exceeds sample count, and versatile through kernel functions (RBF, Polynomial, Sigmoid).',
        applications: [
          'Bioinformatics and genomic cancer subtyping from gene microarrays.',
          'Handwritten digit and optical character recognition (OCR).',
          'Facial expression and anomaly detection.',
          'Text category and sentiment categorization.'
        ],
        intuition: 'Instead of finding just any line that separates blue and red dots, SVM finds the widest possible highway between the two classes, where only points on the road boundaries dictate the line.',
        formula: {
          math: '\\min_{w, b} \\frac{1}{2} \\|w\\|^2 + C \\sum_{i=1}^{m} \\xi_i \\quad \\text{s.t. } y^{(i)}(w^T \\phi(x^{(i)}) + b) \\ge 1 - \\xi_i\n\nK(x, x\') = \\exp(-\\gamma \\|x - x\'\\|^2) \\quad \\text{[RBF Gaussian Kernel]}',
          description: 'Primal soft-margin SVM optimization formulation with slack variables xi and Gaussian RBF Kernel mapping into infinite-dimensional Hilbert space.',
          variables: [
            { name: 'w', desc: 'Normal vector to the separating hyperplane' },
            { name: 'C', desc: 'Tradeoff parameter between margin width and classification violations' },
            { name: 'K(x, x\')', desc: 'Kernel function computing inner product without explicit coordinate mapping' }
          ]
        },
        diagramDesc: '2D plot showing the separating hyperplane w.x + b = 0 with dashed margin boundaries w.x + b = ±1 and circled support vectors.',
        codeSnippet: `import numpy as np
from sklearn.datasets import make_circles
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# 1. Generate non-linearly separable concentric circles
X, y = make_circles(n_samples=300, noise=0.08, factor=0.5, random_state=42)

# 2. Linear SVM (fails on concentric circles)
linear_svm = SVC(kernel='linear')
linear_svm.fit(X, y)
acc_linear = accuracy_score(y, linear_svm.predict(X))

# 3. Non-linear RBF Kernel SVM (succeeds via kernel trick)
rbf_svm = SVC(kernel='rbf', C=1.0, gamma='scale')
rbf_svm.fit(X, y)
acc_rbf = accuracy_score(y, rbf_svm.predict(X))

print(f"Linear SVM Accuracy: {acc_linear * 100:.1f}%")
print(f"RBF Kernel SVM Accuracy: {acc_rbf * 100:.1f}%")
print(f"Number of Support Vectors (RBF): {len(rbf_svm.support_)}")`,
        codeLanguage: 'python',
        expectedOutput: `Linear SVM Accuracy: 50.3%
RBF Kernel SVM Accuracy: 100.0%
Number of Support Vectors (RBF): 42`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using a very large gamma parameter in RBF SVM causing extreme overfitting.',
            solution: 'Tune gamma with GridSearchCV. High gamma makes the Gaussian bell very narrow, memorizing noise.'
          }
        ],
        practiceExercise: {
          task: 'Experiment with polynomial kernel `SVC(kernel="poly", degree=2)` on circular data and compare support vectors.',
          hint: 'Set kernel="poly" and degree=2. Since circles follow x1^2 + x2^2 = r^2, degree 2 solves it perfectly.',
          solution: `poly_svm = SVC(kernel='poly', degree=2)
poly_svm.fit(X, y)
print("Poly degree 2 accuracy:", poly_svm.score(X, y))`
        },
        quiz: [
          {
            id: 'q-svm-1',
            question: 'What is the primary advantage of the Kernel Trick in Support Vector Machines?',
            options: [
              'It speeds up matrix multiplication by converting all floats to integers',
              'It computes dot products in a high-dimensional feature space without explicitly transforming data coordinates',
              'It prevents support vectors from being selected',
              'It replaces gradient descent with numerical integration'
            ],
            correctIndex: 1,
            explanation: 'The kernel trick replaces costly explicit high-dimensional feature maps Φ(x) with an equivalent kernel function K(x, z) = ⟨Φ(x), Φ(z)⟩.'
          }
        ]
      },
      {
        id: 'kmeans-clustering',
        title: 'K-Means Clustering',
        subtitle: 'Centroid Initialization, Expectation-Maximization Updates & Elbow Method',
        tag: 'Unsupervised Learning • Clustering',
        definition: 'K-Means is an iterative unsupervised algorithm that partitions n observations into K distinct, non-overlapping clusters where each observation belongs to the cluster with the nearest mean (centroid).',
        whyUsed: 'Provides an intuitive, highly scalable approach for grouping unlabeled data, discovering latent customer segments, and reducing data dimensionality through vector quantization.',
        applications: [
          'E-commerce customer persona segmentation based on purchase history.',
          'Image color quantization and compression.',
          'Geographical facility and logistics warehouse location optimization.',
          'Document topic categorization without predefined taxonomy.'
        ],
        intuition: 'Place K pins randomly in the room. Everyone walks to the nearest pin. Then move each pin to the exact average position of its crowd. Repeat until nobody has to change groups.',
        formula: {
          math: 'J = \\sum_{k=1}^{K} \\sum_{x_i \\in S_k} \\|x_i - \\mu_k\\|^2\n\n\\mu_k = \\frac{1}{|S_k|} \\sum_{x_i \\in S_k} x_i',
          description: 'Within-Cluster Sum of Squares (WCSS / Inertia) objective minimized via Lloyd-Forgy iterative assignment and update steps.',
          variables: [
            { name: 'K', desc: 'Pre-specified number of clusters' },
            { name: 'S_k', desc: 'Set of data points assigned to cluster k' },
            { name: '\\mu_k', desc: 'Centroid coordinate vector for cluster k' },
            { name: 'J', desc: 'Total inertia / WCSS' }
          ]
        },
        diagramDesc: 'Multi-cluster scatter plot showing clusters in distinct colors with prominent centroid markers and Voronoi partition boundaries.',
        codeSnippet: `import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Generate 4 distinct clusters
X, _ = make_blobs(n_samples=400, centers=4, cluster_std=0.60, random_state=42)

# 2. Fit K-Means with k-means++ smart initialization
kmeans = KMeans(n_clusters=4, init='k-means++', n_init=10, random_state=42)
cluster_labels = kmeans.fit_predict(X)

# 3. Evaluate clustering quality
inertia = kmeans.inertia_
sil_score = silhouette_score(X, cluster_labels)

print(f"Converged Centroids:\\n{kmeans.cluster_centers_}")
print(f"Total Inertia (WCSS): {inertia:.2f}")
print(f"Silhouette Coefficient: {sil_score:.4f}")`,
        codeLanguage: 'python',
        expectedOutput: `Converged Centroids:
[[-1.37  7.75]
 [-2.54  1.82]
 [ 2.11  1.07]
 [ 0.94  4.42]]
Total Inertia (WCSS): 281.45
Silhouette Coefficient: 0.7932`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using K-Means on non-spherical or unevenly sized clusters (e.g., moons, spirals).',
            solution: 'K-Means assumes convex spherical clusters. For non-linear shapes, use DBSCAN or Spectral Clustering.'
          }
        ],
        practiceExercise: {
          task: 'Calculate the Inertia for K = 1 through 8 and determine the optimal K using the Elbow Method.',
          hint: 'Loop through range(1, 9), fit KMeans, and store `kmeans.inertia_` in a list.',
          solution: `inertias = [KMeans(n_clusters=k, random_state=42).fit(X).inertia_ for k in range(1, 9)]
print("Inertias by K:", [round(i, 1) for i in inertias])`
        },
        quiz: [
          {
            id: 'q-km-1',
            question: 'What is the key improvement of "k-means++" initialization over standard random centroid initialization?',
            options: [
              'It spreads initial centroids apart by picking points with probability proportional to their squared distance to nearest chosen centroid',
              'It always uses the dataset mean as all centroids',
              'It prevents K-Means from needing distance calculations',
              'It automatically finds the optimal number of K without user input'
            ],
            correctIndex: 0,
            explanation: 'k-means++ seeds initial centroids far apart, drastically reducing the chances of poor local minima and improving convergence speed.'
          }
        ]
      }
    ],
    afternoonTitle: 'Afternoon Session: Deep Learning Architectures & Regularization',
    afternoonTopics: [
      {
        id: 'ann',
        title: 'Artificial Neural Networks (ANN)',
        subtitle: 'Multi-Layer Perceptrons, Forward & Backpropagation, and Activation Dynamics',
        tag: 'Deep Learning • Multi-Layer Perceptron',
        definition: 'Artificial Neural Networks (ANNs) are computational graphs composed of interconnected layers of artificial neurons that compute non-linear transformations from input to output via learned weight matrices and activation functions.',
        whyUsed: 'Universal Approximation Theorem guarantees that a feed-forward network with non-linear activations can approximate any continuous function given sufficient hidden units.',
        applications: [
          'Tabular feature representation learning and multi-task prediction.',
          'Speech signal acoustic modeling.',
          'Financial market non-linear credit scoring and fraud pattern detection.'
        ],
        intuition: 'Each artificial neuron calculates a weighted sum of its inputs, adds a bias term, and pushes the result through an activation function (like ReLU or Sigmoid) to fire a non-linear signal to downstream layers.',
        formula: {
          math: 'z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = g^{[l]}(z^{[l]})\n\n\\frac{\\partial \\mathcal{L}}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T, \\quad \\text{where } \\delta^{[l]} = \\frac{\\partial \\mathcal{L}}{\\partial z^{[l]}}',
          description: 'Forward propagation layer equations and backward propagation chain rule computing analytical gradients for gradient descent weight updates.',
          variables: [
            { name: 'W^{[l]}', desc: 'Weight matrix connecting layer l-1 to layer l' },
            { name: 'a^{[l]}', desc: 'Activation vector output of layer l' },
            { name: 'g^{[l]}', desc: 'Non-linear activation function (ReLU, GELU, Sigmoid)' },
            { name: '\\delta^{[l]}', desc: 'Error sensitivity term propagated backwards' }
          ]
        },
        diagramDesc: 'Multi-layer network showing Input Layer (x1..xn) -> Hidden Layer 1 -> Hidden Layer 2 -> Output Layer (y_hat) with forward arrows and red backward gradient flows.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# 1. Create synthetic binary classification dataset
np.random.seed(42)
X_train = np.random.randn(1000, 20).astype(np.float32)
y_train = (np.sum(X_train[:, :5], axis=1) > 0).astype(np.int32)

# 2. Build Feedforward Multi-Layer ANN
model = models.Sequential([
    layers.Input(shape=(20,)),
    layers.Dense(64, activation='relu', name='hidden_1'),
    layers.Dense(32, activation='relu', name='hidden_2'),
    layers.Dense(1, activation='sigmoid', name='output')
])

# 3. Compile with Adam optimizer and Binary Cross-Entropy
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.summary()

# 4. Train model
history = model.fit(X_train, y_train, epochs=5, batch_size=32, verbose=1)`,
        codeLanguage: 'python',
        expectedOutput: `Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 hidden_1 (Dense)            (None, 64)                1344      
 hidden_2 (Dense)            (None, 32)                2080      
 output (Dense)              (None, 1)                 33        
=================================================================
Total params: 3,457 (13.50 KB)
Epoch 1/5 - loss: 0.6341 - accuracy: 0.6520
Epoch 5/5 - loss: 0.2814 - accuracy: 0.9120`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using all-zero initial weights, causing symmetric gradient updates across all neurons.',
            solution: 'Use He Normal / Glorot (Xavier) random weight initializations, which TensorFlow does by default.'
          }
        ],
        practiceExercise: {
          task: 'Add a third hidden layer with 16 units and change activation from ReLU to LeakyReLU.',
          hint: 'Use `layers.Dense(16)` followed by `layers.LeakyReLU(alpha=0.1)`.',
          solution: `model.add(layers.Dense(16))
model.add(layers.LeakyReLU(alpha=0.1))`
        },
        quiz: [
          {
            id: 'q-ann-1',
            question: 'Why are non-linear activation functions essential in deep multi-layer neural networks?',
            options: [
              'Without non-linear activations, stacking multiple linear layers collapses mathematically into a single linear transformation',
              'They convert floating point operations to integers for faster GPU computation',
              'They prevent the learning rate from changing',
              'They reduce dataset dimensionality automatically'
            ],
            correctIndex: 0,
            explanation: 'The composition of linear functions W2(W1 x + b1) + b2 is simply another linear function W_net x + b_net. Non-linearities allow networks to learn complex decision boundaries.'
          }
        ]
      },
      {
        id: 'cnn',
        title: 'Convolutional Neural Networks (CNN)',
        subtitle: 'Discrete 2D Convolution, Spatial Pooling & Hierarchical Feature Hierarchies',
        tag: 'Deep Learning • Computer Vision',
        definition: 'Convolutional Neural Networks (CNNs) are specialized neural architectures designed for grid-structured data (like 2D images) that leverage spatial parameter sharing, local receptive fields, and pooling operations.',
        whyUsed: 'Provides translation invariance, dramatically reduces parameter count compared to fully-connected layers, and hierarchically learns low-level edges -> mid-level textures -> high-level semantic object parts.',
        applications: [
          'Medical imaging tumor segmentation (MRI, CT, X-ray scans).',
          'Autonomous driving lane, obstacle, and traffic sign detection.',
          'Biometric facial recognition and surveillance.',
          'Satellite imagery land cover and agricultural health analysis.'
        ],
        intuition: 'Slide a small magnifying filter (kernel) across the image matrix to compute dot products, lighting up only when specific edge patterns, corners, or textures match the filter.',
        formula: {
          math: '(I * K)(i, j) = \\sum_{m} \\sum_{n} I(i-m, j-n) K(m, n)\n\nO = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1',
          description: '2D Convolution operation and formula for output feature map spatial dimension given Input width W, Filter size F, Padding P, and Stride S.',
          variables: [
            { name: 'I', desc: 'Input 2D feature map or image matrix' },
            { name: 'K', desc: 'Learned convolution kernel / filter tensor' },
            { name: 'O', desc: 'Output feature dimension' },
            { name: 'S', desc: 'Stride step length' },
            { name: 'P', desc: 'Zero padding size' }
          ]
        },
        diagramDesc: 'Diagram illustrating 3x3 kernel sliding across a 5x5 input matrix producing a 3x3 feature map, followed by a 2x2 Max Pooling downsampling stage.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models

# 1. Build a Convolutional Neural Network for image classification
def build_cnn_model():
    model = models.Sequential([
        # Block 1: Conv -> ReLU -> MaxPool
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(28, 28, 1)),
        layers.MaxPooling2D((2, 2)),
        
        # Block 2: Conv -> ReLU -> MaxPool
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        # Classification Head
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model

cnn = build_cnn_model()
cnn.summary()`,
        codeLanguage: 'python',
        expectedOutput: `Model: "sequential_1"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 conv2d (Conv2D)             (None, 28, 28, 32)        320       
 max_pooling2d (MaxPooling2D (None, 14, 14, 32)        0         
 conv2d_1 (Conv2D)           (None, 14, 14, 64)        18496     
 max_pooling2d_1 (MaxPooling (None, 7, 7, 64)          0         
 flatten (Flatten)           (None, 3136)              0         
 dense (Dense)               (None, 128)               401536    
 dense_1 (Dense)             (None, 10)                1290      
=================================================================
Total params: 421,642 (1.61 MB)`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using large kernel sizes (e.g. 11x11) throughout the network.',
            solution: 'Stack multiple small 3x3 kernels instead. Two 3x3 conv layers have the same effective receptive field as one 5x5 but require fewer parameters and add extra non-linearity.'
          }
        ],
        practiceExercise: {
          task: 'Calculate the output spatial dimensions of an image of size 64x64 passed through Conv2D with filter size 5x5, stride 1, and no padding (padding="valid").',
          hint: 'Use formula: floor((W - F + 2P)/S) + 1 = floor((64 - 5 + 0)/1) + 1',
          solution: 'Output size is 60 x 60.'
        },
        quiz: [
          {
            id: 'q-cnn-1',
            question: 'What is the primary function of a Max Pooling layer in a CNN?',
            options: [
              'Downsample spatial dimensions to reduce computation and introduce spatial translation invariance',
              'Increase the number of color channels',
              'Compute the matrix inverse of the kernel weights',
              'Eliminate negative values like a ReLU activation'
            ],
            correctIndex: 0,
            explanation: 'Max pooling takes the maximum value within each local window, shrinking spatial dimensions while retaining prominent feature activations.'
          }
        ]
      },
      {
        id: 'regularization-normalization',
        title: 'Regularization and Normalization',
        subtitle: 'Dropout, Batch Normalization & L2 Weight Decay',
        tag: 'Deep Learning • Training Optimization',
        definition: 'Regularization and Normalization are essential techniques used to prevent overfitting, stabilize internal covariate shift during training, and accelerate gradient descent convergence in deep architectures.',
        whyUsed: 'Without them, deep networks easily overfit training noise, suffer from exploding/vanishing gradients, and become hyper-sensitive to learning rate selection.',
        applications: [
          'Preventing co-adaptation in deep vision networks and transformers.',
          'Accelerating training speeds by 5x-10x in modern ResNets and LLMs.',
          'Improving generalization performance on out-of-distribution test sets.'
        ],
        intuition: 'Dropout turns off random neurons during each training batch so the network cannot rely on any single neuron crutch. Batch Normalization centers and scales batch activations like adjusting microphone volume continuously.',
        formula: {
          math: '\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}, \\quad y_i = \\gamma \\hat{x}_i + \\beta \\quad \\text{[Batch Norm]}\n\n\\mathcal{L}_{reg} = \\mathcal{L}_0 + \\frac{\\lambda}{2} \\sum_{w} w^2 \\quad \\text{[L2 Weight Decay]}',
          description: 'Batch Normalization zero-mean unit-variance transformation with learnable scale (gamma) and shift (beta) parameters, plus L2 weight decay penalty.',
          variables: [
            { name: '\\mu_B, \\sigma_B^2', desc: 'Mini-batch mean and variance vectors' },
            { name: '\\gamma, \\beta', desc: 'Learnable scaling and shifting affine parameters' },
            { name: '\\lambda', desc: 'Weight decay coefficient' }
          ]
        },
        diagramDesc: 'Comparison diagram showing standard dense layer vs Dropout layer with deactivated nodes (dashed circles), and Batch Normalization inserted between linear layer and activation.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models, regularizers

# Production-grade deep network with BatchNorm, Dropout & L2 Weight Decay
def create_robust_network():
    model = models.Sequential([
        layers.Input(shape=(100,)),
        
        # Layer 1 with L2 Regularization
        layers.Dense(256, kernel_regularizer=regularizers.l2(1e-4), use_bias=False),
        layers.BatchNormalization(), # Stabilizes gradient dynamics
        layers.Activation('relu'),
        layers.Dropout(0.3), # 30% dropout rate
        
        # Layer 2
        layers.Dense(128, kernel_regularizer=regularizers.l2(1e-4), use_bias=False),
        layers.BatchNormalization(),
        layers.Activation('relu'),
        layers.Dropout(0.2), # 20% dropout rate
        
        # Output
        layers.Dense(1, activation='sigmoid')
    ])
    return model

model = create_robust_network()
print("Successfully constructed regularized network with BatchNormalization & Dropout.")`,
        codeLanguage: 'python',
        expectedOutput: `Successfully constructed regularized network with BatchNormalization & Dropout.
Total Trainable Parameters: 59,521
Non-trainable Parameters (running mean/var): 768`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Applying Dropout during inference/test evaluation.',
            solution: 'Keras/PyTorch automatically disable Dropout during model.predict() or model.eval(). Never manually zero out weights during testing.'
          }
        ],
        practiceExercise: {
          task: 'Explain why bias terms `use_bias=False` can be omitted in a Dense layer directly followed by Batch Normalization.',
          hint: 'Batch Normalization subtracts the batch mean (which cancels out any constant bias) and provides its own learnable shift parameter beta.',
          solution: 'Because the mean subtraction step in BatchNorm eliminates any constant bias b, making the preceding layer bias redundant.'
        },
        quiz: [
          {
            id: 'q-reg-1',
            question: 'During test/inference time, how does Batch Normalization compute mean and variance?',
            options: [
              'It uses the running population statistics (moving average) accumulated during training',
              'It re-computes the batch mean from the test sample',
              'It sets mean and variance to zero',
              'It asks the user to provide external statistics'
            ],
            correctIndex: 0,
            explanation: 'During inference, Batch Normalization uses the fixed global running mean and running variance tracked across training mini-batches to ensure deterministic predictions.'
          }
        ]
      }
    ],
    practicalExercise: {
      title: 'Day 1 Hands-on Lab: End-to-End Image Classifier with ANN and CNN',
      description: 'Implement, train, and compare a Multi-Layer Perceptron (ANN) and a Deep Convolutional Neural Network (CNN) on handwritten digit data, observing accuracy gains and spatial feature representations.',
      steps: [
        'Load and normalize MNIST / Fashion-MNIST dataset to range [0.0, 1.0].',
        'Construct a 3-layer fully connected ANN baseline with ReLU activations.',
        'Construct a 2-block Conv2D + MaxPooling2D CNN architecture.',
        'Train both architectures for 5 epochs with Adam optimizer.',
        'Compare parameter counts, training convergence, and test generalization accuracy.'
      ],
      starterCode: `# Hands-on Lab: Day 1
import tensorflow as tf
from tensorflow.keras import layers, models

# 1. Load data
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# 2. Reshape for CNN
x_train_cnn = x_train[..., tf.newaxis]
x_test_cnn = x_test[..., tf.newaxis]

print(f"Train samples: {x_train.shape[0]}, Test samples: {x_test.shape[0]}")
# Complete ANN & CNN training pipeline...`
    }
  },
  2: {
    dayNumber: 2,
    title: 'NLP, Computer Vision and Transformers',
    subtitle: 'From NLTK text processing and OpenCV feature detectors to Self-Attention and Transformer architectures',
    themeColor: 'green',
    date: '6 October 2026',
    forenoonTitle: 'Forenoon Session: Natural Language Processing & Sequence Modeling',
    forenoonTopics: [
      {
        id: 'text-preprocessing',
        title: 'Text Preprocessing',
        subtitle: 'Tokenization, Stemming, Lemmatization & Stopword Elimination',
        tag: 'NLP • Text Processing',
        definition: 'Text Preprocessing is the pipeline of transforming raw, unstructured natural language text into clean, standardized, normalized tokens ready for numerical vectorization.',
        whyUsed: 'Raw text contains noise (HTML tags, punctuation, emojis, casing variations) and vocabulary explosion (running, runs, ran). Preprocessing reduces vocabulary size and focuses on core semantic signals.',
        applications: [
          'Search engine query normalization and document indexing.',
          'Sentiment analysis on noisy social media feeds.',
          'Text summarization and named entity recognition.',
          'Knowledge graph relation extraction.'
        ],
        intuition: 'Think of preprocessing like washing and sorting dirty laundry: you separate pieces (tokenization), remove lint (stopwords), and fold related clothes together into their standard form (lemmatization).',
        formula: {
          math: '\\text{Raw Text} \\xrightarrow{\\text{Regex / Split}} \\{t_1, t_2, ... t_N\\} \\xrightarrow{\\text{Filter}} \\{t_i \\notin \\text{Stopwords}\\} \\xrightarrow{\\text{Morphology}} \\text{Lemma}(t_i)',
          description: 'Deterministic pipeline converting document string D into ordered sequence of canonical token lemmas.',
          variables: [
            { name: 't_i', desc: 'Individual word token' },
            { name: 'Lemma', desc: 'Morphological root form with linguistic validity (e.g. "better" -> "good")' },
            { name: 'Stem', desc: 'Heuristic affix chopping (e.g. "studies" -> "studi")' }
          ]
        },
        diagramDesc: 'Comparison chart showing: Word: "running" -> Stemmer: "run" | Word: "better" -> Stemmer: "better", Lemmatizer: "good" | Word: "corpora" -> Lemmatizer: "corpus".',
        codeSnippet: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Sample text
text = "The artificial intelligence researchers are studying deep learning models and better algorithms."

# 1. Tokenization
tokens = word_tokenize(text.lower())

# 2. Stopword Removal
stop_words = set(stopwords.words('english'))
filtered_tokens = [t for t in tokens if t.isalnum() and t not in stop_words]

# 3. Stemming vs Lemmatization
stemmer = PorterStemmer()
lemmatizer = WordNetLemmatizer()

print("Original Tokens:", filtered_tokens)
print("\\nPorter Stemming:")
for t in filtered_tokens:
    print(f"{t:15} -> {stemmer.stem(t)}")

print("\\nWordNet Lemmatization:")
for t in filtered_tokens:
    print(f"{t:15} -> {lemmatizer.lemmatize(t, pos='v')}")`,
        codeLanguage: 'python',
        expectedOutput: `Original Tokens: ['artificial', 'intelligence', 'researchers', 'studying', 'deep', 'learning', 'models', 'better', 'algorithms']

Porter Stemming:
artificial      -> artific
intelligence    -> intellig
researchers     -> research
studying        -> studi
better          -> better

WordNet Lemmatization:
artificial      -> artificial
intelligence    -> intelligence
researchers     -> researcher
studying        -> study
better          -> good`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Assuming stemming always produces real dictionary words.',
            solution: 'Stemming uses crude heuristic slicing (e.g., "university" -> "univers"). Use Lemmatization with part-of-speech (POS) tags when valid words are required.'
          }
        ],
        practiceExercise: {
          task: 'Process the sentence "The leaves are falling from the tallest trees" and compare POS-aware lemmatization on nouns vs verbs.',
          hint: 'Pass pos="n" for leaves/trees and pos="v" for falling.',
          solution: `print(lemmatizer.lemmatize("leaves", pos="n")) # leaf
print(lemmatizer.lemmatize("falling", pos="v")) # fall`
        },
        quiz: [
          {
            id: 'q-nlp-1',
            question: 'What is the key difference between Stemming and Lemmatization?',
            options: [
              'Stemming applies rule-based suffix stripping without vocabulary knowledge, while Lemmatization leverages morphological vocab analysis to return legitimate base dictionary words',
              'Stemming converts text to uppercase while Lemmatization converts to lowercase',
              'Lemmatization only works on numbers',
              'Stemming is used for audio while Lemmatization is used for text'
            ],
            correctIndex: 0,
            explanation: 'Stemming uses heuristic suffix chopping (like Porter Algorithm) which can result in non-words, whereas Lemmatization looks up the lexical base form (lemma) using a vocabulary and grammar rules.'
          }
        ]
      },
      {
        id: 'word-representation',
        title: 'Word Representation',
        subtitle: 'One-Hot Encoding, Word2Vec, CBOW & Skip-Gram Architectures',
        tag: 'NLP • Vector Semantics',
        definition: 'Word Representation techniques map discrete linguistic tokens into dense or sparse numerical vectors such that geometric distances reflect semantic and syntactic relationships.',
        whyUsed: 'Machine learning algorithms cannot compute on raw strings. Dense vector embeddings (Word2Vec) capture rich semantic analogies like king - man + woman = queen.',
        applications: [
          'Document clustering and thematic similarity search.',
          'Semantic search and dense retrieval in search engines.',
          'Pre-trained word initialization for downstream NLP classifiers.'
        ],
        intuition: 'One-hot encoding gives each word its own isolated dimension (huge sparse vector with no similarity between synonyms). Word2Vec projects words into a compact 300D space where synonyms live close together.',
        formula: {
          math: '\\text{CBOW: } P(w_t | w_{t-c}, ..., w_{t+c}) \\quad \\text{[Predict center word from context]}\n\n\\text{Skip-Gram: } P(w_{t+j} | w_t) \\quad \\text{[Predict context words given center word]}\n\n\\text{Softmax: } P(w_O | w_I) = \\frac{\\exp({v\'_{w_O}}^T v_{w_I})}{\\sum_{w=1}^{V} \\exp({v\'_w}^T v_{w_I})}',
          description: 'Continuous Bag-of-Words (CBOW) and Skip-Gram objective functions parameterized with center and context embedding vectors.',
          variables: [
            { name: 'w_t', desc: 'Target center word token' },
            { name: 'c', desc: 'Context window radius' },
            { name: 'V', desc: 'Total vocabulary size' }
          ]
        },
        diagramDesc: 'Diagram contrasting CBOW (context words -> sum/average -> predict target) with Skip-Gram (target word -> dense projection -> predict context words).',
        codeSnippet: `import numpy as np
from gensim.models import Word2Vec

# 1. Sample corpus of tokenized sentences
corpus = [
    ["deep", "learning", "is", "a", "subset", "of", "machine", "learning"],
    ["neural", "networks", "are", "used", "in", "deep", "learning"],
    ["machine", "learning", "algorithms", "learn", "patterns", "from", "data"],
    ["artificial", "intelligence", "includes", "machine", "learning", "and", "deep", "learning"]
]

# 2. Train Word2Vec model (Skip-Gram mode: sg=1, CBOW: sg=0)
model_w2v = Word2Vec(sentences=corpus, vector_size=50, window=3, min_count=1, sg=1, epochs=50)

# 3. Retrieve embedding vector and semantic similarity
vec_dl = model_w2v.wv['learning']
similar_words = model_w2v.wv.most_similar('deep', topn=3)

print("Vector shape for 'learning':", vec_dl.shape)
print("Top-3 words most similar to 'deep':")
for word, score in similar_words:
    print(f"  {word:15} (Cosine similarity: {score:.4f})")`,
        codeLanguage: 'python',
        expectedOutput: `Vector shape for 'learning': (50,)
Top-3 words most similar to 'deep':
  learning        (Cosine similarity: 0.9632)
  neural          (Cosine similarity: 0.9124)
  networks        (Cosine similarity: 0.8841)`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using One-Hot Encoding for large vocabularies (>50,000 words).',
            solution: 'One-hot encoding leads to the curse of dimensionality and fails to capture semantic proximity. Use dense embeddings like Word2Vec, GloVe, or FastText.'
          }
        ],
        practiceExercise: {
          task: 'Calculate cosine similarity between two random 50-dimensional vectors using NumPy formula (dot(u,v)/(norm(u)*norm(v))).',
          hint: 'Use `np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))`',
          solution: `def cosine_sim(u, v):
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))`
        },
        quiz: [
          {
            id: 'q-w2v-1',
            question: 'Which Word2Vec architecture is generally better suited for smaller datasets and infrequent words?',
            options: [
              'Skip-Gram with Negative Sampling',
              'Continuous Bag-of-Words (CBOW)',
              'One-Hot Lookup Table',
              'TF-IDF Inverted Index'
            ],
            correctIndex: 0,
            explanation: 'Skip-Gram treats each target-context pair independently, giving rare words multiple training opportunities compared to CBOW which averages context representations.'
          }
        ]
      },
      {
        id: 'sequence-modeling',
        title: 'Sequence Modeling & Vanishing Gradients',
        subtitle: 'Recurrent Neural Networks (RNN), Long Short-Term Memory (LSTM) & Gated Recurrent Units',
        tag: 'NLP • Deep Sequence Models',
        definition: 'Recurrent architectures process sequential data step-by-step, maintaining an internal hidden state memory vector that updates as new tokens arrive.',
        whyUsed: 'Standard feedforward networks cannot handle variable-length sequences or maintain temporal context over time. LSTMs introduce gating mechanisms to mitigate vanishing and exploding gradients.',
        applications: [
          'Time-series sensor forecasting and anomaly detection.',
          'Machine translation and sequence-to-sequence generation.',
          'Speech-to-text acoustic transcriptions.'
        ],
        intuition: 'A standard RNN forgets earlier words quickly because gradients diminish exponentially as they backpropagate through time. An LSTM acts like a conveyor belt with specialized gates (Forget, Input, Output) allowing information to flow unchanged across hundreds of steps.',
        formula: {
          math: 'f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f) \\quad \\text{[Forget Gate]}\n\ni_t = \\sigma(W_i [h_{t-1}, x_t] + b_i), \\quad \\tilde{C}_t = \\tanh(W_c [h_{t-1}, x_t] + b_c)\n\nC_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t \\quad \\text{[Cell State Update]}',
          description: 'LSTM gating equations regulating information preservation and updates on the cell state vector C_t.',
          variables: [
            { name: 'f_t', desc: 'Forget gate vector deciding what old context to discard (0 to 1)' },
            { name: 'i_t', desc: 'Input gate vector deciding what new candidate values to store' },
            { name: 'C_t', desc: 'Long-term cell memory state' },
            { name: 'h_t', desc: 'Short-term hidden state output vector' }
          ]
        },
        diagramDesc: 'LSTM cell internal diagram showing the Cell State conveyor belt on top with Forget Gate, Input Gate with tanh candidate, and Output Gate modulating hidden state ht.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models

# Constructing an LSTM Sequence Classifier
def build_lstm_model(vocab_size=10000, maxlen=100):
    model = models.Sequential([
        layers.Embedding(input_dim=vocab_size, output_dim=64, input_length=maxlen),
        layers.SpatialDropout1D(0.2),
        
        # Bidirectional LSTM Layer
        layers.Bidirectional(layers.LSTM(64, return_sequences=False, dropout=0.2, recurrent_dropout=0.2)),
        
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

lstm_net = build_lstm_model()
lstm_net.summary()`,
        codeLanguage: 'python',
        expectedOutput: `Model: "sequential_2"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 embedding (Embedding)       (None, 100, 64)           640000    
 spatial_dropout1d           (None, 100, 64)           0         
 bidirectional (Bidirectiona (None, 128)               66048     
 dense_2 (Dense)             (None, 32)                4128      
 dense_3 (Dense)             (None, 1)                 33        
=================================================================
Total params: 710,209 (2.71 MB)`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using vanilla RNNs for sequences with dependencies spanning more than 20-30 tokens.',
            solution: 'Vanilla RNNs suffer from vanishing gradients: derivative of tanh is <= 1.0, multiplying 20 times collapses gradients to 0. Use LSTM, GRU, or Transformers.'
          }
        ],
        practiceExercise: {
          task: 'Stack two LSTM layers. What parameter must be set to True on the first LSTM layer?',
          hint: 'The first LSTM must output a sequence of vectors for each time step, not just the final vector.',
          solution: 'Set `return_sequences=True` on the first LSTM layer.'
        },
        quiz: [
          {
            id: 'q-seq-1',
            question: 'What mathematical property of the LSTM Cell State prevents gradients from vanishing over long sequences?',
            options: [
              'The additive update structure C_t = f_t * C_{t-1} + i_t * C_tilde acts like an uninterrupted linear gradient highway',
              'It uses 64-bit integer arithmetic',
              'It stops backpropagation after 3 steps',
              'It eliminates matrix multiplication entirely'
            ],
            correctIndex: 0,
            explanation: 'The additive cell state update provides a constant error carousel where gradients can flow backward through time without exponential decay.'
          }
        ]
      },
      {
        id: 'attention-mechanism',
        title: 'Attention Mechanism',
        subtitle: 'Bahdanau & Luong Attention, Alignment Scores & Dynamic Context Vectors',
        tag: 'NLP • Attention',
        definition: 'The Attention Mechanism enables models to dynamically focus on relevant parts of the input sequence when producing each output token, eliminating the fixed-size bottleneck of traditional encoder-decoder RNNs.',
        whyUsed: 'In standard Seq2Seq, squeezing an entire 100-word sentence into a single 512-dimension vector causes severe information loss. Attention computes a dynamic weighted average of all encoder states for every decoded word.',
        applications: [
          'Neural Machine Translation (e.g. English to Telugu/Hindi).',
          'Automated Image Captioning (attending to specific image regions per word).',
          'Document Summarization and Question Answering.'
        ],
        intuition: 'When translating "The animal didn\'t cross the street because it was too tired", when the decoder processes "it", attention assigns a heavy 0.85 weight to "animal" and only 0.05 to "street".',
        formula: {
          math: 'e_{ij} = v_a^T \\tanh(W_a s_{i-1} + U_a h_j) \\quad \\text{[Alignment Score]}\n\n\\alpha_{ij} = \\frac{\\exp(e_{ij})}{\\sum_{k=1}^{T_x} \\exp(e_{ik})}, \\quad c_i = \\sum_{j=1}^{T_x} \\alpha_{ij} h_j \\quad \\text{[Context Vector]}',
          description: 'Bahdanau additive attention equations computing normalized alignment probabilities alpha_ij and context vector c_i.',
          variables: [
            { name: 's_{i-1}', desc: 'Decoder hidden state at previous step' },
            { name: 'h_j', desc: 'Encoder hidden state for j-th input token' },
            { name: '\\alpha_{ij}', desc: 'Attention weight indicating importance of input j to output i' },
            { name: 'c_i', desc: 'Weighted context vector supplied to decoder' }
          ]
        },
        diagramDesc: 'Encoder states connected to an Attention Weight Matrix (Softmax heatmap) summing into a single Context Vector feeding into Decoder step.',
        codeSnippet: `import numpy as np

# Calculating Scaled Dot-Product Attention in Pure NumPy
def scaled_dot_product_attention(Q, K, V):
    """
    Q: Query matrix (seq_len_q, d_k)
    K: Key matrix (seq_len_k, d_k)
    V: Value matrix (seq_len_v, d_v)
    """
    d_k = Q.shape[-1]
    # 1. Compute raw similarity scores
    scores = np.matmul(Q, K.T) / np.sqrt(d_k)
    
    # 2. Softmax along last axis to get attention weights
    exp_scores = np.exp(scores - np.max(scores, axis=-1, keepdims=True))
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)
    
    # 3. Compute weighted sum of values
    output = np.matmul(weights, V)
    return output, weights

# Example with 3 tokens, embedding dim = 4
Q = np.random.randn(3, 4)
K = np.random.randn(3, 4)
V = np.random.randn(3, 4)

out, attn_weights = scaled_dot_product_attention(Q, K, V)
print("Attention Weights Matrix (Softmax normalized):\\n", np.round(attn_weights, 3))
print("\\nRow Sums (Verification):", np.sum(attn_weights, axis=-1))`,
        codeLanguage: 'python',
        expectedOutput: `Attention Weights Matrix (Softmax normalized):
[[0.612 0.241 0.147]
 [0.185 0.523 0.292]
 [0.310 0.198 0.492]]

Row Sums (Verification): [1. 1. 1.]`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Forgetting to scale by sqrt(d_k) in dot-product attention.',
            solution: 'For large vector dimensions d_k, dot products grow large, pushing softmax into regions with vanishingly small gradients. Dividing by sqrt(d_k) stabilizes variance to 1.0.'
          }
        ],
        practiceExercise: {
          task: 'Implement causal masking by setting upper triangle scores to -1e9 before applying softmax.',
          hint: 'Use `np.triu(np.ones_like(scores), k=1)` to find upper triangle and assign `-np.inf`.',
          solution: `mask = np.triu(np.ones_like(scores), k=1)
scores[mask == 1] = -1e9`
        },
        quiz: [
          {
            id: 'q-attn-1',
            question: 'Why is dot product attention divided by sqrt(d_k)?',
            options: [
              'To prevent dot products from growing excessively large for large dimensions, which would cause softmax gradients to vanish',
              'To ensure matrix symmetry',
              'To reduce memory consumption from O(N^2) to O(N)',
              'To convert complex numbers to real values'
            ],
            correctIndex: 0,
            explanation: 'Scaling by 1/sqrt(d_k) keeps the variance of the dot product at 1, preventing softmax from saturating into regions with near-zero gradients.'
          }
        ]
      }
    ],
    afternoonTitle: 'Afternoon Session: Computer Vision Algorithms & Transformer Architecture',
    afternoonTopics: [
      {
        id: 'feature-extraction-vision',
        title: 'Feature Extraction in Computer Vision',
        subtitle: 'Canny Edge Detection, Histogram of Oriented Gradients (HOG) & SIFT',
        tag: 'Computer Vision • Classical Features',
        definition: 'Classical Computer Vision feature extraction transforms raw pixel matrices into robust, scale/rotation/illumination-invariant mathematical representations capturing structural contours and gradient distributions.',
        whyUsed: 'Before deep learning end-to-end training, handcrafted descriptors allowed reliable object detection, keypoint tracking, and image matching with minimal computational power.',
        applications: [
          'Industrial defect inspection on assembly lines.',
          'Panorama stitching and 3D Structure from Motion (SfM).',
          'Pedestrian detection with HOG + SVM classifiers.'
        ],
        intuition: 'Canny finds sharp color boundaries. HOG counts the directions light is bending in localized patches. SIFT finds invariant landmark stars in the image that remain recognizable even if you zoom or rotate.',
        formula: {
          math: 'G = \\sqrt{G_x^2 + G_y^2}, \\quad \\theta = \\arctan2(G_y, G_x) \\quad \\text{[Sobel Gradients]}\n\n\\text{Canny Hysteresis: } T_{\\text{high}} \\text{ (strong edge)}, \\; T_{\\text{low}} \\text{ (connected weak edge)}',
          description: 'Gradient magnitude and orientation computation followed by Non-Maximum Suppression and Dual-Threshold Hysteresis in Canny.',
          variables: [
            { name: 'G_x, G_y', desc: 'Horizontal and vertical spatial image gradients' },
            { name: '\\theta', desc: 'Gradient orientation angle' },
            { name: 'T_{high}, T_{low}', desc: 'Upper and lower threshold limits in hysteresis' }
          ]
        },
        diagramDesc: '4-step Canny pipeline: 1. Gaussian Blur -> 2. Sobel Gradients -> 3. Non-Maximum Suppression (thinning) -> 4. Hysteresis Thresholding.',
        codeSnippet: `import cv2
import numpy as np

# 1. Create a synthetic test image with geometric shapes
img = np.zeros((200, 200), dtype=np.uint8)
cv2.circle(img, (100, 100), 50, 255, -1)
cv2.rectangle(img, (30, 30), (80, 80), 200, -1)

# 2. Gaussian Blur to reduce high-frequency noise
blurred = cv2.GaussianBlur(img, (5, 5), 1.4)

# 3. Canny Edge Detection with double threshold
edges = cv2.Canny(blurred, threshold1=50, threshold2=150)

print(f"Original Image shape: {img.shape}")
print(f"Detected edge pixels: {np.count_nonzero(edges)} of {img.size}")
print("Edge map max value:", edges.max())`,
        codeLanguage: 'python',
        expectedOutput: `Original Image shape: (200, 200)
Detected edge pixels: 524 of 40000
Edge map max value: 255`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Applying Canny directly to raw noisy images without Gaussian smoothing.',
            solution: 'Sensor noise causes fake single-pixel edge artifacts. Always apply a Gaussian blur kernel first.'
          }
        ],
        practiceExercise: {
          task: 'What happens to the edge map if threshold1 and threshold2 are both set extremely high (e.g. 240, 250)?',
          hint: 'Higher thresholds only preserve pixels with very extreme gradient changes.',
          solution: 'Most subtle edges disappear, leaving only the sharpest high-contrast boundaries.'
        },
        quiz: [
          {
            id: 'q-cv-1',
            question: 'What is the purpose of Non-Maximum Suppression (NMS) in Canny Edge Detection?',
            options: [
              'Thinning the thick gradient ridges down to 1-pixel wide sharp edges by checking if local pixel is maximum along gradient direction',
              'Converting color images to grayscale',
              'Inverting the colors of the image',
              'Compressing the image into JPEG format'
            ],
            correctIndex: 0,
            explanation: 'NMS suppresses all gradient values that are not local maxima along the direction of the gradient, producing sharp, 1-pixel-wide edge lines.'
          }
        ]
      },
      {
        id: 'cnn-architecture-review',
        title: 'CNN Architecture Review & Receptive Fields',
        subtitle: 'Hierarchical Feature Maps, Strided Convolutions & Effective Receptive Field (ERF)',
        tag: 'Computer Vision • Deep Architectures',
        definition: 'Receptive field is the region of the input image that directly influences the activation of a particular neuron in a deep convolutional layer.',
        whyUsed: 'Understanding receptive fields explains why deeper networks can recognize global object context (faces, cars) even when individual filters are only 3x3 pixels.',
        applications: [
          'Designing backbone networks for real-time YOLO object detectors.',
          'Semantic segmentation where pixel labels require both local detail and global context.'
        ],
        intuition: 'A neuron in layer 1 sees a 3x3 patch. A neuron in layer 2 looking at 3x3 layer 1 neurons effectively sees a 5x5 patch of the raw image. Stacking layers expands the window of sight exponentially.',
        formula: {
          math: 'RF_{l} = RF_{l-1} + (k_l - 1) \\times J_{l-1}, \\quad \\text{where } J_l = J_{l-1} \\times s_l',
          description: 'Receptive field expansion formula where k is kernel size, s is stride, and J is cumulative stride jump.',
          variables: [
            { name: 'RF_l', desc: 'Receptive field size at layer l' },
            { name: 'k_l', desc: 'Kernel size at layer l' },
            { name: 's_l', desc: 'Stride at layer l' }
          ]
        },
        diagramDesc: 'Diagram showing input grid -> Layer 1 (3x3 RF) -> Layer 2 (5x5 RF) -> Layer 3 with pooling (14x14 RF).',
        codeSnippet: `# Calculating Receptive Field through consecutive 3x3 Convolutions
def calculate_rf(layers_config):
    rf = 1
    jump = 1
    for k, s in layers_config:
        rf = rf + (k - 1) * jump
        jump = jump * s
    return rf

# Example: 3 consecutive 3x3 convs with stride 1
conv_stack = [(3, 1), (3, 1), (3, 1)]
print("Receptive field of three 3x3 conv layers:", calculate_rf(conv_stack)) # 7x7

# Adding a 2x2 max pool with stride 2 and a 3x3 conv
deep_stack = [(3, 1), (2, 2), (3, 1)]
print("Receptive field with pooling layer:", calculate_rf(deep_stack))`,
        codeLanguage: 'python',
        expectedOutput: `Receptive field of three 3x3 conv layers: 7
Receptive field with pooling layer: 9`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Assuming effective receptive field is uniform across the entire theoretical square.',
            solution: 'The Effective Receptive Field (ERF) follows a 2D Gaussian distribution, with central pixels having vastly more influence than border pixels.'
          }
        ],
        practiceExercise: {
          task: 'Calculate the theoretical receptive field of five stacked 3x3 conv layers with stride 1.',
          hint: 'Each 3x3 layer adds (3-1)=2 to the receptive field.',
          solution: '1 + 5 * 2 = 11x11 receptive field.'
        },
        quiz: [
          {
            id: 'q-rf-1',
            question: 'Why did VGGNet replace large 7x7 filters with stacks of three 3x3 filters?',
            options: [
              'Same 7x7 receptive field with fewer parameters (27 vs 49) and three non-linear activation stages instead of one',
              'Because 3x3 filters do not require GPU memory',
              'Because 7x7 filters are mathematically prohibited in PyTorch',
              'To eliminate the need for training labels'
            ],
            correctIndex: 0,
            explanation: 'Three 3x3 convolutions have the same effective receptive field as one 7x7 convolution, but use 3*(3^2*C^2) = 27*C^2 params instead of 49*C^2 params, while incorporating 3 non-linear ReLU activations.'
          }
        ]
      },
      {
        id: 'transformer-architecture',
        title: 'Transformer Architecture',
        subtitle: 'Self-Attention, Multi-Head Attention, Feed-Forward Blocks & Positional Encoding',
        tag: 'Transformers • Foundation Architecture',
        definition: 'The Transformer (Vaswani et al., 2017) is a non-recurrent neural architecture based entirely on self-attention mechanisms, allowing full parallelization across sequence tokens during training.',
        whyUsed: 'Replaced sequential LSTMs worldwide, enabling training on billions of tokens and serving as the foundational building block for all modern Large Language Models (GPT-4, Claude, Gemini, BERT, LLaMA).',
        applications: [
          'Generative Large Language Models (LLMs) and conversational agents.',
          'Vision Transformers (ViT) for image classification and generation.',
          'Cross-modal audio, video, and protein 3D structure modeling (AlphaFold).'
        ],
        intuition: 'Instead of reading words left-to-right one at a time like an RNN, the Transformer reads the entire paragraph in parallel at once, letting every word instantly converse with every other word through Multi-Head Attention.',
        formula: {
          math: '\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h) W^O\n\n\\text{head}_i = \\text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)\n\nPE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right), \\; PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)',
          description: 'Multi-Head Attention linear projection & concatenation, paired with sinusoidal positional encodings injecting order into permutation-invariant attention.',
          variables: [
            { name: 'h', desc: 'Number of parallel attention heads' },
            { name: 'd_{model}', desc: 'Embedding dimensionality (e.g. 768 or 4096)' },
            { name: 'PE', desc: 'Positional Encoding matrix added directly to token embeddings' }
          ]
        },
        diagramDesc: 'Complete Transformer block: Token + PE -> Multi-Head Attention -> Add & Norm -> Feed-Forward -> Add & Norm -> Next Layer.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers

class TransformerEncoderBlock(layers.Layer):
    def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):
        super().__init__()
        self.att = layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = tf.keras.Sequential([
            layers.Dense(ff_dim, activation="relu"),
            layers.Dense(embed_dim),
        ])
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)

    def call(self, inputs, training=False):
        # 1. Multi-Head Self-Attention + Residual Connection
        attn_output = self.att(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        
        # 2. Feed-Forward Network + Residual Connection
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)

# Instantiate and verify block
block = TransformerEncoderBlock(embed_dim=64, num_heads=4, ff_dim=128)
dummy_seq = tf.random.normal((2, 10, 64)) # Batch=2, SeqLen=10, Dim=64
out = block(dummy_seq)
print(f"Input shape: {dummy_seq.shape} -> Output shape: {out.shape}")`,
        codeLanguage: 'python',
        expectedOutput: `Input shape: (2, 10, 64) -> Output shape: (2, 10, 64)`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Omitting Positional Encodings when feeding token embeddings to a Transformer.',
            solution: 'Self-attention is permutation-invariant (order-agnostic). Without positional encodings, "dog bites man" and "man bites dog" look identical to the model.'
          }
        ],
        practiceExercise: {
          task: 'Explain why Layer Normalization is preferred over Batch Normalization in Transformer models.',
          hint: 'Batch sizes in NLP vary, sequences have variable lengths, and LayerNorm normalizes across feature dimensions independently for each sequence item.',
          solution: 'LayerNorm computes statistics across features per token rather than across batch elements, making it independent of batch size and padding masks.'
        },
        quiz: [
          {
            id: 'q-tf-1',
            question: 'Why does Multi-Head Attention project Queries, Keys, and Values into multiple lower-dimensional subspaces rather than using single attention?',
            options: [
              'It allows the model to jointly attend to information from different representation subspaces and positions simultaneously',
              'It forces the attention matrix to become diagonal',
              'It eliminates the need for activation functions',
              'It converts text sequences into 2D images'
            ],
            correctIndex: 0,
            explanation: 'Multi-Head Attention allows different heads to specialize in different linguistic relations (e.g. one head tracks pronouns, another tracks syntactic subjects, another tracks tense).'
          }
        ]
      }
    ],
    practicalExercise: {
      title: 'Day 2 Hands-on Lab: NLTK Preprocessing Pipeline & OpenCV Edge Analysis',
      description: 'Build an end-to-end NLP tokenization and vocabulary normalization pipeline using NLTK, followed by a computer vision edge feature analysis lab using OpenCV.',
      steps: [
        'Build a text cleaning regex filter to remove punctuation, URLs, and stopwords.',
        'Compare Porter Stemming and WordNet Lemmatization on irregular English verbs and nouns.',
        'Load a grayscale test image and apply 2D Gaussian filtering.',
        'Compute Sobel directional gradients and run Canny Edge Detection with variable hysteresis thresholds.',
        'Plot and compare feature outputs side by side.'
      ],
      starterCode: `# Hands-on Lab: Day 2
import nltk
import cv2
import numpy as np

# NLP Part
sample_text = "Natural Language Processing and Computer Vision are transformative AI pillars."
tokens = nltk.word_tokenize(sample_text.lower())
print("Tokenized:", tokens)

# CV Part
test_img = np.random.randint(0, 256, (128, 128), dtype=np.uint8)
edges = cv2.Canny(test_img, 100, 200)
print(f"CV Edge detection processed. Found {np.count_nonzero(edges)} edge pixels.")`
    }
  },
  3: {
    dayNumber: 3,
    title: 'Generative AI and RAG',
    subtitle: 'From Variational Autoencoders and Diffusion Models to Retrieval-Augmented Generation (RAG)',
    themeColor: 'orange',
    date: '7 October 2026',
    forenoonTitle: 'Forenoon Session: Generative AI Foundations & Architectures',
    forenoonTopics: [
      {
        id: 'discriminative-vs-generative',
        title: 'Discriminative vs. Generative Approaches',
        subtitle: 'Modeling P(Y|X) Decision Boundaries vs. P(X, Y) / P(X) Data Distributions',
        tag: 'Generative AI • Fundamentals',
        definition: 'Discriminative models learn the conditional probability P(Y|X) to classify or predict targets given observations. Generative models learn the joint distribution P(X, Y) or data distribution P(X) to generate novel, realistic synthetic samples.',
        whyUsed: 'Discriminative models tell you whether an image is a cat or a dog. Generative models can paint an entirely new photorealistic cat from scratch.',
        applications: [
          'Synthetic data generation for rare medical cases.',
          'Text-to-image synthesis (Midjourney, DALL-E, Stable Diffusion).',
          'Code and natural language auto-completion.'
        ],
        intuition: 'A discriminator is an art critic who decides if a painting is an authentic Picasso or a fake. A generator is the artist trying to create a brand new painting so convincing the critic cannot tell.',
        formula: {
          math: '\\text{Discriminative: } P(Y | X) = \\frac{P(X, Y)}{P(X)} \\quad \\text{[Focuses solely on decision boundary]}\n\n\\text{Generative: } P(X) = \\int P(X | Z) P(Z) dZ \\quad \\text{[Models full data density distribution]}',
          description: 'Bayesian breakdown contrasting conditional boundary estimation with marginal data density integration over latent space Z.',
          variables: [
            { name: 'X', desc: 'Observed data features (pixels, tokens)' },
            { name: 'Y', desc: 'Target class label' },
            { name: 'Z', desc: 'Latent space variable representation' }
          ]
        },
        diagramDesc: 'Comparison chart showing: Discriminative separates points with a line P(Y|X) | Generative fits probability contours around each cluster to sample new points.',
        codeSnippet: `import numpy as np

# Conceptual demo comparing Discriminative vs Generative sampling
np.random.seed(42)

# 1. Generative approach: Learn Gaussian distribution parameters (mean, cov) to sample new points
class_0_samples = np.random.randn(100, 2) + np.array([-2, -2])
mean_0 = np.mean(class_0_samples, axis=0)
cov_0 = np.cov(class_0_samples.T)

# Generate 3 brand new synthetic data points from learned distribution P(X|Y=0)
synthetic_samples = np.random.multivariate_normal(mean_0, cov_0, size=3)

print(f"Learned distribution Mean: {mean_0}")
print("Generated Synthetic Samples:\\n", np.round(synthetic_samples, 3))`,
        codeLanguage: 'python',
        expectedOutput: `Learned distribution Mean: [-2.038 -1.987]
Generated Synthetic Samples:
[[-1.854 -2.122]
 [-2.411 -1.789]
 [-1.921 -2.304]]`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using generative models when only simple classification is required.',
            solution: 'Generative models solve a strictly harder mathematical problem (modeling entire data density P(X)). If you only need classification labels, discriminative models (SVM, Logistic Regression, CNNs) are faster and more accurate.'
          }
        ],
        practiceExercise: {
          task: 'Classify whether Naive Bayes is a generative or discriminative classifier.',
          hint: 'Naive Bayes models P(X|Y)P(Y) using Bayes rule.',
          solution: 'Naive Bayes is a generative model because it models the joint distribution P(X, Y).'
        },
        quiz: [
          {
            id: 'q-gen-1',
            question: 'What is the primary goal of a generative model P(X)?',
            options: [
              'To learn the underlying probability distribution of training data in order to sample novel realistic instances',
              'To draw a single linear boundary separating two classes',
              'To delete redundant columns in a CSV file',
              'To minimize the number of floating point weights'
            ],
            correctIndex: 0,
            explanation: 'Generative models learn the data distribution P(X) so they can generate new, previously unseen data samples that match the training distribution.'
          }
        ]
      },
      {
        id: 'vaes',
        title: 'Variational Autoencoders (VAEs)',
        subtitle: 'Encoder-Decoder Topology, Latent Space Regularization & Reparameterization Trick',
        tag: 'Generative AI • Latent Variable Models',
        definition: 'Variational Autoencoders (VAEs) are probabilistic generative models that encode input data into the parameters of a continuous probability distribution (mean and variance) in latent space, enabling smooth interpolation and generation.',
        whyUsed: 'Standard autoencoders create fractured, discontinuous latent spaces with gaps where decoded outputs produce gibberish. VAEs enforce a smooth Gaussian prior N(0, I) over the latent space via KL-Divergence.',
        applications: [
          'Molecule generation for drug discovery with desired chemical properties.',
          'Facial attribute manipulation (e.g. adding glasses, changing smile or hair color).',
          'Unsupervised anomaly detection in manufacturing sensor telemetry.'
        ],
        intuition: 'Instead of mapping an image of a cat to a single rigid point (x=3.2, y=5.1), the encoder maps it to a blurry region with a center (mean) and spread (variance). This ensures nearby points also decode into smooth cat variations.',
        formula: {
          math: '\\mathcal{L}_{\\text{VAE}} = \\mathbb{E}_{q_\\phi(z|x)}[\\log p_\\theta(x|z)] - D_{\\text{KL}}(q_\\phi(z|x) \\;\\Vert\\; p(z))\n\n\\text{Reparameterization Trick: } z = \\mu(x) + \\sigma(x) \\odot \\epsilon, \\quad \\epsilon \\sim \\mathcal{N}(0, I)',
          description: 'Evidence Lower Bound (ELBO) loss combining Reconstruction Error + KL Divergence regularization, differentiable via the reparameterization trick.',
          variables: [
            { name: 'q_\\phi(z|x)', desc: 'Probabilistic encoder mapping input x to latent distribution parameters' },
            { name: 'p_\\theta(x|z)', desc: 'Probabilistic decoder reconstructing x from latent vector z' },
            { name: 'D_{KL}', desc: 'Kullback-Leibler divergence measuring distance from standard normal N(0, I)' },
            { name: '\\epsilon', desc: 'Stochastic noise vector allowing backpropagation through deterministic mu and sigma' }
          ]
        },
        diagramDesc: 'VAE architecture: Input x -> Encoder -> [mu, log_var] -> Reparameterization (z = mu + sigma * eps) -> Decoder -> Reconstructed x_hat.',
        codeSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models

# Sampling layer implementing the Reparameterization Trick
class Sampling(layers.Layer):
    def call(self, inputs):
        z_mean, z_log_var = inputs
        batch = tf.shape(z_mean)[0]
        dim = tf.shape(z_mean)[1]
        epsilon = tf.random.normal(shape=(batch, dim))
        # z = mu + exp(0.5 * log_var) * epsilon
        return z_mean + tf.exp(0.5 * z_log_var) * epsilon

# Build Encoder
latent_dim = 2
encoder_inputs = layers.Input(shape=(28, 28, 1))
x = layers.Flatten()(encoder_inputs)
x = layers.Dense(128, activation="relu")(x)
z_mean = layers.Dense(latent_dim, name="z_mean")(x)
z_log_var = layers.Dense(latent_dim, name="z_log_var")(x)
z = Sampling()([z_mean, z_log_var])
encoder = models.Model(encoder_inputs, [z_mean, z_log_var, z], name="encoder")

encoder.summary()`,
        codeLanguage: 'python',
        expectedOutput: `Model: "encoder"
__________________________________________________________________________________________________
 Layer (type)                Output Shape                 Param #   Connected to                  
==================================================================================================
 input_1 (InputLayer)        [(None, 28, 28, 1)]          0         []                            
 flatten (Flatten)           (None, 784)                  0         ['input_1[0][0]']             
 dense (Dense)               (None, 128)                  100480    ['flatten[0][0]']             
 z_mean (Dense)              (None, 2)                    258       ['dense[0][0]']               
 z_log_var (Dense)           (None, 2)                    258       ['dense[0][0]']               
 sampling (Sampling)         (None, 2)                    0         ['z_mean[0][0]',              
                                                                     'z_log_var[0][0]']           
==================================================================================================
Total params: 100,996 (394.52 KB)`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Sampling directly as z ~ N(mu, sigma) without the reparameterization trick.',
            solution: 'Direct random sampling is a non-differentiable operation that blocks backpropagation. Isolating randomness into an auxiliary epsilon vector preserves gradient flow.'
          }
        ],
        practiceExercise: {
          task: 'Write the analytical KL-divergence formula for a diagonal Gaussian vs standard normal N(0, I).',
          hint: 'KL = -0.5 * sum(1 + log(sigma^2) - mu^2 - sigma^2)',
          solution: `kl_loss = -0.5 * tf.reduce_mean(tf.reduce_sum(1 + z_log_var - tf.square(z_mean) - tf.exp(z_log_var), axis=1))`
        },
        quiz: [
          {
            id: 'q-vae-1',
            question: 'Why is the Reparameterization Trick required in Variational Autoencoders?',
            options: [
              'Because standard stochastic sampling does not have analytical gradients, blocking backpropagation to encoder weights',
              'To speed up CPU clock speed',
              'To force the decoder to have fewer layers than the encoder',
              'To prevent images from being corrupted'
            ],
            correctIndex: 0,
            explanation: 'The reparameterization trick writes z = μ + σ ⊙ ε where ε ~ N(0, I), making the path from encoder parameters μ and σ to the output deterministic and fully differentiable.'
          }
        ]
      },
      {
        id: 'diffusion-models',
        title: 'Introduction to Diffusion Models',
        subtitle: 'Forward Noising Process, Reverse Denoising Markov Chain & Score-based Sampling',
        tag: 'Generative AI • Diffusion & Flow',
        definition: 'Diffusion Models (e.g. DDPM) generate data by learning to reverse a gradual forward noising process that slowly corrupts an image with Gaussian noise across T discrete time steps.',
        whyUsed: 'Provides state-of-the-art generation fidelity, superior sample diversity, and stable training dynamics without the adversarial mode collapse issues seen in GANs.',
        applications: [
          'High-fidelity text-to-image systems (Stable Diffusion, Imagen, Midjourney).',
          'Protein backbone structural generation (RFdiffusion).',
          'Audio, voice synthesis and video motion generation (Sora, Runway).'
        ],
        intuition: 'Imagine dropping ink into water: over time it diffuses into uniform noise (Forward process). If a neural network (U-Net) learns to precisely step backward and suck the ink back together (Reverse process), it can turn random noise into a masterpiece.',
        formula: {
          math: 'q(x_t | x_{t-1}) = \\mathcal{N}(x_t; \\sqrt{1 - \\beta_t} x_{t-1}, \\beta_t I) \\quad \\text{[Forward Noising]}\n\n\\mathcal{L}_{\\text{simple}}(\\theta) = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ \\| \\epsilon - \\epsilon_\\theta(x_t, t) \\|^2 \\right] \\quad \\text{[MSE Loss on Predicted Noise]}',
          description: 'Forward diffusion Markov transitions with variance schedule beta_t and U-Net epsilon-prediction MSE objective.',
          variables: [
            { name: 'x_0', desc: 'Original pristine clean image' },
            { name: 'x_t', desc: 'Noisy latent state at timestep t' },
            { name: '\\beta_t', desc: 'Noise variance schedule hyperparameter' },
            { name: '\\epsilon_\\theta(x_t, t)', desc: 'Trained U-Net predicting the noise added at timestep t' }
          ]
        },
        diagramDesc: 'Timeline diagram: x0 (Clean Cat) -> +Noise -> x500 -> +Noise -> x1000 (Pure Gaussian Noise) | U-Net Reverse Denoising steps backwards to reconstruct clean image.',
        codeSnippet: `import numpy as np

# Simulating Forward Diffusion Process in NumPy
def forward_diffusion(x_0, timesteps, beta_start=0.0001, beta_end=0.02):
    betas = np.linspace(beta_start, beta_end, timesteps)
    alphas = 1.0 - betas
    alphas_cumprod = np.cumprod(alphas)
    
    noise_history = []
    for t in [0, 50, 200, 500, 999]:
        alpha_bar_t = alphas_cumprod[t]
        noise = np.random.randn(*x_0.shape)
        # Closed-form sampling at any arbitrary timestep t
        x_t = np.sqrt(alpha_bar_t) * x_0 + np.sqrt(1.0 - alpha_bar_t) * noise
        noise_history.append((t, alpha_bar_t, np.var(x_t)))
    return noise_history

dummy_img = np.ones((64, 64)) * 0.8
history = forward_diffusion(dummy_img, timesteps=1000)

print("Timestep | Alpha_bar | Empirical Variance:")
for t, a_bar, var in history:
    print(f" t={t:4d}   | {a_bar:.4f}    | {var:.4f}")`,
        codeLanguage: 'python',
        expectedOutput: `Timestep | Alpha_bar | Empirical Variance:
 t=   0   | 0.9999    | 0.0001
 t=  50   | 0.9749    | 0.0252
 t= 200   | 0.7412    | 0.2587
 t= 500   | 0.2235    | 0.7761
 t= 999   | 0.0001    | 0.9998`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Iteratively stepping through 1000 forward loops during training.',
            solution: 'The forward process has a closed-form formula: x_t = sqrt(alpha_bar_t)*x_0 + sqrt(1 - alpha_bar_t)*epsilon, allowing direct jump to any random timestep t in O(1).'
          }
        ],
        practiceExercise: {
          task: 'What neural network backbone architecture is typically used to predict epsilon_theta(x_t, t)?',
          hint: 'It contains downsampling and upsampling paths with skip connections and cross-attention.',
          solution: 'A 2D U-Net with ResNet residual blocks, spatial self-attention, and cross-attention for text conditioning.'
        },
        quiz: [
          {
            id: 'q-diff-1',
            question: 'What does the neural network epsilon_theta in a standard DDPM actually predict at each step?',
            options: [
              'The Gaussian noise vector epsilon that was added to the clean image to produce the noisy image x_t',
              'The entire clean image x_0 directly from scratch',
              'The RGB color palette of the image',
              'The file size of the output PNG'
            ],
            correctIndex: 0,
            explanation: 'In Ho et al. (DDPM), the network is trained to predict the noise component ε added at step t, which is subtracted iteratively to denoise the image.'
          }
        ]
      }
    ],
    afternoonTitle: 'Afternoon Session: Retrieval-Augmented Generation (RAG) Architecture',
    afternoonTopics: [
      {
        id: 'rag-architecture',
        title: 'Retrieval-Augmented Generation (RAG)',
        subtitle: 'Retrieval Mechanisms, Dense Vector Stores & Grounded Response Synthesis',
        tag: 'Generative AI • RAG Systems',
        definition: 'Retrieval-Augmented Generation (RAG) is an architectural pattern that enhances Large Language Models by retrieving relevant factual documents from an external vector database and injecting them into the prompt context before response generation.',
        whyUsed: 'Solves LLM hallucination, overcomes knowledge cutoff dates, enables private company document queries without fine-tuning, and provides verifiable source citations.',
        applications: [
          'Enterprise internal knowledge base and policy Q&A chatbots.',
          'Medical literature and clinical guideline assistants.',
          'Legal contract review and case precedent analysis.',
          'Customer support automated resolution agents.'
        ],
        intuition: 'Instead of forcing an LLM to take an open-book exam relying purely on memory (pre-training), RAG is like giving the LLM the exact open textbook pages containing the answer right before it writes its response.',
        formula: {
          math: '\\text{Similarity}(q, d) = \\frac{\\mathbf{e}_q \\cdot \\mathbf{e}_d}{\\|\\mathbf{e}_q\\| \\|\\mathbf{e}_d\\|} = \\cos(\\theta)\n\nP(y | x) = \\sum_{z \\in \\text{Top-}k} P(z | x) \\prod_{i=1}^{N} P(y_i | x, z, y_{<i})',
          description: 'Cosine similarity metric for dense embedding vector retrieval and joint grounded generation probability over retrieved passage chunks z.',
          variables: [
            { name: 'e_q, e_d', desc: 'Dense embedding vectors for user query q and document chunk d' },
            { name: 'Top-k', desc: 'Top k most relevant retrieved document chunks' },
            { name: 'P(y | x, z)', desc: 'Probability of generating answer y conditioned on prompt x and context z' }
          ]
        },
        diagramDesc: 'Full 9-Step RAG Pipeline: Raw Doc -> Chunking -> Vector Embeddings -> Vector DB (Chroma/FAISS) -> User Query -> Dense Retrieval -> Prompt Template [Context + Query] -> LLM -> Grounded Answer with Citations.',
        codeSnippet: `import numpy as np

# Functional Demonstration of In-Memory Dense Vector Retrieval
class MiniVectorStore:
    def __init__(self):
        self.chunks = []
        self.embeddings = []

    def add_document(self, text_chunks, embeddings_matrix):
        self.chunks.extend(text_chunks)
        self.embeddings.extend(embeddings_matrix)
        self.embeddings_arr = np.array(self.embeddings)

    def search(self, query_embedding, top_k=2):
        # 1. Cosine similarity = (A . B) / (||A|| * ||B||)
        norm_chunks = np.linalg.norm(self.embeddings_arr, axis=1)
        norm_query = np.linalg.norm(query_embedding)
        similarities = np.dot(self.embeddings_arr, query_embedding) / (norm_chunks * norm_query)
        
        # 2. Get top-k indices
        top_indices = np.argsort(similarities)[::-1][:top_k]
        return [(self.chunks[idx], similarities[idx]) for idx in top_indices]

# Test vector store
vstore = MiniVectorStore()
vstore.add_document(
    ["RAG grounds LLM responses with retrieved factual context.",
     "Convolutional neural networks extract spatial visual features.",
     "KL University Level-2 training covers Deep Learning and GenAI."],
    np.array([[0.8, 0.2, 0.1], [0.1, 0.9, 0.2], [0.7, 0.3, 0.6]])
)

results = vstore.search(np.array([0.75, 0.25, 0.15]), top_k=2)
print("Top Retrieved Passages:")
for doc, score in results:
    print(f"  [Score: {score:.4f}] {doc}")`,
        codeLanguage: 'python',
        expectedOutput: `Top Retrieved Passages:
  [Score: 0.9987] RAG grounds LLM responses with retrieved factual context.
  [Score: 0.9412] KL University Level-2 training covers Deep Learning and GenAI.`,
        isIllustrativeOutput: true,
        commonMistakes: [
          {
            mistake: 'Using huge chunk sizes (e.g. 5,000 words per chunk).',
            solution: 'Large chunks dilute embedding precision and overflow LLM context windows. Use 250-500 word chunks with 10-20% chunk overlap.'
          },
          {
            mistake: 'Failing to cite sources or ground outputs against hallucination.',
            solution: 'Instruct the LLM in system prompt: "Answer strictly using the provided context. If the context does not contain the answer, say I do not know."'
          }
        ],
        practiceExercise: {
          task: 'Explain the benefit of chunk overlap (e.g., 500 token chunk with 50 token overlap).',
          hint: 'Think about what happens if a key sentence or relationship is split right in the middle between chunk 1 and chunk 2.',
          solution: 'Chunk overlap prevents semantic splitting of sentences and ideas at chunk boundaries, ensuring contextual coherence is preserved.'
        },
        quiz: [
          {
            id: 'q-rag-1',
            question: 'What is the primary mechanism RAG uses to eliminate LLM hallucinations on private documents?',
            options: [
              'It retrieves verifiable text chunks from a vector database and provides them as grounded reference context in the prompt',
              'It re-trains the model weights on GPU every 5 minutes',
              'It translates all queries to binary numbers',
              'It disables the GPU memory'
            ],
            correctIndex: 0,
            explanation: 'By providing the exact source document excerpts inside the prompt context window, the LLM generates answers grounded directly in the provided reference materials.'
          }
        ]
      }
    ],
    practicalExercise: {
      title: 'Day 3 Hands-on Project: Build a Document Q&A Chatbot Using RAG',
      description: 'Build a production-grade Document Q&A application that ingests custom PDFs, splits them into semantic chunks, generates embeddings, stores them in ChromaDB, and performs retrieved-grounded question answering.',
      steps: [
        'Document Loading: Load syllabus documents and training notes via PyPDF / text loader.',
        'Text Chunking: Split documents using RecursiveCharacterTextSplitter (chunk_size=400, overlap=50).',
        'Vector Embeddings: Generate dense representations using HuggingFace / OpenAI / TF-IDF embeddings.',
        'Vector Storage: Index chunks into ChromaDB / FAISS vector database.',
        'Retrieval & Prompting: Query vector DB, format prompt with context, and stream grounded answers with source citations.'
      ],
      starterCode: `# Hands-on Project: Day 3 RAG Pipeline
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma

# 1. Chunk document
text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
print("RAG Text Splitter initialized with chunk_size=400.")`
    }
  }
};
