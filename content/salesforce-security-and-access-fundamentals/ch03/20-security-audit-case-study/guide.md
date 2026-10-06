# Lesson 20 — Security Audit Case Study

**Chapter 3 · Applying Security · Lesson 20 of 24**

## What you'll learn

- How to run a structured security audit against a real-looking org,
  start to finish
- How to spot several of Lesson 19's mistakes stacked together in one
  place
- How to prioritize findings — what to fix first, and why
- How to write up an audit finding so it's actionable, not just a
  complaint

This lesson is a single worked case study, using a third fictional
company, that pulls together the design process from Lessons 14-15,
the troubleshooting order from Lesson 18, and the mistake patterns
from Lesson 19 into one audit.

## The scenario: Brightwell Insurance Group

**Brightwell Insurance Group** is an invented mid-size insurance
brokerage. Its Salesforce admin left six months ago without handing
off documentation, and the new admin — you, for this exercise — has
been asked to audit the org's security before a compliance review.

## Finding 1 — Public Read/Write on Opportunity

Brightwell's Opportunity OWD is Public Read/Write, across an org where
agents work distinct client books (closer to Lesson 14's Meridian
shape than Lesson 15's Harbor Point shape). Interviewing the team
reveals nobody remembers choosing this deliberately — it's simply what
a years-old setup wizard defaulted to, and nobody revisited it as the
org grew. This is Lesson 19's Mistake 1, found in the wild: no
sharing rules exist at all, because the OWD never required any.

**Audit note:** *Opportunity OWD is Public Read/Write with no
documented business reason. Every agent can edit every other agent's
deals. Recommend Private OWD plus a role-hierarchy rollup matching the
existing (already-correct) role hierarchy — low implementation risk
since the hierarchy is already in place.*

## Finding 2 — Three near-identical profiles

"Agent," "Senior Agent," and "Agent - Commercial Lines" are three
separate profiles with almost identical object and field permissions —
the only real differences are two fields on a custom Policy object and
one extra tab. This is Mistake 3: profile explosion where permission
sets should have carried the differences.

**Audit note:** *Three profiles differ by two fields and one tab.
Recommend consolidating to a single "Agent" profile plus a "Commercial
Lines Access" permission set, reducing three objects to maintain down
to one plus one.*

## Finding 3 — A Modify All grant with no documented reason

The "Data Migration Support" permission set grants Modify All on five
objects and is currently assigned to four active users. Nobody
interviewed can explain why these four people specifically have it, and
the name suggests a one-time data migration project. This is Mistake
2 and Mistake 5 together: a broad grant made for a specific past need,
never revisited.

**Audit note:** *"Data Migration Support" grants Modify All on five
objects to four users with no current migration in progress. Recommend
confirming with each user's manager whether ongoing access is actually
needed; if not, unassign the permission set rather than leave it
active "in case."*

## Finding 4 — No restriction rule on a sensitive custom object

Brightwell stores a custom **Claim_Investigation__c** object
containing details of active fraud investigations. OWD is Private, but
the Claims Processing team's sharing rule grants broad read access to
the whole team — including a few members who, per policy, shouldn't see
investigations still in progress. This is a textbook restriction-rule
case from Lesson 16, not yet applied.

**Audit note:** *The Claims Processing sharing rule grants broader
read access to Claim_Investigation__c than policy allows for
in-progress investigations. Recommend a restriction rule limiting
visibility to Status != 'In Progress' for users without the
Investigator permission set, preserving the existing sharing rule for
everything else.*

## Prioritizing the findings

Not every finding is equally urgent. A reasonable priority order for
this audit:

```
1. Finding 4 (Claim_Investigation__c) — active, ongoing exposure of
   sensitive in-progress data; fix first
2. Finding 3 (Modify All grant)        — broad, unexplained access;
   fix second
3. Finding 1 (Opportunity OWD)         — real gap, but lower-sensitivity
   data and no reported incident
4. Finding 2 (profile explosion)       — a maintenance cost, not an
   active exposure; lowest urgency
```

Urgency follows **sensitivity of the data exposed** and **whether the
access is currently excessive**, not just how easy a fix is — Finding
2 is the easiest fix here but the least urgent.

## Key terms

| Term | Meaning |
|---|---|
| Audit finding | A documented, specific gap between actual and intended access, written to be actionable |
| Audit priority | Ranking findings by data sensitivity and current exposure, not by ease of fix |

## Check yourself

For Finding 1, the audit note recommends Private OWD plus the existing
role hierarchy, calling it "low implementation risk since the
hierarchy is already in place." Why does that detail matter when
prioritizing a fix — what would change if the hierarchy didn't already
match the org chart?
