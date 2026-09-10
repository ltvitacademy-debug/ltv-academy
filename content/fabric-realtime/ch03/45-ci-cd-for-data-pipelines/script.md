# Lesson 45 — CI/CD for Data Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

CI/CD for data pipelines — automating the rule that nothing skips
from dev to prod.

## S2 · CODE CARD (a concrete pipeline)

A commit triggers build, test, then deploy — each stage gating the
next. A failed test simply prevents the deploy stage from ever
running. A broken change can't reach prod, because the pipeline
itself refuses to let it.

## S3 · CODE CARD (Fabric's REST API)

Lesson 15's deployment pipeline can be triggered manually through
the UI, or through fabric's rest API — the same action, callable
from a script instead of a click.

## S4 · STEPS CARD (why clicking Deploy doesn't scale)

One person clicking deploy works fine alone. Add a second person,
and nothing guarantees they follow the same steps or that tests
even ran. CI/CD removes the need to rely on anyone remembering
perfectly, every time.

## S5 · OUTRO CARD

Automated, gated, repeatable. Next up: version control for
notebooks and pipelines — what actually gets committed, and how.
