# Lesson 9 — Declarative State in Git as the Single Source of Truth

**Chapter 3 · GitOps Principles · Lesson 1 of 4**

## What you'll learn

- What "single source of truth" actually means for a Kubernetes cluster,
  and why that's a much stronger claim than "we keep our YAML in a repo"
- The difference between declaring desired state and issuing imperative
  commands, and why GitOps is built entirely on the former
- Two of the four OpenGitOps principles — **Declarative** and
  **Versioned and Immutable** — and what each one demands in practice
- How to lay out a Git repository so that the manifests you already
  write for Kubernetes become that trustworthy source of truth

## From "YAML in a repo" to "source of truth"

You already know how to write a Kubernetes `Deployment`, `Service`, and
`ConfigMap` as YAML — that was the whole point of the manifests you built
earlier in this path. Putting those files in a Git repository feels like
an obvious next step, and plenty of teams stop right there: a repo full
of manifests that somebody applies by hand when it's time to ship.

GitOps asks for something stricter. Git isn't just *a* copy of your
config — it's declared to be **the** copy that matters. If the live
cluster ever disagrees with what's committed on the default branch, the
cluster is wrong and Git is right, full stop. That single sentence is
the entire philosophical shift. It means nobody "just quickly" runs
`kubectl edit deployment payments-api` to bump a replica count under
pressure, because any state that didn't come from a Git commit is, by
definition, state that shouldn't exist. Later lessons in this chapter
cover how an agent actually enforces that — this lesson is about why
Git earns the role in the first place.

## Declarative, not imperative

This matters because of a distinction you've likely felt but maybe
haven't named: **imperative** commands tell the cluster what to *do*
right now —

```
kubectl create deployment payments-api --image=registry/payments-api:1.4.2
kubectl scale deployment payments-api --replicas=5
```

— while a **declarative** manifest tells the cluster what the end state
should *look like*, and leaves the "how do I get there" to the
Kubernetes control plane:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-api
spec:
  replicas: 5
  template:
    spec:
      containers:
        - name: payments-api
          image: registry/payments-api:1.4.2
```

Run `kubectl apply -f deployment.yaml` once, or a thousand times, and
you get the same result: a deployment that matches the file. Run the
imperative `scale` command twice and you've typed the same intent
twice, with no record anywhere of what you intended versus what
happened. Declarative config is **idempotent** and, critically,
**diffable** — two YAML files can be compared line by line, which is
exactly the property Git is built to track.

## Declarative — the first OpenGitOps principle

The OpenGitOps working group (under the CNCF) formalized four
principles that define what counts as "real" GitOps, and the first one
is **Declarative**: *"A system managed by GitOps must have its desired
state expressed declaratively."* Not scripts that run commands — actual
descriptions of the end state, like the `Deployment` above. This is
the principle this lesson is grounded in, and it's why the manifests
you already know how to write are a prerequisite for everything that
follows, not incidental to it.

## Versioned and Immutable — the second principle

The second principle is **Versioned and Immutable**: *"Desired state is
stored in a way that enforces immutability, versioning, and retains a
complete version history."* Git satisfies this almost by accident,
because it's exactly what Git was built for. Every commit is an
immutable, content-addressed snapshot. `git log -- apps/payments-api/`
gives you a complete history of every change to that deployment, who
made it, and when. `git revert <sha>` undoes a bad change by creating a
new commit that reverses it — no guessing what the "previous" state
was, because it's sitting right there in history. None of that is true
of a cluster you edited by hand: `kubectl` has no concept of "what this
deployment looked like three weeks ago."

## A repo layout that earns the title

A repository that's genuinely a source of truth has a structure, not
just a pile of files:

```
gitops-repo/
  apps/
    payments-api/
      base/
        deployment.yaml
        service.yaml
        kustomization.yaml
      overlays/
        staging/
          kustomization.yaml
        production/
          kustomization.yaml
```

`base/` holds the common manifest; each `overlays/<env>/` applies
environment-specific patches (replica counts, resource limits, image
tags) on top of it via Kustomize. Every change — a new image tag, a
scaled-up replica count, a new environment variable — goes through a
normal pull request against this repo. That PR is where review happens,
where CI can validate the YAML, and where the change gets its permanent
entry in history. The cluster never sees a change that didn't pass
through that door.

## Key terms

| Term | Meaning |
|---|---|
| Declarative configuration | A manifest describing the desired end state, not a sequence of commands to reach it |
| Imperative command | A direct instruction (`kubectl scale`, `kubectl edit`) that changes cluster state with no durable record of intent |
| Single source of truth | The one place — here, a Git branch — whose content is treated as authoritative; the cluster is expected to match it, not the reverse |
| OpenGitOps Declarative principle | Desired state must be expressed declaratively, not as imperative scripts |
| OpenGitOps Versioned and Immutable principle | Desired state must be stored with full version history and immutable snapshots — exactly what Git commits provide |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is a declarative `Deployment` manifest more trustworthy as a "source of
truth" than an imperative `kubectl scale` command, and which two
OpenGitOps principles does a well-structured Git repo satisfy on its
own, before any GitOps agent even enters the picture?
