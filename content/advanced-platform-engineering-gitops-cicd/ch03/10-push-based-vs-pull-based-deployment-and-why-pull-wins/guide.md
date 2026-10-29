# Lesson 10 — Push-Based vs. Pull-Based Deployment, and Why Pull Wins

**Chapter 3 · GitOps Principles · Lesson 2 of 4**

## What you'll learn

- How a traditional "CI/CD does the deploy" pipeline actually reaches a
  cluster, and what credentials that requires it to hold
- Why holding those credentials outside the cluster is a real security
  liability, not just a theoretical one
- How a pull-based GitOps agent flips the direction of trust, and what
  that buys you concretely
- The OpenGitOps **Pulled Automatically** principle, and how it maps
  onto tools like Argo CD and Flux

## The push model: your pipeline holds the keys

In a conventional pipeline, the "deploy" stage looks something like
this:

```yaml
# .github/workflows/deploy.yml (push model)
- name: Deploy to production
  run: |
    az aks get-credentials --resource-group prod-rg --name prod-aks
    kubectl apply -f k8s/production/
```

Read that `az aks get-credentials` line carefully: the CI runner is
fetching a kubeconfig for the production cluster and then authenticating
to it directly. For this to work at all, the CI system — GitHub
Actions, Azure Pipelines, Jenkins, whatever you're running — has to
hold credentials with enough privilege to apply manifests against a
live production cluster. Those credentials live as encrypted secrets in
the CI system's configuration, get decrypted into the runner's memory
every time the pipeline executes, and the cluster's API server has to
be reachable from wherever that runner happens to be — which, for a
hosted CI provider, often means punching a hole toward the public
internet or standing up a private network bridge just so the pipeline
can reach in.

This is **push-based deployment**: the pipeline, sitting outside the
cluster, reaches in and pushes changes. It's the model most teams start
with, because it's the natural extension of "the pipeline already builds
and tests the code — why not have it finish the job?"

## Why that's a security liability

Walk through what a compromise of the CI system actually gets an
attacker in the push model. A leaked secret, a poisoned dependency in a
build step, a malicious pull request that gets CI to run arbitrary code
— any of those can expose or abuse credentials that are, by
construction, privileged enough to modify production. The CI system
becomes a high-value target precisely because it's been handed
standing, broad, long-lived access to the thing you care most about
protecting. And it's not a narrow blast radius: the same runner
credentials used to deploy `payments-api` on a Tuesday might be scoped
to the whole cluster, because scoping credentials per-pipeline, per-app,
per-environment is tedious enough that most teams don't bother.

There's also a structural problem independent of any one breach: the
cluster's API server has to accept inbound connections from wherever CI
runs, which usually means it can't live purely on a private network with
no exposed ingress for administration. You're forced into a trade-off
between convenience and network isolation before security is even
compromised.

## The pull model: the cluster reaches out, not in

GitOps inverts the direction of trust entirely. Instead of an external
pipeline pushing in, an agent **running inside the cluster** —
Argo CD and Flux are the two real, widely deployed examples — watches a
Git repository and pulls changes toward itself:

```
# the agent, running in-cluster, does this on its own schedule:
git fetch origin main
# diff live cluster state against what's now in Git
# apply only if they differ
```

The agent authenticates outbound to Git using read-only credentials
(a deploy key or a scoped personal access token with no write access),
and it applies changes using **its own in-cluster RBAC permissions** —
permissions you've already learned to scope tightly with Kubernetes
`Role`s and `RoleBinding`s. No external system ever holds a
cluster-admin kubeconfig. No inbound connection to the API server from
outside the cluster is required for deployment at all; the agent
initiates every connection outward. If someone compromises your CI
pipeline, there is no privileged cluster credential sitting in it to
steal, because the pipeline never had one.

## Pulled Automatically — the third OpenGitOps principle

This is the OpenGitOps principle **Pulled Automatically**: *"Software
agents automatically pull the desired state declarations from the
source."* The emphasis is deliberate — not "CI pushes," but "an agent
pulls." CI's job shrinks to building, testing, and updating what's in
Git; it never touches the cluster directly again. The cluster's own
agent decides, on its own schedule or in response to a Git webhook, when
and what to pull.

## Key terms

| Term | Meaning |
|---|---|
| Push-based deployment | An external CI/CD pipeline authenticates to the cluster and applies changes directly, requiring it to hold privileged cluster credentials |
| Pull-based deployment | An in-cluster agent watches Git and pulls/applies changes using its own in-cluster RBAC; no external system holds cluster credentials |
| Blast radius | The scope of damage a compromised credential or system can cause; push-based CI widens it to "whatever the pipeline's kubeconfig can touch" |
| Pulled Automatically | The OpenGitOps principle that software agents, not external pipelines, are responsible for pulling desired state and applying it |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: in
the push model, what specific credential does the CI pipeline have to
hold, and why does moving to a pull-based agent eliminate the need for
any external system to hold it at all?
