# Lesson 7 — Classification, Intuition

**Chapter 2 · Core ML Concepts · Lesson 7 of 30**

## What you'll learn

- How classification differs from regression at the core
- What a "decision boundary" actually is
- Why different classifier algorithms draw very different boundaries on the same data
- Binary vs. multi-class classification, and how probability fits in

## Regression predicts a number; classification predicts a category

Where linear regression outputs a continuous number, classification outputs a category: spam or not spam, fraud or not fraud, which of ten handwritten digits. Internally, almost every classifier is still doing numeric math — it usually computes a score or probability per class and then picks the highest one — but the final output is a label, not a number on a continuous scale.

## The real picture: ten classifiers, two datasets, one goal

This is a genuine scikit-learn comparison — the same two synthetic 2-D datasets (red dots vs. blue dots), run through ten different classification algorithms, each drawing its own **decision boundary**: the line (or curve) that separates "I'd call this red" from "I'd call this blue."

![A grid of scatter plots: two rows of red/blue input datasets (one shaped like two interleaved moons, one as concentric circles) on the left, followed by ten columns showing how Nearest Neighbors, Linear SVM, RBF SVM, Gaussian Process, Decision Tree, Random Forest, Neural Net, AdaBoost, Naive Bayes, and QDA each color the background differently to separate the two classes, with each panel's test accuracy printed in its bottom-right corner.](/courses/ai-ml-foundations/ch02/07-classification-intuition/classifier-comparison.png)

Look at the top row (two interleaved crescents, or "moons"). Linear SVM draws a single straight boundary and gets only 0.88 accuracy — a straight line genuinely can't separate two interleaved crescents well. RBF SVM and the Neural Net curve their boundary to match the crescent shape and score 0.97. The Decision Tree draws boxy, rectangular regions (you'll see exactly why in the next lesson) and still manages 0.95. Same data, same goal, very different shapes of "line" — and very different results.

## Decision boundaries, in code terms

A classifier's prediction, in the simplest binary case, usually comes down to: compute a score, and check which side of a threshold it lands on.

```python
score = model.decision_function(new_point)   # how "blue" is this point?
predicted_class = "blue" if score > 0 else "red"
```

The decision boundary is exactly the set of points where that score crosses zero — everywhere `score > 0` gets colored one way, everywhere `score < 0` the other. A straight-line model (like linear SVM or plain logistic regression) can only draw a straight decision boundary, no matter how it's tuned. Algorithms like RBF SVM, decision trees, or neural networks can draw curved or piecewise boundaries, which is why they scored higher on the crescent-shaped data above.

## Binary vs. multi-class, and probability

Spam detection is **binary** (two classes). Classifying a handwritten digit is **multi-class** (ten classes, 0 through 9). Most classifiers don't just output a hard label — they output a probability per class (`predict_proba` in scikit-learn), and the predicted class is just whichever probability is highest. That probability is genuinely useful on its own: a fraud model that's 51% confident deserves different handling than one that's 99% confident, even though both would be labeled "fraud" by a hard 50% threshold.

## Recap

Classification predicts a category instead of a number, usually by scoring each class and picking the highest, or by comparing a score against a threshold to find a decision boundary. Different algorithms can draw very differently shaped boundaries — straight lines, curves, or boxy regions — on the exact same data, with real consequences for accuracy. Next, we look closely at one specific boundary shape: the rectangular splits a decision tree draws, and how ensembles of trees improve on a single one.
