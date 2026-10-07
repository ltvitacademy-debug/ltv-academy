# Script — Build vs. Buy for ML Infrastructure

## Segment 1 (title)

Every ML platform team eventually faces the same question for every component it needs: build it, or adopt something that already exists. Get it wrong one way and you're maintaining a bespoke system for years. Get it wrong the other way and you're locked into a vendor that doesn't fit. This lesson gives you a framework for making that call on purpose.

## Segment 2 (steps)

The single most useful question is whether a component differentiates you. If building it well just makes your models better in the same way it would for any company, it's commodity infrastructure — feature stores, experiment trackers, pipeline schedulers mostly fall here. Your competitive advantage usually lives in the data and the modeling choices built on top, not the plumbing underneath. So the default should be to buy or adopt open source, and only build when the component encodes something genuinely specific to how your business works.

## Segment 3 (steps)

Build versus buy undersells the real landscape, which has three tiers. Fully managed platforms like SageMaker, Vertex AI, and Databricks bundle everything into one vendor-owned system — fast to start, but you adopt their opinions about everything. Point solutions like Tecton for feature stores or Weights and Biases for tracking let you mix and match best-of-breed tools, but you own the integration glue. And open source, self-hosted options like Feast, MLflow, and Airflow mean no license fee and full control, but your team owns operating every bit of it.

## Segment 4 (steps)

Each side hides a cost people underestimate. Build or self-host and the maintenance burden doesn't end at launch — someone owns upgrades and two a.m. on-call, and that knowledge walks out the door when they leave. Buy a managed platform and migration cost later is real; a few years of pipelines built against one vendor's API can box you in. And every point solution you add is another contract, another security review, and another thing that can fail on its own.

## Segment 5 (outro)

Start small teams on a managed platform or an open-source default, and only customize once a specific component is clearly the wrong shape for your traffic or team. Up next, lesson three: the components every ML platform ends up needing, no matter which option you pick for each one.
