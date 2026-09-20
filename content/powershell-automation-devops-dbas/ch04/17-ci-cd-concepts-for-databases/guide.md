# CI/CD Concepts for Databases

Chapter Three built the foundation: database objects living in Git, organized one file per
object, reviewed through pull requests. Chapter Four is about what happens next —
automating what a human would otherwise have to do by hand every time a reviewed change is
ready to go out. That's CI/CD, and it applies to schemas just as concretely as it applies to
application code.

## What you'll learn

- What Continuous Integration (CI) means for a database specifically
- What Continuous Deployment/Delivery (CD) means for a database specifically
- How CI and CD chain together into a single pipeline, and where a human still belongs in it

## Continuous Integration: validating every change automatically

**Continuous Integration** means that every time a change is proposed — every commit pushed
to a pull request — an automated process validates it, without a human having to
remember to run anything by hand. For a database project, that validation step is concrete
and specific: **build the `.sqlproj`** (Lesson 13), which parses every object script in the
project and fails if anything is inconsistent — a view referencing a column that no longer
exists, a foreign key pointing at a table that isn't defined anywhere in the project. CI
doesn't deploy anything anywhere. It answers one question, automatically, on every single
change: is this schema internally valid?

```yaml
# Conceptual CI step
- name: Build database project
  run: msbuild MyDatabase.sqlproj /p:Configuration=Release
  # Fails the pipeline (and blocks the PR) if the schema doesn't build cleanly
```

## Continuous Deployment/Delivery: automating the rollout

**Continuous Deployment** (or the more cautious **Continuous Delivery**, where a human
still clicks "go") means that once a change has been validated and merged, actually applying
it to a target environment happens automatically too, rather than a DBA manually running a
script against a server. For databases, that's the deployment step Lesson 18 covers in
depth — generating and applying the DACPAC or migration scripts needed to bring a target
database in line with what's now in source control. The distinction between "deployment"
and "delivery" matters more for databases than it might for a stateless web app: teams very
often choose delivery (automated *up to* production, then a deliberate human trigger) for
the production step specifically, given how much harder a bad database change is to fully
undo compared to a bad app deployment.

## How they chain together

A realistic pipeline for database code looks like this, end to end: a commit is pushed →
CI builds and validates the `.sqlproj` → if that passes, the change deploys automatically to
a test/staging environment → automated tests run against that environment (Lesson 20) → if
those pass, the change deploys to production, either fully automatically (continuous
deployment) or with a manual approval gate (continuous delivery). Lesson 22 walks through
exactly this sequence as one concrete, realistic pipeline.

## Where CI/CD sits relative to what Chapter Three built

None of this replaces source control, database projects, or code review — it automates what
happens *after* a change is reviewed and merged. The review gate from Lesson 16 is still
the human checkpoint; CI/CD is what removes the manual, error-prone, easy-to-forget steps
that used to happen between "this was approved" and "this is actually running where it
needs to run."

## Key terms

| Term | Meaning |
|---|---|
| Continuous Integration (CI) | Automatically validating every proposed change — for databases, building the `.sqlproj` on every commit |
| Continuous Deployment (CD) | Automatically applying a validated change to a target environment, with no manual trigger |
| Continuous Delivery | Like continuous deployment, but with a deliberate human approval step before production specifically |
| Pipeline | The end-to-end automated sequence from commit through validation to deployment |

## Check yourself

Why do many teams choose continuous *delivery* rather than full continuous *deployment* for
the production step of a database pipeline specifically, even when they're comfortable with
full automation for a stateless web application?
