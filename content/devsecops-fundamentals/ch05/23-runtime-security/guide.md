# Runtime Security

Every control so far in this chapter — image scanning, hardening, Kubernetes posture, pipeline gates — operates before or at deploy time. Runtime security is what watches a container *while it's actually running* in production, because some things only reveal themselves once a workload is live, no matter how carefully everything before it was checked.

## What you'll learn

- What runtime security watches for that build-time scanning structurally cannot see
- What a real Falco rule looks like, and how to read its condition and output
- A concrete example of the blind spot: a shell spawned inside a container that should never need one
- How runtime security connects forward to Chapter 6's incident response

## What build-time scanning can't see

Lesson 20's image scan checks what's installed in an image. Lesson 21's Kubernetes posture checks what a pod is *allowed* to do. Neither one can see what a container actually *does* once it's running — and that gap matters, because an attacker who gets code execution inside a container doesn't need a new vulnerability to cause damage; they need to do something the running process was never supposed to do in the first place.

**Falco**, built on eBPF, watches kernel-level system calls from every running container in real time and evaluates them against a set of rules.

## A real Falco rule, read line by line

Here's a well-known Falco rule, adapted for Northbridge Retail's checkout namespace:

```yaml
- rule: shell_in_container
  desc: notice shell activity within a container
  condition: container.id != host and proc.name = bash
  output: shell in a container (user=%user.name container_name=%container.name)
  priority: warning
  tags: [shell, container]
```

The `condition` is the actual detection logic: it fires whenever a process is running inside a container (not on the bare host) and that process is `bash`. The `output` is the alert message, with `%user.name` and `%container.name` filled in from the live event when it fires. `priority` controls how loudly it's surfaced, and `tags` let a team filter a large ruleset down to a specific category.

## Why a shell in that container is the alert, not the vulnerability

Northbridge Retail's checkout service — built as a hardened, distroless image back in Lesson 20 — doesn't even *have* a shell binary available to run. If Falco's rule ever fires for that container, it's not catching a shell someone intended to use for debugging; it means something got into the container through a path nobody authorized, and is now trying to interact with it the way an attacker would. The hardening from Lesson 20 doesn't just prevent this — it makes it a far louder, far more certain signal if it somehow happens anyway, because a legitimate reason for that event should not exist at all.

## Where this connects forward

A Falco alert firing in production is exactly the kind of event that triggers Chapter 6's incident response process — runtime security is the detection layer, and what happens after detection (triage, containment, the retrospective) is a separate discipline covered starting in Lesson 28.

## Key terms

- **Runtime security** — monitoring running containers and workloads for anomalous behavior, as opposed to scanning them before deployment
- **Falco** — an open-source, eBPF-based runtime security tool that evaluates live kernel system calls against a rule set
- **Condition** — the Falco rule field defining the exact logical trigger for an alert
- **eBPF** — a Linux kernel technology allowing programs (like Falco's sensors) to observe system calls efficiently, without modifying the kernel
