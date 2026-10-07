# Script — The IaC Tool Landscape

## Segment 1 (title)

Terraform isn't the only Infrastructure as Code tool out there. This is a short survey of the landscape — enough to know why Northbridge Retail's platform team picked Terraform specifically, and when a different tool might make more sense.

## Segment 2 (steps)

Azure and AWS each ship their own first-party tool: Azure has ARM templates and Bicep, AWS has CloudFormation. Both are declarative and deeply integrated with their one cloud — but that's also the limit. A Bicep file only ever talks to Azure. For a retailer running real workloads on both clouds, that meant two separate toolchains.

## Segment 3 (code)

Terraform is cloud-agnostic by design. The same CLI, the same HCL syntax, the same plan and apply workflow work against Azure, AWS, and hundreds of other providers. For Northbridge, that meant one team and one workflow covering both of their clouds instead of two.

## Segment 4 (steps)

Pulumi is declarative too, but configured in a general-purpose language like TypeScript or Python instead of HCL. Ansible, Puppet, and Chef solve a related but different problem — configuring software inside a server that already exists, rather than creating that server in the first place. Many pipelines use both: Terraform to provision, Ansible to configure.

## Segment 5 (outro)

Multi-cloud support and a huge ecosystem made Terraform the obvious fit for Northbridge. Next up, Lesson 4: Terraform's own architecture — the pieces that actually make it work.
