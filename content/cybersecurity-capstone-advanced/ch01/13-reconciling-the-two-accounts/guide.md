# Lesson 13 — Reconciling the Two Accounts

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 13 of 26**

## What you'll learn

- Why Mara compares the two underlying account lists, not just the two counts
- The specific reconciliation technique she uses: set comparison, not spot-checking
- What the comparison actually shows — and what it rules out
- Why this result still isn't the full answer

## Comparing counts tells you nothing. Comparing lists tells you everything.

A count of 14 and a count of 19 could mean several completely different things. The 19-account list could contain all 14 of the audit's accounts plus 5 more. It could contain a different 14 plus 5 new ones, meaning some accounts the audit counted aren't even on the automation's list. It could overlap only partially. Each of those is a different story with a different root cause — and the raw numbers alone cannot tell you which one you're in. Mara pulls both raw account lists — not summaries, the actual usernames — and does the only thing that actually answers the question: a direct, account-by-account set comparison.

## The method: union, intersection, difference

Mara treats this the way any reconciliation between two data sources should be treated — as a set problem, not an argument about which source to trust:

- **Intersection** — which accounts appear on *both* lists
- **In the audit's list but not the automation's** — accounts the audit counted that the automation somehow missed
- **In the automation's list but not the audit's** — accounts the automation counted that the audit's method never saw

```python
audit_accounts = set(audit_report.accounts)          # 14 accounts
automation_accounts = set(automation_report.accounts) # 19 accounts

only_in_audit = audit_accounts - automation_accounts
only_in_automation = automation_accounts - audit_accounts
in_both = audit_accounts & automation_accounts

print(f"In both: {len(in_both)}")
print(f"Only in audit: {len(only_in_audit)}")
print(f"Only in automation: {len(only_in_automation)}")
```

## What the comparison shows

The result is clean, and it rules out the messiest possible explanation immediately:

- **In both:** all 14 accounts from the audit's list
- **Only in the audit's list:** zero accounts
- **Only in the automation's list:** 5 accounts

Every single account the audit counted is also on the automation's list. There is no account the audit found that the automation is somehow failing to see. The automation's 19 is not a *different* 14 plus 5 — it's the *exact same* 14, plus 5 more the audit's method never had a way to catch. The automation's result is a strict superset of the audit's, not a conflicting one.

## What this rules in, and what it still doesn't answer

This one comparison already eliminates an entire category of explanation: nobody made a data error, nobody miscounted, and the two tools aren't looking at two different populations of accounts. Whatever is happening, it's consistent and structural, not noisy. But "5 accounts exist only in the automation's list" is not yet an explanation — it's a precisely defined question. Who are these 5 accounts, how did each of them get standing admin access to the OT/SCADA segment, and why does none of it run through either group? That's exactly what Lesson 14 traces down.

## Key terms

| Term | Meaning |
|---|---|
| Set reconciliation | Comparing two data sources as sets — intersection, and each side's unique difference — rather than comparing only their totals |
| Superset result | When one data source's results fully contain another's, plus additional entries, rather than conflicting with it |
| Root-cause discipline | Resolving a discrepancy by examining the underlying data before deciding which source, if either, is at fault |

## Lab

1. Using the audit_accounts and automation_accounts sets above, write the one additional line of Python that would print the 5 usernames only in automation_accounts, not just their count.
2. Explain, in one sentence, why "the automation's list is a superset of the audit's" is a meaningfully different finding than "the two lists partially overlap."

## Check yourself

You're ready for Lesson 14 when you can explain why this lesson's comparison rules out a data error on either side, and can state precisely what open question remains: who are the 5 accounts, and how did they get this access.
