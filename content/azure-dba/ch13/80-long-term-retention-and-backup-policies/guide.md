# Lesson 80 — Long-Term Retention & Backup Policies

**Chapter 13 · Backup & Restore · Lesson 80 of 95**

## What you'll learn

- What long-term retention (LTR) is, and how it's a genuinely separate policy from the 7-35 day short-term window
- How to configure an LTR policy on weekly, monthly, and yearly backups, up to 10 years
- Where to actually find and restore from an LTR backup once one exists
- Why LTR exists for compliance, not for day-to-day operational recovery

## LTR is a separate policy, not an extension of the default

Lesson 79's point-in-time restore window tops out at 35 days — good for
operational mistakes and recent incidents, but not for regulatory
requirements that mandate keeping financial or healthcare records
recoverable for years. **Long-term retention (LTR)** is a distinct policy
you configure on top of the short-term window, specifically for that: it
takes designated full backups and retains them for up to **10 years**,
independent of the 7-35 day operational window.

LTR policies are configured per-frequency, and you don't have to pick just
one:

| Backup frequency | What gets retained |
|---|---|
| Weekly | A designated weekly full backup, kept for W weeks |
| Monthly | A designated monthly full backup, kept for M months |
| Yearly | A designated yearly full backup, kept for Y years (up to 10) |

You configure this from the database's **Backups** blade, on a dedicated
**Retention policies** tab:

![Azure Portal backup retention policies configuration tab](/courses/azure-dba/ch13/80-long-term-retention-and-backup-policies/ltr-policies-tab.png)

Each row lets you set a retention duration independently — you might keep
weekly backups for 12 weeks, monthly backups for 12 months, and a yearly
backup for 7 years, all as separate settings on the same database.

## Finding and restoring from LTR backups

Once an LTR policy has been running long enough to produce backups, they
show up in a separate list from the short-term automated backups — the
**Available backups** tab, distinctly from the point-in-time restore
option covered in Lesson 79:

![Azure Portal available long-term-retention backups list](/courses/azure-dba/ch13/80-long-term-retention-and-backup-policies/ltr-available-backups-tab.png)

Restoring from an LTR backup, like a point-in-time restore, creates a new
database — it does not overwrite anything. The key difference from Lesson
79 is precision: point-in-time restore lets you pick *any second* within
its shorter window, while an LTR restore gives you the specific full
backups the policy designated (a particular week's, month's, or year's
backup), not an arbitrary timestamp.

## Why this is a compliance tool, not an operational one

It's worth being explicit about the actual use case: nobody restores a
7-year-old LTR backup because someone ran a bad `UPDATE` this morning —
that's what the 35-day short-term window and Lesson 79's restore are for.
LTR exists because regulations (financial records, healthcare data,
audit requirements) sometimes mandate retention far beyond any realistic
operational recovery need. Configuring it is a policy decision as much as
a technical one — a DBA sets it based on what compliance actually
requires, not based on how far back an incident might realistically reach.

## Key terms

| Term | Meaning |
|---|---|
| Long-term retention (LTR) | A separate backup retention policy, up to 10 years, independent of the 7-35 day short-term window |
| Retention policies tab | Where LTR is configured, per frequency (weekly/monthly/yearly) |
| Available backups tab | Where existing LTR backups are found and restored from |

## Check yourself

You're ready for Lesson 81 when you can explain, without looking: how is
long-term retention different from the point-in-time restore window
covered in Lesson 79, and why does a DBA configure it based on compliance
requirements rather than operational recovery needs?
