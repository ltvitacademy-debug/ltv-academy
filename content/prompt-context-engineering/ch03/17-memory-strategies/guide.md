# Lesson 17 — Memory Strategies: Short-Term vs. Long-Term

**Chapter 3 · Context Engineering · Lesson 17 of 24**

## What you'll learn

- The difference between short-term memory (in the context window) and
  long-term memory (stored externally, retrieved on demand)
- A real example of what a stored long-term memory record looks like
- When a fact earns long-term storage versus staying short-term
- Why long-term memory needs staleness handling that short-term memory
  never has to worry about

## Two places to keep a fact

Every fact available to a model during a call lives in one of two
places:

- **Short-term memory** — this session's conversation history,
  physically sitting inside the current call's context window. It's
  free (no separate storage system), it's fast (no retrieval step
  needed), and it disappears when the session ends unless something
  explicitly saves it elsewhere.
- **Long-term memory** — stored outside the context window entirely,
  in a database, a file, or a vector store, and brought back into a
  future call's context only when retrieval decides it's relevant.
  This is what lets a system "remember" something across sessions that
  don't share a context window at all.

## What a stored memory record looks like

Long-term memory isn't a vague concept — it's a real stored record,
retrieved and re-injected into context later:

```
{
  "user_id": "u_8891",
  "fact": "Prefers email, not phone",
  "source_turn": 14,
  "confidence": 0.9,
  "saved_at": "2026-09-02"
}
```

This fact sits in storage, outside any context window, until a future
session's retrieval step decides it's relevant enough to pull back in
— at which point it becomes part of that session's context, subject to
everything Lessons 13-15 already covered: it has to fit the budget,
and it competes for a position in the window like anything else.

## Choosing short-term vs. long-term

Not every fact deserves to be written to long-term storage. A rough
rule:

- **Short-term is right for anything scoped to the current task.**
  Working out a calculation, following the thread of the current
  conversation, holding a document the user just pasted in — none of
  that needs to survive past this session, and keeping it short-term
  is free.
- **Long-term is right for facts worth keeping across sessions.** A
  stated preference ("prefers email"), a decision that should stick
  ("already declined the upsell twice"), a durable fact about the
  user or the task that a future, unrelated session would benefit from
  knowing.

## The cost long-term memory adds: staleness

Short-term memory never goes stale — it's gone at the end of the
session, so there's no old version of it lying around to contradict
the current one. Long-term memory doesn't have that luxury: a fact
saved eight months ago ("prefers email, not phone") can simply become
wrong, and nothing automatically detects that it has. A real
memory system needs a plan for this — a confidence score that decays
over time, an expiration, or a process that re-confirms old facts
rather than trusting them indefinitely. The `confidence` and
`saved_at` fields in the example record above exist specifically to
support that kind of staleness handling later.

## Key terms

| Term | Meaning |
|---|---|
| Short-term memory | Conversation history inside the current context window, gone when the session ends |
| Long-term memory | Facts stored outside the context window, retrieved back into context on demand |
| Staleness | The risk that a long-term fact is no longer true, since nothing automatically re-checks it |

## Lab

1. Write a real long-term memory record (in the JSON shape above) for
   a fact worth remembering about a user across sessions, with a
   `confidence` and `saved_at` field.
2. Write one sentence describing how your system would decide, on a
   future session, whether that fact is still trustworthy enough to
   use — or how it would detect that it's gone stale.

## Check yourself

You're ready for Chapter 4 when you can explain, for a given fact,
whether it belongs in short-term or long-term memory, and name one
concrete risk long-term storage introduces that short-term memory
never has to deal with.
