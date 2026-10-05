# Lesson 13 — Model Inventory and Registry

**Chapter 3 · Model Governance · Lesson 13 of 30**

## What you'll learn

- Why "how many models do we actually have running?" is a question most organizations can't answer
- The difference between a model **inventory** (the list) and a model **registry** (the system that enforces it)
- What a registry entry needs to capture beyond just a file and a name
- What a real registry entry looks like, using Databricks' Unity Catalog model registry as a concrete example

## The question most organizations can't answer

Ask a data science leader "how many models are currently making decisions in production?" and the honest answer, at most organizations, is "we're not completely sure." Models get trained in notebooks, saved to a shared drive, wrapped in a script, and quietly put behind an API by whoever needed it fastest. A year later nobody remembers it exists until it breaks, or until an auditor asks for a list and the list turns out to be incomplete.

This is the same "shadow IT" problem data governance already solved for spreadsheets and databases, now showing up for models. The fix is the same shape too: a single, authoritative place every model has to be registered before it's trusted in production.

## Inventory vs. registry — two different things

These terms get used interchangeably, but they describe two different layers:

- A **model inventory** is the *list* — every model that exists, who owns it, what it's for, what risk tier it sits in. It can start as a spreadsheet, though it shouldn't stay one.
- A **model registry** is the *system* that enforces the inventory: a tool that models actually get registered into, versioned in, and served from — so the inventory isn't a document someone has to remember to update, it's a byproduct of the normal workflow.

Most mature ML platforms — MLflow's Model Registry, Azure ML's model registry, SageMaker Model Registry, Vertex AI Model Registry — fill this role. What matters for governance isn't which specific tool a team uses; it's that registering a model is the only supported path to production, so the inventory can't drift out of date.

## What a registry entry actually needs

A bare file path and a version number aren't enough. A governance-ready registry entry captures:

- **Owner** — the team or person accountable for this model
- **Risk tier** — how much scrutiny this model's decisions require (Lesson 24 covers risk tiering in depth)
- **Version history** — every version that's existed, not just the current one
- **Status/alias** — which version is actually serving production traffic right now
- **Link to the model card** — so documentation isn't a separate, easily-lost artifact

## A real registry entry, in practice

Databricks' Unity Catalog model registry is a useful concrete example of this pattern, because it registers a model under the same three-level `catalog.schema.model` namespace as a table — so a model inherits the same owner, the same access grants, and the same audit trail as any other governed asset, instead of living in a separate, ungoverned silo.

![The "Register model" dialog in Databricks, with "Unity Catalog" selected over "Workspace Model Registry," and a search box showing a match for "iris_model" at path "prod.ml_team.iris_model".](/courses/ai-and-machine-learning-governance/ch03/13-model-inventory-and-registry/uc-register-model-dialog.png)
*Registering a model targets a governed catalog-and-schema path — the same act of "putting it in the system of record" that any registry requires, whatever tool implements it.*

Once registered, the model gets its own page with real version history, rather than living only in whoever trained it's memory:

![Catalog Explorer's "iris_classifier" model page: breadcrumb Catalog Explorer > docs > default, Overview tab active, a Versions table listing Version 3, 2, and 1 each marked active, and an "About this model" panel.](/courses/ai-and-machine-learning-governance/ch03/13-model-inventory-and-registry/registered-model.png)
*A registered model's page — version history, owner, and permissions sit alongside the model itself, which is exactly what turns a one-off file into an inventory record.*

## Key terms

| Term | Meaning |
|---|---|
| Model inventory | The authoritative list of every model an organization runs, with owner and risk tier |
| Model registry | The system that enforces the inventory by making registration the only path to production |
| Shadow model | A model running in production that was never registered — the AI equivalent of shadow IT |
| Registry entry | A model's record in the registry: owner, version history, status, and linked documentation |

## Lab

List every model you know of that exists at your organization (or, if you're between roles, every model you've personally built or used). For each, note: do you know who owns it? Do you know what version is currently live? If the answer to either is "no," that's a registry gap — the exact gap this lesson is about.

## Check yourself

Can you explain the difference between a model inventory and a model registry, and name the four things a governance-ready registry entry needs to capture beyond a file path and version number?
