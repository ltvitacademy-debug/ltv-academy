# Script — Secrets Handling

## Segment 1 (title)

A database password or API key shows up constantly while writing infrastructure, and it's tempting to type it straight into a .tf file. Let's cover why that's dangerous, and the patterns Northbridge's team actually uses instead.

## Segment 2 (code)

Even in a private repository, a hardcoded secret like this lives forever in Git history, visible in every clone and backup long after the password is rotated. It's also written in plain text into Terraform's state file, which is its own separate exposure.

## Segment 3 (code)

Instead, read the secret from a vault using a data source. The real value only ever exists at apply time, pulled live from Key Vault or Secrets Manager — it's never written into a file, and a reviewer sees a reference, not the password.

## Segment 4 (steps)

Provider credentials themselves should come from environment variables, not a hardcoded provider block — the exact same mistake, the exact same fix. And every Terraform project's gitignore should exclude tfvars files, state files, and the .terraform folder.

## Segment 5 (outro)

With secrets handled safely, this chapter — and everything leading up to it — comes together in Chapter 8: the capstone.
