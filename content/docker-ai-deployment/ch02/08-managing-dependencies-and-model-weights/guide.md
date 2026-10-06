# Lesson 8 — Managing Dependencies & Model Weights

**Chapter 2 · Containerizing AI Applications · Lesson 8 of 25**

## What you'll learn

- Why pinning exact dependency versions matters more for AI projects than
  almost anywhere else in software
- Three different ways a model weights file can get into a running
  container — and the real tradeoff between them
- Why baking a multi-gigabyte checkpoint into an image layer is usually
  the wrong default
- How to mount weights as a volume instead, and when that's the better
  call

## Pin versions, exactly

A loose `requirements.txt` resolves differently depending on what's
available the day you build — risky anywhere, but especially risky for
AI, where a minor version bump in `torch` or `transformers` can silently
change numerical output:

```
# Loose — resolves differently every time
torch
transformers

# Pinned — resolves to the exact same build, every time
torch==2.3.1
transformers==4.41.2
```

Pin with `==`, not `>=`. Lesson 3's build cache only stays valid as long
as `requirements.txt` itself doesn't change — pinning also means the
cached layer from last week is still correct today.

## Three ways weights get into the container

**Option 1 — bake them into the image:**

```
COPY model/model.safetensors /app/model/
```

Simple, and the image is fully self-contained. But a 4GB checkpoint baked
into a layer makes every build, push, and pull slower, and the registry
(Lesson 6) now stores a multi-gigabyte blob per image version — even
versions where the weights didn't change.

**Option 2 — download at build time:**

```
RUN curl -L -o model.safetensors https://example.com/weights/v2.safetensors
```

Keeps the Dockerfile itself small, but ties every build to that URL being
reachable, and re-downloads the same bytes on every build that invalidates
this layer's cache.

**Option 3 — mount weights as a volume at runtime:**

```
docker run -v /host/models:/app/model ai-inference:1.0
```

The image stays small and generic; the weights live outside it entirely,
swappable without a rebuild. This is usually the right default for
anything beyond a small, rarely-changing model file.

## Choosing between them

```
Small, stable model (<100MB), rarely updated  -> bake it in (Option 1)
Weights fetched from a model registry          -> download at build (Option 2)
Large weights, swapped often, or GPU deploy     -> mount as a volume (Option 3)
```

Volumes are also what makes Lesson 11's GPU deployments practical: the
same image runs against different model versions just by changing what's
mounted, instead of rebuilding and re-pushing a multi-gigabyte image for
every model update.

## Key terms

| Term | Meaning |
|---|---|
| Pinned dependency | An exact version (`==`), not a range — reproducible builds |
| Baked-in weights | Model file copied into an image layer at build time |
| Volume-mounted weights | Model file supplied at `docker run`, outside the image |
| Registry blob bloat | The cost of storing large, duplicated weight files across image versions |

## Check yourself

You're ready for Lesson 9 when you can explain: your team updates the
model weekly but the application code rarely changes. Which of the three
options from this lesson keeps you from pushing a multi-gigabyte image to
the registry every single week, and why?
