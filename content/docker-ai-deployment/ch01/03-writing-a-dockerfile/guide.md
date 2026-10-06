# Lesson 3 — Writing a Dockerfile

**Chapter 1 · Docker Fundamentals · Lesson 3 of 25**

## What you'll learn

- The handful of Dockerfile instructions that cover almost every real
  image: `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `EXPOSE`, `CMD`
- Why instruction order determines what gets rebuilt, and why that order
  matters more than it looks like it should
- The difference between `CMD` and `ENTRYPOINT` — and why most services
  only need one of them
- A complete, real Dockerfile for a small Python service, read line by
  line

## The instructions that cover almost everything

A Dockerfile is a plain text file: one instruction per line, executed in
order, each one producing a layer (Lesson 1). Seven instructions cover the
overwhelming majority of real images:

```
FROM python:3.12-slim      # start from a base image
WORKDIR /app                # all following paths are relative to this
COPY requirements.txt .     # copy files from your machine into the image
RUN pip install -r requirements.txt   # execute a command at build time
ENV LOG_LEVEL=info          # set an environment variable
EXPOSE 8000                 # document which port the container listens on
CMD ["python", "server.py"] # the command that runs when a container starts
```

`FROM` always comes first — it's the base layer everything else builds on.
`EXPOSE` is documentation, not enforcement: it doesn't actually open the
port (Lesson 4's `-p` flag does that); it just tells anyone reading the
file, or inspecting the image, what the app expects.

## Order matters because of the build cache

Docker caches each layer and reuses it if that instruction and everything
before it haven't changed. That's why `COPY requirements.txt .` and `RUN
pip install` come *before* copying your actual application code:

```
# Good: dependencies change rarely, so this layer stays cached
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .                    # app code changes often — only this re-runs

# Bad: any code change invalidates the pip install layer too
COPY . .
RUN pip install -r requirements.txt
```

Put the things that change least at the top. For an AI app specifically,
that ordering is also why dependency installation (Lesson 8) and the
actual application code are kept as separate `COPY` steps — a one-line
code fix shouldn't force a multi-minute dependency reinstall.

## CMD vs. ENTRYPOINT

Both specify what runs when the container starts. `CMD` is a *default*
that's easy to override (`docker run my-app python debug.py` replaces it
entirely). `ENTRYPOINT` is fixed — arguments passed at `docker run` get
appended to it rather than replacing it. Most services only need `CMD`;
reach for `ENTRYPOINT` when you want the container to always run as one
specific program, no matter what arguments are passed.

```
CMD ["python", "server.py"]
# docker run my-app                 -> runs: python server.py
# docker run my-app python debug.py -> runs: python debug.py (CMD replaced)

ENTRYPOINT ["python", "server.py"]
# docker run my-app --port 9000     -> runs: python server.py --port 9000
```

## A complete, real Dockerfile

Putting it together — a small Python web service, nothing AI-specific yet
(Lesson 7 adds that):

```
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV LOG_LEVEL=info
EXPOSE 8000
CMD ["python", "server.py"]
```

Eight lines, seven instructions, and every one of them is doing exactly
what its name says. Lesson 4 builds and runs this.

## Key terms

| Term | Meaning |
|---|---|
| `FROM` | The base image everything else is built on top of — always first |
| `WORKDIR` | Sets the working directory inside the image for later instructions |
| `RUN` | Executes a command at *build* time, producing a new layer |
| `CMD` | The default command at *container start* time — easy to override |
| `ENTRYPOINT` | A fixed start command — `docker run` arguments get appended, not substituted |
| Build cache | Why instruction order matters: unchanged layers are reused, not rebuilt |

## Check yourself

You're ready for Lesson 4 when you can explain: in the Dockerfile above,
if you only change a line in your application code (not
`requirements.txt`), which instructions does Docker actually re-run on
the next build, and which ones does it serve from cache?
