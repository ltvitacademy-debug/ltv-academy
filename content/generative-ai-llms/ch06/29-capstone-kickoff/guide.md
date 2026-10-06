# Lesson 29 — Capstone Kickoff

**Chapter 6 · Capstone · Lesson 29 of 31**

## What you'll learn

- What you're building in this capstone: a real, working command-line chat application
  against Anthropic's Messages API
- Exactly which concepts from Chapters 1–5 the build draws on, so you can see the whole
  course land in one project
- What's provided vs. what you'll write yourself
- The environment setup you need before Lesson 30: SDK, API key, a place to run Python

## What you're building

A **command-line chat application** — not a toy single-request script, but a real,
multi-turn conversation loop: it keeps the message history, sends it to Claude on every
turn, streams the reply back token by token as it's generated, and lets the conversation
keep going until the user ends it. This is deliberately the smallest project that still
exercises a *real* production pattern: the same message-history-plus-streaming shape
sits underneath every commercial chat product you've ever used.

## Why this project, specifically

Every chapter in this course points at this build:

- **Chapter 1** (how LLMs work) explains *why* the model needs the full message history on
  every turn — it has no memory between calls (Lesson 4).
- **Chapter 2** (the landscape) is why you'll pick a specific Claude model and know what
  trade-off that choice makes (Lesson 6, Lesson 10).
- **Chapter 3** (working with the API) is the build, directly: chat completions (Lesson
  13), roles (Lesson 14), and streaming (Lesson 16) are the exact three lessons this
  project assembles into one working loop.
- **Chapter 4** (fine-tuning) is why you're *not* fine-tuning anything here — a good system
  prompt (Lesson 20) does this job.
- **Chapter 5** (multimodal) is optional extension territory — Lesson 31 points you at it
  if you want to go further after the core build works.

## What's provided vs. what you build

| Provided (this lesson + Lesson 30's walkthrough) | You write |
|---|---|
| The exact, current Messages API streaming syntax | The conversation loop itself |
| The message-history data structure | Your own system prompt / persona |
| Error-handling guidance | The actual Python file, end to end |

This is a guided build, not a fill-in-the-blank template — Lesson 30 walks the real code
pattern piece by piece, and you assemble and run your own version.

## Environment setup, before Lesson 30

1. **Python 3.9+** installed and a terminal you can run it from.
2. **Install the SDK**: `pip install anthropic`
3. **An API key** from the Claude Console, set as an environment variable (never hard-coded
   in the file):
   ```
   export ANTHROPIC_API_KEY="your-key-here"
   ```
4. Confirm it works with a one-line sanity check before Lesson 30:
   ```python
   import anthropic
   client = anthropic.Anthropic()
   print(client.messages.create(
       model="claude-opus-4-5", max_tokens=20,
       messages=[{"role": "user", "content": "Say hi in 3 words."}]
   ).content[0].text)
   ```

If that prints a short reply, your environment is ready for Lesson 30.

## The rubric

Your finished Lesson 30 build should: (1) maintain a growing `messages` list across turns,
not just send one message and exit; (2) use `stream: true` so replies print incrementally,
not all at once; (3) include a system prompt that gives the assistant a defined persona or
purpose; (4) let the user type `quit` (or similar) to exit cleanly.

## Key terms

| Term | Meaning |
|---|---|
| Conversation loop | Code that repeatedly prompts the user, calls the API, and appends to history |
| Message history | The growing `messages` array that gives the model its only memory of the conversation |
| SDK | Anthropic's official Python/TypeScript client library, wrapping raw HTTP calls |

## Lab

1. Install the `anthropic` package and set your API key as an environment variable.
2. Run the sanity-check snippet above and confirm you get a real reply back.
3. Before Lesson 30, write down (in plain English) the system prompt/persona you want your
   chat application to have.

## Check yourself

You're ready for Lesson 30 when your environment is set up, your sanity check printed a
real reply, and you can state the four rubric requirements above from memory.
