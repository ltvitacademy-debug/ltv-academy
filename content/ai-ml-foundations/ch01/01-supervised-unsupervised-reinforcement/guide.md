# Lesson 1 — Supervised vs. Unsupervised vs. Reinforcement Learning

**Chapter 1 · What Machine Learning Actually Is · Lesson 1 of 30**

## What you'll learn

- What "machine learning" means in one honest sentence
- The three main paradigms: supervised, unsupervised, and reinforcement learning
- A real example of each, and how to tell them apart
- Why this course spends most of its time on supervised learning

## Machine learning, in one sentence

Machine learning is a way of writing programs that improve at a task by being shown data, instead of being told explicit step-by-step rules. A spam filter isn't hand-coded with a thousand "if it contains this word, flag it" rules — it's shown thousands of emails already labeled spam or not-spam, and it works out the pattern on its own. That one idea — learning a pattern from data rather than programming the pattern by hand — covers almost everything people mean by "ML."

How a program learns from data splits into three broad paradigms, and almost every ML technique you'll meet falls into one of them.

## Supervised learning: learning from an answer key

In supervised learning, every training example comes with the correct answer attached. You give the model pairs of (input, correct output) — an email and its "spam" or "not spam" label, a house's features and its sale price, a scan and whether it shows a tumor — and the model learns a function that maps input to output. It is called "supervised" because a label (supplied by a human, or by some reliable source of ground truth) supervises the learning process, the way an answer key lets a student check their work.

```
Input (features)              Label (answer)
"WIN FREE CASH NOW!!!"    ->  spam
"Meeting moved to 3pm"    ->  not spam
"You've won a prize"      ->  spam
```

Supervised learning is the most common type of ML in business applications — fraud detection, churn prediction, demand forecasting, image recognition — because labeled historical data (what actually happened) is often sitting in a database already. Most of this course focuses here.

## Unsupervised learning: finding structure with no answer key

In unsupervised learning, there are no labels at all — just raw data — and the goal is to find structure in it: groups, patterns, or compressed representations. A retailer might feed a model purchase histories for 50,000 customers with no "correct" grouping specified, and ask it to find natural clusters. The model might surface a cluster of "weekend bulk buyers" and a cluster of "frequent small-basket shoppers" without ever being told those categories exist.

```
No labels, just customers described by features:
  { avg_basket: $120, visits/mo: 2 }   -\
  { avg_basket: $115, visits/mo: 2 }    >-- cluster A ("bulk buyers")
  { avg_basket: $18,  visits/mo: 14 }  -\
  { avg_basket: $22,  visits/mo: 16 }   >-- cluster B ("frequent shoppers")
```

Clustering (grouping similar items) and dimensionality reduction (compressing many features into fewer, more informative ones) are the two most common unsupervised techniques.

## Reinforcement learning: learning from reward and punishment

In reinforcement learning, there's no fixed dataset of correct answers at all. Instead, an **agent** takes **actions** in an **environment**, and after each action it receives a **reward** (or penalty) and observes a new **state**. Over many attempts, it learns a strategy — a policy — that tends to maximize total reward. A chess-playing agent isn't shown millions of labeled "correct moves"; it plays games, sometimes against itself, and reinforces whatever sequences of moves tended to lead to a win.

```
AGENT  --action-->  ENVIRONMENT
  ^                       |
  |<--- reward, new state-|
```

Reinforcement learning powers game-playing agents, robotics, and some recommendation and resource-allocation systems, but it needs an environment the agent can repeatedly interact with — which makes it less common than supervised learning for typical business data problems.

## Recap

Supervised learning learns from labeled (input, correct-output) pairs. Unsupervised learning finds structure in unlabeled data on its own. Reinforcement learning learns a strategy through trial, error, and reward in an environment. Most of the techniques in this course — and most applied ML in industry — are supervised, because labeled historical data is usually what's available. Next, we'll look at the two distinct phases every supervised model goes through: training and inference.
