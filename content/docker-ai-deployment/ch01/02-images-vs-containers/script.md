# Script — Images vs. Containers

## Segment 1 (title)

Lesson 1 drew the big line: a container is an isolated process, not a virtual machine. This lesson draws the line inside that idea — between an image and a container.

## Segment 2 (code: build once, run many)

An image is a read-only template, built once from a Dockerfile. A container is a running instance of that image, with its own writable layer on top. Build once, and you can run that same image as many times as you want — each container is independent, and stopping one leaves the image completely untouched.

## Segment 3 (screenshot: image inspector tabs)

Here's what an image actually is once you inspect it: not one file, but a stack of layers, a base image, a size, and a digest that uniquely identifies its exact bytes. Docker Desktop organizes all of that under one image's own tabs — Packages, Base images, Vulnerabilities — facts that are true the moment the build finishes, whether or not anything is running.

## Segment 4 (screenshot: build history)

Every time you build, Docker Desktop records the result — its own ID, its own digest, in a running history. Each entry here is a distinct image, even when several of them came from the exact same Dockerfile.

## Segment 5 (screenshot: Docker Hub browse page)

And an image doesn't have to stay local. It can be pushed to a registry, like Docker Hub, where it sits versioned and shared until something pulls it down and runs it as a container. Lesson 6 covers exactly how.

## Segment 6 (outro)

One image, any number of containers, each disposable and independent. Next up: writing the Dockerfile that actually produces the image.
