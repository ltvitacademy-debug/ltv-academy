# Lesson 15 — Sharing and Large Data Volumes

**Chapter 3 · Sharing Architecture · Lesson 15 of 24**

## What you'll learn

- What's actually stored in the sharing table, and why its row count — not record count alone — drives performance
- Why a permissive OWD can outperform a restrictive one at large scale, even though it looks less secure on paper
- The three kinds of data skew that show up in real orgs, and the rough thresholds where each starts to hurt
- How skew and sharing recalculation compound each other
- Practical mitigation strategies an architect reaches for before a skew problem becomes an outage

## What the sharing table actually holds

Every object with an OWD stricter than Public Read/Write has a backing **Share object** (`AccountShare`, `OpportunityShare`, and so on) that Salesforce maintains behind the scenes. Each row in that table represents one grant of access beyond the owner: a record ID, the user or group ID receiving access, the access level, and a **Row Cause** explaining why the row exists (a role, a sharing rule, a team, manual sharing, an Apex sharing reason). A **Group Maintenance** table separately tracks which users belong to which roles, territories, and public groups, so that a single group membership change can cascade to every sharing row that depends on it. You can query a Share object directly — `SELECT AccountId, UserOrGroupId, AccessLevel, RowCause FROM AccountShare WHERE AccountId = '...'` — and this is usually the fastest way to debug a specific "why can this user see (or not see) this record" question, faster than reasoning through every mechanism by hand.

The architectural implication: **if OWD is already Public Read/Write, no sharing rows are needed at all**, because nothing beyond the default needs representing. The moment OWD is Private or Public Read Only, every grant beyond the owner becomes a row (or a small number of rows) that has to be stored, indexed, and recalculated. At large data volumes, that row count — not the raw record count — is usually what determines how sharing performs. A million-record object with a wide-open OWD can be cheaper to maintain than a hundred-thousand-record object with a tight OWD and a dense role hierarchy generating millions of derived sharing rows underneath it.

## Data skew: when concentration, not volume, is the problem

Large data volumes cause trouble less often from sheer record count and more often from **data skew** — too many records concentrated under one parent, one owner, or one lookup target instead of being spread out. There are three recognized types:

- **Account data skew.** Thousands of child records (Contacts, Opportunities, Cases) sitting under a single Account. This causes record locking during bulk DML and can stall data loads. As a rough guide, problems start becoming noticeable around 10,000 child records under one parent, especially in orgs with heavy automation, and become critical above roughly 50,000.
- **Ownership skew.** One user or queue owning a very large number of records under a private or restrictive sharing model. Beyond roughly 10,000 records per owner, any role change, deactivation, or territory reassignment for that owner can trigger a sharing recalculation large enough to lock up the org for hours.
- **Lookup skew.** A large number of records pointing at the same target record through a lookup field (not master-detail), producing similar locking and contention problems on writes to that shared target.

## Why skew and recalculation compound

Ownership skew is dangerous specifically because of how it interacts with recalculation: the deeper and narrower the role hierarchy above a heavily-skewed owner, the further the recalculation blast radius travels when something above that owner changes. A user with 80,000 owned records sitting under a long hierarchy means a single role move can force Salesforce to recompute visibility for all 80,000 records across every role in the chain beneath the point of change — which is exactly the scenario that produces a sharing recalculation job running for hours. This is why role hierarchy depth is itself a performance lever, not just an org-chart modeling choice: a flatter hierarchy reduces the blast radius of every future change, even if it means a slightly less "accurate" mirror of the org chart.

## Mitigation strategies

An architect designing for LDV treats these as design-time decisions, not post-incident cleanup:

- **Favor a more permissive OWD plus narrower exceptions** over a restrictive OWD plus a dense sharing-rule/role structure, specifically on high-volume objects, since it minimizes sharing-row count.
- **Flatten the role hierarchy** where the business genuinely tolerates it — depth should map to how often reporting-line changes actually cascade visibility, not to how the org chart looks on a slide.
- **Avoid criteria-based sharing rules on the highest-volume objects** where an owner-based rule, a team, or a hierarchy adjustment can achieve the same result with fewer generated rows.
- **Batch large ownership reassignments** (commonly recommended in increments of a couple thousand records at a time, during off-peak hours) rather than one mass update that forces a single enormous recalculation.
- **Move genuinely historical, rarely-accessed records to Big Objects**, which sit outside the standard sharing and skew calculations entirely, when the business only needs to retain them, not actively work them.

## Key terms

| Term | Meaning |
|---|---|
| Share object | The backing table (e.g., `AccountShare`) storing one row per grant of access beyond the record owner |
| Row Cause | The field on a sharing row recording why that grant exists (role, rule, team, manual, Apex) |
| Data skew | Records concentrated under one parent, owner, or lookup target instead of being evenly distributed |
| Ownership skew | A single user or queue owning an unusually large number of records under a restrictive sharing model |
| Account data skew | An unusually large number of child records under a single parent Account |

## Lab

For an Opportunity object with OWD set to Private, a three-level role hierarchy, and one owner (an integration user) holding 60,000 records, reason through: (1) roughly how large a sharing recalculation would be triggered if that integration user's role were moved one level up the hierarchy, (2) two concrete design changes that would reduce that blast radius before the move happens, and (3) whether a Big Object migration is a sensible mitigation here, and why or why not given the records are actively worked, not historical.

## Check yourself

Explain why a Public Read/Write OWD can outperform a Private OWD at large data volumes, even though it grants more access by default. Name the three types of data skew and the mechanism by which ownership skew makes sharing recalculation worse.
