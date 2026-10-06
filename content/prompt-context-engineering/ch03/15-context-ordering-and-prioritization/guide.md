# Lesson 15 — Context Ordering & Prioritization

**Chapter 3 · Context Engineering · Lesson 15 of 24**

## What you'll learn

- The "lost in the middle" effect: why position inside a context
  window affects recall, independent of whether something fits in
  budget
- An ordering recipe for assembling context: what goes first, what
  goes in the middle, what goes last
- Why reranking retrieved content for relevance and placing it for
  position are two separate steps
- How to tell an ordering problem apart from a budget problem when a
  response misses something that was technically in context

## Fitting isn't the same as being findable

Lessons 13 and 14 covered making sure context fits inside the window.
This lesson covers something that still matters once it does fit:
*where* each piece sits inside the window changes how reliably the
model actually uses it.

Long-context research has documented a real, repeatedly observed
effect nicknamed "lost in the middle": models recall and use
information placed near the **start** of a context window well, and
information placed near the **end** well, but information buried in
the **middle** of a long context is where recall is weakest — even
when it's clearly present and well within the token budget. A fact
sitting in the dead center of a 50,000-token context can be
functionally invisible to the model in a way the same fact at the
very start or the very end would not be.

## An ordering recipe

Given that effect, assembling context isn't just "does it fit" — it's
"what's in the strong positions."

1. **System instructions first.** Rules the model must never drop
   belong at the very start — the strongest position for anything that
   has to hold across the whole response.
2. **High-priority reference material near the start.** Anything the
   model absolutely has to get right goes close to the system prompt,
   not buried later.
3. **Lower-priority background in the middle.** Content that can
   tolerate weaker recall — supporting material, less critical
   context — is the right thing to put in the position that's weakest
   for recall. If something's going to be lost in the middle, let it
   be the thing that matters least.
4. **The single most relevant piece, right before the question, at
   the end.** The strongest position near the end of the window is
   reserved for whatever the model most needs front-of-mind to answer
   the immediate question — placed right next to that question, not
   wherever it happened to rank in a retrieval step's own output.

A real assembly order following this recipe:

```
1. SYSTEM PROMPT          (rules)
2. TOOL SCHEMAS           (fixed)
3. BACKGROUND DOCS        (lower priority)
4. OLDER HISTORY -> NEWER (chronological)
5. TOP-RANKED RETRIEVED
   CHUNK (placed last,
   closest to the question)
6. USER'S QUESTION        (final)
```

## Ranking and placing are two separate steps

A retrieval or reranking step that sorts candidate documents by
relevance score is solving a different problem than where those
documents end up in the assembled context window. It's entirely
possible to correctly rank the best-matching chunk first in a list of
results, and then assemble it into the middle of the final context —
the worst position for recall — because the assembly step never
accounted for position at all. Treat ranking (which content matters
most) and placement (where in the window it goes) as two decisions,
not one.

## Diagnosing an ordering problem

When a model's response misses something that was genuinely present
in the context and within budget, it's worth asking a question
distinct from Lesson 12's prompt-vs-context question: was this a
budget problem (it got compressed or cut) or a position problem (it
was present, in full, but sitting in the weakest spot in the window)?
The fix for the second is re-ordering, not re-writing or re-trimming.

## Key terms

| Term | Meaning |
|---|---|
| Lost in the middle | The documented effect where content in the middle of a long context is recalled less reliably than content near the start or end |
| Ranking | Scoring candidate content by relevance |
| Placement | Deciding where in the assembled context window that content actually goes |

## Lab

1. Take a context assembly you've built in an earlier lesson (or sketch
   one) and write out the order its pieces are currently in.
2. Re-order it using the recipe above — system first, high-priority
   reference near the start, lower-priority background in the middle,
   the single most relevant piece right before the question — and note
   what moved.

## Check yourself

You're ready for Lesson 16 when you can explain, in your own words,
why "it's in the context" and "it's in a position the model will
reliably use" are two different claims — and can reorder a context
assembly to put what matters most in the strong positions.
