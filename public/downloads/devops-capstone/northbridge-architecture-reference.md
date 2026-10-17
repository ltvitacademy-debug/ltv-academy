# Northbridge Retail Architecture Reference

> Pulled from Lesson 1 (The Capstone Brief & Architecture) and Lesson 7 (Provisioning Cloud
> Infrastructure With Terraform). Keep this open while you build your own version of the
> capstone, and use it as the "does my diagram match reality" check in Category 7 of the
> acceptance rubric.

## The two services

```
storefront/                        (GitHub: northbridgeretail/storefront)
  services/product-catalog/        Node.js 20 + Express · port 8080
  services/checkout/                Python 3.12 + FastAPI · port 8080
```

- **product-catalog** — read-heavy REST API over Postgres, steady predictable traffic.
- **checkout** — cart/order submission, calls PaymentPro (OAuth2 client-credentials) and an
  external legacy inventory service, spiky flash-sale load.

## The end-to-end path, left to right

```
Engineer laptop
  --git push (feature/*)-->
GitHub (northbridgeretail/storefront, main branch)
  --PR + CI: lint/test -> build -> Trivy scan -> gitleaks -> push to ACR-->
Azure Container Registry (northbridgeacr.azurecr.io, tag = git SHA)
  --merge to main (squash) -> helm upgrade --install-->
AKS: northbridge-aks-dev, namespace northbridge-dev
  --semver tag pushed (e.g. v1.4.0) -- auto-deploy-->
namespace northbridge-staging (same aks-dev cluster, to save cost)
  --manual approval gate (GitHub Environments, 1 required reviewer)-->
AKS: northbridge-aks-prod, namespace northbridge-prod
  --> shop.northbridgeretail.com

Layered across every stage above:
  Monitoring -> kube-prometheus-stack (Prometheus + Grafana + Alertmanager) per cluster
  Security   -> Trivy, gitleaks, Checkov, Azure Key Vault + External Secrets Operator, GitHub OIDC
```

## Resource naming table

| Resource | Name | Type |
|---|---|---|
| Monorepo | `northbridgeretail/storefront` | GitHub repository |
| Container registry | `northbridgeacr.azurecr.io` | Azure Container Registry |
| Dev/staging cluster | `northbridge-aks-dev` | AKS cluster |
| Production cluster | `northbridge-aks-prod` | AKS cluster (isolated, prod only) |
| Dev namespace | `northbridge-dev` | Kubernetes namespace |
| Staging namespace | `northbridge-staging` | Kubernetes namespace (on the dev cluster) |
| Production namespace | `northbridge-prod` | Kubernetes namespace |
| Terraform state backend | `sttfstatenorthbridge` / container `tfstate` | Azure Storage account |
| Dev state key | `dev.terraform.tfstate` | Blob key |
| Prod state key | `prod.terraform.tfstate` | Blob key |
| Resource group | `rg-northbridge-{environment}` | Azure resource group |
| Virtual network | `vnet-northbridge-{environment}` | Azure VNet |
| Database | `psql-northbridge-{environment}` | Postgres Flexible Server |
| Dev Key Vault | `northbridge-kv-dev` | Azure Key Vault |
| Prod Key Vault | `northbridge-kv-prod` | Azure Key Vault |
| Storefront domain | `shop.northbridgeretail.com` | Production customer-facing URL |

## The naming pattern, generalized

1. **One prefix (`northbridge`) across every layer** — the repo org, the registry, both clusters,
   every namespace, the resource groups, the Key Vaults. In a real multi-team Azure subscription,
   this is what makes `kubectl get pods -n northbridge-dev` unambiguous about whose workload
   you're looking at.
2. **`{environment}` as an explicit variable, not three copies of hand-written config** —
   `rg-northbridge-dev` and `rg-northbridge-prod` are the same Terraform module with a different
   `var.environment` value (Lesson 7), not two separately maintained `.tf` files that can drift
   apart from each other over time.
3. **Dev and staging share a cluster; prod is isolated** — this is a deliberate cost/risk
   trade-off named explicitly in Lesson 1 ("to save cost"), not an oversight. Know the reasoning
   well enough to defend it in an interview: staging needs to be realistic but not
   blast-radius-isolated from dev the way prod needs to be isolated from everything.
