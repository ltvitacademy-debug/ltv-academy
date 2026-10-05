# Lesson 10 — Data Labeling and Governance

**Chapter 2 · Data for AI · Lesson 10 of 30**

## What you'll learn

- What labeling is and why it's the step where human judgment enters a model most directly
- The governance concerns specific to labeling: consistency, instructions, and who's doing it
- Why labeling instructions deserve to be treated as a governed document, not an informal note
- What to check before trusting a labeled dataset

## What labeling actually is

Many machine learning models are trained using supervised learning: the model is shown examples paired with a "correct answer" — a label — and learns to predict that answer for new, unseen examples. Someone, or something, has to assign those labels in the first place: a photo tagged "contains a stop sign," a support ticket tagged "billing issue," a loan application tagged "defaulted" or "repaid." The model will trust these labels as ground truth. If the labels are wrong, inconsistent, or biased, the model inherits exactly that.

## Why labeling is where human judgment enters

Of every step in building a training dataset, labeling is usually where the most direct human judgment calls happen. Two different labelers can reasonably disagree about whether a comment is "toxic," whether an X-ray shows an anomaly, or whether a transaction looks "fraudulent" — and whichever judgment gets recorded becomes, as far as the model is concerned, the objective truth for that example. This connects directly to the label bias covered in Lesson 9: a labeler's own inconsistency or bias becomes part of what the model learns to reproduce.

## Governance concerns specific to labeling

- **Inter-rater agreement.** When more than one person labels the same data, how often do they agree with each other? Low agreement is a signal that the task itself is ambiguous, or that the instructions given to labelers weren't clear enough — either way, it's worth investigating before trusting the labels.
- **Labeling instructions as a governed artifact.** The instructions given to labelers — what counts as "toxic," what counts as "fraud" — function almost like a policy document: they determine, in practice, what the model will learn to treat as true. Changing the instructions partway through a labeling project without documenting it can silently split a dataset into two inconsistent halves.
- **Who's doing the labeling.** In-house labeling, contracted vendors, and crowdsourced labeling platforms each raise different questions: What training did labelers receive? What data handling agreements govern how they access potentially sensitive data? Is there any accountability for label quality?
- **Label provenance.** Just as raw data has a provenance trail (Lesson 7), labels need one too — which labeler or labeling process produced which label, and under which version of the instructions, so a problem discovered later can be traced back to its source.

## What to check before trusting a labeled dataset

A governed organization doesn't just ask whether data was labeled — it asks whether the labeling instructions are documented, whether agreement between labelers was ever measured, and whether anyone can trace a specific label back to who or what produced it. Absent all three, a "labeled" dataset is really an unverified one.

## Key terms

| Term | Meaning |
|---|---|
| Supervised learning | Training a model on examples paired with a correct-answer label it learns to predict |
| Inter-rater agreement | How consistently multiple labelers agree when labeling the same data |
| Label provenance | The documented trail of which labeler or process produced a given label, and under what instructions |

## Lab

Think of a labeling task you could imagine needing for a model (tagging photos, categorizing support tickets, flagging fraud, anything). Write one paragraph with a labeling instruction you'd give a human labeler for that task, then identify one place in your own instruction where two reasonable people might still disagree.

## Check yourself

Can you explain why labeling instructions deserve to be treated as a governed document, and name the four labeling-specific governance concerns from this lesson?
