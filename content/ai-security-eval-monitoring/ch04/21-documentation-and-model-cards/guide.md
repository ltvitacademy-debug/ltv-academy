# Lesson 21 — Documentation & Model Cards

**Chapter 4 · Responsible AI & Governance · Lesson 21 of 25**

## What you'll learn

- Why "the model works" isn't the same claim as "the model is documented"
- Where the model card format actually comes from, and why it became a real industry standard
- The sections a real model card contains, and what each one is actually for
- How a model card turns everything from Lessons 7-20 into something another person can act on without re-deriving it

## Why documentation is its own deliverable

Everything this course has built — eval datasets, red-teaming results, drift baselines, bias tests, compliance posture — lives in someone's head or in scattered files unless it's written down somewhere a new team member, an auditor, or a downstream user of the model can actually find it. "The model works" is a claim about behavior; a model card is what lets someone else verify that claim without re-running every eval themselves.

## Where this format comes from

The model card format isn't something invented for this course — it comes from "Model Cards for Model Reporting," a 2019 paper by Margaret Mitchell and coauthors at Google, and it's since become close to a de facto standard: Hugging Face requires one for every model hosted on its hub, and the structure maps closely onto what the EU AI Act's documentation requirements (Lesson 20) actually ask for.

## What a real model card contains

```text
Model Details     — architecture, version, training date, license
Intended Use       — what it's for, and explicitly what it's NOT for
Training Data       — sources, known gaps or imbalances
Evaluation Results    — the metrics from Ch.2's evals, with numbers
Ethical Considerations  — bias findings (Lesson 18), known risks
Caveats & Limitations    — where it's known to fail or underperform
```

Each section answers a question someone will actually ask: "Is this safe to use for X?" (Intended Use), "Why does it behave oddly on Y kind of input?" (Training Data gaps), "What was it actually tested against?" (Evaluation Results, pulling straight from Lesson 8's metrics and Lesson 10's regression suite).

## "Intended use" is doing more work than it looks like

The Intended Use section is where a huge amount of real-world harm gets prevented cheaply: a model fine-tuned and evaluated for internal document summarization, deployed without documentation into a customer-facing support role it was never tested for, is a known pattern behind real AI incidents (Lesson 22). Writing "not evaluated for: medical, legal, or financial advice" costs one sentence and closes off a category of foreseeable misuse.

## A model card isn't a one-time artifact

A model card written at launch and never touched again goes stale the moment the model is retrained, the moment drift (Lesson 15) is detected, or the moment a new eval result changes what's actually true about the system. Treating it as a living document — updated whenever something in it would otherwise be a lie — is what keeps it worth trusting.

## Key terms

| Term | Meaning |
|---|---|
| Model card | A structured document reporting a model's details, intended use, training data, evaluation results, and limitations |
| Intended use | The explicit statement of what a model was (and wasn't) evaluated and approved for |
| Living document | A model card updated whenever the model's real behavior or status changes |

## Lab

Pick any AI feature you've used or built. Draft a one-paragraph "Intended Use" section for it: what it's actually for, and at least two things it should explicitly NOT be used for.

## Check yourself

Can you explain why a model card's "Intended Use" section can prevent real-world harm even though it contains no code and changes nothing about how the model actually behaves?
