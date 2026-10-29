# Lesson 8 — Tagging, Versioning, and Pushing to a Container Registry

**Chapter 2 · Production-Grade Container Images · Lesson 4 of 4**

## What you'll learn

- Why `:latest` is a convenience tag, not a version, and why that
  distinction matters in production
- A real tagging scheme that combines semantic versions with an
  immutable git-sha tag
- How to authenticate to and push an image to Docker Hub, Azure
  Container Registry, and Amazon ECR
- Why a content digest, not a tag, is the only truly immutable
  reference to an image

## A tag is just a mutable pointer

An image tag like `myapp:1.4.2` looks like a version number, but
technically it's a label that can be repointed to a different image at
any time — `docker push` with the same tag silently replaces what that
tag refers to in the registry. `:latest` is the extreme case: it's
whatever the most recent push happened to be, which means two people
pulling `myapp:latest` an hour apart can get genuinely different code
with no warning. That's fine for local experimentation and genuinely
dangerous for a production deployment, where you need to know exactly
what's running and be able to roll back to exactly what was running
before.

## A real tagging scheme

A workable scheme tags the same build multiple ways at once, each tag
serving a different purpose:

```
docker build -t myapp:1.4.2 .
docker tag myapp:1.4.2 myapp:1.4
docker tag myapp:1.4.2 myapp:1
docker tag myapp:1.4.2 myapp:a1b2c3d
```

`1.4.2` is the full semantic version for this exact release.
`1.4` and `1` are "floating" convenience tags that get moved forward
with each patch and minor release, useful for consumers who want
automatic patch updates. `a1b2c3d` — the short git commit SHA — ties
the image back to the exact source commit that produced it, which
matters enormously when debugging "what changed between this deploy
and the last one." None of these should include `latest` in a
production manifest; always pin to a specific version or digest.

## The digest: the one truly immutable reference

Tags can move; a **digest** cannot. `docker push` returns a
content-addressed SHA-256 digest of the image manifest, and pulling by
digest guarantees you get exactly those bytes, forever:

```
docker pull myapp@sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
```

Production Kubernetes manifests increasingly pin to a digest (or a
digest alongside a human-readable tag) for exactly this reason — a tag
tells a person what release this is; a digest tells the cluster
exactly which bytes to run, with zero ambiguity.

## Pushing to Docker Hub

Docker Hub is the default registry — an image name with no registry
host implies `docker.io`:

```
docker login
docker tag myapp:1.4.2 myusername/myapp:1.4.2
docker push myusername/myapp:1.4.2
```

## Pushing to a cloud registry: ACR and ECR

Azure Container Registry and Amazon ECR follow the same `tag` →
`push` pattern, but authentication goes through the cloud CLI instead
of a Docker Hub account, and the repository name is namespaced under
the registry's own hostname:

```
# Azure Container Registry
az acr login --name myregistry
docker tag myapp:1.4.2 myregistry.azurecr.io/myapp:1.4.2
docker push myregistry.azurecr.io/myapp:1.4.2

# Amazon ECR
aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin \
      123456789012.dkr.ecr.us-east-1.amazonaws.com
docker tag myapp:1.4.2 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:1.4.2
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:1.4.2
```

Both `az acr login` and the ECR `get-login-password` pattern obtain a
short-lived token through the cloud CLI's already-authenticated
session rather than a long-lived password — that token is what
`docker login` actually uses behind the scenes.

## Retention and immutability policies

A registry will happily accumulate every tag you ever push forever
unless you tell it otherwise. ACR and ECR both support **immutable
tag** settings (reject a push that would overwrite an existing tag)
and **retention policies** (automatically expire untagged or old
images) so a registry doesn't become an unmanaged, ever-growing, and
eventually expensive pile of historical images.

## Key terms

| Term | Meaning |
|---|---|
| Tag | A mutable, human-readable label (`1.4.2`, `latest`) pointing at a specific image; can be repointed by a later push with the same name |
| Digest | A SHA-256 hash of the image manifest, returned on push; the only reference that is guaranteed to always resolve to the exact same bytes |
| Floating tag | A tag intentionally moved forward across releases (e.g. `1.4`, `1`) to give consumers automatic minor/patch updates |
| Registry | A hosted store for images, addressed as `<registry-host>/<namespace>/<repo>:<tag>` — Docker Hub, ACR, and ECR are three common ones |

## Check yourself

You're ready for the next chapter when you can explain, without
looking: why is `:latest` unsafe to deploy from in production, and
what does pulling by digest guarantee that pulling by tag does not?
