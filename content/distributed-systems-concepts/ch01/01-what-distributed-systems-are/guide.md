# What Distributed Systems Are

Welcome to Distributed Systems Concepts. This course is about the ideas that sit underneath almost every large piece of software you've touched — from a DNS lookup to a bank transfer to the backend behind a video stream. This first lesson answers the most basic question before anything else: what actually *is* a distributed system, and why do we build them instead of just buying one really big computer?

## What you'll learn

- A working definition of a distributed system
- The three main reasons we build them: scale, geography, and fault isolation
- The core difficulty that makes distributed systems hard: no shared memory, no global clock, partial failure
- Real examples you already use: DNS, distributed databases, microservices
- The "fallacies of distributed computing" — assumptions that quietly break production systems

## Defining a distributed system

A **distributed system** is a collection of independent computers that coordinate with each other over a network so that, to the people and programs using it, they appear as a single, coherent system. The word "independent" is doing real work in that sentence: each machine has its own memory, its own clock, and its own chance of failing, completely separately from the others. Nothing is shared except the network connecting them. When you send a message on a chat app, dozens of machines across multiple data centers cooperate to deliver it, but you experience it as one app, not a federation of servers.

## Why we build them instead of one big machine

There are three main reasons distributed systems exist instead of a single, very powerful computer:

- **Scale beyond one machine.** At some point, no single server — no matter how much RAM or how many CPU cores you add — can handle the load. Splitting work across many machines lets capacity grow by adding more of them.
- **Geographic distribution.** Users are spread across the planet, and the speed of light is not negotiable. Placing servers close to users in multiple regions cuts the time each request takes to travel.
- **Fault isolation.** A single machine is a single point of failure. Spreading the same work across many machines means one server catching fire doesn't take the whole system down with it.

## The core difficulty: no shared memory, no global clock, partial failure

A program running on one machine can trust a few things that fall apart the moment you add a second machine. There's no shared memory — one machine can't simply read another's variables, it has to send a message and wait. There's no global clock — each machine's clock drifts slightly, so "at the same time" is a much fuzzier idea than it feels like. And failure becomes partial — instead of the whole program crashing together, one of ten machines can die while the other nine keep running, which creates confusing in-between states no single-machine program ever has to handle.

## Real examples you already rely on

- **DNS**, the system that turns a domain name into an IP address, is a huge distributed system of its own: thousands of servers worldwide, each holding part of the answer, cooperating so a lookup resolves in milliseconds from anywhere.
- A **distributed database** spreads rows of data across multiple machines so no single disk or server has to hold everything, and so a failed node doesn't mean lost data.
- A **microservices backend** splits one application into many small, independently-running services — an order service, a payments service, a shipping service — that call each other over the network to fulfill one user request.

## The fallacies of distributed computing

Engineers at Sun Microsystems famously cataloged a list of assumptions that programmers new to distributed systems tend to make — and that production outages tend to punish. Three of the most important:

- **The network is not reliable.** Packets get dropped, connections get reset, and "the call will just work" is not a safe assumption.
- **Latency is not zero.** Every network call takes real time to travel, even on a fast connection, and that time adds up across a request.
- **Bandwidth is not infinite.** There is a ceiling on how much data can move between machines per second, and large or frequent transfers can hit it.

## Key terms

| Term | Meaning |
|---|---|
| Distributed system | Independent computers that coordinate over a network to appear as one system |
| Fault isolation | Spreading work so one machine's failure doesn't bring down the whole system |
| Partial failure | Some machines in a system fail while others keep running correctly |
| Fallacies of distributed computing | A classic list of false assumptions (reliable network, zero latency, infinite bandwidth) that break distributed systems in practice |

## Recap

A distributed system is a set of independent machines coordinating over an unreliable network to look like one system — built for scale, geography, and fault isolation, and made hard by the loss of shared memory, a global clock, and all-or-nothing failure. Next up, Lesson 2: availability.
