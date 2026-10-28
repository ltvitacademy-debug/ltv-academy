# Lesson 32 — Chapter Capstone: Sentinel, Defender XDR & KQL Review

**Chapter 8 · Capstone: End-to-End Detection and Response in Sentinel · Lesson 32 of 32**

## What you'll learn

- How every chapter in this course fits together as one working detection-and-response system,
  not seven separate topics
- A chapter-by-chapter recap, tied back to the custom rule, the investigation, and the case study
  Lessons 29 through 31 just put into practice
- Why no single chapter's technique was ever meant to catch and close an incident on its own
- What comes next in this career path, now that this course is complete

## One system, not seven topics

Every chapter in this course is a working part of the same Sentinel deployment, and this capstone
is where they stop being separate topics and start being the thing Lessons 29 through 31 just ran
for real. **The platform** (Chapter 1) is what gets logs into a workspace in the first place.
**KQL** (Chapter 2) is the language every query in this chapter was written in. **Analytics rules**
(Chapter 3) are what turned Lesson 29's query into something that runs on its own and raises an
incident. **Workbooks** (Chapter 4) are how that same data gets watched continuously, not just
queried once. **Defender XDR** (Chapter 5) is where Lesson 31's phishing alert actually came from.
**Investigation** (Chapter 6) is the graph, timeline, and hunting query every lesson in this
chapter leaned on. **Playbooks** (Chapter 7) are what responded to Lesson 31's incident in seconds
instead of minutes.

## The course, chapter by chapter

- **Chapter 1 — Microsoft Sentinel Architecture.** What Sentinel actually is as a cloud-native
  SIEM and SOAR product, the Log Analytics workspace as its foundation, data connectors, and
  pricing/retention — the platform every log in this course landed on.
- **Chapter 2 — KQL Fundamentals.** What KQL is and how it differs from SQL, filtering and
  projecting, summarizing and aggregating, joining tables and time windows — the self-join in
  Lesson 29 and the hunting queries in Lessons 30 and 31 are this chapter, applied.
- **Chapter 3 — Analytics Rules & Detection Engineering.** Scheduled rules, built-in vs. custom,
  entity mapping, and writing a real KQL-based rule — exactly what Lesson 29 built from scratch.
- **Chapter 4 — Workbooks & Visualization.** What a workbook actually is, built-in vs. custom,
  visualizing query results, and building one for a specific use case — the continuous-monitoring
  counterpart to the one-time alerts this chapter's rule produced.
- **Chapter 5 — Microsoft Defender XDR.** What Defender XDR unifies, Defender for Endpoint,
  Defender for Office 365, and Defender for Identity — the source of Lesson 31's phishing alert.
- **Chapter 6 — Incident Investigation in Sentinel.** The incident queue and severity triage, the
  investigation graph and entity timelines, hunting queries, and bookmarks — the exact sequence
  Lesson 30 ran step by step and Lesson 31 ran again under real pressure.
- **Chapter 7 — Automation with Playbooks.** Playbooks and Logic Apps, triggering from an
  incident, a real automation-rule example, and when to keep a human in the loop — the playbook
  that disabled Lesson 31's account in seconds, with an analyst still confirming the details after.
- **Chapter 8 — Capstone.** A custom analytics-rule lab, a full investigation lab, a multi-stage
  case study, and this review — all seven chapters, applied together, end to end.

## No single chapter catches and closes an incident alone

Lesson 31's case is the clearest proof this has to work as one system. A custom analytics rule
with no entity mapping behind it never correlates with the phishing alert at all. A correlated
incident with no automation rule and playbook behind it waits for a human to manually disable the
account, minutes later than the playbook did it. A disabled account with no investigation graph,
timeline, and hunting query behind it never gets confirmed as contained instead of still spreading.
And none of it ends anywhere defensible without a specific, written closing note. Every chapter is
load-bearing for the ones after it — exactly the same lesson the prior course in this path closed
on, now proven inside one specific, real product.

## Key terms

| Term | Meaning |
|---|---|
| Entity mapping | Chapter 3's mechanism that let two unrelated alerts correlate into one multi-stage incident |
| Investigation graph / entity timeline | Chapter 6's tools for seeing what an entity actually did across every connected alert |
| Automation rule / playbook | Chapter 7's unattended first response, running before an analyst opens the case |
| Multi-stage incident | A single incident formed by correlating alerts that share an entity, as in Lesson 31 |

## Check yourself

Of the seven chapters before this one, which single chapter do you think would have been hardest
to remove from Lesson 31's case — and what would the investigation have missed if that chapter's
technique simply didn't exist?

## Course complete

That's the full course. You've gone from what Microsoft Sentinel actually is to writing a custom
KQL-based detection, investigating the incident it created end to end, and watching that same
incident correlate with a Defender XDR alert, trigger an automated response, and close with a
clear, defensible resolution — the full toolkit a Sentinel analyst runs every single day. Next up
in this path: **Incident Response, Threat Hunting & SOC Capstone**.
