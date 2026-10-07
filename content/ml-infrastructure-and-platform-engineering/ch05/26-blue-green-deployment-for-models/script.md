# Script — Blue-Green Deployment for Models

## Segment 1 (title)

Canary deployments shift traffic gradually and tolerate the old and new model running side by side for a while. Blue-green takes the opposite approach: build the entire new environment in full, validate it completely while it's receiving zero real traffic, and then cut over all at once.

## Segment 2 (steps)

Two complete environments exist at once. Blue is the current production environment, actively serving all live traffic. Green is a full copy running the new version, fully deployed and ready, but receiving no real user traffic yet. Once green is verified, cutover happens by changing where traffic is routed, not by changing what's deployed.

## Segment 3 (code)

If blue and green are two separate deployments behind one Kubernetes service, cutover is a one-line patch to which deployment the service's selector points at. The instant that patch applies, every new connection routes to green, and blue keeps running untouched.

## Segment 4 (code)

The same idea works through Istio, by flipping a traffic weight from 100 zero to zero 100 in one update instead of ramping it gradually. It's the exact same resource type used for a canary split, the difference is entirely in how it's used.

## Segment 5 (steps)

And blue stays running after cutover on purpose. If green shows a problem five minutes in, rollback is just re-flipping the selector or the weight back to blue, which is still warm and ready, nothing has to be rebuilt. Keep blue up for a soak period before decommissioning it. The real tradeoff against canary is cost, two full production environments have to run at once during that overlap.

## Segment 6 (outro)

Blue-green trades canary's gradual exposure for one reversible switch, at the cost of running two full environments simultaneously. That closes out chapter five's deployment strategies. Next, chapter six, lesson twenty-seven: the tools that make a dataset itself trackable the way git tracks code.
