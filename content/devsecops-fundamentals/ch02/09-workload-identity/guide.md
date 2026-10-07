# Workload Identity

Every identity mechanism this chapter has covered so far — Azure RBAC, AWS IAM, Kubernetes RBAC — still leaves one practical problem unanswered: how does a *workload* running inside a cluster actually prove who it is to the cloud outside that cluster, without a long-lived secret sitting in a config file? Workload identity is the answer, and it closes the loop between everything you've learned in this chapter.

## What you'll learn

- The problem workload identity solves: cloud credentials for pods, without storing cloud credentials anywhere
- How federated identity uses a Kubernetes service account token in place of a stored secret
- Azure Workload Identity and AWS IRSA as the two concrete implementations
- How Northbridge Retail's checkout pod authenticates to Azure Key Vault with zero stored credentials

## The old way, and why it's a problem

Before workload identity existed, a pod that needed to call an Azure or AWS API had two realistic options, and both involved a long-lived secret: mount a service principal's client secret (or an AWS access key) as a Kubernetes Secret, or bake it into the container image. Either way, that credential sits somewhere on disk, inside etcd, or in an image layer — exactly the kind of standing secret Chapter 3 spends a whole chapter on eliminating. If that credential leaks, it works until someone notices and manually rotates it, and it was almost certainly broader than the one pod actually needed.

## Federated identity: a token instead of a secret

Workload identity solves this with **federated identity**, also called OIDC federation. Instead of a long-lived credential, the cloud provider is configured to trust tokens issued by the Kubernetes cluster's own OIDC issuer for a specific, narrowly-defined service account. When a pod using that service account starts, Kubernetes automatically mounts a short-lived, auto-rotating token. The pod presents that token to the cloud provider, which verifies it against the trusted OIDC issuer and exchanges it for temporary cloud credentials — scoped to exactly the Azure RBAC role or AWS IAM role that's been federated to that one service account.

Nothing long-lived is stored anywhere. The token is short-lived by design, and even if it leaked, it's useless outside the specific trust relationship it was issued under.

## Two concrete implementations

- **Azure Workload Identity** — federates an AKS service account to a Microsoft Entra ID application, which in turn holds the Azure RBAC role assignments the pod needs (such as read access to one Key Vault).
- **AWS IRSA (IAM Roles for Service Accounts)** — federates an EKS service account to an IAM role via the cluster's OIDC provider, using the same trust-then-exchange pattern with an IAM role instead of an Entra ID application.

Different cloud, same underlying idea: the Kubernetes service account is the identity that actually gets trusted, and everything from Lesson 5 through Lesson 8 — least privilege, Azure RBAC scope, IAM roles and policies, Kubernetes RBAC itself — determines exactly what that federated identity can do once it authenticates.

## Northbridge Retail's checkout pod

The checkout service runs in AKS and needs to read one secret from Azure Key Vault: the payment processor's API key. With Azure Workload Identity configured, the checkout pod's service account is federated to an Entra ID application that holds exactly one Azure RBAC role — Key Vault Secrets User, scoped to that one vault. When the pod starts, it gets a short-lived token automatically; when it calls Key Vault, Azure exchanges that token for Key Vault access matching that one role. No client secret, no access key, nothing in a Kubernetes Secret object for an attacker to find — the credential simply doesn't exist in long-lived form anywhere.

## Key terms

- **Workload identity** — a mechanism letting a workload (like a pod) authenticate to cloud APIs without a stored long-lived credential
- **Federated identity (OIDC federation)** — trusting tokens from one identity provider (the cluster's OIDC issuer) to issue credentials from another (Azure or AWS)
- **Azure Workload Identity** — Azure's implementation, federating an AKS service account to a Microsoft Entra ID application
- **IRSA (IAM Roles for Service Accounts)** — AWS's equivalent, federating an EKS service account to an IAM role

## Recap

Workload identity replaces a stored credential with a short-lived, auto-rotating token trusted through federation — closing the gap between Kubernetes RBAC inside the cluster and cloud IAM outside it. This is also the natural bridge into Chapter 3: even with workload identity handling cloud credentials, Northbridge Retail still has real secrets — database passwords, third-party API keys — that have to live somewhere. Next up: why those secrets leak in the first place.
