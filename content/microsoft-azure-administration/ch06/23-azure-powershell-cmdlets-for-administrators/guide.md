# Lesson 23 — Azure PowerShell Cmdlets for Administrators

**Chapter 6 · Azure CLI & PowerShell Administration · Lesson 23 of 32**

## What you'll learn

- What the `Az` module is, and why it's the one you install, not the retired `AzureRM` module
- How `Connect-AzAccount` and `Set-AzContext` map directly onto `az login` and `az account set`
- Why Azure's own cmdlets — `Get-AzVM`, `New-AzResourceGroup`, `Remove-AzResourceGroup` — follow the
  exact Verb-Noun pattern from the PowerShell Fundamentals course
- How to read an Az cmdlet you've never seen before, the same way you learned to read any cmdlet

## The `Az` module, not `AzureRM`

Azure PowerShell ships as a module called **`Az`**, installed once per machine:

```
Install-Module -Name Az -Scope CurrentUser
```

If you ever see tutorials referencing a module called `AzureRM`, that's the older, retired
predecessor — Microsoft deprecated it in favor of `Az`, which is cross-platform (Windows, macOS,
Linux, inside PowerShell 7+) in a way `AzureRM` never was. Every cmdlet in this lesson comes from
`Az`, and it's the only one worth installing today.

## Signing in: `Connect-AzAccount` and `Set-AzContext`

Lesson 21's `az login` and `az account set --subscription` have direct PowerShell equivalents:

```
Connect-AzAccount

Get-AzSubscription

Set-AzContext -Subscription "Contoso-Production"
```

`Connect-AzAccount` opens the same browser sign-in flow `az login` does. `Get-AzSubscription` is
the PowerShell version of `az account list`. `Set-AzContext -Subscription` is the PowerShell
version of `az account set --subscription` — it fixes which subscription every cmdlet you run
afterward targets, for exactly the same reason Lesson 21 cared about it on the CLI side.

## The pattern you already know: Verb-Noun

The PowerShell Fundamentals course's Lesson 3 taught the core idea: every cmdlet is `Verb-Noun`,
drawn from an approved verb list, which makes cmdlets guessable instead of requiring memorization.
Azure's own cmdlets follow that pattern with zero exceptions — Microsoft just supplies the nouns:

```
Get-AzVM                                    # list virtual machines
Get-AzVM -ResourceGroupName "rg-cli-demo"   # list VMs in one resource group
New-AzResourceGroup -Name "rg-ps-demo" -Location "eastus"
Remove-AzResourceGroup -Name "rg-ps-demo" -Force
```

`Get` retrieves, `New` creates, `Remove` deletes — the same three verbs from Lesson 3's approved
list, now applied to Azure nouns (`AzVM`, `AzResourceGroup`) instead of filesystem nouns
(`ChildItem`, `Item`). If you can already guess that stopping a VM is probably `Stop-AzVM`
without being told — and it is — that's the Verb-Noun pattern doing exactly what it's designed to
do.

## Side by side: the same task, two tools

Lesson 22's resource-group creation, as a direct comparison:

```
# Azure CLI
az group create --name rg-ps-demo --location eastus

# Azure PowerShell
New-AzResourceGroup -Name "rg-ps-demo" -Location "eastus"
```

Same Azure Resource Manager call underneath, same result, two different syntaxes layered on top.
The CLI uses `--parameter value`; PowerShell uses `-Parameter "value"` (PowerShell's named-parameter
convention from Lesson 3 of that course, now with an `Az` prefix on every noun). Which one you use
day to day usually comes down to whichever shell you're already working in — a Windows-admin-heavy
shop tends to lean PowerShell; a cross-platform or Linux-adjacent shop tends to lean the CLI — not
because one is more capable than the other.

## Key terms

| Term | Meaning |
|---|---|
| `Az` module | The current, cross-platform Azure PowerShell module; replaces the retired `AzureRM` |
| `Connect-AzAccount` | Signs in to Azure from PowerShell; the equivalent of `az login` |
| `Set-AzContext` | Sets the active subscription for the session; the equivalent of `az account set` |
| Verb-Noun | The naming pattern every Az cmdlet follows — `Get-AzVM`, `New-AzResourceGroup` |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does seeing `Stop-AzVM` for
the first time let you correctly guess what it does, and what's the PowerShell equivalent of
`az account set --subscription`?
