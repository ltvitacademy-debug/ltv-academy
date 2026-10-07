# Script — Capstone: Benchmarking & Tuning

## Segment 1 (title)

The Anchorline deployment from lesson 35 is running, but running isn't the same as meeting the brief. This lesson runs a real benchmarking methodology against it, reads what the numbers say, and tunes the deployment in response — the loop every serving engineer runs before shipping.

## Segment 2 (steps)

Four numbers tell the real story. Throughput is total tokens generated per second across every concurrent request — the system-wide capacity number. Time to first token is how long one request waits before the response starts streaming, the number a human actually feels. Time per output token is the pace once streaming has started. And p50, p99 latency are the median and the tail — a great median with a terrible p99 still produces angry users during every traffic spike, which is why SLOs get written against percentiles, not averages.

## Segment 3 (code)

vLLM ships its own load-testing subcommand for exactly this: `vllm bench serve`, pointed at the running server, with input and output lengths shaped like Anchorline's real traffic, 200 synthetic requests, arriving at a sustained ten requests per second. It reports throughput, TTFT, TPOT, and latency percentiles across the whole run.

## Segment 4 (code)

An illustrative baseline run against lesson 35's exact configuration shows throughput around 1,450 tokens per second, but a TTFT p99 of roughly 1,180 milliseconds — missing Anchorline's 500 millisecond target under load, even though the median looks fine. After raising the batch ceiling and the memory budget, throughput climbs to around 1,890 tokens per second and that p99 drops to roughly 720 milliseconds. These numbers are illustrative, not a claimed real measurement — but the shape of the gap is the real lesson.

## Segment 5 (steps)

That gap between p50 and p99 is the signal: it points at queuing under burst traffic, not a slow model, so the fix is capacity — raising max num seqs and gpu memory utilization — not quantization or a smaller model. The discipline that makes any of this trustworthy is changing one variable at a time, re-running the identical benchmark command, and comparing. Change two things in the same run and you can't say which one caused the improvement.

## Segment 6 (outro)

Benchmarking turned "it's running" into a specific, provable gap, and the tuning loop closed most of it by fixing the actual bottleneck the numbers pointed to. Next up, Lesson 37: writing this up, and closing out the whole destination.
