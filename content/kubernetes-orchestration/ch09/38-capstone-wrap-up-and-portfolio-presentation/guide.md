# Capstone: Wrap-Up & Portfolio Presentation

You've built a working, autoscaled, rollback-capable Kubernetes deployment of Northbridge Retail's product-catalog and checkout services. This final lesson is about making sure that work actually counts toward getting hired: how to organize the repository, what a strong README says, and how to talk through this project in a technical interview.

## What you'll learn

- How to structure the Git repository so a reviewer (or an interviewer looking at your screen) can understand it in under a minute
- What belongs in README.md versus RUNBOOK.md, and why both matter
- How to describe this project out loud, concisely, in an interview
- The follow-up questions interviewers actually ask about a project like this, and how to answer them

## Organizing the repository for a reviewer

A hiring manager or interviewer will skim, not read line by line. Structure for that:

```
northbridge-k8s/
  README.md              <- starts here: what this is, how to run it
  RUNBOOK.md              <- operational: diagnosing real failures
  charts/
    product-catalog/
    checkout/
  argocd/
    product-catalog-application.yaml
    checkout-application.yaml
```

## What README.md should say

A strong README for this project has, in order:

1. **One sentence** describing what this is: "Helm-packaged, autoscaled Kubernetes deployment of a two-service e-commerce application, with GitOps-ready Argo CD manifests."
2. **Architecture**, briefly: which services exist, how they talk to each other, what's exposed externally.
3. **How to run it**: the exact `helm install` commands against a local cluster (Minikube or kind), start to finish.
4. **What's deliberately out of scope**, carried over from the kickoff lesson — this shows judgment, not just output.

## What RUNBOOK.md should say

This is the operational document, separate from the README, and it's what shows you think like someone who'll be on call:

- What `CrashLoopBackOff` on checkout specifically would mean for this app, and the exact commands to diagnose it (`kubectl describe pod`, `kubectl logs --previous`)
- How to confirm the HPA is actually working: `kubectl get hpa -w` and what healthy scaling looks like
- How to roll back a bad release: `helm rollback checkout <revision>`, and how to find the right revision with `helm history`

## Talking through this project in an interview

Interviewers care more about *decisions* than about the fact that YAML exists. Practice a version of this answer that's thirty seconds, not three minutes:

> "I packaged a two-service e-commerce app — a catalog API and a checkout service — as Helm charts, with separate values files per environment. The checkout service gets a HorizontalPodAutoscaler because its traffic is spiky around cart and order submission, while the catalog API doesn't need that. I also wrote the Argo CD Application manifest so it's ready to run under GitOps, and a runbook documenting the failure modes I'd expect — image pull failures, crash loops, and how to roll back a bad release."

## Likely follow-up questions, and how to answer them

- **"Why Helm instead of raw manifests?"** — one chart, parameterized by values, instead of maintaining near-duplicate YAML per environment; and `helm rollback` gives an atomic undo that hand-applied YAML doesn't.
- **"How would you keep the database credentials out of Git?"** — the Secret was created directly against the cluster with `kubectl create secret`, referenced by name from the Deployment, never stored as plaintext in the repository.
- **"What would you add if this ran for real?"** — a live GitOps controller actually watching the repo (explicitly scoped out of this build, but the manifest is ready for it), and probably a PodDisruptionBudget so `kubectl drain` during node maintenance doesn't take out every checkout replica at once.

Being able to name what you'd add next, and why it was reasonable to leave out of a capstone, reads as more senior than pretending the project is finished and perfect.

## Key terms

- **README vs. runbook** — README explains what a project is and how to run it; a runbook explains how to operate and troubleshoot it
- **Scope justification** — explicitly stating what was left out and why, which demonstrates judgment rather than incompleteness
- **PodDisruptionBudget** — a resource limiting how many Pods of a workload can be voluntarily disrupted at once (e.g. during a node drain), worth naming as a logical next step beyond this capstone's scope
