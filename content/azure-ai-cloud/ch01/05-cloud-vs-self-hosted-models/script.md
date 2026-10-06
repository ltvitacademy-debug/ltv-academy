We've spent this whole chapter building the case for cloud AI platforms. Let's be fair and look at when self-hosting actually wins instead.

There are four legitimate reasons to self-host. Data residency rules that mean your data legally can't leave your own infrastructure. Fully offline or edge environments with no network path to a cloud endpoint. Deep customization — changing a model's internals, not just prompting or fine-tuning it. And extreme, sustained scale, where usage is high and steady enough that owned GPUs genuinely beat per-token billing.

What self-hosting costs rarely shows up on the GPU invoice. You need an MLOps team to patch, scale, and monitor the serving stack indefinitely. The hardware itself depreciates whether you use it or not. And you own uptime — there's no managed SLA, so an outage at two in the morning is entirely your problem to fix.

As a working checklist: if you're legally required to stay on-prem, fully offline, need to change the model's architecture, or your sustained usage genuinely beats token pricing, self-host. Otherwise, the cloud AI platform is the correct default.

That closes out the concepts chapter. Chapter two moves from theory into practice — the SDK, real endpoints, and the services you'll actually build against.
