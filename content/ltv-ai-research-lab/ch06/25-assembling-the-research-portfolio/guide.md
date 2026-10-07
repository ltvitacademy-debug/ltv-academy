# Assembling the Research Portfolio

You've finished three projects and one interpretability case study, each with its own write-up sitting in its own chapter. This lesson is about pulling all four of those into a single portfolio artifact — the thing you'd actually hand a hiring manager, rather than four separate notebooks they'd have to go hunting through.

## What you'll learn

- What the four pieces of the portfolio are and where each one came from
- How to lay out a GitHub repo so the work is skimmable in minutes, not hours
- What a hiring manager actually scans for in a research portfolio
- Why one-page summaries matter as much as the underlying code

## The four pieces

- **Project 1 write-up** (Lesson 9) — the RL-for-query-optimization result, including the "where the agent still loses to the optimizer" case.
- **Project 2 write-up** (Lesson 14) — the reward-model result, including where it was weakest against the rubric.
- **Project 3 write-up** (Lesson 20) — the RLHF result for SQL Pete, before vs. after execution accuracy.
- **Interpretability finding** (Lesson 24) — the activation-patching and circuit result on SQL Pete, written in the claim/evidence/confidence/falsifier format.

Nothing new gets created here. The work is assembly: pulling four already-finished artifacts into one place with a consistent shape.

## Laying out the repo

A hiring manager will give your repo a few minutes, not an afternoon. Structure it so the top level tells the whole story before they open a single notebook:

```
research-lab-portfolio/
  README.md              <- one page: who, what, the 4 findings
  project-1-rl-query-opt/
    writeup.md
    notebook.ipynb
  project-2-reward-model/
    writeup.md
    notebook.ipynb
  project-3-rlhf-sql-pete/
    writeup.md
    notebook.ipynb
  interpretability-finding/
    writeup.md
```

The root README is the one-page summary of the whole portfolio: three or four sentences per project, the headline number for each, and a link down into the detail. Nobody should have to open a notebook to learn what you found.

## What a hiring manager scans for

- **A clear problem statement** — can they tell what you were trying to find out in one sentence?
- **Evidence of a real result, even a negative one** — a well-reported null result from Project 1 or 2 reads as more credible than a suspiciously perfect win.
- **Code that actually runs** — a cloned repo that errors out on line one undoes everything the write-up claimed.
- **One-page summaries, not just raw notebooks** — notebooks show the work; summaries show that you can communicate it.

## Key terms

- **Portfolio artifact** — the single assembled collection of all project write-ups and findings
- **One-page summary** — a short, skimmable version of a write-up's claim and headline result
- **Negative result** — an outcome that doesn't confirm the hypothesis, reported honestly rather than hidden

## Recap

The portfolio is assembly, not new work: four write-ups, one consistent repo layout, and a root README that tells the whole story in one page. A hiring manager scans for a clear problem, real evidence, runnable code, and a summary they don't have to dig for. Next up, Lesson 26: presenting this same material out loud.
