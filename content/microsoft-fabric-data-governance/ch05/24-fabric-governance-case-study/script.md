# Lesson 24 — Fabric Governance Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Northfield Health Network, a fictional regional healthcare system,
has six hospital sites, each running Fabric independently — and
three different numbers for the same metric, with a compliance
audit six weeks away.

## S2 · STEPS CARD (the scenario)

Six sites, no shared structure, each with its own workspace and its
own copy of patient data. Three different versions of Patient
Readmission Rate, and an audit that will ask for exactly one
traceable answer.

## S3 · STEPS CARD (Chapters 1-3 applied)

Chapters 1 through 3: the admin establishes real domains with their
own capacity, moves everyone onto one shared, shortcut-linked
Lakehouse instead of six copies, and locks it down — row-level
security per site, PHI columns labeled, every access logged.

## S4 · STEPS CARD (Chapters 4-5 applied)

Chapters 4 and 5: the compliance team's version gets certified, so
it's the one people actually find and build on — lineage traced,
impact checked before anyone touches a column. Sites still self-serve
new reports off that one certified model, and the whole Fabric
estate gets scanned into the same Purview catalog as the legacy
claims database.

## S5 · OUTRO CARD

Six weeks later, the audit gets a real answer: one certified model,
traced lineage, per-site security, and a logged trail — not because
anyone rebuilt the data, but because every layer pointed at the same
source. Next: the practice lab, where you apply this yourself.
