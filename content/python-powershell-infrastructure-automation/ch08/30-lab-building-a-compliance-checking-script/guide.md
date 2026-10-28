# Lesson 30 — Lab: Building a Compliance-Checking Script

**Chapter 8 · Capstone: An Automated Operations Toolkit · Lesson 30 of 32**

## What you'll learn

- How to build a real tag-compliance script in Python, pulling together the Azure SDK
  authentication pattern from Chapter 3 with the tag-compliance use case from Chapter 6
- Why this script is read-only and reports violations instead of silently fixing them
- How the script's exit code is what turns a report into something a CI/CD pipeline can act on,
  the exact pattern Chapter 7 built this course toward
- Why writing a report to a file instead of just printing to the console is what makes this
  script useful to a pipeline and not just to a person watching a terminal

## The scenario: tags that pay for the mistakes of Lesson 29

Lesson 29's cost-savings script only works because every VM that should be on the shutdown
schedule is correctly tagged `AutoShutdown = true`. Thornfield Analytics' finance team has a
second, broader requirement: every resource in the subscription — not just VMs — needs a
`CostCenter` tag and an `Owner` tag, so spend can be charged back and someone is accountable
for every resource that exists. This lesson builds the script that checks that, written in
Python this time, using the authentication pattern Chapter 3 taught for connecting a script to
Azure without hardcoding a credential.

## Step one: connecting with the Chapter 3 authentication pattern

Chapter 3 covered authenticating Python scripts to Azure using `DefaultAzureCredential`, which
tries several credential sources in order — environment variables, a managed identity, the
logged-in Azure CLI session — without the script ever needing to know or store a secret
itself:

```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient

credential = DefaultAzureCredential()
client = ResourceManagementClient(credential, subscription_id=SUBSCRIPTION_ID)
```

That's the same reason this pattern matters so much once Chapter 7 enters the picture: when
this script eventually runs inside a pipeline instead of on someone's laptop, `DefaultAzureCredential`
picks up the pipeline's service principal automatically, with zero code changes.

## Step two: the actual compliance check

The core logic lists every resource in the subscription and checks each one's tags against the
required list:

```python
REQUIRED_TAGS = ["CostCenter", "Owner"]
violations = []

for resource in client.resources.list():
    tags = resource.tags or {}
    missing = [t for t in REQUIRED_TAGS if t not in tags]
    if missing:
        violations.append({
            "resource": resource.name,
            "type": resource.type,
            "missing_tags": ", ".join(missing),
        })
```

Notice this script never changes anything — it only reads. That's a deliberate choice, not a
limitation: a script that discovers a missing tag and silently adds a guessed value would be
worse than the problem it's solving, because nobody would know which tags were real and which
were invented by a script covering for a human's mistake. Reporting violations and letting a
person or a follow-up ticket fix them is the correct scope for this kind of check.

## Step three: a report a pipeline can act on

A list printed to a console disappears the moment the terminal closes. This script writes its
findings to a CSV file instead, and — critically — exits with a non-zero status code if it
found any violations at all:

```python
import csv, sys

with open("tag-violations.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["resource", "type", "missing_tags"])
    writer.writeheader()
    writer.writerows(violations)

print(f"{len(violations)} resources missing required tags.")
sys.exit(1 if violations else 0)
```

That `sys.exit(1 if violations else 0)` line is the entire reason Chapter 7 matters to this
script. A pipeline step doesn't read English output — it reads an exit code. Exit code `0`
means the step succeeds and the pipeline moves on; any non-zero code means the step fails, and
depending on how the pipeline is configured, that failure can block a deployment or just surface
as a visible red check that someone has to look at before they ignore it. The CSV file becomes
a build artifact the pipeline keeps, so whoever responds to the failure has the exact list of
offending resources in front of them, not just a number.

## Why this is scheduled, not run on demand

Like Lesson 29's script, this one is only useful if it runs every night without anyone
remembering to kick it off. Chapter 7's lesson on running a script from a pipeline, not a
laptop, is exactly the deployment model this script is written for: a scheduled pipeline
trigger runs it nightly, the pipeline's own secret store supplies the service principal
credential — never a secret typed into the script or committed to source control — and the
script's own exit code decides, every single night, whether the subscription is in a clean
state or not.

## Key terms

| Term | Meaning |
|---|---|
| `DefaultAzureCredential` | An Azure SDK credential class that tries multiple credential sources automatically, without a hardcoded secret |
| Tag compliance | Verifying that resources carry the tags an organization requires, such as cost center or ownership |
| Exit code | A number a script returns on completion; 0 means success, non-zero means a pipeline step should be treated as failed |
| Build artifact | A file a pipeline run produces and retains, such as this script's violations report |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does this script report
violations instead of fixing them automatically, and what specifically does `sys.exit(1 if
violations else 0)` make possible that a printed message alone would not?
