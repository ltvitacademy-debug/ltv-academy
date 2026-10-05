# Lesson 17 — Securing AI Systems · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Four: Security, Access and Monitoring. First question: what makes securing an AI system different from securing a normal application?

## S2 · STEPS — A wider surface

A normal application's security means protecting code, infrastructure, and data. An AI system adds a new category: the model itself is both a sensitive asset and an attack surface. Its weights can be stolen, its behavior manipulated through inputs rather than a bug, and the data it learned from can be poisoned long before anyone notices.

## S3 · STEPS — Four AI-specific risks

Four risks worth knowing by name: model theft, where an attacker reconstructs a model just by querying it repeatedly; adversarial inputs, crafted to fool a model's actual decision logic; data poisoning, corrupting training data on purpose; and insecure model files, where loading the wrong format can execute code, not just produce a bad prediction.

## S4 · CODE — A real, documented example

Here's a concrete one. Python's pickle format, long used to save models, executes arbitrary code when it's loaded — a malicious file isn't just bad data, it can run anything on the machine that opens it. The industry's answer is safetensors: a format designed so loading a model only reads data, never executes code.

## S5 · STEPS — Baseline controls

The baseline response: access control on model artifacts, rate limiting on inference endpoints to slow extraction, input validation to catch adversarial-looking requests, provenance checks on training data, and preferring safe, non-executable file formats.

## S6 · OUTRO

Next lesson: who's actually allowed to touch a model or its training data in the first place? That's access to models and data.
