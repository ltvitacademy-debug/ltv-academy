# Lesson 5 — Supply Chain Risks: Third-Party Models

**Chapter 1 · AI-Specific Security Risks · Lesson 5 of 25**

## What you'll learn

- Everything an AI application actually depends on besides its own code
- How a model or dataset can be compromised before you ever touch it
- The mechanisms behind these risks, explained for defense
- A practical checklist for vetting what you build on

## What's actually in the supply chain

When a team builds an AI feature, "our code" is usually the smallest part of what's running. The real dependency list typically includes: a pretrained model downloaded from a public hub, possibly a third-party dataset used to fine-tune it further, a handful of open-source orchestration packages (agent frameworks, vector database clients, prompt-management libraries), and sometimes plugins or extensions written by people outside your organization entirely. Every one of those is a link in the supply chain, and a weakness in any of them becomes a weakness in your application.

## Specific risks in this chain

**Poisoned or backdoored model weights.** A model is just a very large file of numbers. Someone can take a legitimate base model, fine-tune in a hidden "trigger behavior" (the model behaves normally except when it sees a specific phrase, at which point it does something the attacker wants), and upload it to a public hub looking exactly like a normal fine-tune.

**Dataset poisoning.** If you fine-tune on a third-party dataset, a small number of subtly mislabeled or crafted examples mixed into an otherwise legitimate-looking dataset can implant unwanted behavior without being obvious on casual inspection.

**Vulnerable or malicious dependencies.** The AI ecosystem's package registries (PyPI, npm) have the same typosquatting and malicious-package problems any software ecosystem does — a package named almost identically to a popular AI library, uploaded by an attacker, that does something harmful on install or import.

**Unverified provenance.** Many model hub listings have no cryptographic guarantee that the weights you're downloading are actually what the model card claims, or that they haven't been swapped since the page was last reviewed.

## Why this is easy to overlook

None of these risks look like a security problem from the builder's seat — downloading a model or `pip install`-ing a package feels exactly like a normal part of development, not like accepting an unreviewed third-party binary into production. That mismatch between how routine it feels and how much trust it actually grants is exactly what makes supply chain risk easy to skip past.

## A practical checklist

- **Prefer models with verifiable provenance** — published hashes, signed weights, or a hub's own verification badge where available.
- **Pin dependency versions** and use a lockfile, rather than always pulling "latest."
- **Run dependency vulnerability scanning** in CI for every package your AI stack pulls in, the same as you would for any other software dependency.
- **Vet third-party datasets** before fine-tuning on them — spot-check samples, check for a documented source and license, and be suspicious of datasets with no clear provenance.
- **Use a private package mirror** for production builds where practical, so a registry-level compromise doesn't reach your build pipeline automatically.
- **Document what you depend on** — a simple internal list of every model, dataset, and key package your AI feature relies on, so a disclosed vulnerability anywhere in that list can be traced quickly.

## Key terms

| Term | Meaning |
|---|---|
| Model provenance | Verifiable evidence of where a model's weights actually came from |
| Dataset poisoning | Crafted examples mixed into training data to implant unwanted behavior |
| Typosquatting | Publishing a malicious package under a name nearly identical to a popular one |

## Lab

Pick one AI-related open-source package your team uses (or one you can find on PyPI or npm). Look at its published page: does it show a verified publisher, a link to a public source repository, and recent maintenance activity? Write two sentences on what you'd want to see before trusting it in production, versus what you actually found.

## Check yourself

Can you explain, in your own words, why downloading a pretrained model from a public hub carries meaningfully more risk than installing a well-known software library?
