# Script — Resources & Providers

## Segment 1 (title)

HCL's generic block syntax becomes useful the moment you use it to describe something real. This lesson covers the two block types that do the actual work in any Terraform configuration: provider, which tells Terraform which cloud to talk to, and resource, which describes the infrastructure you want created.

## Segment 2 (code)

A provider is a plugin that translates HCL into calls against a specific API — Azure, AWS, and hundreds of others each have one. The required_providers block declares which provider and version range the configuration needs, and the provider block itself configures it — here with defaults, since Northbridge Retail authenticates through Azure CLI login rather than hardcoded credentials in the file.

## Segment 3 (code)

A resource block describes one piece of infrastructure you want to exist. Notice the storage account's resource_group_name and location aren't hardcoded strings — they reference the resource group block directly, so the storage account always matches whatever resource group it belongs to, even if that configuration changes later.

## Segment 4 (code)

That reference pattern is always type, dot, local name, dot, attribute. Terraform scans every reference in your configuration and uses them to build a dependency graph automatically — it knows the resource group has to be created first, because the storage account's block literally reads its output, not because you wrote the order anywhere.

## Segment 5 (steps)

Every resource block shares the same three parts: a resource type defined by the provider, mapping to one specific API; a local name that only your configuration files see and the provider never does; and a body holding every attribute that resource type supports, some required and some optional.

## Segment 6 (outro)

You now have the two blocks that create real infrastructure. Next up, Lesson 8: variable and output blocks, so you stop hardcoding values like "rg-northbridge-prod" directly into every resource.
