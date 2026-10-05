# Lesson 4 — AI Governance Roles

**Chapter 1 · AI Governance Foundations · Lesson 4 of 30**

## What you'll learn

- The roles an AI governance program typically assigns, beyond "the data science team"
- How these roles extend familiar data governance roles (owner, steward, council) rather than replacing them
- Why independent review of a model matters, separate from the people who built it
- Where business, legal, and technical accountability each sit

## Roles that extend familiar ones

If you've studied data governance roles already — data owners, data stewards, governance councils — AI governance roles will look like close relatives, applied one layer up, to models instead of datasets.

- **Model owner.** The business-side person accountable for a specific model's behavior and outcomes in production — similar to how a data owner is accountable for a dataset, but here the "asset" is a model's decisions. The model owner isn't necessarily the person who built the model; often they're the business leader whose process the model supports.
- **Model builder (data scientist / ML engineer).** The technical role that develops and trains the model. Equivalent in spirit to the technical steward role in data governance, but focused on model artifacts rather than data records.
- **Independent validator.** A role (or function) separate from the build team that reviews a model before it's trusted with real decisions — checking it for the four risk categories from Lesson 3, among other things. Independence matters here for the same reason financial auditors aren't the same people who prepared the books: the people closest to building something are the least likely to catch their own blind spots.
- **AI governance council or committee.** The cross-functional group — often including legal, compliance, risk, and senior business leaders — that approves new AI use cases, sets policy, and reviews incidents. This plays the same role an existing data governance council already plays, just with AI-specific items on its agenda.
- **Legal and compliance.** Responsible for understanding what laws and regulations might apply to a specific use case (Chapter 5 covers this at a general level) and flagging it before deployment, not after.

## Why independence matters specifically here

Because a model's behavior isn't written down as explicit, readable logic, the people who built it are working from the same blind spots that produced the model in the first place — if their intuition about what "normal" data looks like was off, they may not notice the model picked up that same skew. An independent validator isn't there because the builders are untrustworthy; they're there because nobody can fully audit their own work on something this opaque.

## Where accountability actually sits

A useful rule of thumb: the model owner is accountable for the outcome in the business sense (did this model's decision cause a problem, and what do we do about it), the model builder is accountable for the technical quality of the artifact (was it built and tested correctly), and the council is accountable for whether the use case should have been approved at all. Confusing these three, or leaving any of them unassigned, is one of the most common gaps found when an AI governance program is audited.

## Key terms

| Term | Meaning |
|---|---|
| Model owner | The business-side role accountable for a model's outcomes in production |
| Independent validator | A reviewer separate from the build team who checks a model before deployment |
| AI governance council | The cross-functional group that approves AI use cases and sets policy |

## Lab

For the AI/ML system you picked in Lesson 1 or 2's lab, write down who (by name, role, or "unknown") currently fills each of these: model owner, model builder, independent validator, and governance council. If any are "unknown" or "nobody," that's the gap this lesson is pointing at.

## Check yourself

Can you name the four roles from this lesson and explain, in one sentence each, what each one is accountable for?
