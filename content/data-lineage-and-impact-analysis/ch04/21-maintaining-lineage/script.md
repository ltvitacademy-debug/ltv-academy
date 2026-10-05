# Lesson 21 — Maintaining Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every lesson in this chapter has assumed documentation exists and is
accurate. In practice, lineage documentation starts decaying the
moment it's finished — and that's the default, not the exception.

## S2 · STEPS CARD (why it decays)

Three ordinary reasons. Schema changes — a column added, renamed, or
dropped, with documentation left behind. New pipelines — built, but
never added to the existing graph. Decommissioned systems —
retired, but left in the documentation as a dead node.

## S3 · STEPS CARD (maintenance practices)

Four practices that help. Re-scan automated lineage on a schedule,
not just once. Review lineage on every change ticket, tied to Lesson
15's process. Assign real ownership of the documentation itself.
Periodically audit for dead nodes and remove them.

## S4 · STEPS CARD (automation isn't the whole answer)

Automation helps, but Lesson 19's blind spot doesn't go away — a
manual export or an undocumented script doesn't update itself no
matter how good the tooling is. Maintenance has to cover both the
scannable part and the manual part, on a real schedule.

## S5 · OUTRO CARD

That closes Chapter 4. Chapter 5 — Applied Lineage — puts all of it to
work: two full case studies, a practice lab, and a review checklist
that closes out the course.
