# Adding Security Scanning & Secrets Management

The CI pipeline Chapter 4 built gets code from a feature branch into `northbridge-dev` automatically — but "automatically" cuts both ways. A pipeline that deploys fast will also deploy a vulnerable container image or a leaked credential fast, unless something is checking. This lesson adds three scanners to Northbridge's GitHub Actions pipelines, wires Azure Key Vault and the External Secrets Operator into the clusters so secrets never live in Git or Helm values, and walks through a real near-miss that happened during this exact build-out.

## What you'll learn

- How Trivy, Checkov, and gitleaks slot into the pipelines from Lesson 10 without slowing them down
- Why secrets are synced from Key Vault into Kubernetes Secrets instead of being written into Helm `values.yaml`
- How External Secrets Operator keeps that sync automatic and auditable
- The near-miss: a PaymentPro test API key that almost reached `main` in a `values.yaml`, and how gitleaks caught it

## Three scanners, three different jobs

| Scanner | Scans | Blocks on |
|---|---|---|
| **Trivy** | The built container image (`product-catalog` and `checkout`) | Any CRITICAL vulnerability with a fix available |
| **Checkov** | Terraform in `infra/terraform/` | Misconfigured Azure resources (open NSGs, missing encryption, etc.) |
| **gitleaks** | The diff of every commit and PR | Any string matching a secret pattern (API keys, tokens, private keys) |

```yaml
# .github/workflows/checkout-ci.yml (excerpt)
- name: Build image
  run: docker build -t northbridgeacr.azurecr.io/checkout:${{ github.sha }} services/checkout

- name: Scan image with Trivy
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: northbridgeacr.azurecr.io/checkout:${{ github.sha }}
    severity: CRITICAL
    ignore-unfixed: true
    exit-code: "1"

- name: Scan secrets with gitleaks
  uses: gitleaks/gitleaks-action@v2
  with:
    config-path: .gitleaks.toml
```

Checkov runs in the separate IaC pipeline, right after `terraform plan`:

```yaml
# .github/workflows/terraform-ci.yml (excerpt)
- name: terraform plan
  run: terraform plan -var-file=environments/dev.tfvars -out=plan.out

- name: Checkov scan
  uses: bridgecrewio/checkov-action@master
  with:
    directory: infra/terraform
    soft_fail: false
```

`gitleaks` also runs as a local pre-commit hook, so a developer gets caught before they even push — CI is the backstop, not the only line of defense.

## Secrets management: Key Vault + External Secrets Operator

Nothing sensitive — the PaymentPro API key, database credentials, the TLS cert — is ever written into Git or a Helm `values.yaml`. Each real secret lives in `northbridge-kv-dev` or `northbridge-kv-prod`, and the **External Secrets Operator** (ESO) running in each cluster pulls it into a native Kubernetes `Secret` on a refresh interval:

```yaml
# charts/checkout/templates/external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: checkout-paymentpro
  namespace: northbridge-prod
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: northbridge-kv-prod
    kind: ClusterSecretStore
  target:
    name: checkout-paymentpro-secret
  data:
    - secretKey: api-key
      remoteRef:
        key: paymentpro-api-key
```

ESO authenticates to Key Vault using the same Azure AD Workload Identity federation from Lesson 9 — no stored client secret anywhere in the cluster. The pod mounts `checkout-paymentpro-secret` as an environment variable at runtime; the actual key value never touches a YAML file a human edits.

## The near-miss: a PaymentPro key in `values.yaml`

While wiring up the checkout Helm chart during Phase 3, an engineer testing against PaymentPro's sandbox pasted a real test API key directly into `charts/checkout/values.yaml` to get a local `helm template` run working, then forgot to remove it before committing:

```yaml
# charts/checkout/values.yaml (the near-miss, before it was caught)
paymentpro:
  apiKey: "pp_test_51Hn3k2LQvRgY8mXZaT9bKf7wPq2sN4"
```

The commit never reached `main`. `gitleaks`'s pre-commit hook flagged it immediately:

```
$ git commit -m "wire up checkout paymentpro config"

○ gitleaks: finding leaked secrets...
Finding:     paymentpro.apiKey: "pp_test_51Hn3k2LQ..."
Secret:      pp_test_51Hn3k2LQvRgY8mXZaT9bKf7wPq2sN4
RuleID:      generic-api-key
File:        charts/checkout/values.yaml
Line:        12

✖ gitleaks detected 1 leak — commit aborted
```

The engineer rotated the test key as a precaution, replaced the hardcoded value with the `ExternalSecret` shown above, and the CI gitleaks job would have caught the same thing even if the local hook had been skipped. This is exactly why the scan runs in two places: a developer's machine isn't guaranteed to have the hook installed, but CI always runs.

## Key terms

- **Trivy** — a container image scanner that blocks the pipeline on CRITICAL vulnerabilities with an available fix
- **Checkov** — a static analysis scanner for Terraform that flags misconfigured infrastructure before `apply`
- **gitleaks** — a secrets scanner that inspects commit diffs for patterns matching API keys, tokens, and credentials
- **External Secrets Operator (ESO)** — a Kubernetes controller that syncs secrets from Key Vault into native `Secret` objects on a refresh interval
- **ClusterSecretStore** — the ESO resource defining how a cluster authenticates to a given Key Vault
