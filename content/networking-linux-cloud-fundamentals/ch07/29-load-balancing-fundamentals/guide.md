# Lesson 29 — Load Balancing Fundamentals

**Chapter 7 · Cloud Networking & Storage Concepts · Lesson 29 of 32**

## What you'll learn

- Why spreading traffic across multiple backend servers matters for both availability and scale
- The difference between Layer 4 (transport) and Layer 7 (application) load balancing
- How health checks let a load balancer stop sending traffic to a server that's actually broken
- Real examples: AWS's Network Load Balancer (NLB) vs. its Application Load Balancer (ALB)

## Why not just run one bigger server?

A **load balancer** sits in front of a group of backend servers and distributes incoming traffic
across them, instead of sending every request to a single machine. That solves two different
problems at once. First, **availability**: if one backend instance crashes or is being patched,
the load balancer simply stops sending it traffic and the rest keep serving requests, so users
never notice. Second, **scale**: instead of trying to build one enormous server that can handle
all your traffic alone, you add more modestly-sized instances behind the load balancer as demand
grows.

```
                    ┌─> Backend instance 1
Incoming traffic -> Load Balancer -> Backend instance 2
                    └─> Backend instance 3
```

## Layer 4: fast, but blind to content

A **Layer 4** load balancer operates at the transport layer — it looks at IP addresses and port
numbers and forwards packets based purely on that, without inspecting what's actually inside the
request. It doesn't know or care if the traffic is an API call for `/login` or `/images` — it just
sees "TCP traffic headed for port 443" and routes it. That makes Layer 4 load balancing very fast
and low-overhead. AWS's **Network Load Balancer (NLB)** is a real example of this — built for raw
throughput and extremely low latency.

## Layer 7: application-aware routing

A **Layer 7** load balancer operates at the application layer — it actually reads the HTTP request
(the URL path, headers, cookies) and can make smarter routing decisions based on content, not just
IP and port. That lets it do things Layer 4 simply can't:

```
Layer 7 routing rules:
  /api/*     -> backend pool "api-servers"
  /images/*  -> backend pool "image-servers"
  /          -> backend pool "web-servers"
```

AWS's **Application Load Balancer (ALB)** is the real example here — it can route by URL path
exactly like that, which is what lets one load balancer sit in front of several different backend
services that together make up a single application.

## Health checks: don't send traffic to something broken

Both layers rely on **health checks** — the load balancer periodically pings each backend instance
(often just a simple HTTP request to a `/health` endpoint, or a basic connection attempt) to
confirm it's actually responding correctly. If an instance fails enough consecutive health checks,
the load balancer marks it unhealthy and stops routing traffic to it until it starts passing
checks again. This is the actual mechanism behind the availability benefit from the first
section — the load balancer isn't guessing which instance is broken, it's continuously verifying.

## Key terms

| Term | Meaning |
|---|---|
| Load balancer | A component that distributes incoming traffic across multiple backend instances |
| Layer 4 load balancing | Routes based only on IP address and port, without inspecting the request's content (e.g. AWS NLB) |
| Layer 7 load balancing | Routes based on application-layer content like URL path, headers, or cookies (e.g. AWS ALB) |
| Health check | A periodic probe that confirms a backend instance is actually responding before sending it traffic |

## Check yourself

A load balancer needs to route `/api/*` requests to one backend pool and `/images/*` requests to a
different one. Would you reach for a Layer 4 or a Layer 7 load balancer, and why?
