# Profiling a Training Run

You've now got mixed precision, gradient accumulation, multi-GPU training, and `torch.compile` all available to you — but applying any of them without measuring first is guesswork. Before you reach for another optimization, this lesson shows you how to actually find out where a training step spends its time, using PyTorch's built-in profiler, so Chapter 7 ends with a way to verify everything else in it actually helped.

## What you'll learn

- How `torch.profiler.profile` wraps a block of training steps and records what happened
- The difference between CPU time and CUDA time in a profiler report
- How to read the summary table to find your real bottleneck
- How to export a trace for visual inspection in TensorBoard

## Wrapping a training loop in the profiler

`torch.profiler.profile` is a context manager, similar in spirit to `torch.autocast`. You choose which activities to record — CPU, CUDA, or both — step the profiler once per training iteration, and it builds up a record of every operation that ran.

```python
from torch.profiler import profile, ProfilerActivity

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    record_shapes=True,
) as prof:
    for step, (inputs, targets) in enumerate(train_loader):
        output = model(inputs)
        loss = loss_fn(output, targets)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        prof.step()
        if step >= 5:
            break
```

Calling `prof.step()` at the end of each iteration tells the profiler a step boundary just happened — it's what lets more advanced features like scheduled warmup/skip windows work correctly.

## Reading the summary table

Once the `with` block exits, `prof.key_averages()` gives you an aggregated view, one row per operation, which you can print as a readable table sorted by whichever time column matters most to you.

```python
print(prof.key_averages().table(
    sort_by="cuda_time_total",
    row_limit=10,
))
```

CPU time is time spent in Python and in launching kernels; CUDA time is time the GPU actually spent executing. If your top rows by `cuda_time_total` are dominated by `aten::matmul` or your convolution kernels, your model is compute-bound — mixed precision and `torch.compile` are exactly the right tools. If instead CPU time dominates and the GPU rows look small, your bottleneck is somewhere else entirely — often data loading, not the model at all.

## A common surprise: the data loader

It's easy to assume the model is always the bottleneck. In practice, a `DataLoader` with too few workers, or a dataset doing expensive preprocessing per sample, routinely starves the GPU — the GPU finishes a step and then sits idle waiting for the next batch. The profiler makes this visible: a profile dominated by CPU time with large GPU idle gaps between steps is a data-loading problem, not a model problem, and no amount of `torch.compile` or mixed precision will fix it.

## Exporting a trace for visual inspection

For a deeper look than the summary table gives you, you can export a trace and open it in TensorBoard, or point the profiler at a trace handler directly:

```python
from torch.profiler import tensorboard_trace_handler

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    on_trace_ready=tensorboard_trace_handler("./log/profiler"),
) as prof:
    for step, (inputs, targets) in enumerate(train_loader):
        output = model(inputs)
        loss = loss_fn(output, targets)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        prof.step()
```

That gives you a timeline view — which operation ran on which stream, and exactly where any gaps are — rather than just an aggregated table.

## Key terms

| Term | Meaning |
|---|---|
| `torch.profiler.profile` | Context manager that records CPU and/or CUDA activity during training steps |
| `ProfilerActivity` | Which hardware to record (`CPU`, `CUDA`) |
| `prof.step()` | Marks a step boundary inside the profiled region |
| `key_averages().table()` | Aggregated, sortable summary of time spent per operation |
| GPU idle gap | Time the GPU spends waiting, often a sign of a data-loading bottleneck, not a compute one |
