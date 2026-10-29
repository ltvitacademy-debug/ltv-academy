# Lesson 4 — Where AI Security Overlaps with Everything You Already Know

**Chapter 1 · AI and LLM Security Fundamentals · Lesson 4 of 4**

## What you'll learn

- Why AI security is best understood as an extension of disciplines
  you already practice, not a separate field requiring you to start
  over
- How API security, data classification, supply chain security, and
  identity/access control each map directly onto specific OWASP LLM
  Top 10 and NIST AI RMF concerns from this chapter
- Where the genuinely new work sits, layered on top of those
  fundamentals, so you know exactly what to add to your existing
  skill set rather than replace

## The reframe this chapter has been building toward

Lessons 1 through 3 covered what's genuinely new: natural language as
a command channel, non-deterministic output, training data and model
weights as assets, the real OWASP LLM Top 10 categories, and NIST's
Govern/Map/Measure/Manage functions. None of that erases the security
disciplines you've already built. This lesson closes the chapter by
showing, concretely, how each one still does real work in an AI
system — and exactly where the new layer attaches to it.

## API security

Every LLM feature you'll secure is, underneath, an API call — to a
hosted model provider, a self-hosted inference endpoint, or both.
Everything you already know about API security still applies in
full: authenticate every caller, enforce authorization on what data
and tools a given caller's requests can touch, rate-limit to control
cost and abuse, and log every request for audit. What's new is what
that API call *contains*: the prompt itself is attacker-reachable
natural language (Prompt Injection), and the response needs the same
untrusted-input treatment on the way back out (Insecure Output
Handling) before anything downstream consumes it. The API security
fundamentals don't change — you're applying them to a payload that
now needs more scrutiny than a typical JSON body.

## Data classification

Data classification — knowing what data is sensitive and applying
controls accordingly — now has to extend to a dataset most
organizations never tracked that way before: whatever data goes into
training or fine-tuning a model, and whatever data a retrieval
system feeds into a model's context at query time. If classified or
regulated data ends up in training data, it's at risk of resurfacing
through model memorization (Sensitive Information Disclosure). If an
agent's retrieval step can pull from a data source the requester
isn't authorized to see, that bypasses access control you already
enforce everywhere else. The discipline is the same: know what's
sensitive, control who and what can touch it. The scope of "what
touches it" just grew to include training pipelines and retrieval
systems.

## Supply chain security

You already evaluate third-party libraries and packages for known
vulnerabilities, pinned versions, and provenance. AI systems add a
parallel supply chain: foundation models, fine-tuned checkpoints,
datasets, embedding models, and plugins pulled from public hubs,
each with its own provenance question — who trained it, on what
data, with what known weaknesses. OWASP's Supply Chain Vulnerabilities
category and NIST's Map function both point at the same practice you
already run for open-source dependencies: know what you're pulling
in, verify its source, and track it for known issues over time.

## Identity and access control

Agentic AI systems — models wired to tools that take real actions —
make least-privilege access control more important, not less. An
agent should hold only the permissions its specific task requires,
scoped and time-limited the same way you'd scope a service account,
because Excessive Agency is precisely what happens when that
discipline is skipped. The model being manipulated by a prompt
injection is the attack; an over-permissioned agent executing the
attacker's request as a real action is the consequence. Access
control doesn't need a new theory for AI — it needs the same
rigor you'd apply to any other service account, applied without
skipping it just because a model is in the loop.

## What's genuinely added on top

Across all four disciplines, the pattern repeats: the fundamental
practice stays the discipline you already know, and the new work is
scoping it to cover an additional surface — the prompt and response
payload, the training and retrieval data pipeline, the model and
plugin supply chain, the agent's own credentials. That's the
practical takeaway for this whole chapter: AI security engineering is
mostly applying security disciplines you already have to a new kind
of component, plus a focused set of genuinely new concerns — prompt
injection, output handling, training data integrity, and agent
autonomy — that sit on top of them.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege (for agents) | Scoping an AI agent's permissions to exactly what its task requires, time-limited like any other service account |
| Retrieval data exposure | A retrieval-augmented system pulling data into a model's context that the requester isn't authorized to see |
| AI supply chain | Foundation models, fine-tuned checkpoints, datasets, and plugins sourced from third parties, each carrying its own provenance risk |
| Extension, not replacement | The core idea that AI security applies existing disciplines to a new surface rather than requiring an entirely separate field |

## Check yourself

You're ready to move on when you can take any one OWASP LLM Top 10
category from Lesson 2 and name the traditional security discipline
it most directly extends, and explain in one sentence what's
specifically new about applying that discipline to an AI system.
