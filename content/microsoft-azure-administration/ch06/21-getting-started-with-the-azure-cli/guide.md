# Lesson 21 — Getting Started with the Azure CLI

**Chapter 6 · Azure CLI & PowerShell Administration · Lesson 21 of 32**

## What you'll learn

- How to sign in and work across more than one subscription, not just the one you land in by default
- The `az <group> <command>` pattern, generalized across every service you've used so far
- The difference between `--output table`, `json`, and `tsv`, and when each one actually helps
- How `--query` and JMESPath let you filter a command's output down to just what you need

## Beyond `az login`: picking the right subscription

The prerequisite course's CLI lesson covered `az login` and `az account show` — signing in, and
confirming which subscription is active. A real administrator's account is almost always attached
to more than one subscription (a dev subscription, a production subscription, maybe a client's),
and the CLI defaults to whichever one it decides is "current," which is not always the one you
want. Fix that explicitly:

```
az account list --output table

az account set --subscription "Contoso-Production"
```

`az account list` shows every subscription your signed-in account can reach. `az account set
--subscription` switches the active one — by name or by subscription ID — and every command you
run after that targets that subscription until you switch again. Getting this wrong is one of the
most common real mistakes: running `az vm create` against the wrong subscription because nobody
checked which one was active first.

## The `az <group> <command>` pattern, generalized

By now you've typed `az group create`, `az vm list`, and a few others without necessarily noticing
the shape repeating. It's not a coincidence — the entire Azure CLI is organized into **command
groups**, one per service area, and every command follows `az <group> <command> --<parameter>
<value>`:

```
az group    create / list / delete / show      # resource groups
az vm       create / list / start / stop       # virtual machines
az storage  account create / list              # storage
az network  vnet create / subnet create        # networking
```

Once you know a handful of groups, you can often guess the command you need for a new one —
`az vm` administers VMs, so `az vm restart` is a reasonable first guess, and it's correct. This is
the exact same discoverability idea behind PowerShell's Verb-Noun pattern (Lesson 23 covers the
Azure PowerShell side of this directly) — a predictable shape beats memorizing an arbitrary list
of commands.

## Choosing an output format

Every `az` command returns JSON by default — correct, but dense and hard to scan in a terminal.
`--output` changes that:

```
az vm list --output table      # human-readable columns — good for reading
az vm list --output json       # full JSON — good for piping into another tool
az vm list --output tsv        # tab-separated, no headers — good for scripting
```

`table` is what you reach for while working interactively. `tsv` is what you reach for inside a
script, because it's trivial to loop over with a shell `for` loop (Lesson 24 uses exactly that).
`json` is the default for a reason — it's the format every other tool, including `--query` itself,
actually operates on before `--output` reformats it for display.

## Filtering with `--query` and JMESPath

A subscription with forty VMs returns forty rows you probably don't want all of. `--query` applies
a **JMESPath** expression — a query language for JSON — to the command's raw output before it
ever reaches `--output`:

```
az vm list \
  --query "[].{Name:name, Size:hardwareProfile.vmSize, RG:resourceGroup}" \
  --output table
```

`[]` means "every item in the list." The `{Name:name, Size:hardwareProfile.vmSize, RG:resourceGroup}`
part builds a new, smaller object per VM, picking out just `name`, the nested `hardwareProfile.vmSize`
field, and `resourceGroup` — exactly the three columns you asked for, out of the dozens each VM
object actually has. `--query` and `--output` do two different jobs: `--query` picks *which* data
comes back, `--output` decides *how* it's displayed, and you use them together constantly.

## Key terms

| Term | Meaning |
|---|---|
| Active subscription | The subscription `az` commands target until you run `az account set` again |
| Command group | The service-area prefix in `az <group> <command>`, e.g. `vm`, `group`, `storage` |
| `--output` | Formats command results — `table` for reading, `tsv` for scripting, `json` by default |
| JMESPath | The query language `--query` uses to filter and reshape JSON output |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what's the difference between
what `--query` does and what `--output` does, and why would a script use `--output tsv` instead
of `--output table`?
