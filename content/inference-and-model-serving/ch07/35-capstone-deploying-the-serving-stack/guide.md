# Capstone: Deploying the Serving Stack

Lesson 34 ended with a decision: Llama 3.1 8B Instruct, on a single GPU, for Anchorline Systems' internal support assistant. This lesson stands that decision up as a running service. You'll see the deployment architecture end to end, a real vLLM launch command with the flags that matter, and how the choices you make here are the same continuous batching, PagedAttention, and chunked prefill concepts from Chapters 2 and 4 — not new ideas, just the moment you actually turn their knobs.

## What you'll learn

- The shape of a serving deployment, from client request to GPU and back
- A real `vllm serve` launch command for this capstone's model, with each flag explained
- Why the defaults already give you continuous batching and PagedAttention, and what you're actually choosing when you set the other flags
- How to smoke-test a freshly deployed endpoint before trusting it with real traffic

## The deployment architecture

A production serving stack has more pieces than "run the model," even for an internal tool on one GPU:

- **Client applications** — the Slack integration and the internal tool, sending chat requests.
- **API gateway / load balancer** — terminates TLS, applies auth, and would route across replicas if Anchorline ever scaled past one GPU (Chapter 5's territory).
- **vLLM server** — an OpenAI-compatible HTTP server that owns the model, the KV cache, and the request scheduler.
- **GPU** — where the weights and KV cache actually live, and where continuous batching and PagedAttention (Chapter 4) do their work.

For this capstone, the gateway is deliberately thin — a single vLLM instance is the whole backend — but the shape above is exactly what Lesson 23's autoscaling and Lesson 24's load balancing extend once there's more than one GPU to spread requests across.

## Standing up vLLM

Installing and launching vLLM for this model looks like this:

```bash
pip install vllm

vllm serve meta-llama/Llama-3.1-8B-Instruct \
  --port 8000 \
  --dtype bfloat16 \
  --max-model-len 8192 \
  --gpu-memory-utilization 0.90 \
  --max-num-seqs 64 \
  --enable-chunked-prefill
```

Each flag is a decision, not boilerplate:

- `--dtype bfloat16` — full-precision weights for this capstone; the quantization lessons from Chapter 3 would swap this for an `--quantization awq` flag against a pre-quantized checkpoint if the GPU budget were tighter.
- `--max-model-len 8192` — caps context at 8K tokens rather than the model's full 128K. Anchorline's requests are a question plus some pasted logs, not a 128K-token document, and a lower cap reserves less KV-cache memory per request, leaving more memory for concurrent requests.
- `--gpu-memory-utilization 0.90` — tells vLLM it can use 90% of the GPU's memory for weights plus KV cache, leaving a small margin rather than the conservative 0.9 default being pushed further.
- `--max-num-seqs 64` — the ceiling on how many sequences can be in a batch at once, directly shaping the continuous batching behavior from Lesson 19.
- `--enable-chunked-prefill` — splits long prefill work into chunks interleaved with decode steps for other requests, so one long prompt doesn't stall everyone else's token generation — a refinement on top of the prefill/decode split from Lesson 4.

Notice what is *not* on this list: there's no flag to turn on continuous batching or PagedAttention. They're vLLM's default scheduling and KV-cache strategy — you're not enabling them, you're tuning how aggressively they run.

## Smoke-testing the endpoint

Before pointing real traffic at it, confirm the server actually answers using its OpenAI-compatible chat endpoint:

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "Summarize a 429 rate-limit error in one sentence."}],
    "max_tokens": 60
  }'
```

A real response with the expected `choices` structure means the model is loaded, the scheduler is accepting requests, and KV cache allocation succeeded — the three things most likely to be silently broken after a deploy.

## Key terms

| Term | Meaning |
|---|---|
| OpenAI-compatible server | A serving endpoint exposing the same request/response shape as OpenAI's API, so existing client tooling works unchanged |
| `--max-model-len` | The context length cap the server enforces, independent of the model's architectural maximum |
| `--gpu-memory-utilization` | The fraction of GPU memory vLLM is allowed to reserve for weights and KV cache |
| Chunked prefill | Splitting a long prompt's prefill pass into pieces interleaved with other requests' decode steps |

## Recap

The deployment is a thin stack — client, gateway, vLLM server, GPU — with every meaningful decision living in the launch flags: context cap, memory budget, batch ceiling, and chunked prefill, all built on continuous batching and PagedAttention defaults you already understand from Chapter 4. Next up, Lesson 36: benchmarking this exact deployment honestly, and tuning it based on what the numbers actually say.
