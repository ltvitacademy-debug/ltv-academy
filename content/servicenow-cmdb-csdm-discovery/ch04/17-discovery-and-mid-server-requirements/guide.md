# Lesson 17 — Discovery & MID Server Requirements

**Chapter 4 · Discovery Fundamentals · Lesson 17 of 26**

## What you'll learn

- Why Discovery requires a MID Server, with no exception, directly because of course 7's networking material
- The real network and firewall access a MID Server needs to reach a target IP range
- Why Credential records — course 7's authentication concepts — are required for Discovery to work
- Which protocols typically need their own credential, and why one credential doesn't cover every device type
- What happens, practically, when either requirement is missing

## Why Discovery can't run without a MID Server

Lesson 14 already said this directly, and it's worth restating precisely here: Discovery
requires a MID Server, full stop. ServiceNow's instance runs in ServiceNow's cloud and, like
any cloud-hosted service, it cannot directly reach IP addresses on a customer's internal
network. Course 7's "What a MID Server Does" lesson covered exactly why: a MID Server is a
customer-installed Java application sitting inside that network, making outbound-only
connections back to the instance, so the instance never needs an inbound hole punched in the
firewall. Discovery is one of the specific jobs the MID Server architecture exists to enable —
it's the MID Server, not the cloud instance, that actually sends probes onto the target network
and relays results back. No MID Server reachable from the target range means no Discovery scan
of that range, regardless of how well the Discovery Schedule and probes from Lesson 15 are
configured.

## Requirement one: real network and firewall access

A MID Server can only scan what it can actually reach. That means whatever network segment or
VLAN the MID Server sits on needs real, permitted access — through whatever firewalls sit
between it and the target range — out to every IP address Discovery is meant to scan. This is
no different in principle from any other on-premises integration: if the MID Server's location
can't route to the target subnet, or a firewall rule blocks the specific ports Discovery needs,
the scan simply won't find anything there, no matter how correctly the Discovery Schedule is
configured. Planning a Discovery rollout means planning exactly where MID Servers need to sit
relative to every network segment that needs scanning.

```
MID Server's location  --permitted access-->  Target IP range
        |                                           |
   must route to,                            the Discovery Schedule
   through any firewall,                     actually points at
   to every scanned address
```

## Requirement two: the right Credential records

Reaching a device over the network is only half the job — once Discovery finds something,
running probes against it means authenticating to it. That's where course 7's Credential
records come back in: Discovery needs an appropriate Credential record for whatever protocol
it must use against a given device. A Linux server typically needs SSH credentials; a Windows
server typically needs WMI credentials; a network device might need SNMP credentials instead.
One credential doesn't cover every device type, because the protocols themselves are different —
SSH and WMI aren't interchangeable, so Discovery needs the right credential available for
whichever protocol a given device actually speaks.

```
Device type        Protocol Discovery uses       Credential needed
Linux server        SSH                            SSH credential
Windows server       WMI                            WMI credential
Network device       SNMP                           SNMP credential
```

## What happens when either requirement is missing

Without reachable network access, Discovery's probes simply never get a response — the device
might as well not exist from Discovery's point of view, even though it's sitting right there on
the network. Without the right credential, Discovery can usually still detect that something is
listening at an address, but it can't authenticate to pull detailed information, so the CI it
creates ends up thin — a bare record with little more than "something is here," rather than the
full OS, software, and spec detail Discovery is supposed to deliver. Both requirements have to
be in place, together, for Discovery to do the job Lesson 14 described.

## Key terms

| Term | Meaning |
|---|---|
| MID Server requirement | Discovery cannot scan any network it reaches without a MID Server positioned to reach that network |
| Network/firewall access | Permitted routing and open ports from the MID Server's location out to the scanned IP range |
| Credential record | The stored authentication ServiceNow uses to log into a device during a probe |
| Protocol-specific credential | A credential tied to one protocol (SSH, WMI, SNMP); one credential doesn't cover every device type |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what happens to a Discovery
scan when the MID Server has network access to a device but no matching Credential record for
its protocol, versus when it has the right credential but no network access at all?
