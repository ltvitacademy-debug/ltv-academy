# Script — Provisioning a Storage Account

## Segment 1 (title)

DE Foundations Lesson 1 had you create a storage account by hand in the Portal. Everything you learned there about what it is still applies -- this lesson writes that same decision down as code.

## Segment 2 (code: the complete configuration)

Provider block, resource group, storage account, variable, output -- every piece you've already seen, assembled into one real, deployable configuration.

## Segment 3 (code: naming rules and replication)

A storage account name must be globally unique across all of Azure, lowercase letters and numbers only, three to twenty-four characters. account_tier is Standard or Premium; account_replication_type -- LRS, ZRS, GRS, or RAGRS -- controls how many copies of your data Azure keeps and where.

## Segment 4 (steps: running it)

terraform init downloads the provider. terraform plan shows two resources to add before anything happens. terraform apply creates them and prints the storage account's resource ID as an output.

## Segment 5 (outro)

A real storage account, provisioned as code, matching the same one you built by hand. Next up: provisioning a Fabric Capacity the same way.
