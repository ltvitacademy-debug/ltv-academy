# Capstone: Wrap-Up & Portfolio Presentation

You've built a real pipeline for Northbridge Retail's `storefront-api` — tests gating merges, an image built and tagged, staging deploying automatically, production waiting on approval. This final lesson is about turning that working pipeline into something that actually helps you get hired: a portfolio piece you can show, and a story you can tell about it in an interview.

## What you'll learn

- What to actually put in a portfolio around a CI/CD project (it's not just the YAML file)
- The specific questions interviewers ask about pipeline projects, and how to answer them well
- How to write a README that lets a stranger understand your pipeline in two minutes
- How this capstone connects to the DORA metrics from Chapter 1 — closing the loop the whole course opened

## What belongs in the portfolio piece

A YAML file alone proves you can copy a tutorial. What actually demonstrates understanding is the decision-making around it:

1. **The repository itself**, public and clean — `storefront-api` with its Dockerfile, tests, and workflow file(s) from Lesson 30.
2. **A README** that explains, in order: what the service does, what the pipeline does stage by stage, and — most important — *why* you made the choices you made (why staging gets Continuous Deployment but production gets Continuous Delivery; why you chose GitHub Actions, Azure Pipelines, or both).
3. **A screenshot or two** of the pipeline actually running — a green check, a real Actions run, or an Azure Pipelines run — proving this isn't just a YAML file that's never been executed.
4. **The short decision note** from Lesson 29's deliverables, cleaned up into a few paragraphs: what you built, what you deliberately scoped out and why, and what you'd add with more time (a canary rollout from Chapter 5, GitOps from Chapter 6, if you didn't get to them).

## Questions interviewers actually ask about a project like this

- *"Walk me through what happens when you push a commit."* Be able to narrate your own pipeline stage by stage without looking at the file.
- *"Why did production need approval but staging didn't?"* This is really asking whether you understand Continuous Delivery vs. Deployment (Chapter 1, Lesson 3) — not just that you copied the pattern.
- *"What happens if a deployment goes bad?"* Even if you didn't build automatic rollback, you should be able to describe the rollback strategy from Chapter 5, Lesson 25 and how you'd wire it in.
- *"How would you know if this pipeline was actually helping?"* This is the DORA question (Chapter 1, Lesson 4) — a good answer names at least deployment frequency and change failure rate, not just "it feels faster."

## Closing the loop: DORA, one more time

This whole course opened with four numbers that measure whether CI/CD is actually working: deployment frequency, lead time for changes, change failure rate, time to restore service. Your capstone pipeline is a small, concrete answer to that question — a real, working system where you can point to each one. A pipeline that auto-deploys to staging has a short lead time. A pipeline with a real test suite blocking bad merges keeps its change failure rate down. That's not an abstraction anymore; it's the exact thing you just built.

## Where to go from here

This capstone closes CI/CD Pipelines, but it's one piece of the larger DevOps Engineer path. The patterns here — build, test, gate, deploy, with Kubernetes and GitOps underneath — are the same patterns you'll use with the configuration-management and monitoring tooling covered later in the path. Keep `storefront-api`'s repository around; it's a project you'll likely keep extending.

## Key terms

- **Portfolio piece** — a project presented with enough context (README, screenshots, rationale) that a stranger can evaluate it without you in the room
- **Decision note** — a short written explanation of what you built and why, turning a pile of YAML into evidence of judgment
