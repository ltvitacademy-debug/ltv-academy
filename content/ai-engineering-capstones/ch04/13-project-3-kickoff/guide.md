# Lesson 13 — Project 3 Kickoff

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 13 of 23**

## What you'll learn

- What Project 3 is, and why "a human approves before anything
  irreversible happens" is the whole point, not a nice-to-have
- The five lessons ahead, and what each one adds to the build
- How to scope your own tool-using agent around real, consequential
  actions
- The deliverables you're accountable for at the end of Chapter 4

## What you're building

Projects 1 and 2 both answer questions. Project 3 does something riskier
by design: it **takes actions**. A tool-using agent with real tools can
send a message, modify a record, or spend money — and once a tool call
executes, you often can't take it back. This project builds that agent
the way it should be built in production: with a human approval
checkpoint in front of anything consequential, an audit log of every
decision, and input validation that doesn't trust the model's output
blindly.

This directly applies the tool schemas, human-in-the-loop patterns, and
guardrails from the AI Agents course — not as review, but as the actual
foundation this project sits on.

## The five lessons ahead

| Lesson | What it adds |
|---|---|
| 14 — Designing the Tool Set | 2–3 real tools with real JSON schemas, verified against Anthropic's tool-use docs |
| 15 — Building the Approval Workflow | A real approve/reject checkpoint before any sensitive tool executes |
| 16 — Adding Security & Logging | Input validation and an audit-log shape for every tool call and decision |
| 17 — Deploying the Agent | Shipping it as a real service, tying into the Docker & Deployment course |
| 18 — Wrap-Up & Presentation | Packaging the finished agent for your portfolio |

## Scoping your own project

You choose the tools and the domain. Two things make a good fit:

1. **At least one tool with a real, hard-to-reverse consequence.**
   Sending an email, posting a message, creating a calendar event,
   modifying a file, or placing an order all qualify — something a
   reasonable person would want a chance to veto before it happens.
   "Look something up" tools don't need approval; this project needs at
   least one tool that does.
2. **A plausible reason a human has to be in the loop.** Not "because
   the lesson says so" — a real scenario where an autonomous agent
   acting alone would be a bad idea: cost, reputational risk,
   irreversibility, or regulatory/compliance exposure are all real
   reasons.

A good starting shape: one or two read-only or low-risk tools (no
approval needed) plus one higher-risk tool that always stops for human
sign-off before it runs.

## Project 3 deliverables

By the end of Lesson 18 you should have:

- 2–3 tool schemas with descriptions that meet the bar from the AI
  Agents course's tool-design lessons (Lesson 14)
- A working approve/reject checkpoint that actually blocks execution
  until a human responds (Lesson 15)
- An audit log recording every tool call, its input, and its approval
  decision, plus input validation on tool arguments (Lesson 16)
- The agent running as a deployed service, not just a local script
  (Lesson 17)
- A portfolio-ready walkthrough (Lesson 18)

## Key terms

| Term | Meaning |
|---|---|
| Tool-using agent | An LLM-driven system that can call real tools to take actions, not just answer questions |
| Human-in-the-loop approval | A checkpoint where a person must explicitly approve a sensitive action before it executes |
| Irreversible action | An action that can't be cleanly undone once it runs — sending a message, charging a card, deleting a record |

## Check yourself

- Why does Project 3's risk profile differ from Project 1 (RAG) and
  Project 2 (read-only SQL + API)?
- Name the tool you're building for Project 3 that has a real,
  hard-to-reverse consequence, and why it needs a human in the loop.
- What's the difference between a tool that needs approval and one that
  doesn't, in your own project's tool set?
