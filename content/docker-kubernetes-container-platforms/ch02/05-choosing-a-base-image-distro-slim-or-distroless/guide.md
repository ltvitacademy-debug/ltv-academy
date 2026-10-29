# Lesson 5 — Choosing a Base Image: Distro, Slim, or Distroless

**Chapter 2 · Production-Grade Container Images · Lesson 1 of 4**

## What you'll learn

- What the `FROM` line in a Dockerfile is actually deciding for you,
  beyond "which Linux"
- The real differences between a full distro base, a "slim" variant,
  and a distroless image
- Why fewer packages in the base image means a smaller **attack
  surface**, not just a smaller download
- How a multi-stage build lets you keep a full toolchain for building
  while still shipping a minimal runtime image

## Every FROM line is an attack-surface decision

The very first line of most Dockerfiles — `FROM ubuntu:22.04`, `FROM
python:3.12`, `FROM node:20` — looks like a formality. It isn't. That
line decides how many packages, shared libraries, and binaries ship
inside every container you run from that image, whether you ever use
them or not. A package you never call is still a package a scanner
will flag and an attacker can abuse if they get code execution inside
your container. The base image is the single biggest lever you have
over how exposed a running container actually is.

## Full distro images: everything included

`FROM ubuntu:22.04` or `FROM debian:12` gives you a complete,
general-purpose Linux userland: a shell (`/bin/bash`), a package
manager (`apt`), coreutils, text editors in some variants, and
hundreds of libraries that exist to support software you probably
aren't running. That's enormously convenient for development — you can
`apt install` anything you need, `exec` into the container and poke
around with familiar tools — but every one of those packages is
attack surface. If an attacker achieves remote code execution in your
app, a full shell and a package manager sitting right there make their
next steps dramatically easier.

## Slim images: trimmed, not stripped

Official images on Docker Hub often publish a `-slim` tag, like
`python:3.12-slim` or `node:20-slim`. These are still Debian-based —
you still get `apt` and a shell — but the image drops documentation,
common CLI utilities, and build toolchains (compilers, header files)
that the full image carries by default. A slim image is a reasonable
middle ground: still debuggable with a normal shell, meaningfully
smaller, and meaningfully fewer packages for a vulnerability scanner
to flag than the non-slim equivalent.

```
FROM python:3.12-slim
# apt and a shell are still present; build tools and docs are not
```

## Distroless: no shell, no package manager, no debugging shortcuts

Google's `gcr.io/distroless/*` images take the idea further: there is
**no shell, no package manager, and no coreutils** in the final image
at all — just the language runtime (or nothing, for the `static`
variant) and whatever you explicitly copy in. You cannot `docker exec
-it` into a distroless container and get a prompt, because there's no
`/bin/sh` to give you one. That's the entire point: if there's no
shell, a huge category of post-exploitation techniques simply has no
tool to run. The tradeoff is real — debugging means attaching an
ephemeral debug container (`kubectl debug`) rather than shelling in
directly — but for a production runtime image, that tradeoff usually
favors distroless.

```
FROM gcr.io/distroless/static-debian12
COPY --from=build /app/server /server
ENTRYPOINT ["/server"]
```

## Alpine: small, but not the same kind of small

`alpine` images are tiny (around 5 MB base) because Alpine Linux uses
`musl` libc and `busybox` instead of `glibc` and full coreutils. That
makes Alpine a popular "small" choice, but it's a different trade than
distroless: Alpine still has a shell and `apk`, its small size is
about disk footprint rather than removing a shell entirely, and `musl`
occasionally causes real compatibility or subtle behavior differences
for binaries compiled against `glibc`. Alpine is a good choice when
size matters and you still want a shell for debugging; it is not a
substitute for distroless's attack-surface reduction.

## Multi-stage builds: build fat, ship thin

You rarely have to choose one image for the whole Dockerfile. A
multi-stage build uses a full, tool-rich image to compile or install
dependencies, then copies only the finished artifact into a minimal
final image:

```
FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

FROM gcr.io/distroless/static-debian12
COPY --from=build /src/server /server
ENTRYPOINT ["/server"]
```

The `build` stage never ships — only its `/server` binary survives
into the final image, which has no compiler, no Go toolchain, and no
shell. The result is an image that's small to pull, fast to start, and
has almost nothing in it for an attacker to use even if they find a
way in.

## Key terms

| Term | Meaning |
|---|---|
| Base image | The image named on a Dockerfile's `FROM` line; determines every package and library present in the final container unless multi-stage copies narrow it down |
| Attack surface | The total set of code, binaries, and tools reachable inside a running container that an attacker could use after gaining code execution |
| Distroless | A base image family (`gcr.io/distroless/*`) with no shell and no package manager — only a language runtime plus whatever you explicitly copy in |
| Multi-stage build | A Dockerfile with more than one `FROM`, where a tool-rich build stage produces an artifact that a minimal final stage copies in, without carrying the build tools forward |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does a distroless image resist post-exploitation techniques better
than a slim image, even though both are smaller than a full distro —
and what do you give up in exchange?
