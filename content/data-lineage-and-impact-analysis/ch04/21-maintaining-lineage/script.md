# Lesson 21 — Maintaining Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every lesson in this chapter has assumed documentation exists and is
accurate. In practice, lineage documentation starts decaying the moment
it's finished — what this course calls lineage drift, the gradual
inaccuracy that builds up as the underlying systems keep changing after
the diagram was drawn. That's the default, not the exception, and none
of it means the original documentation effort failed.

## S2 · STEPS CARD (why it decays)

Three ordinary reasons. Schema changes — a column gets added, renamed,
or dropped, and the documentation isn't updated to match. New
pipelines — a new source, transformation, or report gets built, and
nobody adds it to the existing graph. Decommissioned systems — an old
source or report gets retired, but stays in as a dead node, making the
graph look more connected, and more trustworthy, than it actually is.
The question isn't whether lineage will drift — it's whether anything
catches the drift.

## S3 · STEPS CARD (maintenance practices)

Four practices keep it accurate. Re-scan automated lineage on a
schedule, not just once at setup — that's what makes "stays current"
true in practice, not just in theory. Review lineage on every change
ticket, tied to the same process Lesson 15 uses for change impact
assessments. Assign real ownership of the documentation itself, not
just each node from Lesson 17 — someone accountable for the whole
graph, the way a code repository has a maintainer. And periodically
audit for dead nodes, removing anything that no longer exists.

## S4 · STEPS CARD (automation isn't the whole answer)

Automation helps, but it doesn't solve the whole problem. Lesson 19's
blind spot doesn't disappear — anything outside parseable code, a
manual export, a one-off script, an undocumented manual hop, doesn't
update itself no matter how good the automated tooling is. Maintenance
has to cover both halves: trusting automation to keep the scannable
part current, and treating the manual part as something that genuinely
needs a human to revisit on a schedule, not just once.

## S5 · OUTRO CARD

That closes Chapter Four, which covered what to document, how to
diagram it, how it gets built, which tools exist, and now how to keep
it accurate over time. Chapter Five — Applied Lineage — puts all of
that to work: two full case studies tracing real lineage scenarios end
to end, a practice lab, and the review checklist that closes out the
entire course.
