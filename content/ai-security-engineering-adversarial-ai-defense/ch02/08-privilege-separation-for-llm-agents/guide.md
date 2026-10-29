# Lesson 8 — Privilege Separation for LLM Agents

**Chapter 2 · Prompt Injection Attacks and Defenses · Lesson 4 of 4**

## What you'll learn

- Why least privilege — a principle you already apply to humans and
  service accounts — is the single most effective architectural
  defense against prompt injection
- What changes the moment an LLM gets tool use: text manipulation
  becomes a real-world action
- The concrete architectural patterns that bound an agent's "blast
  radius" before an injection ever lands
- How this ties back to the human-in-the-loop approval-gate pattern
  from this path's SOAR automation content

## From "it said something bad" to "it did something bad"

A chatbot that only talks has a limited failure mode: a successful
injection makes it say something it shouldn't. Unpleasant, maybe
reputationally damaging, but bounded. An **agent** — an LLM wired up
with tool use or function calling so it can query a database, send an
email, write to a repository, call an internal API, or make a
purchase — has a completely different failure mode. A successful
injection against an agent doesn't just produce bad text. It produces
a bad *action*. The three previous lessons established that you
cannot reliably stop every injection attempt at the input layer. This
lesson is about what you do given that reality: make sure that even
when an injection succeeds, there's nothing much it can actually do.

## Least privilege, applied to agents

You already know this principle from everywhere else in security: a
service account should hold the minimum access required for its task,
nothing more, because every extra permission is pure downside risk
with no corresponding benefit to the legitimate use case. Apply that
exact logic to an LLM agent. An agent that only needs to read
calendar availability shouldn't also be able to delete events. An
agent that drafts email replies shouldn't be able to send them
unsupervised. An agent that answers questions about order history
shouldn't be able to issue refunds. The question to ask about every
tool you wire up isn't "would this be useful," it's "does this
specific task strictly require it" — because the moment it doesn't,
you've created blast radius that an injection attack can exploit for
free.

## Concrete patterns that bound the blast radius

- **Scoped, task-specific credentials.** Don't issue one broad
  service account to "the AI system." Issue narrow, short-lived
  credentials scoped to the specific session or task, so a compromise
  in one context can't be reused in another.
- **Read/write separation.** An agent that reads a mailbox to
  summarize it is a different trust tier from one that can also send
  or delete. Keep those capabilities on separate, deliberately-granted
  tools rather than one bundled "email access" permission.
- **Explicit tool allow-listing.** Give the agent a small, named set
  of callable functions — not general shell access, not an
  unrestricted API key. If a capability isn't on the list, the model
  has no path to it regardless of what any injected text tells it to
  do.
- **Output validation before execution.** Before a tool call actually
  fires, check that the proposed action is consistent with what the
  user asked for in this conversation. This is the same output-side
  check from Lesson 7, applied specifically at the point of action.
- **Human-in-the-loop approval for consequential actions.** For
  anything irreversible or high-impact — a refund over a threshold, a
  production deployment, a bulk email send — route the action through
  a person before it executes. You've already seen this exact pattern:
  it's the same approval-gate design used for high-risk SOAR playbook
  actions earlier in this path, where an automated response pauses for
  an analyst's sign-off instead of firing unattended.
- **Sandboxing and audit logging.** Run agent actions in an isolated
  execution environment where possible, and log every tool call with
  enough detail to reconstruct exactly what the agent did and why,
  after the fact.

## Why this is the defense that actually scales

Input filtering has to anticipate every possible phrasing an attacker
might use — an open-ended, losing proposition, as Lesson 7 covered.
Privilege separation doesn't need to anticipate anything. It doesn't
care how clever the injected instruction is, because the agent
physically cannot perform an action it was never granted the
capability to perform. That's what makes it the most durable control
in this chapter: it bounds the consequence of a successful attack
rather than trying to guarantee the attack never succeeds — and
given everything you've learned about why natural language can't be
fully filtered, bounding consequence is the fight you can actually
win.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege (applied to agents) | Granting an LLM agent only the specific tool access its task strictly requires, nothing more |
| Blast radius | The scope of damage a compromised agent can cause, bounded by its granted permissions rather than by attacker creativity |
| Tool allow-listing | Restricting an agent to a small, explicitly named set of callable functions instead of broad or general-purpose access |
| Human-in-the-loop approval | Routing consequential or irreversible actions through a person for sign-off before they execute |

## Check yourself

You've completed Chapter 2 when you can explain, without looking: why
does privilege separation remain effective even against an injection
attack whose exact phrasing you've never seen before — something
input filtering can never claim?
