# Lesson 26 — Least Privilege for CI/CD Service Accounts and Runners

**Chapter 7 · Securing the Pipeline Itself · Lesson 2 of 4**

## What you'll learn

- Why a CI/CD pipeline's default token is almost always more powerful than
  the job actually needs, and how to scope it down explicitly
- Why a short-lived, federated credential is safer than a long-lived static
  key, even one stored in a secrets manager
- Why a runner that executes code from a public pull request and a runner
  that deploys to production are two different trust boundaries, and should
  never share a credential or a machine
- How to read a real `permissions` block and an OIDC role-assumption step

## The default token is over-scoped by default

Every CI/CD platform hands your job some kind of automatic credential — on
GitHub Actions it's `GITHUB_TOKEN`, generated fresh per workflow run. Left at
its default, it typically has broad read/write access across the repository:
contents, issues, pull requests, packages. Most jobs need almost none of
that. A job that only runs tests needs `contents: read` and nothing else. A
job that comments on a pull request needs `pull-requests: write` and still
nothing else. Declare the permissions block explicitly, at the workflow or
job level, and the platform enforces it — anything not listed is denied, not
just unused.

```yaml
# .github/workflows/deploy.yml
permissions:
  contents: read
  id-token: write   # needed for OIDC federation, covered below
```

The same principle applies to a dedicated CI service account you create
yourself in a cloud IAM system: give it a role scoped to exactly the
resources that pipeline touches — one storage bucket, one resource group,
one Kubernetes namespace — never a broad built-in role like `Contributor` or
`Owner` because it was faster to attach at setup time.

## Short-lived over long-lived

A static AWS access key or Azure service principal secret, pasted into your
CI platform's secret store, works — but it's a long-lived bearer credential:
whoever holds it can use it from anywhere, indefinitely, until someone
remembers to rotate it. **OIDC federation** replaces that with a credential
that's minted fresh for each job and expires in minutes. The CI platform
presents a signed token asserting "I am workflow X on repo Y, triggered by
event Z," and the cloud provider's IAM trusts that assertion to issue a
temporary, scoped session — no static secret stored anywhere.

```yaml
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::111122223333:role/gh-actions-deploy
    aws-region: us-east-1
```

That `role-to-assume` role has its own trust policy restricting *which*
repository and branch can assume it — so even a leaked workflow log can't be
replayed from somewhere else to get the same access. Azure's Workload
Identity Federation and GitLab CI's `id_tokens` work on the same principle:
trade a long-lived secret for a short-lived, provably-scoped session.

## Separate runners for separate trust boundaries

A **self-hosted runner** is a machine you control that executes pipeline
jobs — and it's also where least privilege gets violated in a subtle way
that's worth calling out directly. If that same runner pool executes
workflows triggered by pull requests from public forks, an attacker can open
a PR that runs arbitrary code on your runner, and that code inherits
whatever secrets the runner's environment has access to. If the deploy
credentials for production live on that same runner pool, a malicious PR can
reach them.

The fix is to treat "runs untrusted contributor code" and "deploys to
production" as different trust boundaries that never share infrastructure:

- Use ephemeral, isolated runners (or GitHub-hosted runners) for anything
  triggered by `pull_request` from a fork — they get no production secrets
  at all.
- Keep a separate, locked-down runner pool, reachable only by workflows
  triggered from protected branches or manual approval, for anything that
  assumes a deploy role.
- On GitHub, enable "Require approval for all outside collaborators" so a
  first-time contributor's workflow run doesn't execute automatically.

## Key terms

| Term | Meaning |
|---|---|
| `permissions` block | Explicit, minimal scopes declared for a CI job's automatic token; anything not listed is denied |
| OIDC federation | Exchanging a short-lived, workflow-signed identity token for a temporary cloud session, instead of storing a long-lived static credential |
| Trust boundary | A line separating code/identities with different levels of trust — e.g. a fork's PR code versus a protected-branch deploy job |
| Self-hosted runner | A machine you operate that executes CI/CD jobs, carrying whatever access its environment grants to any job scheduled on it |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why is a
`GITHUB_TOKEN` left at its default considered over-scoped, how does OIDC
federation reduce blast radius compared to a static cloud credential, and
why should a runner that builds fork pull requests never share a pool with
one that deploys to production?
