# Lesson 28 — Security and Privacy Case Study: Customer Data

**Chapter 6 · Applied Security and Privacy · Lesson 28 of 30**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional incident
- How a single offboarding gap can cascade through classification, access, protection, and breach response
- How the lifecycle and compliance concepts from Chapter 5 actually get triggered in sequence
- What this incident would have needed to never happen in the first place

## The scenario (fictional, illustrative)

**Brightfield Retail**, a fictional mid-sized home-goods e-commerce company, hired a short-term contractor to help build a quarterly sales dashboard. The contractor's access was granted broadly — "just give them what the analytics team has" — rather than scoped to the dashboard work specifically. When the contract ended, the offboarding checklist was followed for payroll and badge access, but the contractor's database login was never revoked, because no single system owned "remove database access" as a step. This is a realistic composite of how access incidents actually happen — not a real company or a real breach.

## Applying the course, chapter by chapter

**Chapter 1 (Sensitive Data Foundations):** The dashboard the contractor was hired to build pulled from a `customer_orders` table containing names, email addresses, shipping addresses, and the last four digits of payment cards — PII and sensitive data (Lessons 2–3) that should have triggered extra scrutiny on who could query it, under whatever privacy-by-design review (Lesson 6) Brightfield's engineering process was supposed to apply before granting broad access.

**Chapter 2 (Classification):** The `customer_orders` table had never been run through Brightfield's classification process (Lessons 7–10) — it existed in the same general-access schema as non-sensitive inventory tables, so nothing about the table itself signaled "this needs tighter controls" to anyone provisioning access.

**Chapter 3 (Access Control):** This is where the incident actually originates. Access was granted by role-copying ("give them what the analytics team has") instead of least privilege (Lesson 14) scoped to the dashboard's actual data needs. There was no segregation-of-duties check (Lesson 15) on a contractor receiving standing access to raw customer data for a reporting task that didn't need row-level detail. And critically, there was no access review or recertification process (Lesson 16) that would have caught the still-active login after the contract ended.

**Chapter 4 (Protecting Data):** Even with broad access granted, the exposure would have been smaller if the payment-card fragment and full shipping addresses had been masked (Lesson 18) for a reporting-only login, or if row-level security (Lesson 22) had limited the contractor's queries to aggregated regional totals instead of individual customer rows.

**Chapter 5 (Lifecycle and Compliance):** Three months after the contract ended, Brightfield's security team noticed the dormant login querying the full `customer_orders` table during an unrelated access review — exactly the kind of catch a periodic review (Chapter 3) and a well-formed audit log (Lesson 26) are supposed to enable. The breach response lifecycle (Lesson 27) kicked in: the login was revoked immediately (contain), the audit trail showed exactly which rows were queried and exported (assess), legal and the privacy team determined notification was required because the exposure was more than theoretical, and affected customers began submitting data subject requests (Lesson 25) once notified, asking what had been accessed and requesting it be investigated further.

## The result

Brightfield's actual fix wasn't a new tool — it was closing the gap between systems. Offboarding now includes a database-access step with a named owner, access reviews run quarterly instead of "as needed," and the `customer_orders` table was reclassified and had row-level security applied so a reporting login can no longer see unaggregated customer rows at all. The incident was expensive to investigate specifically because no single control would have stopped it — it took a gap in four different chapters lining up at once.

## This course's closing idea, early

Every control in this course — classification, least privilege, masking, retention, logging — is cheap compared to investigating an incident after the fact, because an incident forces you to answer all of them simultaneously, under time pressure, with lawyers and customers already involved.

## Key terms

| Term | Meaning |
|---|---|
| Offboarding gap | A control failure where an access-removal step has no single owner and silently doesn't happen |
| Role-copying | Granting access by mirroring another user's permissions rather than scoping to actual need |
| Compounding control failure | An incident that required gaps in multiple, independent controls to line up at once |

## Lab

Pick one of the four chapter-level gaps in the Brightfield scenario (classification, access control, data protection, or lifecycle/logging) and write two sentences on which single fix from that chapter would have reduced this incident's impact the most, and why you picked that one over the others.

## Check yourself

Can you walk through the Brightfield Retail scenario from memory, chapter by chapter, and explain why it took a gap in four different places — not one dramatic failure — to let this incident happen?
