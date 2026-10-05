# Lesson 9 — Bias in Data

**Chapter 2 · Data for AI · Lesson 9 of 30**

## What you'll learn

- Four specific ways bias enters through the data itself, before a model ever gets trained
- How this connects back to the completeness dimension from Lesson 8
- Why a model can be accurate overall and still biased against a specific group
- What a governance response to data bias actually looks like, in practice

## Bias starts in the data, not in the algorithm

Lesson 3 introduced bias as one of the four major AI risk categories. This lesson goes one level deeper into where it actually originates: overwhelmingly, in the data a model is trained on, before any algorithm is involved. A learning algorithm doesn't invent bias out of nothing — it finds and reinforces patterns that are already present in what it's shown.

## Four ways bias enters through data

- **Historical bias.** The data accurately reflects decisions made in the past, and those past decisions themselves were unequal. A model trained on this data learns to repeat the historical pattern, not to correct it — accuracy against history isn't the same as fairness.
- **Sampling bias.** The population represented in the training data doesn't match the population the model will actually be used on. A model trained mostly on one group's data and then applied to a broader population will tend to perform less reliably for the groups it saw less of — a direct consequence of the completeness dimension from Lesson 8.
- **Measurement bias.** The data uses a proxy for the thing it's actually trying to measure, and that proxy doesn't mean the same thing for everyone. A model "measuring" creditworthiness through a variable that's really tracking something else entirely can systematically disadvantage people for whom that proxy doesn't hold.
- **Label bias.** When humans assign the labels a model learns from, their own judgments and inconsistencies become part of the ground truth the model treats as objectively correct. Lesson 10 covers labeling governance in depth.

## Accurate overall, biased for a subgroup

A model can score well on an overall accuracy metric while performing meaningfully worse for a specific subgroup, because the overall number averages across everyone. This is exactly why bias testing has to look at subgroup performance specifically, not just the aggregate number — a model's single accuracy score can hide exactly the problem governance exists to catch.

## What a governance response looks like

Catching bias in data, rather than only in a model's final behavior, means asking the representation and proxy questions before training: Does this training population resemble the population the model will serve? Are there known historical inequities baked into this data's outcomes? Is any variable in here standing in for something it shouldn't? None of these require advanced statistics to ask — they require someone being assigned to ask them, and documenting the answer, before the data is approved for training.

## Key terms

| Term | Meaning |
|---|---|
| Historical bias | Training data accurately reflecting past decisions that were themselves unequal |
| Sampling bias | A mismatch between the population represented in training data and the population a model is used on |
| Proxy variable | A stand-in measurement used because the real thing is hard to measure directly, which may not mean the same thing for everyone |

## Lab

Pick one of the four bias types from this lesson. Write one paragraph describing a plausible scenario where that specific type could enter a training dataset for a system your organization might realistically use, and what governance question would have caught it before training.

## Check yourself

Can you name the four ways bias enters through data from this lesson, and explain why a model can be accurate overall while still being biased against a specific subgroup?
