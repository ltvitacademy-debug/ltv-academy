# Putting It Together: a Training Config Walkthrough

This chapter has covered six separate techniques: data parallelism, tensor and pipeline parallelism, ZeRO/FSDP sharding, activation checkpointing, and the communication costs that decide how they get combined. None of them live in isolation in a real training job -- they show up together as settings in a single configuration file. This closing lesson walks through one real, complete DeepSpeed configuration line by line, so every lever from this chapter is visible in the one place it actually gets used.

## What you'll learn

- How to read a real DeepSpeed JSON config end to end
- Where each of this chapter's techniques shows up as a concrete field
- How batch size, gradient accumulation, and replica count relate inside one config
- Why mixed precision (`bf16`) sits alongside the parallelism settings, not separately
- What's still missing from this picture -- the subject of the next chapter

## A complete config, annotated

```json
{
  "train_micro_batch_size_per_gpu": 4,
  "gradient_accumulation_steps": 8,
  "gradient_clipping": 1.0,

  "bf16": { "enabled": true },

  "zero_optimization": {
    "stage": 3,
    "offload_optimizer": { "device": "cpu" },
    "offload_param": { "device": "cpu" },
    "overlap_comm": true,
    "contiguous_gradients": true
  },

  "activation_checkpointing": {
    "partition_activations": true,
    "cpu_checkpointing": false,
    "contiguous_memory_optimization": true
  },

  "optimizer": {
    "type": "AdamW",
    "params": { "lr": 1e-5, "betas": [0.9, 0.95], "weight_decay": 0.1 }
  }
}
```

This is a real, valid DeepSpeed configuration shape (every top-level key here -- `train_micro_batch_size_per_gpu`, `gradient_accumulation_steps`, `zero_optimization`, `activation_checkpointing`, `bf16`, `optimizer` -- matches DeepSpeed's documented config schema).

## Walking through what each section does

- **`train_micro_batch_size_per_gpu` and `gradient_accumulation_steps`** -- this is Lesson 28's global batch size, made concrete: each GPU processes 4 examples at a time, accumulates gradients over 8 steps before synchronizing, so the effective batch size per data-parallel replica is 32 (before multiplying by however many replicas the job launches with).
- **`bf16.enabled`** -- mixed precision training in bfloat16, reducing memory for activations and compute time, independent of (but combined with) every parallelism setting around it.
- **`zero_optimization.stage: 3`** -- Lesson 30's ZeRO stage 3: no GPU holds the full model at rest; parameters are gathered on demand. The `offload_optimizer`/`offload_param` fields push the sharded state further out to CPU memory, for when even sharded GPU memory isn't enough.
- **`activation_checkpointing`** -- Lesson 31's technique, turned on as a config block rather than hand-wrapped code, recomputing activations during backward instead of storing them.
- **`optimizer`** -- the AdamW hyperparameters themselves, set conservatively (Lesson 27's forgetting discussion from Chapter 4 applies just as much here as it did to single-GPU fine-tuning).

## What this config doesn't specify

Notice what's absent: this file says nothing about tensor-parallel degree or pipeline-parallel degree, because those are a Megatron-DeepSpeed-level concern layered on top of this DeepSpeed config, set as separate launch-time arguments (as sketched in Lesson 32) rather than JSON fields here. A config like this one, on its own, assumes the model's layers aren't being split across devices at all -- just sharded via ZeRO-3 and replicated via ordinary data parallelism. Adding tensor or pipeline parallelism on top would mean this config sits inside a larger launch configuration specifying those degrees too.

## Launching it

```bash
deepspeed --num_gpus=8 train.py --deepspeed_config ds_config.json
```

Every GPU in the job reads the same config file; `--num_gpus` sets how many data-parallel replicas (each internally ZeRO-3-sharded) actually run.

## Key terms

- **DeepSpeed config** -- a single JSON file where every parallelism, sharding, precision, and optimizer setting for a training job is declared together
- **`train_micro_batch_size_per_gpu`** -- the per-GPU batch size before gradient accumulation or replica count is factored in
- **`zero_optimization.stage`** -- selects which ZeRO stage (1, 2, or 3) shards which state
- **Mixed precision (`bf16`)** -- training in a reduced-precision format, combined with, not instead of, the chapter's parallelism techniques
