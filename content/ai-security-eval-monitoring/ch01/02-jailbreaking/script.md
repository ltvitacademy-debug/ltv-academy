# Lesson 2 — Jailbreaking · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Jailbreaking is a different problem from prompt injection — it's an attacker talking a model out of its own safety training, in plain conversation.

## S2 · STEPS — Jailbreaking vs. injection

Prompt injection sneaks a new instruction into content the model processes. Jailbreaking is the user talking directly to the model, trying to get it to produce something it was trained to refuse. No foreign content gets injected — the conversation itself is the attack surface.

## S3 · STEPS — Common technique categories

Described here for defensive awareness, not as working scripts. Role-play framing asks the model to pretend to be an unrestricted character. Hypothetical framing wraps the request as fiction or research. Instruction layering splits or encodes the request across turns. Refusal suppression explicitly tells the model not to refuse or add disclaimers.

## S4 · STEPS — Why it keeps working

Safety training teaches patterns from finite examples. A new fictional frame or a new way of phrasing the request can fall outside what training covered — not because the harm changed, just the wrapper did. It's an ongoing arms race, not something that gets solved once.

## S5 · STEPS — What actually helps

Layered classifiers, separate from the model's own training, catch what slipped past it. System-level constraints mean even a successful jailbreak has no dangerous tool to call. Red-team your own app continuously. And assume some attempts will succeed — monitoring matters as much as prevention.

## S6 · OUTRO

Next lesson: data exfiltration via AI — how an AI system can leak sensitive information even without anyone jailbreaking it at all.
