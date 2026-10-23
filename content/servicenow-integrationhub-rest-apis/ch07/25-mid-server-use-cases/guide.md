# Lesson 25 — MID Server Use Cases

**Chapter 7 · MID Server & On-Premises Integration · Lesson 25 of 29**

## What you'll learn

- Discovery: how a MID Server scans a customer's internal network to populate the CMDB
- Orchestration: running automation against on-prem systems the cloud instance can't reach
- The relay pattern: routing a REST Message or IntegrationHub action through a MID Server
- Why the integration is still configured in ServiceNow as usual — only the network hop changes
- How this chapter's MID Server concept connects forward into the capstone's architecture

## Discovery: finding what's behind the firewall

The single most common MID Server use case is Discovery — scanning a customer's internal
network to find and catalog configuration items: servers, network devices, applications, the
relationships between them. A dedicated course later in this catalog covers Discovery and CMDB
population in full depth; what matters here is the mechanics this chapter already taught: the
MID Server is what makes Discovery physically possible, because it's the one piece of
ServiceNow-aware software actually sitting inside the customer's network, able to probe
addresses and ports that the cloud instance itself could never reach. Discovery jobs get queued
on the instance, and the MID Server picks them up on its next outbound poll.

## Orchestration: automation that has to run on-prem

Orchestration is the second major use case: running automation tasks against systems that live
on the customer's own network — restarting a service on an internal server, running a script
against a legacy application, pulling a status check from a device with no cloud exposure.
ServiceNow's cloud instance has no way to execute that action itself; it has no network path to
the target. The MID Server does, because it already sits inside that network. The instance
queues the Orchestration activity, the MID Server retrieves it on its next poll, executes it
locally, and reports the result back.

## The relay pattern for REST Messages and IntegrationHub

The most directly relevant use case for everything built in this course is the relay pattern.
Say an IntegrationHub spoke action or a REST Message (from Chapter 2) needs to reach an
internal-only system — an on-prem inventory database, say, with no public endpoint. The
integration is still configured in ServiceNow exactly the way Chapters 2 through 5 taught:
same REST Message record, same authentication profile, same connector action. The one thing
that changes is a single setting — a "connection & credential" alias or record is pointed at a
specific MID Server. When that integration runs, the actual outbound HTTP call happens from
inside the customer's network, launched by the MID Server, not from ServiceNow's cloud.
ServiceNow never needs a direct network path to the target at all.

```
Configured the same way as Ch. 2-5:         Only this changes:
REST Message / connector action              "Connection & Credential" alias
  -> same auth profile                         now points to a specific MID Server
  -> same endpoint record                      -> the real HTTP call fires from
                                                  inside the customer's network
```

## Why this matters for what's coming next

Chapter 8's capstone builds a complete enterprise REST integration from requirements through a
test plan. Not every integration in that capstone will need a MID Server — plenty of real
integrations target systems with public endpoints. But recognizing when a target sits behind a
firewall, and knowing that the fix is a MID Server selection rather than a redesign of the
integration itself, is exactly the kind of architectural judgment the capstone will expect you
to exercise.

## Key terms

| Term | Meaning |
|---|---|
| Discovery | Using a MID Server to scan a customer's internal network and populate the CMDB with configuration items |
| Orchestration | Running automation tasks against on-premises systems via a MID Server, because the cloud instance has no direct network path |
| Relay pattern | Configuring an integration normally in ServiceNow, then pointing its connection & credential alias at a MID Server so the actual network call fires from inside the customer's network |
| Connection & credential alias | The setting on a REST Message or IntegrationHub action that selects which MID Server (if any) routes the call |
| CMDB | The Configuration Management Database that Discovery populates with CIs found on the customer's network |

## Check yourself

You're ready for Chapter 8 when you can explain, without looking: when an IntegrationHub action
needs to reach an internal-only system, what specifically changes in how that integration is
configured, and what stays exactly the same as it was in Chapter 2?
