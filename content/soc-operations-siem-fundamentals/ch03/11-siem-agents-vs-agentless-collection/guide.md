# Lesson 11 — SIEM Agents vs. Agentless Collection

**Chapter 3 · Log Sources & Collection · Lesson 11 of 32**

## What you'll learn

- What agent-based log collection is, and why it's the more reliable option when a host supports it
- What agentless collection is, and why it's often the only option for network and security appliances
- The real tradeoffs between the two — overhead, reliability, and completeness — not just "agents are better"
- Why most SOCs end up running a mix of both rather than standardizing on one

## Agent-based collection

**Agent-based collection** means installing a lightweight piece of software — an agent — directly on
each host you want logs from. Examples include Splunk's Universal Forwarder, Elastic's Winlogbeat
and Filebeat, IBM QRadar's WinCollect, and Microsoft's Azure Monitor Agent. The agent runs
continuously on the endpoint, watches the local log sources, and forwards new events to the SIEM in
near-real-time as they're generated.

```
Agent installed on host
  -> watches local log sources continuously
  -> forwards events to SIEM as they occur
  -> buffers locally if the network connection drops
```

That local buffering is the real strength: if the connection to the SIEM goes down for ten minutes,
a well-configured agent holds the events locally and sends them once connectivity returns, instead
of losing them. The cost is overhead — an agent is software running on every single endpoint,
consuming a small amount of CPU and memory, and it needs to be deployed, updated, and monitored like
any other software across potentially thousands of machines.

## Agentless collection

**Agentless collection** means the SIEM reaches out and pulls logs from a device remotely, with no
software installed on that device at all. Common mechanisms are syslog (the device pushes to a
syslog listener the SIEM owns), SNMP traps, WMI queries against Windows machines, or API calls
against a cloud service's own logging endpoint. This is often the *only* practical option for
network and security appliances — a firewall, a switch, or a load balancer frequently has no
supported way to run third-party agent software, but it can almost always speak syslog or expose an
API.

```
SIEM polls or listens remotely
  -> device has no agent installed
  -> lower deployment overhead, especially at scale
  -> gaps possible if polling interval misses events or connectivity drops
```

Agentless is faster to stand up across a large fleet of devices you don't need deep visibility into,
but it carries real risk: if the SIEM's poll interval is set too wide, or the network link drops
right when a burst of events occurs, those events can be missed entirely with no local buffer to
catch them.

## Choosing in practice

Neither approach wins outright — the real-world pattern is a **mix**, chosen per device type.
Servers and endpoints the SOC fully controls get agents, because near-real-time delivery and local
buffering matter most where the richest, most security-relevant logs (process creation, authentication
events) live. Network appliances, legacy devices, and anything that can't run third-party software get
agentless collection via syslog or API, because that's the only option available — and because those
devices typically generate lower volume, lower-stakes logs where an occasional gap is a smaller risk
than it would be on a domain controller.

## Key terms

| Term | Meaning |
|---|---|
| Agent-based collection | A lightweight process installed on a host that forwards logs to the SIEM continuously |
| Agentless collection | The SIEM pulls or receives logs remotely (syslog, SNMP, WMI, API) with no software on the device |
| Local buffering | An agent holding events locally during a network outage so none are lost |
| Polling interval | How often an agentless collector checks a remote source for new log data |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why might a SOC choose agentless
collection for a firewall but agent-based collection for a domain controller?
