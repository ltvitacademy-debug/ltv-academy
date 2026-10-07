# Capstone: Write-Up & Presentation

This is the last lesson of AI Research Engineering. You've picked a paper, reproduced its core result, and designed and run a small extension. What's left is the part that actually makes the work usable by anyone else: writing it up the way Chapter 7 taught, and presenting it clearly. A result nobody can read or evaluate is, for practical purposes, a result that doesn't exist yet.

## What you'll learn

- The report structure from Lesson 33, applied to your specific capstone
- How to present your reproduction as evidence, not assertion
- How to report the extension honestly, including if it came back negative or flat, using Lesson 34's approach
- How to structure a short presentation that closes out the whole project

## Structuring the write-up

Reuse the technical-report structure from Lesson 33 directly — it was built for exactly this shape of work:

1. **Method.** What the paper claims, in your own words, and the single headline number you targeted. One paragraph, no padding.
2. **Reproduction.** What you ran, how closely your number matches the reported one, and which reproduction tier you're claiming — exact match within noise, tolerance match, or qualitative trend. State your compute budget plainly; it's part of the honest context, not something to hide.
3. **Extension.** The one question you asked, the experiment you ran to answer it, and the result — with the same rigor as the reproduction, including seed variance if you measured it.
4. **Limitations.** What your reproduction and extension don't tell you: smaller compute than the original, fewer seeds than you'd want for a strong claim, a setting that doesn't generalize.

## Presenting the reproduction as evidence, not assertion

"I reproduced the paper" is an assertion. The report should make it a demonstrated claim: your tracked run, your comparison script's printed delta, and the tier you're claiming, all visible together. This is the same discipline from Lesson 43's comparison script, just surfaced in the write-up instead of left in a terminal.

```markdown
## Reproduction result

| | Reported | Mine | Delta |
|---|---|---|---|
| CIFAR-10 test error | 8.75% | 8.91% | +0.16pp |

Claimed tier: tolerance match (within ~0.2pp, consistent with seed-to-seed
variance reported in the original paper's appendix). Run config and logs:
`wandb.ai/<you>/capstone-reproduction/runs/<run-id>`
```

## Reporting the extension honestly

If your ablation or new-setting experiment found a real effect, report the size of the effect and your seed count, not just the direction. If it found nothing — the component didn't matter, the method didn't transfer — report that directly, the way Lesson 34 covers. A clearly reasoned null result, with the experiment design shown, is a stronger capstone outcome than an overstated positive one.

## Presenting it

Structure a short presentation around the same four sections: what the paper claims, what you reproduced and how you know, what you extended and what you found, and what you'd do with more time or compute. Lead with the comparison table, not with process — the audience wants the evidence first, the journey second.

## Closing the course

You started this course distinguishing a research engineer's role from a research scientist's and a product engineer's. Across eight chapters you learned to read a paper for its load-bearing claim, structure and configure a research codebase, manage experiments and compute at scale, debug training runs that silently go wrong, and collaborate through reports and feedback. This capstone was every one of those skills applied to one real result, end to end. That is the actual job — pick it up again on the next real paper.

## Key terms

- **Reproduction tier claim** — stating explicitly which of the three reproduction standards your result meets, with evidence attached
- **Evidence-first reporting** — presenting the comparison table and run logs before any narrative framing
- **Honest limitations section** — stating plainly what your compute, seed count, and setting don't let you conclude
- **Null result** — an extension outcome with no measurable effect, reported with the same rigor as a positive one
