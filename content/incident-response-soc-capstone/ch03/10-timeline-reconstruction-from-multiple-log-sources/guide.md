# Lesson 10 — Timeline Reconstruction from Multiple Log Sources

**Chapter 3 · Detection & Analysis Deep Dive · Lesson 10 of 32**

## What you'll learn

- Why a real incident's story only becomes clear once events from **separate log sources** are
  merged into one chronological sequence
- Which systems typically hold the pieces of that sequence — firewall, endpoint, identity, email
- How to read a reconstructed timeline to see the actual attack progression, not just a list of
  isolated events
- Why reconstruction has to happen before an analyst can scope or contain an incident correctly

## Why no single log tells the whole story

Lesson 9 covered pulling every alert and event tied to an incident's entities into one working
set. Timeline reconstruction is the next step: putting that working set in **chronological order**
across every source that logged a piece of it. No single system sees the whole attack. The
firewall sees a connection attempt. The identity provider sees a sign-in. The endpoint agent sees
a process launch. Email security sees a message delivered. Each one, read alone, looks like a
routine event in its own system's log. Lined up in the order they actually happened, across
systems, they tell a very different story — the sequence an attacker actually followed from first
foothold to final objective.

## A concrete example: four sources, one sequence

Say an investigation pulls events from four systems tied to one compromised account and host.
Email security logged a phishing message delivered at 8:47am. Identity logs show a successful
sign-in using credentials harvested from that message at 9:02am — **initial access**. Endpoint
logs show a remote session opening from that host to a file server at 9:15am — **lateral
movement**. Endpoint logs on the file server then show a large archive file created in a temp
folder at 9:40am — **data staging**. None of those four log entries, read in isolation inside
their own system, reads as an attack in progress. Lined up by timestamp across all four sources,
they read as exactly what they are: a full attack chain from phishing email to staged data in
under an hour.

## Building the timeline in practice

Reconstruction means collecting the relevant events from each source, **normalizing timestamps**
to one time zone (logs from different systems frequently record in different time zones or
formats, and a timeline built on mismatched clocks will put events in the wrong order), and
sorting the full set chronologically. The result is a single sequence an analyst can read top to
bottom, the same way the entity timeline in Sentinel's investigation graph (Chapter 6 of the
Sentinel course) shows one entity's full history — except here the analyst is deliberately pulling
from every relevant source, not just the entities one incident's graph already surfaced.

## Why order matters more than the event list alone

A list of the same four events in no particular order still tells an analyst that a phishing
email, a sign-in, a remote session, and an archive file all happened. It does not tell them which
happened first, which caused which, or how fast the attacker moved. The chronological order is
what turns four facts into a timeline — "data staging followed lateral movement by 25 minutes,
which followed initial access by 13 minutes" is the finding that drives Lesson 11's scoping
question (what else did the attacker touch in that window) and eventually the containment
decisions in Chapter 4.

## Key terms

| Term | Meaning |
|---|---|
| Timeline reconstruction | Merging events from multiple log sources into one chronological sequence |
| Initial access | The point in the timeline where the attacker first gained entry |
| Lateral movement | The attacker moving from one compromised system to another |
| Data staging | The attacker collecting or packaging data, often before exfiltration |
| Timestamp normalization | Converting all events to one consistent time zone before sorting |

## Check yourself

Four log entries from four different systems each look routine on their own. What has to happen
to those four entries before they reveal an actual attack chain?
