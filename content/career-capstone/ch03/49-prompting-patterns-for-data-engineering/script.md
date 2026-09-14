# Script — Prompting Patterns for Data Engineering Tasks

## Segment 1 (title)

Four concrete prompting patterns that come up again and again in this job — not vague advice, but specific things to include every time you ask an LLM for help with a data engineering task.

## Segment 2 (steps: patterns 1 and 2)

Give schema context up front — real column names and types — rather than letting the model guess and fail the way the PySpark and KQL examples did. Give real sample rows too, edge cases included, since column names alone underdetermine what a value like status or total_amount actually means.

## Segment 3 (steps: patterns 3 and 4)

Ask for the reasoning, not just the answer — a one-line response is hard to review, but a walked-through explanation is something you can check against your own understanding. And treat prompting as a conversation: point out specifically what's wrong and let the model revise, rather than trying to write one perfect prompt up front.

## Segment 4 (code: how they compound)

These patterns compound rather than working independently. Schema context plus sample rows produces a better first draft; asking for reasoning makes that draft reviewable; iterative refinement fixes exactly what the review catches.

## Segment 5 (outro)

Lessons 45, 46, and 48 each used this same combination without naming it — now it's explicit and reusable. Next up: retrieval-augmented generation, and why LLMs need grounding in retrieved context at all.
