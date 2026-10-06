# Lesson 6 — Model Sizes & Capability Trade-offs

**Chapter 1 · How LLMs Actually Work · Lesson 6 of 31**

## What you'll learn

- Why every major provider ships several sizes of the same model family, not just one
- The real trade-off between a small/fast model and a large/capable one, with verified pricing
- How providers themselves recommend choosing a starting point
- Why "biggest model" is not the same as "right model for this task"

## Why one model isn't enough

No major provider ships a single model. Anthropic currently offers Claude Haiku 4.5, Claude
Sonnet 5.5, Claude Opus 5.5, and Claude Fable 5.1, all available at the same time. OpenAI's
current lineup spans GPT-6 Luna up through GPT-6 Astra. This isn't an accident or marketing
fragmentation — model **size** (roughly, how many parameters it has, though providers no longer
always publish that number) trades off directly against speed and cost, and no single size is
right for every job.

## The trade-off, with real numbers

Anthropic's own documentation describes its four current tiers directly, and the pricing makes
the trade-off concrete:

- **Claude Haiku 4.5** — "the fastest model with near-frontier intelligence." $1 / $5 per million
  input/output tokens. Comparative latency: fastest.
- **Claude Sonnet 5.5** — "the best combination of speed and intelligence." $2 / $10 per million
  tokens. Comparative latency: fast.
- **Claude Opus 5.5** — "for long-running agentic coding and knowledge work." $4 / $20 per million
  tokens. Comparative latency: moderate.
- **Claude Fable 5.1** — "for demanding reasoning and long-horizon agentic work." $10 / $50 per
  million tokens. Comparative latency: slower.

Price and latency both climb roughly in step as the model gets more capable. This pattern — a
fast/cheap tier, a balanced tier, and a flagship/expensive tier — shows up across every major
provider, even though the exact names differ.

## How providers actually recommend choosing

Anthropic's own "choosing a model" guidance (which Lesson 10 covers in more depth) lays out two
honest starting strategies, straight from their documentation:

1. **Efficiency-first** — start with the fastest, cheapest model (Haiku), test thoroughly, and
   upgrade only if you find a real capability gap. Best for prototyping, tight latency budgets,
   and high-volume straightforward tasks.
2. **Capability-first** — start with the strongest model for a genuinely complex task, then look
   for ways to downgrade once you understand what's actually required. Best for complex
   reasoning, advanced coding, and anything where accuracy matters more than cost.

Neither approach says "always use the biggest model." They both say: know which end of the
trade-off your task actually needs, and verify it with real evaluation rather than assuming.

## Why "biggest" often isn't "best"

A flagship model costs more per token and responds more slowly — not a rounding error at scale.
A customer-support chatbot handling thousands of simple requests a day, paying flagship pricing
for every one, burns budget on capability most of those requests never needed. Meanwhile, routing
a genuinely hard multi-step coding task to the cheapest/fastest tier risks wasted attempts and
worse output. The real skill (covered fully in Lesson 10) is matching task difficulty to model
tier — not defaulting to either extreme.

## Key terms

| Term | Meaning |
|---|---|
| Model tier | A provider's family of same-generation models at different size/price/speed points |
| Efficiency-first | Starting with the cheapest/fastest model and upgrading only if needed |
| Capability-first | Starting with the strongest model, then downgrading once requirements are clear |
| Comparative latency | How fast a given model responds relative to others in the same lineup |

## Check yourself

Before Lesson 7, you're ready to move on when you can explain, without looking: why does a
provider ship four different model sizes instead of just always offering their best one?
