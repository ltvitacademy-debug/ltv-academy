# Script — Training Run Observability

## Segment 1 (title)

This chapter has covered checkpointing, fault tolerance, mixed precision, and stragglers -- things that go wrong silently or need a human decision in the moment. None of that is possible without visibility into what the run is actually doing. This closing lesson covers what to log and what tools make a multi-week run legible.

## Segment 2 (steps)

At minimum, log the training loss as a rolling average since per-step loss is noisy, the gradient norm since a spike often precedes instability, the current learning rate as a schedule sanity check, and throughput in tokens per second. None of these alone tells the whole story -- loss can look fine while throughput quietly degrades from a straggler, so they get logged together.

## Segment 3 (steps)

There are really two layers here. Training metrics -- loss, gradient norm, model FLOPs utilization -- answer whether the model is learning well, typically tracked through something like Weights and Biases. Cluster-level metrics -- GPU temperature, ECC error counts, network link status, usually collected through NVIDIA's DCGM exporter into Prometheus and Grafana -- answer whether the hardware itself is healthy, and often surface a straggler before it becomes a crash.

## Segment 4 (code)

In practice that looks like initializing a tracking run and logging a dictionary of metrics every step -- loss, gradient norm, learning rate, MFU -- against the step number. That gives a persistent, queryable history: comparing this run against a previous one, correlating a spike with the exact step and hyperparameters active then, without anyone needing shell access to the training machine.

## Segment 5 (outro)

None of this helps if nobody's watching a dashboard at three in the morning -- which is why alerting on loss spikes, gradient norm spikes, or MFU dropping below a floor matters more than the dashboard itself. That closes Chapter 6 on the systems that keep a training run alive. Chapter 7 turns to a different question: proving the model that comes out the other end is actually good.
