# Lesson 3 — Designing the Data Model · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Now let's turn Cascade's business into an actual Salesforce data model — on paper, before Chapter 2 builds any of it for real.

## S2 · STEPS — Standard objects

Cascade's org needs the familiar standard objects, each mapped to something real. Lead holds an unqualified person or company — a badge scan, a web form, a referral. Account and Contact hold the customer business and its people. Opportunity holds a deal, with Opportunity Products attaching the specific equipment package. And Task and Campaign log activity and track where a Lead came from.

## S3 · CODE — Installation Project

But standard objects stop at "deal closed." Installation Project is Cascade's first custom object — it tracks the on-site work after an Opportunity is won: a site address, a target install date, a status, and the installer from Marcus Webb's team who owns it.

## S4 · CODE — Service Contract

Service Contract is the second custom object — recurring maintenance revenue that exists independent of any single deal. It holds a start and end date, a service tier, an annual value, and a renewal status that Customer Success owns.

## S5 · CODE — End to end

Put together, here's Cascade's full object map. A Lead converts into an Account. An Account has many Contacts, many Opportunities — each carrying Opportunity Products — and many Service Contracts. A won Opportunity produces one Installation Project.

## S6 · STEPS — Lookup, not master-detail

Both custom objects use Lookup relationships, not Master-Detail. An installation or a service contract needs to be able to exist, get reassigned, and be shared on its own terms — not strictly tied to its parent's ownership and security. That distinction matters a lot once you design sharing rules in the next lesson.

## S7 · OUTRO

Next lesson, you'll design the security model that sits on top of this exact data model — who at Cascade can see which records, and why.
