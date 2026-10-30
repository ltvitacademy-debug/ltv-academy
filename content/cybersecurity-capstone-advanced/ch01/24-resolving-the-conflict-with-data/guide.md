# Lesson 24 — Resolving the Conflict with Data, Not Opinion

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 24 of 26**

## What you'll learn

- Why picking a side in Lesson 23's conflict would have been the
  wrong move, even if Mara's side is the more technically defensible
  one
- The phased compromise Mara actually proposes, and why it gives
  Priya Nair her window without skipping validation
- The specific, measurable validation gate that decides whether the
  new segment moves to full enforcement — not a feeling, a number
- Why this compromise is itself an application of everything Chapters
  1 through 23 already taught about validation

## Why picking a side would have been the wrong move

It would be possible to simply tell Priya "security wins, the
rollout waits," and defend that choice all the way to Howard Okonjo if
it came to it. That would also be the wrong move. Lesson 23 established
that both positions are legitimate; a compromise that ignores one of
them isn't a resolution, it's just a quieter version of the conflict
with a winner declared. The right move is a plan that gives Operations
its real constraint — the window — without giving up the real
requirement — validated identity and segmentation before full
enforcement.

## The phased compromise

Mara proposes splitting the rollout into two stages instead of one:

| Stage | What ships, and when |
|---|---|
| During the outage window | Identity consolidation and segmentation policy deploy in **shadow mode** — monitoring and logging every access decision the new policy would make, without actually blocking anything yet. This uses the window Operations needs for the physical, safety-driven maintenance work anyway |
| 14-day validation gate, after the window | The corrected dual-check audit methodology runs against the new segment's shadow-mode data: every logged access gets reconciled against group membership *and* direct ACL grants, the same way Lesson 19's fix was built |
| Full enforcement | Only turns on once the validation gate's pass criteria are met |

This isn't a delay dressed up as a compromise — the segmentation
policy and identity work genuinely ship during the window Priya needs.
What's gated isn't deployment, it's **enforcement**, until the data
says it's safe to flip on.

## The validation gate's actual pass criteria

```
VALIDATION GATE — Segment 2 Zero-Trust Enforcement
  1. Zero unplanned operational interruptions during the
     14-day shadow-mode period
  2. 100% of logged privileged access accounted for under the
     dual-check methodology (group membership + direct grants +
     SIEM telemetry) — zero untracked accounts
  3. Any flagged discrepancy investigated and resolved before
     the gate closes, not carried forward as a known gap
```

These are the same three questions Lesson 19's AAR effectively asked
about the first segment, asked now *before* enforcement instead of
after an audit found a gap months later. If all three pass, full
enforcement ships on day 15. If any one fails, enforcement waits, and
the specific failure — not a vague "not ready yet" — tells Mara exactly
what still needs fixing.

## Why this is itself an application of the course's own lesson

This compromise doesn't invent a new idea — it reuses the one this
entire capstone has returned to since Lesson 12: don't trust a single
check, and don't call something validated until independent evidence
says so. Shadow mode generates exactly the evidence a go/no-go decision
needs, on a timeline both Priya and Mara can actually defend to Howard
and, eventually, to the board.

## Key terms

| Term | Meaning |
|---|---|
| Shadow mode | Deploying a policy to monitor and log the decisions it would make, without yet enforcing them |
| Validation gate | A defined, measurable checkpoint that must pass before a change moves from monitored to fully enforced |
| Phased rollout | Splitting a deployment into stages with a checkpoint between them, instead of one all-or-nothing cutover |

## Lab

1. Write the validation gate's three pass criteria in your own words,
   as you would explain them to Priya Nair in two minutes.
2. Explain why shipping identity and segmentation in shadow mode
   during the outage window is not simply "doing it anyway, quietly" —
   what's actually still gated.

## Check yourself

You're ready for Lesson 25 when you can explain why this compromise
gives both Priya and Mara what they actually need, and why gating
enforcement behind a measurable 14-day validation checkpoint is
different from either rushing the rollout or delaying it outright.
