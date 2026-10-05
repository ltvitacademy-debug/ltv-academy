# Lesson 25 — Cloud Governance Review Checklist · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This closing lesson is a working checklist, not a summary to skim. Run it against a real environment, the Briarcliff case study, or your own control map from the last lesson — for every item, you should be able to name a specific tool, person, or document.

## S2 · STEPS CARD (Chapters 1-2)

Architecture: can you state the shared responsibility line for each cloud, and does every landing zone have consistent environment separation? Identity: is there one source of truth driving least-privilege access on both Azure RBAC and AWS IAM, with a scheduled, recurring access review?

## S3 · STEPS CARD (Chapters 3-4)

Storage and catalogs: are ADLS and S3 each governed natively, and cataloged together in one searchable place rather than two disconnected systems? Security and compliance: one encryption standard across Key Vault and KMS, with Azure Policy and AWS service control policies both actively enforcing, not just available and unused.

## S4 · STEPS CARD (Chapter 5)

The control-map test: do you have a written map pairing each primary-cloud control with its secondary-cloud equivalent, with a named owner on every row — even an honest "unassigned"? And the one-search test: could you answer a regulator's question about who can access a dataset in one search, or would it take two separate investigations?

## S5 · STEPS CARD (closing advice)

This course's single biggest piece of advice: none of the tools you learned — Entra ID, Azure Policy, AWS IAM, Purview, CloudTrail — governs anything by themselves. They make good governance possible. A named owner and a recurring habit are what make it real.

## S6 · OUTRO CARD

Congratulations — you've completed Cloud Data Governance: Azure and AWS. The Data Governance path continues next with AI and Machine Learning Governance: governing not just the data, but the models trained on it.
