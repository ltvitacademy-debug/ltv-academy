# Lesson 12 — The ReAct Pattern

**Chapter 3 · Agent Architectures & Patterns · Lesson 12 of 32**

## What you'll learn

- What ReAct actually stands for, and the paper it comes from
- Why interleaving reasoning with action beats "reason first, then act" or "act without reasoning"
- A full, real ReAct-style trace, thought by thought
- How ReAct relates to the loop from Lesson 2 — it's a specific style of running it

## Where the name comes from

**ReAct** — "Reason + Act" — comes from a 2022 research paper
(Yao et al., *ReAct: Synergizing Reasoning and Acting in Language
Models*) that proposed a simple but influential idea: have the model
produce an explicit **Thought** before every **Action**, and feed the
resulting **Observation** back in before the next Thought. It's not a
framework or a product — it's a prompting pattern, one that most tool-use
agents (including the plain plan/act/observe loop from Lesson 2) now use
in some form, explicitly or not.

## Why interleaving beats the alternatives

Two simpler alternatives both have a real failure mode ReAct was
designed to fix:

- **Reasoning only, no acting** — the model can reason fluently but has
  no way to check its reasoning against the real world. It can talk
  itself into a confident, wrong answer.
- **Acting only, no visible reasoning** — Lesson 2's loop already acts
  and observes, but without an explicit Thought step, there's no record
  of *why* the model chose that action, which makes a wrong choice much
  harder to debug or correct mid-task.

Interleaving both means each Thought is grounded in the most recent real
Observation, not just the model's own prior reasoning — and each Action
is justified by a Thought you can actually read.

## A real trace, Thought by Thought

Here's what a ReAct-style trace looks like for "How many years after the
founding of the company whose stock symbol is on the user's screen did
it IPO?" — a question needing two different lookups in sequence:

```
Thought: I need the company name for this ticker before anything else.
Action: get_company_info(ticker="NVDA")
Observation: {"name": "NVIDIA Corporation", "founded": 1993}

Thought: Now I need NVIDIA's IPO date to compute the gap.
Action: get_ipo_date(company="NVIDIA Corporation")
Observation: {"ipo_date": "1999-01-22"}

Thought: Founded 1993, IPO 1999 — that's 6 years. I have enough to answer.
Action: (none — final answer)
Final Answer: NVIDIA IPO'd 6 years after it was founded.
```

Each Thought references the previous Observation directly — the second
Thought wouldn't make sense without the first Observation already in
context, the same dependency Lesson 2's trace demonstrated without
naming the Thought step explicitly.

## ReAct is a style, not a separate mechanism

Nothing about ReAct requires new API fields. In the Claude API, "Thought"
often shows up as the narration text Lesson 7 covered (the text block
alongside a `tool_use` block), or as an explicit extended-thinking block
on models that support it. The pattern is about *how* you prompt and
structure the loop — asking for reasoning before action, every time — not
a different request shape underneath.

## Key terms

| Term | Meaning |
|---|---|
| ReAct | "Reason + Act" — interleaving explicit reasoning (Thought) with tool calls (Action) and their results (Observation) |
| Thought | The model's stated reasoning for what to do next, grounded in the latest Observation |
| Observation | The real result fed back after an Action — what the next Thought has to account for |

## Check yourself

You're ready for Lesson 13 when you can explain what specifically breaks
if you remove the explicit "Thought" step from the NVIDIA trace above,
even though the Actions and Observations stay the same.
