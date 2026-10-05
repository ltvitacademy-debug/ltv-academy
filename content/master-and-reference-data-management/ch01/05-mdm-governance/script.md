# Lesson 5 — MDM Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

An MDM program without governance doesn't stay fixed. Matching rules
drift, nobody owns new fields, and within a year the single source of
truth has quietly forked again.

## S2 · STEPS CARD (three pillars)

Domain ownership — a named owner per master data domain, accountable for
its quality. Standards and rules — match rules and survivorship rules
written down and version-controlled, not left in one engineer's head.
Stewardship workflow — a defined process for who reviews uncertain
matches and who can override an automated decision.

## S3 · STEPS CARD (roles, concretely)

The MDM data steward reviews flagged matches and maintains the rules day
to day. The domain owner, usually business-side, is accountable for the
domain's quality and resolves disputes. The MDM program lead coordinates
across domains and owns the architecture roadmap. These extend the data
owner and steward roles from Data Governance Foundations — they don't
replace them.

## S4 · CODE CARD (policy skeleton)

A usable MDM policy is a short, written document: which domains are in
scope, who owns each one, what makes a match auto-merge versus need
review, and who can approve a change to any of that. Without it written
down, every new team re-litigates the same questions from scratch.

## S5 · OUTRO CARD

That closes Chapter 1 — the foundations. Chapter 2 goes hands-on:
matching records, deduplication, golden records, survivorship rules, and
steward review, starting with data matching concepts next.
