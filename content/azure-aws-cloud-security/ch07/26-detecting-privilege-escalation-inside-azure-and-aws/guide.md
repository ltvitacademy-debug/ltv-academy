# Lesson 26 — Detecting Privilege Escalation Inside Azure and AWS

**Chapter 7 · Detecting and Responding to Cloud Attacks · Lesson 2 of 4**

## What you'll learn

- The specific, catalogued AWS IAM permission combinations attackers
  use to escalate from a low-privilege credential to administrator
- The Azure equivalents — role assignment abuse and application
  administrator credential theft — and why they follow the same logic
- What a privilege-escalation attempt actually looks like in CloudTrail
  and in Microsoft Graph / Azure AD sign-in activity
- Which managed detections (GuardDuty, Microsoft Defender for Cloud,
  Identity Protection) are built specifically to catch this

## AWS: the documented IAM privilege-escalation patterns

Security researchers — most visibly Rhino Security Labs' widely cited
catalog of AWS privilege-escalation methods — have mapped out roughly
twenty specific IAM permission combinations that let a low-privilege
identity grant itself more access. They share a common shape: the
identity doesn't have `AdministratorAccess`, but it has just enough
permissions to create or attach a policy, or to hand its own role to
something more powerful. A few of the most common:

- **`iam:CreatePolicyVersion`** — lets the holder set a *new* default
  version of a policy they're allowed to edit, effectively rewriting
  their own permissions to anything they want.
- **`iam:PassRole` + `ec2:RunInstances`** — launch an EC2 instance and
  attach an instance profile tied to a far more privileged role. Code
  running on that instance can then call the metadata service and
  inherit that role's permissions.
- **`iam:PassRole` + `lambda:CreateFunction` + `lambda:InvokeFunction`**
  — the same idea, but the privileged role is attached to a Lambda
  function instead of an EC2 instance.
- **`iam:AddUserToGroup`** — if the identity can add itself to a group
  that already has broad permissions attached, it inherits them
  instantly.
- **An overly permissive `sts:AssumeRole` trust policy** — a role meant
  for one narrow purpose that trusts a principal far more broadly than
  intended lets anyone holding that principal assume it.

```
# the shape that should raise an eyebrow in a policy review:
{
  "Effect": "Allow",
  "Action": ["iam:PassRole", "ec2:RunInstances"],
  "Resource": "*"
}
# PassRole + RunInstances together, scoped to "*", is a textbook
# privilege-escalation primitive — not inherently malicious, but it
# needs a documented reason to exist.
```

## Azure: role assignment and application administrator abuse

Azure's escalation paths follow the same underlying logic — find a
permission that lets you grant yourself more permission:

- **`Microsoft.Authorization/roleAssignments/write`** is the single
  action that actually grants a role. The built-in **Owner** and
  **User Access Administrator** roles both include it. An identity
  holding either can assign itself (or anything it controls) any
  other role, including Owner on a broader scope.
- **Application Administrator** (an Azure AD directory role) can reset
  credentials and add new client secrets on *existing* app
  registrations and service principals — including ones that were
  granted high-privilege Microsoft Graph permissions by someone else.
  This is a well-documented escalation path: compromise an Application
  Administrator, add a secret to a privileged service principal you
  didn't create, and authenticate as it.
- **PIM eligible roles activated without the expected approval step**
  — if an eligible assignment is misconfigured to not require
  approval or MFA, activation becomes a silent escalation.

## What the detection actually looks for

Both GuardDuty and Microsoft Defender for Cloud ship finding types
built specifically for this. In AWS, watch for GuardDuty findings like
`PrivilegeEscalation:IAMUser/AdministrativePermissions` and
`UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration`, and in raw
CloudTrail, alert on `CreatePolicyVersion`, `SetDefaultPolicyVersion`,
`AttachUserPolicy`, `PutUserPolicy`, and `AddUserToGroup` events —
especially when the calling identity doesn't normally make IAM calls
at all. In Azure, Microsoft Defender for Cloud flags anomalous role
assignment activity, and Azure AD Identity Protection's risk
detections (impossible travel, unfamiliar sign-in properties, leaked
credential matches) often fire *before* the escalation attempt, since
the attacker had to authenticate as the compromised identity first.

## Key terms

| Term | Meaning |
|---|---|
| Privilege-escalation primitive | A specific IAM/RBAC permission combination (e.g. `iam:PassRole` + `ec2:RunInstances`) that lets an identity grant itself more access than it started with |
| `roleAssignments/write` | The single Azure control-plane action that actually grants a role — held by both Owner and User Access Administrator |
| Application Administrator | An Azure AD directory role that can add credentials to existing app registrations/service principals, including ones it didn't create |
| GuardDuty finding type | A named, categorized detection (e.g. `PrivilegeEscalation:IAMUser/AdministrativePermissions`) that AWS's managed threat detection service raises automatically |

## Check yourself

You're ready for Lesson 27 when you can name at least two specific
AWS IAM permission combinations that enable privilege escalation, and
explain why `Microsoft.Authorization/roleAssignments/write` is the one
Azure action every escalation path ultimately depends on.
