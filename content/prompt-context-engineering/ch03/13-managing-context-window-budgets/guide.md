# Lesson 13 — Managing Context Window Budgets

**Chapter 3 · Context Engineering · Lesson 13 of 24**

## What you'll learn

- Why a context window needs to be managed like a budget, not filled
  until it errors out
- A concrete order of operations for allocating a token budget: output
  reserve, fixed costs, variable caps, safety margin
- A rule of thumb for estimating token counts without running a
  tokenizer
- Why skipping caps on history or retrieval is the most common way a
  budget quietly breaks

## The window is a hard ceiling, not a soft guideline

Every model has a maximum context window — the total number of tokens
it can process in a single call, input and output combined. Go over
it, and the call fails outright or gets truncated. That makes "how
much context fits" a real constraint to plan around, not something to
discover when a long conversation suddenly errors out.

## A worked budget

Here's a concrete budget for a 200,000-token window:

```
TOTAL WINDOW:          200,000 tokens
- OUTPUT RESERVE:        -8,000  (set aside first)
= USABLE FOR INPUT:    192,000
- SYSTEM PROMPT:         -1,800  (fixed)
- TOOL SCHEMAS (x5):     -4,200  (fixed)
= REMAINING:           186,000
- HISTORY CAP:         -40,000  (variable, trimmed)
- RETRIEVAL CAP:       -20,000  (variable, top-k)
= SAFETY MARGIN LEFT:  126,000
```

Four categories, in the order you should think about them:

1. **Output reserve.** Set aside tokens for the model's response
   *before* anything else. A response that gets cut off mid-sentence
   because the input used up nearly the whole window is a worse
   failure than trimming the input a bit more.
2. **Fixed costs.** The system prompt and tool schemas (Lesson 16)
   don't change from call to call — they're a known, constant cost.
   Measure them once and subtract them.
3. **Variable costs, capped.** Conversation history and retrieved
   content (Lessons 14-15) both grow — history with every turn,
   retrieval with how many chunks a query pulls back. Each needs a
   hard ceiling, or either one will eventually consume the entire
   remaining budget on its own.
4. **Safety margin.** Whatever's left after the caps above. This
   absorbs estimation error — token counts from a rule of thumb (below)
   are approximate, not exact.

## Estimating tokens without a tokenizer

You don't need to run the model's actual tokenizer to catch a budget
problem early. A workable rule of thumb for English text:

```
~4 characters per token
~0.75 words per token

Example: a 3,000-word policy doc
3,000 words / 0.75  =  ~4,000 tokens
```

This is an estimate, not exact — the real token count depends on the
specific tokenizer. Code, non-English text, and heavily formatted
content (lots of punctuation, markup) tend to tokenize *less*
efficiently per character than plain English prose, so pad the
estimate for those. Good enough to catch "this document alone is a
third of my retrieval cap" before you find out the hard way.

## Why skipping the caps is the common failure

A budget that only tracks fixed costs looks fine on day one — the
system prompt and tools never grow. The failure shows up later, when a
conversation runs long (history keeps growing, uncapped) or a
retrieval step pulls back more chunks than expected (no ceiling on
retrieval). Without a cap on each variable component, one of them
eventually eats the entire remaining budget, crowding out everything
else or blowing the window outright. Lesson 14 covers what to actually
do once a variable component hits its cap — trim it, not the budget.

## Key terms

| Term | Meaning |
|---|---|
| Context window | The hard token ceiling on a single model call, input and output combined |
| Output reserve | Tokens set aside for the response, subtracted first, before input budgeting |
| Fixed cost | Context that doesn't change call to call (system prompt, tool schemas) |
| Variable cost | Context that grows (history, retrieval) — needs an explicit cap, not an open-ended allowance |

## Lab

1. For a prompt + tool setup you've built in this course, measure (or
   estimate with the rule of thumb) the token cost of the system
   prompt and any tool schemas.
2. Pick a real context window size (for example, 200,000 tokens) and
   write out a budget worksheet like the one above: output reserve,
   fixed costs, then a cap for history and a cap for retrieval that
   leaves a safety margin of at least 10% of the total window.

## Check yourself

You're ready for Lesson 14 when you can produce a real token-budget
worksheet for a context window — with an output reserve, fixed costs
subtracted, and explicit caps on every variable component — not just
describe the idea of one.
