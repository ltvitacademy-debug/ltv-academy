# Deploying a Model With a Serving Framework

Chapter 2 has been building toward this: an actual, start-to-finish deployment. This lesson walks through standing up a real model behind vLLM's OpenAI-compatible server, from the moment a GPU is available to a verified, working endpoint — and calls out the checks you should run at each step, tying together ideas from every lesson in this chapter and the last.

## What you'll learn

- The minimum environment and hardware checks to do before launching anything
- A full walkthrough: install, launch, verify, and load-test a vLLM deployment
- What to check in the server's own startup logs before trusting it's ready
- How this walkthrough would change if you deployed via Triton instead

## Step 1: confirm the environment

Before launching a server, confirm the basics so you're not debugging the wrong layer later:

```bash
# Confirm the GPU is visible and has enough free memory for the model
nvidia-smi

# Confirm the Python/CUDA environment vLLM expects is present
python3 -c "import torch; print(torch.cuda.is_available(), torch.cuda.get_device_name(0))"
```

A model like an 8B-parameter LLM in FP16 needs roughly 16GB of GPU memory just for its weights, before accounting for any KV cache headroom — so this step catches the most common early failure (not enough free VRAM) before it shows up as a confusing crash later.

## Step 2: install and launch

```bash
pip install vllm

vllm serve meta-llama/Llama-3.1-8B-Instruct \
  --host 0.0.0.0 \
  --port 8000 \
  --gpu-memory-utilization 0.90 \
  --max-model-len 8192
```

This is the same command from Lesson 7 — the point of this lesson is what happens around it, not the command itself.

## Step 3: read the startup logs before trusting it

vLLM prints progress while it loads weights and warms up; the lines worth actually watching for are the ones confirming the model loaded, the KV cache was allocated, and the HTTP server is listening:

```
INFO: Loading model weights took 14.92 seconds
INFO: GPU KV cache size: 89,472 tokens
INFO: Maximum concurrency for 8192 tokens per request: 10.92x
INFO: Uvicorn running on http://0.0.0.0:8000
```

That "maximum concurrency" line is directly useful: it's vLLM telling you, given your `--max-model-len` and the memory it was able to allocate, roughly how many max-length requests it could run truly concurrently before the KV cache runs out of room — a number worth sanity-checking against your expected traffic before declaring the deployment done.

## Step 4: verify with a real request

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "Say hello in exactly five words."}],
    "max_tokens": 20
  }'
```

A successful response confirms the whole path works: routing, tokenization, prefill, decode, and detokenization (Lesson 2's six stages, now verified end to end).

## Step 5: load-test before calling it done

A single successful request tells you the server works, not that it performs. Using the benchmarking approach from Lesson 5:

```bash
python3 benchmark_serving.py \
  --backend vllm \
  --base-url http://localhost:8000 \
  --model meta-llama/Llama-3.1-8B-Instruct \
  --num-prompts 200 \
  --request-rate 10
```

Check the resulting TTFT and TPOT percentiles (Lesson 5) against whatever latency SLO the use case actually needs, at a request rate resembling real expected traffic — not just the rate the demo happens to use.

## If you deployed via Triton instead

The same model, served through Triton's vLLM backend rather than standalone vLLM, swaps steps 2–3 for: writing a `config.pbtxt` (Lesson 9), placing it and the model in a model repository directory structure, and launching with `tritonserver --model-repository=/models`. Steps 1, 4, and 5 — environment checks, verifying with a real request, and load-testing — stay conceptually identical, just pointed at Triton's endpoint instead of vLLM's.

## Key terms

| Term | Meaning |
|---|---|
| `nvidia-smi` | Command-line tool to check GPU availability and memory |
| Maximum concurrency (vLLM log line) | vLLM's own estimate of concurrent max-length requests its KV cache can support |
| Load test | Sending realistic, concurrent traffic to verify performance, not just correctness |

## Recap

A real deployment is environment checks, launch, reading the startup logs for capacity signals, a correctness check, and a load test against your actual SLO — in that order, every time. That closes Chapter 2: Chapter 3 moves on to shrinking the model itself, starting with quantization.
