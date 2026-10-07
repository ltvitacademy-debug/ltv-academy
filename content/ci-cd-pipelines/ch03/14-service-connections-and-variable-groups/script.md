# Script — Service Connections & Variable Groups

## Segment 1 (title)

Last lesson's pipeline referenced an ACR name and deployed to production without ever showing where credentials or shared configuration actually live. This lesson fills that gap — service connections and variable groups, the two pieces that make the rest of this chapter's YAML actually work.

## Segment 2 (code)

A service connection is a stored, authenticated link from Azure DevOps to an external service, created once in Project Settings and referenced by name everywhere a pipeline needs it. Here, azureSubscription names a service connection, not a credential — the actual secret, typically Workload Identity Federation today, is stored encrypted inside Azure DevOps and never appears in the YAML, a log, or a pull request diff.

## Segment 3 (screenshot)

Here's a real Azure Resource Manager service connection's Overview tab, created once in Project Settings. Resist the temptation to grant access to all pipelines by default — Northbridge Retail keeps separate, narrowly-scoped connections per environment, one for staging and one for production, instead of a single connection with production-wide rights every pipeline in the project can reach.

## Segment 4 (screenshot)

A variable group is a named set of key-value variables, created once in the Pipelines Library and reused across as many pipelines as need it — the registry name, the AKS cluster name, the resource group, all defined in one place instead of duplicated in every YAML file. A pipeline pulls one in with a single group reference line.

## Segment 5 (steps)

A variable group can hold secrets directly, masked with a lock icon in logs — but the stronger pattern links the group to Azure Key Vault, so Azure Pipelines never stores the secret value at all. It fetches the current value from Key Vault at run time, which means rotating a secret there updates every pipeline that uses it, with no YAML change required.

## Segment 6 (outro)

Next lesson, we look at the three Azure DevOps services around pipelines — Repos, Boards, and Artifacts.
