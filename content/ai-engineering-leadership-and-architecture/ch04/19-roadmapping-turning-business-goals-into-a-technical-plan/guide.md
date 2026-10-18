# Roadmapping: Turning Business Goals Into a Technical Plan

Every lesson so far in this course has worked from a technical starting point toward a decision. Roadmapping runs in the opposite direction: starting from a business goal that says nothing technical at all, and turning it into a sequenced technical plan — the specific skill that separates an engineer who executes well-defined tickets from one who's trusted to figure out what the tickets should even be.

## What you'll learn

- Why a business goal like "reduce support costs by 20%" isn't yet an engineering plan
- A structured way to break a business goal into technical initiatives, with real dependencies
- Why sequencing (what has to happen before what) is usually the hardest and most valuable part
- How this chapter's own tools (capacity planning, build-vs-buy, tech debt) become roadmap inputs

## The business goal, as handed down

Northbeam's leadership sets a goal: "reduce customer support costs by 20% this year, primarily by deflecting more tickets to the AI assistant before they reach a human agent." This is a real, meaningful business goal — and it contains zero technical specifics. Turning it into an actual roadmap is the Staff/Principal engineer's job, not leadership's.

## Breaking the goal into technical initiatives

```markdown
## Business Goal
Reduce support costs 20% this year via higher AI deflection rate.

## Candidate Technical Initiatives
1. Improve retrieval quality (better chunking, hybrid search) -- directly
   raises the % of questions the assistant can actually answer correctly.
2. Expand the knowledge base to cover currently-unanswerable question
   categories -- same deflection-rate lever, different mechanism.
3. Add a confidence threshold: route low-confidence answers to a human
   immediately rather than giving a bad answer that erodes trust.
4. Reduce response latency -- faster responses correlate with higher
   user satisfaction and completion rate, an indirect lever.
5. [Tech debt] Refactor prompt-assembly logic (Lesson 18) -- doesn't
   directly move deflection rate, but unblocks initiative #1's
   hybrid-search work, which touches that exact code path.
```

Notice initiative 5: it's not something leadership asked for, and it doesn't move the headline metric directly — but it's on the roadmap anyway, because it's a real, identified dependency for initiative 1. A roadmap that only lists things that directly move the metric, with no visibility into what blocks those things, tends to discover dependencies mid-quarter instead of up front.

## Sequencing: the hardest and most valuable part

Listing initiatives is the easy part; figuring out the order is where the real planning work is. Initiative 5 (the refactor) has to happen before initiative 1 (hybrid search), because the hybrid-search work touches the exact code path the refactor cleans up — building hybrid search on top of the current duplicated logic means implementing it five times instead of once. Initiative 3 (confidence thresholds) can happen in parallel with either, since it doesn't share a dependency with them. A roadmap that lists initiatives without this reasoning risks either real wasted work (building on a foundation about to be refactored out from under it) or a false sense that everything can start simultaneously when it genuinely can't.

## This chapter's own tools become roadmap inputs

Notice how much of this course already feeds directly into this one roadmap: Lesson 3's capacity planning tells you whether initiative 2 (expanding the knowledge base) will push infrastructure past a capacity ceiling partway through the year, which changes the sequencing. Lesson 7's build-vs-buy framework applies directly to initiative 1 — build a custom hybrid search layer, or adopt the retrieval-quality features a vector database vendor (Lesson 10's case study) already offers. Lesson 18's tech-debt break-even math is exactly what justifies initiative 5's place on the roadmap even though it has no direct metric impact. Roadmapping isn't a separate skill learned from scratch — it's where every other skill in this course gets applied together, under one real business goal, at once.

## Key terms

| Term | Meaning |
|---|---|
| Technical initiative | A specific, scoped piece of engineering work that serves a business goal |
| Dependency-driven sequencing | Ordering initiatives based on what genuinely has to happen before what, not just priority alone |

## Check yourself

Why does the prompt-assembly refactor (initiative 5) belong on the roadmap, and specifically before initiative 1, even though leadership never asked for it and it doesn't move the deflection-rate metric directly?
