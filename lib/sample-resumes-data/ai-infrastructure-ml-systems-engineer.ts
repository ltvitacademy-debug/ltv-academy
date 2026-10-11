import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "ml-infrastructure-engineer": {
    levelLabel: "ML Infrastructure Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "ML Infrastructure Engineer with the systems foundation underneath frontier AI workloads — distributed-systems " +
      "fundamentals, real PyTorch fluency built up to a from-scratch Transformer, GPU architecture and CUDA-level " +
      "performance diagnosis, and the cluster infrastructure that actually runs distributed training: networking, " +
      "job orchestration, fault-tolerant checkpointing, and high-throughput storage. Built on a prior DevOps Engineer " +
      "foundation in Linux, Docker, Kubernetes, and Terraform. Three connected capstones — a from-scratch Transformer " +
      "trained and honestly evaluated, a real multi-GPU training-job slowdown diagnosed end to end, and a genuine " +
      "multi-node PyTorch training cluster stood up on Kubernetes — stand behind every skill claimed here. Bringing " +
      "that foundation to an ML Infrastructure Engineer, AI Infrastructure Engineer, or ML Platform Engineer role.",
    skills: [
      "Distributed Systems Fundamentals (Availability, Scalability, Reliability, Latency vs. Throughput)",
      "Consistency, Messaging & Failure Handling (CAP Theorem, Eventual Consistency, Message Queues, Idempotent Retries, Backpressure)",
      "PyTorch Fundamentals (Tensors, Autograd, Training Loops, Datasets/DataLoaders, Checkpointing, Debugging)",
      "Neural Network Design & Training Practice (nn.Module, Optimizers, Regularization, LR Schedules, Hyperparameter Search)",
      "Transformers From Scratch (Self-/Cross-/Multi-Head Attention, Positional Encoding, Decoder-Only Architectures, Sampling Strategies)",
      "Scaling & Debugging Training Runs (Mixed Precision, Gradient Accumulation, DDP, torch.compile, Loss-Curve Literacy, Reproducibility)",
      "GPU Architecture, CUDA & Performance Profiling (SMs, Memory Hierarchy, Tensor Cores, nvidia-smi, Nsight Systems/Compute)",
      "PyTorch Device & Memory Management (Device Placement, Pinned Memory, CUDA Graphs, Out-of-Memory Diagnosis)",
      "Multi-GPU & Cluster GPU Management (NVLink/PCIe Topology, Kubernetes GPU Scheduling, MIG & Time-Slicing)",
      "Distributed Training Networking (NCCL, AllReduce/AllGather, InfiniBand vs. Ethernet, Bottleneck Diagnosis)",
      "Training Job Orchestration at Scale (Kubernetes & Slurm Job Scheduling, Gang Scheduling, Cluster Autoscaling)",
      "Fault-Tolerant, Cost-Aware Training Infrastructure (Checkpoint Storage Strategies, Elastic Training, Spot/Preemptible Instances, Cost Attribution)",
      "High-Throughput Data Loading & Storage at Scale (Sharded Datasets, Object/Block/Parallel Filesystems, Caching, Observability)",
      "Kubernetes, Docker, Terraform & Cloud Fundamentals (DevOps Engineer Foundation)",
      "Linux Administration & Infrastructure Automation",
    ],
    tools:
      "Python, PyTorch, CUDA, nvidia-smi, Nsight Systems/Compute, NCCL, Kubeflow Training Operator, torchrun, FSDP, " +
      "torch.distributed.checkpoint, Kubernetes (AKS/EKS), Slurm (overview), Docker, Terraform, S3-compatible object " +
      "storage (MinIO), Prometheus/Grafana",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "AI Infrastructure / ML Systems Engineer Destination — Foundation Through Training Infrastructure · Atlanta, GA",
            bullets: [
              "Completed the full DevOps Engineer apprenticeship beforehand (Jan 2026 – Jun 2026) — Linux administration, Docker, Kubernetes (AKS/EKS), Terraform, and CI/CD; this destination builds the GPU, distributed-training, and platform layers below directly on top of that trunk rather than re-teaching it.",
              "Built a distributed-systems vocabulary before writing any ML infrastructure: availability, horizontal scalability, reliability, and latency vs. throughput; asynchronous systems, eventual consistency, and the CAP theorem applied per piece of data rather than uniformly; point-to-point queues, publish/subscribe, and log-based streaming with their at-most-once/at-least-once/exactly-once delivery guarantees; failure handling, idempotency keys and safe retries, and backpressure and rate limiting — synthesized in a case study designing an online checkout system that makes a different CAP trade-off for inventory (eventually consistent) than for payment state (strongly consistent) and decouples fulfillment through a message queue.",
              "Built real PyTorch fluency from tensors and autograd up through a working training loop, Datasets/DataLoaders, and checkpointing, then built neural networks with nn.Module, linear layers and activations, loss functions, SGD/momentum/Adam optimizers, weight initialization, and custom layers; practiced training deep networks in the real world — batching effects, weight decay and dropout, batch/layer normalization, learning-rate schedules, gradient clipping, checkpointing and resuming, early stopping, and basic hyperparameter search — then built CNNs and used transfer learning with pretrained vision models.",
              "Learned sequence models and attention end to end — RNNs, LSTMs and the vanishing-gradient problem, self-attention vs. cross-attention, multi-head attention, and positional encoding — through reading \"Attention Is All You Need,\" then built a decoder-only Transformer from scratch: the Transformer block, feed-forward sublayers, residual connections and layer-norm placement, a training loop for a tiny GPT, and greedy/top-k/top-p sampling; scaled training up with mixed-precision (FP32/FP16/BF16), gradient accumulation, DataParallel vs. DistributedDataParallel, and torch.compile, and learned to read loss curves, catch silent training bugs, and track and compare experiments reproducibly.",
              "Learned why GPUs suit ML workloads at the hardware level — streaming multiprocessors, CUDA cores, the GPU memory hierarchy, and Tensor Cores — then the CUDA programming model (kernels, threads, blocks, grids, memory types) and when to (and deliberately not to) write raw CUDA; practiced GPU performance work — compute-bound vs. memory-bound operations, memory coalescing, occupancy, and profiling with nvidia-smi and Nsight Systems/Compute — and GPU usage inside PyTorch (device placement, pinned memory, AMP, CUDA graphs, torch.compile internals, and diagnosing out-of-memory failures), plus multi-GPU node topology (NVLink/PCIe) and GPU scheduling in Kubernetes with MIG and time-slicing.",
              "Took the infrastructure-only view of distributed training — what a cluster has to do, the infrastructure-vs-algorithms split, reading a cluster topology diagram, and capacity planning — then networking for training at scale (why bandwidth dominates, NCCL and collective communication, AllReduce/AllGather, InfiniBand vs. Ethernet, diagnosing a network bottleneck), orchestrating jobs with Kubernetes and Slurm (job queues, gang scheduling, autoscaling), fault tolerance and checkpointing at scale (checkpoint storage strategies, resuming large jobs, spot/preemptible instances, elastic training, designing for node failure), high-throughput data loading and storage (sharded datasets, object/block/parallel filesystem trade-offs, caching), and monitoring and cost management (GPU utilization monitoring, cost attribution across teams and jobs, alerting on a stalled run).",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Tiny GPT — Decoder-Only Transformer Capstone",
            right: "2026",
            sub: "Deep Learning & PyTorch — capstone",
            bullets: [
              "Built a character-level tokenizer and trained a from-scratch decoder-only Transformer (4-6 blocks, 4-8 attention heads, 128-256 embedding dimensions, roughly 1-5M parameters) on the Tiny Shakespeare corpus end to end on a single GPU.",
              "Evaluated the trained checkpoint honestly: computed held-out loss and perplexity, generated samples under greedy, top-k, and top-p decoding, read the train/validation loss gap for overfitting, and compared a one-variable ablation against the baseline rather than tuning several things at once.",
              "Documented the model in a four-section model card (what it is, how it was trained, results, limitations), stating the dataset and scope plainly instead of overselling a small, narrow-domain result.",
            ],
          },
          {
            left: "Diagnosing a Slow Distributed Training Job — Capstone Project",
            right: "2026",
            sub: "GPU Computing — capstone",
            bullets: [
              "Triaged a 4-GPU DDP training job running at roughly twice its normal per-epoch time using a strictly cheap-to-expensive diagnostic order instead of guessing: GPU utilization via nvidia-smi dmon first, then inter-batch timing to rule out a CPU-bound data loader, then NCCL transport logs to confirm the all-reduce was still routed over NVLink rather than a slower fallback, and only then Nsight Systems/Nsight Compute kernel profiling once every cheaper check was exhausted.",
            ],
          },
          {
            left: "4-Node Distributed Training Cluster — Capstone Project",
            right: "2026",
            sub: "Distributed Training Infrastructure — capstone",
            bullets: [
              "Installed the Kubeflow Training Operator and submitted a real multi-node PyTorchJob (1 master, 3 workers), verifying genuinely distributed execution — a distinct rank 0-3 and a world size of 4 on every pod — from the Training-Operator-injected torchrun environment variables rather than four accidental single-process copies.",
              "Wrapped the model in FSDP and checkpointed and resumed training with torch.distributed.checkpoint against S3-compatible object storage, then wrote an architecture-decision-record-style reflection on what would break first — storage choice, checkpoint frequency, network topology, or namespace structure — at 10x and 100x the cluster's scale.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  "ml-systems-engineer": {
    levelLabel: "ML Systems Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "ML Systems Engineer who can take a trained model all the way from raw GPU hardware to a deployed, benchmarked " +
      "serving endpoint: distributed-systems fundamentals and real PyTorch fluency, GPU-level performance diagnosis, " +
      "the cluster infrastructure that runs distributed training, the platform layer a company builds once it has " +
      "more than one model in production, and finally inference and model serving. Built on a prior DevOps Engineer " +
      "foundation in Linux, Docker, Kubernetes, and Terraform. Five connected capstones — a from-scratch Transformer, " +
      "a diagnosed multi-GPU training slowdown, a genuine multi-node training cluster, a full ML platform designed " +
      "for a company that had outgrown ad hoc tooling, and a deployed, benchmarked vLLM serving stack — stand behind " +
      "every skill claimed here. Bringing that full hardware-to-serving pipeline to an ML Infrastructure Engineer, AI " +
      "Infrastructure Engineer, ML Systems Engineer, or ML Platform Engineer role.",
    skills: [
      "Distributed Systems Fundamentals (Availability, Scalability, Reliability, Latency vs. Throughput)",
      "Consistency, Messaging & Failure Handling (CAP Theorem, Eventual Consistency, Message Queues, Idempotent Retries, Backpressure)",
      "PyTorch Fundamentals (Tensors, Autograd, Training Loops, Datasets/DataLoaders, Checkpointing, Debugging)",
      "Neural Network Design & Training Practice (nn.Module, Optimizers, Regularization, LR Schedules, Hyperparameter Search)",
      "Transformers From Scratch (Self-/Cross-/Multi-Head Attention, Positional Encoding, Decoder-Only Architectures, Sampling Strategies)",
      "Scaling & Debugging Training Runs (Mixed Precision, Gradient Accumulation, DDP, torch.compile, Loss-Curve Literacy, Reproducibility)",
      "GPU Architecture, CUDA & Performance Profiling (SMs, Memory Hierarchy, Tensor Cores, nvidia-smi, Nsight Systems/Compute)",
      "PyTorch Device & Memory Management (Device Placement, Pinned Memory, CUDA Graphs, Out-of-Memory Diagnosis)",
      "Multi-GPU & Cluster GPU Management (NVLink/PCIe Topology, Kubernetes GPU Scheduling, MIG & Time-Slicing)",
      "Distributed Training Networking (NCCL, AllReduce/AllGather, InfiniBand vs. Ethernet, Bottleneck Diagnosis)",
      "Training Job Orchestration at Scale (Kubernetes & Slurm Job Scheduling, Gang Scheduling, Cluster Autoscaling)",
      "Fault-Tolerant, Cost-Aware Training Infrastructure (Checkpoint Storage Strategies, Elastic Training, Spot/Preemptible Instances, Cost Attribution)",
      "High-Throughput Data Loading & Storage at Scale (Sharded Datasets, Object/Block/Parallel Filesystems, Caching, Observability)",
      "Kubernetes, Docker, Terraform & Cloud Fundamentals (DevOps Engineer Foundation)",
      "ML Platform Architecture & Lifecycle (Feature Stores, Experiment Tracking, Model Registries, Lineage, Data/Model Versioning)",
      "ML Pipelines, CI/CD & Deployment Infrastructure (Continuous Training, Model Validation Gates, Canary/Blue-Green Deployment, Rollback)",
      "ML Platform Reliability (SLOs & Error Budgets, On-Call, Incident Response for a Degraded Model)",
      "LLM Inference Fundamentals & Serving Frameworks (Latency vs. Throughput, Batching, Prefill/Decode, the KV Cache, PagedAttention, vLLM, TensorRT-LLM, Triton Inference Server)",
      "Inference Optimization & Scaling (Quantization, Pruning, Knowledge Distillation, Continuous Batching, Speculative Decoding, Autoscaling, Load Balancing)",
      "Serving Benchmarking, SLOs & Cost Management (Throughput/TTFT/TPOT/Latency Percentiles, Capacity Planning, Cost-per-Token Economics)",
    ],
    tools:
      "Python, PyTorch, CUDA, nvidia-smi, Nsight Systems/Compute, NCCL, Kubeflow Training Operator, torchrun, FSDP, " +
      "torch.distributed.checkpoint, Kubernetes (AKS/EKS), Slurm (overview), Docker, Terraform, S3-compatible object " +
      "storage (MinIO), Prometheus/Grafana, Feast, MLflow, Weights & Biases (overview), GitHub Actions (ML CI/CD), " +
      "vLLM, TensorRT-LLM (overview), Triton Inference Server (overview)",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "AI Infrastructure / ML Systems Engineer Destination · Atlanta, GA",
            bullets: [
              "Completed the full DevOps Engineer apprenticeship beforehand (Jan 2026 – Jun 2026) — Linux administration, Docker, Kubernetes (AKS/EKS), Terraform, and CI/CD — then this destination's full arc: distributed-systems fundamentals, real PyTorch fluency built up to a from-scratch Transformer, GPU computing, distributed training infrastructure, ML platform engineering, and inference and model serving, each layer building directly on the one before it without re-teaching it.",
              "Built a distributed-systems vocabulary first: availability, scalability, reliability, latency vs. throughput, eventual consistency, the CAP theorem applied per piece of data, message queues and their delivery guarantees, idempotent retries, and backpressure — synthesized in a case study designing an online checkout system with different CAP trade-offs for inventory and payment state.",
              "Built real PyTorch fluency from tensors and autograd through a full training loop, then neural network design and training practice (optimizers, regularization, learning-rate schedules, hyperparameter search), CNNs and transfer learning, and sequence models and attention through \"Attention Is All You Need\"; built a decoder-only Transformer from scratch, including its training loop and greedy/top-k/top-p sampling, and scaled training with mixed precision, gradient accumulation, DistributedDataParallel, and torch.compile.",
              "Learned GPU architecture and CUDA fundamentals (streaming multiprocessors, the memory hierarchy, Tensor Cores, the CUDA programming model), GPU performance diagnosis with nvidia-smi and Nsight Systems/Compute, GPU usage inside PyTorch (device placement, pinned memory, AMP, CUDA graphs, OOM diagnosis), and multi-GPU topology and cluster GPU scheduling with MIG and time-slicing.",
              "Took the infrastructure view of distributed training — networking (NCCL, AllReduce/AllGather, InfiniBand vs. Ethernet), job orchestration with Kubernetes and Slurm, fault tolerance and checkpointing at scale, high-throughput data loading and storage, and monitoring and cost management for training clusters.",
              "Learned the platform layer a company builds once it has more than one model in production — feature stores (Feast) that kill training/serving skew by defining a feature once, experiment tracking and model registries (MLflow, Weights & Biases) as infrastructure rather than a habit, ML pipelines and orchestration, model deployment infrastructure (packaging, CI/CD for ML with a continuous-training stage and a model-validation gate, canary and shadow deployments, rollback, approval gates, blue-green deployment), data and model versioning and auditability, and platform reliability (SLOs and error budgets, on-call, incident response when a model degrades).",
              "Closed with inference and model serving: inference fundamentals (latency vs. throughput, the request lifecycle, static vs. dynamic batching, prefill vs. decode, measuring performance), serving frameworks (vLLM, TensorRT-LLM, Triton Inference Server), model optimization for inference (quantization including INT8/INT4, pruning, knowledge distillation), the KV cache and LLM-specific serving techniques (PagedAttention, continuous batching, speculative decoding, prompt caching), scaling inference (autoscaling, load balancing, multi-model serving, routing and fallback), and cost and performance tuning (cost-per-token economics, benchmarking, SLOs, capacity planning).",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Anchorline Systems Serving Stack — Capstone Project",
            right: "2026",
            sub: "Inference & Model Serving — destination capstone",
            bullets: [
              "Turned an internal-tool brief — \"something that feels instant, doesn't blow up our cloud bill, and we can run ourselves\" — into concrete serving requirements for a fictional logistics-software company's internal support assistant: a p99 time-to-first-token target around 500ms, support for roughly 50 concurrent engineers at a bursty peak, a hard single-GPU cost ceiling, and a low-thousands-token context need.",
              "Selected Llama 3.1 8B Instruct over Mistral 7B Instruct v0.3 and Mixtral 8x7B Instruct on license terms, context window, and single-24GB-class-GPU fit, then deployed it behind vLLM's OpenAI-compatible server with a deliberate flag set — bfloat16 weights, an 8K max-model-len context cap, 90% GPU-memory utilization, a 64-sequence batch ceiling, and chunked prefill — built on vLLM's default continuous batching and PagedAttention KV-cache management, and smoke-tested the endpoint's chat-completions response before routing real traffic to it.",
              "Benchmarked the deployment with vLLM's own `vllm bench serve` load-testing tool against traffic shaped like the real workload, read throughput, TTFT, TPOT, and p50/p99 latency to find the deployment's actual bottleneck — a p99 time-to-first-token gap under burst load caused by request queuing, not a slow model — and closed most of that gap with a single-variable tuning loop that raised the batch ceiling (`--max-num-seqs`) and the GPU-memory budget rather than guessing at a fix.",
              "Wrote a five-section stakeholder write-up (executive summary, methodology, results, trade-offs considered and rejected, recommendation) that named the deployment's one remaining open risk plainly — a single point of failure until autoscaling and load balancing are layered on top — instead of presenting the capstone as a finished, risk-free system.",
            ],
          },
          {
            left: "Northline Analytics ML Platform Design — Capstone Project",
            right: "2026",
            sub: "ML Infrastructure & Platform Engineering — capstone",
            bullets: [
              "Designed a full ML platform for a fictional company that had outgrown ad hoc tooling at 15 production models — a central feature store separating low-latency online lookups from batch offline training reads, a shared experiment-tracking system and model registry as the single source of truth for what's actually live, and feature/data lineage traceable from a bad prediction back to the exact data and code that produced it.",
              "Added a deployment and reliability layer — canary deployments behind a deployment approval gate (so the kind of missing-feature regression that had caused a real four-hour outage would hit 1% of traffic instead of 100%), a rehearsed rollback strategy, per-model SLOs and error budgets sized to each model's actual risk, and an on-call rotation with runbooks to replace an ad hoc \"whoever the CEO messages\" chain.",
              "Sequenced the rollout by which pain point was costing the most — model registry first, feature store second, canary deployments and SLOs third, on-call fourth, full pipeline orchestration and audit infrastructure last — and wrote the design up with its real trade-offs named explicitly, including the feature store's added latency and single point of failure and canary deployments trading release speed for safety, rather than presenting it as a free win.",
            ],
          },
          {
            left: "4-Node Distributed Training Cluster — Capstone Project",
            right: "2026",
            sub: "Distributed Training Infrastructure — capstone",
            bullets: [
              "Installed the Kubeflow Training Operator and submitted a real multi-node PyTorchJob (1 master, 3 workers), verifying genuinely distributed execution from the Training-Operator-injected torchrun environment variables rather than four accidental single-process copies, then wrapped the model in FSDP and checkpointed and resumed it with torch.distributed.checkpoint against S3-compatible object storage.",
            ],
          },
          {
            left: "Diagnosing a Slow Distributed Training Job — Capstone Project",
            right: "2026",
            sub: "GPU Computing — capstone",
            bullets: [
              "Triaged a 4-GPU DDP training job running at roughly twice its normal per-epoch time using a strictly cheap-to-expensive diagnostic order — GPU utilization, inter-batch timing, NCCL transport logs, then Nsight Systems/Compute kernel profiling only once everything cheaper was ruled out.",
            ],
          },
          {
            left: "Tiny GPT — Decoder-Only Transformer Capstone",
            right: "2026",
            sub: "Deep Learning & PyTorch — capstone",
            bullets: [
              "Built a character-level tokenizer and trained a from-scratch decoder-only Transformer on the Tiny Shakespeare corpus, then evaluated it honestly with held-out loss, perplexity, and sampled generations, and documented it in a four-section model card.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
