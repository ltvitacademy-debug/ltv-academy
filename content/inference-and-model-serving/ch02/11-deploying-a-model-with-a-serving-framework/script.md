# Script — Deploying a Model With a Serving Framework

## Segment 1 (title)

Chapter two has been building toward this: an actual, start-to-finish deployment. This lesson walks through standing up a real model behind vLLM's OpenAI-compatible server, from an available GPU to a verified, working endpoint.

## Segment 2 (code)

Before launching anything, confirm the basics: check that the GPU is visible and has enough free memory for the model, and that the Python and CUDA environment vLLM expects is actually present. An eight-billion-parameter model in FP16 needs roughly sixteen gigabytes of GPU memory just for its weights, so this step catches the most common early failure before it becomes a confusing crash later.

## Segment 3 (code)

Then install vLLM and launch it with the same command from lesson seven — the point of this lesson is everything that happens around that command, not the command itself.

## Segment 4 (steps)

Watch the startup logs. The lines worth trusting are the ones confirming the model's weights loaded, how much KV cache space was allocated, and — directly useful — vLLM's own estimate of maximum concurrency at your configured context length. Sanity-check that number against your expected traffic before calling the deployment done.

## Segment 5 (steps)

Send one real request to confirm every stage of the pipeline works end to end. Then load-test at a request rate resembling real traffic, and check the resulting latency percentiles against whatever SLO the use case actually needs — not just whether the demo worked once.

## Segment 6 (outro)

Environment checks, launch, reading the startup logs for capacity signals, a correctness check, and a load test against your actual SLO — in that order, every time. That closes chapter two. Chapter three moves on to shrinking the model itself, starting with quantization.
