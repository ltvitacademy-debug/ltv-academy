# Lesson 17 — Reference Data Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter four turns to reference data: the small, stable code lists every
domain in chapter three quietly depends on.

## S2 · STEPS CARD (three categories)

Master data is the core entities. Transactional data is the events that
happen to them. Reference data is a third category: a short, stable list
of valid values used to classify or constrain the other two — country
codes, status codes, currency codes.

## S3 · STEPS CARD (code and description)

Nearly every reference data set has the same shape: a short code paired
with a human-readable description, plus whether it's active and what
date range it's valid for. "US" and "United States." The code is what
systems compare; the description is what a person reads.

## S4 · STEPS CARD (internal vs external)

External reference data is defined by an outside standards body, like
ISO country codes — the organization adopts it and stays synchronized.
Internal reference data is defined entirely by the business, like order
status codes — with no outside authority to catch a mistake.

## S5 · STEPS CARD (small list, big blast radius)

A reference data set might be ten rows, but each row can be referenced
by millions of transactional records across dozens of systems. Change a
code's meaning or let two systems drift apart, and the damage shows up
everywhere that code is used — not in one place.

## S6 · OUTRO CARD

Next lesson: managing code lists — the lifecycle of adding, retiring, and
versioning the values inside a reference data set.
