# Secrets & Variables

storefront's workflow is about to need things it can't hardcode into
`ci.yml`: a Docker Hub password to push images, a database connection
string for integration tests, a Kubernetes cluster token for deployment.
None of that belongs in plain text in a YAML file a whole team can read.
This lesson covers where Northbridge Retail actually puts it.

## What you'll learn

- The difference between a **secret** and a **variable** in GitHub Actions
- Where to create repository secrets, in the real GitHub Settings UI
- How to reference a secret or variable inside a workflow file
- Why secrets are automatically masked in logs — and why that isn't a guarantee

## Secrets vs. variables

GitHub Actions gives you two places to store configuration outside the
workflow file:

- **Secrets** — encrypted, write-only once saved. Nobody, including repo
  admins, can view a secret's value again through the UI. Use these for
  anything sensitive: passwords, API tokens, connection strings.
- **Variables** — plain text, visible to anyone with repo access. Use these
  for non-sensitive configuration that's still nice to keep out of the
  workflow file, like a default AWS region or a Node version.

Both live under the same place in repository settings:

![Screenshot of a repository's top navigation with the Settings tab highlighted.](/courses/ci-cd-pipelines/ch02/08-secrets-and-variables/repo-actions-settings.png)
*Settings is where storefront's secrets and variables actually live — not in the workflow file.*
Source: [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

From there, **Secrets and variables → Actions** shows two tabs, one for
each, with an explanation that secrets are encrypted and never passed to a
workflow triggered by a fork's pull request:

![Screenshot of the Actions secrets and variables settings page, showing Secrets and Variables tabs.](/courses/ci-cd-pipelines/ch02/08-secrets-and-variables/actions-secrets-tab.png)
*New repository secret is where Northbridge Retail adds DOCKERHUB_TOKEN and KUBE_CONFIG.*
Source: [GitHub Docs — Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

## Using them in a workflow

Once `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are saved as secrets, and
`AWS_REGION` as a variable, `storefront`'s workflow reaches them through two
contexts:

```yaml
steps:
  - name: Log in to Docker Hub
    uses: docker/login-action@v3
    with:
      username: ${{ secrets.DOCKERHUB_USERNAME }}
      password: ${{ secrets.DOCKERHUB_TOKEN }}

  - name: Deploy
    run: ./deploy.sh --region "${{ vars.AWS_REGION }}"
```

`${{ secrets.NAME }}` and `${{ vars.NAME }}` both pull from repository
settings at run time — nothing sensitive is ever written into the file
itself. Every workflow also gets a free secret, `secrets.GITHUB_TOKEN`,
automatically generated and scoped to that one run, used for things like
authenticating `actions/checkout` against private repositories.

## Secrets get masked — but that's not a shield

GitHub automatically replaces any secret's exact value with `***` anywhere
it appears in a log. That's a safety net, not a guarantee: a step that
splits a secret across two `echo` commands, or transforms it before
printing, can still leak it. Northbridge Retail's rule is simple — never
`echo` a secret directly, and never write one into a file a later step might
upload as an artifact.

## Key terms

| Term | Meaning |
|---|---|
| Secret | An encrypted value, write-only after saving, for sensitive data |
| Variable | A plain-text value for non-sensitive configuration |
| `secrets.NAME` | The expression that reaches a secret inside a workflow |
| `vars.NAME` | The expression that reaches a variable inside a workflow |
| `GITHUB_TOKEN` | An automatic, run-scoped secret GitHub generates for every run |
| Masking | GitHub replacing a secret's value with `***` wherever it appears in logs |
