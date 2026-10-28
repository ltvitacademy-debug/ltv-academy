# Lesson 31 — Case Study: Catching a Slow Data Exfiltration

**Chapter 8 · Capstone: Building a Layered Threat Detection Program · Lesson 31 of 32**

## What you'll learn

- Why low-and-slow exfiltration defeats volume-based detection by design, and what actually
  catches it instead
- How a NetFlow baseline deviation, a threat-intel-flagged destination, and EDR process
  telemetry combine into one detection chain, none of them sufficient alone
- How to read a process tree and recognize a masquerading process making outbound connections
  it has no legitimate reason to make
- What the correct response sequence looks like once all three signals line up

## The scenario

A workstation on Castellan Retail's Workstations VLAN, used by a merchandising analyst, has been
quietly sending small amounts of data to an external IP address every 25 to 30 minutes for nine
days. No single transfer is larger than three megabytes — well under any volume-based data-loss
threshold the SOC has configured — which is exactly why it's still running.

## Signal 1: the NetFlow baseline deviation

Lesson 11's baselining work is what catches this first. This workstation's normal traffic
profile sends under five megabytes a day outbound, almost entirely to a short list of known
corporate SaaS destinations. The flow-monitoring platform doesn't flag any single transfer — it
flags the **pattern**: a brand-new destination this host has never talked to before, contacted
on a suspiciously regular interval, over and over. Lesson 9's NetFlow records make this visible
even though every individual flow record looks unremarkable on its own; it's the host-destination
pair and the regularity that are new, not the size.

## Signal 2: the threat-intel-flagged destination

The analyst pulls the destination IP and checks it against Castellan's threat intelligence feed
from Lesson 18. It's a listed indicator of compromise, added within the last few weeks and
attributed to infrastructure associated with a known data-theft toolkit. On its own, a flagged
IP in an intel feed is a lead, not proof — but combined with Signal 1, it moves this from "odd
traffic" to "investigate now."

## Signal 3: EDR process telemetry

Pulling EDR data for the workstation from Lesson 13 shows the outbound connections aren't coming
from a browser or any approved application. They're coming from an executable running out of a
user-writable temp folder, under a name designed to look like a normal Windows process. The
process tree tells the real story:

```
WINWORD.EXE
  -> cmd.exe
       -> svch0st.exe   (temp folder, not System32 — the giveaway)
```

A Word document the analyst opened nine days ago spawned a command shell, which launched a
process disguised to look like `svchost.exe` but running from the wrong location entirely —
Lesson 14's process-tree analysis and Lesson 15's living-off-the-land detection, applied to one
real chain of events.

## None of the three signals alone was enough

The flow deviation alone could have been a new SaaS tool. The flagged IP alone could have been a
stale, outdated intel entry. The disguised process alone, without the outbound pattern to match
it to, might have sat in a queue of lower-priority EDR alerts. Together, they're conclusive: a
disguised process is exfiltrating data on a schedule to known-bad infrastructure.

## The response

Lesson 16's containment playbook runs immediately: the host is isolated via EDR, cutting its
network access without touching the evidence running in memory. The destination IP is blocked at
the perimeter NGFW. The disguised binary and the original Word document are preserved for
analysis, and the IOC — that destination IP — gets swept against every other host's flow and EDR
history to confirm no other machine made the same connections.

## Key terms

| Term | Meaning |
|---|---|
| Low-and-slow exfiltration | Data theft in small, regular transfers specifically sized to stay under volume-based detection thresholds |
| Baseline deviation | A flagged change in traffic pattern (new destination, new regularity) rather than a flagged volume |
| Masquerading | Naming a malicious process to resemble a legitimate one, while running from a location the real one never would |
| Containment | Isolating a host's network access via EDR without disturbing evidence for later analysis |

## Check yourself

Each of the three signals in this case — NetFlow deviation, threat intel, EDR telemetry — came
from a different chapter of this course. Why does catching this exfiltration require all three,
rather than any one of them being sufficient alone?
