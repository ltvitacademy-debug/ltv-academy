# Lesson 10 — Loss Functions & Gradient Descent, Intuition

**Chapter 2 · Core ML Concepts · Lesson 10 of 30**

## What you'll learn

- What a loss function actually is, and why training needs one
- How different loss functions penalize the same wrong prediction differently
- What gradient descent does with the loss, step by step
- Why the learning rate is one of the most important settings you'll tune

## Turning "wrong" into a number

A model can't improve without some way to measure how wrong its current predictions are. A **loss function** does exactly that: it takes a prediction and the true label, and returns a single number — higher means worse. Lesson 2's training loop glossed over one detail: `loss(y_pred, y_true)` isn't one fixed formula. Different loss functions penalize mistakes differently, and the choice genuinely changes what the model learns to prioritize.

## The real picture: six loss functions, one wrong prediction

This is a genuine scikit-learn documentation figure, comparing how six different loss functions penalize a classifier's output as it moves from clearly wrong (left) to clearly right (right) for a single training example:

![A line chart with the decision function's value on the x-axis (from -4 to 4) and loss on the y-axis (0 to 8), plotting six curves — zero-one loss (a flat step function), hinge loss, perceptron loss, log loss, squared hinge loss, and modified Huber loss — all roughly agreeing that being very wrong (left side) costs a high loss and being very right (right side) costs near zero, but disagreeing sharply on exactly how the penalty ramps up in between.](/courses/ai-ml-foundations/ch02/10-loss-functions-and-gradient-descent/loss-functions-compared.png)

Every curve agrees on the big picture — wrong predictions cost more than right ones — but they disagree on the details. **Zero-one loss** (the flat yellow step) just counts right-or-wrong with no partial credit, which is what accuracy actually measures, but it's useless for training because it gives no gradient to follow (more on that below). **Squared hinge loss** rises steeply, punishing confidently-wrong predictions much harder than barely-wrong ones. **Log loss** (used by logistic regression) rises more gently and never fully reaches zero, which keeps the model honestly uncertain rather than overconfident. The loss function you pick is a real design decision, not a formality.

## Gradient descent: following the slope downhill

Once you have a loss number, you need a way to actually reduce it. **Gradient descent** is the standard method: compute the **gradient** (the slope of the loss, with respect to each of the model's parameters) and nudge every parameter a small step in the direction that decreases the loss. Repeat.

```python
for step in range(num_steps):
    predictions = model(X, weights)
    loss = loss_fn(predictions, y)
    grad = gradient_of(loss, weights)      # which way is downhill?
    weights = weights - learning_rate * grad
```

A useful mental picture: imagine standing on a hilly landscape in thick fog, where your elevation is the loss and your position is the model's parameters. You can't see the whole landscape, but you can feel which direction is downhill from exactly where you're standing — so you take a small step that way, then re-check, over and over, hoping to reach a low point.

## The learning rate: how big a step

The `learning_rate` in that loop controls step size, and it's one of the single most important settings in training any model with gradient descent. Too small, and training crawls — or gets stuck in a shallow dip that isn't the best possible point. Too large, and the steps overshoot the low point entirely, sometimes bouncing around without ever settling (or getting worse every step). Most of a model's "hyperparameter tuning" — covered later in this course track — ends up being exactly this kind of search for settings that let training actually converge.

## Recap

A loss function turns a wrong prediction into a single number to minimize, and different loss functions prioritize mistakes differently — zero-one loss just counts right/wrong, while squared hinge or log loss give smoother, more trainable signals. Gradient descent repeatedly nudges a model's parameters downhill along that loss, with the learning rate controlling how big each step is. Next, we look at how you actually organize your data so you can tell, honestly, whether any of this training worked: train/validation/test splits.
