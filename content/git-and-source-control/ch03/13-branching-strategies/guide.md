# Lesson 13 — Branching Strategies

**Chapter 3 · Salesforce Workflows · Lesson 13 of 17**

## What you'll learn

- What a branching strategy is and why a team needs to agree on one explicitly
- The core ideas behind Git Flow and environment-branching, the two most common shapes for Salesforce release trains
- How branches typically map to specific sandboxes/orgs in a Salesforce release pipeline
- Why "which strategy is best" is the wrong question to start with

## Why a team needs an explicit strategy

Lesson 4 showed that branches are cheap and easy to create. That's exactly the problem a **branching strategy** solves: without an agreed convention, every developer invents their own branch names and merge habits, and nobody can look at the repository and reliably answer "what's actually in our UAT sandbox right now?" or "which branch should this hotfix go on?" A branching strategy is a team-wide agreement about what branches exist, what each one represents, and the rules for moving code between them — chosen deliberately, not improvised project by project.

## Git Flow (and why Salesforce teams adapted it)

**Git Flow** is a long-standing branching model built around a small set of permanent and temporary branch types:

- `main` — represents what's in production right now
- `develop` — the integration branch where finished features accumulate before a release
- `feature/*` — short-lived branches for individual pieces of work, branched from and merged back into `develop`
- `release/*` — cut from `develop` when a set of features is ready, used for final stabilization before going to `main`
- `hotfix/*` — branched directly from `main` for urgent production fixes that can't wait for the next normal release

```
main -------------------------M----------------H---
                              /                /
develop --F1---F2---F3------/                /
          \                                  /
feature/a  \--- (merged) ------------------release/1.4----
```

Git Flow maps naturally onto a Salesforce release pipeline because a release train (periodic batches of changes promoted through a fixed sequence of orgs) is exactly what `develop` → `release/*` → `main` was designed to model.

## Environment branching: mapping branches to orgs

A pattern many Salesforce teams layer on top of (or instead of) Git Flow is **environment branching**: each long-lived branch corresponds directly, one-to-one, to a specific org in the pipeline.

| Branch | Org it represents |
|---|---|
| `main` | Production |
| `uat` | UAT sandbox |
| `qa` | QA/testing sandbox |
| `develop` | Integration/dev sandbox |

Under this model, promoting a change to the next environment is literally merging the branch representing the current org into the branch representing the next one, and a deployment pipeline automatically deploys whatever lands on each branch to its matching org. The appeal is directness: looking at the `uat` branch tells you exactly what's deployed to the UAT sandbox, no interpretation required. The trade-off is that it requires strict discipline about always merging forward through the chain (never skipping an environment) and never committing directly to a branch that represents an org downstream of where the work was actually tested.

## "Best" depends on your release cadence

It's tempting to ask which strategy is objectively correct. It isn't a fair question — the right choice depends heavily on how often the team actually ships: a team doing continuous, frequent small releases benefits from a simpler model (closer to trunk-based development, covered fully in the next lesson), where long-lived `develop`/`release` branches mostly add overhead. A team doing scheduled, batched release trains with several environments and a change-advisory process in between benefits more from Git Flow or environment branching's extra structure, because that structure maps directly to the approval gates the organization already requires. Picking a strategy means picking it for *your* team's actual release process, not copying whatever a blog post or a different company used.

## Key terms

| Term | Meaning |
|---|---|
| Branching strategy | A team-wide agreement on what branches exist and the rules for moving code between them |
| Git Flow | A branching model with main, develop, feature/*, release/*, and hotfix/* branches |
| Release train | A periodic, scheduled batch of changes promoted through a fixed sequence of environments |
| Environment branching | Mapping each long-lived branch one-to-one to a specific org/sandbox |

## Lab

A Salesforce team has four environments: Dev, QA, UAT, and Production, promoted in that order on a monthly release train, with occasional emergency hotfixes to Production. Design a branching strategy for this team: decide whether to use Git Flow, environment branching, or a combination, name every branch you'd create, and describe exactly how a single feature and a single emergency hotfix would each move through your branches from start to finish.

## Check yourself

Can you name the five branch types in Git Flow and what each one represents? Can you explain, in your own words, why "which branching strategy is best" is the wrong question, and what question should replace it?
