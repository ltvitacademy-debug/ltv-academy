# Lesson 18 — Wrap-Up & Presentation

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 18 of 23**

## What you'll learn

- What you built across Lessons 13–17, and why the rejected-path demo
  matters as much as the approved one
- How to adapt the five-part presentation structure from Project 2 for
  an agent whose whole point is a safety checkpoint
- What a specific, honest limitations section looks like for this
  project
- What's left once all three capstone projects are done

## What you built

Across five lessons, you built a tool-using agent with a real safety
architecture, not just a working demo:

- **Risk-classified tools** (Lesson 14) with real Messages API schemas
  and an explicit, design-time `requires_approval` decision per tool.
- **A pause-before-execute approval workflow** (Lesson 15) where a
  sensitive tool call waits on a real human decision, and a rejection
  is still a valid, informative `tool_result`.
- **Independent input validation and an audit log** (Lesson 16) that
  re-derives critical values instead of trusting the model's claim, and
  records every outcome — not just the successful ones.
- **A real deployment** (Lesson 17) with durable state for pending
  approvals and audit entries, and secrets handled correctly.

That's a complete answer to the question every serious AI engineering
role eventually asks: "how do you let a model take real actions
safely?"

## Adapt the five-part structure — demo both outcomes

Project 2's walkthrough structure (problem, architecture, safety
decisions, demo, limitations) still applies, with one change that
matters specifically here: **your demo needs to show the rejected path,
not just the approved one.**

An agent that only ever gets approved doesn't prove the checkpoint
works — it proves you never tested the part that matters. Show a
question that triggers the sensitive tool, walk through the pending
approval, reject it live, and show Claude's response to the `is_error`
result. Then run it again and approve it. Two outcomes, both real,
both demonstrated.

## Known limitations, specific to this project

```text
Known limitations:
- The reviewer interface is minimal -- a production version would need
  real auth, not a single shared reviewer credential.
- Validation re-checks the amount against the order, but not every
  conceivable business rule (e.g., refund-fraud patterns).
- No rate limit on how many approval requests one conversation can
  generate -- a flood of requests could still overwhelm a reviewer.
- Audit log is append-only storage, not yet wired to an alerting
  system for unusual patterns (e.g., repeated rejections).
```

Each of these is a real, specific gap — not a vague "could be more
secure." That specificity is what separates a project that looks
thoughtfully built from one that was finished just well enough to
demo.

## What's left: all three projects are done

With Project 3 wrapped, your portfolio has three distinct, real
capstone projects: a RAG knowledge assistant, an AI data analyst
working with SQL and APIs, and a tool-using agent with human approval,
security, and deployment built in. That's a deliberately varied set —
retrieval, structured data, and action-taking — covering the three
shapes of AI application work most hiring managers actually see.

Chapter 5, **Career Preparation**, is next: turning these three
projects into a resume, a portfolio presentation, and real interview
answers.

## Key terms

| Term | Meaning |
|---|---|
| Rejected-path demo | Showing the approval workflow actually blocking a tool call, not just approving everything |
| Portfolio variety | Having projects that cover genuinely different problem shapes, not three versions of the same pattern |

## Lab

Update your Project 3 README with the adapted five-part structure,
including a described (or recorded) rejected-path demo. Write your own
project's specific, honest limitations section using the example above
as a model, not a template to copy verbatim.

## Check yourself

- Why does demonstrating only the approved path undersell this
  project's actual achievement?
- Name one limitation specific to your own Project 3, written as
  specifically as the examples above.
- What three distinct problem shapes do Projects 1–3 together cover?
