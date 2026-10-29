# Lesson 2 — Preparation: The Phase That Happens Before Anything Goes Wrong

**Chapter 1 · The Incident Response Lifecycle · Lesson 2 of 4**

## What you'll learn

- What real Preparation work looks like, concretely, before any incident occurs
- Why scrambling to figure out who has admin access *during* an incident is a Preparation failure, not a Detection failure
- The three categories of Preparation work: a written plan, a trained team, and ready tools/access
- Why this lesson previews Chapter 2 rather than teaching the full Preparation phase in depth

## Preparation is what you do when nothing is on fire

Of the four NIST SP 800-61 phases from Lesson 1, Preparation is the only one that happens with zero
time pressure — which is exactly why it's the phase most likely to get shortchanged. There's no
alert blinking, no executive asking for updates, no clock running. That calm is the whole point: it's
the only time a SOC can build its incident response capability deliberately instead of improvising
one under pressure. Preparation covers three things, and all three have to exist *before* the first
alert of a real incident fires, not during it: a written incident response plan, a team that has
actually trained on using it, and the tools and access that team will need already provisioned and
tested.

## The written plan

A real incident response plan is a document, not a shared understanding people carry in their heads.
It names who has authority to make specific calls — who can approve taking a production system
offline, who can authorize contacting law enforcement, who talks to the press if it comes to that —
and it defines severity levels so the team isn't debating, mid-incident, whether something counts as
critical. Chapter 2's first lesson covers exactly what a real IR plan contains in detail; this lesson
is only establishing why that document has to exist and why it belongs squarely inside Preparation,
not somewhere improvised later.

## The trained team

A plan nobody has rehearsed is close to useless. A trained team has run through the plan — often
through tabletop exercises, where the team talks through a simulated incident step by step without
touching production systems — enough times that the plan's steps are familiar rather than being read
for the first time during a real event. Training also means role clarity: everyone on the team knows
which role they fill during an incident (who's running point, who's communicating with stakeholders,
who's doing the technical work) before the incident starts, not after.

## Ready tools and access

This is the piece that most clearly separates Preparation from scrambling. Imagine an incident
starts and the team's first move is to isolate a compromised server — but nobody currently has the
admin credentials needed to do it, because whoever had them left the company two months ago and
access was never reassigned. That's not a detection problem or a containment problem; it's a
Preparation failure, and it costs real time during the one phase where time matters most. Real
Preparation means the access, the forensic tooling, and the communication channels the team will
need are already provisioned, already tested, and already known to work, long before anyone needs
them.

## Key terms

| Term | Meaning |
|---|---|
| Incident response plan | A written document naming decision authority, severity levels, and response steps |
| Tabletop exercise | A simulated incident walkthrough used to train a team without touching production systems |
| Role clarity | Every team member knowing their specific responsibility during an incident, decided in advance |
| Provisioned access | Tools, credentials, and permissions a team will need, already set up and verified before an incident |

## Check yourself

An incident starts and the team realizes nobody currently has the admin access needed to isolate the
affected server. Which NIST phase failed to do its job, and why is this not a Detection & Analysis
problem?
