# Lesson 22 — System Design Questions for AI Roles

**Chapter 5 · Career Preparation · Lesson 22 of 23**

## What you'll learn

- The four-part framework for answering any AI system design question
- How to apply it to "design a RAG system for X"
- How to apply it to "design an agent with human approval for Y"
- Where to pull real architecture detail from, using courses you've already completed in this path

## Why AI system design questions feel different

A system design question for an AI role ("design a customer-support RAG assistant," "design an agent that can issue refunds with human approval") isn't really asking you to pick product names. It's asking whether you can reason about a whole system the way you had to for your own capstone projects: what it needs to do, how the pieces fit together, what you're trading off, and what happens when something goes wrong. The same four-part framework works for almost any prompt in this category.

## The framework: requirements → architecture → tradeoffs → failure modes

**1. Requirements.** Before architecture, pin down what you're actually building for: expected scale (10 users or 10,000?), latency tolerance (a chat UI can wait two seconds; a voice agent can't), data freshness needs, and — critically for an AI system — the cost of being wrong. A support assistant giving a slightly outdated answer is very different from an agent that can move money. State your assumptions out loud; an interviewer would rather hear "I'm assuming X because the prompt didn't specify" than watch you guess silently.

**2. Architecture.** Sketch the real components and how data flows between them, out loud or on a whiteboard. For a retrieval-style system this is ingestion → chunking → embedding → vector store → retrieval → (optional re-ranking) → prompt assembly → generation → response, matching the pipeline from the RAG & Vector Databases course. For an action-taking system it's perception/input → planning → tool selection → (approval checkpoint, if consequential) → execution → logging, matching the agent loop from the AI Agents course.

**3. Tradeoffs.** Name the two or three decisions that actually matter and defend your default, using the same tradeoff-first method from the previous lesson: chunk size (recall vs. precision), model choice per step (a cheaper/faster model for routing or retrieval re-ranking, a stronger model only where it earns its cost), synchronous vs. queued processing (a user-facing chat needs a fast synchronous path; a batch analysis job can queue), and how much autonomy the system gets before a human checks in.

**4. Failure modes.** This is the step most candidates skip, and it's the one that signals production experience. What happens when retrieval returns nothing relevant? When a tool call fails or times out? When the model hallucinates a plausible-sounding but wrong action? Name the failure, then name the safeguard — a fallback response, a retry with backoff, an approval checkpoint, a rate limit, an audit log a human can review afterward.

## Worked example: "Design a RAG system for internal company policy questions"

- **Requirements:** a few hundred employees, answers need to be accurate over fast (getting policy wrong has real cost), documents update a few times a month.
- **Architecture:** scheduled re-ingestion of the policy document set → chunking tuned for dense policy language (smaller chunks, meaningful overlap) → embeddings into a vector store → retrieval with metadata filtering by department → prompt assembly that includes the source document name → generation with a citation back to the source section.
- **Tradeoffs:** favor precision over recall given the accuracy requirement; add a re-ranking step since query volume is low enough to afford the extra latency; keep the pipeline synchronous since employees expect a chat-speed answer.
- **Failure modes:** if retrieval confidence is low, respond with "I couldn't find a confident answer in the policy documents" rather than guessing, and log the query so a human can add missing content; if the source document was recently changed, surface the document's last-updated date so a stale answer is at least flagged as possibly outdated.

## Worked example: "Design an agent that can process refund requests, with human approval"

- **Requirements:** refunds are real money and partly irreversible, so correctness and auditability matter more than speed; expected volume is moderate, not instant-chat scale.
- **Architecture:** input (a refund request) → the agent gathers context via read-only tools (order lookup, policy lookup) → the agent proposes a decision and amount → an approval checkpoint shows a human the full proposed action and reasoning → on approval, a scoped "issue refund" tool executes → every step is logged.
- **Tradeoffs:** approval gates every refund above a small threshold, but small, clearly-policy-compliant refunds could auto-approve to reduce reviewer load — a scope decision worth naming even if you default to "approve everything" for a first version.
- **Failure modes:** the refund tool times out mid-call — the system needs idempotency so a retry can't double-refund; the agent proposes a refund that doesn't match policy — the approval checkpoint is exactly the safeguard that catches it before money moves; the audit log is what lets someone investigate afterward if something still went wrong.

## Key terms

| Term | Meaning |
|---|---|
| Requirements-first | Pinning down scale, latency, and the cost of being wrong before sketching architecture |
| Failure mode | A specific way a system can go wrong, paired with the safeguard that catches or limits it |
| Idempotency | A property where retrying the same action safely doesn't repeat its effect (e.g., can't double-refund) |

## Lab

Pick one system design prompt — "design a RAG assistant for [a domain of your choice]" or "design an agent with human approval for [a task of your choice]" — and write a four-part answer (requirements, architecture, tradeoffs, failure modes) from scratch, in the structure of the worked examples above.

## Check yourself

Can you name the four parts of the framework from memory, and explain why skipping the "failure modes" step is the single most common way a system design answer falls short?
