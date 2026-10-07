# Script — The AWS Provider

## Segment 1 (title)

Chapter 5 ended with Northbridge Retail's checkout service running on AKS. But Northbridge isn't an all-Azure shop — its order-processing fleet and product-image storage live on AWS, a deliberate multi-cloud split rather than an accident of history. This chapter provisions that AWS side, starting with the provider itself.

## Segment 2 (code)

Just like azurerm back in Chapter 5, the aws provider gets declared in a required providers block and pinned to a version, then configured separately with a region. That region tells every resource in the configuration which AWS region to create itself in, unless an individual resource overrides it. Northbridge standardizes on us-east-1 for this entire course.

## Segment 3 (steps)

Notice the provider block only says where, not who. AWS still needs credentials, and Terraform never wants to see them written into a file. A named CLI profile points at credentials the AWS CLI already has stored locally, set up once with a configure command. Environment variables are the usual alternative, common in CI pipelines that have no persistent home directory to store a profile in. Either way, a hardcoded access key committed to version control is a permanent leak the moment that commit gets pushed — rotating it afterward means hunting down every place it was copied.

## Segment 4 (code)

Terraform init does the same job here it did for azurerm back in Chapter 5: it downloads the aws provider plugin matching your version constraint and records exactly which version it picked in a lockfile. Only after init succeeds can Terraform plan or apply a single aws resource.

## Segment 5 (outro)

With the provider configured, authenticated safely, and initialized, you're ready to provision real infrastructure for Northbridge on AWS. Up next, Lesson 26: VPC networking and EC2 for Northbridge's order-processing fleet.
