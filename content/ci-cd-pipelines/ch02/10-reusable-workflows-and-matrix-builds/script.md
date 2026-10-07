## Segment 1 (title)

storefront now needs to run its test suite against three supported Node.js versions, and the same lint-then-test pattern keeps getting copy-pasted into every other repository on the team. This lesson covers the two features built for exactly those problems — matrix builds and reusable workflows.

## Segment 2 (code: matrix)

Instead of writing three near-identical jobs by hand, storefront defines one and lets GitHub multiply it automatically. Strategy matrix lists three Node versions, and GitHub runs the job three times in parallel, substituting matrix dot node-version each time. By default, if one combination fails, GitHub cancels the rest — fail-fast — unless that behavior is explicitly turned off.

## Segment 3 (screenshot: workflow graph)

A run's visualization graph shows a matrix as exactly what it is — one logical job, fanned out into several. Here it reads three of three jobs completed: three Node versions, one single job definition, run side by side instead of one after another, saving real wall-clock time.

## Segment 4 (code: workflow_call)

A workflow becomes callable by another workflow the moment it declares workflow_call as a trigger. This one accepts a node-version input with a sensible default, and requires an NPM_TOKEN secret be passed in from whoever calls it — the same shape as a function signature, just written out in YAML.

## Segment 5 (code: calling it)

Any other workflow calls it with uses instead of a normal job body, passing with for inputs and secrets for, well, secrets. Northbridge Retail keeps lint-and-test.yml in exactly one place and calls it from storefront, its admin dashboard, and its internal CLI tool — three workflows, one real definition to maintain.

## Segment 6 (outro)

That wraps up Chapter 2 — triggers, jobs, secrets, caching, and now workflows that scale across an entire engineering team instead of just one single repository. Northbridge Retail's storefront CI is genuinely production-ready from here.
