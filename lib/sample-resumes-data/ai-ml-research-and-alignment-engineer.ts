import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "ai-research-engineer": {
    levelLabel: "AI Research Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "AI Research Engineer trained from a working AI Engineer foundation into frontier-style model training: real PyTorch " +
      "fluency through a from-scratch decoder-only Transformer, the production-scale pipeline that actually pretrains, " +
      "fine-tunes, and evaluates large language models, the reinforcement-learning algorithms behind modern alignment " +
      "(PPO, reward modeling, RLHF, RLAIF, RL for reasoning), the alignment and interpretability techniques used to " +
      "evaluate and govern these models, and the research-engineering craft itself — reading and reproducing papers, " +
      "research codebases, experiment infrastructure, and research collaboration. Four capstones stand behind these " +
      "skills: a from-scratch tiny Transformer, a LoRA/QLoRA fine-tune of an open-weight model, a PPO agent trained " +
      "against a mechanically verifiable reward, and a reproduced-and-extended published ML result. Bringing that " +
      "foundation to an AI Research Engineer, ML Research Engineer, or AI Alignment Research Engineer role.",
    skills: [
      "PyTorch Fundamentals (Tensors, Autograd, nn.Module, Custom Layers, the Training Loop)",
      "Training Deep Networks in Practice (Normalization, LR Schedules, Gradient Clipping, Hyperparameter Search)",
      "Convolutional Networks & Transfer Learning (CNNs, Pooling, Pretrained Vision Models, Data Augmentation)",
      "Sequence Models & Attention (RNNs, LSTMs, Self/Cross/Multi-Head Attention, Positional Encoding)",
      "Building a Transformer From Scratch (Decoder-Only Architecture, Sampling Strategies, Tiny-LM Evaluation)",
      "Scaling PyTorch Training (Mixed Precision, Gradient Accumulation, DDP, torch.compile, Profiling)",
      "Experiment Tracking & Reproducibility (TensorBoard, Weights & Biases, Seeds/Determinism, Ablations)",
      "LLM Pretraining Pipelines (BPE Tokenization, Data Curation/Dedup/Filtering, Scaling Laws, Chinchilla Trade-off)",
      "Supervised Fine-Tuning & Parameter-Efficient Tuning (Chat Templates, LoRA, QLoRA, Catastrophic Forgetting)",
      "Distributed Training Systems (Data/Tensor/Pipeline Parallelism, ZeRO/FSDP, Activation Checkpointing, Fault Tolerance)",
      "LLM Evaluation (Perplexity, Standard Benchmarks, Human Eval, LLM-as-Judge, Benchmark Contamination)",
      "Reinforcement Learning Foundations (MDPs, Bellman Equation, Q-Learning, Policy Gradients, Actor-Critic)",
      "Proximal Policy Optimization (Trust Regions, Clipping Objective, GAE, Implementing & Debugging PPO)",
      "Reward Modeling & RLHF (Bradley-Terry Model, the Full RLHF Pipeline, KL Penalty, DPO, RLAIF/Constitutional AI)",
      "RL for Reasoning (Verifiable Rewards/RLVR, Outcome vs. Process Reward, Test-Time Compute)",
      "AI Alignment & Safety Evaluation (Specification Gaming, Goodhart's Law, Red-Teaming, Scalable Oversight)",
      "Mechanistic Interpretability (Sparse Autoencoders, Induction Heads, Activation Patching, Circuits)",
      "Model Behavior Research (Sycophancy, Deception & Situational Awareness, Calibration, Model/System Cards)",
      "Research Engineering Craft (Reading & Reproducing Papers, Research Codebases, Config Systems, Ablation Design)",
      "Research Infrastructure (Hyperparameter Sweeps, Slurm/Kubernetes for Research Jobs, Data Versioning)",
    ],
    tools:
      "Python, PyTorch, Hugging Face (transformers, trl, peft), Gymnasium, stable-baselines3, TensorBoard, Weights & " +
      "Biases, MLflow, Slurm, Kubernetes, Hydra, Git/GitHub",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "AI/ML Research Engineer & Alignment Engineer Destination — Research Engineer Core · Atlanta, GA",
            bullets: [
              "Completed the full AI Engineer apprenticeship beforehand — Python for AI applications, LLM APIs, retrieval-augmented generation, tool-using agents, cloud AI deployment, and AI security/evaluation; this destination adds the research-engineering-specific coursework below on top of that foundation, moving from applying LLMs to training and aligning them.",
              "Built real PyTorch fluency: tensors and autograd, the training loop from scratch, Datasets/DataLoaders, nn.Module and custom layers, regularization (weight decay, dropout, batch/layer normalization), learning rate schedules, gradient clipping, and hyperparameter search; worked through CNNs, pooling, transfer learning with pretrained vision models, and data augmentation; built sequence-model fluency (RNNs, LSTMs, the vanishing-gradient problem) through self-attention, cross-attention, multi-head attention, and positional encoding, reading \"Attention Is All You Need\" directly; then built a decoder-only Transformer block by block — residual connections, layer-norm placement, a training loop for a tiny GPT, sampling strategies (greedy, top-k, top-p), and honest evaluation — and scaled it with mixed precision, gradient accumulation, DistributedDataParallel, and torch.compile, while learning to read loss curves, catch silent training bugs, and track experiments with TensorBoard and Weights & Biases.",
              "Learned the modern three-stage LLM pipeline (pretrain, SFT, align) and what a real training run costs; built a BPE tokenizer and worked through data curation, deduplication, quality/toxicity filtering, sequence packing, and domain-weighted data mixtures; studied scaling laws and the Chinchilla params-vs-tokens trade-off, learning-rate warmup/decay at scale, and loss-spike diagnosis; built SFT datasets with chat templates and compared full fine-tuning against LoRA and QLoRA, including catastrophic forgetting; learned the parallelism strategies that make large training runs possible (data/tensor/pipeline parallelism, ZeRO/FSDP, activation checkpointing) and the ML-systems layer underneath them (checkpointing and fault tolerance at scale, straggler nodes, training-run observability); and evaluated LLMs properly — held-out perplexity, standard benchmarks and their limits, human evaluation design, LLM-as-judge, and benchmark contamination — plus enough inference basics (KV cache, quantization, serving-cost estimation) to hand a trained model to a serving team.",
              "Worked through RL foundations (MDPs, reward/policy/value functions, the Bellman equation, exploration vs. exploitation, on-policy vs. off-policy learning) and classic algorithms (dynamic programming, Monte Carlo methods, temporal-difference learning, Q-learning) before deep RL (DQN with experience replay and target networks, double/dueling DQN, policy-gradient methods, actor-critic, variance reduction with baselines); implemented and debugged Proximal Policy Optimization from scratch, including the clipping objective and Generalized Advantage Estimation, and built custom Gymnasium environments while learning to recognize reward hacking and reward-shaping pitfalls; trained reward models on human preference data with the Bradley-Terry model and watched for reward-model overoptimization; ran the full RLHF pipeline (SFT, then reward model, then PPO) including the KL penalty and its failure modes, compared it against Direct Preference Optimization, and covered RLAIF and Constitutional AI (self-critique and revision); and studied RL for reasoning — chain-of-thought reward signals, outcome vs. process reward, verifiable rewards (RLVR), and test-time compute — plus agentic and multi-step RL (tool use, multi-turn credit assignment, sparse long-horizon rewards).",
              "Studied why alignment is genuinely hard — specification gaming, reward hacking, Goodhart's law, outer vs. inner alignment, and why more capable models make it harder — then today's alignment techniques (an alignment lens on RLHF/RLAIF, Constitutional AI, red-teaming, adversarial prompting and jailbreaks, and the limits of refusal training); designed safety evaluations (capability vs. safety evals, dangerous-capability eval design, sandbagging, third-party evaluation) and studied scalable oversight (debate, recursive reward modeling, weak-to-strong generalization); built interpretability fluency from black-box methods (probing classifiers, the logit lens, attribution methods) into mechanistic interpretability (circuits, features and superposition, sparse autoencoders, attention-head analysis, induction heads, activation patching and causal tracing); covered model-behavior research (sycophancy, deception and situational awareness, truthfulness and calibration, hallucination from an alignment angle); and closed with governance — model and system cards, responsible scaling policies, and deployment safety cases.",
              "Learned the research-engineer role itself — distinct from research scientist and from product engineer — and the craft around it: reading an ML paper for its load-bearing claim, reproducing a published result and diagnosing when it doesn't reproduce, structuring a research codebase with config systems and testing strategies suited to research code, and research-team code-review and version-control norms; designed hyperparameter sweeps (random, grid, Bayesian) and used experiment-tracking infrastructure and compute scheduling across a team; worked with research infrastructure (job queues, Slurm, Kubernetes for research jobs, data versioning) and debugging practices specific to research code (silent vs. loud bugs, numerical issues, sanity checks, debugging a run that won't improve); practiced research collaboration (writing a technical research report, presenting negative results, giving and receiving research feedback); and closed with a capstone reproducing and then extending a real published ML result end to end, on a modest compute budget.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Tiny Transformer Language Model — Capstone Project",
            right: "2026",
            sub: "Deep Learning & PyTorch — capstone",
            bullets: [
              "Built and trained a small decoder-only Transformer language model from scratch on a character-level corpus, sizing context length, model depth, and batch size to what finishes on a single GPU, then evaluated it with held-out loss/perplexity and a qualitative error analysis of its generated text and wrote the pipeline up end to end.",
            ],
          },
          {
            left: "Fine-Tuned Open-Weight Model — Capstone Project",
            right: "2026",
            sub: "Advanced LLM Training & ML Systems — capstone",
            bullets: [
              "Selected an open-weight 1B-8B-parameter instruction model for a narrowly scoped, evaluable task, built a custom SFT dataset for it, ran a LoRA/QLoRA parameter-efficient fine-tune, and evaluated the result against the pre-fine-tune baseline with a hand-built task-specific eval set.",
            ],
          },
          {
            left: "PPO on a Verifiable-Reward Task — Capstone Project",
            right: "2026",
            sub: "Reinforcement Learning & RL for LLMs — capstone",
            bullets: [
              "Trained a small instruction-tuned open-weight model (0.5B-3B parameters) with PPO via Hugging Face TRL against a mechanically verifiable reward — exact-match math word-problem answer checking or unit-test code correctness — on a held-out task set set aside before training began, and evaluated the trained policy against the untrained baseline.",
            ],
          },
          {
            left: "Reproducing a Published ML Result — Capstone Project",
            right: "2026",
            sub: "AI Research Engineering — capstone",
            bullets: [
              "Selected a well-documented, modest-compute published result with released code and a single clear headline number, reproduced that number, then designed and ran a genuine extension beyond the original paper, writing the full comparison up against the paper's own claim.",
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
  "ai-ml-research-engineer": {
    levelLabel: "AI/ML Research Engineer",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "AI/ML Research Engineer who has carried three connected research projects through an entire taught research lab, " +
      "start to finish: an RL agent trained to choose SQL Server execution-plan hints, a reward model trained on human " +
      "preferences over messy customer data, and an RLHF-tuned natural-language-to-SQL assistant, followed by a real " +
      "activation-patching interpretability case study on that same assistant's weights. Built that research pipeline on " +
      "a foundation of real PyTorch fluency and a from-scratch Transformer, production-scale LLM pretraining and " +
      "fine-tuning, the RL algorithms behind modern alignment (PPO, reward modeling, RLHF, RLAIF, RL for reasoning), " +
      "alignment and interpretability evaluation, and the craft of research engineering itself — plus a prior AI Engineer " +
      "foundation. Every project write-up states its real result, including where it fell short. Bringing that full " +
      "research-to-presentation pipeline to an AI/ML Research Engineer, AI Alignment Research Engineer, or " +
      "Reinforcement Learning Research Engineer role.",
    skills: [
      "PyTorch Fundamentals (Tensors, Autograd, nn.Module, Custom Layers, the Training Loop)",
      "Building a Transformer From Scratch (Decoder-Only Architecture, Sampling Strategies, Tiny-LM Evaluation)",
      "Scaling PyTorch Training (Mixed Precision, Gradient Accumulation, DDP, torch.compile, Profiling)",
      "LLM Pretraining Pipelines (BPE Tokenization, Data Curation/Dedup/Filtering, Scaling Laws, Chinchilla Trade-off)",
      "Supervised Fine-Tuning & Parameter-Efficient Tuning (Chat Templates, LoRA, QLoRA, Catastrophic Forgetting)",
      "Distributed Training Systems (Data/Tensor/Pipeline Parallelism, ZeRO/FSDP, Activation Checkpointing)",
      "LLM Evaluation (Perplexity, Standard Benchmarks, Human Eval, LLM-as-Judge, Benchmark Contamination)",
      "Reinforcement Learning Foundations Through Deep RL (MDPs, Q-Learning, DQN, Policy Gradients, Actor-Critic)",
      "Proximal Policy Optimization (Trust Regions, Clipping Objective, GAE, Custom Gymnasium Environments)",
      "Reward Modeling & Pairwise Preference Learning (Bradley-Terry Model, DistilBERT, Adversarial Evaluation)",
      "RLHF & RLAIF (SFT → Reward Model → PPO, KL Penalty, Execution-Correctness Rewards, Constitutional AI)",
      "RL for Reasoning (Verifiable Rewards/RLVR, Outcome vs. Process Reward, Test-Time Compute)",
      "AI Alignment & Safety Evaluation (Specification Gaming, Goodhart's Law, Red-Teaming, Scalable Oversight)",
      "Mechanistic Interpretability (Activation Patching, Causal Tracing, Circuits, Induction Heads)",
      "SQL-Grounded Research (AdventureWorks2012, Northwind, pyodbc, Execution-Plan Analysis)",
      "Research Engineering Craft (Reading & Reproducing Papers, Research Codebases, Hyperparameter Sweeps)",
      "Research Communication (Dated Research Notebooks, Claim/Method/Result/Limitation, Claim/Evidence/Confidence/Falsifier)",
      "Research Portfolio Assembly & Technical Presentation",
      "Git/GitHub for Reproducible Research",
    ],
    tools:
      "Python, PyTorch, Hugging Face (transformers, trl, peft), Gymnasium, stable-baselines3, Qwen2.5-Coder, " +
      "DistilBERT, pyodbc, SQL Server (AdventureWorks2012, Northwind), TensorBoard, Weights & Biases, Git/GitHub",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "AI/ML Research Engineer & Alignment Engineer Destination · Atlanta, GA",
            bullets: [
              "Completed the full AI Engineer apprenticeship beforehand, then this destination's five research-engineering courses, before the taught research lab capstone below.",
              "Built real PyTorch fluency — the training loop, nn.Module, regularization, CNNs, sequence models and attention — through building a decoder-only Transformer from scratch, then learned how production-scale LLMs are actually pretrained (tokenization, data curation and deduplication, scaling laws, the Chinchilla trade-off) and fine-tuned (chat templates, LoRA/QLoRA, catastrophic forgetting), scaled with distributed-training strategies (data/tensor/pipeline parallelism, ZeRO/FSDP) and ML-systems practices (fault tolerance, observability), and evaluated properly (held-out perplexity, benchmarks, LLM-as-judge, benchmark contamination).",
              "Worked from RL foundations and classic algorithms through deep RL and Proximal Policy Optimization, implemented and debugged from scratch with Generalized Advantage Estimation and custom Gymnasium environments; trained reward models on human preference data with the Bradley-Terry model; ran the full RLHF pipeline (SFT, reward model, PPO) including the KL penalty and its failure modes, compared it against DPO, and covered RLAIF, Constitutional AI, and RL for reasoning (verifiable rewards, outcome vs. process reward, test-time compute).",
              "Studied why alignment is hard (specification gaming, reward hacking, Goodhart's law) and today's alignment techniques (red-teaming, adversarial prompting, Constitutional AI), designed safety evaluations and studied scalable oversight (debate, recursive reward modeling, weak-to-strong generalization), and built interpretability fluency from probing classifiers and the logit lens into mechanistic interpretability — circuits, superposition, sparse autoencoders, induction heads, and activation patching/causal tracing — plus model-behavior research (sycophancy, deception, calibration) and governance (model/system cards, responsible scaling policies).",
              "Learned the research-engineer role and its craft — reading and reproducing ML papers, structuring research codebases and config systems, designing hyperparameter sweeps, using experiment-tracking infrastructure, working with research infrastructure (Slurm, Kubernetes for research jobs), and debugging research code without ground truth — then practiced research collaboration (technical reports, presenting negative results) and the research-to-production handoff.",
              "Joined the LTV AI Research Lab, this destination's taught capstone: kept a dated research notebook from the first experiment — including dead ends — across three connected, SQL-and-data-systems-grounded research projects plus an interpretability case study; wrote every project up in the lab's own claim/method/result/limitation structure (claim/evidence/confidence/falsifier for the interpretability finding), reporting every unflattering number alongside the flattering one; then assembled all four write-ups into a single GitHub portfolio repository and practiced presenting the findings to a technical audience inside a ten-minute talk budget, with honest, prepared answers for baseline, sample-size, and falsifiability questions.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "RL for SQL Query Optimization — Research Lab Project 1",
            right: "2026",
            sub: "LTV AI Research Lab — Research Lab Capstone",
            bullets: [
              "Framed execution-plan hint selection for a parameterized four-table AdventureWorks2012 join (sales order header/detail, product, customer) as RL: five discrete hint actions (no hint, hash join, loop join, merge join, force order) over a two-feature observation of normalized date-range width and territory size, trained with stable-baselines3 PPO (100,000 timesteps across 4 parallel environments) against a custom gymnasium.Env that executes hinted SQL via pyodbc and captures logical reads via SET STATISTICS IO, with reward defined as the fractional reduction in logical reads against the optimizer's own fresh no-hint baseline each episode.",
              "Evaluated on 240 held-out (date-range, territory) combinations: the trained agent matched or beat SQL Server's own default execution plan 78% of the time, averaging a 34% reduction in logical reads on the episodes it won — while naming a real boundary-case regression where the agent still lost to the optimizer's default near the 10-18 day narrow/wide date-range transition, instead of reporting only the win rate.",
            ],
          },
          {
            left: "Reward Modeling for Data Quality — Research Lab Project 2",
            right: "2026",
            sub: "LTV AI Research Lab — Research Lab Capstone",
            bullets: [
              "Reframed \"which data cleanup is better\" as a pairwise-preference problem over corrupted Northwind Customers rows (inconsistent phone formatting, country-name variants, company-name casing noise, malformed postal codes), building a ~260-pair {chosen, rejected} preference dataset from two rule-based cleaners rated by a human against a no-information-loss-first rubric, and training a DistilBERT-based reward model on the pairwise Bradley-Terry loss.",
              "Reached 83% held-out preference accuracy on ordinary pairs, then ran a deliberately adversarial evaluation built to separate surface formatting polish from genuine information preservation and found accuracy collapsed to 48% — near chance — reporting the surface-polish bias plainly as the project's real limitation rather than leading with only the flattering number.",
            ],
          },
          {
            left: "RLHF for a Database Assistant (\"SQL Pete\") — Research Lab Project 3",
            right: "2026",
            sub: "LTV AI Research Lab — Research Lab Capstone",
            bullets: [
              "Fine-tuned Qwen2.5-Coder-1.5B-Instruct into \"SQL Pete,\" a natural-language-to-SQL assistant scoped to the Northwind and AdventureWorks2012 schemas: a LoRA SFT pass on roughly 2,000 (question, gold SQL) pairs, then an RLAIF-style RLHF run via Hugging Face TRL's PPOTrainer using a programmatic execution-correctness reward (+1.0/+0.3/-0.3/-1.0), with a hard pre-execution safety filter rejecting any non-SELECT statement before it ever reached the reward function.",
              "Measured held-out execution accuracy and schema-hallucination rate for the SFT-only checkpoint vs. the RLHF checkpoint, and named the limitation plainly in the write-up: the safety filter is a hard constraint SQL Pete was never allowed to violate, not a behavior it learned through reward.",
            ],
          },
          {
            left: "Interpretability Case Study: A Copying Circuit in SQL Pete",
            right: "2026",
            sub: "LTV AI Research Lab — interpretability case study",
            bullets: [
              "Ran activation-patching experiments against SQL Pete's own weights — a layer sweep, then a head sweep — on minimal pairs isolating a schema-hallucination failure, then corroborated the patching result with an attention-pattern check on the identified head, writing the finding up in claim/evidence/confidence/falsifier form rather than the training write-ups' claim/method/result/limitation structure.",
              "Stated the finding's actual scope plainly: a causal result on a handful of constructed minimal pairs, one suggestive circuit rather than a full explanation of the behavior, and explicitly no claim about whether larger models resolve the same behavior the same way.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/research-lab-portfolio",
            right: "2026",
            sub: "Research Lab Capstone — public research portfolio repository",
            bullets: [
              "Laid the repo out the way the capstone's own portfolio-assembly lesson teaches: a root README summarizing all four findings and their headline numbers in one page, one folder per project (writeup.md plus notebook.ipynb), and a standalone write-up for the interpretability finding — skimmable in minutes, not hours.",
              "Published runnable code with every real limitation section intact — the query-optimization boundary-case regression, the reward model's surface-polish bias, the RLHF hallucination-rate finding, and the interpretability finding's named falsifier — so a reviewer can check every headline number directly instead of taking it on faith.",
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
