# Lesson 3 — Installing the Tools

**Chapter 1 · Infrastructure as Code Fundamentals · Lesson 3 of 22**

## What you'll learn

- Installing the Terraform CLI on Windows, macOS, and Linux
- Installing the Bicep CLI through the Azure CLI
- Verifying both installations actually work before writing any code
- Why you need the Azure CLI installed and logged in either way

## Terraform is a single binary

Terraform ships as one standalone executable — no runtime, no
package manager required, though package managers make installation
easier.

```bash
# Windows (winget)
winget install Hashicorp.Terraform

# macOS (Homebrew)
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Linux (apt, Debian/Ubuntu)
wget -O- https://apt.releases.hashicorp.com/gpg | \
  gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
  https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

Whichever path you take, you end up with a `terraform` command on
your `PATH`. Verify it:

```
$ terraform version
Terraform v1.7.5
on windows_amd64
```

## Bicep installs through the Azure CLI

Bicep isn't a separate download — it's a component of the Azure CLI
(`az`), which you need installed anyway since both tools deploy into
Azure and both rely on `az login` for authentication.

```bash
# Install the Azure CLI first (Windows example via winget)
winget install Microsoft.AzureCLI

# Then install Bicep as an az component
az bicep install
```

Verify Bicep separately from the Azure CLI itself, since Bicep
updates on its own release cadence:

```
$ az bicep version
Bicep CLI version 0.27.1 (41c1e35)
```

If a newer Bicep version ships later, `az bicep upgrade` pulls it —
you don't reinstall the whole Azure CLI to get a Bicep update.

## Log in before you provision anything

Both tools need to reach your actual Azure subscription. That
authentication goes through the Azure CLI regardless of which IaC
tool issues the API calls:

```bash
az login
az account show
```

`az login` opens a browser to authenticate, then `az account show`
confirms which subscription is currently active — important once
you have more than one subscription (dev vs. production) and don't
want to provision a resource in the wrong one.

## Confirm everything is wired up

Before Lesson 4 introduces the provider block, confirm all three
pieces are in place:

```
$ terraform version
Terraform v1.7.5

$ az bicep version
Bicep CLI version 0.27.1 (41c1e35)

$ az account show --query name -o tsv
LTV-Academy-Dev-Subscription
```

If any of these three commands errors instead of printing a version
or subscription name, fix that before moving on — every lesson from
here forward assumes all three work.

## Key terms

| Term | Meaning |
|---|---|
| Terraform CLI | The standalone `terraform` binary — no separate runtime needed |
| Bicep CLI | Installed as a component of the Azure CLI, via `az bicep install` |
| `az login` | Authenticates the Azure CLI (and by extension Bicep) against your Azure account |
| Active subscription | The Azure subscription `az account show` reports as current — where resources actually get created |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does installing Bicep require the Azure CLI, while installing
Terraform doesn't depend on any other tool?
