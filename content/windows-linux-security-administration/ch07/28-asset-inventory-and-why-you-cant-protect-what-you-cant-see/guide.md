# Lesson 28 — Asset Inventory and Why You Can't Protect What You Can't See

**Chapter 7 · Endpoint Protection & Monitoring · Lesson 28 of 32**

## What you'll learn

- Why an asset that isn't tracked gets none of the protections covered earlier in this chapter, by definition
- What a CMDB (Configuration Management Database) is and what it's actually used for
- How a network discovery scan finds devices a CMDB doesn't know about
- How this ties directly back to the attack-surface concept from earlier in the program

## Why an unknown asset gets zero protection

Every tool covered so far in this chapter — signature antivirus, EDR, a Linux agent — only
protects assets it knows about. An asset that isn't tracked anywhere gets none of those
protections, and that's not a minor gap, it's absolute. IT can't push an EDR agent to a
device it doesn't know exists. A patch management program can't patch a server that isn't
on its list. Nobody is reviewing logs from a machine nobody registered in the first place.
An untracked asset isn't neutral — it's **pure attack surface**: exposed to exactly the
same network as everything else, defended by nobody, and often the easiest way into an
environment precisely because no one is watching it.

That's the same attack-surface idea from earlier in this program, just viewed from a
different angle. Attack surface isn't only about which ports are open or which services are
exposed to the internet — it includes every asset that exists on a network at all, known
or not. An asset you don't know about adds to your attack surface without adding anything
to your defenses.

## The CMDB: a system of record

The usual answer is a **CMDB**, or Configuration Management Database — a system of record
listing every known hardware and software asset, along with its owner, operating system,
patch level, and business criticality. Patch management, vulnerability scanning, and EDR
deployment programs all draw their scope from that list. If a server isn't entered in the
CMDB, most organizations' security tooling never even considers it a target to protect,
simply because nothing told it the target exists.

The problem is that a CMDB only reflects what's been entered into it, and nothing enforces
that every new device actually gets added. A developer spinning up a quick test VM, a
contractor plugging in an unmanaged laptop, a team standing up a server for a short-lived
project — none of that guarantees an entry in the CMDB, even though every one of those
devices is now live on the network.

## Network discovery scans: finding what the CMDB doesn't know

A **network discovery scan** closes that gap from the other direction — not by trusting
what's recorded, but by actively checking what's actually there.

```
nmap -sn 10.20.0.0/16
nmap -sV -O 10.20.14.37
```

`nmap -sn 10.20.0.0/16` performs a ping sweep across an entire subnet, finding every
address that responds — every device actually alive on the network right now, regardless
of whether it was ever documented anywhere. `nmap -sV -O` against a specific host then
fingerprints its running services and operating system once a live device has been found,
giving enough detail to figure out what it actually is.

## Reconciliation: where the real risk shows up

The real value isn't the scan by itself — it's comparing the scan's results against the
CMDB. Anything the scan finds that the CMDB has no record of is **shadow IT** or a
forgotten asset, and that gap is exactly where a lot of real exposure lives.

## A concrete example: the test server nobody decommissioned

A project team spins up a SQL Server VM in 2022 to test a short-lived reporting tool. The
project wraps up, but nobody files the paperwork to decommission the VM, and it's never
entered into the CMDB in the first place. It keeps running, quietly reachable from the rest
of the internal network, receiving no patches and no EDR agent because, as far as any
security tooling is concerned, it doesn't exist. Two years later, a routine discovery scan
turns it up — still running the same unpatched version of SQL Server from 2022, with a
well-known vulnerability that's been public knowledge for most of that time. Nothing
sophisticated had to happen for that server to be a real risk; it just had to be forgotten.

## Key terms

| Term | Meaning |
|---|---|
| CMDB (Configuration Management Database) | A system of record tracking every known asset — owner, OS, patch level, criticality |
| Shadow IT | Assets that exist and run on a network without being tracked in the CMDB or inventory |
| Network discovery scan | An active scan (e.g., with nmap) that finds devices actually present on a network right now |
| Attack surface | Every exposed point an attacker could use — including untracked, unprotected assets |

## Check yourself

A company's CMDB says it has 400 servers. A network discovery scan finds 438 live hosts
responding on the network. What does that 38-host gap represent, and why does it matter
more than any single misconfiguration on one of the 400 known servers?
