# Lesson 17 — State & Memory in Agents

**Chapter 3 · Agent Architectures & Patterns · Lesson 17 of 32**

## What you'll learn

- Why a long-running agent can't just rely on "everything's in the context window"
- Three real mechanisms: conversation history, scratchpads, and external memory
- Anthropic's own memory tool, concretely
- How this closes the loop on everything Chapter 3 has covered

## Context isn't free, and it isn't infinite

Lesson 2's loop already carries state forward implicitly — each
iteration's `tool_result` goes back into the conversation, so the model
technically "remembers" every prior step for free, inside the context
window. That works until it doesn't: a long-running agent (many ReAct
iterations, an orchestrator with several workers' worth of results, a
reflection loop that revised twice) accumulates history that costs real
tokens on every subsequent request (Lesson 5's cost argument, now applied
to memory specifically) and can eventually exceed the context window
outright. "It's all still in there" stops being true once something has
to be dropped.

## Three real mechanisms

- **Conversation history** — the default: everything stays in the
  message list, Lesson 7's `tool_use`/`tool_result` pairs accumulating
  turn by turn. Simple, but unbounded, and the first thing to hit limits.
- **Scratchpads** — a working summary the agent (or your code) maintains
  explicitly, condensing what's been learned so far into something far
  shorter than the raw history, the same high-signal discipline Lesson
  11 applied to a single tool's output, now applied to an entire
  session's accumulated state.
- **External memory** — state stored outside the context window entirely
  and retrieved only when actually relevant, rather than carried in full
  on every single request.

## A real mechanism: the memory tool

Lesson 3 introduced Anthropic-schema client tools like `bash` and the
text editor tool. The **memory tool** is in that same family: it lets
Claude store and retrieve information across conversations in files it
controls, rather than relying on everything staying inside one
conversation's context window. Like `bash` and the text editor, it's a
client tool — your application still runs the actual file operations
when Claude requests them, following the same `tool_use`/`tool_result`
mechanism Lesson 3 and Lesson 7 already covered. This is state Lesson
14's subagents can plausibly share, where a single conversation's context
window plainly can't.

## Closing the loop on Chapter 3

Every pattern this chapter covered produces state that has to go
*somewhere*: ReAct's Thought/Action/Observation history, a planning
agent's plan and its revisions, an orchestrator's collected worker
results, a reflection loop's draft-and-feedback cycles. None of those
patterns specify where that state lives — conversation history,
scratchpad, or external memory are the three real answers, chosen based
on how long the state needs to persist and how much of it needs to stay
immediately accessible versus retrieved on demand.

## Key terms

| Term | Meaning |
|---|---|
| Conversation history | The default state mechanism — everything in the message list, unbounded until it hits a context limit |
| Scratchpad | A condensed, explicitly maintained summary of what's been learned, shorter than raw history |
| External memory | State stored outside the context window, retrieved only when relevant — e.g., Anthropic's memory tool |

## Check yourself

You've completed Chapter 3 when you can take any pattern from this
chapter (ReAct, planning, multi-agent, orchestrator/worker, reflection)
and name which of the three memory mechanisms its accumulated state would
most naturally use, and why.
