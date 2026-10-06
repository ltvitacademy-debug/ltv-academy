# Script — Blue-Green Deployment for AI Apps

## Segment 1 (title)

Blue-green deployment keeps two complete, independent environments running at once — but only one of them is actually live at any moment.

## Segment 2 (code: two environments, one live)

Green, the new version, is fully deployed and verified before it receives a single real request. The cutover itself is just a routing change at the gateway from Lesson 13, not a redeploy — which is what makes it effectively instant, in either direction.

## Segment 3 (code: what it costs, what it buys)

That speed isn't free. You're running both environments at full capacity during the overlap — double the compute. For a small service, that's a rounding error. For GPU-backed inference containers, it's a real, visible cost.

## Segment 4 (steps: the AI-specific wrinkle)

AI apps add a wrinkle a stateless web app doesn't have. Blue and green can behave differently even with identical application code — a different model checkpoint, a different inference library version, or a different GPU driver on the new instance type.

## Segment 5 (code: verifying green)

Which means a plain health check returning 200 isn't enough. Verifying green means running known test prompts through it and comparing the outputs to blue's known-good results — because a green environment that's up but silently serving a different model is a worse failure than an outage.

## Segment 6 (outro)

Blue-green buys zero downtime at the cost of running two full environments. Next up: rolling updates — the cheaper alternative that doesn't need a second full environment at all.
