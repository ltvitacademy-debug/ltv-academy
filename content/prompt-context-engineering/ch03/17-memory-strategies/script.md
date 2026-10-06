# Script — Memory Strategies: Short-Term vs. Long-Term

## Segment 1 (title)

Every fact a model has access to lives in one of two places: inside this call's context window, or stored somewhere else and brought back in later.

## Segment 2 (steps: two different places to keep a fact)

Short-term memory is this session's conversation history, sitting inside the context window right now. Long-term memory is stored externally — a database, a file, a vector store — and survives after the window closes. Retrieval is the mechanism that pulls a long-term fact back into context the next time it's actually relevant.

## Segment 3 (code: a real long-term memory record)

A real long-term memory record looks like this: a user ID, the fact itself — prefers email, not phone — which turn it came from, a confidence score, and when it was saved. It sits in storage today. The next time this user starts a session, retrieval decides whether this fact belongs in that session's context.

## Segment 4 (steps: choosing which one)

Not every fact earns long-term storage. Short-term, in-window memory is free and fast — fine for anything scoped to this one task, gone when the session ends, no loss. Long-term storage is for facts worth keeping across sessions: a stated preference, a decision that should stick. And because long-term facts persist, they need staleness handling — a preference saved eight months ago can simply be wrong now, and nothing automatically catches that.

## Segment 5 (outro)

Retrieving a long-term memory back into context is governed by everything this chapter already covered — it still has to fit the budget, and it still competes for a strong position in the window, not the weakest one. That closes Chapter 3. Next: Chapter 4, evaluating prompts — building an eval set and testing whether all of this context engineering actually works, instead of assuming it does.
