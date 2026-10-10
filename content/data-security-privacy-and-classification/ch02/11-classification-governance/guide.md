# Lesson 11 — Classification Governance

**Chapter 2 · Classification · Lesson 11 of 30**

## What you'll learn

- Why a classification program degrades over time if nothing governs it after the initial labeling push
- The four roles a real classification governance program assigns, and what each one actually owns
- Classification drift: what it is, why it happens, and how periodic re-review catches it
- How this chapter's work connects into Chapter 3's access controls

## Labeling everything once is not the hard part

Lessons 7 through 10 covered what a classification scheme is, how labels get applied, and how they're supposed to travel with data as it moves. None of that holds up on its own over time. A one-time project to classify every existing dataset is real, visible work — and it's also the easy part. The hard part is keeping those labels accurate as new data gets created daily, existing data changes shape, and the people who originally applied a label move to different roles or leave entirely. **Classification governance** is the ongoing program that keeps a classification scheme meaningful after the initial rollout, rather than letting it quietly go stale.

## Four roles, four jobs

A real classification governance program assigns the work across distinct roles, so that no single step depends on one person's memory or goodwill:

- **Data owner.** The person (usually a business-side role, not IT) accountable for a specific dataset and responsible for deciding what classification it should carry. The data owner makes the call; they don't necessarily do the technical tagging themselves.
- **Data steward.** The person who actually applies the classification in practice — tagging the dataset in the catalog or platform, keeping the label current as the data owner's decisions change, and acting as the point of contact for questions about that dataset's classification.
- **Data custodian.** The technical role (often IT or a platform team) responsible for implementing whatever controls a classification level actually requires — the encryption, the access restriction, the logging — once a label says it's needed. The custodian doesn't decide the classification; they make the classification's consequences real.
- **Governance committee or data governance office.** The body that owns the classification scheme itself — the tier definitions, the label names, how disputes between a data owner and a steward get resolved, and whether the scheme needs to change organization-wide.

Splitting the work this way is deliberate: it means a classification decision (owner), its technical application (steward), its enforcement (custodian), and the rules everyone is following (governance committee) are each owned by someone with the right authority and the right skill set for that specific job — rather than one person being expected to be accountable for the business risk, fluent in the tagging tooling, and responsible for configuring encryption, all at once.

## Classification drift

**Classification drift** is what happens when a dataset's actual sensitivity and its applied label quietly stop matching each other. It happens for ordinary, unglamorous reasons: a table that started out holding only aggregate statistics gets a new column added that includes individual-level data, and nobody revisits its Internal label. A dataset that was genuinely Confidential when a product was new becomes effectively public information once the company publishes the same numbers in an earnings report, and the old label never gets downgraded. A steward who understood exactly why a dataset was labeled a certain way leaves the company, and the next person treats the label as settled fact rather than something that might need revisiting.

None of these are failures of the classification scheme itself — the four-tier model from Lesson 8 is still perfectly sound. They're failures of governance: nothing in the process forced anyone to go back and check whether an existing label was still correct.

## Periodic review is the fix

The standard governance answer to drift is a scheduled, recurring review — not a one-time audit, but a calendar-driven obligation, often owned by the data steward and reported up to the governance committee: Restricted-tier data reviewed most frequently (e.g., quarterly), down to Public-tier data reviewed least frequently (e.g., annually or not at all, since there's little harm in an outdated Public label). The review asks a short, consistent set of questions for each dataset: has its structure changed since the last review, is the original business justification for its current label still accurate, and has anything newly entered the dataset that the original label didn't anticipate.

This is a genuine trade-off, not a free improvement — review cycles consume real steward time, so an organization has to calibrate how often is often enough without burning out the people doing the reviewing. The highest-risk tiers earn the most frequent attention precisely because that's where the cost of an undetected drift is highest.

## Where this hands off

Chapter 2 has now covered the full lifecycle of a label: the scheme itself (Lesson 8), finding the data to apply it to (Lesson 9), actually applying it (Lesson 10), and keeping it accurate over time (this lesson). None of that labeling work matters if nothing downstream reads the label and acts on it — which is exactly where Chapter 3 picks up. Access Governance, starting next lesson, is the first of several controls that take a classification label as an input and turn it into an actual access decision.

## Key terms

| Term | Meaning |
|---|---|
| Classification governance | The ongoing program that keeps classification labels accurate after the initial labeling effort |
| Data owner | The accountable business-side role who decides what classification a dataset should carry |
| Data steward | The role who applies and maintains a classification label in practice |
| Data custodian | The technical role who implements the controls a classification level requires |
| Classification drift | A dataset's actual sensitivity and its applied label quietly falling out of sync over time |
| Periodic classification review | A scheduled, recurring check of existing labels, cadence set by tier risk, to catch drift |

## Lab

Take the customer table from Lesson 10's lab (name, email, SSN — Restricted). Walk through a realistic drift scenario: six months later, a well-meaning analyst adds a new column with each customer's health-insurance plan selection, without telling anyone. Identify which of the four roles (owner, steward, custodian, governance committee) should have caught this at the next periodic review, what question in that review would have surfaced it, and what should happen to the table's classification once it's caught.

## Check yourself

Can you name the four classification governance roles and explain what each one is actually accountable for? Can you describe, with a concrete example, how classification drift happens even when the original classification scheme and labeling were done correctly — and why a scheduled review cadence, rather than a one-time audit, is the standard fix?
