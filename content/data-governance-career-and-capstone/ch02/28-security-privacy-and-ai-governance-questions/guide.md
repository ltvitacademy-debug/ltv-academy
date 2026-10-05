# Lesson 28 — Security, Privacy and AI Governance Questions

**Chapter 2 · Career Preparation · Lesson 28 of 35**

## What you'll learn

- How interviewers test data security and access-control knowledge for
  a governance role — not as a security engineer, but as the person
  who defines the policy security teams implement
- How interviewers test privacy knowledge — PII identification,
  regulatory basics, and data subject rights
- How interviewers test AI governance knowledge — the newest category
  most governance job postings now include
- How to answer a scenario-based question in this space without
  pretending to be a security, legal, or machine-learning specialist

## Why this category exists alongside the others

Earlier lessons in this chapter covered general governance scenarios,
data-quality-and-SQL questions, and metadata/lineage questions. This
lesson covers three topics that now show up in almost every governance
interview: security, privacy, and — increasingly — AI governance. You
are not expected to answer these the way a security engineer, a
privacy lawyer, or an ML engineer would. You're expected to answer as
the governance professional who understands the policy, risk, and
accountability layer that sits *around* those specialists' work, and
who knows when to say "that's a question for security/legal/the
model's owning team" rather than guessing.

## Security and access questions

| Question | What it's really testing |
|---|---|
| "How would you decide who should have access to a sensitive customer table?" | Whether you reason from least privilege and role-based access — access tied to job function, not individual requests |
| "What's the difference between data governance and data security?" | Whether you can draw the line: governance defines *who should* have access and *why*; security teams implement and enforce *how* that access is technically controlled |
| "A business user asks you to grant them access to a dataset classified as restricted. What do you do?" | Whether you follow a documented access request and approval process instead of granting access informally because someone asked nicely |
| "What's the difference between masking and encryption, and why would a policy call for one over the other?" | Whether you understand masking hides a value in use (for non-production or limited-visibility cases) while encryption protects data at rest or in transit — and that a policy, not a single tool, decides which applies where |
| "How would you handle a request to run a periodic access review?" | Whether you know access reviews are a recurring governance control, not a one-time setup step — access granted for a now-finished project should eventually be revoked |

## Privacy and regulatory questions

| Question | What it's really testing |
|---|---|
| "How would you identify PII in a dataset you've never seen before?" | Whether you know to start with column names and sampling, not assumptions — and that PII includes less obvious fields (device IDs, precise location, IP address) alongside the obvious ones (name, SSN, email) |
| "What's the difference between GDPR and CCPA, at a level you'd explain to a business stakeholder?" | Whether you can give a plain-language distinction — GDPR is the EU's broad regulation covering most personal data processing; CCPA is a California law giving residents specific rights over their personal information — without pretending to be a lawyer reciting statute text |
| "What's a data subject access request, and what's your role in handling one?" | Whether you understand a data subject request (a person asking what data a company holds on them, or asking for it to be deleted) is a governance-coordinated process — you likely don't personally delete the data, but you know where it lives and who executes the request |
| "How would you classify a dataset that mixes PII with non-sensitive operational data?" | Whether you classify at the right grain — the sensitive columns drive the classification level, not the dataset's average row |
| "Why does a retention policy matter for privacy, not just storage cost?" | Whether you know that holding personal data longer than necessary is itself a privacy risk — most privacy regulations expect data to be kept only as long as there's a legitimate purpose for it |

## AI governance questions

| Question | What it's really testing |
|---|---|
| "What's different about governing an AI/ML system compared to governing a regular reporting dataset?" | Whether you can name that AI governance adds model-specific concerns on top of data governance — training data provenance, bias, model documentation, drift monitoring — rather than treating a model like just another report |
| "What's a model card, and why would a governance program care about one?" | Whether you know a model card is a structured document describing a model's purpose, training data, known limitations, and intended use — the AI-governance equivalent of a data dictionary entry |
| "How would you think about bias in a dataset used to train a model?" | Whether you understand bias can be introduced by what data was collected, who it represents, and how it was labeled — and that catching it is a data-governance concern as much as a data-science one |
| "A business team wants to use a generative AI tool on customer data. What governance questions would you ask before approving it?" | Whether you'd ask about data classification (is this data allowed to leave the environment it's in), vendor data-handling terms, and whether outputs need human review — rather than approving or blocking by instinct |
| "What's your role, as a governance analyst, in an AI incident — say a model producing a biased or clearly wrong output?" | Whether you know your role is usually coordinating the response and documentation (what happened, what data/model was involved, who's accountable) rather than personally retraining the model |

## Answering without overclaiming expertise

The strongest answers in this category do two things at once: show you
understand the governance angle clearly, and are honest about where
your role ends. A good answer to the generative-AI scenario above
sounds like: "I'd check the data classification first — if the
customer data is restricted, it likely can't go into a tool without a
reviewed vendor agreement. I'd loop in security and legal on the
vendor terms, and I'd want human review on the outputs before they're
used in anything customer-facing." That answer is confident about the
governance questions and appropriately specific about who else needs
to be involved — it doesn't pretend you'd personally audit the
vendor's model weights.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting only the access a role actually needs to do its job — the default reasoning for most access questions |
| Data subject request | A person's request to know, correct, or delete the personal data an organization holds about them |
| Model card | A structured document describing a model's purpose, training data, and known limitations |
| Data classification | The sensitivity label (public, internal, confidential, restricted, etc.) that drives what handling rules apply to a dataset |

## Lab

Pick one question from each of the three tables above (security,
privacy, AI governance) and write a short, spoken-style answer to
each — 3-5 sentences, as if answering out loud. For at least one
answer, explicitly name another role or team you'd loop in (security,
legal, the model's owning data-science team) rather than claiming
you'd personally handle every part of it yourself.

## Check yourself

You're ready for Lesson 29 when you can answer one security, one
privacy, and one AI-governance scenario question out loud without
notes, and each answer clearly states the governance angle while
naming who else would realistically be involved.
