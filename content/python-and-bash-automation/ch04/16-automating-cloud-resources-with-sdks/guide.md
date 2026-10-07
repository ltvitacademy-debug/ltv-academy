# Automating Cloud Resources With SDKs

Northbridge Retail's cloud bill keeps creeping up, and a lot of it is waste: EBS volumes left behind after an EC2 instance was terminated, old snapshots nobody deletes, temporary files sitting in S3 for months. You *could* clean this up by calling AWS's raw REST APIs with `requests` and hand-rolling the authentication — but AWS, like every major cloud provider, ships an official SDK that does the hard parts for you. This lesson uses `boto3`, the AWS SDK for Python, to find and clean up exactly that kind of waste.

## What you'll learn

- Why a cloud SDK is almost always a better choice than calling the provider's REST API directly
- How to list resources with a `boto3` client and filter them
- How to use a paginator to walk large result sets safely
- How to tag and delete resources once you've identified them as unused

## Why an SDK instead of raw REST calls

Everything you'd need to do by hand with `requests` — signing each request with AWS's authentication scheme, retrying on throttling, following pagination tokens, resolving credentials from the right place — `boto3` already does for you:

- **Authentication is handled.** `boto3` automatically finds credentials from environment variables, a shared credentials file, or an IAM role attached to the machine running the script — no manual signing.
- **Retries are built in.** Throttled or transient failures get retried with backoff automatically.
- **Pagination has a standard helper.** Every list-style API gets a paginator instead of you writing a custom "follow the next token" loop for each one.

```python
import boto3

ec2 = boto3.client("ec2", region_name="us-east-1")
```

That one line is already authenticated, assuming AWS credentials exist somewhere `boto3` knows to look.

## Listing unattached EBS volumes

An EBS volume that's `available` (not `in-use`) is attached to nothing and billing Northbridge for storage no instance is using:

```python
response = ec2.describe_volumes(
    Filters=[{"Name": "status", "Values": ["available"]}]
)

for volume in response["Volumes"]:
    print(volume["VolumeId"], volume["Size"], volume["CreateTime"])
```

`Filters` is the `boto3` equivalent of a query parameter — it asks AWS to do the filtering server-side instead of downloading everything and filtering in Python.

## Paginating large result sets

`describe_volumes` happens to return everything in one call for most accounts, but many AWS list operations — like `describe_snapshots` — don't. Rather than writing your own "follow the token" loop like you did for the carrier API in lesson 14, `boto3` gives you a paginator:

```python
paginator = ec2.get_paginator("describe_snapshots")

for page in paginator.paginate(OwnerIds=["self"]):
    for snapshot in page["Snapshots"]:
        print(snapshot["SnapshotId"], snapshot["VolumeSize"], snapshot["StartTime"])
```

The paginator handles every provider-specific pagination token internally — you just loop over pages.

## Tagging and cleaning up

Before deleting anything, it's safer to tag a resource and review the tag — then delete only what's confirmed stale, past an age threshold:

```python
from datetime import datetime, timedelta, timezone

cutoff = datetime.now(timezone.utc) - timedelta(days=30)

for volume in response["Volumes"]:
    if volume["CreateTime"] < cutoff:
        ec2.create_tags(
            Resources=[volume["VolumeId"]],
            Tags=[{"Key": "northbridge:status", "Value": "pending-deletion"}],
        )
        print(f"Tagged {volume['VolumeId']} (idle since {volume['CreateTime']})")
```

Once Northbridge's infrastructure team has reviewed the tagged volumes, a second pass actually removes them:

```python
ec2.delete_volume(VolumeId=volume["VolumeId"])
```

The same shape applies to S3 cleanup — list objects with a paginator, filter by `LastModified`, then delete:

```python
s3 = boto3.client("s3")
paginator = s3.get_paginator("list_objects_v2")

for page in paginator.paginate(Bucket="northbridge-order-exports", Prefix="tmp/"):
    for obj in page.get("Contents", []):
        if obj["LastModified"] < cutoff:
            s3.delete_object(Bucket="northbridge-order-exports", Key=obj["Key"])
```

## Key terms

| Term | Meaning |
|---|---|
| `boto3` | The official AWS SDK for Python |
| Client | An SDK object scoped to one AWS service, e.g. `boto3.client("ec2")` |
| Paginator | A `boto3` helper that walks every page of a large result set automatically |
| Filter | A server-side condition passed to a `describe_*` call to narrow results before they're returned |

## Recap

An SDK like `boto3` handles authentication, retries, and pagination so you don't hand-roll them against raw REST endpoints. List resources with a filtered `describe_*` call or a paginator, tag what looks unused for review, and only then delete it. Next up, lesson 17: reacting to events pushed *to* you, instead of always pulling data yourself.
