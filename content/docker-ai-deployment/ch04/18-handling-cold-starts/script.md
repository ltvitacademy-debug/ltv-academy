# Script — Handling Cold Starts

## Segment 1 (title)

A cold start is the delay between a new instance being asked to start and that instance actually being ready to serve a request — paid by whichever request triggered the scale-out.

## Segment 2 (steps: what actually happens)

Pull the image, start the container, and then the big one: load the model weights into memory, or GPU memory. A typical stateless web service skips most of that step entirely — there's no multi-gigabyte model to load, so its cold start is close to "start the container, done."

## Segment 3 (code: why it's worse for AI)

A web service's cold start is roughly one to five seconds. An AI service's is thirty seconds to two-plus minutes, dominated by that multi-gigabyte image pull and model load into GPU memory. A user who triggers that isn't waiting a second or two — they're waiting long enough to plausibly give up and leave.

## Segment 4 (code: three mitigations)

Three mitigations exist, and each makes a real trade-off. A min-instances floor above zero means paying for idle capacity around the clock. Pre-warming or provisioned concurrency still costs idle capacity, plus added complexity. Smaller or quantized model weights trade real model quality, not just an infrastructure knob.

## Segment 5 (outro)

None of these make cold starts disappear — they trade money, complexity, or quality for a shorter or less frequent delay. Next up: avoiding the expensive work entirely when you can — caching strategies for AI apps.
