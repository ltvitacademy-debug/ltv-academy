# Script — CI/CD & Cloud Interview Questions

## Segment 1 (title)

CI/CD and cloud questions are where your capstone pays off most directly, because you're describing a pipeline you built, tested, and personally watched run, not one you only read about in a tutorial somewhere.

## Segment 2 (code)

When asked to walk through your pipeline, name every single gate and artifact. A PR triggers lint, test, a build, a Trivy scan, and a gitleaks scan, all required to pass before a reviewer can approve it. Merging to main pushes a SHA-tagged image to the registry and auto-deploys to dev. A semver tag auto-deploys to staging. And production only happens after a manual approval gate in a GitHub Environment, with a required reviewer signing off.

## Segment 3 (steps)

For secrets, the strong answer is a mechanism, not a buzzword. GitHub Actions authenticates to Azure through OIDC — a federated credential trusts a short-lived token issued per workflow run, so there's no stored secret sitting in GitHub at all. Application secrets live in Key Vault and get synced into Kubernetes by the External Secrets Operator, never passing through git, Helm values, or CI logs at any point.

## Segment 4 (steps)

Blue-green and canary solve the same promotion problem in different ways. Blue-green cuts all traffic over at once between two complete environments, keeping the old one warm for an instant rollback if needed. Canary instead shifts a small percentage of real traffic to the new version first and ramps up gradually while watching metrics. For a service like checkout with a real latency SLO, canary paired with the existing Prometheus and Grafana dashboards is a natural next step beyond the staged promotion already built.

## Segment 5 (outro)

Next up, lesson twenty-three: Kubernetes and Terraform interview questions, covering the infrastructure layer underneath that same pipeline.
