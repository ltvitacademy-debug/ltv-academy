# Lesson 29 — Governance Architecture Practice Lab

**Chapter 6 · Applied Architecture · Lesson 29 of 30**

## What you'll learn

- How to run the same design sequence Castellan and Northbridge went through, on a scenario of your own
- A seven-step checklist that turns every chapter of this course into one practical design exercise
- What a genuinely complete governance architecture design package looks like, versus a vague one
- How to self-review your own design work honestly before the final lesson's advice on presenting it

## Why this lesson is entirely hands-on

Lessons 27 and 28 showed the whole course applied to two fictional organizations. Reading someone else's design decisions and making your own are different skills — this lesson closes that gap before the course ends. There's no new concept here; everything you need was covered in Chapters 1 through 5. The point is building the muscle of applying it end to end, once, on a scenario you choose yourself.

## Choose your scenario

Pick one of these before starting, so the exercise stays concrete:

- Your own current or former employer, scoped to one real data domain you actually know something about.
- A plausible fictional organization of your own invention, clearly labeled fictional — a different industry than either Castellan (manufacturing) or Northbridge (financial services) makes for better practice than reusing one of theirs.

Either way, write down three or four concrete facts about it first: roughly how many business units or systems are involved, what's driving the need for governance (growth, an acquisition, a regulation, an AI initiative), and who would plausibly sponsor the work.

## The seven-step design checklist

Work through these in order — each one maps directly to a lesson earlier in this course:

1. **Capabilities snapshot** (Lesson 4) — what governance capabilities already exist, informally or formally, and what's missing.
2. **Operating model choice** (Lessons 6-11) — centralized, federated, decentralized, data mesh, or a hybrid, with one sentence on why, using the selection criteria from Lesson 11.
3. **Metadata and catalog shape** (Lessons 12-16) — what needs a shared definition, what needs lineage tracing, and whether active metadata matters here.
4. **Security and platform decision** (Lessons 17-20) — the access control boundary that matters most for this scenario, and one platform or tooling decision significant enough to deserve an ADR.
5. **Strategy anchor** (Lesson 22) — the one business outcome this whole effort has to serve, in one sentence.
6. **Roadmap sketch** (Lesson 23) — one quick win and one foundational investment, sequenced into Now / Next.
7. **Governance structure** (Lessons 25-26) — one ADR for your step-4 decision, and a two-sentence review board charter (who sits on it, what it reviews).

## What a complete design package looks like

A finished exercise should read like a shorter version of Lesson 27 or 28: a named (and if fictional, clearly labeled) scenario, a chosen operating model with a reason, a metadata/catalog approach, one real ADR, a roadmap with at least one quick win, and a review board charter — not a restatement of course definitions with no scenario attached to them.

## Key terms

| Deliverable | What it should contain |
|---|---|
| Capabilities snapshot | Honest list of what exists today versus what's missing |
| Operating model decision | One model chosen, with a one-sentence reason tied to the scenario |
| ADR | A complete record for your single most significant platform or architecture decision |
| Roadmap sketch | At least one Now-horizon quick win and one Next/Later foundational investment |
| Review board charter | Named seats, three example agenda items, and quorum |

## Lab

Complete the full seven-step checklist above for your chosen scenario, in writing. Budget roughly 45-60 minutes. Don't aim for polish — aim for completeness: every one of the seven steps should have a real, specific answer, not a placeholder.

## Check yourself

Look back at your own completed exercise: does every step have a genuinely specific answer tied to your scenario, or are any of them still generic course definitions with no scenario attached? Fix any that are before moving to the final lesson.
