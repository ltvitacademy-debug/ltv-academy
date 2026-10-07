# Building Container Images in CI

Everything so far in this chapter has checked source code — tests, lint, static analysis, coverage. None of it has produced anything Northbridge Retail can actually run. This lesson is where `storefront-api`'s source tree becomes a container image: a single, versioned artifact that runs identically on a laptop, a CI runner, and the Kubernetes cluster in production.

## What you'll learn

- Why the pipeline builds the image *after* the quality gates from Lessons 16-18, not before
- A real multi-stage Dockerfile for a Python service, and why "multi-stage" keeps the final image small
- The `docker build` and image-tagging commands that run inside the CI job itself
- Where that built image actually lands once the job finishes

## Build order: gates first, image second

Building a container image takes real CI minutes — pulling a base image, installing dependencies, copying files, running `docker build` layer by layer. Running that expensive step *before* confirming the code even passes its tests wastes that time on code that was always going to be rejected. Northbridge Retail's `storefront-api` workflow runs test, lint, and coverage jobs first; the build job only starts once all three succeed, via GitHub Actions' `needs:` keyword:

```yaml
jobs:
  test:
    # ...Lesson 16...
  lint:
    # ...Lesson 17...
  build-image:
    needs: [test, lint]
    runs-on: ubuntu-latest
```

## A real multi-stage Dockerfile

Here's the actual `Dockerfile` for `storefront-api`:

```dockerfile
# Stage 1: install dependencies in a full build environment
FROM python:3.12 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --target=/deps -r requirements.txt

# Stage 2: copy only what's needed into a minimal runtime image
FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /deps /usr/local/lib/python3.12/site-packages
COPY src/ ./src/
CMD ["python", "src/main.py"]
```

The first stage (`builder`) has every compiler and build tool `pip install` might need, but none of that ever reaches the image that actually ships. The second stage starts fresh from a minimal `slim` base and copies in only the installed dependencies and application source via `COPY --from=builder`. The result is a final image with no compilers, no build cache, and no leftover files — smaller to store, faster to pull, and with a meaningfully smaller attack surface in production.

## Building and tagging the image in CI

```yaml
      - name: Build image
        run: |
          docker build -t ghcr.io/northbridge-retail/storefront-api:${{ github.sha }} .
          docker build -t ghcr.io/northbridge-retail/storefront-api:latest .
```

Tagging with `${{ github.sha }}` — the exact commit hash that triggered the build — gives every image an immutable, traceable identity: there's never a question of which source code produced a given image, because the tag *is* the commit. The `latest` tag is a convenience pointer for local development, never something production deployments should reference directly (Chapter 5 covers exactly why).

## Where the image actually lands

Once built, the image gets pushed to a container registry — Lesson 20 covers registries in depth, but the destination for `storefront-api` is GitHub's own **Packages** feature, visible right in the repository's sidebar:

![Screenshot of a repository's sidebar with the Packages section outlined, listing a package available in that repository.](/courses/ci-cd-pipelines/ch04/19-building-container-images-in-ci/packages-from-repo.png)
*The built image lands here the moment the push step succeeds — the same repository that holds the source now holds the artifact built from it.*
Source: [GitHub Docs — Viewing packages](https://docs.github.com/en/packages/learn-github-packages/viewing-packages)

## Key terms

| Term | Meaning |
|---|---|
| Multi-stage build | A Dockerfile with multiple `FROM` stages, where only the final stage's contents ship |
| `needs:` | The GitHub Actions keyword that makes one job wait for others to succeed first |
| Image tag | A label (often a commit SHA) identifying a specific version of a container image |
| Container registry | A storage service for container images, pushed to and pulled from by name and tag |
