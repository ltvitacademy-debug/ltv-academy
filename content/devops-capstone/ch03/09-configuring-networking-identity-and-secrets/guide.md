# Configuring Networking, Identity & Secrets

The clusters exist and can pull images, but nothing is reachable from outside yet, nothing has a certificate, and every pod that needs a database password or the PaymentPro API key has no safe way to get one. This lesson closes out Phase 2 by wiring up ingress and TLS, federating pod identity with Azure AD so workloads can reach Key Vault and Postgres without a stored secret, and setting up the OIDC trust that lets GitHub Actions deploy without a stored Azure credential either.

## What you'll learn

- NGINX Ingress Controller + cert-manager, and the three hostnames they route
- Azure AD Workload Identity federation, so pods authenticate to Key Vault and Postgres with no secret in a config map or Helm value
- Key Vault (`northbridge-kv-dev` / `northbridge-kv-prod`) and what it holds
- GitHub Actions OIDC federated credentials, so CI/CD authenticates to Azure with no stored client secret

## Ingress and the three hostnames

Each AKS cluster runs the **NGINX Ingress Controller** plus **cert-manager** for automatic TLS certificate issuance and renewal. Three hostnames route to the two services depending on environment:

| Hostname | Namespace | Cluster |
|---|---|---|
| `dev.shop.northbridgeretail.com` | `northbridge-dev` | `northbridge-aks-dev` |
| `staging.shop.northbridgeretail.com` | `northbridge-staging` | `northbridge-aks-dev` |
| `shop.northbridgeretail.com` | `northbridge-prod` | `northbridge-aks-prod` |

A typical `checkout` Ingress resource (from `charts/checkout/templates/ingress.yaml`, rendered for prod):

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: checkout
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  tls:
    - hosts: ["shop.northbridgeretail.com"]
      secretName: checkout-tls
  rules:
    - host: shop.northbridgeretail.com
      http:
        paths:
          - path: /api/checkout
            pathType: Prefix
            backend:
              service:
                name: checkout
                port:
                  number: 8080
```

cert-manager watches that `cluster-issuer` annotation, requests a certificate from Let's Encrypt, and populates `checkout-tls` automatically — no manually uploaded certificate, and renewal happens the same way weeks before expiry.

## Azure AD Workload Identity: no secrets in pod configuration

`checkout` needs to read the PaymentPro API key and its Postgres credentials, and `product-catalog` needs its own Postgres credentials — but none of that should ever sit in a Helm `values.yaml` or a plain Kubernetes `Secret` manifest in Git. Northbridge uses **Azure AD Workload Identity federation**: each service account gets federated with an Azure AD application, and pods using that service account can request Azure AD tokens directly from inside the cluster, with no client secret stored anywhere.

```hcl
resource "azurerm_user_assigned_identity" "checkout" {
  name                = "id-checkout-${var.environment}"
  resource_group_name = var.resource_group_name
  location            = "eastus"
}

resource "azurerm_federated_identity_credential" "checkout" {
  name                = "checkout-federated-credential"
  resource_group_name = var.resource_group_name
  parent_id           = azurerm_user_assigned_identity.checkout.id
  audience            = ["api://AzureADTokenExchange"]
  issuer              = azurerm_kubernetes_cluster.this.oidc_issuer_url
  subject             = "system:serviceaccount:northbridge-${var.environment}:checkout"
}
```

That `subject` line is the trust binding: it tells Azure AD to trust tokens presented by the exact Kubernetes service account `checkout` in namespace `northbridge-<env>`, issued by this specific AKS cluster's OIDC issuer. The pod spec just references the service account; Azure AD Workload Identity's mutating webhook injects the right environment variables and projected token volume automatically.

## Key Vault: `northbridge-kv-dev` / `northbridge-kv-prod`

Each environment has its own Key Vault — `northbridge-kv-dev` and `northbridge-kv-prod` — holding:

- The **PaymentPro API key** (OAuth2 client credentials `checkout` uses to call PaymentPro)
- **Database credentials** for `product-catalog` and `checkout`
- The **TLS certificate** material cert-manager issues (mirrored here for backup/audit, though cert-manager manages the live Kubernetes Secret)

The federated identity from above is granted a **Key Vault access policy** (or RBAC role, `Key Vault Secrets User`) scoped to secrets it actually needs — `checkout`'s identity can read the PaymentPro key, but has no access to `product-catalog`'s database credential. **External Secrets Operator**, running in each cluster, syncs these Key Vault secrets into native Kubernetes `Secret` objects on a refresh interval, so application pods still just mount a `Secret` volume — they never call the Key Vault SDK directly, and the secret's source of truth stays in Key Vault, not Git.

```yaml
# charts/checkout/templates/external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: checkout-secrets
spec:
  secretStoreRef:
    name: azure-keyvault-{{ .Values.environment }}
    kind: SecretStore
  target:
    name: checkout-secrets
  data:
    - secretKey: paymentpro-api-key
      remoteRef:
        key: paymentpro-api-key
    - secretKey: db-password
      remoteRef:
        key: checkout-db-password
```

## GitHub Actions OIDC: no stored Azure client secret for CI either

The same no-stored-secret philosophy extends to the pipeline itself. Instead of a long-lived Azure service principal client secret sitting in GitHub Secrets, Northbridge configures a **federated identity credential** trusting GitHub's OIDC token issuer:

```hcl
resource "azurerm_federated_identity_credential" "github_actions" {
  name                = "github-actions-federated-credential"
  resource_group_name = var.resource_group_name
  parent_id           = azurerm_user_assigned_identity.cicd.id
  audience            = ["api://AzureADTokenExchange"]
  issuer              = "https://token.actions.githubusercontent.com"
  subject             = "repo:northbridgeretail/storefront:ref:refs/heads/main"
}
```

In the workflow itself, `azure/login@v2` exchanges GitHub's short-lived OIDC token for an Azure AD token with no secret at all:

```yaml
- uses: azure/login@v2
  with:
    client-id: ${{ vars.AZURE_CLIENT_ID }}
    tenant-id: ${{ vars.AZURE_TENANT_ID }}
    subscription-id: ${{ vars.AZURE_SUBSCRIPTION_ID }}
```

No `client-secret` field exists in that step because none exists to leak — the trust is entirely federation between GitHub's token issuer and Azure AD, scoped to a specific repo and branch ref.

## Key terms

- **cert-manager** — Kubernetes controller that automates TLS certificate issuance and renewal from an issuer like Let's Encrypt
- **Azure AD Workload Identity federation** — lets a Kubernetes service account exchange its own token for an Azure AD token, with no client secret stored
- **External Secrets Operator** — syncs secrets from an external store (Key Vault) into native Kubernetes `Secret` objects
- **OIDC federated credential** — a trust relationship letting an external token issuer (GitHub Actions, an AKS cluster) mint tokens Azure AD accepts, replacing a stored client secret
