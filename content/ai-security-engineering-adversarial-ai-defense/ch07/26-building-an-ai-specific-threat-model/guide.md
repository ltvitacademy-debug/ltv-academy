# Lesson 26 — Building an AI-Specific Threat Model

**Chapter 7 · AI Governance, Red-Teaming, and Compliance · Lesson 2 of 4**

## What you'll learn

- Why a threat model built for a traditional application doesn't
  automatically cover an AI system, and what three dimensions you
  have to add
- How to adapt **STRIDE**, Microsoft's established threat-modeling
  framework, to AI-specific components
- How to walk through a worked threat model for a realistic AI system
  rather than just memorizing the framework
- How this threat model is what tells a red-team engagement (Lesson
  25) what to actually prioritize

## Why a generic threat model isn't enough

A threat model built for a conventional web application asks
questions like: who can reach this endpoint, what data does it touch,
what happens if an attacker tampers with a request. Those questions
still matter for an AI system — but they don't surface the risks
specific to the model itself. An AI-specific threat model adds three
dimensions on top of the traditional ones:

- **Data sensitivity** — not just the data in your database, but what
  the model was *trained or fine-tuned on*, what it *retrieves* at
  query time, and what it might *memorize and later reproduce*.
- **Autonomy level** — is this a read-only chatbot that only returns
  text, or an agent that can call tools, execute code, or take actions
  with real consequences? The blast radius of a successful attack
  scales directly with autonomy.
- **User trust boundary** — who's allowed to talk to this system, and
  at what trust level? An internal tool used only by vetted employees
  has a very different threat model from a public-facing chatbot that
  anyone on the internet can prompt.

## Adapting STRIDE to AI components

**STRIDE** is Microsoft's established threat-modeling framework —
Spoofing, Tampering, Repudiation, Information Disclosure, Denial of
Service, Elevation of Privilege. It wasn't written for AI, but each
category maps onto a concrete AI-specific risk once you know where to
look:

| STRIDE category | What it looks like in an AI system |
|---|---|
| **S**poofing | Impersonating a legitimate user to the model, or a model output being mistaken for an authoritative source it isn't |
| **T**ampering | Prompt injection altering the model's behavior at inference time; data poisoning altering it at training time |
| **R**epudiation | No logging of prompts, retrieved context, or model decisions, so a disputed output can't be traced or audited afterward |
| **I**nformation disclosure | System-prompt leakage, retrieval of out-of-scope documents, training-data memorization surfacing in output |
| **D**enial of service | Resource-exhaustion attacks — prompts engineered to force maximally expensive generation, or flooding an expensive model endpoint |
| **E**levation of privilege | An agent's tool-calling ability being manipulated to take an action beyond its intended authority |

This table is the actual working tool: for each component of a real
system — the prompt pipeline, the retrieval layer, any tool the model
can call — you ask which STRIDE categories apply and what the
concrete, system-specific version of that risk looks like.

## Walking it through a real system

Take a customer-support RAG chatbot that retrieves from an internal
knowledge base and can call a "create refund ticket" API. Data
sensitivity: the knowledge base may contain customer PII, so retrieval
and memorization both matter. Autonomy: it's not read-only — it can
create a real ticket, so Elevation of Privilege is a live concern, not
a theoretical one. Trust boundary: any logged-in customer can prompt
it, which is a much wider and less-vetted population than an internal
tool's. Running STRIDE against this system surfaces concrete,
prioritized questions: can injected content from a retrieved document
cause an unauthorized refund ticket (Tampering feeding Elevation of
Privilege)? Can a crafted query extract another customer's ticket
history (Information Disclosure)? This is what then goes into Lesson
25's red-team scope — the threat model tells the engagement exactly
where to concentrate its test cases, instead of testing everything
equally.

## Key terms

| Term | Meaning |
|---|---|
| Data sensitivity (AI context) | What a model was trained/fine-tuned on, what it retrieves at query time, and what it could memorize and reproduce |
| Autonomy level | How much real-world action a system can take on its own — from a read-only chatbot up to an agent executing tools |
| User trust boundary | Who is allowed to interact with the system and at what trust level, which determines who a realistic attacker could be |
| STRIDE | Microsoft's threat-modeling framework (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege), adapted here to AI-specific components |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: name
the three AI-specific dimensions a threat model needs beyond a
traditional application's, and walk through what Tampering and
Elevation of Privilege look like for an AI agent that can call tools.
