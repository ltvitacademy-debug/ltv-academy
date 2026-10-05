# Lesson 14 — AI Lineage

**Chapter 3 · Model Governance · Lesson 14 of 30**

## What you'll learn

- What "lineage" means for an AI system, and why it's longer than lineage for a table
- The full chain a model's lineage needs to cover: raw data → features → training run → model version → decisions
- What a real lineage view looks like, using Databricks' Unity Catalog as a concrete example
- Why lineage is the tool that turns "something went wrong" into "here's exactly what was affected"

## Lineage, but longer

Chapter 4 of Data Governance Foundations already covers data lineage: the ability to trace a piece of data from its source, through every transformation, to wherever it ends up. AI lineage is the same idea, extended one layer further. A model isn't just a consumer of data — it's a new artifact that then produces its own downstream outputs (predictions, recommendations, generated text) that often feed other systems.

That means AI lineage has to answer a longer chain of questions than table lineage does:

- **Where did the training data come from**, and what transformations did it go through before the model ever saw it?
- **Which features were engineered from that data**, and by what logic?
- **Which training run produced this specific model version**, with what code and what hyperparameters?
- **Which downstream systems and decisions consumed this model's output**, and when?

Miss any link in that chain and you're left with a model you can't fully explain — which is a governance problem the moment someone asks "why did this model deny this applicant?" or "which customers were affected by the bug in last week's model version?"

## Why this chain matters in practice

Lineage isn't a nice-to-have diagram for an architecture review. It's what makes three real governance tasks possible at all:

- **Impact analysis** — if a source table turns out to have bad data, lineage tells you instantly which models were trained on it, without manually interviewing every team.
- **Incident response** — if a model made a bad decision, lineage tells you which training run, which data, and which code produced the version responsible (Lesson 22 covers this directly).
- **Regulatory response** — "show us how this system reached this decision" is a real request under several AI regulations (Lesson 26 covers this), and lineage is the mechanism that actually answers it, rather than a reconstruction from memory.

## A real lineage view, in practice

Unity Catalog extends the same lineage graph it already tracks for tables to cover registered models — once a training run logs which dataset it trained on, that connection shows up automatically on the model's own Lineage tab.

![A model version's Lineage tab in Catalog Explorer, filtered to "Tables," listing one upstream table "docs.default.iris" with its last-activity timestamp and lineage direction "Upstream."](/courses/ai-and-machine-learning-governance/ch03/14-ai-lineage/model-page-lineage-tab.png)
*A model's own lineage view — one click answers "what data trained this specific model version," instead of a search through old notebooks.*

Notice what this view is, structurally: it's the exact same lineage mechanism a governed data catalog already uses for tables, pointed at a model as just another kind of governed asset. That's the pattern worth remembering more than any one vendor's UI — lineage for AI isn't a separate discipline from data lineage, it's data lineage extended one hop further, into the model and back out to its decisions.

## Key terms

| Term | Meaning |
|---|---|
| AI lineage | The traceable chain from raw data through features, training, a specific model version, and its downstream decisions |
| Impact analysis | Using lineage to determine, after a data problem is found, which models and decisions it affected |
| Upstream | In a lineage graph, the data or assets that fed into something — e.g., the table a model was trained on |
| Training run | The specific execution (code, data, hyperparameters) that produced one particular model version |

## Lab

Pick a model you're familiar with (built, used, or hypothetical) and sketch its lineage chain as a simple list: source data → features → training run → model version → downstream consumer. If you can't fill in one of those links from memory, that's a real lineage gap — note which one.

## Check yourself

Can you list the four links in an AI lineage chain, and explain how lineage turns an incident-response question like "which decisions were affected by the bug in last week's model" from a multi-day investigation into something you can answer directly?
