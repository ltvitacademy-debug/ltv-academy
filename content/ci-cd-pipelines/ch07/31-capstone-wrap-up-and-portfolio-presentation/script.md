# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

You've built a real pipeline for Northbridge Retail's storefront API — tests gating merges, an image built and tagged, staging deploying automatically, production waiting on approval. This final lesson turns that working pipeline into something that actually helps you get hired — a portfolio piece you can show, and a story you can tell about it in an interview.

## Segment 2 (steps)

A YAML file alone proves you can copy a tutorial. What belongs in the portfolio is the repository itself, a README that explains in order what the service does, what the pipeline does stage by stage, and why you made the choices you made, a screenshot of the pipeline actually running, and a short decision note on what you scoped out and why.

## Segment 3 (steps)

Interviewers ask specific questions about a project like this: walk me through what happens when you push a commit, why did production need approval but staging didn't, what happens if a deployment goes bad, and how would you know if this pipeline was actually helping. That last one is the DORA question from chapter one — name at least one real metric, like deployment frequency.

## Segment 4 (steps)

Your capstone is a concrete answer to that DORA question. A pipeline that auto-deploys to staging has a short lead time. A real test suite blocking bad merges keeps change failure rate down. That's not an abstraction anymore — it's exactly the system you just built and can point to.

## Segment 5 (outro)

That closes out CI slash CD Pipelines, but it's one piece of the larger DevOps Engineer path. The patterns here — build, test, gate, deploy, with Kubernetes and GitOps underneath — carry straight into the configuration-management and monitoring tooling covered later in the path. Keep this repository; you'll likely keep extending it.
