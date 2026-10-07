# The IaC Tool Landscape

Terraform isn't the only Infrastructure as Code tool out there, and it's worth knowing where it sits relative to the others before committing a whole course to it. This lesson is a short survey — just enough to know why Northbridge Retail's platform team picked Terraform, and when a different tool might make more sense.

## What you'll learn

- The major categories of IaC tooling and where each one is typically used
- How Terraform compares to cloud-native tools like Azure's Bicep/ARM and AWS CloudFormation
- Where Pulumi and configuration-management tools like Ansible fit, and how they differ from Terraform
- Why a multi-cloud retailer like Northbridge Retail chose Terraform specifically

## Cloud-native, single-provider tools

Azure and AWS each ship their own first-party IaC tool: Azure has **ARM templates** and the newer, friendlier **Bicep**; AWS has **CloudFormation**. Both are declarative, both are free, and both are deeply integrated with their one cloud. That's also their limit — a Bicep file only ever talks to Azure, and a CloudFormation template only ever talks to AWS. For a single-cloud shop, that's often fine. For Northbridge Retail, which runs real workloads on both Azure and AWS, maintaining two completely separate toolchains and two completely separate skillsets was the thing they wanted to avoid.

## Terraform: one tool, many providers

```hcl
terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm" }
    aws     = { source = "hashicorp/aws" }
  }
}
```

Terraform, built by HashiCorp, is cloud-agnostic by design. The same CLI, the same HCL syntax, the same state and plan/apply workflow work against Azure, AWS, GCP, and hundreds of other providers — including non-cloud ones like GitHub, Datadog, and Kubernetes itself. For Northbridge, that meant one team, one workflow, and one set of conventions covering both of their clouds.

## Pulumi and configuration management: two different shapes

**Pulumi** is declarative like Terraform, but instead of HCL, you write the configuration in a general-purpose language — TypeScript, Python, Go, or others. That appeals to teams who want full programming-language power (loops, real functions, unit tests) in their infrastructure code, at the cost of a steeper learning curve for people without a software background.

**Ansible**, **Puppet**, and **Chef** solve a related but different problem: configuration management. They're built to install packages, edit config files, and manage the software *inside* a server that already exists, whereas Terraform's job is creating the server (and the network, and the storage account) in the first place. Many real pipelines use both — Terraform to provision the VM, Ansible to configure what runs on it.

## Why Northbridge Retail chose Terraform

Multi-cloud support, a huge ecosystem of providers and modules, and a large hiring pool of engineers who already know it made Terraform the obvious choice for a retailer running on both Azure and AWS. The rest of this course teaches it in depth — starting with its own architecture in the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| ARM / Bicep | Azure's first-party, Azure-only IaC tools |
| CloudFormation | AWS's first-party, AWS-only IaC tool |
| Pulumi | A declarative IaC tool configured in general-purpose languages instead of HCL |
| Configuration management | Managing software and settings inside an already-existing server (Ansible, Puppet, Chef) — distinct from provisioning the server itself |
