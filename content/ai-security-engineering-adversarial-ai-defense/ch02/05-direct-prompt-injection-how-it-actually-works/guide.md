# Lesson 5 — Direct Prompt Injection: How It Actually Works

**Chapter 2 · Prompt Injection Attacks and Defenses · Lesson 1 of 4**

## What you'll learn

- Why an LLM has no built-in, enforced boundary between "instructions"
  and "data" the way traditional software does
- What direct prompt injection actually is, as OWASP's LLM01 category
  defines it, and why it's conceptually different from classic
  injection flaws like SQL injection
- The recognizable *shapes* a direct injection attempt takes, so you
  can spot one in a transcript or a log line
- Why this is a design problem, not a typo problem — and why "just be
  more careful with the system prompt" was never going to fix it

## There is no instruction/data wall by default

Every normal program you've secured up to this point draws a hard
line between code and data. A SQL engine parses a query's structure
separately from the values bound into it; a web server's routing
layer is separate from the request body it hands to your application
code. That separation is *why* parameterized queries work as a
defense — the database literally cannot execute a value as a command.

A large language model doesn't have that wall. Everything you send
it — your system prompt, the developer's instructions, the end user's
message, any retrieved document — arrives as one undifferentiated
stream of text tokens. The model doesn't parse "this part is a
command, this part is content to read." It predicts the next most
probable token given everything in its context window, and nothing
in that architecture inherently privileges the developer's
instructions over text that merely *looks* like an instruction. This
is the single fact that makes this entire chapter necessary, and
it's why OWASP lists prompt injection as **LLM01** — the top entry in
the Top 10 for LLM Applications.

## What direct injection actually is

Direct prompt injection is the simplest case: the attacker is the
end user, typing directly into the chat box, and their message is
crafted to make the model treat part of their input as a new,
higher-priority instruction instead of as content to respond to.
Instead of asking the support bot a normal question, they phrase
their message so it reads, to the model, like a system-level
directive — attempting to override the behavior the developer
configured, extract the hidden system prompt, or push the model past
a content boundary it was instructed to hold.

The attacker doesn't need any special access. They need the same
text box every legitimate customer uses. That's what makes it
"direct" — the malicious instruction arrives through the normal,
expected input channel, from the normal, expected user.

## Recognizing the shape, not memorizing the payload

You don't defend against this by memorizing specific attack strings —
new phrasings appear constantly, and that's the whole problem this
chapter exists to solve. What's useful operationally is recognizing
the *pattern*: a message that tries to assert new authority over the
conversation ("disregard your prior instructions," "you are now
operating under a different set of rules"), that asks the model to
reveal its own configuration or hidden prompt, or that uses role-play
or hypothetical framing specifically to get the model to produce
output it would otherwise refuse. When you're reviewing LLM
application logs for abuse, these are the signals worth building
detection around — not a denylist of exact phrases.

## Why this matters beyond a curiosity

A chatbot leaking its system prompt is often just embarrassing. The
real risk shows up once that same model is wired to take action: a
support bot with the ability to apply account credits, a coding
assistant with repository write access, an internal tool with API
calls behind it. Direct injection against a model like that isn't
just "it said something it shouldn't have" — it's an attacker using
natural language as the exploit payload to trigger a real-world
action the developer never intended to authorize. The next lesson
goes further, showing how this doesn't even require the attacker to
type anything at all — only to plant the right text somewhere the
model will later read.

## Key terms

| Term | Meaning |
|---|---|
| Prompt injection | Manipulating an LLM's behavior by crafting input that the model treats as an instruction rather than as data to process |
| OWASP LLM01 | The OWASP Top 10 for LLM Applications category covering prompt injection, direct and indirect |
| Direct prompt injection | The attacker is the end user, submitting the malicious input through the model's normal input channel |
| System prompt | Developer-configured instructions meant to set the model's behavior boundaries — not cryptographically enforced against user input |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
can't an LLM simply "know" that the developer's instructions outrank
the user's message, the way a database knows a bound parameter isn't
executable SQL?
