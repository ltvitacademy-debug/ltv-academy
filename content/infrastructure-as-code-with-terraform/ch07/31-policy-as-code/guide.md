# Policy as Code

A pull-request reviewer can catch a lot, but asking a human to manually check every plan for "did someone accidentally make an S3 bucket public" doesn't scale, and it's easy to miss. **Policy as code** automates that check: rules written as code, run automatically against every plan, that can block an apply before it ever happens.

## What you'll learn

- What policy as code means and why it sits alongside the CI pipeline from the last lesson
- How Open Policy Agent (OPA) and its `conftest` CLI evaluate a Terraform plan against Rego rules
- A real Rego policy denying public S3 buckets
- A real Rego policy requiring every resource to carry required tags

## What policy as code checks, and when

A policy engine evaluates the machine-readable plan output — `terraform plan -out=tfplan && terraform show -json tfplan` — against a set of rules, and fails the pipeline if any rule is violated. This runs as an extra CI step, after `plan` and before `apply`, catching problems a human reviewer might not think to look for on every single pull request.

## Open Policy Agent and Rego

**Open Policy Agent (OPA)** is a general-purpose policy engine, and `conftest` is the CLI that applies it specifically to structured files like a Terraform plan's JSON. Policies are written in **Rego**, OPA's purpose-built policy language.

Here's a real Rego policy blocking any S3 bucket from being created with public read access:

```rego
package main

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_s3_bucket_acl"
  resource.change.after.acl == "public-read"
  msg := sprintf("S3 bucket %v must not use a public-read ACL", [resource.address])
}
```

And one requiring every resource to carry an `environment` tag:

```rego
package main

deny[msg] {
  resource := input.resource_changes[_]
  not resource.change.after.tags.environment
  msg := sprintf("%v is missing a required 'environment' tag", [resource.address])
}
```

Running `conftest test tfplan.json` against either policy exits non-zero — and fails the pipeline — the moment a plan would violate it.

## Sentinel: the HashiCorp-native alternative

Terraform Cloud and Enterprise ship their own policy engine, **Sentinel**, using HashiCorp's own policy language instead of Rego. The ideas are identical — rules evaluated against a plan before apply — but OPA/`conftest` works with plain open-source Terraform and any CI platform, which is why it's the more common choice for a team like Northbridge's that isn't paying for Terraform Cloud/Enterprise.

## Key terms

| Term | Meaning |
|---|---|
| Policy as code | Rules, written as code, automatically evaluated against a plan before it can apply |
| Open Policy Agent (OPA) | A general-purpose policy engine; `conftest` applies it to structured files like Terraform plan JSON |
| Rego | OPA's purpose-built policy language |
| Sentinel | HashiCorp's own policy engine, built into Terraform Cloud/Enterprise |
