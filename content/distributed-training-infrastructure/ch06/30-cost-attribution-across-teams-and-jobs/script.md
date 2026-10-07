# Script — Cost Attribution Across Teams & Jobs

## Segment 1 (title)

Lesson 29 used the training-lm and training-mm namespace split to break GPU utilization down per team. This lesson uses the exact same split to answer a harder question: who actually spent what, on a five hundred twelve GPU cluster that costs real money whether or not those GPUs are doing useful work?

## Segment 2 (steps)

On a single-tenant setup, the bill and the team are the same thing. Here, sixty-four nodes serve two teams at once, and the split between them shifts hour to hour as jobs start, finish, and queue. There's no invoice line item for "multimodal team, this week." That number has to be reconstructed from what each team's pods actually consumed — which is exactly what Kubecost does, using namespace as the natural grouping.

## Segment 3 (code)

Because training-lm and training-mm are separate namespaces, Kubecost's default namespace-based view already answers what each team spent, as long as every PyTorchJob's pods carry accurate resource requests. GPUs are by far the most expensive resource here, so Kubecost attributes a node's GPU cost to whichever pods actually requested GPU resources on it, proportional to how many GPUs each pod asked for.

## Segment 4 (steps)

Not every cost maps cleanly to one team. The Kubernetes control plane, the shared monitoring stack, idle nodes waiting to be scheduled — those are real costs neither team requested directly. Kubecost handles this as shared cost, typically split proportional to each namespace's share of total resource consumption, so a team running twice as many jobs absorbs twice the overhead instead of splitting it evenly regardless of use.

## Segment 5 (outro)

Because the two teams share one physical cluster, cost has to be reconstructed from resource requests and usage, with GPU cost attributed by request and shared overhead split proportionally. Next, Lesson 31: observability one level up from raw metrics, watching the training jobs themselves.
