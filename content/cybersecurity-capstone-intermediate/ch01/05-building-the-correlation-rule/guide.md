# Lesson 5 — Building a Correlation Rule Across Sources

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 5 of 16**

## What you'll learn

- Why a rule that watches only one source misses exactly the kind of thing this project needs to catch
- The real KQL for a rule that joins firewall allow events against Entra ID sign-ins
- How `let`, `join kind=inner`, and a bounded time window combine into one working analytics rule
- Why this specific rule is the one piece of detection doing double duty for both Owen and Renee

## Why one source isn't enough

A rule that only watches `CommonSecurityLog` can tell Mara that some external address was
allowed through the firewall to an internal admin port — but on its own, that's true for every
legitimate remote-support session too, including Meridian's. A rule that only watches
`SigninLogs` can tell Mara that someone signed in from an unfamiliar address — but plenty of
real employees travel. Neither source alone separates "routine" from "worth a human's attention."
The two together are more interesting: an external address that was just allowed through the
firewall toward an internal admin port, *and* that same address shows up attempting an Entra ID
sign-in close behind it, is a specific, narrower pattern than either signal is by itself.

## Naming the rule

This analytics rule is named **External RDP Allow + Entra Sign-In Correlation**. Its job: watch
`CommonSecurityLog` for firewall allow events reaching the internal RDP port, watch `SigninLogs`
for sign-in attempts, and flag any case where the same source address appears in both, within a
tight window of each other.

## Building it piece by piece

Start with the firewall half — allowed connections to RDP, in the last hour:

```kql
let Lookback = 1h;
let RdpAllows = CommonSecurityLog
    | where TimeGenerated > ago(Lookback)
    | where DeviceAction == "Allow" and DestinationPort == 3389
    | project FirewallTime = TimeGenerated, SourceIP, DestinationIP;
```

Then the sign-in half, over the same lookback window:

```kql
let EntraSignIns = SigninLogs
    | where TimeGenerated > ago(Lookback)
    | project SignInTime = TimeGenerated, UserPrincipalName, IPAddress, ResultType, Location;
```

## Joining the two sources on the shared address

`RdpAllows` and `EntraSignIns` are both just filtered projections so far — the correlation
happens in the join, matching the firewall's `SourceIP` against the sign-in's `IPAddress`, then
keeping only pairs where the sign-in landed shortly *after* the firewall allow:

```kql
RdpAllows
| join kind=inner EntraSignIns on $left.SourceIP == $right.IPAddress
| where SignInTime > FirewallTime and SignInTime < FirewallTime + 15m
| project FirewallTime, SourceIP, DestinationIP, SignInTime, UserPrincipalName, ResultType, Location
| order by FirewallTime asc
```

## The full rule

```kql
let Lookback = 1h;
let RdpAllows = CommonSecurityLog
    | where TimeGenerated > ago(Lookback)
    | where DeviceAction == "Allow" and DestinationPort == 3389
    | project FirewallTime = TimeGenerated, SourceIP, DestinationIP;
let EntraSignIns = SigninLogs
    | where TimeGenerated > ago(Lookback)
    | project SignInTime = TimeGenerated, UserPrincipalName, IPAddress, ResultType, Location;
RdpAllows
| join kind=inner EntraSignIns on $left.SourceIP == $right.IPAddress
| where SignInTime > FirewallTime and SignInTime < FirewallTime + 15m
| project FirewallTime, SourceIP, DestinationIP, SignInTime, UserPrincipalName, ResultType, Location
| order by FirewallTime asc
```

This is what gets pasted into a Scheduled Analytics Rule's query logic, run on a short interval
with a 1-hour lookback matching the `Lookback` variable, entity mapping set so `SourceIP`/
`IPAddress` map to an IP entity and `UserPrincipalName` maps to an Account entity, and the alert
threshold set to fire on any row returned at all — this pattern is rare enough on a normal day
that even one match deserves a look.

## Why this rule matters for both stakeholders

For Owen, this is exactly the cross-source visibility he asked for: a rule that watches the
firewall and identity logs *together*, not two separate dashboards someone has to mentally merge.
For Renee, this is a documented detection built for a specific, named threat scenario — external
network access followed by an identity sign-in from the same address — exactly the kind of
use-case justification an auditor expects a custom rule to have.

## Key terms

| Term | Meaning |
|---|---|
| `let` | Defines a named, reusable sub-result inside a larger KQL query |
| `join kind=inner` | Combines rows from two filtered results that share a matching key, keeping only matches |
| `$left` / `$right` | Refer to the table before (`$left`) and inside the parentheses (`$right`) of a join |
| Entity mapping | Telling Sentinel which query columns represent trackable entities (IP, Account) on a resulting alert |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: what two conditions does a row
have to satisfy to appear in this rule's results, and why is that combination rarer — and more
worth a human's attention — than either condition alone?
