# Lesson 19 — AWS CloudFormation: A First Look

**Chapter 5 · Infrastructure as Code Previews · Lesson 19 of 32**

## What you'll learn

- What AWS CloudFormation is, and how it's AWS's direct answer to
  ARM/Bicep — a native, AWS-only declarative service
- What a CloudFormation **stack** is, and why it's the unit everything
  gets managed as
- How to read a simple CloudFormation template written in YAML
- How CloudFormation's own drift detection compares to the `az
  deployment group what-if` command from Lesson 17

## CloudFormation: AWS's native IaC service

Just as Azure Resource Manager underlies every Azure resource you've
created in this course, **AWS CloudFormation** is AWS's own native
Infrastructure as Code service — built into the platform, not a
third-party add-on. You write a **template** describing the AWS
resources you want, in either YAML or JSON, and submit it to
CloudFormation, which figures out what to create, update, or leave
alone.

CloudFormation groups everything a template declares into a **stack**
— a single named unit you create, update, or delete as a whole. Delete
the stack, and CloudFormation tears down every resource it created for
you, in the right order, without you having to remember what you
built six months ago. That's a real advantage over a Chapter 3 Boto3
script: the script that created an S3 bucket has no built-in concept
of "everything this script is responsible for," so cleaning up means
remembering, or re-reading, what it did.

## A real CloudFormation template

```yaml
Resources:
  LtvDemoBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: ltv-cloudformation-demo
      VersioningConfiguration:
        Status: Enabled
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
```

`Resources` is the required top-level section — every CloudFormation
template needs at least one. `AWS::S3::Bucket` is the **resource
type**, a fixed identifier CloudFormation recognizes, the same way
Bicep's `Microsoft.Storage/storageAccounts` identifies a resource type
to ARM. Everything under `Properties` configures that specific bucket
— a name, versioning turned on, and public access explicitly blocked.

Compare this to the imperative version from Chapter 3:

```python
import boto3
s3 = boto3.client("s3")
s3.create_bucket(Bucket="ltv-cloudformation-demo")
s3.put_bucket_versioning(
    Bucket="ltv-cloudformation-demo",
    VersioningConfiguration={"Status": "Enabled"},
)
```

The Boto3 script runs two separate API calls, in order, and has no
memory of having done so. The CloudFormation template declares both
settings as one desired end state for one bucket, inside one stack.

## Deploying and checking a stack

```
aws cloudformation deploy \
  --template-file bucket.yaml \
  --stack-name ltv-demo-stack
```

`aws cloudformation deploy` creates the stack if it doesn't exist, or
updates it if it does — the same create-or-update behavior you saw
from `az deployment group create` in Lesson 18. And CloudFormation has
its own real, built-in drift check:

```
aws cloudformation detect-stack-drift --stack-name ltv-demo-stack
```

This compares every resource in the stack against its last-known
deployed configuration and reports anything that's changed outside of
CloudFormation — a manually edited bucket policy, for instance. It's
the same capability Lesson 17 introduced conceptually and Lesson 18
showed on Azure's side; AWS just names its version `detect-stack-drift`
instead of `what-if`.

## Key terms

| Term | Meaning |
|---|---|
| AWS CloudFormation | AWS's native Infrastructure as Code service; templates in YAML or JSON |
| Stack | A named, deployable unit — every resource a CloudFormation template declares, managed together |
| Resource type | A fixed identifier (e.g. `AWS::S3::Bucket`) CloudFormation uses to know what kind of resource to create |
| aws cloudformation detect-stack-drift | AWS's built-in command to check whether a stack's live resources still match its declared template |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what
is a CloudFormation stack, and why does deleting a stack handle
cleanup more reliably than remembering what a Boto3 script created?
