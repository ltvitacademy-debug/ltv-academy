# Script — Linux & Networking Interview Questions

## Segment 1 (title)

Every DevOps technical screen eventually drops down from Kubernetes and pipelines into the Linux and networking fundamentals underneath, because that's where real outages actually live. Here are real sample questions, with model answers worth rehearsing out loud.

## Segment 2 (code)

Take signals. SIGTERM politely asks a process to shut down, giving it a chance to finish in-flight work and close connections cleanly; SIGKILL terminates it immediately with no chance to clean up at all. Kubernetes sends SIGTERM, waits out the termination grace period, then sends SIGKILL. A strong answer connects that straight to real risk: if checkout doesn't handle SIGTERM properly, a rolling deploy can drop an order that was mid-submission.

## Segment 3 (steps)

Three more come up constantly. systemd gives you parallel startup, automatic restarts, and journald logging that a plain init script never had, plus unit files that declare real dependencies instead of relying on shell-script ordering. DNS resolution walks through the hosts file, nsswitch configuration, and resolv.conf before it ever queries a server recursively, starting from the root if nothing's cached. And the TCP handshake — SYN, SYN-ACK, ACK — is the foundation every single health check sits on top of.

## Segment 4 (steps)

That handshake matters because a check that only confirms a port is open tells you nothing about whether the application itself is actually healthy. That's exactly why the NGINX Ingress in front of checkout relies on an HTTP-level readiness probe rather than a bare TCP check — readiness pulls an unhealthy pod out of traffic without killing it, while a failed liveness check restarts the container instead.

## Segment 5 (outro)

Next up, lesson twenty-two: CI/CD and cloud interview questions, grounded in the real GitHub Actions pipeline you built for Northbridge.
