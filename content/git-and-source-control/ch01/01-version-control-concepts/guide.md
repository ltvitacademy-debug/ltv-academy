# Lesson 1 — Version Control Concepts

**Chapter 1 · Git Fundamentals · Lesson 1 of 17**

## What you'll learn

- What a version control system actually solves, independent of any one tool
- The difference between centralized and distributed version control
- Why Salesforce teams need version control even though the "real" app lives in an org, not on disk
- The core vocabulary — repository, working copy, commit, history — you'll reuse all course

## The problem before version control

Before you touch Git, it helps to see the problem it exists to solve. Imagine two developers, Priya and Marcus, both working on the same Salesforce org. Priya edits an Apex trigger on Monday. Marcus edits the same trigger on Tuesday, not knowing about Priya's change, and overwrites it when he saves. Nobody notices until QA finds a bug that "used to be fixed." There's no record of what changed, when, why, or who touched it last — and no way to get Monday's version back.

A **version control system (VCS)** is software that records every change made to a set of files over time, who made it, and why, and lets you recall, compare, or restore any earlier version on demand. That's the whole job: a complete, searchable history of a codebase, plus the ability to combine different people's changes safely.

## Centralized vs. distributed version control

Version control systems come in two basic shapes:

- **Centralized VCS** (e.g., the older Subversion/CVS model) keeps the one authoritative history on a central server. Every developer's machine holds only a working copy of the current files; to see history or commit a change, you need a network connection to that server.
- **Distributed VCS** (Git, Mercurial) gives every developer a full copy of the *entire history*, not just the current files, on their own machine. You commit, branch, and browse history completely offline; syncing with others (push/pull) is a deliberate, separate step.

Git, the tool this course teaches, is distributed. That single design choice explains a lot of what makes Git feel different from older tools: cloning a repository downloads everything, commits happen instantly and locally, and "the server" (GitHub, Bitbucket, a company's own Git host) is just one more copy everyone agrees to treat as the shared reference point — not a single point of failure for your daily work.

## Why this matters specifically for Salesforce

Salesforce is unusual among the platforms you might work on: the "real" application state lives inside an org's database and metadata, not in files on a hard drive. For years, many Salesforce teams skipped version control entirely — admins clicked changes directly into production, and whatever was in the org *was* the source of truth. That worked for small, single-admin orgs, but breaks down fast with more than one developer, a release process, or any regulatory requirement to show what changed and why.

Modern Salesforce development treats the **org as a deployment target, not the source of truth** — a practice called source-driven (or source-tracked) development. The actual source of truth is a Git repository holding every piece of metadata — Apex classes, Lightning components, flows, object and field definitions — as text files. Changes are made in a sandbox or scratch org, retrieved into that repository, reviewed and merged like any other code change, and then deployed forward to other orgs. Chapter 3 of this course covers exactly how that works in practice; everything in Chapters 1 and 2 is the general Git knowledge that makes it possible.

## Core vocabulary you'll use all course

A few terms recur constantly and are worth fixing now:

- **Repository (repo)**: the full tracked history of a project — every commit that has ever been made, plus the current files.
- **Working copy (working directory)**: the actual files on your disk right now, which you edit directly.
- **Commit**: a saved snapshot of the repository at one point in time, with a message describing what changed and why.
- **History**: the complete, ordered sequence of commits that make up a repository's past.

## Key terms

| Term | Meaning |
|---|---|
| Version control system (VCS) | Software that records changes to files over time and lets you recall any earlier version |
| Centralized VCS | A VCS where one server holds the authoritative history (e.g., Subversion) |
| Distributed VCS | A VCS where every clone holds the full history (e.g., Git) |
| Repository | The full tracked history and current files of a project |
| Source-driven development | Treating a Git repo, not the org, as the source of truth for Salesforce metadata |

## Lab

Without opening a terminal yet, write a short paragraph (4-6 sentences) describing, in your own org's or a hypothetical team's terms, what currently happens when two admins change the same flow or Apex class around the same time. Then describe what you'd want a tool to do instead — in plain language, not Git commands. Keep this paragraph; by the end of Chapter 1 you'll be able to rewrite it using real Git vocabulary.

## Check yourself

Can you explain, to someone who has never heard of Git, the difference between a centralized and a distributed version control system? Can you say in one sentence why "the org is not the source of truth" is the foundational idea behind modern Salesforce development?
