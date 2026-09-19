# Lesson 30 — Troubleshooting Azure SQL Connectivity

**Chapter 5 · Azure SQL Network Security · Lesson 30 of 95**

## What you'll learn

- A real, ordered troubleshooting checklist covering everything from Lessons 26-29
- Firewall rule gaps, VNet/NSG blocking, DNS resolution failures for Private Link, and TLS mismatches
- Which layer to check first, and why order matters when multiple layers could be the culprit
- How to distinguish "can't connect at all" from "connects but login fails" from "connects but slow"

## Why order matters

A connection failure could be caused by any layer this chapter covered — or by something outside
this chapter's scope entirely, like a wrong password. Checking layers in the wrong order wastes
time: there's no point debugging a TLS version mismatch if the firewall rejected the packet before
TLS negotiation ever started. This checklist is ordered from *earliest in the connection path* to
*latest*, matching the order these layers actually get evaluated.

```
Client → DNS resolution → Network path (firewall / VNet / NSG / Private Link) →
TLS handshake → Login/authentication (Chapter 4) → Permission checks (Chapter 4)
```

## Step 1: Is this even a network problem?

Before touching firewall rules, separate the symptom:

- **"Cannot connect" / timeout** — almost always a network-layer problem (this chapter's territory):
  firewall, VNet rule, NSG, or DNS.
- **"Login failed for user"** — the network layer worked; this is Chapter 4's territory (bad
  password, disabled login, wrong auth mode).
- **Connects, but slow or intermittent** — usually not a security-layer problem at all; that's
  Chapter 8-9's performance/monitoring territory, though a misconfigured NSG can occasionally cause
  intermittent drops worth ruling out here.

This lesson is about the first category only.

## Step 2: Firewall rule gaps (Lesson 26)

The most common cause, and the first thing to check:

```sql
SELECT * FROM sys.firewall_rules;          -- server-level, run against master
SELECT * FROM sys.database_firewall_rules; -- database-level, run against the specific DB
```

Confirm the client's *actual current public IP* — not the IP you assumed — matches a rule's range.
Client IPs change more often than people expect (dynamic ISP assignment, VPN egress points, corporate
NAT). The Azure Portal's connection error message for a firewall block often includes the client IP
it saw, which is the fastest way to confirm this.

## Step 3: VNet rules and NSGs blocking (Lesson 27)

If the client is inside a VNet using a service endpoint, and connectivity still fails:

- Confirm the **Microsoft.Sql** service endpoint is actually enabled on the specific subnet the
  client is in — not a different subnet in the same VNet.
- Confirm the server-side **Virtual Network rule** names that exact VNet/subnet.
- Check **Network Security Groups (NSGs)** on the subnet or NIC — an NSG can block outbound traffic
  on port 1433 (or the ports Azure SQL needs) even when the service endpoint and VNet rule are both
  configured correctly. NSGs are evaluated independently of Azure SQL's own firewall layer entirely.

## Step 4: DNS resolution for Private Link (Lesson 28)

If using a Private Endpoint and the client still seems to reach the *public* endpoint (or fails to
resolve at all):

```
nslookup yourserver.database.windows.net
```

From inside the VNet, this should resolve to the **private** IP, via the
`privatelink.database.windows.net` zone. If it resolves to a public IP instead, the Private DNS zone
either isn't linked to that VNet, or a record is missing/stale. This is, per Lesson 28, one of the
most common real-world failure points for private connectivity specifically.

## Step 5: TLS version mismatch

Azure SQL requires a minimum TLS version (commonly TLS 1.2, with the option to enforce 1.2 or higher
on the server). An older client driver or an OS with an outdated TLS stack that only offers TLS 1.0
or 1.1 will fail the handshake — and this fails *after* the network path succeeds, so it can look
like a "connects, then dies" symptom rather than an obvious firewall block. Confirm the driver
version and OS TLS configuration if network-layer checks (Steps 2-4) all pass but the connection still
fails at what looks like a slightly later stage.

## Putting it together

```
1. Cannot-connect vs. login-failed vs. slow? → confirms this IS a network-layer issue
2. Firewall rules (server + database) match the client's actual current IP?
3. VNet service endpoint + Virtual Network rule + NSG all allow this specific subnet?
4. Private Endpoint in use? Does DNS resolve to the private IP via the Private DNS zone?
5. TLS version supported by both client driver and server's minimum TLS setting?
```

## Chapter 5 complete

That closes Chapter 5, Azure SQL Network Security — firewalls, VNet service endpoints, Private
Endpoints, the public-vs-private decision, and now a real troubleshooting order for all of it.
Chapter 6, **Data Security & Compliance**, picks up next: encrypting data at rest and in use, masking
it for the wrong audience, restricting it by row, classifying it as sensitive, and auditing who
actually touched it.

## Key terms

| Term | Meaning |
|---|---|
| NSG | Network Security Group — a separate traffic filter from Azure SQL's own firewall, evaluated independently |
| `nslookup` | Command used to confirm whether a hostname resolves to a public or private IP |
| TLS mismatch | A connection that reaches SQL Server but fails at the encryption handshake stage |

## Lab

1. Deliberately misconfigure one layer (e.g., remove a firewall rule) on a test server and walk
   through Steps 1-5 to confirm the checklist correctly identifies it.
2. Run `nslookup` against a Private-Endpoint-enabled server from both inside and outside the VNet,
   and note the different results.
3. Check a client machine's supported TLS versions and compare against your server's minimum TLS
   version setting in the Azure Portal.

## Check yourself

You're ready for Chapter 6 when you can explain, without looking: why should you always determine
whether a failure is "cannot connect" vs. "login failed" before touching a single firewall rule?
