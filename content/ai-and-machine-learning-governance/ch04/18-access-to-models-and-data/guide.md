# Lesson 18 — Access to Models and Data

**Chapter 4 · Security, Access and Monitoring · Lesson 18 of 30**

## What you'll learn

- Why an AI system has more distinct access surfaces than most people assume
- How least privilege applies differently to training data, model weights, and a live inference endpoint
- A concrete example of why "can run inference" and "can see training data" are different permissions
- What to actually log and review once access is granted

## More surfaces than people assume

Ask someone "who has access to the fraud model," and most people answer as if there's one access point to control. In practice there are at least four, each with a different blast radius if it's mishandled:

- **Training data** — the raw and feature-engineered data the model learned from, often including sensitive or regulated fields
- **Model weights / artifacts** — the trained model file itself, which can be extracted, copied, or reverse-engineered if it leaks
- **Model registry entry** — the metadata, version history, and documentation (Lessons 12-13), which reveals how the model works even without the weights
- **Inference endpoint** — the live API or service that actually runs predictions, which is what most "users" of the model actually touch

Treating these as one access point means either over-granting (everyone who needs predictions also gets the raw training data) or under-granting (a legitimate reviewer can't see the documentation they need). Neither is governance — it's just different flavors of not thinking about it.

## Least privilege, applied to each surface

Least privilege means a principal gets exactly the access needed for their role, nothing more. Applied here:

- A customer-facing application calling the model for a prediction needs **inference access only** — it has no business touching training data or the raw model file.
- A data scientist retraining the model needs **training data and registry write access**, but not necessarily production inference credentials.
- A risk reviewer approving a version (Lesson 16) needs **read access to the registry, documentation, and evaluation results** — not the raw training data, and not the ability to modify the model.
- An ML engineer debugging a production issue needs **inference logs and model metadata**, which is a different permission than "can retrain the model."

This is the same principle Chapter 3 of Data Governance Foundations already covers for tables and files — the only thing that changes for AI is how many more distinct surfaces exist under one model's name.

## Why the distinction actually matters

Consider a real, common shape of mistake: an internal dashboard is built to show business users "why" a model made a decision, and to make that easy, the engineer wires it up with the same service account that has full training-data access, because it was already available. Now every business user with dashboard access can, in principle, pull the raw training data — including whatever regulated fields it contains — through a feature that was only ever supposed to explain predictions. Nobody intended that outcome; it happened because "access to the model" was treated as one undifferentiated thing instead of four.

## What to log and review

Granting the right access isn't the end of the job — it's the start of an ongoing one:

- **Log every access to training data and model weights**, not just inference calls
- **Review registry and endpoint permissions on a cadence**, the same way table grants get reviewed (Data Governance Foundations, Chapter 4)
- **Tie access to the risk tier** (Lesson 24) — a high-risk model's access list deserves more frequent review than a low-risk internal one
- **Revoke access when a role changes**, not just when someone leaves the organization entirely

## Key terms

| Term | Meaning |
|---|---|
| Inference access | Permission to call a model's live endpoint and receive predictions, without access to its weights or training data |
| Least privilege | Granting a principal only the access their role actually requires, nothing more |
| Model artifact | The trained model file itself (weights), distinct from its registry metadata or its live endpoint |
| Access review | A periodic check that existing grants still match the access a principal's current role actually needs |

## Lab

For the fraud-detector model used in earlier lessons, list who at a plausible organization would need each of the four access surfaces (training data, weights, registry entry, inference endpoint) and what access level each needs. Flag any role on your list that you'd expect, in practice, to be over-granted.

## Check yourself

Can you name the four distinct AI access surfaces this lesson describes, and explain — using the dashboard example — how treating "access to the model" as one undifferentiated permission leads to an unintended data exposure?
