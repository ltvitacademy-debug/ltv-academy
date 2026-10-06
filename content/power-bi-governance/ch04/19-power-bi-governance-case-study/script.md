# Lesson 19 — Power BI Governance Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Meridian Outdoor Supply, a fictional mid-sized retailer, has a familiar problem — three regional managers each built their own version of the same weekly sales report.

## S2 · STEPS CARD (the problem)

At Monday's leadership meeting, three different total-revenue numbers show up in three different decks, and nobody can say with confidence which one is right. No trust signal, no way to tell which report to believe.

## S3 · STEPS CARD (chapters 1-2 applied)

The fix starts with consolidation, not certification. One workspace, owned by the Sales domain, becomes the single home for this data. Row-level security filters it per region instead of needing separate copies. And a Confidential sensitivity label, applied at the source, travels automatically into everything built on top of it.

## S4 · STEPS CARD (chapter 3 applied)

With one dataset instead of three, the team certifies it — named owner, documented refresh, reviewed criteria. When the source system later changes a column type, impact analysis catches four reports that would've silently broken, including the one the CFO opens every Monday. Usage metrics and the audit log confirm the fix actually held.

## S5 · STEPS CARD (chapter 4 applied)

And that schema change doesn't go straight to production. It moves through a real deployment pipeline — built in Development, validated in Test, only then deployed to the workspace everyone actually opens.

## S6 · OUTRO CARD

Three months later: one report, one number, one documented trail. Next lesson, the course's closing practice lab — apply all four chapters yourself, one more time.
