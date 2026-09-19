# Lesson 14 — Azure PowerShell Module Basics

**Chapter 4 · PowerShell for Azure & SQL · Lesson 14 of 18**

## What you'll learn

- The `Az` module — what it is, and the real naming history behind it
- `Install-Module Az` and why `-Scope CurrentUser` is usually the right call
- How `Az` cmdlets are organized, and why that organization matters once you're searching for one
- Checking what's installed with `Get-InstalledModule`

## Az: the current standard

PowerShell doesn't talk to Azure natively — that ability comes from
a module, a package of additional cmdlets you install on top of
PowerShell. The current one, and the one this course uses throughout
Chapter 4, is simply called **`Az`**.

It's worth knowing the naming history, because you'll still run
into it in older scripts, blog posts, and Stack Overflow answers
online: Azure's PowerShell support used to ship as a module called
**`AzureRM`**. Microsoft retired `AzureRM` in favor of `Az` — same
underlying idea, cleaner cmdlet naming, and active development only
happens on `Az` now. If you ever see a script starting with
`Import-Module AzureRM`, that's a signal it's old enough to need
updating before you trust it.

## Installing it

```powershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery
```

- **`-Name Az`** — installs the whole `Az` module family, not just
  one piece of it
- **`-Scope CurrentUser`** — installs it for your account only,
  which usually doesn't require administrator rights (the
  alternative, `-Scope AllUsers`, needs an elevated prompt and
  affects every account on the machine)
- **`-Repository PSGallery`** — the official PowerShell Gallery,
  Microsoft's trusted source for modules; PowerShell will prompt to
  confirm this on first use of an untrusted repository, which is
  expected

The install itself can take a few minutes — `Az` is actually dozens
of smaller modules (`Az.Accounts`, `Az.Sql`, `Az.Storage`, and so on)
bundled together, one per Azure service area.

## How Az cmdlets are organized

That "dozens of smaller modules" structure isn't just installer
trivia — it's why `Az` cmdlets are consistently named
`Verb-Az<Service><Noun>`:

```powershell
Connect-AzAccount        # Az.Accounts — signing in (Lesson 15)
Get-AzSqlServer          # Az.Sql — SQL Server resources
New-AzResourceGroup      # Az.Resources — resource groups
Get-AzStorageAccount     # Az.Storage — storage accounts
```

Once you know the pattern, guessing a cmdlet name gets a lot easier
— the same `Verb-Noun` instinct from Lesson 3, with an `Az<Service>`
slotted in the middle. `Get-Command -Module Az.Sql` lists every
cmdlet in just the SQL-related piece, which is usually a faster way
to find what you need than searching broadly.

## Confirming what's installed

```powershell
Get-InstalledModule -Name Az -ListAvailable
```

Worth running before you assume `Az` is ready to go, especially on a
machine you didn't set up yourself — a fresh Windows install or a
teammate's laptop may have nothing installed yet, or may still have
the old `AzureRM` module sitting around instead.

## Key terms

| Term | Meaning |
|---|---|
| `Az` module | The current standard PowerShell module for managing Azure resources |
| `AzureRM` | The retired predecessor to `Az` — still seen in older scripts online |
| `-Scope CurrentUser` | Installs a module for your account only, usually without needing admin rights |
| `Verb-Az<Service><Noun>` | The naming pattern `Az` cmdlets follow, e.g. `Get-AzSqlServer` |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking:
if you found a script online starting with `Import-Module AzureRM`,
what would that tell you, and what module should it actually be
using today?
