# Lesson 3 — System Prompts, Done Well

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 3 of 24**

## What you'll learn

- What a system prompt is and how it differs from a user message
- The kinds of instructions that belong in a system prompt versus a user turn
- A worked example of a weak system prompt rewritten into a strong one
- Why a system prompt should describe role and boundaries, not micromanage every reply

## What a system prompt actually is

Most chat-based LLM APIs accept a **system prompt** — a message that sits
above the conversation and shapes how the model behaves across every user
turn, rather than being a one-time instruction. Where a user message says
"do this one thing," a system prompt says "behave this way for the whole
conversation."

```
System prompt:    sets role, tone, rules, and boundaries for
                   the ENTIRE conversation — set once
User message:      a single request within that conversation —
                   set every turn
```

## A weak system prompt

```
System: "You are a helpful assistant."
```

This is the default the model already behaves like. It gives the model no
actual information about who it's talking to, what it should or shouldn't
do, or what "helpful" means in this specific product. It's not wrong — it's
just empty.

## A strong system prompt

```
System: "You are a support agent for Northwind
Traders, a B2B wholesale supplier. Answer
only questions about orders, shipping, and
returns. For billing disputes, say you're
escalating to a human and stop there. Keep
replies under 100 words. Never guess at an
order status — if you don't have the data,
say so."
```

This version gives the model a **role** (support agent for a specific
company), a **scope** (orders, shipping, returns — not billing), an
**escalation rule** (hand off billing disputes), a **format constraint**
(under 100 words), and an explicit **instruction against guessing**. Every
line removes a decision the model would otherwise have to make up on its
own, differently, every conversation.

## What belongs in the system prompt vs. the user message

| Put in the system prompt | Put in the user message |
|---|---|
| Role and persona ("you are...") | The specific question or task right now |
| Rules that apply to every turn | One-off details (today's date, a specific order number) |
| Tone and formatting defaults | A request to change tone or format just this once |
| Hard boundaries (what never to do) | — |

A system prompt that tries to anticipate and answer every possible user
question turns into an unreadable wall of text that's hard to maintain and
easy for the model to lose track of. The job of a system prompt is to set
the **role and the boundaries** — not to pre-script every reply.

## Key terms

| Term | Meaning |
|---|---|
| System prompt | An instruction set above the conversation, shaping behavior for every turn |
| Role | Who the model is acting as (support agent, tutor, code reviewer) |
| Scope | What topics or tasks the model should and shouldn't handle |
| Escalation rule | An instruction for what to do when a request falls outside scope |

## Lab

Write a system prompt for an assistant in a domain you know well (a
recipe helper, a study tutor, a code reviewer for your team's style
guide). Give it a role, a scope, at least one hard boundary, and one
escalation rule — then test it against a question that's deliberately
outside its scope and see whether it follows your rule.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, the
difference between what belongs in a system prompt and what belongs in a
user message — and why "you are a helpful assistant" isn't actually doing
any work.
