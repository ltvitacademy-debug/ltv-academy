# Script — Choosing a Cloud AI Platform

## Segment 1 (title)

Three clouds, three AI platforms, the same job — this lesson is about actually deciding between them, now that Azure AI Foundry, Bedrock, and Vertex AI have all been covered on their own terms.

## Segment 2 (steps: four questions)

Four questions actually decide it. Where does the data already live — the model should move to the data, not the other way around, because moving terabytes across clouds is slow and often expensive. Who's already there — an existing AWS or GCP account, with its identity and networking already set up, outweighs a marginally better model on paper. Which models does each platform actually offer, since some models launch exclusively, or first, on one specific cloud. And what does the team already know, since three clouds' worth of IAM quirks and CLI tools isn't free to learn on a deadline.

## Segment 3 (code: same job, different names)

Strip away the branding and all three are solving the same problem with different names — a model catalog, and a managed service underneath it that actually deploys and calls whatever you pick from that catalog.

## Segment 4 (code: the honest default)

The honest default, most of the time: use whichever cloud your organization already runs production workloads on, and only reach for a different one when it genuinely can't do the job — not because its logo is more exciting or a conference talk made it sound better.

## Segment 5 (outro)

Default to where you already are, switch only with a real reason. Next up: what happens when that default ever has to change, and what actually breaks when it does.
