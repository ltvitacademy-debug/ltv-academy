# Lesson 3 — Scripting Against AWS Security Hub and GuardDuty with Python

**Chapter 2 · Automating with Security APIs · Lesson 3 of 4**

## What you'll learn

- The **AWS Security Finding Format (ASFF)** that Security Hub normalizes
  findings into, and the fields you'll actually use for automation
- How to call `get_findings` with filters and a paginator using `boto3`
- How GuardDuty's two-step finding retrieval (`list_findings` then
  `get_findings`) differs from Security Hub's single-call model
- How these AWS calls mirror the authenticate-query-paginate pattern you
  just used against Microsoft Graph and Sentinel, with different
  credentials and a different schema underneath

## ASFF: AWS's version of a unified schema

Security Hub aggregates findings from GuardDuty, Inspector, Macie, and
third-party tools into one normalized structure: the **AWS Security
Finding Format**. Every finding, regardless of source, carries the same
backbone of fields:

- `SchemaVersion`, `Id`, `ProductArn`, `GeneratorId`, `AwsAccountId`
- `Types` — a list of finding-type strings, e.g.
  `"TTPs/Initial Access/UnauthorizedAccess:EC2-SSHBruteForce"`
- `CreatedAt`, `UpdatedAt`
- `Severity` — with `Label` (`INFORMATIONAL` through `CRITICAL`) and
  `Normalized` (a 0–100 score)
- `Resources[]` — the AWS resources involved, each with a `Type`, `Id`, and
  `Region`
- `Workflow.Status` and `RecordState` — whether the finding is active and
  where it sits in triage (`NEW`, `NOTIFIED`, `RESOLVED`)

That consistent backbone is exactly what let you write *one* correlation
function later in this chapter instead of one per finding source — the
same reason the Graph Security API's unified schema mattered in Lesson 1.

## Querying Security Hub with `boto3`

`get_findings` accepts a `Filters` dict matching ASFF field names, and like
every paginated AWS API, you reach for a paginator instead of hand-rolling
a `NextToken` loop:

```python
import boto3

securityhub = boto3.client("securityhub", region_name="us-east-1")

paginator = securityhub.get_paginator("get_findings")
findings = []
for page in paginator.paginate(
    Filters={
        "SeverityLabel": [{"Value": "HIGH", "Comparison": "EQUALS"}],
        "RecordState": [{"Value": "ACTIVE", "Comparison": "EQUALS"}],
        "WorkflowStatus": [{"Value": "NEW", "Comparison": "EQUALS"}],
    }
):
    findings.extend(page["Findings"])

print(f"Pulled {len(findings)} active, new, HIGH-severity findings")
```

`boto3`'s paginators exist for exactly this reason: every paginated AWS API
has its own token field name and shape, and the paginator abstracts that
away so you write the same `for page in paginator.paginate(...)` loop
everywhere, regardless of which service you're calling.

## GuardDuty's two-step model

GuardDuty findings also use ASFF, but retrieval is a two-call pattern
instead of one: `list_findings` returns only finding **IDs** matching a
criteria filter, and `get_findings` fetches the full finding objects for a
batch of those IDs.

```python
guardduty = boto3.client("guardduty", region_name="us-east-1")

detector_id = guardduty.list_detectors()["DetectorIds"][0]

finding_ids = guardduty.list_findings(
    DetectorId=detector_id,
    FindingCriteria={"Criterion": {"severity": {"Gte": 7}}},
)["FindingIds"]

if finding_ids:
    details = guardduty.get_findings(
        DetectorId=detector_id, FindingIds=finding_ids
    )
    for finding in details["Findings"]:
        resource = finding.get("Resource", {})
        print(finding["Type"], finding["Severity"], resource.get("ResourceType"))
```

Every GuardDuty call needs a `DetectorId` first — a region can have at
most one GuardDuty detector, so `list_detectors()["DetectorIds"][0]` is a
safe way to grab it in a single-detector-per-region account. `severity.Gte`
in `FindingCriteria` filters on GuardDuty's own 0.1–8.9 severity scale,
which is a different numeric range than ASFF's `Normalized` score — worth
remembering once you start comparing severities across sources.

## Key terms

| Term | Meaning |
|---|---|
| ASFF | AWS Security Finding Format — the normalized schema Security Hub returns findings in, from any source |
| `Severity.Label` / `Severity.Normalized` | ASFF's text label (`HIGH`, `CRITICAL`) and 0–100 numeric severity score |
| Paginator | `boto3`'s abstraction over an AWS API's token-based pagination, exposed the same way across services |
| `FindingCriteria` | The filter object GuardDuty's `list_findings` accepts, distinct from Security Hub's `Filters` dict shape |

## Check yourself

You're ready for Lesson 4 when you can explain why GuardDuty findings
require two calls (`list_findings` then `get_findings`) while Security Hub
findings only require one (`get_findings`), and you can name three ASFF
fields you'd pull out of a finding to compare it against a Sentinel
incident.
