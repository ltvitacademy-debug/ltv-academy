# Lesson 8 — Major SIEM Platforms: A Practical Overview

**Chapter 2 · SIEM Fundamentals · Lesson 8 of 32**

## What you'll learn

- The major SIEM platforms actually in use across the industry today
- What each platform is genuinely known for, at a high level
- Why this course stays vendor-neutral before the next course goes deep on one platform
- How to talk about these platforms accurately without overclaiming hands-on expertise
  you don't have yet

## Splunk: the long-standing enterprise standard

Splunk is one of the longest-standing enterprise SIEM and log analytics platforms,
built around SPL — Splunk's own powerful search language — with broad adoption across
large enterprises that predates most of its cloud-native competitors.

## Microsoft Sentinel: cloud-native, and where this path goes next

Microsoft Sentinel is Microsoft's cloud-native SIEM, built directly on Azure and
queried with KQL (Kusto Query Language), tightly integrated with Microsoft 365
Defender and the broader Azure ecosystem. This course path goes deep on Sentinel
specifically in the very next course, with hands-on configuration and real detections.

## IBM QRadar: a long enterprise track record

IBM QRadar has a long track record in large enterprise and government deployments,
well known for its correlation engine, which groups related events into what QRadar
calls an "offense" — a single consolidated view of everything tied to one underlying
pattern instead of a pile of separate alerts.

## The Elastic Stack: open-source roots, flexible deployment

The Elastic Stack has open-source roots — Elasticsearch for storage and search,
Logstash and Beats for ingestion, and Kibana for visualization — and can run as general
log analytics or, with Elastic Security added, as a full SIEM. It's popular partly
because it can be self-hosted or run as Elastic Cloud, giving teams more deployment
flexibility than some fully proprietary platforms.

## Why the query languages differ, but the underlying question doesn't

These platforms differ mostly in query language and deployment model, not in the
underlying job. Searching for traffic from one IP address in Splunk's SPL looks like
`index=firewall src_ip="203.0.113.9" | stats count by dest_ip`; the same question in
Sentinel's KQL looks like `SecurityEvent | where IpAddress == "203.0.113.9" | summarize
count() by Computer`. Different syntax, same underlying question — which is exactly
why the aggregation, normalization, correlation, and alerting concepts from this
chapter transfer across all of them.

## Staying vendor-neutral, for now

This course stays vendor-neutral on purpose: those core concepts work the same way
conceptually no matter which platform runs them, and that foundation is worth having
solid before specializing. This path's next course goes deep on one platform
specifically — Microsoft Sentinel — building on everything covered in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Splunk | Long-standing enterprise SIEM/log platform known for SPL, its own search language |
| Microsoft Sentinel | Microsoft's cloud-native SIEM, built on Azure, queried with KQL — this path's next course goes deep here |
| IBM QRadar | IBM's SIEM, known for grouping related correlated events into an "offense" |
| Elastic Stack / Elastic Security | Open-source-rooted platform (Elasticsearch, Logstash, Beats, Kibana) usable as general log analytics or, with Elastic Security, as a SIEM |

## Check yourself

Without naming a specific product, what are the core capabilities you'd look for to
decide whether a tool is genuinely "a SIEM" versus just log storage? (This ties
directly back to Lesson 7.)
