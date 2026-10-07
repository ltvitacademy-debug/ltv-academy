# Script — Adding Security Scanning & Secrets Management

## Segment 1 (title)

The pipeline Chapter 4 built gets code into production fast — but fast cuts both ways. A pipeline that deploys quickly will also deploy a vulnerable image or a leaked credential quickly, unless something is checking. This lesson adds real security scanning to Northbridge's pipelines and tells the story of a credential that almost got through.

## Segment 2 (steps)

Three scanners do three different jobs. Trivy scans the built container image and blocks the pipeline on any critical vulnerability with a fix available. Checkov scans the Terraform in infra/terraform for misconfigured Azure resources before anything gets applied. And gitleaks scans every commit diff for strings that look like an API key, a token, or a credential — running both in CI and as a local pre-commit hook.

## Segment 3 (code)

Secrets never live in a Helm values file. An ExternalSecret resource tells the External Secrets Operator to pull the PaymentPro API key out of Azure Key Vault and sync it into a native Kubernetes secret on a one hour refresh interval — the pod reads an environment variable, and no human ever edits the actual key value into a YAML file.

## Segment 4 (steps)

That secret lives in northbridge-kv-dev or northbridge-kv-prod alongside the database credentials and the TLS certificate. The External Secrets Operator keeps the sync automatic, and it authenticates to Key Vault using the same Azure AD Workload Identity federation from Lesson 9, so there's no stored client secret sitting in the cluster either.

## Segment 5 (code)

Here's why this matters: during Phase 3, an engineer testing against PaymentPro's sandbox pasted a real test API key straight into checkout's values.yaml to get a local run working, then almost committed it. Gitleaks's pre-commit hook caught it instantly, named the exact file and line, and aborted the commit before it ever reached a branch.

## Segment 6 (outro)

The key was rotated as a precaution and replaced with the ExternalSecret pattern, and the same gitleaks check runs again in CI as a backstop. Next lesson puts the Lesson 14 monitoring stack to work diagnosing a real production incident.
