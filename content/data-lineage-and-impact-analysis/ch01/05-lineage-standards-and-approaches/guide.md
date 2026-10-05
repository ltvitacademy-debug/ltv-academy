# Lesson 5 — Lineage Standards and Approaches

**Chapter 1 · Lineage Concepts · Lesson 5 of 25**

## What you'll learn

- The three main approaches to actually capturing lineage: manual documentation, static parsing, and runtime capture
- What open standards exist so different tools can describe lineage in a compatible way
- The tradeoffs between each approach, and why most real organizations end up mixing them
- How this closes out Chapter 1 and sets up the rest of the course

## Three ways lineage actually gets captured

**Manual documentation.** Someone who built or knows a pipeline writes down, by hand, what feeds what. It's the cheapest approach to start and works for small, stable systems, but it decays the moment the real pipeline changes and nobody remembers to update the document — the single biggest risk with any manual lineage effort.

**Static parsing (code analysis).** A tool reads the actual source code — SQL scripts, ETL job definitions, transformation configs — and automatically derives lineage from what the code says it does, without ever running it. This scales much better than manual documentation and stays closer to the truth, but it can only see what's expressed directly in the code it understands; dynamic logic (a query string built at runtime, for example) can defeat it.

**Runtime capture.** Instead of reading code, a tool observes what actually happens when a pipeline runs — which tables were read, which were written, in what order — and records that as lineage. This captures the real, executed behavior rather than an inference about intended behavior, which makes it the most trustworthy of the three in principle, but it requires instrumenting the running systems, and it only sees jobs that have actually executed at least once.

## Standards that keep lineage portable

Capturing lineage is only half the problem — if every tool records it in its own proprietary format, lineage from a warehouse tool can't be combined with lineage from an orchestration tool into one coherent picture. Two efforts worth knowing by name:

- **OpenLineage** — an open specification for describing lineage events (runs, datasets, jobs) in a common structured format, so different tools in a pipeline can emit lineage that a shared backend can stitch together into one graph, rather than each tool keeping its own isolated record.
- **W3C PROV** — a broader, older data model for describing *provenance* in general (not just data pipelines) — who or what generated something, when, and from what — that predates and conceptually underlies a lot of modern lineage tooling.

Knowing these exist matters even if you never implement one directly: when evaluating a lineage tool, "does it support an open lineage format, or does it lock your lineage data into a proprietary format only it can read" is a legitimate, practical question to ask.

## The tradeoffs, side by side

| Approach | Accuracy | Effort to maintain | Best fit |
|---|---|---|---|
| Manual documentation | Decays over time | Low to start, high to sustain | Small, stable, or one-off systems |
| Static parsing | Reflects code as written | Automated once built | Large codebases with analyzable, static logic |
| Runtime capture | Reflects what actually ran | Requires instrumentation | Systems where dynamic or generated logic defeats static parsing |

Most real organizations don't pick exactly one. A common pattern is static or runtime capture for the technical, column-level detail (Lesson 4) feeding an automated pipeline, with manual documentation filling the gaps for legacy systems or one-off processes that nothing else can reach — plus a business-lineage layer (Lesson 3) written and maintained by people, since that readable framing rarely comes out of automated capture on its own.

## Closing out Chapter 1

This chapter covered what lineage is (Lesson 1), why it matters (Lesson 2), the business/technical split (Lesson 3), the table/column granularity split (Lesson 4), and now how it actually gets captured and standardized (Lesson 5). Chapter 2 moves from concepts to practice: tracing lineage through real source systems, ETL/ELT pipelines, lakes and warehouses, semantic models, and all the way to Power BI dashboards.

## Key terms

| Term | Meaning |
|---|---|
| Static parsing | Deriving lineage automatically by reading source code, without running it |
| Runtime capture | Deriving lineage by observing what a pipeline actually does while it executes |
| OpenLineage | An open specification for describing lineage events in a common, tool-independent format |

## Lab

For one pipeline or process you're familiar with (even an Excel macro or a scheduled script), decide which of the three approaches — manual, static parsing, or runtime capture — would actually be feasible to apply to it, and which would be wasted effort. Write one sentence justifying your choice.

## Check yourself

Can you name all three approaches to capturing lineage, state one real tradeoff of each, and explain why most organizations end up mixing them rather than choosing just one?
