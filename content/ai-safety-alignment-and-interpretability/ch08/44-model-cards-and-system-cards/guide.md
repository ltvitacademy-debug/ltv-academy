# Model Cards & System Cards

Everything so far in this course — alignment techniques, evaluation design, oversight methods, interpretability tools — eventually has to be communicated to someone outside the research team: a deployment reviewer, a regulator, a downstream developer, or the public. This lesson covers the document that carries that communication: the model card or system card published alongside a frontier model release. It's the artifact where all of a lab's internal safety work becomes externally checkable, and understanding what belongs in one — and why labs bother writing them — is part of the practical job this chapter is building toward.

## What you'll learn

- Where the model card idea originated and what problem it was built to solve
- What a modern frontier-model system card actually contains
- The difference between a model card (narrower, more standardized) and a system card (broader, release-specific)
- Why these documents matter for both external accountability and internal process discipline
- What a well-written card looks like versus a weak one

## Where the idea came from

The model card concept traces to a 2018 paper from Google researchers, "Model Cards for Model Reporting," which proposed short, standardized documents to accompany trained models — originally aimed at narrower, single-purpose classifiers. The paper's pitch was simple: a model's performance is never uniform across every input it might see, and a one- or two-page report that discloses intended use, known limitations, and benchmarked performance across different conditions gives downstream users a way to judge fit before deploying the model somewhere it wasn't tested for. That idea of structured, standardized disclosure — rather than a marketing page or a README — is the thread that runs from that original paper to today's frontier-model documents.

## What a frontier-model system card contains

As general-purpose LLMs grew far more capable and more consequential than the original narrow classifiers, labs expanded the concept into "system cards": long, release-specific documents published alongside models like GPT-4, GPT-5, and Claude. A modern system card typically covers:

- **Capability summary** — what the model can do, benchmark results, and comparisons to prior models
- **Safety evaluations** — results from the kinds of capability and safety evals covered in Chapter 3: dangerous-capability testing, red-teaming findings, refusal behavior
- **Known limitations and failure modes** — places the model is known to behave unreliably, hallucinate, or fail in predictable ways
- **Risk categories and mitigations** — specific risks the lab assessed (for example, biological, cyber, or persuasion-related uplift) and what safeguards were applied before release
- **External testing** — summaries of red-teaming or evaluation work done by outside researchers or third parties, as covered in Lesson 17
- **Training and data overview** — a higher-level description of how the model was built, without necessarily disclosing proprietary detail

A system card is not the same thing as a narrow model card. A model card is closer to the original, more standardized format — compact, often per-model-version, emphasizing intended use and limitations. A system card is the broader document a lab writes to cover an entire release, including all the evaluation and safety work done specifically for that deployment decision. In practice, labs use the terms somewhat differently — Anthropic has published model cards for Claude releases, while OpenAI has used "system card" as its standard term since GPT-4 — but the underlying goal of structured, pre-release disclosure is the same.

## Why these documents matter beyond the PR function

It's tempting to read a system card as a compliance artifact or a marketing-adjacent safety gesture. Two more substantive reasons make them matter:

**External accountability.** A published card is a falsifiable claim. If a lab states that a model was evaluated against a specific dangerous-capability threshold and found below it, outside researchers, journalists, and regulators have something concrete to scrutinize, replicate, or challenge. Vague or absent disclosure can't be checked at all. This is the same accountability logic behind the third-party evaluation practices covered in Chapter 3.

**Internal process discipline.** Writing a card forces the internal teams who ran evaluations, red-teaming, and safety testing to produce a single, coherent, specific account of what was actually done — not just what was intended. Teams that know a card has to be published tend to run more rigorous evaluations earlier, because a vague or missing result becomes visible in the final document. In this sense, the external-facing document has an internal-facing side effect: it's a forcing function for the rest of the safety pipeline this course has covered.

## What makes a card weak versus strong

A weak card reads like marketing copy: broad capability claims, generic safety language ("we take safety seriously"), no specific numbers tied to specific evaluations, and no acknowledgment of real limitations. A strong card reads like an engineering report: specific eval names and scores, explicit statements of what was *not* tested, honest acknowledgment of known failure modes, and a clear mapping from identified risks to the mitigations actually applied. As a future alignment research engineer, you may well be the person generating the raw evaluation results that become a paragraph in one of these documents — which is one more reason the eval design practices from Chapter 3 need to produce numbers specific and honest enough to survive being published.

## Key terms

| Term | Meaning |
|---|---|
| Model card | A short, standardized document reporting a model's intended use, performance, and limitations, originating from a 2018 Google research paper |
| System card | A longer, release-specific document covering a frontier model's capabilities, safety evaluations, and mitigations, the term generally used for modern LLM releases |
| Intended use | The scenarios and conditions a model was actually designed and tested for, as distinct from every context someone might deploy it in |
| External accountability | The function a published card serves by giving outside parties a specific, checkable claim rather than a vague assurance |
| Forcing function | A process that indirectly improves rigor because its output will be scrutinized; here, the knowledge that eval results will be published |

## Recap

Model cards and system cards are the documents where a lab's internal evaluation and safety work becomes an externally checkable claim, tracing back to a 2018 standardization proposal and expanding into the long, release-specific documents labs now publish alongside frontier models. They serve both an external accountability function and an internal discipline function, and the quality of a card depends directly on the specificity and honesty of the evaluation work feeding into it — work this course has spent several chapters teaching you to design. The next lesson turns from disclosure documents to the pre-commitment frameworks — responsible scaling policies — that decide what safety measures a given capability level requires in the first place.
