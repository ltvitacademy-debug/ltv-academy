# Lesson 32 — Foundations Capstone: Diagnosing a Connectivity Problem

**Chapter 8 · Bringing It Together · Lesson 32 of 32**

## What you'll learn

- A real diagnostic sequence for "I can't reach my VM," layer by layer, instead of guessing
- How to tell a cloud-networking problem apart from an operating-system problem before you start changing things
- Why checking logs on the VM itself is sometimes the only way to tell those two apart
- How this habit — network layer, then cloud config layer, then OS/service layer — carries into everything the rest of this path builds on

## The incident

Two weeks after Lesson 31's VM went live, Briarcliff Systems spins up a second Linux VM —
a small internal web app — in the same `app` subnet. The ticket lands on your desk: "Can't SSH
into the new VM. Connection just hangs." Nothing about this is exotic; it's the single most common
early-career cloud ticket there is. What matters is the order you check things in.

## Step 1 — Is the VM actually running?

Before touching networking at all, you confirm the basics: `az vm get-instance-view` shows
`PowerState/running`. The VM is up. That rules out the simplest possible explanation and tells you
the problem is somewhere between your laptop and that running machine — which means you're looking
at either the cloud networking layer or the OS layer next, not a VM that silently failed to boot.

## Step 2 — Is the security group actually allowing port 22 from here?

This is where it gets interesting. You list the NSG rules on the `app` subnet:

```
az network nsg rule list --nsg-name app-nsg --resource-group briarcliff-rg -o table
Priority  Name        Access  Protocol  SourceAddressPrefix  DestinationPortRange
100       Allow-SSH   Allow   Tcp       203.0.113.0/24        22
```

The rule is there, and it still matches exactly what you set up in Lesson 31 — but Briarcliff's
team moved to a new office last month, and their outbound public IP is now `198.51.100.42`, inside
`198.51.100.0/24`, not the old `203.0.113.0/24` range the rule still points at. The rule hasn't
changed; the office has. From the new office, your SSH traffic never matches the allow rule, so
the NSG silently drops it — no error, no response, just a hang. That's exactly the symptom on the
ticket.

## Step 3 — Checking the route table, just to be sure

Before locking in that diagnosis, you check the subnet's effective routes to rule out a bad
user-defined route overriding the default `0.0.0.0/0` → internet path. It's untouched — the
default system route is still in place. This step doesn't find the bug, but it's not wasted: it
confirms the problem is specifically the NSG rule's source range, not routing in general.

## Step 4 — Confirming the OS layer is actually fine

Because this VM has no public-facing issue and you still have console access through the Azure
serial console, you check the service directly: `systemctl status sshd` shows `active (running)`.
You also check `/var/log/auth.log` on the VM — it's essentially empty, with no failed or
successful login attempts at all. That absence is itself the evidence: if traffic were reaching
the VM and failing to authenticate, the log would show attempts. It shows none, which means the
traffic never arrived. The OS and `sshd` were never the problem.

## Step 5 — The fix

The root cause is the NSG rule's stale source range. The fix is a one-line update:

```
az network nsg rule update --nsg-name app-nsg --resource-group briarcliff-rg \
  --name Allow-SSH --source-address-prefixes 198.51.100.0/24
```

`ssh azureuser@<vm-ip>` now connects immediately. Nothing about the VM, its subnet placement, or
its route table ever needed to change — the entire incident was one stale IP range in a security
group rule, left over from an office move nobody told the infrastructure team about.

## Why the order mattered

Notice the sequence: confirm the VM is running, check the cloud configuration (NSG, then route
table) that sits between the internet and the VM, and only then check the OS and its services.
That order isn't arbitrary — it moves from the broadest, fastest checks to the narrowest ones, and
it's exactly how every layer of this course stacks: packets and addressing (Chapter 1), the
infrastructure and services that route and filter them (Chapter 2), the Linux host and its
services underneath (Chapters 3-4), and the cloud networking constructs — VNets, subnets, security
groups — that wrap around all of it (Chapters 5-7). That same habit, network layer first, then
cloud config, then OS and services, is exactly what the next course in this path, Microsoft Azure
Administration, Compute & Storage, builds directly on top of.

## Key terms

| Term | Meaning |
|---|---|
| Effective routes | The actual, resolved set of routes governing a subnet after system and user-defined routes combine |
| Stale security rule | A firewall/NSG rule that was correct when written but no longer matches current conditions (like a changed office IP) |
| Serial console | An out-of-band way to reach a VM's console when normal network access (like SSH) isn't working |
| Layered diagnosis | Checking broad infrastructure layers before narrower ones, so you don't change the wrong thing first |

## Check yourself

The `/var/log/auth.log` file on the VM showed no login attempts at all, not failed attempts —
why does that specific detail point at the network/NSG layer rather than at `sshd` or user
authentication?
