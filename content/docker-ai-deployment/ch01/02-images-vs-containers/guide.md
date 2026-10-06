# Lesson 2 — Images vs. Containers

**Chapter 1 · Docker Fundamentals · Lesson 2 of 25**

## What you'll learn

- The exact difference between an image and a container: a recipe vs. a
  running instance of it
- Why one image can produce any number of running containers, each
  isolated from the others
- What an image actually looks like once it's inspected — layers, digest,
  base image, size
- Where images live before they're run: a registry, like Docker Hub

## A recipe, and the thing you make from it

Lesson 1 drew the big line: a container is an isolated process, not a
virtual machine. This lesson draws the line inside that idea. A Docker
**image** is a read-only template — a filesystem snapshot plus a startup
command, built once from a Dockerfile (Lesson 3). A **container** is a
running instance of that image, with its own writable layer on top. You
build an image once; you can start it as a container as many times as you
want, and each one is independent.

```
docker build -t my-ai-app .     # one image, built once
docker run my-ai-app            # container #1 — isolated
docker run my-ai-app            # container #2 — also isolated
docker run my-ai-app            # container #3 — same image, new instance
```

Stop a container and its writable layer is gone; the image underneath is
untouched, so running it again starts clean. That's why containers are
treated as disposable and images are treated as the thing you version and
ship.

## What an image actually is, inspected

An image isn't one file — it's a stack of layers, each one traceable back
to the Dockerfile instruction that created it, plus metadata: a base
image, a size, and a content-addressed digest that uniquely identifies
exactly these bytes. Docker Desktop's own inspector shows this directly,
organized into tabs across one image's properties — not a container's:

![Docker Desktop's image inspector, with tabs across the top for Overview, Images, Packages, Base images, and Vulnerabilities — properties of a built image, not a running container.](/courses/docker-ai-deployment/ch01/02-images-vs-containers/desktop-image-vulnerabilities-tabs.png)

Every one of those tabs — Packages, Base images, Vulnerabilities — is a
fact about the image itself. None of it depends on whether a container is
currently running from it; it's true the moment the image finishes
building.

## Every build makes a new image

Each time you build, Docker Desktop records the result with its own ID and
content digest — a running history of every image you've produced:

![Docker Desktop's Build history list, showing multiple completed builds each with their own name, platform, duration, and status.](/courses/docker-ai-deployment/ch01/02-images-vs-containers/desktop-build-history.png)

## Where images live before they're run

An image doesn't have to live only on your machine. It can be pushed to a
**registry** — Lesson 6 covers this in depth — where it sits, versioned
and shared, until something pulls it and runs it as a container:

![Docker Hub's public browse page for Hardened Images, listing named image repositories with their OS, architecture, and compliance details — images sitting in a registry, not running.](/courses/docker-ai-deployment/ch01/02-images-vs-containers/hub-browse-hardened-images.png)

## Key terms

| Term | Meaning |
|---|---|
| Image | A read-only template: filesystem snapshot + startup command, built once |
| Container | A running instance of an image, with its own disposable writable layer |
| Layer | One filesystem change, traceable to one Dockerfile instruction |
| Digest | A content-addressed ID that uniquely identifies an image's exact bytes |
| Registry | Where built images are stored and shared before they're run — Docker Hub, for example |

## Check yourself

You're ready for Lesson 3 when you can explain: if you run `docker run
my-ai-app` three times, how many images exist afterward, and how many
containers — and why does stopping all three containers leave the image
untouched?
