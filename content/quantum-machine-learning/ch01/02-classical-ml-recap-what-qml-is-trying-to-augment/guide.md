# Classical ML Recap: What QML Is Trying to Augment

Before judging whether a quantum approach helps, you need a crisp, shared picture of what classical machine learning already does well. This lesson recaps the core classical ML pipeline so every later comparison to a "quantum version" has a fair, specific baseline.

## What you'll learn

- The standard supervised-learning pipeline: features, model, loss, optimizer
- What a linear classifier and a kernel method do, and how they relate to Chapter 3's quantum kernels
- What gradient descent actually optimizes, with a concrete numeric step
- Why "model capacity" and "generalization" are the two things any new modeling approach — quantum or classical — has to actually improve
- Where classical ML already sets a very high, well-optimized bar

## The supervised learning pipeline

Nearly every classifier or regressor you'll compare a QML model against follows the same shape:

1. **Features**: raw data (pixels, sensor readings, tabular columns) turned into a numeric vector x.
2. **Model**: a parameterized function f(x; θ) that maps features to a prediction — a weighted sum, a decision tree, a neural network, or (later) a variational quantum circuit.
3. **Loss function**: a number L(θ) measuring how wrong the model's predictions are on training data (e.g., mean squared error, cross-entropy).
4. **Optimizer**: an algorithm that adjusts θ to reduce the loss, almost always some form of gradient descent.

A "quantum classifier" replaces step 2 with a quantum circuit. Steps 1, 3, and 4 are usually still entirely classical — which is why most QML in practice is a *hybrid* classical-quantum system (the subject of Chapter 5), not a fully quantum pipeline.

## Linear classifiers and the kernel trick

A linear classifier draws a straight decision boundary: predict class 1 if w·x + b > 0, else class 0. Many real datasets aren't linearly separable in their raw features. The **kernel trick** sidesteps this without ever computing the high-dimensional mapping explicitly: instead of mapping x to some higher-dimensional space φ(x) and taking a dot product there, you compute a kernel function k(x, x') = φ(x)·φ(x') directly, often far more cheaply than computing φ(x) itself.

This is the exact structure Chapter 3's quantum kernel methods borrow: a quantum circuit computes k(x, x') by encoding two data points into quantum states and measuring their overlap, then hands that kernel value to an entirely classical support vector machine. The "quantum" part is only the similarity measure — everything else in the SVM is unchanged classical math.

## Gradient descent, worked by hand

Suppose a toy loss is L(θ) = (θ - 3)², and we start at θ = 0 with learning rate η = 0.1.

- Gradient: dL/dθ = 2(θ - 3). At θ = 0, gradient = 2(0 - 3) = -6.
- Update rule: θ_new = θ - η · gradient = 0 - 0.1 × (-6) = **0.6**.
- One more step: gradient at θ = 0.6 is 2(0.6 - 3) = -4.8, so θ_new = 0.6 - 0.1 × (-4.8) = 0.6 + 0.48 = **1.08**.

This is exactly the same update rule used to train a variational quantum circuit's parameters in Chapter 2 — the only difference will be *how* the gradient is computed (the parameter-shift rule, Lesson 7, instead of classical backpropagation), not the optimizer loop itself.

## Capacity and generalization: the real bar

Any new model class — quantum or classical — has to help with one or both of:

- **Capacity**: can the model represent the true underlying pattern in the data at all? (An underpowered model underfits no matter how well you optimize it.)
- **Generalization**: does the model perform well on *new*, unseen data, not just the training set it memorized?

Classical ML has decades of tuning behind it: regularization techniques, architecture search, enormous compute budgets, and mature software. A variational quantum model has to be compared against this mature baseline, not against "no model at all" — which is why Chapter 6's project explicitly benchmarks a quantum classifier against a classical one on the same data.

## Key terms

| Term | Meaning |
|---|---|
| Loss function | A number measuring how wrong a model's predictions are on training data |
| Gradient descent | An optimization method that repeatedly adjusts parameters in the direction that most reduces the loss |
| Kernel trick | Computing a similarity value k(x, x') that implicitly represents a dot product in a higher-dimensional feature space, without computing that mapping explicitly |
| Model capacity | How complex a pattern a model class is able to represent |
| Generalization | How well a trained model performs on new, unseen data rather than just the training set |

## Check yourself

In the gradient descent example above, why does the parameter θ move by a *smaller* amount on the second step (0.48) than the first step (0.6), even though the learning rate η stayed the same at 0.1?
