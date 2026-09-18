# Lesson 2 — Terraform vs. Bicep

**Chapter 1 · Infrastructure as Code Fundamentals · Lesson 2 of 22**

## What you'll learn

- What Terraform is, and why HashiCorp built it to be cloud-agnostic
- What Bicep is, and why Microsoft built it to be Azure-only on purpose
- The real trade-offs: state file management, syntax, tooling integration
- Why this course teaches both instead of picking a side

## Two tools, the same declarative idea

Lesson 1 established that infrastructure as code means describing the
end state you want in a text file instead of clicking through a
console. Terraform and Bicep are both declarative IaC tools — but
they made different bets about scope, and those bets matter for a
data engineer choosing between them on a real team.

## Terraform: one language, any cloud

Terraform, built by HashiCorp, uses its own language called HCL
(HashiCorp Configuration Language). The same `terraform` CLI and the
same HCL syntax can provision resources in Azure, AWS, GCP, or dozens
of other providers — even non-cloud systems like GitHub repos or
Datadog monitors — by swapping which **provider** plugin you load.

```hcl
# The same tool, three different clouds, just by changing the provider:
provider "azurerm" { features {} }   # Azure
provider "aws"     { region = "us-east-1" }   # AWS
provider "google"  { project = "my-project" } # GCP
```

That portability is Terraform's core pitch: one skill set, one state
model, works everywhere. The cost is that Terraform manages its own
**state file** (`terraform.tfstate`) — a JSON record of what it last
provisioned — and you're responsible for storing that file safely,
usually in a remote backend. Lesson 5 covers what state actually
tracks; Lesson 17 covers storing it remotely and safely.

## Bicep: Azure-only, and proud of it

Bicep, built by Microsoft, only targets Azure. In exchange for giving
up multi-cloud support, Bicep gets tight integration with the Azure
ecosystem: it compiles down to ARM (Azure Resource Manager) templates,
which means Azure itself — not a file on your laptop — is the source
of truth for what's deployed. There's no separate state file to lose,
back up, or accidentally edit by hand.

```bicep
// Bicep — no provider block needed, Azure is the only target
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'ltvdataeng001'
  location: resourceGroup().location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}
```

Bicep also has first-class support inside tools a data engineer
already touches daily: the Azure Portal can generate a Bicep file
from an existing resource ("Export template"), the Azure CLI
(`az deployment group create`) deploys Bicep files natively, and
VS Code's Bicep extension gives real-time validation against the
actual ARM schema.

## Neither tool is wrong

| | Terraform | Bicep |
|---|---|---|
| Cloud scope | Any provider (Azure, AWS, GCP, etc.) | Azure only |
| Language | HCL | Bicep (compiles to ARM JSON) |
| State | Separate `terraform.tfstate` file you manage | No separate state — Azure tracks deployed state itself |
| Best fit | Multi-cloud teams, or teams standardizing on one IaC tool everywhere | Azure-only teams who want zero state-file overhead |

Real data engineering teams use both, depending on context: a
company running only Azure workloads often prefers Bicep for the
simpler operational story; a company running Azure alongside AWS or
GCP usually standardizes on Terraform so every cloud is provisioned
the same way. This course teaches both — Terraform in Chapters 2 and
4, Bicep in Chapter 3 — so you can make that call on the job instead
of defaulting to whichever tool you learned first.

## Key terms

| Term | Meaning |
|---|---|
| HCL | HashiCorp Configuration Language — the syntax Terraform files are written in |
| Provider | A Terraform plugin that knows how to talk to one platform's API (Azure, AWS, etc.) |
| ARM template | Azure's native JSON deployment format; Bicep compiles to this |
| State file | Terraform's record of what it last provisioned (`terraform.tfstate`) — Bicep has no equivalent because Azure itself tracks it |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does Terraform need a separate state file to track what it's
provisioned, while Bicep doesn't need one at all?
