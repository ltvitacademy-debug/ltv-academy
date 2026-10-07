# Capstone: Build It

With the brief laid out in Lesson 34, it's time to actually write the configuration. This lesson walks through the root module that calls both the `azure-network` and `aws-network` modules, declares the remaining resources, and ends with a real `terraform plan` showing exactly what Northbridge's dev environment is about to get.

## What you'll learn

- How the root `main.tf` calls two shared modules side by side
- Declaring provider-specific resources (App Service, S3, Lambda) alongside module calls
- Tagging every resource consistently, satisfying the capstone's acceptance criteria
- Reading a real multi-resource `terraform plan` output before applying anything

## The root configuration

```hcl
# environments/dev/main.tf
module "azure_network" {
  source              = "../../modules/azure-network"
  resource_group_name = "rg-northbridge-dev"
  location            = "eastus2"
  vnet_cidr           = "10.10.0.0/16"
  tags                = local.common_tags
}

module "aws_network" {
  source   = "../../modules/aws-network"
  vpc_cidr = "10.20.0.0/16"
  tags     = local.common_tags
}

locals {
  common_tags = {
    environment = "dev"
    project     = "northbridge-checkout"
  }
}
```

Each module returns the pieces the rest of the configuration needs — a resource group name, a subnet ID, a VPC ID — through its own `outputs.tf`, which the root module reads the same way any resource attribute is read.

## Resources that sit alongside the modules

```hcl
resource "azurerm_service_plan" "storefront" {
  name                = "asp-northbridge-dev"
  resource_group_name = module.azure_network.resource_group_name
  location            = module.azure_network.location
  os_type             = "Linux"
  sku_name            = "B1"
  tags                = local.common_tags
}

resource "aws_s3_bucket" "product_images" {
  bucket = "northbridge-dev-product-images"
  tags   = local.common_tags
}

resource "aws_lambda_function" "order_confirmation" {
  function_name = "northbridge-dev-order-confirmation"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  filename      = "order_confirmation.zip"
  tags          = local.common_tags
}
```

Every resource reads its tags from the same `local.common_tags`, which is what keeps the capstone's tagging requirement consistent without repeating the same map everywhere by hand.

## Running the plan

```
$ terraform init
Terraform has been successfully initialized!

$ terraform plan
  # module.azure_network.azurerm_virtual_network.this will be created
  # module.aws_network.aws_vpc.this will be created
  # azurerm_service_plan.storefront will be created
  # azurerm_linux_web_app.storefront will be created
  # aws_s3_bucket.product_images will be created
  # aws_iam_role.lambda_exec will be created
  # aws_lambda_function.order_confirmation will be created

Plan: 12 to add, 0 to change, 0 to destroy.
```

A clean plan with no errors and the expected resource count is the signal to move forward. Before applying, this is exactly the output a teammate would review in a pull request, per Chapter 7's CI/CD workflow.

## Key terms

| Term | Meaning |
|---|---|
| Root module | The configuration in `environments/dev/` that calls other modules and declares top-level resources |
| `local.common_tags` | A single map of tags, reused everywhere, that keeps tagging consistent across every resource |
| Module output | A value a module exposes (like a resource group name or VPC ID) for the root module to consume |
