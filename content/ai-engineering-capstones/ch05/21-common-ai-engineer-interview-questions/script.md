# Lesson 21 — Common AI Engineer Interview Questions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson covers the AI engineer interview questions that come up again and again -- and the method for answering them, not a script to memorize.

## S2 · STEPS — Three moves for any question

Almost any question in this lesson responds to the same three moves: name the real tradeoff, state your default answer, and name the condition that would change it. "It depends, and here's specifically what it depends on" is a stronger signal than a confident one-liner.

## S3 · STEPS — RAG architecture questions

On chunk size, the tradeoff is recall versus precision -- start near a few hundred tokens and tune against a real eval set. On weak retrieved context, the honest move is saying so or asking a clarifying question, not forcing a confident-sounding guess.

## S4 · STEPS — Prompting & agent safety

A defensible prompting decision is one you changed because of an observed failure, not a preference. Agent safety is never one answer -- it's scoped tools, a human-approval checkpoint, action limits, and an audit log, layered together.

## S5 · STEPS — Cost & latency questions

For a slow or expensive system, measure each stage separately before guessing what to optimize: embedding, search, re-ranking, generation. Common real levers include routing easy queries to a cheaper model, caching, and trimming context -- always re-checked against your eval pipeline.

## S6 · OUTRO

Next lesson: taking this same tradeoff-first method up to whole-system design questions, like designing a full RAG assistant from scratch.
