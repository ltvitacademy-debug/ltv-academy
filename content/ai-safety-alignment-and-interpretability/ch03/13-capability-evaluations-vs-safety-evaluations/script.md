# Script — Capability Evaluations vs. Safety Evaluations

## Segment 1 (title)

Before a lab decides whether a model is safe to deploy, it needs two different measurements: what the model can do, and what it will do. Confusing those is one of the easiest ways an evaluation effort ends up giving a false sense of security.

## Segment 2 (steps)

A capability evaluation asks what's the most dangerous thing this model could be made to do, if someone with real resources tried hard to make it do that — found through aggressive elicitation like fine-tuning, tool scaffolding, or the best known jailbreak techniques. A safety evaluation asks something different: what does this model actually do, under realistic conditions, when ordinary users and adversaries interact with it the way they normally would. One bounds a worst case. The other describes a typical case.

## Segment 3 (steps)

A model can refuse harmful requests under completely normal use and still be hiding a serious capability underneath. A few hundred fine-tuning examples, or a well-built scaffold, can surface uplift toward cyberoffense or bioweapons-relevant synthesis that a safety eval alone would never catch, because a safety eval never applies that kind of pressure. The capability was there all along; only a capability eval was built to go looking for it.

## Segment 4 (steps)

That's why labs tie dangerous-capability results to concrete thresholds. Anthropic's Responsible Scaling Policy and OpenAI's Preparedness Framework both define specific capability levels — meaningful uplift toward a biological weapon, for instance — that, once crossed on a capability eval, trigger mandatory new safeguards regardless of how safely the model behaves by default. The capability measurement gates the deployment decision; the safety measurement describes what happens after that decision is made.

## Segment 5 (outro)

Neither evaluation is sufficient on its own. Capability evals alone tell you nothing about everyday product risk; safety evals alone tell you nothing about what a determined, resourced adversary could extract. Next lesson walks through how a dangerous-capability evaluation actually gets built, threat model to score.
