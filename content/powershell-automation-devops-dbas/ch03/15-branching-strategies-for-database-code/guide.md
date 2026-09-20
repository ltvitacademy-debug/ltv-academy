# Branching Strategies for Database Code

Application teams have argued about branching strategy for years — trunk-based development
versus feature branches, and every variation in between. Database code can use the same
branching models, but it comes with one extra wrinkle app code mostly doesn't have: a
schema is stateful. You can't just "branch" a live database the way you branch a code
repository, because the data has to keep existing and keep working no matter which version
of the schema is currently deployed.

## What you'll learn

- Trunk-based development and feature branches, and how each applies to database code
- The extra wrinkle databases have that application code doesn't: schema state
- Why migration sequencing, not just the branch model, is the real constraint for databases

## Trunk-based development

**Trunk-based development** means everyone works off a single shared branch (often called
`main` or `trunk`), merging small changes into it frequently, rather than working for a
long stretch on a separate branch. For database code, this looks like: a developer makes a
small, focused change to one object's script, opens a short-lived pull request, gets it
reviewed, and merges within a day or two. The advantage for databases specifically is that
small, frequent changes are far easier to sequence correctly against a live schema than
large, infrequent ones — a point that matters more here than for typical application code.

## Feature branches

A **feature branch** is a longer-lived branch where a larger body of work happens before
merging back to trunk — useful when a change is genuinely large, like a schema redesign
that touches a dozen related objects. The risk with database code specifically is that the
longer a feature branch lives, the further its version of the schema drifts from what's
actually running in test or production, and reconciling that drift (Lesson 13) gets harder
the longer the branch survives. Feature branches for database work should stay
intentionally short — days, not weeks — for exactly that reason.

## The wrinkle databases have that code doesn't

Application code branches cleanly because each branch's code just runs; nothing about
`main` having a function and `feature/x` having a different version of that function
creates a problem, because whichever version is deployed simply replaces the other. A
database schema doesn't work that way. If `feature/add-order-status-column` adds a new
column, and someone deploys that branch's migration to a test environment, that column now
exists in the actual data — and if the branch gets abandoned or significantly changed
before merging, someone has to explicitly handle removing or reconciling that column,
because the *data* doesn't get thrown away just because the branch did.

```text
main:              [Orders v1] ---- merge ----> [Orders v2: + Status column]
feature/add-status: -- migration applied to test db, column now exists in real data --
```

This is the practical reason migrations (Lesson 19) are always additive and sequential
rather than something you can casually rewrite: once a migration has run against a real
environment, real data now depends on its effects, and you can't simply discard that branch
the way you'd discard unmerged code.

## Sequencing is the real constraint

Whichever branching model a team picks, the thing that actually matters for database code
is **migration sequencing** — making sure migrations apply in a consistent, predictable
order across every environment, so that a schema change from one branch doesn't
land out of order relative to a schema change from another. Lesson 19 covers the numbered,
sequential migration pattern that makes this tractable regardless of which branching
strategy sits on top of it.

## Key terms

| Term | Meaning |
|---|---|
| Trunk-based development | Frequent small merges into a single shared branch, rather than long-lived separate branches |
| Feature branch | A longer-lived branch for a larger body of work, merged back to trunk when complete |
| Schema state | The fact that a live database's actual structure and data persist independently of any Git branch |
| Migration sequencing | Ensuring schema changes apply in a consistent, predictable order across environments |

## Check yourself

A `feature/redesign-orders` branch adds a new column to the `Orders` table and gets
deployed to a test environment for two weeks of QA. Why can't that branch simply be deleted
and forgotten if the team decides to redesign the approach differently — what actually has
to happen to the test environment first?
