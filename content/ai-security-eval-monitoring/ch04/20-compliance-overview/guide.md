# Lesson 20 — Compliance, Overview: AI-Specific Regulations

**Chapter 4 · Responsible AI & Governance · Lesson 20 of 25**

## What you'll learn

- Why "compliance" for an AI system means something broader than data-protection law alone
- The two real, currently active regulatory frameworks most relevant to an AI engineer — at a conceptual level, not as legal advice
- How risk-tiering works as a regulatory approach, and why it changes what "compliant" even means per use case
- Why this is the one lesson in the course where the honest answer is often "check with counsel," not a confident technical rule

## An important hedge before anything else

This lesson is not legal advice, and AI regulation is a genuinely fast-moving area — specific requirements, enforcement dates, and even which systems are in scope can change. The goal here is conceptual fluency: knowing the shape of the landscape so you can ask the right questions and recognize when a project needs real legal review, not memorizing clauses as if they were static facts. Lessons 13 and 19 built the technical habits (responsible logging, PII redaction); this lesson is about the regulatory reasons those habits exist.

## GDPR: not AI-specific, but AI-relevant

The EU's General Data Protection Regulation predates the current wave of generative AI, but it applies directly to any system — AI or not — that processes personal data of EU residents. A few GDPR concepts map onto exactly what earlier lessons covered:

- **Data minimization** — collect and retain only what's needed, which is the same principle behind Lesson 13's "omit what you don't need to keep."
- **The right to explanation** — in certain automated-decision contexts, a person can ask why a system made a decision about them, which is hard to answer for a system with no documentation (Lesson 21).
- **Purpose limitation** — data collected for one purpose (say, support chat) generally can't be silently repurposed for another (say, model training) without a separate legal basis.

## The EU AI Act: the first AI-specific regulatory framework

The EU AI Act, unlike GDPR, is specifically about AI systems, and its core idea is **risk-tiering**: obligations scale with how much potential harm a system's use case carries, not with the technology itself.

```text
Unacceptable risk  — banned outright
                      (e.g., social scoring by governments)

High risk          — heavy obligations: documentation,
                      human oversight, risk management
                      (e.g., hiring, credit, law enforcement)

Limited risk        — transparency obligations
                      (e.g., disclose that a user is talking to AI)

Minimal risk         — largely unregulated
                      (e.g., an AI-powered spam filter)
```

The practical implication: the same underlying model can face completely different compliance obligations depending on what it's being used for. A model used for a game's NPC dialogue and the same model fine-tuned for a hiring screen sit in different tiers entirely.

## Why this connects back to the rest of the course

Every earlier lesson in this chapter builds toward being able to answer a compliance question honestly: Lesson 18's bias testing is part of what "high risk" obligations actually ask for; Lesson 19's PII handling is part of what GDPR's data minimization expects in practice; Lesson 21's model cards are close to what AI Act documentation requirements describe. Compliance isn't a separate checkbox exercise bolted on at the end — it's largely asking for the same engineering discipline this course has been building, with legal consequences attached.

## Key terms

| Term | Meaning |
|---|---|
| Risk-tiering | A regulatory approach where obligations scale with a use case's potential harm, not the technology itself |
| Data minimization | Collecting and retaining only the personal data actually needed |
| Purpose limitation | Data collected for one purpose generally can't be silently reused for another |

## Lab

Pick an AI feature you've used or built. Without looking anything up, guess which EU AI Act risk tier it would likely fall into and why. Then note one question you'd actually need a lawyer (not this course) to answer with confidence.

## Check yourself

Can you explain why the EU AI Act's risk-tiering means the same underlying model could have very different compliance obligations depending on how it's deployed — and why that makes "is my AI compliant?" an incomplete question on its own?
