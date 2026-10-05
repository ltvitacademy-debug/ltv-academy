# Lesson 1 — What AI Governance Is

**Chapter 1 · AI Governance Foundations · Lesson 1 of 30**

## What you'll learn

- A working definition of AI governance that builds directly on data governance
- The three things AI governance actually covers: training data, models, and the decisions models make
- Why AI governance is not a separate department from data governance, but an extension of it
- The roadmap for the rest of this 30-lesson course

## A working definition

AI governance is the system of decision rights, accountability, and controls that determines how an organization sources data for AI, builds and validates models, and takes responsibility for the decisions those models make once they're running in production. If that sounds familiar, it should — it's the same core idea as data governance (decision rights, accountability, agreed-upon rules) applied to a new kind of asset: systems that learn patterns from data and then act on those patterns automatically, at scale, often without a human reviewing each individual output.

AI governance is not a checklist you run once before launch, and it isn't a job for a single "AI ethics" person working alone. It's an ongoing set of agreements — who approved this model, who's accountable if it's wrong, what data it was allowed to learn from, and how anyone would even find out if something went off track.

## The three things AI governance covers

Most of what AI governance does falls into three buckets, and this course is roughly organized around them:

1. **The data going in.** What data trained the model, where it came from, whether the organization had the right to use it, and whether it was good enough quality to learn the right patterns from. Chapter 2 covers this in depth.
2. **The model itself.** How it was built, documented, tested, versioned, and approved before anyone trusted it with a real decision. Chapter 3 covers this.
3. **The decisions and outputs coming out.** What the model is allowed to decide on its own, what gets monitored, and what happens when it's wrong, drifts, or gets attacked. Chapters 4 and 5 cover this.

## Why this isn't a brand-new discipline

If your organization already has a working data governance program — owners, stewards, policies, a council that reviews new uses of data — you are not starting from zero. AI governance extends that same structure to cover two things data governance alone doesn't fully address: the behavior of a trained model (which isn't written down anywhere as explicit logic) and decisions made automatically, continuously, without a human in the loop for each one. Lesson 5 goes deeper on exactly how this course's earlier material — Data Governance Foundations and Data Quality Management — carries forward into AI.

## Where this course goes from here

Chapter 1 (this chapter) stays conceptual: what AI governance is, why it's needed, the major risk categories, the roles involved, and how it connects to data governance you may already know. Chapter 2 covers governing the data that trains models. Chapter 3 covers governing the models themselves — documentation, inventories, lineage, versioning, approval. Chapter 4 covers security, access, and production monitoring. Chapter 5 covers responsible AI principles, risk management, and named frameworks and regulations at a general level. Chapter 6 applies all of it to realistic case studies and to building a program from scratch.

## Key terms

| Term | Meaning |
|---|---|
| AI governance | The system of decision rights, accountability, and controls over how AI is built, data-fed, and trusted with decisions |
| Model | The trained artifact that takes an input and produces a prediction, classification, or generated output |
| AI lifecycle | The full path from data sourcing through model development, validation, deployment, monitoring, and retirement |

## Lab

Pick one AI or machine learning system you know is in use at your organization (or a past employer, or even a consumer product you use) — a recommendation engine, a fraud filter, a resume screener, a chatbot, anything. Write one paragraph answering: what is it allowed to decide on its own, and who — specifically, by name or role — is currently accountable if it decides wrong? If you genuinely don't know who's accountable, say so. That gap is itself the finding.

## Check yourself

Can you state, in one sentence, what AI governance covers, and name the three areas (data in, the model itself, decisions out) this course is organized around?
