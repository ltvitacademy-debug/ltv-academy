# Lesson 14 — Context Compression Techniques

**Chapter 3 · Context Engineering · Lesson 14 of 24**

## What you'll learn

- Four concrete techniques for shrinking context that's blown past its
  budget cap, and when to reach for each
- A real before/after token comparison for rolling summarization
- A real before/after example of structured extraction
- Why every compression technique trades some risk of losing a detail
  for a smaller token footprint — and how to decide if that trade is
  worth it

## Compression is what you do once a cap is hit

Lesson 13 set hard caps on the variable parts of a context budget —
conversation history, retrieved content. A cap doesn't mean "stop
including anything new past this point"; it means "shrink what's
already there to make room." That shrinking is compression, and there
isn't one way to do it.

## Four techniques

**1. Rolling summarization.** Replace older turns with a compact,
running summary instead of keeping them verbatim. In a real example:

```
RAW: 14 turns of support chat
  = 6,400 tokens

COMPRESSED: rolling summary of
turns 1-11 + the last 3 turns
verbatim
  = 1,850 tokens

71% smaller, same facts carried
forward into the next call.
```

The most recent turns stay verbatim (recent wording often still
matters for the immediate next response); older turns get collapsed
into the facts worth keeping.

**2. Truncation.** Drop the oldest turns outright, with no summary at
all. Cheaper than summarization (no extra model call to produce the
summary), but riskier — anything only mentioned in a dropped turn is
genuinely gone, not just compressed.

**3. Structured extraction.** Turn a long document into the specific
facts a task actually needs, instead of keeping the prose:

```
BEFORE (very long doc excerpt):
"...the refund window is 30 days
from delivery, extended to 45 for
premium members, and does not
apply to final-sale items..."

AFTER (extracted facts):
{ "refund_days": 30,
  "premium_refund_days": 45,
  "final_sale_excluded": true }
```

A three-field JSON object carries the same decision-relevant facts as
a paragraph, at a fraction of the token cost — but only the facts the
extraction step was told to look for. A nuance outside that schema is
lost.

**4. Deduplication and prompt caching.** If the same large block of
context — a system prompt, a static reference document, a set of tool
schemas — is unchanged from the previous call, there's no need to
re-process it from scratch. Caching an unchanged prefix (a feature
most model APIs support directly) avoids paying the full token cost
again for content that hasn't moved.

## Every technique trades accuracy for size

None of these are free. A summary can drop a detail a later turn
turns out to need. Truncation can lose something entirely. Structured
extraction only captures what its schema was designed to capture. The
practical question isn't "which technique is best" — it's "which is
the lightest technique that still protects the facts my eval set
(Lesson 18) actually checks for." A support bot that only ever needs
the last three turns and today's open ticket can truncate aggressively;
one that needs to remember a customer's preference from turn one
cannot.

## Key terms

| Term | Meaning |
|---|---|
| Rolling summarization | Replacing older context with a compact, periodically-updated summary |
| Truncation | Dropping the oldest context outright, with no summary |
| Structured extraction | Converting prose into a small set of named facts a task actually needs |
| Prompt caching | Reusing an unchanged context prefix instead of resending and reprocessing it |

## Lab

1. Take a long document or transcript (even a few paragraphs) and
   write both a truncated version and a 2-3 sentence rolling summary
   of it. Compare the two for which one would actually answer a
   specific question about the content.
2. Pick one fact-heavy paragraph and extract it into a 3-5 field JSON
   object. Note, honestly, one real nuance from the paragraph the JSON
   doesn't capture.

## Check yourself

You're ready for Lesson 15 when you can look at a piece of context
that's over budget and name which of the four techniques fits best —
and explain what detail that technique risks losing.
