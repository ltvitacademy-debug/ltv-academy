# Capstone Write-Up & Destination Wrap-Up

The Anchorline Systems deployment is picked, deployed, benchmarked, and tuned. The last skill in this capstone — and in the whole AI Infrastructure / ML Systems Engineer destination — is writing it up so someone who wasn't in the room can trust it and act on it. This lesson covers how to structure that write-up, then steps all the way back to close out the four-course arc that got you here.

## What you'll learn

- How to structure a serving write-up so a stakeholder can trust it without re-running your benchmarks
- How to present a cost/latency/quality trade-off honestly, including what you didn't do and why
- The full shape of the AI Infrastructure / ML Systems Engineer destination, course by course
- Where this destination leaves you, and what a reasonable next step looks like

## Structuring the write-up

A serving write-up earns trust the same way a benchmark does: by showing its work. Five sections cover it:

- **Executive summary** — three sentences: what was deployed, what it achieves, what it costs. Written for a manager who will not read past this section.
- **Methodology** — the model (Llama 3.1 8B Instruct), the framework (vLLM), the hardware (one 24GB-class GPU), and the exact benchmark command and traffic shape from Lesson 36, so the numbers are reproducible, not just quoted.
- **Results** — the before/after table from Lesson 36, with every number still hedged as illustrative where it is, and the specific gap that was found and closed (p99 TTFT under burst load).
- **Trade-offs considered and rejected** — Mixtral 8x7B was passed over for GPU budget, not quality; INT4 quantization was left on the table as a lever still available if traffic grows past this GPU's headroom, not because it wasn't considered.
- **Recommendation** — ship it, with the one open risk named plainly: this is a single point of failure until Chapter 5's autoscaling and load balancing get layered on top, which is the honest next step, not a hidden gap.

That last point matters more than it looks: a write-up that hides its remaining risk is worse than one with no write-up, because it lets a reader make a decision on a false sense of completeness.

## The destination, start to finish

Four courses, each adding one layer, with nothing re-taught between them:

1. **GPU Computing** — how GPUs actually work: CUDA fundamentals, memory hierarchy, and operating them in PyTorch and in a cluster. The hardware floor everything else stands on.
2. **Distributed Training Infrastructure** — the systems view of training at scale: networking, job scheduling, fault tolerance, and storage for jobs that span many GPUs.
3. **ML Infrastructure & Platform Engineering** — the platform a company builds once it has more than one model in production: feature stores, experiment tracking, pipelines, deployment infrastructure, on-call reliability.
4. **Inference & Model Serving** — this course: getting a trained model to actually answer requests fast and cheaply — serving frameworks, quantization, the KV cache, autoscaling, and the cost/latency/quality trade-offs this capstone just walked end to end.

Notice the shape: training-side infrastructure, then the platform that sits around all models, then the serving layer that sits in front of the one model actually answering traffic. A production ML system needs all four layers, and this destination is the only place in the catalog where you built every one of them, in order, on the same underlying DevOps trunk — Linux, Docker, Kubernetes, and Terraform — that the Azure Database Administrator and DevOps Engineering paths already gave you.

## Where this leaves you

You can now take a trained open-weight model and make a real, defensible call on how to serve it: which framework, which quantization if any, how to configure the KV cache and batching, how to prove the result with numbers instead of a guess, and how to write that proof up so someone else can trust it. That's the job description for ML Infrastructure Engineer, AI Infrastructure Engineer, and ML Systems Engineer roles — the titles this whole destination targets. From here, the honest next step for most learners is exactly what this write-up's recommendation named as the open risk: taking autoscaling and multi-GPU serving — Chapter 5 of this course — further in a real production environment, rather than treating this capstone's single-GPU deployment as the finish line.

## Key terms

| Term | Meaning |
|---|---|
| Write-up | A structured record of a technical decision — summary, methodology, results, trade-offs, recommendation — built so someone else can trust and act on it without re-running the work |
| Single point of failure | A system with no redundancy; naming this honestly in a write-up is part of the job, not an admission of failure |
| Destination | This catalog's term for a multi-course sequence building toward one target job title |

## Recap

The write-up closes the loop: a stakeholder-readable summary, a reproducible methodology, honest results, trade-offs named rather than hidden, and a recommendation with its remaining risk stated plainly. That's also the close of the AI Infrastructure / ML Systems Engineer destination itself — GPU Computing, Distributed Training Infrastructure, ML Infrastructure & Platform Engineering, and this course, Inference & Model Serving, now form one complete, provable path from raw hardware to a benchmarked serving endpoint. There is no next lesson in this course — there's a production system you now know how to build, measure, and defend.
