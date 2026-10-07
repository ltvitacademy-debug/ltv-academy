# Productionization Trade-offs

Lesson 38 covered packaging a model into a self-contained artifact. Packaging answers "can this run outside my training script"; it doesn't answer "how should it run at the latency, volume, and cost a product actually needs." Those are trade-offs, not a single correct answer, and a research engineer handing off a model needs to understand them well enough to make a real recommendation instead of defaulting to whatever's fastest to wire up.

## What you'll learn

- Why latency, throughput, and cost pull against each other instead of all improving together
- Quantization as a concrete lever, with its real accuracy trade-off
- Dynamic batching: what it is, and when it helps vs. actively hurts
- How to choose between a plain Python server, TorchServe, and Triton based on actual constraints

## Latency, throughput, and cost pull against each other

Three numbers matter in production that rarely show up in a research paper's results table:

- **Latency** — time for one request to get a response. What a user or a downstream system waiting synchronously feels.
- **Throughput** — total requests served per second across all traffic. What determines how much hardware a given load requires.
- **Cost** — dollars per unit of throughput, mostly driven by GPU vs. CPU choice and how well utilized that hardware stays.

The tension: batching multiple requests together before running inference raises throughput (the GPU does more work per kernel launch, so utilization improves) but raises the latency of the first request in the batch, which now waits for the batch to fill. A chat-completion endpoint with a 200ms latency budget and a batch recommendation job with an overnight SLA should not be served the same way, even if they use the identical model artifact from Lesson 38.

## Quantization: smaller and faster, at an accuracy cost

Quantization reduces the numerical precision of a model's weights (and sometimes activations), typically from 32-bit floats to 8-bit integers. Smaller weights mean less memory bandwidth per inference and often a real latency win, especially on CPU:

```python
import torch

model.eval()
quantized = torch.quantization.quantize_dynamic(
    model,
    {torch.nn.Linear},
    dtype=torch.qint8,
)
torch.jit.save(torch.jit.script(quantized), "model_quantized.pt")
```

Dynamic quantization (shown above) quantizes weights ahead of time and activations on the fly at inference — a reasonable default for transformer-style models dominated by linear layers. Static quantization and quantization-aware training exist for larger accuracy-sensitivity cases but need a calibration dataset and more setup. The trade-off is real: always re-run the eval harness from the original research run against the quantized artifact before shipping it, and report the delta, not just the speedup.

## Dynamic batching: trading a little latency for a lot of throughput

A serving system can accumulate several incoming requests into one batch before running the model, instead of running each request as it arrives. NVIDIA Triton Inference Server exposes this directly in its model configuration:

```text
# config.pbtxt
dynamic_batching {
  preferred_batch_size: [ 4, 8, 16 ]
  max_queue_delay_microseconds: 2000
}
```

This tells Triton to wait up to 2ms hoping to fill a preferred batch size before running inference anyway with whatever arrived. For a latency budget in the tens of milliseconds, a 2ms queueing delay is usually a good trade for the throughput gain. For a latency budget in the low single-digit milliseconds, it may not be — dynamic batching is a lever to tune, not something to always turn on.

## Choosing a serving framework

- **A plain Python server (FastAPI)** — fastest to stand up, full control, no built-in batching or multi-model management. Fine for low QPS, internal tools, or a first version while production requirements are still being discovered.
- **TorchServe** — PyTorch-native, adds model versioning and basic batching/metrics out of the box without leaving the PyTorch ecosystem.
- **NVIDIA Triton** — framework-agnostic (serves TorchScript, ONNX, and others side by side), built for GPU throughput with dynamic batching, multi-model concurrent execution, and model ensembles. The right choice once GPU utilization and multi-model serving actually matter, not before.

A minimal FastAPI handoff for context, since many handoffs start here before graduating to Triton:

```python
from fastapi import FastAPI
import torch

app = FastAPI()
model = torch.jit.load("model_traced.pt")
model.eval()

@app.post("/predict")
def predict(payload: dict):
    tensor = torch.tensor(payload["inputs"])
    with torch.no_grad():
        output = model(tensor)
    return {"logits": output.tolist()}
```

## Key terms

- **Latency** — the time a single request takes to get a response
- **Throughput** — total requests served per second across all traffic
- **Quantization** — reducing numerical precision (e.g. float32 to int8) to shrink a model and speed up inference, at some accuracy cost
- **Dynamic batching** — a serving system accumulating multiple requests into one batch before running inference, trading a small queueing delay for higher throughput
- **p99 latency** — the latency below which 99% of requests complete; the metric that matters more than average latency for user-facing systems
