# Linux & Networking Interview Questions

Every DevOps technical screen eventually drops down from Kubernetes and pipelines into the Linux and networking fundamentals underneath them, because that's where real outages actually live. This lesson walks through real sample questions from that layer, with model answers — a couple tied directly back to how Northbridge's AKS nodes and ingress actually behave.

## What you'll learn

- How to answer process and signal questions precisely, not just "kill stops a process"
- What a strong systemd answer covers beyond "it starts services"
- The DNS resolution order and TCP handshake, explained the way an interviewer wants to hear them
- How load balancer and ingress health checks actually decide where traffic goes

## Sample questions and model answers

**Q: What's the difference between `SIGTERM` and `SIGKILL`, and why does it matter for deploys?**
`SIGTERM` (signal 15) asks a process to shut down gracefully — it can catch the signal, finish in-flight work, close connections, and exit on its own terms. `SIGKILL` (signal 9) terminates the process immediately with no chance to clean up. It matters for deploys because Kubernetes sends `SIGTERM` to a pod's containers on termination, waits out `terminationGracePeriodSeconds`, and only then sends `SIGKILL`. If checkout doesn't handle `SIGTERM` and finish in-flight order submissions before that grace period expires, a rolling deploy can drop orders mid-flight.

**Q: What does systemd actually give you over a plain init script?**
Parallelized, dependency-aware service startup; automatic restart policies (`Restart=on-failure`); socket activation; structured logging straight into `journald`; and unit files that declare dependencies (`After=`, `Requires=`) instead of relying on ordering in a shell script. On any of Northbridge's AKS nodes, the kubelet itself and container runtime both run as systemd units — `systemctl status kubelet` and `journalctl -u kubelet` are the first two commands when a node looks unhealthy.

**Q: Walk me through DNS resolution order on a Linux host.**
The resolver checks, in order: `/etc/hosts` for a static entry, then `/etc/nsswitch.conf` to see which sources to consult and in what order (commonly `files` before `dns`), then the resolvers listed in `/etc/resolv.conf`, which queries a DNS server — recursively, starting at a root server if nothing is cached, down through TLD and authoritative servers. Inside a Kubernetes pod this chain is shortened: CoreDNS is the cluster's resolver, and a Service name like `checkout.northbridge-dev.svc.cluster.local` resolves through CoreDNS without ever leaving the cluster network.

**Q: Explain the TCP three-way handshake and why it matters for a health check.**
`SYN` from the client, `SYN-ACK` from the server, `ACK` from the client — only after that does the connection move to `ESTABLISHED` and data starts flowing. It matters for health checks because a check that only confirms the TCP handshake succeeds (the port is open) tells you nothing about whether the application itself is healthy — that's why Kubernetes distinguishes a TCP `readinessProbe` from an HTTP one. NGINX Ingress in front of `checkout` uses HTTP-level health checks against the pods behind the Service, not just a TCP connect, so a pod that accepts connections but can't actually process requests gets pulled out of rotation.

**Q: How does a load balancer decide a backend is unhealthy?**
It polls a configured health check endpoint (TCP connect, or an HTTP path expected to return 2xx) on an interval, and after a configured number of consecutive failures, marks that backend unhealthy and stops routing new traffic to it — then restores it after a matching number of consecutive successes. This is exactly the mechanism behind a Kubernetes `readinessProbe`: a pod that fails it gets removed from a Service's endpoint list without being killed, which is different from a `livenessProbe` failure, which restarts the container.

## Key terms

| Term | Meaning |
|---|---|
| SIGTERM vs SIGKILL | Graceful shutdown request vs. immediate, non-catchable termination |
| systemd | Linux init system managing service startup, dependencies, restarts, and logging |
| CoreDNS | The DNS resolver inside a Kubernetes cluster, resolving Service names |
| Readiness vs. liveness probe | Readiness removes a pod from traffic; liveness restarts the container |
