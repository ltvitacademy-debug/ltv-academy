# Lesson 11 — Tool Output Formatting

**Chapter 2 · Tool Calling & Function Design · Lesson 11 of 32**

## What you'll learn

- The real content shapes a tool_result can carry: string, text blocks, images, documents
- Why high-signal output (Lesson 6's principle) applies to every single result, not just design time
- A concrete before/after: raw API dump vs. a formatted result
- How untrusted tool output has to be treated differently from output you generated yourself

## What a tool_result's content can actually be

Lesson 3 showed `content` as a plain string. The real API accepts more
shapes, per Anthropic's current documentation:

```
content: "a plain string"                 -- simplest case
content: [{"type": "text", "text": "..."}]  -- one or more text blocks
content: [{"type": "text", ...},
          {"type": "image", "source": {...}}]  -- text + image together
content: [{"type": "document",
           "source": {"type": "text", "media_type": "text/plain",
                       "data": "..."}}]      -- a document block
```

An empty `tool_result` (just `tool_use_id`, no `content`) is also valid —
useful for a side-effect tool, like `mark_as_read`, that genuinely has
nothing to report back.

## High-signal output applies every time, not just at design time

Lesson 6 introduced returning only what the model needs. That's a design
principle for the *schema*; this lesson is about applying it to every
*actual result* a tool call produces. A real weather API doesn't return
`"91F, clear"` — it returns something like:

```json
{"coord": {"lon": -97.74, "lat": 30.27}, "weather": [{"id": 800,
 "main": "Clear", "description": "clear sky", "icon": "01d"}],
 "base": "stations", "main": {"temp": 91.2, "feels_like": 93.1,
 "temp_min": 88.9, "temp_max": 93.0, "pressure": 1012, "humidity": 31},
 "visibility": 10000, "wind": {"speed": 3.1, "deg": 190}, "clouds":
 {"all": 0}, "dt": 1717000000, "sys": {...}, "timezone": -18000,
 "id": 4671654, "name": "Austin", "cod": 200}
```

Passing that whole blob back as the `tool_result` wastes context on
fields the model has no use for, and forces it to find "91" buried in
`main.temp` itself. Formatting it down to `"91°F, clear, feels like 93°F"`
before it goes back is the same discipline Lesson 6 applied to the
schema, now applied to the actual payload every single call produces.

## Treat tool output as untrusted content

A `tool_result` very often carries content from outside your control —
a web page, an inbound email, a third-party API response. Anthropic's
own guidance is direct: **treat that content as untrusted.** An attacker
who can influence it could embed hidden instructions trying to redirect
Claude — indirect prompt injection, the subject of Chapter 5, Lesson 26.
The practical guidance now, while formatting output, is to keep that
untrusted content inside proper `tool_result` blocks rather than folding
it into a `system` prompt or a plain `text` block, where it would carry
more apparent authority than it should.

## Key terms

| Term | Meaning |
|---|---|
| `tool_result` content shapes | String, text block(s), image, or document — the real accepted formats |
| High-signal formatting | Trimming a raw tool payload down to only what the model needs, applied per call |
| Untrusted tool content | Output sourced from outside your control, which may contain embedded instructions and should be handled as data, not as trusted authority |

## Check yourself

You're ready for Chapter 3 when you can take a bloated, real JSON API
response and write the one-line formatted string you'd actually return
as a `tool_result`.
