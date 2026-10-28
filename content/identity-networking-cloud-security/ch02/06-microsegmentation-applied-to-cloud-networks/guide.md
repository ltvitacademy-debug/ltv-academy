# Lesson 6 — Microsegmentation Applied to Cloud Networks

**Chapter 2 · Zero Trust Networking Principles · Lesson 6 of 32**

## What you'll learn

- What microsegmentation actually means, in plain terms
- Why one large "trusted" network segment is exactly what Zero Trust tries to eliminate
- How the NSGs and Security Groups you've already used elsewhere in this path apply to
  microsegmentation when scoped with Zero Trust intent
- The difference between broad, subnet-wide rules and tight, per-workload rules

## One big trusted zone is the problem

Lesson 5 established that Zero Trust never grants blanket trust to anything just because
of where it sits on the network. **Microsegmentation** is how that principle gets applied
directly to network design: instead of one large network zone where everything inside can
freely talk to everything else, the network is broken into many small, individually secured
segments. Each segment gets its own access rules, scoped as narrowly as the workload
actually requires. The goal isn't just organization — it's containment. If an attacker (or
malware) compromises one workload, microsegmentation is what stops them from moving freely
to every other workload on the same network, a pattern known as **lateral movement**.

## The tools haven't changed — the intent has

You've already worked with Azure **Network Security Groups (NSGs)** and AWS **Security
Groups** earlier in this path as basic traffic filters. Microsegmentation doesn't introduce
new tools — it changes how tightly you scope the ones you already have. A perimeter-style
NSG rule might allow any traffic between any two resources inside the same subnet, on the
assumption that everything inside is already trusted. A microsegmented NSG rule instead
names the exact source, the exact destination, and the exact port a specific workload tier
is allowed to use — a web tier can reach an app tier on port 443, full stop, and nothing
else is permitted by default. That shift from "anything inside this subnet" to "exactly
this workload to exactly that workload" is the whole difference.

## Deny by default, allow by exception

A microsegmented network starts from **deny-by-default**: no traffic is allowed between
segments unless a rule explicitly permits it. **East-west traffic** — the industry term for
traffic moving between systems inside the network, as opposed to north-south traffic
entering or leaving it — gets the same scrutiny internal perimeter defenses used to reserve
only for traffic crossing the firewall. Azure adds **Application Security Groups** on top
of NSGs specifically for this: instead of writing rules against a subnet's IP range, you
group VMs by role (web, app, database) and write the rule against the role itself, so the
rule keeps working even as individual machines come and go.

## Example: a three-tier app, locked down

A web app has a web tier, an app tier, and a database tier, each in its own subnet. The
perimeter-style approach allows any VM in any of the three subnets to reach any other VM on
any port — simple, but a compromised web server could reach the database directly. The
microsegmented approach uses three NSGs: web-to-app allowed only on port 443, app-to-database
allowed only on port 1433, and nothing else permitted between tiers at all — not even
app-to-app on an unused port. A compromised web server in this setup can reach the app tier
on the one port it's allowed to use, and nothing else.

## Key terms

| Term | Meaning |
|---|---|
| Microsegmentation | Breaking a network into many small, individually secured segments instead of one large trusted zone |
| Lateral movement | An attacker moving from one compromised system to others on the same network |
| East-west traffic | Traffic moving between systems inside a network, as opposed to north-south traffic crossing its edge |
| Deny-by-default | A rule design where no traffic is permitted unless explicitly allowed |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what specifically changes
about an NSG rule when it's written with microsegmentation in mind, compared to a broad,
subnet-wide rule?
