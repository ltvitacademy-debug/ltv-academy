# Lesson 46 — Version Control for Notebooks and Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Version control for notebooks and pipelines — what actually gets
committed, and why it has to be readable.

## S2 · CODE CARD (why output makes diffs noisy)

A notebook's committed source is its code, not its output. Output
changes every run even when the code doesn't — committing it
alongside the code would generate a meaningless diff every single
time.

## S3 · CODE CARD (reviewing a KQL change)

A KQL queryset's definition is a readable JSON file, so a change
produces a real diff — a reviewer can see a five-minute bucket
became one minute, and ask questions before it merges.

## S4 · STEPS CARD (a branch, start to finish)

Branch, edit, commit — the change appears as a readable diff. Open
a pull request, a teammate reviews it, and merging is what lesson
45's CI/CD pipeline actually reacts to.

## S5 · OUTRO CARD

Version control is the input CI/CD reacts to, with a human review
step in front of it. Next up: infrastructure as code — ARM, Bicep,
and Terraform basics.
