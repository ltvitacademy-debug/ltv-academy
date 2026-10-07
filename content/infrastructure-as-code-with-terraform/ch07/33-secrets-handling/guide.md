# Secrets Handling

A database password, an API key, a connection string — these show up constantly while writing infrastructure, and it's tempting to just type them straight into a `.tf` file. This lesson closes out Chapter 7 by covering why that's dangerous, and the patterns Northbridge Retail's team actually uses to keep secrets out of configuration entirely.

## What you'll learn

- Why a secret typed into a `.tf` or `.tfvars` file is a liability even if the repo is private
- Reading secrets at runtime from Azure Key Vault and AWS Secrets Manager instead of hardcoding them
- Using environment variables for provider credentials and sensitive variables
- What belongs in `.gitignore` for any Terraform project

## Why a hardcoded secret is dangerous

```hcl
# never do this
resource "azurerm_linux_web_app" "storefront" {
  app_settings = {
    DB_CONNECTION_STRING = "Server=...;Password=Sup3rSecret!;"
  }
}
```

Even in a private repository, that string now lives forever in Git history — visible to anyone with repo access, in every clone, in every backup, long after the password itself is rotated. It's also written in plain text into Terraform's state file, which is its own separate exposure (Chapter 3 covered why state needs to be protected like the secrets it often contains).

## Reading secrets from a vault instead

Both clouds offer a managed secrets store, and Terraform can read from either one with a `data` source instead of a literal value:

```hcl
data "azurerm_key_vault_secret" "db_password" {
  name         = "northbridge-db-password"
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_linux_web_app" "storefront" {
  app_settings = {
    DB_CONNECTION_STRING = "Server=...;Password=${data.azurerm_key_vault_secret.db_password.value};"
  }
}
```

```hcl
data "aws_secretsmanager_secret_version" "db_password" {
  secret_id = "northbridge/prod/db-password"
}
```

The actual secret value only ever exists at apply time, read live from the vault — it's never written into a `.tf` file, and anyone reviewing the pull request sees a reference, not the password itself.

## Environment variables for provider credentials

Provider authentication itself should come from the environment, not a `provider` block:

```bash
export ARM_CLIENT_ID="..."
export ARM_CLIENT_SECRET="..."
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."
```

A `.tf` file with a hardcoded `client_secret` is exactly the same mistake as a hardcoded database password — the fix is identical: keep it out of any file that gets committed.

## What belongs in .gitignore

```
*.tfvars
*.tfstate
*.tfstate.backup
.terraform/
.terraform.lock.hcl
```

`.tfvars` files commonly hold per-environment values that can include sensitive defaults, and `.tfstate` can contain secret values in plain text as a side effect of normal resource attributes (like that connection string) being stored there. Both get excluded from version control as standard practice — state belongs in a remote backend (Chapter 3), not a committed file.

## Key terms

| Term | Meaning |
|---|---|
| Secret in state | A sensitive value that ends up stored in plain text inside `terraform.tfstate` as a resource attribute |
| `data` source for secrets | Reading a secret live from Key Vault or Secrets Manager at apply time, instead of hardcoding it |
| Environment variable credentials | Supplying provider authentication via environment variables rather than in a `provider` block |
| `.gitignore` for Terraform | Excludes `*.tfvars`, `*.tfstate*`, and `.terraform/` from version control |
