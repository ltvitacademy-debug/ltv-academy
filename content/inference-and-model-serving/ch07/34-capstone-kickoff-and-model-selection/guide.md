# Capstone Kickoff & Model Selection

This is it — the capstone for Inference & Model Serving, and for the entire AI Infrastructure / ML Systems Engineer destination. Every course before this one built a layer underneath you: GPU Computing gave you the hardware and CUDA fundamentals, Distributed Training Infrastructure gave you the systems view of training at scale, and ML Infrastructure & Platform Engineering gave you the platform a company runs once it has more than one model in production. This capstone puts you on the last mile — taking a trained, open-weight model and turning it into a serving endpoint that answers real requests fast and cheaply. Over the next four lessons you'll pick a model, deploy it behind vLLM, benchmark it honestly, tune it, and write up what you found. This lesson is the brief and the model pick.

## What you'll learn

- The capstone scenario you'll carry through all four lessons
- How to turn a vague "make it fast and cheap" request into concrete serving requirements
- The real trade-offs between a handful of current open-weight instruct models
- Why this course's capstone lands on a single mid-size model and a single-GPU deployment, not a 70B cluster

## The brief

Our fictional company for this capstone is **Anchorline Systems**, a mid-size logistics software vendor. Their support engineers field the same category of question dozens of times a day — API error codes, webhook retry behavior, rate-limit specifics — and the request from engineering leadership is an internal assistant that engineers can query from Slack and from an internal tool. The ask, verbatim: "something that feels instant, doesn't blow up our cloud bill, and we can run ourselves." That's not yet a spec. Your first job as the infrastructure engineer is to turn it into one:

- **Latency target** — engineers are typing a question and waiting; a time-to-first-token (TTFT) north of a couple of seconds will feel broken. Illustrative target: p99 TTFT under roughly 500ms, p99 end-to-end response under a few seconds for a typical answer.
- **Throughput target** — roughly 50 concurrent engineers at peak, bursty rather than constant.
- **Cost ceiling** — "we can run ourselves" means one GPU, not a multi-node cluster — this is an internal tool, not a customer-facing product with a growth budget.
- **Context need** — questions plus a few paragraphs of pasted logs or API docs; a context window in the low thousands of tokens is enough, not hundreds of thousands.

## Picking the model

With real requirements in hand, the model shortlist comes down to license, size versus GPU memory, context length, and general instruction-following quality — exactly the trade-off axes from Lesson 16 back in Chapter 3. Three realistic, currently available open-weight instruct models fit this kind of internal-tool decision:

- **Meta Llama 3.1 8B Instruct** — Llama 3.1 community license (permissive for this kind of internal, non-redistributed use), 128K context window, strong instruction-following for its size, and the single most widely supported model in the vLLM ecosystem.
- **Mistral 7B Instruct v0.3** — Apache 2.0 license (no attribution or usage restrictions at all), 32K context, slightly smaller footprint, solid but a notch behind Llama 3.1 8B on most general benchmarks.
- **Mixtral 8x7B Instruct** — a mixture-of-experts model, Apache 2.0, noticeably higher quality ceiling, but roughly 47B total parameters means it does not comfortably fit on the single mid-range GPU this budget calls for without aggressive quantization.

For Anchorline's brief, **Llama 3.1 8B Instruct** is the pick: its 128K context comfortably covers pasted logs with room to spare, its license fits an internal tool, its quality is more than adequate for a support-knowledge assistant, and — critically for this capstone — it fits cleanly on a single 24GB-class GPU (an A10G or L4-class card) in full precision, with headroom left over for KV cache. That last point matters: you'll spend Lesson 35 deploying exactly this model on exactly that kind of single-GPU budget.

## Key terms

| Term | Meaning |
|---|---|
| Open-weight model | A model whose trained weights are published for self-hosting, as opposed to an API-only model |
| Context window | The maximum combined prompt + generation length a model can handle in one request |
| Mixture-of-experts (MoE) | An architecture (like Mixtral) where only a subset of parameters activate per token, trading memory footprint for a different compute profile |
| TTFT | Time-to-first-token — how long a user waits before the response starts streaming |

## Recap

The brief turned a vague request into concrete latency, throughput, cost, and context targets, and those targets pointed to Llama 3.1 8B Instruct as the model for this capstone — it clears the quality bar, fits the license, and fits the GPU budget. Next up, Lesson 35: standing up that model behind vLLM with real deployment flags.
