# Lesson 23 — Lineage Case Study: Customer Data Across Systems · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A second full case study — Caldwell & Finch Insurance, a fictional
mid-sized insurance company, used purely as a realistic composite
scenario, not based on any real company's data. This time the problem
spans three separate source systems instead of one pipeline, which is
exactly what makes it harder to trace than the revenue-report case.

## S2 · STEPS CARD (the problem — three systems)

Marketing's renewal campaign draws complaints — customers got the same
email two or three times — while the customer count reported to
leadership has crept up for six months despite flat growth. One cause,
three systems: the CRM keys a record by CRM_ID when an agent first logs
a prospect; the Policy Administration System keys a separate one by
PolicyHolderID, since a policy can legally go to someone the CRM never
tracked; and Support Ticketing keys yet another by email alone, with no
link to either ID.

## S3 · STEPS CARD (why the merge broke)

Each system's lineage is fine within itself — the problem only appears
when a downstream "unified customer view" tries to merge all three.
That logic matches by email address, but the CRM and Policy
Administration records sometimes store slightly different formatting
for the same real person: J.Smith@email.com versus j.smith@email.com
versus an old personal address never updated. So the same real customer
gets counted as two or three separate rows — each with its own
send-list entry, exactly why the renewal campaign fired multiple times.

## S4 · STEPS CARD (impact)

Tracing upstream and downstream from the unified customer view shows it
feeds four consumers: the marketing send-list export, the leadership
customer-count metric, a churn-rate calculation, and a compliance
mailing-address report. All four have been quietly wrong in the same
direction for as long as the matching bug existed — which is why the
count crept up even without real growth, as the same people slowly
accumulated more duplicate variants as they updated their email in only
one of the three systems.

## S5 · STEPS CARD (the lasting fix)

The technical fix — standardizing email capitalization and whitespace —
closes the immediate gap, but the real fix is structural: the three
systems never agreed on a source of record for the customer identifier,
so matching fell back on the one field all three happened to share. The
lasting fix makes the CRM's CRM_ID authoritative, requires the other two
systems to capture it, and documents the cross-system lineage
explicitly.

## S6 · OUTRO CARD

Next up: a hands-on practice lab — you'll trace a lineage path through a
small, fictional system yourself, on paper, no software required, using
the same problem, trace, impact, fix structure from both case studies.
