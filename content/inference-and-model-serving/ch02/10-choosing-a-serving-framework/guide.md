# Choosing a Serving Framework

Lessons 7–9 introduced vLLM, TensorRT-LLM, and Triton Inference Server one at a time. In practice, teams rarely pick exactly one in isolation — they pick a combination, shaped by their hardware, their model, and how much engineering time they have to spend on performance tuning versus other priorities. This lesson gives you a framework (no pun intended) for making that call.

## What you'll learn

- A direct side-by-side comparison of vLLM, TensorRT-LLM, and Triton across the dimensions that actually matter for a decision
- Three common deployment patterns teams actually use, and when each makes sense
- The questions to ask about your own situation before picking anything
- Why "which is fastest" is usually the wrong first question

## The three tools, side by side

| Dimension | vLLM | TensorRT-LLM | Triton Inference Server |
|---|---|---|---|
| Primary focus | Scheduling & memory (continuous batching, PagedAttention) | Compiling the model for raw execution speed | Networked serving layer, framework-agnostic |
| Setup effort | Low — works out of the box with most Hugging Face models | Higher — requires a model-specific compile/build step | Moderate — needs a model repository and config per model |
| Hardware flexibility | NVIDIA primarily, growing AMD support | NVIDIA GPUs specifically (built on TensorRT) | Any hardware the chosen backend supports |
| Best raw throughput/latency | Strong, with minimal tuning | Typically the fastest once compiled, if NVIDIA-only | Depends entirely on the backend behind it |
| Multi-model hosting | Not its focus (one model per server process) | Not its focus | Built for exactly this |
| OpenAI-compatible API | Built in | Not built in by itself | Available via backend/ecosystem tooling |

No single row should be read in isolation — the right combination depends on what a team actually needs, which is the point of the next section.

## Three common deployment patterns

- **vLLM alone** — a single model, an OpenAI-compatible API needed quickly, and the team doesn't want to spend engineering time compiling anything. This is the most common starting point, and for many workloads it's also the ending point.
- **TensorRT-LLM behind Triton** — a team has squeezed what they can out of configuration-level tuning and needs the extra raw speed a compiled engine provides, usually because they're running at high enough volume that a meaningful throughput gain translates into real GPU-cost savings, and they're committed to NVIDIA hardware.
- **Triton hosting multiple models/backends** — an organization serving many different models (not just one LLM) wants one consistent operational surface: one set of health checks, one set of metrics, one deployment process, regardless of whether a given model runs on vLLM, TensorRT-LLM, PyTorch, or something else entirely.

## Questions to ask before picking

1. **How many different models do we need to serve, and how similar are their frameworks?** One LLM, low model diversity → vLLM alone is probably enough. Many models, high diversity → Triton's multi-backend hosting earns its complexity.
2. **How much engineering time can we spend on performance tuning, versus shipping?** Compiling with TensorRT-LLM pays off at scale but costs real setup and maintenance time; that trade is only worth it once the throughput gain is large enough to matter financially.
3. **Are we committed to NVIDIA hardware, or do we need flexibility?** TensorRT-LLM is NVIDIA-specific by design; vLLM's broader (if still NVIDIA-primary) hardware support matters if that commitment isn't settled yet.
4. **Do we need an OpenAI-compatible API specifically, or a custom protocol?** vLLM gives you this immediately; building the same thing on raw TensorRT-LLM or a custom Triton config takes extra work.

## Why "which is fastest" is the wrong first question

Raw speed comparisons between these tools are highly dependent on the specific model, GPU, batch size, and request pattern being tested — a benchmark favoring one tool under one workload can reverse under a different one. The more durable question is "which combination fits our constraints (hardware, model diversity, team bandwidth, API requirements) well enough that we can actually operate it reliably" — because an unreliable, hard-to-maintain setup that benchmarks 10% faster is a worse outcome than a boring, well-understood one that's 10% slower.

## Key terms

| Term | Meaning |
|---|---|
| Deployment pattern | A common, named combination of these tools used for a given situation |
| Hardware commitment | Whether a team is locked into NVIDIA GPUs specifically or needs flexibility |
| Operational surface | The combined set of health checks, metrics, and processes a team has to maintain |

## Recap

vLLM, TensorRT-LLM, and Triton solve overlapping but distinct problems, and most real deployments combine them rather than choosing just one — the right combination follows from hardware commitment, model diversity, and team bandwidth, not from a raw speed benchmark alone. Next up, Lesson 11: actually deploying a model with a serving framework, start to finish.
