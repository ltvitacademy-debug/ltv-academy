# Service Connections & Variable Groups

Lesson 13's pipeline referenced `northbridgeRetailACR` and deployed to `storefront-production` without ever showing where credentials or shared configuration actually live. This lesson fills that gap: **service connections**, which authenticate a pipeline to an external system, and **variable groups**, which share configuration (and secrets) across pipelines without pasting them into YAML.

## What you'll learn

- What a service connection is, and why pipelines never hold raw credentials in YAML
- How to create an Azure Resource Manager service connection, and scope it tightly
- Variable groups: shared, reusable sets of variables managed in the Library
- Linking a variable group to Azure Key Vault for secrets that never live in Azure DevOps at all

## Service connections authenticate, the YAML never does

A **service connection** is a stored, authenticated link from an Azure DevOps project to an external service — an Azure subscription, a container registry, a Kubernetes cluster. It's created once, in **Project Settings → Service connections**, and referenced by name everywhere a pipeline needs it:

```yaml
- task: AzureCLI@2
  inputs:
    azureSubscription: "northbridgeRetailACR"
    scriptType: "bash"
    scriptLocation: "inlineScript"
    inlineScript: |
      az aks get-credentials --name northbridge-aks --resource-group storefront-rg
```

`azureSubscription` is a service connection name, not a credential. The actual secret — a service principal, or (preferred today) Workload Identity Federation — is stored encrypted inside Azure DevOps and never appears in a YAML file, a pipeline log, or a pull request diff.

![Creating a new Azure service connection scoped to a subscription](/courses/ci-cd-pipelines/ch03/14-service-connections-and-variable-groups/azure-overview-page.png)
*The Overview tab of an existing Azure Resource Manager service connection — connection type, who created it, and a description explaining its purpose.*
Source: [Microsoft Learn — Service connections for Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints)

## Scoping a service connection tightly

By default, a new service connection is available only to pipelines an administrator explicitly grants access to — resist the temptation to check "Grant access permission to all pipelines." Northbridge Retail keeps separate, narrowly-scoped connections per environment (`northbridgeRetailACR-staging`, `northbridgeRetailACR-prod`) rather than one connection with production-wide rights that every pipeline in the project can reach.

## Variable groups: shared config without copy-paste

A **variable group** is a named set of key-value variables, created once in **Pipelines → Library**, and reused across as many pipelines as need it — the registry name, the AKS cluster name, the resource group, all defined in one place instead of duplicated in every YAML file.

![Adding a new variable group in the Pipelines Library](/courses/ci-cd-pipelines/ch03/14-service-connections-and-variable-groups/add-variable-group.png)
*Creating a new variable group from the Library tab — the same place secure files and service connections live.*
Source: [Microsoft Learn — Add and use variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups)

A pipeline pulls a variable group in with a single line:

```yaml
variables:
  - group: "storefront-shared-config"

steps:
  - script: echo "Deploying to $(aksClusterName)"
```

## Secrets belong in Key Vault, not plain variables

A variable group can hold secrets directly, marked with a lock icon so they're masked in logs — but the stronger pattern is linking the group to an **Azure Key Vault**, so Azure Pipelines never stores the secret value at all. It fetches the current value from Key Vault at run time, which means rotating a secret in Key Vault updates every pipeline that uses it, with no YAML change required.

## Key terms

- **Service connection** — a stored, authenticated link from Azure DevOps to an external service, referenced by name in YAML
- **Workload Identity Federation** — the modern, secretless way to authenticate an Azure Resource Manager service connection
- **Variable group** — a named, reusable set of variables managed in the Library and shared across pipelines
- **Library** — the Azure Pipelines area holding variable groups, secure files, and service connections
- **Key Vault-linked variable group** — a variable group that fetches secret values from Azure Key Vault at run time instead of storing them
