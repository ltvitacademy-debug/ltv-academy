# Lesson 11 — GPU-Enabled Containers

**Chapter 2 · Containerizing AI Applications · Lesson 11 of 25**

## What you'll learn

- Why a container doesn't get GPU access by default, even on a machine
  that has one
- The NVIDIA Container Toolkit, and the one thing it actually does
- The `--gpus` flag, and the CUDA-enabled base image it pairs with
- How to confirm a container can genuinely see the GPU, instead of
  assuming it

## Why GPU access isn't automatic

Lesson 1 established that a container shares the host's kernel but has
its own isolated view of everything else — and a GPU is exactly the kind
of hardware that isolation hides by default. Installing CUDA inside an
image isn't enough on its own; the container also needs an explicit path
to the host's actual GPU driver, which is what the **NVIDIA Container
Toolkit** provides. It doesn't replace Docker — it's a plugin that teaches
the container runtime how to pass specific GPU devices through to a
container that asks for them.

## The base image has to match

A GPU-enabled image starts from an NVIDIA CUDA base instead of a plain
`python:3.12-slim` — it needs the CUDA runtime libraries your AI
framework's GPU build was compiled against:

```
FROM nvidia/cuda:12.4.1-runtime-ubuntu22.04
RUN apt-get update && apt-get install -y python3 python3-pip
COPY requirements.txt .
RUN pip install -r requirements.txt   # torch built for CUDA 12.4
COPY app/ ./app/
CMD ["python3", "app/main.py"]
```

A mismatch here — a `torch` build compiled for CUDA 12.1 running against
a 12.4 base image's driver expectations — is one of the most common
"works on my machine, not in the container" failures in GPU workloads.

## Asking for the GPU at runtime

```
docker run --gpus all -p 8000:8000 ai-inference-gpu:1.0
docker run --gpus device=0 ai-inference-gpu:1.0  # just the first GPU
```

Without `--gpus`, the container starts fine — it just can't see any GPU
at all, and your framework silently (or not so silently) falls back to
CPU. `--gpus` is the runtime counterpart to Lesson 4's `-p` and `-v`: a
flag that grants access to specific host hardware a container can't reach
on its own.

## Confirming it's actually working

Don't assume — check, from inside the container:

```
docker run --gpus all nvidia/cuda:12.4.1-runtime-ubuntu22.04 nvidia-smi
```

`nvidia-smi` is the same diagnostic tool you'd run directly on the host;
running it inside a container is proof the GPU passthrough actually
worked, not just that the flag was accepted. For your own app, the
equivalent check is calling `torch.cuda.is_available()` and confirming it
returns `True` rather than quietly training or inferring on CPU.

## Key terms

| Term | Meaning |
|---|---|
| NVIDIA Container Toolkit | Lets the container runtime pass host GPU devices through to a container |
| CUDA base image | A base image with CUDA runtime libraries, matched to your framework's GPU build |
| `--gpus all` / `--gpus device=0` | Grants a container access to all, or one specific, host GPU(s) |
| `nvidia-smi` | The diagnostic command that confirms GPU passthrough is actually working |

## Check yourself

You're ready for Chapter 3 when you can explain: a container built from
a GPU-enabled image starts successfully and the app runs without
crashing, but every prediction is unusually slow. What specifically would
you check first to confirm whether it's actually using the GPU, and what
command would you run to find out?
