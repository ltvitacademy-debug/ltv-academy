# Lesson 3 — System Prompts, Done Well · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

So far every prompt we've looked at has been a single message. But most
real applications also have a system prompt — instructions that sit above
the whole conversation. Let's see what makes one actually earn its place.

## S2 · CODE CARD (system vs user)

A system prompt sets role, tone, rules, and boundaries for the entire
conversation, set once. A user message is a single request within that
conversation, set every turn. Mixing those two jobs up is where most weak
system prompts go wrong.

## S3 · CODE CARD (weak example)

Here's a system prompt you'll see constantly: "you are a helpful
assistant." It's not wrong, exactly — it's just empty. It's already the
model's default behavior. It gives the model no actual information about
who it's talking to or what it should and shouldn't do.

## S4 · CODE CARD (strong example)

Now compare it to this: a support agent for a specific company, scoped to
orders, shipping, and returns, with an explicit rule to escalate billing
disputes, a length limit, and an instruction to never guess at an order
status. Every line removes a decision the model would otherwise invent on
its own.

## S5 · STEPS CARD (what belongs where)

So what goes in the system prompt versus the user message? Role and
persona, rules for every turn, tone defaults, and hard boundaries belong
in the system prompt. The specific question right now, and one-off
details, belong in the user message.

## S6 · OUTRO CARD

A good system prompt sets the role and the boundaries — it doesn't try to
pre-script every possible reply. Next lesson, we turn that reusable role
and structure into something you can actually save and reuse: a prompt
template.
