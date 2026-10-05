# Lesson 28 — AI Governance Case Study: Credit Decisioning · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Six. We're applying this entire course to one fictional, illustrative scenario: a credit-decisioning model at Harrow Peak Financial.

## S2 · STEPS — The setup and the hidden problem

Harrow Peak replaces manual loan approval with a model trained on five years of past outcomes. Checking provenance, the team finds the training labels themselves carry a human bias from one branch's old lending pattern — the "ground truth" already encoded the thing they were trying to avoid.

## S3 · STEPS — Governance catches it

A full model card documents the issue. The model lives in a registry with restricted access. Once live, drift monitoring catches an approval-rate shift for one subgroup before any human does — because this was tiered high-risk from day one, which made that monitoring mandatory, not optional.

## S4 · STEPS — Response and audit

The drift triggers a mandatory human review, not a quiet ticket. The team already knew fair-lending obligations applied before the model existed — "the AI made the call" was never going to satisfy a regulator. A scheduled internal audit later confirms the response was handled correctly, end to end.

## S5 · OUTRO

Every control that caught this problem was one this course already covered. Next: a second case study, this time with customer-facing generative AI.
