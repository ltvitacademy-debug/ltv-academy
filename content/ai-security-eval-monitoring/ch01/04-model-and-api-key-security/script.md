# Lesson 4 — Model & API Key Security · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

An exposed AI API key is worse than a typical leaked credential — it's closer to a leaked payment method with no spending cap. This lesson covers how keys actually leak, and how to stop it.

## S2 · STEPS — Why it's worse

A leaked database password has a blast radius you can reason about. A leaked AI key is effectively a payment method attached to a compute-intensive product. Someone who finds it can run large bills, flood your rate limits, or use access to a model you fine-tuned on proprietary data.

## S3 · CODE — The fix, architecturally

The most common leak is a key embedded directly in client-side code — a web bundle or mobile binary — extractable in minutes. The fix isn't "try harder," it's architectural: the key never leaves your server. The browser calls your backend; your backend calls the AI provider.

## S4 · STEPS — How keys actually leak

Client-side exposure is the most common path — anyone can extract it from dev tools or a decompiled app. Second most common: a key gets hardcoded "for testing" and committed to git, recoverable from history even after a later commit removes it. Bots scan public repos for exposed keys within minutes.

## S5 · STEPS — The checklist

Never put a key in client-side code — proxy through your own backend. Use scoped, short-lived keys where supported. Run secret scanning in CI. Set spending caps and rate limits on every key. Rotate on any suspected exposure, with a documented fast process.

## S6 · OUTRO

Next lesson: supply chain risks — the third-party models, datasets, and packages your AI system depends on, and what can go wrong before you ever write a line of code.
