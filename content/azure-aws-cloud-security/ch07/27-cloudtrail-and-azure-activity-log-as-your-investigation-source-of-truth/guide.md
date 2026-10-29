# Lesson 27 — CloudTrail and Azure Activity Log as Your Investigation Source of Truth

**Chapter 7 · Detecting and Responding to Cloud Attacks · Lesson 3 of 4**

## What you'll learn

- The exact fields inside a CloudTrail event that let you reconstruct
  who did what, from where, and with which credential
- Why CloudTrail management events, data events, and Insights each
  answer a different investigative question
- How Azure Activity Log (control-plane operations) and Azure AD
  sign-in/audit logs are two separate, complementary sources — not one
- A realistic query pattern for pivoting across both platforms during
  a live investigation

## CloudTrail: the fields that actually matter

Every CloudTrail event is a JSON record, and during an investigation
you're not reading it for prose — you're pivoting on specific fields:

```json
{
  "eventTime": "2026-03-14T09:12:41Z",
  "eventName": "AttachUserPolicy",
  "eventSource": "iam.amazonaws.com",
  "sourceIPAddress": "203.0.113.44",
  "userIdentity": {
    "type": "IAMUser",
    "arn": "arn:aws:iam::111122223333:user/svc-deploy",
    "accessKeyId": "AKIAEXAMPLEKEYID"
  },
  "requestParameters": {
    "userName": "svc-deploy",
    "policyArn": "arn:aws:iam::aws:policy/AdministratorAccess"
  }
}
```

`userIdentity.accessKeyId` is how you trace every action back to the
*specific* credential that was leaked — not just the user it belongs
to, which matters when a user has multiple keys. `sourceIPAddress`
lets you tell normal CI/CD traffic from an unfamiliar IP mid-sequence.
`eventName` and `eventSource` tell you exactly which API call fired,
and `requestParameters` / `responseElements` show you what it actually
changed — here, attaching `AdministratorAccess` to a service account
that should never need it.

## Management events, data events, and Insights

CloudTrail logs **management events** (control-plane calls like
`AttachUserPolicy`, `RunInstances`, `CreateUser`) by default, and these
cover almost everything in the privilege-escalation sequence from the
last two lessons. **Data events** (S3 object-level `GetObject`/
`PutObject`, Lambda invocations) are off by default because of volume
and cost — turn them on for buckets holding anything sensitive, because
without them you cannot prove *which* objects were actually touched
during an exfiltration. **CloudTrail Insights** adds unsupervised
anomaly detection on top, flagging unusual *volumes* of API calls
(e.g. a sudden burst of `DescribeInstances` calls) that a simple
rule-based alert would miss. For an investigation that needs to survive
scrutiny, route the trail to an S3 bucket with log file integrity
validation enabled and query it with Athena or CloudTrail Lake — both
let you run SQL across weeks of events instead of scrolling the console.

## Azure: two logs, two different questions

This is the most common mistake teams make: treating "the Azure logs"
as one thing. They're not.

- **Azure Activity Log** records control-plane operations against
  Azure Resource Manager — things like
  `Microsoft.Authorization/roleAssignments/write` or a VM being
  created or deleted. Every entry carries a `correlationId` that lets
  you chain related operations together, and a `caller` field
  identifying who made the call.
- **Azure AD sign-in logs** are a separate stream entirely, covering
  *authentication* events: who signed in, from where, whether
  Conditional Access allowed or blocked it, and the risk level Identity
  Protection assigned to that sign-in.
- **Azure AD audit logs** cover *directory* changes — new app
  registrations, new role assignments at the directory level, added
  credentials on a service principal — which is where you'd actually
  see an Application Administrator adding a secret to someone else's
  app, from the lesson before this one.

A real investigation pivots across all three: the sign-in log tells
you the identity authenticated from an unfamiliar location, the audit
log shows a new secret added to a privileged app immediately after,
and the Activity Log shows that app then being used to assign itself a
broader role. Export all of them to a Log Analytics workspace (or
Sentinel) so they're queryable together with KQL, rather than chasing
three separate blades in the portal.

## Key terms

| Term | Meaning |
|---|---|
| `userIdentity.accessKeyId` | The CloudTrail field that ties an action to the exact leaked credential used, not just the IAM user it belongs to |
| CloudTrail data events | Object/invocation-level logging (S3, Lambda) that's off by default and must be enabled to prove exactly what was touched |
| `correlationId` | The Azure Activity Log field that groups related control-plane operations together into one logical action |
| Azure AD audit log | The separate log stream covering directory changes — new app registrations, added service principal credentials, directory role assignments |

## Check yourself

You're ready for Lesson 28 when you can explain why `userIdentity.accessKeyId`
matters more than the username alone, and why an Azure investigation
needs the Activity Log, sign-in logs, and audit logs together rather
than any one of them alone.
