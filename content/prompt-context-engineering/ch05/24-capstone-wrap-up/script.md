# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

The final milestone: presenting a real, working prompt library credibly, not describing one from memory.

## Segment 2 (steps: what to show, part 1)

Start with prompts and context. Walk through system.md and your templates, not just open them. Explain budget.md out loud — the output reserve, the fixed costs, the capped variables, and why each number is what it is. If you used tools, explain why each description reads the way it does, not just that it exists.

## Segment 3 (steps: what to show, part 2)

Then show proof, not claims. Pull up eval_set.json and point to one real case from each of the four categories. Run your automated test live and report the actual pass rate on the spot, not a number you remember from last week. And open CHANGELOG.md to show the real A/B result and the specific regression it caught.

## Segment 4 (steps: interview questions)

Be ready for a few direct questions. Why cap history and retrieval separately instead of one combined number? Lesson 13 — so neither one can eat the whole window on its own. Why does position in the window matter if everything already fits the budget? Lesson 15, lost in the middle. And how did your A/B test actually prove the winner won — one variable, the same eval set, a specific documented reason, not a feeling.

## Segment 5 (steps: the real point of this course)

Nothing in this course was really about any one model's exact syntax. It was about giving prompts and the context around them the same rigor tested software already gets — a defined budget, a deliberate order, a real eval set, and proof instead of a feeling that something "reads well." That discipline transfers to any model, any provider, any future API change.

## Segment 6 (outro)

That's Prompt & Context Engineering complete — 24 lessons, 5 chapters. Next in the AI Engineer path: RAG & Vector Databases — building the actual retrieval pipeline that feeds the context this course just taught you to budget, order, and test.
