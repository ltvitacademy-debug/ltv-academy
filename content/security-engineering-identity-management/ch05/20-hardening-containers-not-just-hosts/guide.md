# Lesson 20 — Hardening Containers, Not Just Hosts

**Chapter 5 · Linux System Hardening Engineering · Lesson 4 of 4**

## What you'll learn

- Why a fully CIS-hardened, sysctl-tuned, Ansible-enforced host can still run a dangerously
  configured container
- Four real container-specific hardening practices that have no host-level equivalent: non-root,
  read-only root filesystem, dropped capabilities, and image scanning
- Why Linux **capabilities** matter more inside a container than most engineers expect
- Where to find a real, parallel benchmark for container and orchestrator hardening

## A hardened host is not a hardened workload

Everything in this chapter so far — the CIS Benchmark, the sysctl settings, the Ansible role that
enforces both across a fleet — hardens the **host**. None of it reaches inside a container
running on that host. A container is, under the hood, just a Linux process with a restricted view
of the filesystem, network, and process table, created from an **image** that someone else may
have built with no hardening in mind at all. A host can score 98% on a CIS Benchmark scan and
still run a container that executes as `root`, mounts the image's filesystem writable, holds
every capability Docker grants by default, and was built from a base image with a dozen known
CVEs — because none of that is something a *host*-level benchmark was ever designed to check.

## Running as non-root inside the container

Most container images default to running their main process as `root` **inside the container**,
because that's simplest for the image author and nobody tells them otherwise. If an attacker
finds a way to escape the container's isolation — a kernel vulnerability, a misconfigured mount —
running as root inside gives them a running start on becoming root outside, too. A Dockerfile
fixes this with a `USER` directive, and a container is run or deployed with an explicit non-root
UID:

```
# in the Dockerfile
USER 1000:1000

# or at runtime, overriding whatever the image set
docker run --user 1000:1000 nginx:latest
```

## Read-only root filesystem and dropped capabilities

A **read-only root filesystem** (`docker run --read-only`, or `securityContext.readOnlyRootFilesystem:
true` in Kubernetes) means a compromised process inside the container can't write a backdoor,
drop a second-stage payload, or modify the application code it's running — any writes it needs
(logs, temp files) go to an explicitly mounted volume instead, everything else is sealed. Linux
**capabilities** split up what used to be an all-or-nothing root privilege into dozens of
separate grants (`CAP_NET_BIND_SERVICE` to bind a low port, `CAP_SYS_ADMIN` for a long list of
administrative operations, and so on), and a default container still holds a meaningful subset of
them even when it isn't running as root. The CIS Docker Benchmark's own guidance is to
**drop everything and add back only what's actually needed**:

```
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE \
  --read-only --user 1000:1000 nginx:latest
```

## Scanning the image itself

Non-root, read-only, and a minimal capability set all describe how a container *runs* — none of
them say anything about what's *inside* the image. A base image frozen six months ago can carry
known, published CVEs in its OS packages or language libraries, completely independent of how
carefully the container is run. **Image scanning** tools — Trivy, Grype, and Clair are the
widely-used real ones — compare an image's installed packages against current CVE databases and
fail a build in CI before a vulnerable image ever reaches production:

```
trivy image myregistry.io/app:1.4.2
```

## A concrete example: the gap this chapter would otherwise leave open

A security engineer finishes rolling out CIS-aligned sysctl settings and a 95%-compliant Ansible
hardening role across every host in the fleet — genuinely excellent host hardening. On top of
that fleet, a developer deploys a container built from a `node:14` base image that's been
unpatched for a year, running as `root`, with a writable filesystem and every default Docker
capability intact. `trivy image` on that base image alone returns dozens of known CVEs, several
rated critical. The host did its job perfectly. The container, running on top of it, undid most
of the benefit — which is exactly why container hardening is its own discipline, with its own CIS
Benchmark (the CIS Docker Benchmark and CIS Kubernetes Benchmark), not an afterthought bolted onto
host hardening.

## Key terms

| Term | Meaning |
|---|---|
| Linux capability | A fine-grained slice of what used to be an all-or-nothing root privilege, e.g. `CAP_NET_BIND_SERVICE` |
| Read-only root filesystem | A container run so its filesystem can't be written to at runtime, blocking in-place tampering |
| Image scanning | Checking a container image's installed packages against known-CVE databases, e.g. with Trivy |
| CIS Docker Benchmark | A CIS Benchmark specifically for container runtime configuration, parallel to the host-level benchmarks in Lesson 17 |

## Check yourself

You're ready for the next chapter when you can explain, without looking: why can a server that
scores 98% on a CIS host Benchmark still be running a dangerously insecure workload, and what two
things would you check on the container itself — separate from the host — to find out?
