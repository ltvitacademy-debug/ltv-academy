# The Qiskit SDK vs. the IBM Quantum Platform

It's easy to conflate "Qiskit" and "IBM's quantum computers" into one thing, but they're genuinely separate layers with a sharp line between them — one is free software you run yourself, the other is a cloud service with an account and usage limits. Knowing which one you're using at any moment matters for both your workflow and your expectations.

## What you'll learn

- The clear distinction between the Qiskit SDK (local, free, open-source) and the IBM Quantum Platform (cloud, account-gated)
- Why almost all of your learning and circuit-building in this course happens entirely offline
- What the Platform actually adds once you need it: real hardware and managed execution primitives
- Why free-tier limits are a moving target you should verify, not memorize
- When this course actually asks you to cross from one layer into the other

## Two different things wearing one name

**The Qiskit SDK** is the open-source Python library you installed in the previous lesson — `qiskit`, `qiskit-aer`, and friends. It runs entirely on your own machine. You don't need an account, an internet connection, or anyone's permission to build a circuit and simulate it with `AerSimulator`. It costs nothing, has no usage quota, and nothing you do with it ever leaves your computer unless you explicitly submit a job somewhere.

**The IBM Quantum Platform** is IBM's cloud service — a separate thing entirely. It's where real superconducting quantum processors physically live, and where IBM exposes managed execution primitives for submitting jobs to them through `qiskit-ibm-runtime`. Using it requires the account and credentials you set up in the previous lesson, it tracks your usage against an instance, and — even on its free/open tier — it enforces usage limits.

The two are connected (the SDK is the client you use to talk to the Platform) but they are not the same thing, and you can use one without ever touching the other.

## Why you can learn Qiskit entirely offline

Every circuit-building and debugging skill covered through Chapter 4 of this course — constructing circuits, understanding gates, running them through `AerSimulator`, interpreting measurement counts — requires nothing from the Platform. `AerSimulator` is a classical simulation running on your CPU. It reproduces exactly how a circuit's logic plays out (subject to the shot noise you'll study in Chapter 3), with no network call, no account, and no risk of burning through a usage quota while you experiment and make mistakes. This is by design: the whole point of local simulation is that it's the cheap, fast, unlimited place to get a circuit right before it ever needs to go near real hardware.

## What the Platform adds, and when you need it

The one thing local simulation cannot give you is a measurement from an actual physical quantum device — with the real noise, real decoherence, and real hardware constraints that come with it. That's the entire value proposition of the IBM Quantum Platform: access to real quantum processors, plus the managed "primitives" (higher-level interfaces for sampling and estimation) that `qiskit-ibm-runtime` exposes on top of them.

You'll work with the Platform directly starting in Chapter 5, once you've already built the circuit-construction and simulation fundamentals this course front-loads. Until then, treat the account you created last lesson as something that exists and is ready, not something you need to touch yet.

## Be skeptical of any specific free-tier number you read

IBM periodically adjusts the quotas on its free/open-plan access — how much execution time or how many jobs you get, and under what conditions. Any specific number you might read in a blog post, a forum answer, or even an older version of this course's own materials can go stale. Don't memorize a figure and assume it still holds; check the current IBM Quantum Platform pricing or plans page when it actually matters to your work, which in practice is only once you reach Chapter 5 and start submitting real jobs.

## Key terms

| Term | Meaning |
|---|---|
| Qiskit SDK | The open-source Python library (`qiskit`, `qiskit-aer`, etc.) that runs entirely locally, free, with no account required |
| IBM Quantum Platform | IBM's cloud service providing access to real quantum hardware and managed execution primitives, requiring an account |
| `qiskit-ibm-runtime` | The client library that connects the local SDK to the cloud Platform |
| Managed primitives | Higher-level sampling/estimation interfaces the Platform exposes on top of raw hardware access |
| Free/open-plan quota | Usage limits IBM applies even to free-tier Platform access; the exact numbers change over time, so verify current docs rather than trusting a memorized figure |

## Check yourself

You've spent three weeks building and debugging circuits using only `AerSimulator`, without ever logging into the IBM Quantum Platform. Have you been "doing it wrong," and at what point in your learning would logging into the Platform actually start to matter?
