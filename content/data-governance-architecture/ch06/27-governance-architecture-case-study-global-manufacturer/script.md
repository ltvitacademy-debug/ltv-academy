# Lesson 27 — Governance Architecture Case Study: Global Manufacturer · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Six, Applied Architecture. This lesson walks a fictional global manufacturer through every chapter of this course in one connected sequence.

## S2 · STEPS — The scenario

Castellan Industrial Group, a fictional multinational manufacturer, runs twenty plants across three regions on three different inherited ERPs. The board wants one consistent view of production cost and quality across every plant. Today it takes a month of manual reconciliation to produce one.

## S3 · STEPS — Chapters 1 and 2 applied

Chapter 1: the capabilities map shows uneven maturity — strong at the original plants, nearly absent at the acquired ones. Chapter 2: a fully centralized model is rejected as unrealistic for twenty plants on three ERPs, so Castellan adopts a federated model — central standards for a short list of enterprise-critical metrics, local stewardship over everything else.

## S4 · STEPS — Chapters 3 and 4 applied

Chapter 3: the real problem is that plant-floor OT data and corporate financial data have never shared a catalog, so the team builds an enterprise metadata architecture that treats both as first-class. Chapter 4: OT and IT access control stay clearly separated even as metadata connects them, and the platform choice — one catalog that ingests from all three legacy ERPs — gets its own ADR.

## S5 · STEPS — Chapter 5 applied, and the result

Chapter 5: the strategy ties directly to the board's actual ask, the roadmap starts with two pilot plants as a quick win, and a review board gets chartered with regional representation. Eighteen months later, every plant reports one production-cost figure against one shared catalog — not because every plant was forced onto identical tools, but because federation gave each room to keep its own.

## S6 · OUTRO

Next lesson: a second case study in a very different industry, where the governing pressure isn't plant sprawl — it's regulation. Governance Architecture Case Study: Financial Services.
