# Script — Rollbacks & Recovery

## Segment 1 (title)

Every safeguard in this chapter reduces risk; none of them eliminates it. Tests pass, approvals clear, a canary rollout looks fine at ten percent of traffic and then degrades at fifty — something still gets through anyway. Northbridge Retail needs a plan for that moment: getting back to a known-good state fast, and figuring out what actually happened afterward.

## Segment 2 (steps)

When production breaks, there are two honest responses. Fix forward ships a small, targeted patch fast, when the fix is genuinely well understood and tiny. Rolling back stops running the broken version and returns to the last known-good one, when the fix isn't obvious yet and the priority is stopping customer impact right now, with root-causing to follow afterward.

## Segment 3 (code)

Because Kubernetes already tracks every revision of a deployment, rolling back doesn't require rebuilding anything. Rollout undo re-applies an earlier revision's exact pod spec, including its pinned image tag, using the same gradual swap mechanics as a normal rolling update.

## Segment 4 (screenshot)

The same revision history exists in Azure DevOps, surfaced per environment — every past deployment listed with its status, answering exactly what a rollback decision needs: what was running before, and when it changed.

## Segment 5 (steps)

This is exactly why Chapter four's immutable, commit-tagged images matter here. Rollout undo is only reliable because each revision points at one specific, unchanging image. If everything had shipped as latest, there'd be no earlier version left to actually roll back to.

## Segment 6 (outro)

A rollback stops the bleeding; it doesn't explain what happened on its own. Northbridge Retail treats every rollback as the start of an incident review, not the end of one — it buys the time to ask what really went wrong, and why every earlier safeguard missed it.
