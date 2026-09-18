# Script — Resource Blocks

## Segment 1 (title)

Every resource you provision with Terraform follows the same three-part syntax: resource, type, local name, and a block body of attributes. Let's look at the two resource types a data engineer uses constantly.

## Segment 2 (code: resource group and storage account)

A resource group is almost always provisioned first, since most other resources live inside one. A storage account -- the same resource type from DE Foundations Lesson 1 -- needs a resource group to belong to.

## Segment 3 (code: referencing another resource's attributes)

resource_group_name and location aren't hardcoded strings -- they're references using type dot local name dot attribute. Terraform builds its dependency graph from these references automatically, without you ever writing the build order.

## Segment 4 (steps: local name vs real name)

The local name only has to be unique inside your configuration files -- Azure never sees it. The real name attribute is what has to be valid, and for some resource types, globally unique across all of Azure.

## Segment 5 (outro)

Type, local name, attributes, and references that build the dependency graph automatically. Next up: parameterizing those attributes with variables instead of hardcoding them.
