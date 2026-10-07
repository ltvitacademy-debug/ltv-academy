# Script — Monitoring a Pretraining Run

## Segment 1 (title)

Spotting a spike, judging the schedule — both depend on actually watching the right signals while a run that can last weeks and cost millions is in progress. Nobody's staring at raw terminal output the whole time. Here's what a real training dashboard shows.

## Segment 2 (steps)

Four signals get logged every step. Training loss is the primary, noisy curve that should trend down. Gradient norm is often the earliest warning — a spike there can precede a visible loss spike. Learning rate gets logged so you can correlate stalls against the schedule. And evaluation loss, computed on held-out data, catches overfitting or leakage that training loss alone would miss.

## Segment 3 (code)

In practice, a tool like Weights and Biases turns this stream of logged scalars — loss, gradient norm, learning rate, tokens per second — into a live, shareable dashboard. The person on call is watching that dashboard, and the habit worth building is checking gradient norm and loss together, since a spike in both is a far stronger signal than either alone.

## Segment 4 (steps)

Throughput matters just as much as correctness. Tokens per second tells you if you're on schedule. Model FLOPs utilization, or MFU, tells you what fraction of the GPU's theoretical peak you're actually using — typically thirty to fifty-five percent on a well-tuned run. If MFU drops while loss behaves normally, that's almost always an infrastructure problem, not a model problem.

## Segment 5 (outro)

Loss trending down, gradient norm in a stable band, MFU flat, eval loss tracking training loss — that's healthy. Recognizing when it isn't is exactly what lets you decide, next lesson, when a restart is actually warranted.
