# Lesson 6 — Privacy by Design

**Chapter 1 · Sensitive Data Foundations · Lesson 6 of 30**

> **A brief note:** Privacy by Design is a design philosophy and a framework of principles, not a law — the disclaimer that applies to Lessons 4 and 5 is less critical here. Still, because this lesson touches GDPR's own legal text (Article 25), treat anything about actual legal compliance as an orientation overview, not legal advice.

## What you'll learn

- Where "Privacy by Design" comes from, and who created it
- All seven of its Foundational Principles
- How GDPR's Article 25 turned this design philosophy into an actual legal requirement
- Why building privacy in from the start is different from — and cheaper than — bolting it on later

## Where this idea comes from

**Privacy by Design** and its **7 Foundational Principles** were developed by **Ann Cavoukian**, the former Information and Privacy Commissioner of Ontario, Canada. The core idea predates most of today's privacy laws: instead of treating privacy as a compliance checklist applied after a system is built, bake privacy protections into the system's architecture from the very first design decision.

## The 7 Foundational Principles

1. **Proactive, not reactive; preventive, not remedial.** Anticipate and prevent privacy problems before they happen, rather than responding after the fact.
2. **Privacy as the default setting.** A user should get privacy protection automatically, without having to take any action to request it — the system should be private by default, not private only if you dig through settings.
3. **Privacy embedded into design.** Privacy isn't an add-on feature; it's a core part of the system's architecture and functionality from the start.
4. **Full functionality — positive-sum, not zero-sum.** Privacy by Design rejects the idea that you have to trade away functionality (or security) to get privacy. The goal is accommodating both, not picking one.
5. **End-to-end security.** Strong security throughout the entire lifecycle of the data — from collection through use, retention, and secure destruction.
6. **Visibility and transparency.** The system's practices should be visible and verifiable to the people involved — users, operators, regulators — not hidden in fine print.
7. **Respect for user privacy.** Keep the interests of the individual at the center, with strong defaults, clear notice, and genuine user-friendliness — the system should be user-centric, not just compliant-on-paper.

## How GDPR turned this into law

GDPR **Article 25** requires **"data protection by design and by default."** This is Privacy by Design's philosophy showing up directly in binding EU law: organizations subject to GDPR must build data protection measures into their processing activities from the outset (by design) and must configure systems so that, by default, only the personal data necessary for a specific purpose is processed (by default). Article 25 is the clearest example in this course of a design philosophy from outside the legal world being written directly into a regulation's text.

## Why this matters practically

Retrofitting privacy into a system that was never designed for it is expensive and incomplete — you're adding controls on top of a data flow that was never built to support them, discovering unknown copies of sensitive data in places nobody planned for, and trying to prove compliance after the fact instead of by design. A system built with these seven principles from day one has privacy as a property of the architecture itself, which is both cheaper to maintain and easier to actually trust.

## Key terms

| Term | Meaning |
|---|---|
| Privacy by Design | A framework of 7 principles for embedding privacy into system design from the start, developed by Ann Cavoukian |
| Privacy as the default setting | Users get privacy protection automatically, without having to opt into it |
| Positive-sum | Privacy by Design's rejection of trading away functionality or security to gain privacy — both should coexist |
| GDPR Article 25 | "Data protection by design and by default" — the legal codification of this philosophy in EU law |

## Lab

Pick a system you use regularly (an app, a website, a form you've filled out). Walk through the seven principles one at a time and note whether that system appears to follow it or not — for example, is privacy the default setting, or did you have to go dig through a settings menu to turn on protections? You're not auditing the company; you're practicing recognizing the principles in a real interface.

## Check yourself

Can you name Ann Cavoukian and her role, list at least four of the seven Foundational Principles, and explain in one sentence how GDPR Article 25 relates to Privacy by Design?
