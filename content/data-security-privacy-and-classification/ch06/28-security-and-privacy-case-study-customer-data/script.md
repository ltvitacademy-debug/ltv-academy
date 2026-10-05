# Lesson 28 — Security and Privacy Case Study: Customer Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Brightfield Retail, a fictional mid-sized home-goods e-commerce
company, hired a contractor to build a dashboard. Their database
access was granted broadly, and when the contract ended, nobody
revoked it — because no single system owned that step.

## S2 · STEPS CARD (the setup)

Access was granted by role-copying — "give them what the analytics
team has" — instead of scoping to the dashboard's actual needs. When
the contract ended, payroll and badge access were shut off, but the
database login was never part of any single owner's checklist. It
stayed active for three months.

## S3 · STEPS CARD (chapters 1-4 applied)

The table the contractor queried had never gone through classification
— it sat in the same general-access schema as ordinary inventory data.
There was no least-privilege scoping and no periodic access review. And
even with that access, the exposure could have been smaller: masking
the payment fragment, or row-level security limiting queries to
aggregated totals instead of individual customer rows.

## S4 · STEPS CARD (chapter 5 applied)

Three months later, security noticed the dormant login querying the
full table during an unrelated review. The response lifecycle kicked
in: revoke the login, use the audit trail to see exactly what was
queried and exported, determine notification was required, and
affected customers began submitting data subject requests once they
were informed.

## S5 · OUTRO CARD

It took a gap in four different chapters lining up at once, not one
dramatic failure. Next lesson: designing an access governance model —
the control that would have caught this before it ever happened.
