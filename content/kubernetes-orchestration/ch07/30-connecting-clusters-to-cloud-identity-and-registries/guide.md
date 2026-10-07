# Connecting Clusters to Cloud Identity & Registries

A catalog-sync Pod on AKS needs to read Azure Blob Storage. A fulfillment Pod on EKS needs to read an S3 bucket. The Service Accounts from Chapter 6 give Pods a Kubernetes identity, but that identity doesn't mean anything to Azure or AWS on its own — stashing a storage key as a Secret works, but it's a long-lived credential sitting in etcd, waiting to leak. Both clouds solve this the same way: let a Kubernetes identity *become* a cloud identity, with no stored key at all.

## What you'll learn

- How Workload Identity lets an AKS ServiceAccount act as an Azure AD (Entra ID) identity
- How IAM Roles for Service Accounts (IRSA) does the same thing on EKS
- How to let node pools pull images from ACR or ECR without `imagePullSecrets`
- Why federated identity beats a long-lived key stored as a Kubernetes Secret

## AKS: Workload Identity

Azure Workload Identity federates a Kubernetes ServiceAccount with an Azure AD (Entra ID) application, using the ServiceAccount's own token as proof of identity — no client secret stored anywhere:

```bash
az identity create --name catalog-sync-identity --resource-group northbridge-rg

az aks update \
  --resource-group northbridge-rg \
  --name northbridge-aks \
  --enable-oidc-issuer --enable-workload-identity

az federatedidentity credential create \
  --name catalog-sync-federated \
  --identity-name catalog-sync-identity \
  --resource-group northbridge-rg \
  --issuer "$(az aks show -g northbridge-rg -n northbridge-aks --query oidcIssuerProfile.issuerUrl -o tsv)" \
  --subject system:serviceaccount:catalog:catalog-sync
```

The ServiceAccount is annotated with `azure.workload.identity/client-id`, and the Pod labeled `azure.workload.identity/use: "true"`. From inside the Pod, the Azure SDK picks up the federated token automatically — the application code never handles a secret.

## EKS: IAM Roles for Service Accounts (IRSA)

AWS's equivalent ties a Kubernetes ServiceAccount to an IAM role via the cluster's OIDC provider:

```bash
eksctl create iamserviceaccount \
  --cluster northbridge-eks \
  --namespace fulfillment \
  --name fulfillment-sync \
  --attach-policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess \
  --approve
```

That single `eksctl` command creates the IAM role, trusts it to the cluster's OIDC provider, and annotates the ServiceAccount — a Pod using `fulfillment-sync` gets temporary AWS credentials injected automatically, scoped to exactly the attached policy.

## Pulling images without imagePullSecrets

Both platforms also let the *nodes themselves* authenticate to a private registry, so individual Pods don't need pull secrets at all:

```bash
az aks update --resource-group northbridge-rg --name northbridge-aks --attach-acr northbridgeacr

eksctl create iamserviceaccount --cluster northbridge-eks --name ecr-reader --namespace fulfillment \
  --attach-policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly --approve
```

`--attach-acr` grants the AKS node pool's managed identity pull access to Azure Container Registry directly; on EKS, the worker nodes' own IAM role typically already has ECR pull permissions by default.

## Why this beats a stored key

A long-lived key in a Secret has to be rotated manually, and if it leaks, it's valid until someone notices and revokes it. Workload Identity and IRSA both issue short-lived, automatically-rotated tokens tied to the ServiceAccount — nothing durable to steal, and nothing for Northbridge to remember to rotate.

## Key terms

- **Workload Identity** — AKS's mechanism for federating a Kubernetes ServiceAccount with an Azure AD application, no stored secret
- **IRSA (IAM Roles for Service Accounts)** — EKS's equivalent, tying a ServiceAccount to an IAM role via OIDC
- **OIDC provider** — the identity trust mechanism both clouds use to verify a ServiceAccount's token
- **imagePullSecrets** — a Secret referencing registry credentials; avoidable when nodes or ServiceAccounts authenticate to the registry directly
