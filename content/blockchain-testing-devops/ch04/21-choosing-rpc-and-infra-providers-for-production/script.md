# Script — Choosing RPC & Infra Providers for Production

## Segment 1 (title)

Every RPC_URL and ALCHEMY_API_KEY from Lesson 20 points at an actual provider, and which one you pick -- and how you configure it -- is a production decision, not a detail to figure out later.

## Segment 2 (steps: what matters at production load)

A free-tier dev key never shows you the limits that matter in production: compute units per second, a contractual uptime SLA instead of a marketing claim, and how close the provider's edge nodes actually sit to where your users are.

## Segment 3 (steps: full node vs archive node)

A full node holds recent state, which covers most reads and every transaction you send. An archive node holds the entire historical state -- and that's not optional if you're doing the fork testing Chapter 1, Lesson 4 covered, or backfilling an indexer against old events.

## Segment 4 (code: fallback provider)

A production client shouldn't trust a single provider. A fallback configuration tries a primary provider first and automatically falls through to a backup if it's slow, rate-limited, or down -- one provider's outage doesn't have to become the dApp's outage.

## Segment 5 (steps: managed vs self-hosted)

Running your own node trades a monthly bill for an ops job: patching, monitoring, and uptime become your responsibility, 24/7. For most teams, a managed provider is the right default -- self-hosting is a deliberate choice, not a free upgrade.

## Segment 6 (outro)

That closes Chapter 4. The off-chain stack is hosted, configured, and talking to real infrastructure. Chapter 5 asks the next question: how do you actually know when something in that stack -- or in the contracts it talks to -- goes wrong?
