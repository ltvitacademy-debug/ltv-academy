# Lesson 9 — Human Evaluation Processes · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Automated metrics are fast and consistent, but they have a ceiling. This lesson covers why humans stay in the loop, and how to build a review process that actually scales.

## S2 · STEPS — Why humans are still needed

Some qualities — tone, real helpfulness, a borderline judgment call — are genuinely subjective, and an LLM-as-judge is itself a model that needs checking against human agreement. Human review also catches failure modes nobody thought to write a rubric for yet.

## S3 · STEPS — Designing a process that scales

Sample, don't review everything — a representative sample plus anything automated metrics flagged as borderline. Use structured rubrics instead of open-ended judgment. Check inter-rater reliability periodically. Route disagreements somewhere instead of discarding them.

## S4 · CODE — A structured rubric

Each criterion gets its own pass or fail, rather than one holistic score. That's what makes two different reviewers land on the same answer most of the time, and makes disagreements easy to localize.

## S5 · STEPS — Common pitfalls

Reviewer fatigue degrades rating quality past a certain volume in one sitting. Ambiguous rubrics mean the rubric needs fixing, not the reviewers. Single-reviewer bias becomes the de facto standard unchecked. And no feedback loop back into the eval dataset makes it a one-time check, not a system.

## S6 · OUTRO

Next lesson: regression testing AI systems — turning everything built so far into a gate that runs automatically before every change ships.
