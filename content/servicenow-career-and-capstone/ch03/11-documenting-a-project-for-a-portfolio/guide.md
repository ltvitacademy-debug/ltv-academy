# Lesson 11 — Documenting a Project for a Portfolio

**Chapter 3 · Building a ServiceNow Portfolio · Lesson 11 of 26**

## What you'll learn

- The four real components a portfolio write-up needs to hold up under interview questions
- Why "what you built" is the least important of those four components, not the most important
- How to borrow the Architecture Decision Record habit from course 13 to document your own design choices
- How to apply this same structure to the capstone project you're about to build in Chapters 4 through 6

## Why a project needs a write-up, not just a demo

A finished build with nothing written down forces you to reconstruct your own reasoning on the spot, in front of an interviewer, for a project you may have built weeks or months earlier. A short written document — a page or two, not a report — fixes that. It's not for the interviewer to read cover to cover; it's a reference you've already written once, carefully, so that when you're asked "walk me through this," you're recalling a story you've already told yourself clearly, not inventing one live. The four components below are what separates a write-up like that from a bare list of features.

## Component one: the business problem

Start with what problem the project was actually solving, stated as a real situation, not a feature list. Not "built a Flow Designer automation" but "manual ticket routing meant every incoming request sat in a single queue until someone manually triaged and assigned it, adding delay before any work started." The business problem is what makes everything that follows make sense — an interviewer who hears the problem first can evaluate whether your solution actually fit it.

## Component two: the architecture and design decisions — and why

This is the component most candidates skip, and it's the one that matters most. Course 13, Lesson 3 introduced the Architecture Decision Record habit specifically for this reason: a decision without its reasoning attached is just a fact, easily second-guessed and impossible to defend. Apply that same discipline here. What were the real options you considered — not just the one you picked? Why did you choose a scoped application over a global one, or a scheduled job over an event-driven trigger? What constraint or tradeoff actually drove that choice? Writing "I used Flow Designer because it fit the approval-chain requirement without custom scripting, versus a Business Rule, which would have required more code for the same conditional branching" shows judgment. Writing "I used Flow Designer" shows only that a tool got used.

## Component three: what was actually built

Only now does the build itself belong in the document — and briefly. Describe the concrete result: the flow's steps, the application's tables and scripts, the integration's endpoints and data shape. Keep this component factual and short; it's the part an interviewer can often see for themselves if you're sharing a screen, so the write-up's job here is just to orient them, not to narrate every click.

## Component four: what you'd do differently with more time or scale

This is the component that most distinguishes a thoughtful candidate from one who's just reciting a finished project. Every lab or capstone build has real limits — a Personal Developer Instance doesn't force you to handle the user volume, the data volume, or the governance friction a real deployment would. Naming those limits honestly, and saying specifically what you'd change if this were a real 5,000-user rollout instead of a solo lab exercise, demonstrates exactly the kind of judgment an Architect-track or even a senior Developer-track interview is actually testing for. It's a stronger answer than pretending the lab version was already production-ready.

## Applying this to your own capstone

You're about to build a new capstone of your own, starting in Chapter 4 — a project scoped to a large organization, worked through across three chapters: requirements, build, and presentation. When it's finished, this same four-part structure is what turns it from "a project I did" into a portfolio document you can hand someone or talk through unprompted: the business problem that organization actually had, the design decisions you made and why — written as your own ADRs along the way, the same habit course 13 taught — what you actually built, and what you'd do differently at real scale. Write it as you go, not after the fact, the same way course 13 Lesson 3 recommended: capture the reasoning while you still remember it.

## Key terms

| Term | Meaning |
|---|---|
| Business problem | The real situation a project addresses, stated before any mention of the solution |
| Design decision | A specific choice made during the build, with the real alternatives and the reasoning behind the choice that was made |
| Architecture Decision Record (ADR) | The context-options-decision-consequences format from course 13 Lesson 3, reusable for any project write-up |
| Scale limitation | An honest statement of what a lab-scale build doesn't prove, and what would need to change at real scale |

## Check yourself

Pick one artifact from Lesson 9. Write one sentence for each of the four components — business problem, design decision and why, what was built, and what you'd do differently at scale. Is any one of those four sentences actually just a restatement of "what was built"? If so, that component needs more work.
