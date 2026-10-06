# Lesson 32 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 6 · Capstone · Lesson 32 of 32**

## What you'll learn

- How to present this capstone to an employer, not just finish it for yourself
- The one sentence that ties the whole course together
- A recap of the six chapters and what each contributed to the finished agent
- What's next in the AI Engineer path

## Presenting the capstone: show the failure paths, not just the success path

Most people showing off an agent project demo the happy path: user asks,
agent calls tools, agent succeeds. That's table stakes. What makes this
capstone worth presenting is everything this course added on top: show the
*rejection* path (a human declines the refund, the agent handles it
gracefully), show a *stopping condition* actually firing, show an *audit
log entry* for a real run. An interviewer who builds agents for a living
has seen plenty of happy-path demos. They've seen far fewer candidates who
can show what happens when something is denied, limited, or logged — and
that's exactly the skill this course spent six chapters building.

## The sentence that ties it together

If you need one sentence for a resume, a portfolio page, or an interview
answer: *"I built a tool-using agent with a human-approval checkpoint on
its one consequential action, backed by append-only audit logging,
iteration and cost limits, and least-privilege credentials — and verified
each control actually works, not just that the happy path does."* Every
clause in that sentence maps to a lesson you can speak to in detail if
asked a follow-up.

## Six chapters, one agent

```
Ch 1  What an agent actually is       -> the loop this agent runs
Ch 2  Tool calling & function design  -> get_order / issue_refund schemas
Ch 3  Agent architectures             -> why a simple loop, not more, fit
Ch 4  Human-in-the-loop & approval    -> the checkpoint, rejection, escalation
Ch 5  Safety & guardrails             -> limits, budget, sandbox, injection, monitoring
Ch 6  Capstone                        -> all of it, built and verified together
```

Nothing in this course was theoretical by the end — every chapter's
concept became a specific, working piece of the same small agent, which is
exactly why the capstone stayed scoped to two tools rather than growing to
impress.

## What's next

This course is the eighth of twelve in the AI Engineer path's Job-Ready
stage. The next course, **Azure AI & Cloud for AI Engineers**, picks up
exactly where Lesson 31 stopped: deploying, securing, and monitoring AI
services — including agents like the one you just built — in a real cloud
environment, with a deliberate look at how Azure AI Foundry, Azure OpenAI,
and Azure AI Search compare to AWS Bedrock and Vertex AI.

## Key terms

| Term | Meaning |
|---|---|
| Failure-path demo | Showing a rejection, a stopping condition, or an audit entry — not just the happy path |
| Portfolio sentence | A single, specific claim about the project that maps directly to what you can explain in an interview |

## Check yourself

Practice saying the "sentence that ties it together" out loud, then pick
any one clause in it and explain, without notes, which lesson it came from
and why that control mattered.
