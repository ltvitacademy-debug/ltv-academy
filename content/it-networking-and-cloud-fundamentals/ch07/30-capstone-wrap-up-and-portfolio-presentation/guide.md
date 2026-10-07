# Capstone: Wrap-Up & Portfolio Presentation

The network is built, the fault is found, and the fix works. What's left is the part that actually matters for a job search: turning this project into something a hiring manager can look at and immediately understand, without having lived through the three lessons that got you here.

## What you'll learn

- What a capstone writeup needs to include to work as a portfolio piece
- How to describe the broken scenario and its fix in a way a non-technical reader can follow
- What to actually say when presenting this project out loud, in an interview or otherwise
- Where this course leads next in the DevOps Engineer path

## What belongs in the writeup

A strong portfolio entry for this project is not a transcript of everything you did — it's a focused document a stranger can read in a few minutes and come away understanding both what you built and that you can troubleshoot a real problem. At minimum, it needs:

- **An architecture diagram** — even a simple one, showing the office subnet, the firewall, the VPN tunnel, and the cloud-hosted systems it connects to.
- **A README** — the brief, the requirements, and the design decisions (why a `/26`, why DHCP plus static reservations, why a VPN instead of exposing the office to the internet).
- **The problem/fix narrative** — stated plainly: what broke, how you found it, and how you fixed it.
- **A way to verify it** — the specific test (a `ping`, a `curl`, a traceroute) that proves the fix actually worked, not just a claim that it did.

## Writing the problem/fix narrative

This is the part that actually demonstrates skill, more than the network diagram does. A good version of it reads like this: "Employees at a new office could reach internal file shares but not a cloud-hosted inventory system, even though the VPN tunnel was confirmed up. I isolated the problem by testing connectivity in stages — the tunnel itself, then the destination — and found that the office's outbound firewall rule had never been updated to include the inventory system's IP range when it was added after the checkout service. Adding that rule resolved it." That's four sentences, and it shows exactly the methodology from Chapter 5 in action, which is far more convincing than just saying "I fixed a network issue."

## Presenting it out loud

In an interview or a portfolio walkthrough, the same shape works verbally: state the symptom, state what you ruled out and why, state what you found, state the fix. Resist the urge to narrate every step you tried that didn't work — a clear, short version of the real path to the answer reads as more competent than a long one, not less.

## What comes next

This course covered the foundation: hardware, networking, core protocols, security services, troubleshooting, and the cloud. The next course in the DevOps Engineer path, **Linux Administration**, moves from the network layer onto the operating system itself — the CLI, permissions, users, processes, and the Bash scripting that automates all of it.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio writeup | A focused document describing a project for an audience that didn't build it |
| Problem/fix narrative | A short, plain-language account of what broke, how it was found, and how it was fixed |
| Verification | Proof the fix actually worked, not just a claim that it did |
| Architecture diagram | A visual summary of the system's components and how they connect |
