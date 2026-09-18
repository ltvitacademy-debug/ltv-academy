# Script — Providers

## Segment 1 (title)

Terraform's core engine knows nothing about Azure. A provider is the plugin that translates generic resource blocks into real API calls against one platform. For Azure, that plugin is azurerm.

## Segment 2 (code: declaring the provider and its version)

A terraform block with required_providers names the provider's registry address and a version constraint. The provider block itself -- azurerm with features -- is required even when there's nothing to configure inside it.

## Segment 3 (code: why pin a version)

A tilde-arrow constraint like tilde-greater 3.80 allows patch and minor updates but blocks the next breaking major version. Without a constraint, a teammate's unpinned init can silently resolve to a newer, incompatible provider release.

## Segment 4 (steps: what terraform init does)

Running terraform init downloads the provider version matching your constraint and writes the exact resolved version into a lock file. That lock file gets committed to Git so everyone -- your machine, a teammate's, CI -- resolves to the same provider.

## Segment 5 (outro)

The provider is the translator between your HCL and Azure's API. Next up: the state file that tracks what that provider has actually built.
