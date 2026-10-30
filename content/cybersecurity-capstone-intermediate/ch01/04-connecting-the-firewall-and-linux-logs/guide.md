# Lesson 4 — Connecting the Firewall and Linux Logs to Sentinel

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 4 of 16**

## What you'll learn

- The real setup work for Linux Syslog and firewall CEF ingestion, start to finish
- How a vendor remote-support request got handled under deadline pressure during this same setup window
- Why the firewall rule that request produced looked completely reasonable at the time
- Why nobody caught the actual mistake at setup — because the connection worked exactly as expected

## Setting up Linux Syslog collection

Hartwell's field-operations Linux servers need the Azure Monitor Agent (AMA) installed and
configured to forward standard Syslog facilities — `auth`, `authpriv`, `daemon`, and `cron` are
the ones Mara prioritizes, since authentication and scheduled-task activity are the most likely
places something actionable shows up first. Once the AMA data collection rule (DCR) is deployed
and the agents report healthy, Syslog events start landing in the workspace's `Syslog` table
within a few minutes, confirmed with a simple query: `Syslog | where TimeGenerated > ago(1h)`
returning real rows.

## Setting up the firewall's CEF forwarding

The perimeter firewall is configured to export its logs in CEF, pointed at a small Linux box
running the AMA specifically to relay that CEF stream into Sentinel's `CommonSecurityLog` table.
This is the more involved half of today's work — CEF forwarding has more moving pieces than
Syslog alone (the firewall's own export configuration, the forwarder's listener, and the AMA's
CEF-specific collection rule all have to agree), and getting it fully connected takes most of the
day.

## A vendor needs remote access, on the same deadline

Partway through getting CEF forwarding stood up, the firewall throws a configuration question
nobody on Hartwell's team has hit before. Hartwell's remote-monitoring vendor for the firewall
platform, **Meridian Controls**, offers to remote in and walk through it directly rather than
back-and-forth over email — and Mara and Network Administrator **Derek Shaw** want to take that
offer, because Sentinel's go-live date for firewall visibility is the same week as Renee's first
compliance review meeting. Meridian's onboarding email names their remote-support gateway range
as starting at `203.0.113.16`, a small block reserved for exactly this kind of session.

## The rule that gets written, under deadline pressure

Derek needs a firewall rule allowing Meridian's remote-support range in to `UTIL-ADM-02`
(10.20.4.15), Hartwell's internal admin jump host, on RDP (TCP 3389) — temporary, vendor-only,
scoped to their real range. Working quickly against the clock, he starts from an existing
template rule Hartwell already had on the books for a different, unrelated purpose: a /16-sized
block allowing a regional field-office WAN range. He updates the source address to Meridian's
range and renames the rule `TEMP-MERIDIAN-RDP` — but the template's subnet mask comes along for
the ride unchanged:

```
# Intended:
TEMP-MERIDIAN-RDP   source 203.0.113.16/28   dest 10.20.4.15   port 3389/tcp   action ALLOW

# What actually got saved (mask copied from the old field-office template, not updated):
TEMP-MERIDIAN-RDP   source 203.0.0.0/16      dest 10.20.4.15   port 3389/tcp   action ALLOW
```

The difference between `/28` and `/16` is easy to miss reading quickly: one character, in a rule
with a dozen other fields that all look correct. A `/28` covers 16 addresses — Meridian's actual
gateway range. A `/16` covers 65,536 addresses — nearly the entire `203.0.0.0`–`203.0.255.255`
block, including Meridian's real range, but also a vast number of addresses that have nothing to
do with Meridian at all.

## Why nobody catches it today

Meridian connects, walks Derek and Mara through the CEF configuration issue, and the session
works perfectly — because Meridian's real IP, `203.0.113.16`, does fall inside the broad range
the rule actually allows. There's no error, no failed connection, no obvious symptom: the rule
does exactly what everyone in the room expects it to do, for the one connection anyone is
watching. The fact that it also quietly allows RDP to `UTIL-ADM-02` from 65,520 other addresses
nobody intended to trust isn't visible from where Mara and Derek are standing. CEF forwarding
gets confirmed working, `CommonSecurityLog` starts filling in, and the day ends as a win on both
fronts — with one unnoticed loose end.

## Key terms

| Term | Meaning |
|---|---|
| Data collection rule (DCR) | The Azure Monitor Agent configuration defining what data to collect and where to send it |
| CEF forwarding | Exporting a device's logs in Common Event Format to a relay that ships them into Sentinel |
| Scope (firewall rule) | The specific source/destination address range, port, and protocol a rule applies to |
| `/28` vs. `/16` | CIDR notation for address-range size: `/28` is 16 addresses, `/16` is 65,536 — a difference of four orders of magnitude |

## Lab

Without looking back at the rule block above, write out by hand what `203.0.113.16/28` actually
covers (first and last address) and what `203.0.0.0/16` actually covers. Confirm Meridian's real
address falls inside both ranges — which is exactly why this mistake is invisible today.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what did `TEMP-MERIDIAN-RDP`
end up allowing versus what it was supposed to allow, and why did today's vendor session give
absolutely no sign that anything was wrong?
