# Lesson 8 — Writing the Python Enrichment Automation

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 8 of 26**

## What you'll learn

- Why "who has access" has to be checked two different ways on each cloud,
  not one
- The real Microsoft Graph and AWS IAM calls that check group membership
  *and* direct, individually-assigned access separately
- The exact output schema this script produces, including the
  `access_path` field that later becomes the whole reason this capstone's
  central discrepancy exists
- How the enriched inventory lands inside Microsoft Sentinel as a queryable
  custom log table

## Why one query isn't enough

A naive version of this script would do exactly one thing: list the members
of the `SCADA-OT-Admins` Entra ID group and the `scada-ot-admins` AWS IAM
group, call it done, and call that "who has SCADA access." Mara doesn't
write that script, for a specific reason tied to how Hartwell's break-glass
emergency-access procedure actually works.

During a past incident, Hartwell's break-glass procedure granted a handful
of accounts **direct, individually-assigned admin access** to the OT/SCADA
boundary — an Azure RBAC role assigned straight to a user, or an AWS IAM
policy attached straight to a user, bypassing the groups entirely, because
break-glass access is meant to be fast and temporary. Some of that access
was never formally revoked afterward. **A script that only checks group
membership will never see those accounts at all** — they were never in the
group to begin with. That's the exact gap this script is built to close,
and it's the mechanism this capstone returns to starting in Lesson 11.

So the script checks both paths, on both clouds, separately, and unions the
results.

## Querying Entra ID group membership

Using the same MSAL client-credentials pattern from the Python Security
Automation course, but pointed at the directory instead of alerts:

```python
import requests

def get_group_members(access_token, group_id):
    url = f"https://graph.microsoft.com/v1.0/groups/{group_id}/members"
    headers = {"Authorization": f"Bearer {access_token}"}
    members = []
    while url:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        page = resp.json()
        members.extend(page.get("value", []))
        url = page.get("@odata.nextLink")
    return members

SCADA_OT_ADMINS_GROUP_ID = "9f3c2e40-7a11-4b8e-9d2a-1234567890ab"
group_members = get_group_members(access_token, SCADA_OT_ADMINS_GROUP_ID)
```

## Querying Entra ID direct role assignments — the gap group membership misses

Group membership alone misses anyone granted the `SCADA Operator` Azure
RBAC role **directly**, scoped to the `rg-hartwell-scada-prod` resource
group, without ever being added to `SCADA-OT-Admins`. That's a separate
Azure Resource Manager call, filtered by scope and role definition:

```python
def get_direct_role_assignments(access_token, scope, role_definition_id):
    url = (
        f"https://management.azure.com/{scope}/providers/Microsoft.Authorization"
        f"/roleAssignments?api-version=2022-04-01"
        f"&$filter=atScope()"
    )
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.get(url, headers=headers, timeout=30)
    resp.raise_for_status()
    assignments = resp.json().get("value", [])
    # Keep only direct assignments to a user principal for this specific role —
    # assignments whose principal is the group itself are already covered above.
    return [
        a for a in assignments
        if a["properties"]["roleDefinitionId"].endswith(role_definition_id)
        and a["properties"]["principalType"] == "User"
    ]

SCOPE = "/subscriptions/<sub-id>/resourceGroups/rg-hartwell-scada-prod"
SCADA_OPERATOR_ROLE_ID = "4ef4b0e1-...-scada-operator"
direct_assignments = get_direct_role_assignments(access_token, SCOPE, SCADA_OPERATOR_ROLE_ID)
```

## Querying AWS: group membership and direct policy attachment, separately

The same split applies on the AWS side — `scada-ot-admins` group membership
is one call, and users with the `SCADA-Emergency-Access` policy attached
**directly to the user** (not via the group) is a different call entirely:

```python
import boto3

iam = boto3.client("iam")

def get_group_membership(group_name):
    return iam.get_group(GroupName=group_name)["Users"]

def get_direct_policy_attachments(policy_arn):
    paginator = iam.get_paginator("list_entities_for_policy")
    direct_users = []
    for page in paginator.paginate(PolicyArn=policy_arn, EntityFilter="User"):
        direct_users.extend(page["PolicyUsers"])
    return direct_users

group_members_aws = get_group_membership("scada-ot-admins")
SCADA_EMERGENCY_POLICY_ARN = "arn:aws:iam::222233334444:policy/SCADA-Emergency-Access"
direct_users_aws = get_direct_policy_attachments(SCADA_EMERGENCY_POLICY_ARN)
```

`list_entities_for_policy` with `EntityFilter="User"` returns exactly the
users this policy is attached to directly — it does **not** include users
who only have it through group membership, which is precisely why this
call has to run separately from `get_group`, not be inferred from it.

## The output schema

Every account from every path above gets normalized into one record shape.
This exact schema is what the rest of this capstone — the compliance audit
comparison, the SIEM discrepancy, the reconciliation — depends on matching
against later:

```python
record = {
    "account_id": "...",            # Entra object id, or AWS IAM user ARN
    "display_name": "...",
    "source_system": "entra_id",    # or "aws_iam"
    "scada_scope": "rg-hartwell-scada-prod",   # or "vpc-hartwell-scada"
    "access_path": "group_membership",         # or "direct_assignment"
    "group_or_role_name": "SCADA-OT-Admins",   # or "SCADA Operator (direct RBAC)",
                                                # "scada-ot-admins",
                                                # "SCADA-Emergency-Access (direct policy)"
    "granted_utc": "2026-10-28T00:00:00Z",
    "break_glass_ticket_id": None,  # e.g. "INC-48213" if traceable to a break-glass event
    "last_reviewed_utc": None,
}
```

The script computes the **union** of every account found across all four
queries (Entra group, Entra direct, AWS group, AWS direct) as
`total_unique_accounts_with_scada_access`, plus a breakdown:
`count_group_membership_only`, `count_direct_assignment_only`, and
`count_both_paths`. `count_direct_assignment_only` is, specifically, the
population a group-membership-only review will never see.

## Where the inventory lands: a Sentinel custom log

The normalized records are posted into Microsoft Sentinel's underlying Log
Analytics workspace via the Logs Ingestion API, into a custom table named
**`ScadaAccessInventory_CL`** — the `_CL` suffix is Azure Monitor's
standard marker for a custom log table. That's what makes this a *SIEM-
based* account inventory, not just a local script output: once ingested,
any Sentinel analyst — or Mara, or anyone auditing the OT/SCADA boundary
later — can query current standing access with a KQL query against
`ScadaAccessInventory_CL`, instead of re-running four separate API calls by
hand.

## Key terms

| Term | Meaning |
|---|---|
| `access_path` | This script's field distinguishing access granted through group membership from access granted directly to an individual |
| Break-glass access | Emergency, individually-granted access meant to be temporary, used when normal group-based provisioning is too slow for an active incident |
| `list_entities_for_policy` | The AWS IAM API call returning exactly which users/roles a given policy is attached to directly |
| `ScadaAccessInventory_CL` | The custom Log Analytics table this script writes into, queryable from Sentinel |

## Lab

1. Write out the four separate queries this script runs (Entra group,
   Entra direct, AWS group, AWS direct) and explain in one sentence each
   why no one of them can substitute for another.
2. Write the output record schema from memory, including the
   `access_path` field and its two possible values.
3. Explain why `count_direct_assignment_only` is the specific number that
   matters most to everything that happens later in this capstone.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking, why this
script checks group membership and direct assignment as two separate
queries on each cloud, and you can state the output schema's field names
from memory.
