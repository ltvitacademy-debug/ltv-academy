# Lesson 8 — Major Model Providers & Families

**Chapter 2 · The LLM Landscape · Lesson 8 of 31**

## What you'll learn

- Today's major closed-model providers and their current flagship families
- What "family" means: one brand name, several tiers inside it (Lesson 6's trade-off, by provider)
- How to read a model name like "Claude Sonnet 5.5" or "GPT-6 Astra" without memorizing every release
- Why this list will be out of date soon, and how to keep it current yourself

## The current field, verified directly against each provider

This isn't from memory — every name and figure below was checked directly against each
provider's own documentation as of October 2026, because model lineups move too fast to trust to
recall (Lesson 12 covers exactly why).

- **Anthropic** — Claude. Current tiers: **Haiku 4.5** (fastest/cheapest), **Sonnet 5.5**
  (balanced), **Opus 5.5** (agentic coding/enterprise), **Fable 5.1** (flagship reasoning,
  Anthropic's most capable model open to all customers).
- **OpenAI** — GPT. Current flagship family: **GPT-6 Astra** at the top, with **GPT-6.1 Sol** and
  **GPT-6 Luna** as nearby tiers, alongside a still-available GPT-5.x generation (5.6, 5.5, 5.4)
  and specialized reasoning models (the o-series).
- **Google** — Gemini. Current generation centers on **Gemini 3.8 Flash** (engineered for
  long-horizon software engineering and agents), with 3.7/3.6/3.5 Flash variants and a
  **Gemini 3.1 Pro Preview** tier, alongside the still-supported Gemini 2.5 generation.
- **xAI** — Grok. Current flagship: **Grok 4.7**, a 500,000-token-context chat-and-coding model,
  per xAI's own developer documentation.
- **Meta** — Llama. Meta doesn't operate a hosted API the way the others do; it open-weights the
  model instead (Lesson 9 covers what that distinction means). Current generation: **Llama 4**,
  including a Scout variant and a larger Maverick variant.

## Reading a model name

Provider naming isn't standardized, but a few patterns repeat everywhere:

- A **family name** (Claude, GPT, Gemini, Grok, Llama) identifies the lineage, not a specific
  model you can call.
- A **generation number** (5, 6, 4) marks a major version bump — new training, new baseline
  capability.
- A **tier name or point release** (Haiku/Sonnet/Opus/Fable; Luna/Sol/Astra; Flash/Pro) marks
  where it sits on the speed-vs-capability trade-off from Lesson 6.

"Claude Sonnet 5.5" = Claude family, 5th-generation line, point release 5, Sonnet (balanced) tier.
Once you can parse a name this way, a release you've never seen still tells you roughly where it
sits.

## Same company, different philosophy

Even among closed, hosted-API providers, the same four-ish-tier pattern from Lesson 6 repeats —
Anthropic's Haiku/Sonnet/Opus/Fable and OpenAI's Luna/Sol/Astra both scale price and capability
together. What differs more is positioning: Anthropic markets Claude heavily around coding and
agentic work; OpenAI's ecosystem is the broadest (plugins, the Assistants-style tooling, ChatGPT's
consumer reach); Google leans on deep integration with its own cloud and multimodal strengths;
xAI positions Grok as lean and cost-conscious for agentic use.

## Keeping this current yourself

Don't memorize this list as permanent — bookmark it as a method instead. Every provider in this
lesson publishes a live models/pricing page (the same ones this lesson's sources.json cites).
When in doubt about what's current, go read the primary source directly rather than trusting
secondhand summaries, including this one a year from now.

## Key terms

| Term | Meaning |
|---|---|
| Model family | A provider's branded lineage (Claude, GPT, Gemini, Grok, Llama) across generations |
| Flagship | A family's most capable, usually most expensive, current-generation model |
| Open-weight | Downloadable model weights, as opposed to API-only closed access (Lesson 9) |

## Check yourself

Before Lesson 9, you're ready to move on when you can explain, without looking: what's the
difference between a model's "family" and its specific "tier," using any provider as an example?
