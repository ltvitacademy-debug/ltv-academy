# ---------------------------------------------------------------------------
# backend.tf -- remote state + locking reference for Northbridge Retail's
# azurerm and s3 backends (Chapter 3, Lessons 13 & 14). Only ONE `backend`
# block is valid per configuration -- the alternatives below are commented
# out so you can uncomment the one that matches your cloud and your
# Terraform version, rather than copy only the fragment you need.
# ---------------------------------------------------------------------------

# ============================================================================
# OPTION A -- Azure: azurerm backend, native locking (no extra resource)
# ============================================================================
# The azurerm backend locks natively using a lease on the state blob itself
# -- there's no separate lock table or lockfile setting to configure.

# terraform {
#   backend "azurerm" {
#     resource_group_name  = "rg-tfstate"
#     storage_account_name = "sttfstatenorthbridge"
#     container_name       = "tfstate"
#     key                  = "azure-prod.tfstate"
#   }
# }

# ============================================================================
# OPTION B -- AWS: s3 backend, CLASSIC locking via a DynamoDB table
# ============================================================================
# The pattern you'll see in most existing codebases. Requires a small
# DynamoDB table that exists purely to hold lock records -- not application
# data. Works on any supported Terraform version.
#
# Minimal table to provision once, up front (elsewhere in your config, not
# in this backend block):
#
#   resource "aws_dynamodb_table" "tf_locks" {
#     name         = "northbridge-tf-locks"
#     billing_mode = "PAY_PER_REQUEST"
#     hash_key     = "LockID"
#     attribute {
#       name = "LockID"
#       type = "S"
#     }
#   }

terraform {
  backend "s3" {
    bucket         = "northbridge-tfstate"
    key            = "aws-prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "northbridge-tf-locks"
  }
}

# ============================================================================
# OPTION C -- AWS: s3 backend, NATIVE locking via use_lockfile (Terraform
# 1.10+ / OpenTofu 1.8+)
# ============================================================================
# No DynamoDB table to create, pay for, or maintain IAM permissions on.
# Relies on S3's own conditional-writes feature to create a small lock file
# (the state key with a .tflock suffix) next to the state object. Requires
# Terraform 1.10 or newer -- confirm your version before switching to this.
#
# Migrating an existing backend from Option B to this: drop
# dynamodb_table, add use_lockfile = true, then run
# `terraform init -reconfigure` to pick up the change.

# terraform {
#   backend "s3" {
#     bucket       = "northbridge-tfstate"
#     key          = "aws-prod/terraform.tfstate"
#     region       = "us-east-1"
#     use_lockfile = true
#   }
# }

# ============================================================================
# OPTION D -- AWS: s3 backend, BOTH locking mechanisms during a migration
# ============================================================================
# Valid but unusual -- Terraform requires a lock from both the DynamoDB
# table AND the lockfile before proceeding. Useful only as a transitional
# step while migrating B -> C across a team that hasn't all upgraded to
# Terraform 1.10+ yet; for a brand-new project, Option C alone is simpler.

# terraform {
#   backend "s3" {
#     bucket         = "northbridge-tfstate"
#     key            = "aws-prod/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "northbridge-tf-locks"
#     use_lockfile   = true
#   }
# }
