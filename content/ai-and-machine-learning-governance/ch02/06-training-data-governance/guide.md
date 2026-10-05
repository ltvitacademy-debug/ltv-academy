# Lesson 6 — Training Data Governance

**Chapter 2 · Data for AI · Lesson 6 of 30**

## What you'll learn

- Why training data needs its own governance treatment, separate from data governance in general
- The questions a training data policy actually has to answer
- What "the data gets baked in" means in practice, and why it matters for governance
- How this chapter's remaining lessons each cover one piece of this

## Why training data is a special case

Every dataset an organization holds should already be governed under its existing data governance program — classified, owned, subject to access rules. Training data needs something more, because of what happens to it once it's used: the patterns in that data get absorbed into a model's parameters and then applied to every future prediction the model makes. A report built on bad data gets corrected when someone catches the mistake and rebuilds it. A model trained on bad data keeps producing the consequences of that mistake until someone retrains it — and retraining is slower and more expensive than editing a report.

## What a training data policy has to answer

An organization serious about this writes down, before any model gets trained, answers to questions like:

- **Where is this data allowed to come from?** Internal systems, licensed third-party data, public datasets, and web-scraped data each carry different risk and different legal standing (Lesson 7 covers this specifically).
- **Who approved its use for this purpose?** Data collected for one purpose (say, customer support tickets) being repurposed to train a model is a different decision than using it for its original purpose, and usually needs separate sign-off.
- **What's the quality bar before training starts?** Lesson 8 applies the familiar quality dimensions specifically to training data.
- **Does it reflect the population the model will actually be used on?** A mismatch here is one of the main ways bias enters a model (Lesson 9).
- **How was it labeled, and by whom?** Lesson 10 covers labeling as its own governed activity.

## "Baked in" and why it changes the governance math

Once a model finishes training, the specific data points it learned from aren't sitting in a queryable table anymore — they're compressed into statistical patterns distributed across the model's parameters. That has two consequences governance has to account for: it's much harder to later remove the influence of one bad data point (you often have to retrain from scratch, not delete a row), and it's much harder to prove exactly what the model did or didn't learn from a given source. This is why training data decisions get reviewed before training, not just audited after.

## What the rest of this chapter covers

This lesson sets the frame. Lesson 7 covers provenance and consent — where the data actually came from and whether its use was allowed. Lesson 8 covers data quality specifically for machine learning. Lesson 9 covers how bias enters through the data itself. Lesson 10 covers labeling. Lesson 11 covers synthetic data, which raises a different set of governance questions than data about real people.

## Key terms

| Term | Meaning |
|---|---|
| Training data | The dataset used to teach a model the patterns it will later apply to new inputs |
| Repurposing | Using data collected for one purpose to train a model for a different purpose |
| Baked in | The idea that training data's influence becomes embedded in model parameters, not removable by deleting a row |

## Lab

For any dataset you know your organization holds (customer records, support tickets, sensor logs, anything), write one paragraph: if someone wanted to use this dataset to train a model tomorrow, what's the first governance question from this lesson's list that nobody currently has a documented answer to?

## Check yourself

Can you explain, in your own words, why "baked in" changes how governance has to treat training data differently from a dataset sitting in a table?
