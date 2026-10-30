# Lesson 7 — Rolling Out the Segmentation Pilot

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 7 of 26**

## What you'll learn

- Why the Lesson 5 plan deploys in monitor-only mode before enforcement,
  and what Mara actually does with that logging period
- The specific connectivity tests used to validate the new zones before and
  after flipping to enforcement
- What Hartwell's rollback plan looks like, and why writing it down before
  go-live matters
- How this rollout closes pillar one of the target architecture

## Monitor-only mode: finding out what you don't know

Lesson 5 produced the rule sets; this lesson deploys them. Hartwell's
network team applies the NSG rules on `snet-scada-gateway` and the AWS
Network Firewall rule group on `vpc-hartwell-scada`, but with each new deny
rule set to **log the match instead of actually blocking it** for a
two-week observation window. This is the same shift-the-risk-left logic
Mara already knows from DevSecOps: catch a problem by watching for it
before it becomes a production incident, not after.

During that window, Mara reviews the logged "would-have-been-denied"
traffic daily. The two findings that actually surface:

- A vendor's remote maintenance tool reaches the SCADA gateway subnet
  directly from a corporate IP outside the planned jump-zone range — a real,
  legitimate dependency nobody had documented, caught before enforcement
  would have broken a scheduled maintenance window.
- A monitoring agent on an OT device polls a corporate logging server
  outside the allow-listed path — flagged, reviewed with the OT team, and
  rerouted through the jump zone rather than simply allow-listed as an
  exception, keeping the "everything routes through the jump zone" rule
  intact.

Both get resolved *before* enforcement, which is exactly the point of
running monitor-only first: a legitimate dependency becomes a planned fix
instead of an outage ticket.

## Flipping to enforcement

Once the observation window closes clean — no further undocumented
dependencies surfacing for several consecutive days — Mara and the network
team flip the deny rules from log-only to actually blocking, during a
scheduled maintenance window with Okonjo and the OT operations lead both
informed in advance. The explicit `Deny-All-Inbound` rule from Lesson 5 is
no longer theoretical; it's now live.

## Validating the result

Immediately after enforcement goes live, Mara runs planned connectivity
tests from both allowed and disallowed sources, confirming the design
behaves exactly as written:

```python
import socket

def check(host, port, label, timeout=3):
    try:
        with socket.create_connection((host, port), timeout=timeout):
            print(f"{label}: REACHABLE  ({host}:{port})")
    except (socket.timeout, ConnectionRefusedError, OSError):
        print(f"{label}: BLOCKED     ({host}:{port})")

check("10.40.0.10", 443, "From jump zone (10.30.0.x) -> SCADA gateway, 443")   # expect REACHABLE
check("10.40.0.10", 22,  "From jump zone (10.30.0.x) -> SCADA gateway, 22")    # expect BLOCKED
check("10.40.0.10", 443, "From corporate IT (10.10.0.x) -> SCADA gateway")     # expect BLOCKED
```

Run from each source zone in turn, this confirms three things at once: the
one intended path works, an unneeded port on that same path is still
blocked, and the corporate zone that should never reach SCADA directly is
in fact blocked. All three results have to match expectation before the
pilot is considered validated — a path that's unexpectedly open is as much
a finding as one that's unexpectedly blocked.

## The rollback plan, written before go-live

Before the maintenance window, not during it, Mara and the network team
write down the rollback trigger and procedure: if enforcement breaks a
dependency the monitor-only window didn't catch, the deny rules revert to
log-only within a defined time limit, restoring the pre-enforcement state
while the missed dependency gets investigated — rather than improvising an
emergency fix live, under pressure, during an actual OT outage. Having that
plan written in advance, and never needing to use it, is itself evidence
Mara can show Okonjo that the rollout was run carefully.

## Key terms

| Term | Meaning |
|---|---|
| Monitor-only (log-only) mode | Deploying new deny rules so they log what they would have blocked, without actually blocking it, to surface undocumented dependencies safely |
| Observation window | The defined period a change runs in monitor-only mode before flipping to enforcement |
| Connectivity validation | Deliberately testing both allowed and disallowed paths after a change, confirming the design matches intent in both directions |
| Rollback plan | A pre-written trigger and procedure for reverting a change, prepared before go-live rather than improvised during an incident |

## Lab

1. List the two real dependencies the monitor-only window surfaced in this
   lesson, and how each was resolved without creating a new broad
   exception.
2. Write the three connectivity checks this lesson runs after enforcement,
   and the expected result (reachable or blocked) for each.
3. Explain why the rollback plan has to be written before the maintenance
   window, not during it.

## Check yourself

You're ready for Lesson 8 when you can explain why monitor-only mode runs
before enforcement, describe how the post-enforcement connectivity tests
validate both the allowed and disallowed paths, and explain why a written
rollback plan matters even if it's never used.
