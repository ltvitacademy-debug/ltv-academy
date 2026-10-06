# Lesson 12 — Model Versioning & Deprecation

**Chapter 2 · The LLM Landscape · Lesson 12 of 31**

## What you'll learn

- The real lifecycle every hosted model moves through, in a provider's own terms
- How much advance notice providers actually commit to before retiring a model
- A real deprecation case, pulled directly from Anthropic's published history
- What this means for how you should write code that calls these APIs

## This chapter closes on the one constant: nothing stays current

Chapter 2 opened with today's providers and families (Lesson 8). This lesson is the honest
closer: every specific model name in this chapter will eventually stop working. That's not a
flaw — it's a deliberate, documented lifecycle, and understanding it is what keeps a real
application from breaking without warning.

## The real lifecycle, in a provider's own terms

Checked directly against Anthropic's published model-deprecations documentation, every model
moves through defined states:

1. **Active** — fully supported, recommended for current use
2. **Legacy** — still works, no longer receiving updates, may be deprecated later
3. **Deprecated** — still functional but no longer recommended; a replacement and a retirement
   date are assigned
4. **Retired** — no longer available; requests fail outright

Anthropic commits to **at least 60 days' notice** before retiring a publicly released model, and
separately commits to long-term preservation of model weights even after public retirement.
OpenAI's own documentation states a similar but distinct policy: at least 6 months' notice for
generally-available models, at least 3 months for specialized variants, and as little as 2 weeks
for preview/experimental models — notice periods differ by provider and by how "production-ready"
a given model was positioned as.

## A real case, not a hypothetical

From Anthropic's own published deprecation history: on September 30, 2026, Anthropic notified
developers that Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) would retire on November 30,
2026 — a 61-day notice window — with Claude Sonnet 5.5 named as the recommended replacement. This
is the same pattern repeated throughout their history: a dated model ID, a specific retirement
date, and a named replacement, every time.

## What this means for code you actually ship

A few concrete practices follow directly from this lifecycle, straight from provider guidance:

- **Pin specific, dated model IDs** in production rather than always floating to "whatever is
  newest" — predictability matters more than always having the latest model by default.
- **Watch deprecation notices actively** — providers notify by email and in documentation, but
  only if someone is actually watching for it.
- **Test against the replacement before the retirement date**, not after — the whole point of the
  notice window is to validate a migration while the old model still works, not scramble once it
  doesn't.
- **Budget real engineering time for this.** A platform with five or six models in active use
  across a year should expect to migrate something roughly on that provider's own release
  cadence — this isn't a one-time cost.

## Key terms

| Term | Meaning |
|---|---|
| Active / Legacy / Deprecated / Retired | The four lifecycle states a hosted model moves through |
| Retirement date | The date after which requests to a specific model ID fail |
| Pinned model ID | A specific, dated model identifier used in code instead of a floating alias |

## Check yourself

You've completed Chapter 2 when you can explain, without looking: why does pinning a specific,
dated model ID in production code matter more than it might initially seem?
