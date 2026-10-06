# Lesson 3 — Data Exfiltration via AI

**Chapter 1 · AI-Specific Security Risks · Lesson 3 of 25**

## What you'll learn

- The difference between a model leaking what it knows and leaking what it can reach
- The covert channels attackers use to get data out, at a defensive level
- Why RAG and tool-connected AI systems widen the exposure versus a plain chatbot
- Concrete defenses that close these channels

## Two different leaks

"Data exfiltration via AI" covers two meaningfully different problems, and it's worth keeping them separate:

**Leaking what the model knows.** Large models sometimes memorize fragments of their training data and can be prompted, directly or through a jailbreak-style approach, into reproducing them. This is a training-data problem — it's about what went into the model, not what the application does with it.

**Leaking what the model can reach.** This is the one application builders need to worry about most. Once a model is connected to a company's documents (via retrieval-augmented generation), a database, or internal tools, it has access to real, current, sensitive data — and an attacker's goal shifts from "make the model say something forbidden" to "make the model tell me, or send somewhere I control, something it was only supposed to use internally."

## Covert channels — described for defense

These are explained at the category level, so a security-minded builder can recognize and block them — not as a how-to.

**Encoding data into output the user controls the destination of.** If a model's output can include a clickable link or an auto-loading image (common in markdown-rendering chat UIs), and an attacker can influence what URL that link points to, there's a path for the model to embed retrieved secret data inside a URL that quietly "calls home" the moment the link renders — no click required.

**Multi-turn accumulation.** Instead of asking for the sensitive data directly (which a filter might catch), an attacker asks a string of individually-innocent-looking questions and reassembles the answers themselves.

**Function/tool output leakage.** If a connected tool returns more data than the task needs (e.g., an entire customer record when only a shipping status was requested), that extra data is now inside the model's context and available to leak through any of the above.

## Why RAG and tool use widen this risk

A plain chatbot with no external connections can only leak what's in its training data or what the user already told it. The moment you add retrieval or tool calls, the model is handling live, often sensitive, enterprise data on every turn — and every one of the covert channels above becomes a path from "data the business didn't want to leave the building" to "data in an attacker's hands."

## Defenses that close these channels

- **Sanitize or disable auto-rendering of external links and images in AI output**, or at minimum strip query parameters and route them through a proxy that can't carry arbitrary payloads.
- **Minimize what any single retrieval or tool call returns** — only the fields the task actually needs, not the whole record.
- **Scan outputs for sensitive-data patterns** (a lightweight DLP pass) before they reach the user, independent of what the model "decided" to say.
- **Isolate sessions and context per user** so one user's retrieved data can never leak into another user's conversation.

## Key terms

| Term | Meaning |
|---|---|
| Data exfiltration | Sensitive data leaving a system through an unintended channel |
| Covert channel | A technically-allowed output path (like a rendered link) repurposed to carry stolen data |
| Data minimization | Returning only the specific fields a task needs, not entire records |

## Lab

Look at an AI feature you use (or a demo RAG chatbot) that's connected to some data source. Without attempting any attack, write down: what's the largest single piece of data a single tool call or retrieval could return? Is it more than the visible feature actually needs? That gap is exactly what data minimization is meant to close.

## Check yourself

Can you explain, in your own words, why a RAG-connected AI assistant has a larger data exfiltration risk than a plain chatbot with no external connections?
