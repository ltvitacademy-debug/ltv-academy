# Installing Terraform & Configuring Providers

Time to get Terraform actually running. This lesson covers installing the CLI and wiring up authentication for both providers Northbridge Retail's platform team needs — `azurerm` and `aws` — so Chapter 2 can start writing real configuration against a working setup.

## What you'll learn

- How to install the Terraform CLI and confirm it's working
- How `terraform init` downloads and locks provider versions
- How to authenticate the `azurerm` provider using the Azure CLI
- How to authenticate the `aws` provider using an AWS CLI profile

## Installing the CLI

Terraform ships as a single binary. On most systems it's installed via a package manager:

```bash
# macOS (Homebrew)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Windows (Chocolatey)
choco install terraform

# verify the install
terraform version
```

```
Terraform v1.9.0
on windows_amd64
```

## Declaring and locking providers

Every configuration starts with a `terraform` block declaring which providers it needs:

```hcl
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

Running `terraform init` in that directory downloads both provider plugins and writes a `.terraform.lock.hcl` file pinning the exact versions used, so every teammate and every CI run gets identical provider behavior:

```
$ terraform init
Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/azurerm versions matching "~> 3.0"...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/azurerm v3.108.0...
- Installing hashicorp/aws v5.55.0...

Terraform has been successfully initialized!
```

## Configuring the azurerm provider

The `azurerm` provider authenticates using whatever Azure CLI session is already active on the machine — no secrets in the `.tf` files:

```bash
az login
az account set --subscription "Northbridge-Retail-Prod"
```

```hcl
provider "azurerm" {
  features {}
}
```

The empty `features {}` block is required even with no settings inside it — it's how the provider confirms you're intentionally using version 3.x's feature set.

## Configuring the aws provider

The `aws` provider reads credentials the same way the AWS CLI does — from a named profile, environment variables, or an attached IAM role — never hardcoded in configuration:

```bash
aws configure --profile northbridge-prod
```

```hcl
provider "aws" {
  region  = "us-east-1"
  profile = "northbridge-prod"
}
```

With both providers configured and `terraform init` run successfully, Northbridge's platform team has a working foundation — ready for Chapter 2's deep dive into writing actual resource configuration.

## Key terms

| Term | Meaning |
|---|---|
| `terraform init` | Downloads required providers and initializes the working directory |
| `.terraform.lock.hcl` | The file that pins exact provider versions for consistent behavior across machines |
| `provider` block | Configures how Terraform authenticates and connects to a specific provider |
| `features {}` | A required, often-empty block confirming intentional use of the azurerm provider's version |
