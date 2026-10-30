# Lesson 9 — Tracing the Alert Back to a Firewall Rule

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 9 of 16**

## What you'll learn

- How to pull the raw firewall logs for a specific source IP out of `CommonSecurityLog`
- How to confirm which named firewall rule actually allowed a connection, not just that it was allowed
- Why "the connection is allowed" and "the rule that allows it is correctly scoped" are two separate questions
- What distinguishes a misconfigured allow rule from a genuinely malicious connection, at the log level

## Where this picks up

The 3 AM alert from Lesson 8 fired because the correlation rule built in Lesson 5 caught a sign-in
on the SCADA/metering jump host's service account, `svc-jumphost-admin`, from `198.51.212.77` —
an IP that was never part of any approved connection list Mara knows of. The alert proves a
sign-in happened. It does not yet prove *how that IP reached the jump host at all*, since the
jump host's RDP port, 3389, isn't supposed to be reachable from the open internet. That's the
first thing to trace.

## Step 1: confirm it was allowed, not snuck past a block

Mara's first move is to stop guessing and pull the actual firewall log for that IP and port:

```kql
CommonSecurityLog
| where TimeGenerated > ago(24h)
| where DestinationPort == 3389
| where SourceIP == "198.51.212.77"
| project TimeGenerated, SourceIP, DestinationIP, DestinationPort, DeviceAction, Activity
```

The result shows `DeviceAction == "Allow"`. That single field changes the whole shape of the
investigation. This wasn't an attacker who evaded a block rule, spoofed a trusted IP, or exploited
a gap in the perimeter. The firewall looked at this exact connection and deliberately let it
through — which means somewhere, a rule exists whose configured source range includes
`198.51.212.77`.

## Step 2: find the rule that matched

The firewall's own admin console logs which named rule matched each allowed connection. Mara
checks the rule-hit history for the timestamp in question and finds a single match:
**`ALLOW-VENDOR-RDP-SUPPORT`** (rule ID `FW-0231`) — the same rule created back in Lesson 4 to let
Hartwell's metering-support vendor reach the jump host for scheduled maintenance.

That's the pivot. `198.51.212.77` isn't on any malicious-IP list, and it isn't the vendor's known
address either — but the firewall doesn't check "is this the vendor." It only checks "does this
source IP fall inside the range this rule was configured with." If `198.51.212.77` matched, the
rule's configured range is wider than it should be.

## Why this reframes the whole problem

Up to this point, the instinct is to treat the 3 AM sign-in itself as the threat. It's not — or at
least, it isn't the *root* problem. The vendor connection this rule was built for is legitimate.
The jump host needing RDP open to a trusted partner for scheduled support is a reasonable business
need. What's wrong is narrower and more boring than "an attacker got in": a firewall rule is
matching traffic it was never supposed to match. Lesson 10 confirms exactly how wide that range
really is.

## What NOT to do yet

Don't disable `ALLOW-VENDOR-RDP-SUPPORT` outright — the vendor's legitimate support connection
still depends on it, and killing it without a plan breaks a real business relationship. Don't
assume `198.51.212.77` is itself malicious, either; nothing confirms that yet. The only confirmed
fact so far is that the rule's scope let it through.

## Key terms

| Term | Meaning |
|---|---|
| `CommonSecurityLog` | Sentinel's table for CEF-formatted logs from firewalls and other network devices |
| `DeviceAction` | The field showing whether a logged connection was allowed or denied |
| Rule hit / rule match | The specific named firewall rule that a given connection matched against |
| Rule scope | The configured source/destination address range a firewall rule applies to |

## Lab

Using `CommonSecurityLog`, write the query that would confirm, for any source IP and destination
port you're given, whether the connection was allowed and which `DeviceAction` value proves it.
State what your next step would be if the result had instead come back `Deny`.

## Check yourself

You're ready for Lesson 10 when you can explain: why does confirming the connection matched
`ALLOW-VENDOR-RDP-SUPPORT` change the investigation from "find an attacker" to "check a rule's
scope"?
