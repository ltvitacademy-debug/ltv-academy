# Lesson 3 — MDM Architecture Styles · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every MDM implementation answers one question: where does trusted master
data actually live, and do source systems give up writing to their own
copies? Four common architecture styles answer it differently.

## S2 · STEPS CARD (four styles overview)

Registry style: a thin cross-reference layer, source data never moves.
Consolidation: data is merged into a central store for reporting, one-way.
Coexistence: a central store synced both directions with the sources.
Centralized: one hub becomes the real system of record for every write.

## S3 · CODE CARD (coexistence vs. centralized data flow)

The difference between the middle and the top of the spectrum is
direction of control. Coexistence: source updates, then syncs to the
hub, and corrections can sync back. Centralized: every write happens at
the hub first, and sources simply read from it — no independent writes
left at all.

## S4 · STEPS CARD (matching style to maturity)

Lower-disruption styles are common first steps — prove the value of a
unified view without ripping out existing systems. Higher-control styles
come once that value is proven and the organization is ready to make
source systems depend on the hub. Jumping straight to centralized before
the matching rules underneath are trusted is a common way programs
stall.

## S5 · OUTRO CARD

Next: the business case for MDM — why organizations actually fund this
work, and what it costs them when they don't.
