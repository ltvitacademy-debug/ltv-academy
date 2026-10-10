# Lesson 14 — Version Control Concepts

**Chapter 3 · Developer Habits · Lesson 14 of 18**

## What you'll learn

- The problem version control exists to solve, independent of any specific tool
- Core concepts: repository, commit, history, and branch
- Why commit messages matter as much as the code change itself
- How this connects forward to Salesforce's actual developer tooling later in this path

## The problem: code changes, and you need to know how

The moment more than one person touches the same code — or even one person working across several days — a basic question becomes surprisingly hard to answer without help: what changed, when, and why? Overwriting a file in place destroys the ability to answer that question entirely; the previous version is just gone. **Version control** is a system for recording every change to a codebase over time, as a sequence of discrete, labeled snapshots, so that history is never actually lost and can always be inspected, compared, or reverted.

This lesson teaches the concepts generically, independent of any one tool, because the ideas themselves — not a specific command syntax — are what actually transfer. **Git** is the specific, dominant version control tool used across the software industry today, including for Salesforce development; the next course in this path that touches Salesforce's own developer tooling (Salesforce DX, scratch orgs, and source-driven development) builds directly on these same concepts, with Git underneath.

## Repository, commit, and history

A **repository** (often shortened to "repo") is the full, tracked history of a codebase — not just its current state, but every recorded snapshot of it, from the very first one onward. A **commit** is one of those snapshots: a deliberate, labeled checkpoint recording exactly what the code looked like at that moment, along with a message describing what changed and, ideally, why. A sequence of commits, in order, is the repository's **history** — a complete, inspectable timeline of how the code got to its current state, one deliberate step at a time.

This is fundamentally different from a folder full of files named `script_final.apex`, `script_final_v2.apex`, and `script_final_v2_ACTUALLY_FINAL.apex` — an all-too-common manual substitute for real version control. A repository's history is structured, searchable, and each entry has an actual description attached, rather than relying on an increasingly desperate filename to communicate what changed.

## Why commit messages matter

A commit's code change shows *what* was altered; a well-written commit message explains *why*. "Fixed bug" as a commit message is nearly useless to a future reader (including your own future self) trying to understand a change six months later — it answers nothing a quick look at the code diff wouldn't already show. "Fixed off-by-one error in discount loop that skipped the last order item" is immediately useful: it names the actual problem, independent of having to re-derive it from the code alone. Writing a clear commit message is a communication skill, not an afterthought — it's writing for a reader who has no other context than the message in front of them.

## Branching: working on a change without disturbing the main line

A **branch** is a separate, parallel line of commits that diverges from a main history at some point, lets you make changes in isolation, and can later be merged back in once that work is ready. Branching solves a real problem: working on a risky or incomplete change directly in the same history everyone else depends on means anyone looking at that history mid-change sees broken, half-finished work. A branch lets that work happen safely off to the side, with the main line staying stable, until the new work is actually ready to rejoin it.

## Key terms

| Term | Meaning |
|---|---|
| Version control | A system for recording every change to a codebase over time as a sequence of snapshots |
| Repository | The full tracked history of a codebase |
| Commit | A single labeled snapshot of the codebase, with a message describing the change |
| History | The ordered sequence of all commits in a repository |
| Branch | A separate, parallel line of commits that can later be merged back into the main history |

## Lab

Without using any actual version control tool, simulate three commits on paper for a single evolving Apex method: write version 1 of a simple `calculateTotal` method, then a version 2 with one specific change, then a version 3 with one more specific change. For each of the three versions, write a one-line commit message in the "names the actual change and why" style this lesson describes — not "update code" or "fix."

## Check yourself

Can you explain, without notes, why "a folder full of files named script_final_v2_ACTUALLY_FINAL.apex" is not a real substitute for version control? Can you explain, in your own words, what problem a branch solves that working directly in the main history does not?
