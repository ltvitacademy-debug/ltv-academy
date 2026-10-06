# Script — Capstone: Adding Autoscaling

## Segment 1 (title)

FeedbackScope's model is small enough to run on CPU, so this capstone scales on concurrent requests per instance instead — a more direct measure of whether an instance is keeping up than CPU percentage, and a signal that generalizes cleanly to a future, bigger model.

## Segment 2 (code: the signal)

Below ten concurrent requests per instance across the fleet, the service stays put. Sustained above ten, it adds an instance — a target measured from a real load test, not guessed out of thin air.

## Segment 3 (code: the policy)

Min instances stays at one, because this app's cold start is genuinely short on CPU. Max stays at five, a hard ceiling because this is a portfolio project with a real, small cloud bill attached to it. Neither number is a framework default left untouched.

## Segment 4 (code: the health check)

The health check loads a tiny test sentence through the model and only returns 200 if the model actually returns a result — not just that the process is running. That catches a broken model load the platform would otherwise miss entirely.

## Segment 5 (steps: skipping caching)

FeedbackScope skips semantic caching on purpose. Its inputs are short and highly varied customer feedback, with a low repeat rate — unlike a FAQ bot's handful of reworded questions, where semantic caching actually earns its keep.

## Segment 6 (outro)

FeedbackScope is now containerized, deployed, and genuinely autoscaled, with every decision justified rather than defaulted. Next up, the last lesson in this course: wrapping up and presenting it.
