# Lesson 2 — The Training/Inference Split

**Chapter 1 · What Machine Learning Actually Is · Lesson 2 of 30**

## What you'll learn

- The two distinct phases every ML model goes through: training and inference
- What actually happens to a model's internal numbers during training
- Why inference is cheap and fast while training is slow and expensive
- Where this split shows up when you call an LLM API

## Two very different jobs

Every supervised model has a life in two acts. First it is **trained**: shown many labeled examples, and its internal numbers are adjusted, over and over, until its predictions get close to the correct answers. Then it is **used for inference**: fed a brand-new input it has never seen, and asked to produce an output — with its internal numbers now frozen, unchanged by whatever it's asked to predict.

```
TRAINING                        INFERENCE
many labeled examples      one new, unlabeled input
adjusts the model      ->  model is frozen, unchanged
slow, done rarely              fast, done constantly
```

## What "training" actually does

A model like a linear regression or a neural network is, underneath, a set of numbers called **parameters** (or weights) — initially random or near-zero. Training is the repeated process of: run an example through the model, compare its prediction to the known correct label, measure how wrong it was, and nudge the parameters slightly in the direction that would have made it less wrong. Do that over thousands or millions of examples, many times each (an "epoch" is one full pass through the training data), and the parameters settle into values that capture the pattern in the data.

```
for epoch in range(num_epochs):
    for (x, y_true) in training_data:
        y_pred = model(x)              # current parameters
        error  = loss(y_pred, y_true)  # how wrong?
        model.parameters -= learning_rate * gradient(error)
```

This is the expensive part. Training a modern large model can take days or weeks on racks of specialized hardware (GPUs/TPUs), because it means running millions of examples through the model, often dozens of times each.

## What "inference" actually does

Once training stops, the parameters are frozen — saved as a file. **Inference** is just: take one new input, run it forward through the model using those fixed parameters, and read off the output. No comparison to a correct answer, no adjusting of parameters, no labels required (inference inputs are usually unlabeled — that's exactly why you need a prediction).

```
# model.parameters are already fixed — no training happening here
def predict(x):
    return model(x)        # one forward pass, done

predict(new_customer_row)  # -> 0.83  (e.g. predicted churn probability)
```

This is why inference is cheap and fast relative to training: it's a single forward pass instead of millions of repeated passes with error-correction. A single inference call might take milliseconds, which is exactly what lets a model sit behind a live API endpoint, answering requests one at a time, all day.

## Where you'll meet this again

Every time you call an LLM API — asking it to answer a question, summarize a document, write code — you are doing pure inference. The model was trained once (by the company that built it, at enormous cost, over weeks), its parameters are frozen, and your request is just one more forward pass through an already-finished model. This is also why a fixed pretrained model can't "remember" your previous conversations unless the application explicitly re-sends that context with each new inference call — the model's parameters genuinely don't change between calls.

## Recap

Training is the slow, expensive, iterative phase where a model's internal parameters are adjusted using labeled examples. Inference is the fast, cheap phase where a trained, frozen model is run forward on one new input to get a prediction. Training happens rarely (once, or on a retraining schedule); inference happens constantly, every time the model is actually used. Next, we'll look at exactly what goes into that input and output: features and labels.
