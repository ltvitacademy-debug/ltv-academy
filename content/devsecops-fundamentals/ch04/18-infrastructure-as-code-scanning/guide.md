# Infrastructure as Code Scanning

Every scan so far has looked at application code or its dependencies. But at Northbridge Retail, the storage account holding product images, the network rules around the checkout database, and the permissions on a deployment identity are all defined in Terraform, not application code. Infrastructure as Code (IaC) scanning applies the same shift-left idea to that infrastructure: find the misconfiguration in the `.tf` file, before `terraform apply` ever touches a real cloud resource.

## What you'll learn

- Why infrastructure misconfigurations deserve their own scan, separate from application code and dependency scanning
- What a real finding from a tool like Checkov looks like, and how to read it
- A concrete misconfiguration pattern: a storage resource left open to public access
- Why IaC scanning catches a class of risk that SAST and SCA structurally cannot

## Why infrastructure needs its own scanner

A storage account with public read access enabled, a security group open to `0.0.0.0/0` on a sensitive port, a database provisioned without encryption at rest — none of these are bugs in application logic, and none of them are vulnerable dependencies. They're configuration decisions baked directly into Terraform, ARM templates, Bicep, or Kubernetes manifests. SAST and SCA have nothing to say about either, because neither one reads infrastructure definitions. Tools built specifically for this — **Checkov**, **tfsec**, **Terrascan** — parse the IaC file itself and check it against a library of known-bad configuration patterns.

## A real finding, read line by line

Suppose a Northbridge Retail engineer writes a Terraform resource for a storage account to hold product catalog images, and forgets to restrict public access. A Checkov scan in the CI pipeline produces a finding like this:

```
Check: CKV_AZURE_59: "Ensure that Storage accounts disallow public access"
    FAILED for resource: azurerm_storage_account.product_images
    File: /modules/storage/main.tf:12-24
    Guide: https://docs.prismacloud.io/en/enterprise-edition/policy-reference
```

Each piece matters: the check ID (`CKV_AZURE_59`) identifies exactly which rule failed, the resource name pinpoints which block in a large Terraform module caused it, the file and line range let a developer jump straight to the problem, and the guide link explains the fix and why the rule exists.

## Why this has to run before `apply`, not after

Finding this in a running environment means the storage account was already public for however long it took someone to notice — exactly the "caught in production" scenario from Lesson 1's cost-of-a-flaw story. Running Checkov in the CI pipeline, against the plan rather than the live infrastructure, means the pull request itself fails before anyone merges, let alone applies. The fix is as cheap as it gets: add one line restricting public network access, push again, and the check passes.

## Key terms

- **IaC scanning** — analyzing infrastructure-as-code files (Terraform, ARM, Bicep, Kubernetes manifests) for known misconfiguration patterns before deployment
- **Checkov** — an open-source static analysis tool for infrastructure as code, used across Terraform, CloudFormation, Kubernetes, and more
- **Misconfiguration** — an infrastructure setting (like public access or missing encryption) that creates risk without being a code bug or a vulnerable dependency
- **Plan-time scanning** — checking IaC before `apply`, so a misconfigured resource is never actually provisioned
