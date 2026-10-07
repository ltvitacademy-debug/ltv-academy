# Build vs. Buy for ML Infrastructure

Every ML platform team eventually faces the same question for every component it needs: do we build this ourselves, or do we adopt something that already exists? Get this wrong in one direction and you spend years maintaining a bespoke feature store nobody outside your company understands. Get it wrong in the other direction and you're locked into a vendor whose roadmap doesn't match your needs, paying for capacity you don't use. This lesson gives you a framework for making that call deliberately instead of by default.

## What you'll learn

- A decision framework for build vs. buy that goes beyond "is there a product for this"
- Why "differentiation" is usually the deciding factor, not cost
- The real landscape: open-source options (Feast, MLflow, Airflow, Kubeflow) vs. managed platforms (SageMaker, Vertex AI, Databricks) vs. point vendors (Tecton, Weights & Biases)
- The hidden costs on both sides — maintenance burden for "build," lock-in and customization limits for "buy"

## The framework: does this differentiate you?

The single most useful question is: **if we build this well, does it make our models better, or does it just make our team able to say "we built it"?** Most ML infrastructure — feature stores, experiment trackers, pipeline schedulers — is not where a company's competitive advantage lives. The competitive advantage is in the data, the feature definitions, and the modeling choices built *on top of* the infrastructure, not the infrastructure itself.

A rough rule: if the component is something every ML team at every company needs, in roughly the same shape, lean toward buying or adopting open source. If the component encodes something specific to how your business actually works — a proprietary data signal, a domain-specific evaluation metric, a serving pattern unique to your traffic — building it (or heavily customizing an open-source base) is more defensible.

## Three categories of options, not two

"Build vs. buy" undersells the real landscape, which has three tiers:

- **Fully managed platforms** — SageMaker, Vertex AI, Databricks Machine Learning. These bundle feature storage, training, registry, and serving into one vendor-owned platform. Fast to start, but you adopt their opinions about everything, and switching later is expensive.
- **Point solutions / best-of-breed vendors** — Tecton (feature store), Weights & Biases (experiment tracking), Comet, Arize (monitoring). You mix and match, which gives flexibility, but you own the integration glue between them.
- **Open source, self-hosted** — Feast (feature store), MLflow (tracking and registry), Airflow or Kubeflow Pipelines (orchestration). No license fee, full control, but your team owns operating it: upgrades, scaling, security patches, uptime.

"Build" in the truest sense — writing a feature store from scratch — is now rare for mainstream problems. Most teams who think they're "building" are actually customizing or operating an open-source base, which is a meaningfully different cost profile than greenfield development.

## Costs that are easy to miss

- **On the "build it yourself" or "run open source yourself" side:** the maintenance burden doesn't end at launch. Someone has to own upgrades, on-call for the thing when it breaks at 2 a.m., and the institutional knowledge walks out the door when that person leaves.
- **On the "buy a managed platform" side:** migration cost later is real. A managed platform's pricing model, API shapes, and limits on customization can box you in once a few years of pipelines are written against it. Vendor lock-in isn't hypothetical — it shows up as "we'd need six months to leave."
- **On the point-solution side:** every extra vendor is another contract, another security review, another system that can go down independently, and another authentication surface to maintain.

## A practical starting heuristic

For a small or early-stage ML team: start with a managed platform or an open-source default (e.g., Feast + MLflow + Airflow) rather than building anything. You don't yet know your real requirements well enough to justify custom work, and the fastest way to learn them is to run on someone else's opinionated defaults first. Revisit the decision once a specific component is clearly the wrong shape for your actual traffic, team size, or compliance requirements — not before.

## Key terms

| Term | Meaning |
|---|---|
| Differentiation | Whether a component is where your competitive advantage actually lives, vs. commodity infrastructure every team needs |
| Managed platform | A vendor-owned, end-to-end ML platform (e.g., SageMaker, Vertex AI) bundling multiple components |
| Point solution | A best-of-breed vendor tool for one piece of the stack (e.g., a dedicated feature store or experiment tracker) |
| Vendor lock-in | The cost and difficulty of migrating away from a platform once pipelines and processes are built around it |

## Recap

Build vs. buy for ML infrastructure comes down to whether a component differentiates you — most doesn't, which is why open source and managed platforms dominate the landscape. The real options aren't binary; they split into managed platforms, point solutions, and self-hosted open source, each with a different hidden cost. Next up, Lesson 3: the common components every ML platform ends up needing, regardless of which option you pick for each one.
