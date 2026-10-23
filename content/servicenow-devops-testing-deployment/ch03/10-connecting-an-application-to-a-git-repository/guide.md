# Lesson 10 — Connecting an Application to a Git Repository

**Chapter 3 · Source Control Integration · Lesson 10 of 26**

## What you'll learn

- The real, conceptual steps for linking a scoped application in Studio to an external Git repository
- What credentials and connection details that link actually requires
- The real difference between pushing and pulling once the link exists
- Why this turns ServiceNow development into a workflow that looks like standard software development

## Linking the application record

Lesson 9 established that Source Control Integration connects a scoped application's files to an external Git repository. The actual connection happens at the application record level in Studio: the scoped application is linked to a specific repository URL — a real, externally hosted Git repository on a provider like GitHub, GitLab, or Bitbucket. That repository becomes the application's source of truth for its code going forward, alongside (not instead of) the application record living inside the ServiceNow instance.

This is conceptually the same thing a developer does on any other software project when they clone or initialize a repository for a new codebase — the difference here is that the "codebase" is a ServiceNow scoped application, and the "project folder" is the application's component records (scripts, business rules, UI pages, and the rest) as Studio manages them.

## Authenticating the connection

A Git repository on GitHub, GitLab, or Bitbucket doesn't accept pushes from just anyone — it requires real authentication. Connecting an application to a repository means configuring the credentials ServiceNow needs to authenticate as a user (or service account) with push and pull access to that repository. Exactly how that credential is stored and presented depends on the provider and the instance's configuration, but the underlying idea is unchanged: the instance needs to prove it's allowed to read from, and write to, that repository before any code can move in either direction.

This is a real, practical security consideration, not a minor setup detail. The credential used for this connection effectively has write access to the application's entire codebase — it should be treated with the same care any other production credential would get.

## Pushing and pulling

Once the connection is authenticated, two directions of movement become possible:

- **Push** — changes made to the application inside the ServiceNow instance (through Studio) are sent out to the connected Git repository, recorded there as a real commit.
- **Pull** — changes that exist in the Git repository (for example, a merged pull request, or work done directly in the repository) are brought back into the ServiceNow instance, updating the application's component records to match.

This is the same push/pull vocabulary any developer already uses on any other Git-based project. Nothing about it is ServiceNow-specific once the connection exists — it's the same mental model from Git/GitHub/CI-CD, now operating on a scoped application instead of a general codebase.

## Why this is the real practical payoff

Before this connection exists, a scoped application's code is something you can only move between instances by hand, through Update Sets, or by looking at it inside Studio. After the connection exists, that same application behaves like any other software project: it can be committed, pushed, branched, and pulled using the same habits a development team already has. That's the real shift this lesson is about — not a new skill from scratch, but the same Git workflow this catalog has already taught, now pointed at a ServiceNow application instead of a general codebase.

## Key terms

| Term | Meaning |
|---|---|
| Repository link | The connection, configured at the application record, between a scoped application and an external Git repository |
| Credential / authentication | What proves the ServiceNow instance is permitted to read from and write to the connected repository |
| Push | Sending changes made inside the instance out to the connected Git repository as a commit |
| Pull | Bringing changes that exist in the Git repository back into the ServiceNow instance |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what two things does connecting an application to a Git repository actually require before any code can move in either direction, and what's the difference between what "push" and "pull" each do?
