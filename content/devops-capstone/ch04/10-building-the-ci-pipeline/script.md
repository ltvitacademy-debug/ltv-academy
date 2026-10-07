# Script — Building the CI Pipeline

## Segment 1 (title)

Phase 2 left you with a cluster, a network, and a vault — but nothing deploys itself yet. Phase 3 is where the storefront repo becomes a real pipeline: a push to GitHub gets built, tested, scanned, and packaged, with no one running docker build by hand. This lesson covers the CI half, everything that happens before an image is trusted enough to deploy.

## Segment 2 (steps)

Product-catalog and checkout live side by side in one monorepo, so each gets its own GitHub Actions workflow scoped with a path filter. Product-catalog's workflow only triggers on changes under services slash product-catalog; checkout's only triggers under services slash checkout. That way a pull request touching only checkout never rebuilds and rescans product-catalog too.

## Segment 3 (code)

Every push runs the same five stages. Lint and unit test first. Then build the container image. Then Trivy scans that image and blocks the pipeline on any critical vulnerability that already has a fix available. Then gitleaks scans the diff for anything that looks like a committed credential. Only after all four gates pass does the image get pushed to the shared registry, ACR.

## Segment 4 (steps)

Notice the image is tagged with the git SHA, never "latest" — that traceability is exactly what makes rollbacks possible later in this phase. And gitleaks runs twice, once as a local pre-commit hook and once here in CI, which matters: later in this phase's build-out, a PaymentPro test key very nearly got committed straight into a Helm values file, and gitleaks is what caught it before it merged. Chapter 5 covers that incident in full.

## Segment 5 (outro)

A scanned, SHA-tagged image sitting in ACR isn't running anywhere yet — CI only decides whether an image is trustworthy, not where it ends up. Next, Lesson 11: the CD side that actually deploys it to Kubernetes automatically.
