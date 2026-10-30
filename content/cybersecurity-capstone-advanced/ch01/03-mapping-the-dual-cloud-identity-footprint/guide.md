# Lesson 3 — Mapping the Dual-Cloud Identity Footprint

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 3 of 26**

## What you'll learn

- Why you inventory identity sprawl *before* consolidating anything, not
  after
- What Hartwell's real Azure AD (Entra ID) footprint looks like, and where
  it's grown unmanaged
- What Hartwell's real AWS IAM footprint looks like across multiple
  accounts, including the long-lived access key problem
- Why "no single system of record" is itself the finding, independent of
  any one bad account

## Inventory first, consolidate second

It's tempting to jump straight to Lesson 6's identity consolidation — pick a
federation approach, wire it up, done. Mara resists that, for a reason
every Security Engineer eventually learns the hard way: you cannot
consolidate what you haven't counted. If the inventory step is skipped, a
consolidation project quietly carries forward every orphaned account, every
inconsistent naming convention, and every undocumented permission that
existed beforehand — it just makes them harder to find afterward, because
now they're hidden behind a federation layer instead of sitting in plain
view in two separate consoles.

So before touching the OT/SCADA boundary's access controls at all, Mara's
first deliverable is a plain inventory: what exists, where, and who owns
it.

## Hartwell's Azure AD (Entra ID) footprint

Querying the Entra ID tenant `hartwellutilities.onmicrosoft.com` through the
Microsoft Graph API — the same unified Graph surface used for security
alerts in the Python Security Automation course, here pointed at identity
objects instead of `alerts_v2` — Mara pulls back:

- **~1,400 user accounts**, a mix of employees, long-departed contractors
  whose accounts were disabled but never deleted, and a handful of shared
  "service" logins that predate any service-principal strategy.
- **~85 security groups**, many with overlapping membership and names that
  don't describe what they actually grant — `IT-Team-2`, `Ops-Access-Old`,
  `SCADA-Backup-Group` sitting next to the group that's actually in active
  use.
- **Dozens of service principals and managed identities**, registered over
  several years by different teams, several with `Owner`-equivalent Azure
  RBAC roles scoped far wider than the one task they were created for.

None of this is exotic. It's the completely ordinary result of a tenant
that's been in production for years without a lifecycle process — exactly
what the Identity Governance chapter of the Security Engineering course
calls "joiners, movers, leavers" drift, except nobody ever ran the
"leavers" step consistently.

## Hartwell's AWS IAM footprint

AWS tells a parallel story, across three separate accounts under one AWS
Organization: `Hartwell-Corp` (general corporate workloads), `Hartwell-OT-
Analytics` (the account where SCADA telemetry lands for analysis), and
`Hartwell-DevTest` (lower environments). Each account has grown its own IAM
users, groups, and roles independently, with no shared naming convention
between them. The specific pattern Mara flags as highest-risk, straight out
of the Azure & AWS Cloud Security course's warning about long-lived keys:

```python
import boto3

iam = boto3.client("iam")
paginator = iam.get_paginator("list_users")

stale_key_users = []
for page in paginator.paginate():
    for user in page["Users"]:
        keys = iam.list_access_keys(UserName=user["UserName"])["AccessKeyMetadata"]
        for key in keys:
            age_days = (key["CreateDate"].now(key["CreateDate"].tzinfo) - key["CreateDate"]).days
            if key["Status"] == "Active" and age_days > 180:
                stale_key_users.append((user["UserName"], key["AccessKeyId"], age_days))

print(f"{len(stale_key_users)} IAM users with an active access key older than 180 days")
```

Across the three accounts, this one query surfaces dozens of IAM users
still authenticating with long-lived access keys that have never been
rotated — exactly the credential type that's hardest to monitor and easiest
to leak, and exactly what IAM roles and federated identity exist to
replace.

## The finding that matters more than any single bad account

Any one orphaned Entra ID account or one stale AWS access key is a small,
fixable thing. The finding Mara writes up for the risk register (Lesson 10
formalizes this) is bigger than any of them individually: **Hartwell has no
single system of record for identity.** Someone asking "does this person
still have access to anything at Hartwell?" today has to check Entra ID
*and* three separate AWS accounts *and* trust that whatever they find is
current — and there is no automated process keeping any of those four
places in sync with each other. That gap, not any one bad account, is the
real reason the board's mandate called for a *consolidated* identity view
rather than a cleanup of either side alone.

## Key terms

| Term | Meaning |
|---|---|
| Identity sprawl | The unmanaged growth of accounts, groups, and roles across systems over time, without a consistent lifecycle process |
| System of record | The single authoritative source that's trusted to reflect the true, current state of something — here, who has access to what |
| Long-lived access key | An AWS IAM access key with no built-in expiration, as opposed to short-lived credentials issued through an assumed role |
| Service principal | A non-human Azure AD identity used by an application or automation, rather than a signed-in user |

## Lab

1. Write the Python pagination pattern for listing every AWS IAM user
   across an account, and extend it to flag any access key older than a
   given threshold, as shown in this lesson.
2. List the three separate places (Entra ID, and the three AWS accounts)
   someone would have to check today to answer "what can this person
   access at Hartwell?" and note that this list, by itself, is the finding.
3. Draft one sentence describing why consolidating identity has to follow
   inventorying it, not the other way around, for the risk register.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, what
Hartwell's Entra ID and AWS IAM footprints each look like at a high level,
and why "no single system of record" is itself the finding that justifies
the board's consolidated-identity mandate.
