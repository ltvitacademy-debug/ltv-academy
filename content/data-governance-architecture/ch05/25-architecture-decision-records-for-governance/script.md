# Lesson 25 — Architecture Decision Records for Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Governance decisions get re-litigated constantly once the people who made them move on. This lesson covers the short document that stops that: the architecture decision record.

## S2 · STEPS — What an ADR is

An ADR is a short, dated record of one specific decision — what was decided, why it was necessary, and what trade-offs were accepted. It's not a design document or a status report. It's written once, rarely edited; a later change gets its own new ADR. The appeal is its size — often one page, which is exactly why teams actually keep up with it.

## S3 · CODE — A real ADR template

Here's the standard shape applied to a real governance decision: a title and status, the context that made it necessary, the decision itself, and the consequences — both what you gained and what you gave up. A decision with no stated downside usually has one that just went unexamined.

## S4 · STEPS — Why governance needs this especially

Governance architecture is unusually full of exactly these decisions: operating model choice, platform selection, where policy enforcement lives, how security boundaries get drawn. They're expensive to reverse and constantly second-guessed. An ADR doesn't stop the challenge — it makes sure people are challenging the real reasoning, not a guess at it.

## S5 · OUTRO

Next lesson: the review board that makes these decisions in the first place, and keeps making them as the architecture evolves — Governance Architecture Review Boards.
