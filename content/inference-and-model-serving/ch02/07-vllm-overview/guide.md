# vLLM, Overview

vLLM is the framework most teams reach for first when they need to serve an LLM, and for good reason: it's open source, it's built specifically around the ideas from Chapter 1 (continuous batching, efficient KV cache management), and it ships an OpenAI-compatible API out of the box. This lesson gives you a working mental model of vLLM and shows you the commands you'd actually run.

## What you'll learn

- What vLLM is, who maintains it, and where it fits in the serving landscape
- PagedAttention, the memory-management idea vLLM is best known for
- How continuous batching, from Lesson 3, is actually implemented inside vLLM
- The commands to launch a real vLLM OpenAI-compatible server and call it

## What vLLM is

vLLM began as a research project at UC Berkeley's Sky Computing Lab and is now a widely used open-source project with contributions from NVIDIA, AMD, Red Hat, and many other companies, maintained under the vLLM project on GitHub. It's a Python-based inference and serving engine for large language models, designed to run efficiently on GPUs (NVIDIA primarily, with growing support for AMD and other accelerators) and to be easy to adopt: most popular open-weight model families (Llama, Mistral, Qwen, and many others) work with vLLM with little to no custom code.

## PagedAttention: the idea vLLM is known for

Recall from Lesson 4 that the KV cache grows throughout a request's life and has to live in GPU memory the whole time. Before vLLM, most implementations allocated a single large, contiguous block of memory per request sized for the *maximum possible* sequence length — which wastes a lot of memory for requests that end up shorter, and makes memory management brittle when many requests of different lengths run concurrently. **PagedAttention**, inspired by virtual memory paging in operating systems, instead stores the KV cache in small, fixed-size, non-contiguous "pages" (blocks) and tracks which pages belong to which request with a lookup table — similar to how an OS maps virtual addresses to physical memory pages. This lets vLLM pack far more concurrent requests into the same GPU memory, because memory isn't wasted on unused "maximum length" headroom, and it's what you'll study in full detail in Chapter 4 (Lesson 18).

## Continuous batching inside vLLM

vLLM's scheduler implements continuous batching (previewed in Lesson 3): at every decode step, it checks which requests in flight can continue, which have finished (freeing their memory pages immediately), and which new requests waiting in the queue can be admitted into the now-available capacity. This happens every single step, not once per whole batch, which is exactly what lets vLLM keep GPU utilization high during the memory-bound decode phase even as individual requests finish at very different times.

## Launching a vLLM server

vLLM ships a built-in OpenAI-compatible server you can launch from the command line:

```bash
vllm serve meta-llama/Llama-3.1-8B-Instruct \
  --host 0.0.0.0 \
  --port 8000 \
  --gpu-memory-utilization 0.90 \
  --max-model-len 8192
```

- `--gpu-memory-utilization` tells vLLM what fraction of GPU memory it's allowed to claim for weights plus the KV cache pool (0.90 means 90%)
- `--max-model-len` caps the maximum context length (prompt plus generated tokens) vLLM will plan memory for

Once running, it accepts standard OpenAI-style requests:

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "Explain PagedAttention in one sentence."}],
    "max_tokens": 100
  }'
```

Because the API shape matches OpenAI's, existing OpenAI client libraries (in Python, JavaScript, etc.) can point at this server by simply changing the base URL — no other client code changes needed.

## Key terms

| Term | Meaning |
|---|---|
| PagedAttention | vLLM's paging-based KV cache memory management technique |
| `vllm serve` | The CLI command that launches vLLM's OpenAI-compatible server |
| `--gpu-memory-utilization` | Fraction of GPU memory vLLM is allowed to claim |
| Continuous batching (in vLLM) | Requests join/leave the active batch at every decode step |

## Recap

vLLM pairs continuous batching with PagedAttention's efficient, paged KV cache memory management, and ships as an OpenAI-compatible server you can launch with a single CLI command. Next up, Lesson 8: TensorRT-LLM, NVIDIA's framework focused on compiling models for maximum raw execution speed.
