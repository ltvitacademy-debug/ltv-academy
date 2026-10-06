# Lesson 6 — Container Registries

**Chapter 1 · Docker Fundamentals · Lesson 6 of 25**

## What you'll learn

- What a registry actually is: a place to store and version built images,
  the same way a package registry stores libraries
- The naming convention every registry reference follows, and what each
  part means
- `docker login`, `docker tag`, and `docker push` — the three commands
  that get an image from your machine to a registry
- What a registry actually looks like, browsed — both creating a
  repository and finding one that already exists

## Where an image goes after `docker build`

Lesson 2 established that a built image can sit on your machine, or be
pushed to a **registry** — a server that stores images, organized into
named **repositories**, each with one or more tagged versions. Docker Hub
is the default public registry; AWS, Google Cloud, Azure, and GitHub each
run their own private ones too (Chapter 3 covers deploying from one).
Every image reference follows the same shape:

```
[registry-host/]namespace/repository[:tag]

docker.io/yourname/my-ai-app:1.0
ghcr.io/yourname/my-ai-app:latest
```

Leave the registry host off and Docker assumes Docker Hub. `latest` is
just a tag, not a special keyword — it's whatever was last pushed without
an explicit version, which is exactly why it's a bad choice for anything
you actually want to reproduce later.

## Creating a place for it to live

Before an image can be pushed, a repository has to exist to receive it.
On Docker Hub, that's a short form: a name, a visibility setting, and
nothing else required to get started:

![Docker Hub's "Create a repository" form, with fields for repository name, description, and a choice between Public and Private visibility.](/courses/docker-ai-deployment/ch01/06-container-registries/hub-create-repository.png)

**Public** means the repository is searchable and pullable by anyone —
appropriate for an open-source base image, not for one that embeds your
own model weights or API keys (Lesson 9 covers keeping secrets out of the
image entirely). **Private** restricts access to your account or
organization.

## Tag, then push

Three commands move an image from your machine to that repository:

```
docker login                                    # authenticate once
docker tag my-ai-app:1.0 yourname/my-ai-app:1.0 # rename for the registry
docker push yourname/my-ai-app:1.0              # upload it
```

`docker tag` doesn't copy anything — it adds a second name to the same
local image, in the `namespace/repository:tag` shape the registry expects.
`docker push` is what actually uploads the layers; layers already present
in the registry from a previous push are skipped, the same caching idea
from Lesson 3's build cache, applied over the network instead of disk.

## What's already out there

A registry isn't just a place you push to — it's also where you pull
official, maintained base images from. Docker Hub's browse pages make
that searchable, including a curated, security-hardened line maintained by
Docker itself:

![Docker Hub's public browse page for Hardened Images, listing repository cards (Redis, Azure Metrics Exporter) each with OS, architecture, and compliance details like CIS, FIPS, and STIG.](/courses/docker-ai-deployment/ch01/06-container-registries/hub-browse-hardened-images.png)

Docker Desktop surfaces registry browsing directly in the app too, through
its Registry Explorer extension — listed right alongside Containers,
Images, and Builds in the same sidebar you've used all chapter:

![Docker Desktop's left sidebar, with Registry Explorer listed under Extensions, alongside the core Containers, Images, Volumes, and Builds sections.](/courses/docker-ai-deployment/ch01/06-container-registries/desktop-builds-view-sidebar.png)

## Key terms

| Term | Meaning |
|---|---|
| Registry | A server that stores images, organized into repositories — Docker Hub, by default |
| Repository | A named collection of an image's tagged versions |
| `docker tag` | Adds a registry-shaped name to a local image; doesn't copy anything |
| `docker push` | Uploads an image's layers to a registry, skipping layers already there |
| `latest` | An ordinary, overwritable tag — not a guarantee of any particular version |

## Check yourself

You're ready for Lesson 7 when you can explain: after `docker tag
my-ai-app:1.0 yourname/my-ai-app:1.0`, how many images exist on your
machine, and why does `docker push` only need to upload the layers Docker
Hub doesn't already have?
