# Lesson 65 — Agent Memory & Context: Threads in Cortex Agents

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 65 of 76**

## What you'll learn

- Why "agent memory" in Cortex Agents means threads, not some separate long-term-memory feature
- What a thread actually stores and where
- Why threads remove a real engineering burden from the client application
- The limits of thread-based memory — what it does and doesn't give you

## Be skeptical of "agent memory" as a buzzword

"Memory" gets used loosely across the AI industry to mean everything from
"remembers the last message" to "learns your preferences forever." In
Cortex Agents specifically, the real, shipped feature behind
multi-turn conversation is called a **thread**, and it's worth being
precise about what it actually does, because that precision is what makes
it useful in a production application rather than a marketing term.

## What a thread is

A thread maintains **conversation context across turns**, server-side,
inside Snowflake. When a user asks a follow-up question — "what about just
the enterprise tier?" after asking about revenue by product — the agent
needs to know what "that" refers to from the prior turn. Without a thread,
the client application would have to resend the entire prior conversation
transcript with every new request, reconstructing context from scratch
each time.

With a thread, it doesn't have to: Snowflake restores the conversation
history server-side, so a follow-up request only needs to include the
**new** user message plus the thread's identifier. The agent run then has
access to everything said earlier in that thread, without the client
shipping it all over the wire again.

Mechanically, this runs through two fields on the `agent:run` request:
`thread_id`, created once via a Create Thread call and reused across every
turn in that conversation, and `parent_message_id`, which points at the
message you're replying to — `0` for the very first message in a thread,
and the ID of the last successful assistant message for every turn after
that. That `parent_message_id` chain is also what lets an application
fork a conversation or recover cleanly from a failed response, by pointing
a new message at an earlier, known-good message instead of the most
recent one.

```json
// First message in a new thread
{
  "thread_id": 1234,
  "parent_message_id": 0,
  "messages": [
    { "role": "user", "content": [{ "type": "text", "text": "What is the total revenue for 2025?" }] }
  ]
}

// Follow-up in the same thread — no need to resend the first question
{
  "thread_id": 1234,
  "parent_message_id": 456,
  "messages": [
    { "role": "user", "content": [{ "type": "text", "text": "What about last year?" }] }
  ]
}
```

## Why this matters for the applications you'll build

This is a genuine engineering simplification, not just a convenience:

- **No session-state database to build yourself.** Before threads, an
  application developer would need their own table tracking conversation
  history per user session, assembling it into context on every call.
- **No growing payload size.** Without server-side history, every new
  message in a long conversation means re-sending an ever-larger
  transcript. Threads keep the per-request payload constant: one new
  message in, one new response out.
- **Consistent context across clients.** If the same conversation is
  continued from a different device or app, pointing at the same thread
  reconstructs the same context — the state lives in Snowflake, not in any
  one client's local memory.

## What threads are not

Be precise about the boundary. A thread gives an agent continuity **within
a conversation** — it is not a standing, cross-conversation memory of a
user's preferences that persists and shapes behavior on a completely
separate, later conversation unless the application explicitly looks up
and re-injects something from a prior thread. If you want true long-term
personalization across sessions, that's a separate design decision your
application has to make — e.g. storing and retrieving a user profile from
a Snowflake table and feeding it into a new thread's opening instructions.
Threads solve "remember this conversation," not "remember this person
forever" — don't oversell the feature past what it is.

## Key terms

| Term | Meaning |
|---|---|
| Thread | Snowflake-managed, server-side storage of conversation context for a Cortex Agent, across multiple turns |
| Turn | One request/response exchange within a thread |
| Context window | What the model actually sees for a given turn — reconstructed from the thread's history plus the new message |

## Lab

1. Sketch (in plain language, not code) what a client application would
   have to build itself to maintain conversation context *without*
   threads — a data model, and the logic to assemble context on every
   call.
2. Write one example of a follow-up question that only makes sense with
   thread context ("what about just the enterprise tier?") and one
   question that wouldn't need it at all (a fully self-contained new
   question).

## Check yourself

You're ready for Lesson 66 when you can explain, in one or two sentences,
what a thread actually stores and why that removes work from the client
application — and can state clearly why a thread is not the same thing as
long-term, cross-conversation personalization.
