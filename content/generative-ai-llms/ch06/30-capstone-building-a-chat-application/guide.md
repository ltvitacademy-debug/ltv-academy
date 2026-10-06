# Lesson 30 — Capstone: Building a Simple Chat Application

**Chapter 6 · Capstone · Lesson 30 of 31**

## What you'll learn

- The real, current Python streaming pattern for Anthropic's Messages API, verified
  against the SDK docs — `client.messages.stream(...)` and `stream.text_stream`
- How to assemble a growing `messages` list into a genuine multi-turn conversation loop
- Where the system prompt goes, and why it's set once outside the loop
- The complete, working chat application, built piece by piece from code you already know

## The three pieces you already have

This build doesn't introduce new API concepts — it assembles three things from Chapter 3
into one program: a **messages list** (Lesson 13), a **system prompt** (Lesson 14), and
**streaming** (Lesson 16). The only genuinely new part is the loop that ties them together
across multiple turns.

## Piece 1 — the conversation loop skeleton

```python
import anthropic

client = anthropic.Anthropic()
messages = []  # grows with every turn — this IS the conversation

while True:
    user_input = input("You: ")
    if user_input.lower() in ("quit", "exit"):
        break
    messages.append({"role": "user", "content": user_input})
    # Lesson 30, piece 2 goes here: call the model, stream the reply
```

`messages` starts empty and only ever grows — every user turn and every assistant reply
gets appended, so the full conversation goes out on every single call (Lesson 4's "no
memory between calls," made concrete).

## Piece 2 — the real streaming call

Verified directly against Anthropic's current SDK docs, this is the real pattern — not the
raw SSE events from Lesson 16, but the SDK's higher-level wrapper around them:

```python
full_reply = ""
with client.messages.stream(
    model="claude-opus-4-5",
    max_tokens=1024,
    system="You are a friendly, concise coding mentor.",
    messages=messages,
) as stream:
    print("Claude: ", end="", flush=True)
    for text in stream.text_stream:
        print(text, end="", flush=True)
        full_reply += text
print()  # newline after the reply finishes

messages.append({"role": "assistant", "content": full_reply})
```

`client.messages.stream(...)` is a context manager; iterating `stream.text_stream` yields
each text fragment as it arrives — under the hood, it's doing exactly the
`content_block_delta` event parsing from Lesson 16, so you never have to touch raw SSE
yourself. Two details matter: `system` is a **separate parameter**, not a message in the
list (Lesson 14), and you must manually append the **completed** reply back onto
`messages` once streaming finishes — the SDK doesn't do that for you.

## Piece 3 — the complete loop

```python
import anthropic

client = anthropic.Anthropic()
messages = []
SYSTEM = "You are a friendly, concise coding mentor."

while True:
    user_input = input("You: ")
    if user_input.lower() in ("quit", "exit"):
        break
    messages.append({"role": "user", "content": user_input})

    full_reply = ""
    with client.messages.stream(
        model="claude-opus-4-5", max_tokens=1024,
        system=SYSTEM, messages=messages,
    ) as stream:
        print("Claude: ", end="", flush=True)
        for text in stream.text_stream:
            print(text, end="", flush=True)
            full_reply += text
    print()
    messages.append({"role": "assistant", "content": full_reply})
```

That's the whole application — under 25 lines, and every line traces back to a lesson
you've already completed.

## Where to go from here (same program, bigger)

Once this runs, each of these is an extension using chapters you've already finished, not
new material: wrap the API call in a `try/except` for a dropped connection; add a
`tools` parameter for function/tool calling (Lesson 17); ask for `response_format`-style
structured JSON instead of free text (Lesson 18); or accept an `image` content block
(Lesson 26) so the chat can take a picture as part of the user turn. None of those change
the loop's shape — they extend `messages` and the call parameters you've already built.

## Key terms

| Term | Meaning |
|---|---|
| `client.messages.stream(...)` | The SDK's context-manager wrapper around the raw SSE stream |
| `stream.text_stream` | An iterator yielding each text fragment as it arrives |
| Conversation loop | The `while True` structure that keeps the app running turn after turn |
| `full_reply` accumulator | A string built up from streamed fragments, appended to history once complete |

## Lab

1. Build and run the complete loop above. Have a real multi-turn conversation with it —
   confirm it remembers something you said two turns ago.
2. Change the `system` string to a different persona and observe how the responses change.
3. Deliberately break something (e.g., comment out the `messages.append` for the assistant
   reply) and observe how the model "forgets" context — this demonstrates Lesson 4 directly.

## Check yourself

You're ready for Lesson 31 when your chat application runs, streams visibly, remembers
prior turns, and you can explain why the assistant's reply must be manually appended back
onto `messages` after the stream finishes.
