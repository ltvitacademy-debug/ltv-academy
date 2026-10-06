# Script — Packaging a Python AI App

## Segment 1 (title)

Chapter 1 built up FROM, WORKDIR, COPY, RUN, ENV, EXPOSE, and CMD one at a time. Here's that exact pattern, applied to a real FastAPI service that loads a model and serves predictions.

## Segment 2 (code: the real Dockerfile)

Structurally, nothing's new. But an AI app's requirements file usually pulls in torch, transformers, or scikit-learn — each one much bigger than a typical web framework. That's why the dependency-layer caching from Lesson 3 matters even more here: a pip install that takes ten seconds for a Flask app can take several minutes for a PyTorch stack.

## Segment 3 (code: dockerignore)

Everything in your project folder gets sent as the build context, whether your Dockerfile uses it or not. For an AI project that silently includes virtual environments and downloaded checkpoints — unless a dot-dockerignore file excludes them. Skip it, and a multi-gigabyte local environment gets uploaded to the Docker daemon on every single build.

## Segment 4 (code: the inference service)

Three things make this containerizable the way Chapter 1 described: a pinned requirements file, a model loaded once at startup instead of per request, and a server bound to zero-point-zero-zero-zero-zero — not localhost, which would refuse connections from outside the container entirely.

## Segment 5 (code: build and run)

And building and running it is exactly the Lesson 4 loop — nothing about docker build or docker run changes for an AI app. What changes is everything inside the image: bigger dependencies, a model file, and decisions about where that model file actually lives.

## Segment 6 (outro)

The same seven instructions, just pointed at a heavier, model-serving app. Next up: where that model file should actually live, and how to manage dependencies that get this large.
