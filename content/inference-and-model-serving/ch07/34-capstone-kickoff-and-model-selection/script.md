# Script — Capstone Kickoff & Model Selection

## Segment 1 (title)

This is the capstone for Inference and Model Serving, and for the whole AI Infrastructure, ML Systems Engineer destination. GPU Computing gave you the hardware layer, Distributed Training Infrastructure gave you the systems view of training, and ML Infrastructure and Platform Engineering gave you the platform layer. This capstone is the last mile: taking a trained model and turning it into a serving endpoint that answers real requests fast and cheaply. This lesson is the brief and the model pick.

## Segment 2 (steps)

Our fictional company is Anchorline Systems, a mid-size logistics software vendor. Their ask is an internal assistant their support engineers can query from Slack, and the request, verbatim, is "something that feels instant, doesn't blow up our cloud bill, and we can run ourselves." That's not a spec yet. Turning it into one means a latency target — p99 time to first token under roughly half a second — a throughput target of around fifty concurrent engineers at peak, a cost ceiling of one GPU rather than a cluster, and a context need in the low thousands of tokens, not hundreds of thousands.

## Segment 3 (steps)

With real requirements in hand, picking a model comes down to the same axes as the quality-cost trade-off from chapter three: license, size versus GPU memory, context window, and instruction-following quality.

## Segment 4 (steps)

Three real, currently available open-weight instruct models fit this kind of decision. Llama 3.1 8B Instruct, with a 128K context window and strong quality for its size, fits comfortably on a single 24 gigabyte class GPU. Mistral 7B Instruct version 0.3 is Apache 2.0 licensed with a 32K context, a notch lighter and a notch behind on quality. And Mixtral 8x7B Instruct, a mixture of experts model, has a higher quality ceiling but around 47 billion total parameters, which doesn't comfortably fit this capstone's single-GPU budget without aggressive quantization.

## Segment 5 (code)

The pick is Llama 3.1 8B Instruct. Its context covers pasted logs with room to spare, its license fits an internal tool, its quality clears the bar for a support assistant, and it fits cleanly on a single 24 gigabyte GPU with headroom left for KV cache. That's the model Lesson 35 deploys.

## Segment 6 (outro)

Requirements first, then the model that actually clears them — not the biggest model available. Next up, Lesson 35: deploying Llama 3.1 8B behind vLLM with real flags.
