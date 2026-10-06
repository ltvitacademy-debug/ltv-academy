# Lesson 10 — Multi-Stage Builds for Smaller Images

**Chapter 2 · Containerizing AI Applications · Lesson 10 of 25**

## What you'll learn

- Why a normal build leaves compilers, build tools, and source archives
  sitting in the final image, unused
- How `FROM ... AS` names a build stage, and how `COPY --from=` pulls
  only specific files out of it
- A real two-stage Dockerfile for a Python AI app, and exactly what gets
  left behind
- Why a smaller final image matters more than it sounds like it should:
  faster pulls, a smaller attack surface, and less registry storage

## The problem: build tools that outlive the build

Some Python packages need to compile native code during installation —
common with AI/ML libraries that wrap C or Rust extensions. That means
the build needs a C compiler and headers. But a single-stage Dockerfile
bakes that entire compiler toolchain into the final image, even though
the running application never uses it again after `pip install` finishes:

```
FROM python:3.12
RUN apt-get update && apt-get install -y build-essential
COPY requirements.txt .
RUN pip install -r requirements.txt   # compiler toolchain now permanent
COPY app/ ./app/
CMD ["python", "app/main.py"]
```

Every container built from this image carries a full compiler toolchain
it will never run — larger pulls, a larger attack surface, and wasted
registry storage (Lesson 6) for something that did its job during the
build and then just sits there.

## The fix: separate stages

`FROM ... AS <name>` names a stage. Later stages can `COPY --from=<name>`
to pull specific files out of an earlier one, without carrying anything
else from it forward:

```
# Stage 1: build — has the compiler, discarded after this stage
FROM python:3.12 AS builder
RUN apt-get update && apt-get install -y build-essential
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# Stage 2: runtime — slim, no compiler, just the installed packages
FROM python:3.12-slim
COPY --from=builder /install /usr/local
COPY app/ ./app/
CMD ["python", "app/main.py"]
```

The `builder` stage's compiler, its apt package cache, and every
intermediate file never make it into the final image — only the
`/install` directory `COPY --from=builder` explicitly asked for does.
Docker discards the rest of that stage once the build finishes.

## What this actually saves

```
Single-stage image:   python:3.12 + build-essential + deps + app  ~1.2GB
Multi-stage image:    python:3.12-slim + deps (copied) + app       ~400MB
```

The exact numbers depend on the dependencies, but the pattern holds: a
build toolchain is often hundreds of megabytes of something the running
container will never execute. Smaller images pull faster — which matters
directly for Chapter 4's autoscaling, where a new container instance's
startup time is gated on how fast its image can be pulled.

## Key terms

| Term | Meaning |
|---|---|
| `FROM ... AS <name>` | Names a build stage so a later stage can reference it |
| `COPY --from=<name>` | Pulls specific files from a named stage into the current one |
| Builder stage | Has build tools (compilers, headers); discarded after the build |
| Runtime stage | The final, slim stage — what actually ships and runs |

## Check yourself

You're ready for Lesson 11 when you can explain: in the two-stage
Dockerfile above, if you accidentally forget the `--from=builder` on the
`COPY` line in Stage 2, what actually happens when you try to build — and
why does Docker catch that mistake instead of silently producing a broken
image?
