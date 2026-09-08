# Lesson 51 — Publishing & Environments

**Chapter 10 · Security, DevOps & CI/CD · Lesson 4 of 5**

## What you'll learn

- The full dev → test → production lifecycle, in one diagram
- Why only the dev factory is ever connected to Git
- Global parameters, and how they differ config between environments
- The genuinely important "no cherry-picking" rule

## The whole lifecycle, in one diagram

Everything from Lessons 48-50 fits together into one real pipeline:

![Diagram showing the full CI/CD lifecycle: Git working branches merge via pull requests into the collaboration branch, which publishes to ADF Dev and writes the publish branch; Release Management pulls that as an RM artifact and deploys as RM environments to ADF Test and ADF Prod.](/courses/data-factory/ch10/51-publishing-environments/continuous-integration-image12.png)
*Git handles dev-side collaboration. Release Management handles everything downstream — the same ARM artifact deployed to both test and production, with each environment's own configuration applied.*

Trace the flow: feature branches merge via pull request into the
collaboration branch. Publishing pushes that into **ADF Dev** and
writes ARM templates to the publish branch. A release pipeline pulls
that publish branch as an artifact and deploys it — as an ARM
environment — to **ADF Test**, then, separately, to **ADF Prod**.

## Only dev gets a Git repository

A genuinely important, easy-to-miss rule: **only the development
factory should ever be connected to Git.** Test and production
factories are updated *exclusively* through the release pipeline or a
manually deployed ARM template — never authored directly, never
Git-connected themselves. If you find yourself wanting to edit a
pipeline directly in your production factory, that's a sign something
about the process has gone wrong.

## How the same template becomes different environments

If dev, test, and production all deploy from the *same* ARM
template, how does each one end up pointing at its own storage
account, its own SQL server, its own everything? **Global
parameters** — factory-wide values referenced throughout your
pipelines, overridden per environment at deployment time via ARM
template parameters. Dev's global parameter for a storage account
name resolves differently than production's, with the pipeline logic
itself completely unchanged between environments.

The same mechanism unlocks **feature flags**: combine a global
parameter with an If Condition activity to let a block of pipeline
logic run in dev but stay dormant in production, without maintaining
two separate versions of the pipeline.

## The rule that surprises people: no cherry-picking

Data Factory **doesn't support publishing a subset of your changes.**
Publishing means *everything* currently in the collaboration branch,
every time — because entities genuinely depend on each other
(triggers depend on pipelines, pipelines depend on datasets), and
partial publishing risks leaving the factory in an inconsistent
state. If you need a narrow, urgent fix without dragging along
unrelated in-progress work, that's what a dedicated hotfix process is
for — not selective publishing.

## Other real constraints worth knowing

- **Integration runtime names must match exactly** across dev, test,
  and production — same name, type, and subtype in every environment.
- **Keep separate Key Vaults per environment**, but use the *same
  secret names* in each — that way you only ever parameterize the
  vault name, not every individual secret reference.
- **You can't publish from a private branch** — only from the
  collaboration branch, enforcing the review step from Lesson 50.

## Key terms

| Term | Meaning |
|---|---|
| Global parameter | A factory-wide value, overridden per environment at deployment |
| Feature flag | A global parameter + If Condition combination gating logic per environment |
| Hotfix | A narrow, urgent-fix process used instead of selective publishing |

## Lab

1. Trace the diagram in this lesson out loud, naming every step from
   a developer's feature branch to production.
2. Write one sentence explaining why test and production factories
   should never be connected to Git themselves.
3. Sketch how you'd use a global parameter to make one pipeline
   activity behave differently in dev versus production.

## Check yourself

You're ready for Lesson 52 when you can explain, in one sentence, why
Data Factory doesn't support publishing only some of your changes.
