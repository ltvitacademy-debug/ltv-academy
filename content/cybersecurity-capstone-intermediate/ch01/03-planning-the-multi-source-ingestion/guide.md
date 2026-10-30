# Lesson 3 — Planning Multi-Source Log Ingestion

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 3 of 16**

## What you'll learn

- Which three log sources this project brings into Sentinel, and why each one is worth the effort
- Which connector type each source actually needs: service-to-service, agent-based, or API-based
- Why "the firewall" earns a seat at the table alongside Windows and Linux
- The target table each source lands in, and why that matters before any rule gets written

## The three sources, and the gap each one closes

Hartwell's environment already has partial Sentinel coverage from the Beginner project — mostly
Windows. This project adds the two sources that were missing, and keeps the one that already
works:

- **Windows Security Events** — domain controllers and member servers. Already partially
  covered; this project confirms coverage is complete and consistent, not just "mostly there."
- **Linux Syslog** — the Linux servers running Hartwell's field-operations tooling. Zero
  visibility today. If something goes wrong on a Linux box, nobody in the SOC would currently
  know until someone noticed the symptom by hand.
- **The perimeter firewall** — sits between Hartwell's network and the internet, and between
  Hartwell and every vendor with remote access. Zero visibility today, and arguably the single
  highest-value blind spot: almost everything that reaches Hartwell from outside touches this
  device first.

## Matching each source to the right connector type

Not every log source talks to Sentinel the same way. Picking the right connector type per
source, before touching any configuration, avoids a lot of wasted setup time later:

- **Windows Security Events** need an **agent-based** connector — the Azure Monitor Agent (AMA)
  installed on each Windows server, forwarding Security log events (including logon activity)
  into the workspace.
- **Linux Syslog** also needs an **agent-based** connector — the same AMA, this time configured
  to collect standard Syslog facilities from each Linux host, since Linux doesn't speak
  Sentinel's native ingestion format any more than Windows does.
- **The perimeter firewall** is neither a Microsoft cloud service nor a machine that can run the
  Azure Monitor Agent directly. It needs an **agent-based** connector too, but a different one:
  the firewall exports its logs in **CEF (Common Event Format)**, a standardized third-party log
  format, to a Linux-based log forwarder running the AMA, which relays that CEF data into the
  workspace's `CommonSecurityLog` table.

## Why table names matter before a single rule is written

Each source lands in a specific, named table: Windows Security Events in `SecurityEvent`, Linux
Syslog in `Syslog`, and firewall CEF data in `CommonSecurityLog`. Knowing those three names now
matters because Lesson 5's correlation rule has to reference the exact tables it's joining — a
rule that guesses at a table name, or assumes firewall data landed somewhere it didn't, simply
returns nothing, with no error to point at the mistake.

## The plan, before any connector gets touched

Putting it together, the ingestion plan for this project is: Windows Security Events (AMA,
already underway) into `SecurityEvent`; Linux Syslog (AMA) into `Syslog`; perimeter firewall CEF
logs (AMA-based log forwarder) into `CommonSecurityLog`. Lesson 4 does the real connector and
forwarding work for the two new sources — Linux and the firewall.

## Key terms

| Term | Meaning |
|---|---|
| Agent-based connector | A Sentinel connector that relies on the Azure Monitor Agent installed on a machine or log forwarder |
| CEF (Common Event Format) | A standardized log format many third-party firewalls and network devices export |
| `SecurityEvent` | The Sentinel table Windows Security log events land in |
| `Syslog` | The Sentinel table standard Linux Syslog events land in |
| `CommonSecurityLog` | The Sentinel table CEF-formatted logs, including from the perimeter firewall, land in |

## Check yourself

You're ready for Lesson 4 when you can say, without looking: which connector type does each of
the three sources need, and which table does each one land in?
