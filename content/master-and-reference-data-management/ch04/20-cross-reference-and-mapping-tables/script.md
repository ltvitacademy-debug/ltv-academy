# Lesson 20 — Cross-Reference and Mapping Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Two well-governed code lists can still disagree completely on how to
represent the same concept. This lesson covers the table that bridges
them without forcing either one to change.

## S2 · STEPS CARD (the problem)

System A uses "01," "02," "03" for order status. System B uses "ACT,"
"PEND," "CLSD." Both lists are internally consistent — they just weren't
designed together, which is normal after any merger or system
integration.

## S3 · CODE CARD (cross-reference table example)

A cross-reference table translates between two code lists without
requiring either to change. Here, two systems' country codes — two-letter
versus a legacy numeric scheme — are mapped side by side, with an
effective date on the mapping itself.

## S4 · STEPS CARD (mapping patterns)

One-to-one is the simple case. Many-to-one happens when one system has
finer-grained codes that collapse into one in the other — that's a lossy
mapping, and it should be documented as lossy. Many-to-many needs
conditional rules, not a flat lookup.

## S5 · STEPS CARD (unmapped values)

Every cross-reference table eventually hits a new code with no mapping
yet. Silently passing it through or defaulting it hides the gap until a
report produces wrong numbers. The better pattern: fail loudly, alert the
steward, add the mapping deliberately.

## S6 · OUTRO CARD

Next lesson: distributing master data — getting the governed, mapped,
golden version of a record out to every system that needs it.
