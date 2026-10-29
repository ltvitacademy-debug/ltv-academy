# Lesson 27 — Terraform and Secrets in a Pipeline

**Chapter 7 · Terraform in CI/CD · Lesson 3 of 4**

## What you'll learn

- Why cloud credentials must come from the pipeline's own secret store, never
  from a `.tfvars` file committed to Git
- How a GitHub Actions workflow hands those credentials to Terraform through
  environment variables the `azurerm` or `aws` provider already expects
- How to mark a Terraform output `sensitive = true` so it never prints in
  plan or apply logs
- Why a sensitive output still isn't a full fix — the real value stays in
  plaintext in the state file

## Credentials never belong in .tfvars

A `.tfvars` file is just a text file, and Terraform doesn't treat anything
inside it specially — if a client secret or access key ends up in one, and
that file gets committed, the credential is now sitting in Git history
forever, readable by anyone with repo access, long after anyone rotates it.
This is the same lesson this course already taught generically about
secrets in pipelines, applied directly to Terraform: credentials belong in
the pipeline's secret store (GitHub Actions secrets, in this chapter's
examples), injected at runtime, never written into a file that gets
committed.

## Handing credentials to the provider as environment variables

The `azurerm` provider reads Azure Service Principal credentials from a
fixed set of environment variable names if they're present, so a workflow
can supply them without a single line of Terraform code changing:

```yaml
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3

      - name: Terraform Apply
        run: terraform apply -auto-approve
        env:
          ARM_CLIENT_ID: ${{ secrets.ARM_CLIENT_ID }}
          ARM_CLIENT_SECRET: ${{ secrets.ARM_CLIENT_SECRET }}
          ARM_TENANT_ID: ${{ secrets.ARM_TENANT_ID }}
          ARM_SUBSCRIPTION_ID: ${{ secrets.ARM_SUBSCRIPTION_ID }}
```

`${{ secrets.ARM_CLIENT_SECRET }}` pulls from the repository's (or
environment's) GitHub Actions secrets — configured once under
**Settings → Secrets and variables → Actions** — and GitHub automatically
masks any secret value that happens to appear in the workflow's log output.
The AWS provider works the same way with `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY`. Nothing here is Terraform-specific syntax — it's
the exact same "secrets live in the pipeline's store, not in a committed
file" pattern already covered generically, now pointed at the two
environment variable names each provider happens to read.

## Marking an output sensitive

Credentials going in is one half of the problem. Values coming *out* of
Terraform — a generated database password, a connection string — need the
same care, which is what the `sensitive` argument on an output is for:

```hcl
resource "random_password" "db_admin" {
  length  = 20
  special = true
}

output "db_admin_password" {
  value     = random_password.db_admin.result
  sensitive = true
}
```

Without `sensitive = true`, that generated password would print in plain
text every time `terraform plan` or `terraform apply` runs — right there in
the CI log for anyone with access to read. With it, Terraform prints
`<sensitive>` in its place in all console output, including the plan the
pipeline posts back on pull requests from Lesson 25.

## What sensitive doesn't protect

`sensitive = true` only changes what prints to the console and logs — the
real value is still written in plain text inside the Terraform state file
itself, because Terraform needs the actual value there to detect drift and
plan future changes correctly. That's exactly why Chapter 3's remote state
backend, with its own access controls and encryption at rest, isn't optional
for anything handling real secrets: a sensitive output stops a password from
leaking into a build log, but only a properly secured backend stops it from
leaking out of the state file.

## Key terms

| Term | Meaning |
|---|---|
| `ARM_CLIENT_SECRET` | Environment variable the `azurerm` provider reads automatically for Service Principal auth |
| `secrets.<NAME>` | GitHub Actions syntax for pulling a value from the repository's configured secret store |
| `sensitive = true` | Output argument that replaces a value with `<sensitive>` in all Terraform console output |
| Remote state backend | Where a sensitive output's real value still lives in plaintext, which is why securing it matters |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what does
marking an output `sensitive = true` actually hide, and what does it *not*
hide?
