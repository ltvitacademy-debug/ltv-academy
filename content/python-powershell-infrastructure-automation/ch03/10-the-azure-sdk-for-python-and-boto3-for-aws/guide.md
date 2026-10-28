# Lesson 10 — The Azure SDK for Python and Boto3 for AWS

**Chapter 3 · Python for Cloud Automation · Lesson 10 of 32**

## What you'll learn

- The real package names behind "the Azure SDK for Python," and why it's split into many small
  packages instead of one big one
- Boto3, AWS's single official SDK package, and its two interfaces: client and resource
- The shared client-object pattern both SDKs use once you're past the import line
- How to read real Azure SDK and Boto3 code on sight, even code you've never seen before

## The Azure SDK for Python is many packages, not one

There's no single `azure` package that does everything. The Azure SDK for Python is split into a
family of packages, one per service area: `azure-identity` handles authentication (Lesson 11),
`azure-mgmt-compute` handles virtual machines, `azure-mgmt-storage` handles storage accounts,
`azure-mgmt-network` handles networking, and `azure-mgmt-resource` handles resource groups. Every
single one of these `azure-mgmt-*` packages follows the exact same shape:

```python
from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient

credential = DefaultAzureCredential()
compute_client = ComputeManagementClient(credential, subscription_id)
```

Build a `*Client` object from a credential and a subscription ID, then call methods on it grouped
by resource type — `compute_client.virtual_machines.*`, or in Lesson 12, `storage_client.storage_accounts.*`.

## Using an Azure client: listing virtual machines

Once that client object exists, using it reads almost like plain English:

```python
for vm in compute_client.virtual_machines.list_all():
    print(vm.name, vm.location)
```

`list_all()` returns real virtual machine objects, not raw JSON you'd have to parse by hand — each
one already converted into a proper Python object with a usable `.name`, `.location`, and every
other property the Azure REST API exposes.

## Boto3: one package, two interfaces

AWS takes a different approach. **Boto3** ships as a single package covering nearly every AWS
service, with two ways to talk to it. `boto3.client()` is the low-level interface, mirroring the
AWS API call-for-call — `describe_instances`, `create_bucket`, named exactly as AWS names them.
`boto3.resource()` is a higher-level, more Pythonic interface available for a subset of services,
letting you write cleaner code for the services that support it:

```python
import boto3

ec2_client = boto3.client("ec2", region_name="us-east-1")
response = ec2_client.describe_instances()

s3_resource = boto3.resource("s3")
for bucket in s3_resource.buckets.all():
    print(bucket.name)
```

## The pattern underneath both

Strip away the package names, and both SDKs reduce to the same three moves: import the package,
build a client (or resource) using real credentials, then call a method and get structured data
back. Azure hands you typed objects; Boto3's client calls hand you nested dictionaries shaped
exactly like the AWS API's own JSON responses.

## Key terms

| Term | Meaning |
|---|---|
| `azure-mgmt-*` | Family of Azure SDK packages, one per service area (compute, storage, network, resource) |
| `azure-identity` | The Azure SDK package handling authentication, covered in Lesson 11 |
| `boto3.client()` | Low-level AWS interface, mirrors the AWS API call-for-call |
| `boto3.resource()` | Higher-level, more Pythonic AWS interface, available for a subset of services |

## Check yourself

You're ready for Lesson 11 when you can explain the real difference between `boto3.client()` and
`boto3.resource()`, and why the Azure SDK is split into many `azure-mgmt-*` packages instead of one
single package.
