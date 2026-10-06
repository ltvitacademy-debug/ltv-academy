# Lesson 9 — Role-Based Prompting

**Chapter 2 · Advanced Prompting Techniques · Lesson 9 of 24**

## What you'll learn

- What role-based prompting is and how it differs from a system prompt's role field
- A worked example of the same question answered under three different roles
- Why a role changes vocabulary, priorities, and depth — not just tone
- Where role-based prompting can go wrong: stereotyping a role instead of specifying expertise

## Assigning a role shapes the whole answer

**Role-based prompting** means instructing the model to answer as a
specific kind of expert or persona, which shifts not just the tone of the
response but the vocabulary it reaches for, what it treats as important
enough to mention, and how deep it goes on any one point.

```
Question: "Should I use a NoSQL or SQL
database for this project?"

As a startup CTO:        fast answer, weighs time-
                          to-market and team size
As a database architect: weighs consistency
                          guarantees, query patterns,
                          schema evolution in detail
As a cost-conscious
freelancer:               weighs hosting cost and
                          setup time above all else
```

Same question, three legitimately different — and all defensible —
answers, because each role has a different idea of what matters most.

## A worked example

```
Prompt: "You are a senior security engineer
reviewing a pull request. Flag anything in
this code that could be a vulnerability, and
explain the risk in one sentence each."
```

Compare that to the same code reviewed with no role assigned at all: a
generic review tends to comment on style and readability first, because
nothing told the model that security specifically is what matters here.
The role doesn't just change the tone of the reply — it changes what the
model prioritizes looking for in the first place.

## Role-based prompting isn't a system-prompt duplicate

Lesson 3 covered the system prompt's role field — a standing identity for
an entire application ("you are Northwind's support agent"). Role-based
prompting as covered here can be that, or it can be a **per-request**
instruction layered on top, assigning a role just for one specific task
("for this one question, answer as a tax accountant") without changing
the assistant's overall identity for the rest of the conversation.

## Where it goes wrong

```
Vague role:      "Act like a doctor."
                  -> risks a shallow, stereotyped
                     answer with no real expertise
                     behind it

Specific role:    "You are a board-certified
                  pediatrician explaining a fever
                  to a worried parent, in plain,
                  reassuring language."
                  -> specifies WHO, WHO FOR, and
                     HOW, not just a job title
```

A one-word role ("act like a doctor") gives the model a costume, not
expertise. A useful role specifies the professional context, the
audience, and often the communication style — the same four-ingredients
discipline from Lesson 1, just applied to defining a persona instead of a
task.

## Key terms

| Term | Meaning |
|---|---|
| Role-based prompting | Instructing the model to answer as a specific expert or persona |
| Persona | The specific identity and expertise the model is asked to adopt |
| Per-request role | A role assigned for a single task, distinct from the system prompt's standing identity |

## Lab

Pick a question with no single right answer (a tooling choice, a design
tradeoff, a piece of advice). Ask it under three different, specific
roles. Compare what each role prioritizes, and notice whether a vague
one-word role ("act like an expert") produces a noticeably shallower
answer than a fully specified one.

## Check yourself

You're ready for Lesson 10 when you can explain, without looking, why
"act like a doctor" is a weaker role prompt than "you are a
board-certified pediatrician explaining a fever to a worried parent."
