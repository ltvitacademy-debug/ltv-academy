# Lesson 20 — Portfolio Presentation Strategy

**Chapter 5 · Career Preparation · Lesson 20 of 23**

## What you'll learn

- Why pinning three deep projects beats a long list of shallow ones
- The README structure that lets a reviewer evaluate an AI project in two minutes
- How to use architecture diagrams and eval results as portfolio proof
- What a short demo video should show, and why it matters for systems most reviewers can't run themselves

## Pin three, not thirty

GitHub's six pinned-repo slots are your portfolio's front page. Pin your three capstone projects from this course — the RAG knowledge assistant, the AI data analyst, and the tool-using agent — not a scattering of tutorial follow-alongs and half-finished notebooks. A reviewer skimming your profile forms an opinion in the time it takes to glance at six repo cards; three complete, well-documented projects beat fifteen abandoned experiments every time.

## The README a reviewer can actually evaluate in two minutes

A strong AI-project README front-loads exactly what a technical reviewer needs, in this order:

1. **One-sentence description** of what the system does and who it's for.
2. **Architecture diagram or bullet list** — the moving pieces (ingestion, retrieval, generation; or tools, approval checkpoint, logging) and how data flows between them. It doesn't need to be elaborate — a clear ASCII or Mermaid diagram is enough.
3. **A live demo link or a short recording**, linked near the top, not buried at the bottom.
4. **Eval results**, stated plainly — retrieval relevance, answer faithfulness, latency, or whatever metrics you actually measured, with the test set size noted.
5. **Key design decisions**, in two or three bullets — why this chunking strategy, why this tool set, why this approval pattern. This is the section that actually gets you hired; a reviewer can run your code themselves, but they can't read your reasoning anywhere else.

## Architecture diagrams and eval results as portfolio proof

A simple architecture diagram does more for a reviewer than paragraphs of description — it shows in one glance that you understand how the pieces of your system actually connect, which is exactly what a system-design interview will ask you to defend later. Pair it with your real eval numbers (from the evaluation work in Chapters 2 and 4 of this course) rather than a bare claim that the system "works well." A number a reviewer can question is more credible than an adjective they can't.

## A short demo video earns its place

Most reviewers will never clone your repo, install dependencies, and configure API keys themselves — there simply isn't time. A two-to-three-minute screen recording (Loom or similar) walking through your deployed project's actual behavior — a real query hitting your RAG assistant, a natural-language question turning into SQL, an agent pausing for approval before it acts — gets you most of the benefit of a live demo without asking anyone to set up your environment. Link it at the top of your README.

## Common mistakes

- **Pinning tutorial clones.** A repo that's clearly a copy of a popular tutorial, with no changes and no README of your own, signals the opposite of what you want.
- **A README that's just a license and a boilerplate "getting started."** If it doesn't explain what the system does and why you built it the way you did, it isn't doing its job.
- **No eval numbers anywhere.** A reviewer has no way to judge "it works" without a measured result to look at.
- **A dead demo link.** Test every link in your README before you consider a project "portfolio-ready" — a broken link where a demo should be is worse than no link at all.

## Key terms

| Term | Meaning |
|---|---|
| Pinned repository | One of up to six repos GitHub lets you feature at the top of your profile |
| Architecture diagram | A simple visual or bullet map of a system's components and how data flows between them |
| Demo video | A short screen recording walking a reviewer through a project's real, working behavior |

## Lab

Write (or rewrite) the README for your strongest capstone project using the five-part structure above, including a real eval number and a tested demo link. If you don't have a short demo recording yet, outline the three things it would show in under three minutes.

## Check yourself

Can you name the five sections a strong AI-project README should lead with, and explain why the "key design decisions" section is the one that most influences a hiring decision?
