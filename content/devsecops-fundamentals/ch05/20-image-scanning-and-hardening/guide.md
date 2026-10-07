# Image Scanning & Hardening

Chapter 4 scanned Northbridge Retail's source code, dependencies, secrets, and infrastructure definitions. This chapter moves to what actually runs: containers. A container image bundles an operating system layer, system packages, and your application together — and every one of those layers can carry its own vulnerabilities, separate from anything Chapter 4 already caught.

## What you'll learn

- Why a container image needs its own scan, on top of everything already covered in Chapter 4
- What a real Trivy image scan finding looks like
- The concrete hardening practices that shrink an image's attack surface
- Why a hardened image is a smaller target even before any scan ever runs

## Why the image itself needs scanning

SCA (Lesson 16) scans your application's declared dependencies. It does not scan the base operating system image your Dockerfile starts `FROM`. A container built `FROM ubuntu:22.04` inherits every OS package in that base image — `openssl`, `curl`, `glibc`, and dozens more — and any one of them can have a known CVE that your application manifest never mentions. Tools like **Trivy** scan the fully-built image, layer by layer, checking OS packages and application dependencies together.

Here's what a real Trivy scan of a checkout-service image produces:

```
Total: 14 (UNKNOWN: 0, LOW: 6, MEDIUM: 5, HIGH: 2, CRITICAL: 1)

LIBRARY    VULNERABILITY ID   SEVERITY  INSTALLED  FIXED
openssl    CVE-2024-6119      CRITICAL  3.0.13     3.0.14
libcurl    CVE-2024-2004      HIGH      8.5.0      8.9.0
```

The severity breakdown lets a pipeline gate on just the worst findings — Northbridge Retail's CI blocks the build on any CRITICAL with a fixed version available, rather than failing every build over a LOW finding nobody's going to act on today.

## Hardening: shrinking what there is to find

Scanning tells you what's wrong with an image. Hardening is about building an image with less to find in the first place:

- **Minimal base images** — starting `FROM` a distroless or Alpine-based image instead of a full OS distribution means far fewer packages exist to carry a CVE at all.
- **Non-root user** — running the container process as a dedicated non-root user limits what an attacker can do even if they get code execution inside it.
- **Multi-stage builds** — compiling in one stage and copying only the finished binary into a clean final stage keeps build tools, source code, and compilers out of the image that actually ships.
- **No shell, no package manager, in production images** — a distroless final image has nothing for an attacker to use to explore the container even after a compromise.

A hardened Dockerfile for Northbridge Retail's checkout service might look like this:

```dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM gcr.io/distroless/nodejs20-debian12
COPY --from=build /app/dist /app
USER nonroot
ENTRYPOINT ["/app/server.js"]
```

The build stage has everything needed to compile; the final stage ships almost nothing else.

## Scanning and hardening work together

A hardened image still gets scanned — hardening reduces the number of findings, it doesn't replace the scan. And a scanned-but-unhardened image is still a bigger target than it needs to be, even with every current CVE patched, because the next disclosed vulnerability might be in a package that was never necessary to ship at all.

## Key terms

- **Image scanning** — checking a fully-built container image's OS packages and application dependencies for known vulnerabilities
- **Trivy** — an open-source scanner for container images, filesystems, and infrastructure as code
- **Distroless image** — a minimal base image containing only an application and its runtime dependencies, with no shell or package manager
- **Multi-stage build** — a Dockerfile pattern that compiles in one stage and ships only the result in a separate, smaller final stage
