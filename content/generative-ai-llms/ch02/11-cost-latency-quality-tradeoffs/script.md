# Lesson 11 — Cost, Latency & Quality Trade-offs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Cost, speed, and quality move together across every provider in this course. Improve one, and
you're usually giving something up on one of the other two. This lesson puts real numbers on that
trade-off.

## S2 · CODE CARD (real pricing across tiers)

Checked directly against Anthropic's own pricing documentation. Haiku: one dollar in, five out,
per million tokens, fastest. Sonnet: two and ten, fast. Opus: four and twenty, moderate. Fable:
ten and fifty, slower. Price and latency climb together, tier by tier.

## S3 · CODE CARD (worked cost math)

Here's what that means for an actual workload — one million input tokens, two hundred thousand
output tokens, in a day. On Haiku: two dollars. On Opus: eight dollars. On Fable: twenty dollars.
Same exact token volume, a ten-times cost spread, purely from which tier you pick.

## S4 · STEPS CARD (batch processing / prompt caching)

Two levers change that math without switching models at all. Batch processing — requests that
don't need an instant response run at roughly half price, in exchange for asynchronous
turnaround. Prompt caching — reused context, like a long system prompt, gets re-read at a small
fraction of normal input cost on later requests.

## S5 · OUTRO CARD

The exact dollar figures here will be stale soon. What won't: cost and latency scale together,
the spread between tiers is usually large, and batching and caching are worth checking before you
assume the sticker price is final. Next lesson: exactly how fast these numbers actually change,
and what that means for code you've already shipped.
