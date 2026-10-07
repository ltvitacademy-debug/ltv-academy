# Script — The Capstone Brief & Architecture

## Segment 1 (title)

Welcome to the DevOps Capstone — the course that ties together everything the DevOps Engineer path has taught you. Instead of another isolated topic, you're going to build one real system end to end, the way you'd actually be asked to on the job. This lesson hands you the brief and the architecture you'll be building toward.

## Segment 2 (steps)

You're the newest DevOps engineer at Northbridge Retail, a mid-size e-commerce retailer, working in a monorepo called storefront. Product-catalog is a Node.js and Express service that reads product data from Postgres, with steady, predictable traffic. Checkout is a Python and FastAPI service that handles cart and order submission — it calls out to PaymentPro for payment and an existing inventory service to check stock, and its traffic spikes hard during flash sales.

## Segment 3 (code)

Here's the full path a change takes. An engineer pushes a feature branch, opens a PR, and CI lints, tests, builds, and scans it before a squash merge to main. That merge pushes an image to the shared container registry and deploys automatically to the dev namespace. When a maintainer cuts a version tag, it promotes to staging automatically, then waits on a manual approval gate before it ever reaches production.

## Segment 4 (steps)

Monitoring and security aren't a final phase bolted on at the end — they run underneath every environment from dev through prod. Prometheus, Grafana, and Alertmanager watch all three namespaces, while Trivy, gitleaks, Checkov, Key Vault, and GitHub OIDC protect every stage of the pipeline that got the code there.

## Segment 5 (outro)

Keep this architecture picture in your head — every lesson from here adds one more piece of it. Next up, lesson two: how the repository itself is structured and how branches move code through it.
