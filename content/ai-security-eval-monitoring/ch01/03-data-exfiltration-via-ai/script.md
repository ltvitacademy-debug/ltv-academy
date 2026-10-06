# Lesson 3 — Data Exfiltration via AI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Data exfiltration via AI covers two different problems: what a model knows, and what it can reach. This lesson focuses on the one application builders need to worry about most.

## S2 · STEPS — Two different leaks

Leaking what the model knows is a training-data problem — memorized fragments reproduced on request. Leaking what the model can reach is the bigger concern for builders: once a model is connected to documents, a database, or tools, an attacker's goal becomes getting that live data sent somewhere they control.

## S3 · STEPS — Covert channels

Described here for defense, not as a how-to. A rendered link or auto-loading image can carry data in its URL the moment it renders. Multi-turn accumulation asks a string of innocent-looking questions and reassembles the answer. A tool that returns more data than the task needs puts extra sensitive data in reach.

## S4 · STEPS — Why RAG widens the risk

A plain chatbot can only leak training data or what the user already said. The moment you add retrieval or tool calls, the model handles live, often sensitive data on every turn — and every covert channel becomes a path from internal data to an attacker's hands.

## S5 · STEPS — Defenses

Sanitize or disable auto-rendering links and images in AI output. Minimize what any tool call or retrieval returns — only the fields the task needs. Scan outputs for sensitive-data patterns independent of what the model decided to say. Isolate sessions so one user's data can't leak into another's.

## S6 · OUTRO

Next lesson: model and API key security — protecting the credentials and the model artifacts themselves, not just what flows through them.
