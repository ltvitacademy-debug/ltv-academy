# Lesson 22 — System Design Questions for AI Roles · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson gives you one framework for answering almost any AI system design question -- design a RAG system for X, design an agent with human approval for Y -- instead of a different trick for each one.

## S2 · STEPS — The four-part framework

Four parts, every time. Requirements: scale, latency, and the cost of being wrong. Architecture: the real components and how data flows between them. Tradeoffs: the two or three decisions that actually matter. And failure modes -- the step most candidates skip, and the one that signals real production experience.

## S3 · STEPS — Worked example: RAG system

Take "design a RAG system for internal policy questions." Requirements favor accuracy over speed. Architecture follows the ingestion-to-generation pipeline from this path's RAG course. The tradeoff is precision over recall, with re-ranking since volume is low. And the failure mode: low retrieval confidence gets an honest "I don't know," not a guess.

## S4 · STEPS — Worked example: approval agent

Take "design an agent that can issue refunds, with human approval." Requirements: irreversible, real money, so auditability matters more than speed. Architecture mirrors this path's agent loop: gather context, propose, pause for approval, execute, log. The failure mode to name: idempotent retries, so a timeout can't double-refund.

## S5 · OUTRO

That's the last interview-prep lesson in this course. Next: the final lesson in the entire AI Engineer path -- salary negotiation, and a full recap of everything you've built.
