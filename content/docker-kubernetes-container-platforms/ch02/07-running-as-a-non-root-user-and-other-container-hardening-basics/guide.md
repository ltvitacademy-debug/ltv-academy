# Lesson 7 — Running as a Non-Root User, and Other Container Hardening Basics

**Chapter 2 · Production-Grade Container Images · Lesson 3 of 4**

## What you'll learn

- Why a container runs as root by default, and why that matters even
  though a container isn't a full VM
- How to create a dedicated unprivileged user in a Dockerfile with
  `USER`, and set file ownership correctly for it
- What a read-only root filesystem buys you, and how to keep a
  container writable only where it actually needs to be
- How dropping Linux capabilities shrinks what a compromised process
  can do, even as root

## Root by default is a convenience, not a requirement

Unless a Dockerfile says otherwise, the process inside a container
starts as **root** (UID 0). That's convenient during development —
nothing blocks a file write, nothing blocks binding to a privileged
port — but it's not a boundary you want left open in production.
Container isolation (namespaces, cgroups) is strong but it is not a
hypervisor-grade boundary: a container-escape vulnerability or a
misconfigured mount is far more dangerous if the process that
exploited it was already running as root. Least privilege applies
inside the container exactly like it applies everywhere else — give
the process only the UID and permissions it needs to do its job.

## Creating and switching to a non-root user

A Dockerfile creates a dedicated user and group, grants that user
ownership of exactly the directories it needs, and switches to it with
`USER` before the container ever runs the application:

```
FROM python:3.12-slim
RUN groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app
WORKDIR /app
COPY --chown=app:app . .
RUN pip install --no-cache-dir -r requirements.txt
USER app
CMD ["python", "main.py"]
```

`--chown=app:app` on `COPY` sets ownership at copy time rather than a
separate `RUN chown` layer afterward, and `USER app` is the line that
actually matters — everything after it, including the final `CMD`,
runs as that unprivileged user, not root. Distroless images make this
even simpler: `gcr.io/distroless/static-debian12:nonroot` already runs
as a fixed non-root UID (65532) with no extra Dockerfile lines needed.

## Read-only root filesystem

Even as a non-root user, a process can still write wherever its file
permissions allow inside the container's own filesystem. Mounting the
container's root filesystem read-only removes an entire class of
tampering — an attacker who gains code execution can't drop a new
binary, modify application files, or persist changes to the image's
filesystem at all:

```
docker run --read-only --tmpfs /tmp myapp:1.4.2
```

`--tmpfs /tmp` gives the application a small writable, in-memory
scratch space for the handful of things that genuinely need to write
somewhere (temp files, sockets) without making the rest of the
filesystem writable. In Kubernetes this is the same idea expressed as
`readOnlyRootFilesystem: true` in a Pod's `securityContext`, usually
paired with an explicit `emptyDir` volume for whatever directory still
needs to be written to.

## Dropping Linux capabilities

"Root" on Linux isn't one single on/off switch — it's a bundle of
discrete **capabilities** (`CAP_NET_BIND_SERVICE`, `CAP_SYS_ADMIN`,
`CAP_CHOWN`, and dozens more), and a container can be started with
only the ones it actually needs:

```
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp:1.4.2
```

This drops every capability by default, then re-adds only the one
needed to bind a low-numbered port. Combined with
`--security-opt=no-new-privileges`, which blocks a process from
gaining additional privileges through a setuid binary at runtime, a
container ends up with a genuinely narrow set of things it's allowed
to do — even if something inside it is compromised.

## Putting it together in Kubernetes

The Dockerfile-level choices above map directly onto a Pod's
`securityContext`:

```
securityContext:
  runAsNonRoot: true
  runAsUser: 10001
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: ["ALL"]
```

`runAsNonRoot: true` makes Kubernetes itself refuse to start the pod if
the image would run as root — turning a Dockerfile mistake into a
deployment-time failure instead of a silent production risk.

## Key terms

| Term | Meaning |
|---|---|
| `USER` | The Dockerfile instruction that switches the process UID for every instruction after it, including the final `CMD`/`ENTRYPOINT` |
| Read-only root filesystem | Mounting a container's filesystem so nothing in it can be modified at runtime, except explicitly provisioned writable mounts like `tmpfs` |
| Linux capability | One discrete privilege (e.g. `CAP_NET_BIND_SERVICE`) that root's power is broken into; `--cap-drop=ALL` removes all of them by default |
| `runAsNonRoot` | A Kubernetes `securityContext` field that makes the kubelet refuse to start a pod whose container would run as root |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
is `--cap-drop=ALL --cap-add=NET_BIND_SERVICE` meaningfully more secure
than just not running as root at all, and what does
`readOnlyRootFilesystem` require you to add alongside it for most real
applications?
