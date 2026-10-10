# Lesson 19 — Sharing Architecture Case Study: Financial Services

**Chapter 3 · Sharing Architecture · Lesson 19 of 24**

## What you'll learn

- How to translate a regulated-industry business scenario into a concrete sharing design
- Why financial services sharing problems are usually about compliance boundaries first and collaboration second
- How to combine OWD, role hierarchy, sharing rules, and a restriction rule to satisfy competing requirements on the same object
- How to defend a sharing design decision the way a review board would probe it

## The scenario

**Meridian Wealth Partners** is a mid-size wealth management firm with 1,200 internal users across three business lines: **Private Banking** (ultra-high-net-worth households, 40 advisors), **Retail Advisory** (mass-affluent clients, 300 advisors organized into 12 regional teams), and **Compliance** (35 staff responsible for regulatory oversight across both lines). The core object is **Household__c**, with related **Account__c** (financial accounts) and **Holding__c** (individual positions) records — roughly 2.1 million Household records total, heavily concentrated: Retail Advisory holds about 1.9 million of them, Private Banking the rest.

Business requirements, gathered directly from stakeholders:

- A Retail Advisor must see only the Households assigned to them; their Regional Director must see every Household in their region; the VP of Retail Advisory must see every Retail Household firm-wide.
- Private Banking is kept organizationally and visibly separate: Retail Advisors must **never** see Private Banking households, even accidentally through a broad report or list view.
- A small subset of Households — accounts flagged `Under_Regulatory_Review__c = true` (currently about 800 records, fluctuating) — must be visible **only** to Compliance and the advisor of record, regardless of what a Regional Director or VP would otherwise be able to see. This is a hard legal requirement, not a convenience setting.
- Compliance needs read access across **every** Household in the firm, both business lines, for audit purposes, but should never be able to edit client data.
- A handful of cross-sell scenarios exist where a Private Banking advisor and a Retail Advisor jointly serve a household during a transition; this needs to be supportable but is rare (under 50 households at any time) and shouldn't shape the whole design.

## Designing the model

**OWD:** Private for `Household__c` and its children. The regulatory-review requirement alone rules out any broader default — Public Read Only would require the Regulatory Review carve-out to fight against a baseline that already shows the record firm-wide, which is a weaker compliance posture than starting from Private and granting explicitly.

**Role hierarchy:** Two separate branches under the firm root — Private Banking and Retail Advisory — rather than one shared tree. Within Retail Advisory: Retail Advisor → Regional Director → VP, Retail Advisory, exactly matching the stated visibility requirements with no sharing rules needed for that part of the design at all, since role hierarchy alone gives each level visibility into everything below it. Private Banking is kept on its own branch specifically so nothing in its hierarchy structurally overlaps with Retail — satisfying "must never see Private Banking households" through structure rather than through a rule that could be misconfigured later.

**Sharing rule — Compliance:** One role-based, criteria-free sharing rule: public group "Compliance Staff" gets Read Only on all Household records firm-wide. This single rule satisfies the audit requirement without touching the role hierarchy or granting write access anywhere it isn't needed.

**Restriction rule — Regulatory Review:** A Restriction Rule on `Household__c` with record criteria `Under_Regulatory_Review__c = true` and user criteria "all users except members of the Compliance Staff group and the household's own Advisor." This is the one place the design intentionally removes access that the role hierarchy would otherwise grant — a Regional Director or VP would normally see every household beneath them, and the restriction rule carves out exactly the regulatory-review subset from that visibility, cleanly, without weakening the rest of the hierarchy.

**Manual sharing — cross-sell transitions:** Rather than building a permanent mechanism for a rare, temporary situation, the joint-service cases use manual sharing, applied by the advisor of record and removed once the transition completes. Building a dedicated sharing rule or team structure for fewer than 50 households at any time would add permanent complexity to solve a temporary, low-volume problem.

## Why this design, not an alternative

A reviewer might ask: why not just use a sharing rule for Compliance's audit access, combined with a second rule excluding Regulatory Review records, instead of a Restriction Rule? Because sharing rules are strictly additive — Salesforce has no declarative way to write a sharing rule that *subtracts* from access another rule or the role hierarchy already granted. Restriction Rules exist precisely because this firm's requirement (broad grant, with a narrow legally-mandated exception) cannot be expressed any other way without either dropping OWD further (breaking the clean role-hierarchy-driven design for everyone) or rebuilding Compliance's access rule to explicitly exclude the regulatory-review criteria every time it changes.

## Key terms

| Term | Meaning |
|---|---|
| Household__c | The core client-relationship object in this case study, holding Account and Holding children |
| Regulatory review carve-out | The Restriction Rule narrowing visibility on flagged records to Compliance and the advisor of record only |
| Branch separation | Structuring Private Banking and Retail Advisory as separate role-hierarchy branches rather than overlapping ones |

## Lab

Design the complete sharing model for Meridian Wealth Partners as specified above: state the OWD and justification, sketch the two-branch role hierarchy, write the Compliance sharing rule in plain English (object, criteria, recipients, access level), write the Restriction Rule's user and record criteria, and explain the manual-sharing decision for cross-sell transitions. For each piece, write the one-sentence business justification a review board would expect, and identify which single requirement would break first if that piece were removed.

## Check yourself

Why does this design use a Restriction Rule instead of trying to build the regulatory-review exclusion into the Compliance sharing rule itself? Why are Private Banking and Retail Advisory kept as separate role-hierarchy branches rather than one combined tree with careful sharing rules layered on top?
