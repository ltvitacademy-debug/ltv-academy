# How Platform Needs Change With Scale

The components from Lesson 3 don't all need to exist on day one, and building them too early is its own mistake — it's effort spent on tooling before anyone knows what the tooling needs to do. This lesson walks through the stages a company's ML platform needs typically pass through as the number of models and teams grows, so you can recognize which stage an organization is in and what it actually needs next.

## What you'll learn

- Four recognizable stages of ML platform maturity, from a single notebook to a self-serve platform
- The signal that tells you a company has outgrown its current stage
- Why premature platform investment is a real failure mode, not just a theoretical one
- How to size platform work to the actual number of models and teams, not to an aspirational future state

## Stage 1: one model, one notebook

A single data scientist (or a small team) owns one or two models end to end. Training happens in a notebook, features are computed with ad hoc pandas code, and deployment might be a Flask app one person manually restarts. There is no "platform" and there shouldn't be one yet — any tooling investment here is premature, because the team doesn't yet know which parts of the workflow will actually repeat.

## Stage 2: a few models, manual process repeated by hand

More models exist, often owned by the same team or a couple of adjacent ones. The same steps — pull data, engineer features, train, evaluate, deploy — get repeated for each model, usually copy-pasted and tweaked rather than shared. This is where the first real pain shows up: someone notices that fixing a bug in the feature logic means fixing it in four different copy-pasted notebooks, and inconsistently.

## Stage 3: dozens of models, dedicated tooling investment pays off

Once a company has roughly a dozen or more models, maintained by multiple teams, the copy-paste approach actively slows everyone down and starts causing production incidents (inconsistent feature logic between training and serving is a classic one — the subject of Lesson 8). This is the stage where investing in shared tooling — a real feature store, an experiment tracker, a pipeline framework — starts to pay for itself, because the same fix now applies everywhere at once instead of n times.

## Stage 4: hundreds of models, a self-serve platform team

At large scale, no central team can hand-hold every model through deployment; the platform team's job shifts from "help each team ship" to "build the self-service system so teams ship without help." This is where the full component list from Lesson 3 — feature store, tracker, registry, pipelines, deployment infra, monitoring — exists as a maintained, owned product with its own roadmap and often its own on-call rotation, and where concepts like SLAs and SLOs for the platform itself (Chapter 7) become necessary.

## The signal that tells you it's time to move

The pattern that signals readiness to invest in the next stage isn't a headcount number — it's **repeated, costly manual work that a tool would eliminate**, observed more than once. If nobody has yet hit the same painful manual step twice, premature tooling is a bet on a future that may not materialize in the shape you guessed. If multiple teams have independently hit the same wall, that's a strong signal the investment will pay off immediately rather than speculatively.

## Why building early is a real mistake

It's tempting to assume more tooling is always better, but a platform built before anyone needs it has a specific failure mode: it gets built around guesses about what future models will need, and those guesses are usually wrong once real usage shows up. The team then maintains a system nobody asked for, while still doing manual work for the actual pain points that showed up later and weren't anticipated. Sizing platform investment to the stage you're actually in — not the stage you expect to be in eventually — is the harder discipline, but the one that avoids wasted build-outs.

## Key terms

| Term | Meaning |
|---|---|
| Platform maturity stage | A recognizable phase (notebook, manual repetition, dedicated tooling, self-serve platform) describing how a company's ML workflows are organized relative to its number of models |
| Premature platform investment | Building shared tooling before repeated, costly manual pain has actually been observed, based on guessed future needs |
| Self-serve platform | A platform mature enough that teams ship models without a platform engineer directly helping each time |

## Recap

ML platform needs move through recognizable stages — one notebook, manual repetition, dedicated tooling once pain repeats across teams, and a self-serve platform at real scale — and the signal to invest is repeated, observed pain, not a headcount target. This closes Chapter 1. Chapter 2 starts the deep dive into the first component: feature stores, beginning with what problem they actually solve.
