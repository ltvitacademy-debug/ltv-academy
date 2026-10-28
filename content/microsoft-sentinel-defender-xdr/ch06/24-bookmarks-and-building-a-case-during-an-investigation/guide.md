# Lesson 24 — Bookmarks and Building a Case During an Investigation

**Chapter 6 · Incident Investigation in Sentinel · Lesson 24 of 32**

## What you'll learn

- What a **bookmark** actually saves, and why it's different from just remembering a query result
- How a bookmark can be **pinned to an incident** so it travels with the investigation, not just
  with the analyst who created it
- How bookmarks accumulate into an actual case file as an investigation or a hunt progresses
- Why this chapter's four pieces — the queue, the graph, hunting, and bookmarks — function as one
  connected workflow, not four separate tools

## A bookmark saves a specific result, not just a memory

A hunting query (Lesson 23) or an ad-hoc investigation query can return dozens of rows, and only
one or two of them might actually matter. A **bookmark** saves exactly that specific result — the
query, the matching row or rows, and a timestamp — as a standing record an analyst can return to
later, instead of relying on memory or a screenshot in a separate notes app. That matters because
an investigation can stretch across hours or even span a shift change: a bookmark is a durable,
in-platform record of "this specific thing mattered," available to the analyst who created it and
to anyone else who later works the same case.

## Pinning a bookmark to an incident

A bookmark on its own is useful, but its real value in an active investigation comes from being
**pinned to an incident**. Pinning attaches that saved query result directly to the incident record
itself, so it shows up alongside the incident's alerts, its entities, and its investigation graph —
not off in some separate list an analyst has to remember to go check. Say a hunting query surfaces
a suspicious sign-in that the current incident's own alerts never flagged; bookmarking that result
and pinning it to the incident means the next analyst who opens that incident sees it immediately,
as part of the incident's own evidence, rather than needing to be told about it separately.

## Bookmarks accumulate into a case

A single incident rarely gets solved from one query result. As an investigation deepens, an analyst
typically runs several queries, bookmarks the two or three results that actually matter from each
one, and pins all of them to the incident. Over the course of the investigation, those pinned
bookmarks accumulate into something closer to a **case file**: a running, timestamped record of
every piece of evidence that led to the final verdict, attached to the incident itself rather than
scattered across an analyst's personal notes. That accumulated evidence is exactly what makes the
final closing note — the True Positive, False Positive, or Benign Positive verdict from Lesson 21
— something another analyst or an auditor can actually verify later, instead of just taking the
closing analyst's word for it.

## One connected workflow, not four separate tools

This chapter's four lessons aren't four unrelated features — they're one real investigation,
viewed in sequence. An incident surfaces in the queue, triaged by severity. Its investigation graph
and entity timelines scope what's actually connected. A hunting query, run proactively, can surface
related activity the incident's own alerts never caught. And bookmarks capture every piece of
evidence that query work turns up, pinned to the incident so the whole case travels together. That's
the complete Sentinel-specific implementation of the generic triage-and-investigation loop this
path has been building toward since the earlier SOC fundamentals course.

## Key terms

| Term | Meaning |
|---|---|
| Bookmark | A saved query result — the query, matching rows, and a timestamp — kept as a standing record |
| Pinned bookmark | A bookmark attached directly to an incident, so it travels with that investigation |
| Case file | The accumulated set of pinned bookmarks and evidence that supports an incident's final verdict |

## Check yourself

A hunting query surfaces a suspicious sign-in that the current incident's own alerts never
flagged. Explain what bookmarking and then pinning that result actually accomplishes that simply
remembering the finding would not.
