# Presenting Findings to a Technical Audience

A portfolio sitting in a repo is only half the job. At some point — an interview, a team meeting, a conference lightning talk — you'll need to present this same material out loud, in about ten minutes, to people who will ask hard questions. This lesson covers structuring that talk, designing slides for engineers rather than executives, and preparing for the questions you can already predict.

## What you'll learn

- How to budget a ten-minute talk across four projects' worth of work
- What slide design looks like for a technical audience specifically
- The questions a technical crowd almost always asks, and how to be ready for them
- Why cutting material is harder, and more valuable, than adding it

## Structuring the ten minutes

Ten minutes is not enough time to present four projects in full — it's enough time to present one argument well, using the projects as evidence. A workable budget:

```
0:00–1:00  Problem   — what question were you trying to answer
1:00–4:00  Method    — just enough to trust the result, not every detail
4:00–8:00  Result    — the actual numbers, the actual plot
8:00–10:00 What's next — the honest limitations and the forward look
```

Notice how little time Method gets relative to Result. A technical audience will forgive you skipping implementation detail; they will not forgive a talk that never shows the actual numbers.

## Slide design for engineers, not executives

- **One claim per slide.** If a slide is making two points, it's two slides.
- **Show the actual numbers or plot**, not a paraphrase of them. "The agent improved performance" is not a result; a bar chart with logical reads before and after is.
- **Label your axes and your baseline.** A technical audience will look for the baseline before they look at anything else on the chart.
- **Cut anything you can't defend live.** If a claim on a slide would collapse under one follow-up question, it doesn't belong on the slide.

## Anticipating hard questions

A technical audience asks a predictable set of questions. Prepare an honest answer before you're asked:

- "Why this baseline?" — be ready to justify the optimizer's default plan, the rules-based cleaner, or the SFT-only model as your point of comparison.
- "How many runs or seeds?" — if the answer is one, say so, and say what you'd do with more time.
- "What broke?" — name the actual dead end from your notebook; it builds more credibility than pretending everything worked first try.
- "What would change your conclusion?" — this is the falsifiability test from Lesson 2, asked out loud. Have the answer ready.

## Key terms

- **Technical talk budget** — the time allocation across problem, method, result, and next steps
- **One claim per slide** — a slide-design rule limiting each slide to a single defensible point
- **Baseline** — the point of comparison a technical audience checks first

## Recap

Ten minutes is enough for one well-supported argument, not four full project reports — spend most of it on the actual result, one claim per slide, and have honest answers ready for the baseline, the sample size, what broke, and what would change your mind. Next up, the final lesson: where this research could go next.
