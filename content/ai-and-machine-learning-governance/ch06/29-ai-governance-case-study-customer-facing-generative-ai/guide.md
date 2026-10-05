# Lesson 29 — AI Governance Case Study: Customer-Facing Generative AI

**Chapter 6 · Applied AI Governance · Lesson 29 of 30**

## What you'll learn

- A second full, fictional walkthrough — this time a generative AI chatbot facing real customers
- Why generative AI introduces governance problems this course's earlier case study didn't have: hallucination, prompt injection, and open-ended output
- How prompt and output governance, incident response, and human oversight work together on a live system
- How this case study differs from Lesson 28's, and why both patterns matter

## The scenario (fictional, illustrative)

**Brightfield Outfitters**, a fictional mid-sized outdoor-gear retailer, is not a real company and this is not a real incident. Brightfield launches a customer-facing chatbot built on a generative AI model to answer product questions, process returns, and reduce call-center volume. Unlike Lesson 28's credit model, which produces one of three fixed outputs, this system produces open-ended natural language — a fundamentally different governance problem.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** Brightfield's governance lead applies Lesson 3's risk categories directly: this system carries real hallucination risk (confidently wrong answers about product specs or return policy) and a different kind of privacy risk than a traditional model, since customers may type sensitive information directly into the chat window.

**Chapter 4 (Prompt and Output Governance):** Before launch, the team applies Lesson 19's guidance directly: the chatbot's system prompt explicitly instructs it to decline questions outside its defined scope (no medical, legal, or financial advice, even if a customer asks), and outputs are filtered for policy violations before being shown to the customer. Access to see raw conversation logs is restricted per Lesson 18, since those logs may contain personal data customers typed in unprompted.

**Chapter 3 (Model Governance):** The underlying model is documented with a model card (Lesson 12) that explicitly states its known limitation: it can produce fluent, confident-sounding answers that are factually wrong about specific order details, because it isn't directly connected to the order database for every query type. This limitation is written down *before* launch, not discovered by a customer first.

**Chapter 5 (Responsible AI and Risk):** The team risk-tiers the chatbot using Lesson 24's method. Likelihood of a bad output is scored medium-high (generative text is inherently less predictable than a scoring model); impact is scored medium (wrong product advice is recoverable, unlike a wrongly denied loan). The resulting tier is lower than Harrow Peak's credit model, but still high enough to require active monitoring, not a "launch and forget" posture.

**Chapter 4 again (Incident Response):** Three weeks after launch, a customer screenshots the bot confidently stating an incorrect return-window policy, and it circulates on social media. Lesson 22's incident-response process activates: the issue is triaged, the specific prompt pattern that caused it is identified and patched, affected customers are offered the correct policy, and the incident is logged — not minimized — in the model's own record, becoming part of its ongoing documentation.

**Chapter 6 (this chapter):** The incident, once resolved, becomes an input to the next internal audit (Lesson 27): did the response follow the documented incident process, and does the model card now reflect the lesson learned? Both checks pass, and the postmortem is used to tighten the system prompt further.

## Why this case study is different from Lesson 28's

Harrow Peak's credit model produces a small, fixed set of outputs that can be tested exhaustively. Brightfield's chatbot produces language that can't be fully enumerated in advance — governance has to focus on *boundaries* (what it must never do) and *fast correction* (how quickly a bad output gets caught and fixed) rather than trying to pre-certify every possible response. Both are legitimate governance strategies; which one applies depends on what kind of system you're governing.

## Key terms

| Term | Meaning |
|---|---|
| Hallucination | A generative AI system producing fluent, confident output that is factually incorrect |
| Prompt and output governance | Rules and filters constraining what a generative AI system will attempt to answer and what it's allowed to say |
| Incident response (AI) | The defined process for triaging, correcting, and documenting a live AI system's harmful or incorrect output |

## Lab

Write the system-prompt boundary rule you'd give Brightfield's chatbot to prevent the return-policy incident from recurring, plus one sentence describing how you'd verify the fix actually worked before calling the incident closed.

## Check yourself

Can you explain, in your own words, why "test every possible output" isn't a workable governance strategy for a generative AI system the way it was for Harrow Peak's credit model — and what strategy replaces it?
