# Lesson 24 — Capstone Wrap-Up & Security Review Checklist

**Chapter 7 · Capstone: Securing a Real Instance · Lesson 24 of 24**

## What you'll learn

- A real, usable security review checklist covering every chapter of this course, the kind a working ServiceNow security architect actually keeps
- How Meridian Trust Bank's instance scores against that checklist, before and after this capstone's three lessons
- Why "passing" a review once isn't the finish line — configuration drifts, and the checklist has to be re-run
- The real question this course hands off to the next one: how do you promote a secure configuration across environments without quietly reintroducing the gaps you just closed

## The checklist: six sections, one per area of this course

A security review checklist isn't a vague list of good intentions — it's a set of specific, checkable items, each one traceable to a real platform setting or query. This is the checklist a ServiceNow security architect runs against any instance, organized by the same six areas this course covered, chapter by chapter.

**1. Role design (Chapter 1)**
- [ ] Query `sys_user_role` and compare the role count against headcount — a ratio far above roughly one custom role per 50–100 users is a sprawl signal worth investigating.
- [ ] Check for roles with near-identical names or descriptions (`_temp`, `_v2`, `_backup`) — each one is a candidate for consolidation into a shared `contains_roles` parent.
- [ ] Confirm every custom role has a documented reason it exists and an owner responsible for it.
- [ ] Run (or schedule) a quarterly access review and confirm it's legible — if a reviewer can't tell which of a user's roles is load-bearing, the hierarchy needs work before the review means anything.

**2. ACL evaluation and field-level patterns (Chapter 2)**
- [ ] For every table holding regulated or sensitive data, list its fields by sensitivity and confirm each comparable field uses the same ACL pattern — no field protected only by a broad role sitting next to one protected by a scripted, purpose-built role.
- [ ] For any table with ACLs defined at more than one inheritance level, confirm which level is actually in effect, rather than assuming the base-table ACL covers everything.
- [ ] Review every scripted ACL condition for a hard-coded `answer = true` fallback left over from testing — a common, serious leftover that silently grants access to everyone.

**3. Authentication and SSO (Chapter 3)**
- [ ] Confirm the instance's authentication method matches the organization's actual enterprise standard — not just "SSO is configured," but "local authentication is actually disabled for ordinary users."
- [ ] Confirm MFA is enforced somewhere in the authentication path — at the identity provider if using SSO, or through the platform's own MFA plugin if local authentication is still in use for any account.
- [ ] Confirm exactly one monitored break-glass account exists for identity-provider outages, not an open-ended set of accounts still permitted to bypass SSO.

**4. Data protection and encryption (Chapter 4)**
- [ ] Confirm which sensitive fields are protected by column-level encryption versus which rely on ACLs alone — an ACL controls who can query a field through the UI or API, but doesn't protect the raw value in a database-level export or backup the way encryption does.
- [ ] Confirm non-production instances (dev, test, sub-production) use masked or anonymized copies of sensitive production data, not unmasked customer PII.
- [ ] Confirm attachment and export controls exist on any table holding regulated data — a correct field-level ACL is undermined if the same data can be exported as a CSV or attached as a file with no equivalent control.

**5. Security operations readiness (Chapter 5)**
- [ ] Confirm Security Incident Response and Vulnerability Response are actually configured, not just installed — an unconfigured plugin provides no real protection.
- [ ] Confirm there's a defined, tested process for responding to a security incident on the instance itself, not just on the systems it manages.

**6. Governance, audit, and compliance (Chapter 6)**
- [ ] Confirm the `security_admin` role (or any comparably elevated role) is held by the smallest possible number of accounts, each with a documented business reason.
- [ ] Confirm every regulated or sensitive field has its `Audit` flag enabled, so `sys_audit` actually has history to produce when a dispute or a regulatory request arrives.
- [ ] Confirm the instance's audit and retention settings actually satisfy the compliance frameworks that apply to the organization — not just that logging exists in principle.

## Scoring Meridian: before and after

Before this capstone, Meridian failed items in five of the six sections: role design (162 sprawling roles), field-level ACLs (the `annual_income` inconsistency), authentication (local-only against an Okta standard), and audit/governance (no `Audit` flag on sensitive fields). After Lesson 23's remediation, sections 1, 2, 3, and 6 for the specific fields and roles covered in this capstone now pass. Sections 4 and 5 — column-level encryption coverage, non-production data masking, and security-operations configuration — were never assessed in this three-lesson capstone at the same depth, and a real engagement would schedule a follow-up review to close that gap before calling the instance fully reviewed.

That's a genuine, important limitation to state plainly rather than paper over: this checklist exists precisely so that "we fixed the three findings we happened to notice" never gets mistaken for "we reviewed the instance." A real security architect runs the full six-section checklist on a schedule — annually at minimum, and after any significant platform upgrade — because a passing score today is a snapshot, not a permanent state. New roles get created, new ACLs get added, new fields get introduced. Every one of Lesson 22's four findings was itself the result of nobody re-running a check like this one for four years.

## Closing the capstone — and opening the next course

This checklist is also the real handoff to Course 11, ServiceNow DevOps, Testing & Deployment. Every fix this capstone made — the role hierarchy, the ACL script, the plan to retire local authentication — now has to move safely from the sub-production instance where it was built into Meridian's actual production environment, and then stay in sync as the platform evolves. That's a configuration-promotion problem, not a security-design problem, and it carries a real risk this course has spent seven chapters warning about: a secure configuration built correctly in one environment can still arrive broken, partial, or silently reverted in another if the promotion process itself isn't trustworthy. Course 11 picks up exactly there.

## Key terms

| Term | Meaning |
|---|---|
| Security review checklist | A set of specific, checkable items tied to real platform settings — not a general impression of security posture |
| Sprawl signal | A ratio or pattern (e.g. role count far exceeding headcount) that flags a likely governance gap worth investigating |
| Configuration promotion | Moving a configuration change from one environment (e.g. sub-production) to another (e.g. production) reliably and without drift |
| Follow-up review | A deliberately scheduled re-check of areas not covered at full depth in an earlier review, rather than treating a partial review as complete |

## Check yourself

This course's seven chapters taught you to design and verify a secure ServiceNow configuration. Course 11 teaches you to promote that same configuration across environments reliably. In your own words: what specifically could go wrong if Meridian's new role hierarchy and corrected ACL script from Lesson 23 were moved from sub-production to production using an untracked, manual process instead of a disciplined deployment pipeline — and which of this course's six checklist sections would catch that failure the next time a review runs?
