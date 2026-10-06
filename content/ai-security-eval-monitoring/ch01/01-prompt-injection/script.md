# Lesson 1 — Prompt Injection · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Prompt injection is the first risk on nearly every AI security list. This lesson covers what it actually is, what it looks like, and what actually helps.

## S2 · STEPS — What it is

A model doesn't really separate instructions from data — everything arrives as one stream of text. Prompt injection is crafted text designed so the model treats it as a new instruction instead of content to process. The goal is almost always to override the developer's original instructions with the attacker's.

## S3 · CODE — What it looks like

Injected text doesn't need to look dramatic. It can hide inside normal-looking content — a product review, a webpage, a résumé — as a block the model reads like any other text, telling it to behave differently once it gets there. A human skimming the page never notices it.

## S4 · STEPS — Direct vs. indirect

Direct injection is simple: the attacker is the user, typing the instruction straight into the chat. Indirect injection is the harder case — the instruction is planted somewhere the AI reads on the user's behalf, like a webpage it's asked to summarize. The user never sees it happen.

## S5 · STEPS — Defenses that help

No single fix eliminates this. Layering helps: separate trusted and untrusted text explicitly. Give the model least-privilege tools, so an injected instruction has nothing dangerous to trigger. Require human confirmation before anything irreversible. Filter output against policy before it executes.

## S6 · OUTRO

Next lesson: jailbreaking — how attackers try to talk a model out of its own safety training, even without any external content involved.
