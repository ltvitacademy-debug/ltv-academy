# Lesson 5 — AI and Existing Data Governance

**Chapter 1 · AI Governance Foundations · Lesson 5 of 30**

## What you'll learn

- How this course builds directly on Data Governance Foundations and Data Quality Management
- What carries forward unchanged, and what AI specifically adds on top
- Why skipping straight to "AI governance" without those foundations usually fails
- A concrete checklist for what a model needs that a plain dataset didn't

## This course doesn't start from zero

If you've worked through Data Governance Foundations and Data Quality Management elsewhere in this catalog, you already have the base this entire course builds on. Data Governance Foundations established the core idea: decision rights, accountability, and agreed-upon rules over data, carried out through owners, stewards, councils, policies, and standards. Data Quality Management established how to actually judge whether data is good enough to rely on, using concrete dimensions like accuracy, completeness, consistency, validity, uniqueness, and timeliness. Neither of those gets thrown out here. Both get extended.

## What carries forward unchanged

The organizational machinery doesn't need to be reinvented for AI:

- **Roles.** Data owners and stewards from Data Governance Foundations still own the datasets that feed a model. AI governance adds model owners and validators on top — it doesn't replace the data-side roles.
- **Policies and standards.** An organization's existing data classification, naming, and handling standards still apply to a dataset whether it ends up in a dashboard or a model's training set.
- **Quality dimensions.** The same six dimensions from Data Quality Management — accuracy, completeness, consistency, validity, uniqueness, timeliness — still define what "good data" means. Lesson 8 applies them specifically to training data for machine learning.

## What AI adds on top

Three things don't have a direct equivalent in plain data governance, and this course spends most of its remaining chapters on them:

1. **The model as a new kind of asset.** A dataset sits still until someone queries it. A model acts continuously, on its own, once deployed. Chapter 3 covers governing that.
2. **Training-specific data concerns.** Provenance and consent (Lesson 7) and labeling (Lesson 10) matter more intensely for training data than for a report, because the data doesn't just get read — it gets baked into the model's permanent behavior.
3. **Production behavior monitoring.** A bad report gets corrected when someone notices. A model's behavior has to be actively watched for drift and misuse, covered in Chapter 4.

## Why skipping the foundations fails

An organization that tries to "do AI governance" without first having working data governance ends up building model-specific controls on top of data nobody can vouch for in the first place — approving a model's fairness testing while nobody can say where its training data actually came from. The foundation has to hold before the layer on top of it means anything.

## Key terms

| Term | Meaning |
|---|---|
| Data governance foundation | The owners, stewards, councils, policies, and standards this course assumes are already in place |
| Quality dimensions | The six measures (accuracy, completeness, consistency, validity, uniqueness, timeliness) that define "good data," reused here for training data |
| Model as an asset | The idea that a deployed model, unlike a dataset, acts continuously and needs its own governance layer |

## Lab

List three things your organization's existing data governance program (or the closest thing to one) already has in place — a policy, a role, a standard, anything. For each, write one sentence on whether and how it would need to extend to cover an AI model, not just a dataset.

## Check yourself

Can you name the two courses this lesson says AI governance builds on, and give one concrete example of something that carries forward unchanged versus something AI adds on top?
