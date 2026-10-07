# Deploying to Kubernetes From CI/CD

The previous lesson covered the pipeline that provisions Northbridge Retail's EKS cluster. This lesson covers the pipeline that ships their actual application — the cart service and friends — onto that cluster, every time code merges to `main`.

## What you'll learn

- The four-stage shape of a build-and-deploy pipeline: build, push, update, roll out
- Why the image tag — not `latest` — is the thing that actually changes on every deploy
- Two ways to update the manifest: a direct `kubectl set image`, and a templated `helm upgrade`
- How the pipeline confirms the rollout actually succeeded before calling the job done

## The four-stage shape

Every container deploy pipeline, regardless of what sits on top of Kubernetes, follows the same shape:

1. **Build** — turn source code into a container image
2. **Push** — upload that image to a registry Kubernetes can pull from
3. **Update** — change the Kubernetes manifest (or Helm values) to reference the new image tag
4. **Roll out** — apply that change to the cluster and confirm it actually succeeded

## Build and push, tagged by commit

Northbridge Retail tags every image with the Git commit SHA, never `latest` — that way the exact code running in production is always traceable back to one commit, and two different commits never produce indistinguishable images:

```yaml
# .github/workflows/deploy.yml (build-and-push job)
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/northbridge-retail/cart-service:${{ github.sha }}
```

## Updating the manifest and rolling out

Once the image exists in the registry, the cluster needs to be told to use it. There are two common ways to do that, and Northbridge Retail's pipeline uses the simpler one — a direct `kubectl set image` — for most services:

```yaml
# .github/workflows/deploy.yml (deploy job)
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: azure/k8s-set-context@v4
        with:
          kubeconfig: ${{ secrets.KUBE_CONFIG }}

      - run: |
          kubectl set image deployment/cart-service \
            cart-service=ghcr.io/northbridge-retail/cart-service:${{ github.sha }} \
            -n production

      - run: kubectl rollout status deployment/cart-service -n production --timeout=120s
```

`kubectl set image` patches the Deployment's pod template with the new tag, which triggers Kubernetes' built-in **rolling update**: new pods start, wait for their readiness probe to pass, and only then does Kubernetes retire an old pod — so there's no window where traffic has nowhere healthy to land. The final step, `kubectl rollout status`, is what makes this a real CI/CD gate rather than a fire-and-forget: it blocks until every new pod is healthy, or fails the build after the timeout if the rollout stalls.

For a service with more moving parts — multiple environments, templated configuration, shared defaults — Northbridge Retail reaches for Helm instead of raw `kubectl`:

```yaml
      - run: |
          helm upgrade cart-service ./charts/cart-service \
            --install \
            --namespace production \
            --set image.tag=${{ github.sha }} \
            --wait --timeout 120s
```

`--install` makes this safe to run even the very first time (upgrade-or-install), and `--wait` makes Helm block the same way `kubectl rollout status` does — the job only succeeds once Kubernetes reports the new pods healthy.

## Key terms

- **Image tag** — the identifier for a specific build of a container image; tagging by commit SHA keeps every deployed image traceable
- **Container registry** — where built images are pushed and from which Kubernetes pulls them (here, GitHub Container Registry, `ghcr.io`)
- **Rolling update** — Kubernetes' default deployment strategy: start new pods, wait for readiness, then retire old ones
- **`kubectl rollout status`** — blocks until a rollout finishes successfully or fails, turning a deploy into a real pass/fail CI step
- **Helm** — a package manager for Kubernetes that templates manifests and tracks releases, used here via `helm upgrade --install`
