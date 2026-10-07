# Using Registry Modules

The storage account module you wrote in the last two lessons was small — a dozen lines of HCL. Some infrastructure patterns are much bigger and much easier to get wrong: a production-ready VPC with public and private subnets, NAT gateways, and route tables can be hundreds of lines. For patterns like that, you rarely need to write your own module at all. The **Terraform Registry** hosts thousands of published, versioned modules that teams like Northbridge Retail's cloud team pull in exactly the way you'd call a local module — just with a different `source`.

## What you'll learn

- What the public Terraform Registry is and how to browse it at registry.terraform.io
- The registry `source` address format: `<namespace>/<name>/<provider>`
- Calling `terraform-aws-modules/vpc/aws`, a widely-used published module, with real inputs
- Why a registry module is still "just a module" once it's called — same outputs, same `module.` references

## The Terraform Registry

registry.terraform.io is where HashiCorp and the community publish reusable modules. Each listing shows the module's inputs, outputs, and a version history, the same documentation you'd write yourself for a local module — except someone else already wrote and tested the implementation. Two of the most widely used:

- `terraform-aws-modules/vpc/aws` — a complete AWS VPC with subnets, route tables, and optional NAT gateways
- `Azure/compute/azurerm` — Azure virtual machine provisioning with sane defaults baked in

## Calling a registry module

A registry module's `source` isn't a filesystem path — it's a registry address in the form `<namespace>/<name>/<provider>`, with no leading `./`:

```
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "nbretail-dev-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = {
    Environment = "dev"
    Project      = "nbretail-pipeline"
  }
}
```

Northbridge Retail's cloud team gets a production-shaped VPC — public and private subnets across two availability zones, NAT gateway included — from twenty lines of configuration instead of hand-writing every `aws_subnet` and `aws_route_table` block themselves.

## Initializing and using its outputs

Registry modules are downloaded during `terraform init`, just like a local module is resolved:

```
$ terraform init

Initializing modules...
Downloading registry.terraform.io/terraform-aws-modules/vpc/aws 5.8.1 for vpc...
- vpc in .terraform/modules/vpc

Initializing provider plugins...
Terraform has been successfully initialized!
```

Once downloaded, the module behaves exactly like the one you wrote by hand — its documented outputs are read with the same `module.<name>.<output>` syntax:

```
resource "aws_instance" "app" {
  ami           = "ami-0abcd1234ef567890"
  instance_type = "t3.medium"
  subnet_id     = module.vpc.private_subnets[0]
}
```

`module.vpc.private_subnets` is a list output the VPC module documents on its registry page — nothing about consuming it differs from consuming an output on the storage account module you wrote yourself.

## Reading before you adopt

Before pulling a registry module into real infrastructure, read its registry page: check its input/output reference, its source repository, and how recently it's maintained. A registry module is still someone else's code running against Northbridge Retail's AWS account — version pinning, covered next lesson, is what keeps that from becoming a moving target.

## Key terms

- **Terraform Registry** — registry.terraform.io, HashiCorp's public catalog of published modules
- **Registry source address** — `<namespace>/<name>/<provider>`, e.g. `terraform-aws-modules/vpc/aws`
- **`version`** — a module block argument constraining which published version to use (next lesson)
- **Module outputs (registry)** — read with the same `module.<name>.<output>` syntax as a local module
