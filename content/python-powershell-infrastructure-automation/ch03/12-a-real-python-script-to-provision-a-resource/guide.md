# Lesson 12 — A Real Python Script to Provision a Resource

**Chapter 3 · Python for Cloud Automation · Lesson 12 of 32**

## What you'll learn

- A complete, real Python script that provisions an actual Azure storage account, start to finish
- Why `begin_create` returns a poller instead of the finished resource immediately, and why
  `.result()` matters
- A shorter, equivalent script using Boto3 to create an AWS S3 bucket, and the one real gotcha with
  its region argument
- How every piece from Lessons 9 through 11 — the SDK, the client pattern, the credential chain —
  comes together in one script you could actually run

## The complete script: creating an Azure storage account

```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.storage import StorageManagementClient

subscription_id = "00000000-0000-0000-0000-000000000000"
resource_group = "rg-automation-demo"
location = "eastus"
storage_account_name = "ltvdemostorage001"

credential = DefaultAzureCredential()
resource_client = ResourceManagementClient(credential, subscription_id)
storage_client = StorageManagementClient(credential, subscription_id)

resource_client.resource_groups.create_or_update(
    resource_group,
    {"location": location},
)

poller = storage_client.storage_accounts.begin_create(
    resource_group,
    storage_account_name,
    {
        "sku": {"name": "Standard_LRS"},
        "kind": "StorageV2",
        "location": location,
    },
)

storage_account = poller.result()
print(f"Created storage account: {storage_account.name}")
```

The imports exactly match Lesson 10's pattern (one client per service family) and Lesson 11's
pattern (`DefaultAzureCredential`, no secret anywhere in sight). `resource_groups.create_or_update`
is **idempotent** — the exact property Chapter 1 covered — so it's safe to rerun even if the
resource group already exists; it won't fail or duplicate anything. `begin_create` is
**asynchronous**: creating a storage account takes real time on Azure's side, so the SDK hands back
a `poller` immediately instead of blocking. Calling `.result()` is what actually waits for the
operation to finish and returns the finished `storage_account` object.

## The equivalent script: an AWS S3 bucket with Boto3

```python
import boto3
from botocore.exceptions import ClientError

region = "us-west-2"
bucket_name = "ltv-demo-automation-bucket-001"

s3_client = boto3.client("s3", region_name=region)

try:
    s3_client.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={"LocationConstraint": region},
    )
    print(f"Created bucket: {bucket_name}")
except ClientError as e:
    print(f"Error creating bucket: {e}")
```

One real gotcha: `create_bucket` requires `CreateBucketConfiguration` with `LocationConstraint` for
every AWS region **except** `us-east-1` — leaving it off in any other region raises a real error.
Wrapping the call in `try`/`except ClientError` matches Chapter 1 Lesson 4's error-handling lesson.

## What actually ran, start to finish

Both scripts follow the identical underlying shape: build credentials (Lesson 11), build a client
per service (Lesson 10), then call a method — synchronous for AWS, or via a poller for Azure — and
get back either a real object or a real, catchable error.

## Key terms

| Term | Meaning |
|---|---|
| `begin_create` | An Azure SDK method that starts a long-running operation and returns a poller immediately |
| `poller.result()` | Blocks until an Azure long-running operation finishes, then returns the finished resource |
| `create_or_update` | An idempotent Azure SDK call — safe to run again against a resource that already exists |
| `LocationConstraint` | The S3 `create_bucket` argument required for every AWS region except `us-east-1` |

## Check yourself

You're ready for Chapter 4 when you can explain, in your own words, why
`storage_client.storage_accounts.begin_create(...)` returns a poller instead of the finished storage
account directly, and what calling `.result()` on it actually does.
