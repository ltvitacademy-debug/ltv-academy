# Lesson 2 — Why AI Needs Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Last lesson defined AI governance. This lesson asks the harder question: why does AI specifically need it, beyond what data governance already covers?

## S2 · STEPS — Learned, not authored

Traditional software runs on logic a person wrote down — find the wrong line, fix it. A machine learning model is trained on data until its internal parameters match the patterns well enough. Nobody wrote the rule explicitly, and often nobody can fully read it back out, even the people who built it.

## S3 · STEPS — Why that raises the stakes

Three consequences follow. Scale — one flaw gets repeated thousands of times a day with no human reviewing each case. Opacity — it's genuinely harder to predict or explain a model's behavior. Inherited risk — a model trained on biased or incomplete data doesn't just reproduce the flaw, it generalizes it to new cases.

## S4 · STEPS — Who bears the risk

It's tempting to assume the vendor or the data science team absorbs this risk. In practice, the organization that deploys the model and acts on its output is the one accountable to the customer and the regulator. "The vendor's model did it" rarely holds up after the fact.

## S5 · STEPS — What skipping it looks like

Usually not one dramatic failure. A model quietly performing worse for one group for months. A confident, wrong chatbot answer a customer acted on. A fraud model whose accuracy drifts as the world changes, with nobody watching. Each survivable alone — together, that's the risk governance exists to catch early.

## S6 · OUTRO

Next lesson: the specific risk categories — bias, privacy, security, and hallucination — that governance programs are built to catch.
