# Certifications: AZ-400, AWS DevOps, CKA & Terraform Associate

This is it — the last lesson of the DevOps Capstone, and the last lesson of the entire DevOps Engineer path. Before we close things out, let's cover the four certifications most worth considering next, because every one of them maps directly onto something you just finished building for Northbridge Retail.

## What you'll learn

- What AZ-400, AWS Certified DevOps Engineer – Professional, CKA, and Terraform Associate each actually cover
- Who each certification is realistically for, and roughly how each exam is structured
- How specific pieces of the capstone map onto each certification's content
- A full recap of the journey from "runs on my machine" to a monitored, secured production deployment

## AZ-400: Designing and Implementing Microsoft DevOps Solutions

AZ-400 is Microsoft's DevOps certification, aimed at engineers already comfortable with Azure fundamentals (it assumes AZ-104 or AZ-204-level knowledge, though it doesn't require the cert itself). It's a single scored exam covering source control strategy, CI/CD pipeline design, dependency and artifact management, infrastructure as code, and monitoring/feedback loops — almost a checklist of what you just built. Everything from the GitHub Actions pipeline promoting across dev/staging/prod, to the Terraform-provisioned AKS clusters, to the kube-prometheus-stack monitoring, maps directly onto AZ-400's content outline. If you're committed to the Azure ecosystem specifically, this is the most natural next certification.

## AWS Certified DevOps Engineer – Professional

This is AWS's equivalent at the professional tier — notably harder to pass cold than AZ-400, since it assumes real hands-on AWS experience and is explicitly a "professional," not associate-level, exam. It covers CI/CD on AWS-native tooling, monitoring/logging, incident response, and high availability/disaster recovery, with heavy scenario-based questions. The capstone's architecture used Azure, not AWS, but the underlying concepts transfer directly: pipeline promotion gates, secrets management without long-lived credentials, and incident response built on golden-signal monitoring are AWS-tool-agnostic skills you already have — you'd mainly be learning AWS's specific service names and quirks (CodePipeline instead of GitHub Actions' deploy stage, Systems Manager Parameter Store/Secrets Manager instead of Key Vault) rather than relearning the underlying practices.

## CKA: Certified Kubernetes Administrator

CKA is run by the Linux Foundation/CNCF and is unusual among these four: it's a fully hands-on, performance-based exam in a live terminal, not multiple choice. You're given real clusters and real tasks — troubleshoot a broken Deployment, configure networking, manage storage, debug a node — under a time limit. It covers cluster architecture, workloads and scheduling, services and networking, storage, and troubleshooting. Everything from this capstone's AKS cluster setup, to writing Helm chart values per environment, to debugging a pod that's failing its readiness probe maps directly onto CKA's domains, and `kubectl` fluency from the capstone is exactly the skill the exam is testing in real time.

## Terraform Associate (HashiCorp Certified: Terraform Associate)

This is the most approachable of the four and a reasonable first certification if you're newer to the field — multiple choice, no live terminal, covering Terraform's core workflow (`init`, `plan`, `apply`, `destroy`), state management, modules, providers, and workspaces. The capstone's state-collision story is almost exam material directly: understanding *why* remote state with locking matters, not just the commands, is exactly what this exam tests over rote memorization.

## How the capstone maps to all four

| Certification | Capstone skill that maps directly |
|---|---|
| AZ-400 | The full GitHub Actions promotion pipeline, dev → staging → prod |
| AWS DevOps Pro | OIDC-based secrets handling, incident response via golden signals |
| CKA | AKS cluster setup, Helm per-environment values, debugging readiness probes |
| Terraform Associate | Remote state, blob-lease locking, the state-collision incident itself |

## Closing out the DevOps Capstone — and the whole path

Take a moment on this one, because it's a real milestone. You started this course with two services that "ran on a developer's laptop" and nothing else — no cloud infrastructure, no pipeline, no monitoring, no security scanning. Across six chapters, you provisioned real Azure infrastructure with Terraform, including surviving a real state-locking collision. You containerized and deployed two services with very different load profiles onto AKS, with Helm charts tuned per environment. You built a GitHub Actions pipeline that takes a commit all the way from a feature branch to production behind a manual approval gate, with Trivy and gitleaks scanning along the way. You stood up kube-prometheus-stack monitoring and ran a real incident drill, tracing a 400ms-to-6.2-second latency spike to a saturated connection pool and writing a blameless postmortem. You caught a secrets leak before it ever reached git history. And in this final chapter, you turned every piece of that into a resume, a portfolio, and real, specific answers for an interview.

That is the complete loop the DevOps Engineer path set out to teach: build it, ship it, break it on purpose, fix it, and be able to explain all of it clearly to someone who wasn't there. Whichever certification you pursue next, you're not starting from theory — you're starting from a system you actually built and watched run. Congratulations on finishing the DevOps Engineer path.
