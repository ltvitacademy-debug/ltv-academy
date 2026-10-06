# Script — Wrap-Up & Presentation

## Segment 1 (title)

Across three lessons you built an AI data analyst with three real, interview-defensible pieces: a read-only parameterized database connection, a validated natural-language-to-SQL pipeline using real tool calling, and a multi-tool enrichment step combining the database with a live API. That's a complete, safety-conscious slice of what this kind of product actually requires.

## Segment 2 (steps: five-part structure)

Don't just demo the happy path. Structure the walkthrough in five parts: the problem, stated as a real question; the architecture, tracing the path from question to validated SQL to execution to answer; the safety decisions, which most portfolio projects skip and most interviewers actually probe; a live demo of two or three real questions; and known limitations, stated honestly.

## Segment 3 (code: known limitations)

A short, specific limitations section is more credible than a polished demo with no acknowledged edge cases. Say plainly that there's no conversation memory, that the schema is hard-coded rather than auto-introspected, that there's no caching layer yet, and that validation defends the query but hasn't been tested against someone trying to manipulate Claude's reasoning through the wording of the question itself.

## Segment 4 (code: why this matters)

An interviewer who's seen a dozen RAG chatbots will ask pointed questions about this project specifically: what stops a destructive query, what happens if the API times out, how would the enrichment step scale. You've already built real answers to all three -- the presentation structure exists to make sure you actually say them out loud.

## Segment 5 (outro)

Project 2 is complete. Next up: Project 3, a tool-using agent with human approval built-in from the start -- applying the AI Agents course's tool schemas and guardrails directly.
