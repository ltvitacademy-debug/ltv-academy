# Lesson 65 — Blue-Green and Canary Deployments for Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Blue-green and canary deployments — refining a single all-at-once
deploy step into something safer.

## S2 · CODE CARD (blue-green)

Blue-green keeps two full environments running side by side. The
switch is just a routing change from blue to green — which means
rolling back is just as instant, pointing traffic right back.

## S3 · CODE CARD (canary)

Canary routes a small slice of real traffic to the new version
first. Watch whether it looks correct, then expand gradually — a
bug only affects that small slice, caught on real production
data.

## S4 · STEPS CARD (choosing between them)

Blue-green fits a clean change that can't be half-migrated. Canary
fits a change where correctness is easier to judge gradually, by
watching real output.

## S5 · OUTRO CARD

Two different ways to limit how much can go wrong before anyone
notices. Next up: rollback strategies — what happens when either
approach still goes wrong.
