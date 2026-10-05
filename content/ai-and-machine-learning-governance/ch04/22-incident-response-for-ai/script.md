# Lesson 22 — Incident Response for AI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A model can be fully up, fast, and error-free — and still be having an incident. This lesson closes Chapter Four with what actually happens when something goes wrong.

## S2 · STEPS — What counts as an incident

Traditional incident response means "the system is down." For AI, that's only one category: biased or harmful output discovered after the fact, drift-driven accuracy loss, data leakage through a generative system's own responses, or a conventional breach of weights or training data. None of these necessarily trip a standard uptime alert.

## S3 · STEPS — The response sequence

A governed program moves through five steps: detect, through monitoring or a report; contain, usually by pulling the model from production; assess impact using lineage, to find exactly which decisions were affected; notify whoever needs to know; and remediate the underlying cause, not just the symptom.

## S4 · CODE — The AI-specific kill switch

The fastest containment tool is the alias from the registry lesson. Moving Champion back to the last known-good version is often one operation — no code deployment, no waiting on a release cycle. But that only works if versioning and the registry were already disciplined before the incident happened.

## S5 · STEPS — After containment

Containing the harm isn't the end. Update the model card with the newly discovered limitation. Feed the finding back into the approval process so the next version gets checked for it. And record the full incident in version history — what was found, contained, and changed.

## S6 · OUTRO

That closes Chapter Four, and this course's build-out through Lesson 22. Chapter Five moves from governing the model itself to the broader discipline of Responsible AI and Risk.
