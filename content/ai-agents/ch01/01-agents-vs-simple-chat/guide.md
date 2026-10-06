# Lesson 1 — Agents vs. Simple Chat

**Chapter 1 · What an AI Agent Actually Is · Lesson 1 of 32**

## What you'll learn

- What "simple chat" actually means: one request, one response, no loop
- What turns a chatbot into an agent: the ability to act, observe, and decide again
- Why "agent" is a spectrum, not a binary label
- A concrete side-by-side of the same question handled each way

## One turn vs. a loop

A simple chat interaction is one round trip: you send a message, the model
reads it and everything before it in the conversation, and it writes a text
reply. Nothing happens in between. If the answer requires information the
model doesn't have — today's date, a row in your database, the result of a
calculation it can't trust itself to get exactly right — a pure chat turn
can only guess or say it doesn't know.

An agent is the same underlying model, given two more things: a set of
**tools** it can call (Lesson 3), and permission to run in a **loop**
instead of stopping after one reply (Lesson 2). Anthropic's own engineering
writing on this draws the line the same way: a workflow follows a
predefined path that your code controls step by step, while an agent is a
system where the model itself decides, turn by turn, which action to take
next based on what just happened — the model is "driving," not just
answering.

```
Simple chat:                      Agent:
user message -> model -> reply    user goal -> model decides action
  (done)                            -> tool runs -> model sees result
                                     -> model decides NEXT action
                                     -> ... -> model decides it's done
```

## The same question, two ways

"What's our refund policy for orders placed more than 30 days ago?" — a
pure chat model answers from whatever policy text is already in its
context window, or admits it doesn't have it. An agent with a
`search_policy_docs` tool decides to call that tool first, reads back the
actual current policy text, and only then answers — and if the first
search comes back empty, it can try a different query before giving up,
because it's still running.

That second case is the whole shift this course is about: not a smarter
model, but a model that gets to take more than one step toward an answer,
checking its own work against the real world as it goes.

## Agency is a spectrum

Nothing requires an all-or-nothing jump. A system that calls exactly one
tool and stops is more "agentic" than plain chat but far simpler than a
system that loops for twenty steps, reflects on its own output, and calls
other agents. Later lessons build up that spectrum deliberately: tool use
first (Lesson 3), the loop that ties it together (Lesson 2), then — much
later, in Chapter 3 — planning, multi-agent systems, and reflection.
Chapter 5 of this course, "When Agents Are Overkill," exists precisely
because more agency isn't automatically better: it's a tradeoff against
latency, cost, and new ways to fail.

## Key terms

| Term | Meaning |
|---|---|
| Simple chat | One request, one model-generated reply; no tools, no loop |
| Agent | A system where the model decides its own next action across multiple steps, typically using tools |
| Workflow | A multi-step LLM system where your code (not the model) decides the path between steps |
| Agentic | A relative term for how much control over process and tool use is handed to the model |

## Check yourself

You're ready for Lesson 2 when you can explain, in your own words, why a
single extra tool call bolted onto one chat turn doesn't automatically
make a system an agent — and what property it's still missing.
