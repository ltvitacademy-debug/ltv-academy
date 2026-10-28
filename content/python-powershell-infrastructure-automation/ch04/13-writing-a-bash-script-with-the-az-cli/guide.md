# Lesson 13 — Writing a Bash Script with the az CLI

**Chapter 4 · Multi-Cloud CLI Scripting · Lesson 13 of 32**

## What you'll learn

- How the shell-scripting patterns you already know — variables, `if`, `for` — apply directly to `az` CLI commands, with nothing new to learn about bash itself
- How to capture an `az` command's output into a bash variable with command substitution
- How to loop over every resource group in a subscription and check each one for a required tag
- How to report exactly which resource groups fail the check, instead of reading raw `az` output by eye

## Command substitution: capturing az output in a variable

Every `az` command you've run by hand so far prints straight to the terminal. To use that output
*inside* a script, you need **command substitution** — `$(...)` runs a command and hands its
output back as a value you can store:

```bash
RESOURCE_GROUPS=$(az group list --query "[].name" -o tsv)
```

`az group list` returns every resource group in the current subscription. `--query "[].name"` is a
JMESPath filter — the same query language `az` uses everywhere — that pulls just the `name` field
out of each group. `-o tsv` (tab-separated values) strips the JSON formatting down to one plain
name per line, which is exactly the shape a bash `for` loop wants to consume.

## Looping over the result

This is the same `for` loop from the shell-scripting basics you already covered — it just now
iterates over resource group names instead of log file paths:

```bash
for RG in $RESOURCE_GROUPS; do
  echo "Checking $RG..."
done
```

`$RG` takes on each resource group name in turn, one iteration per line in `$RESOURCE_GROUPS`.

## Checking each resource group for a required tag

Inside that loop, a second `az` call and a second command substitution pull the specific tag value
for the group currently being checked:

```bash
ENV_TAG=$(az group show --name "$RG" --query "tags.Environment" -o tsv)

if [ -z "$ENV_TAG" ]; then
  echo "MISSING: $RG has no Environment tag"
else
  echo "OK: $RG -> Environment=$ENV_TAG"
fi
```

`az group show --name "$RG"` fetches the full detail for one group, and `--query "tags.Environment"`
pulls just that tag's value. If the group has no `Environment` tag at all, the query returns
nothing, `-o tsv` prints an empty line, and `[ -z "$ENV_TAG" ]` — the same empty-string test you'd
use checking any other variable — catches it.

## The complete script

```bash
#!/bin/bash
RESOURCE_GROUPS=$(az group list --query "[].name" -o tsv)

for RG in $RESOURCE_GROUPS; do
  ENV_TAG=$(az group show --name "$RG" --query "tags.Environment" -o tsv)

  if [ -z "$ENV_TAG" ]; then
    echo "MISSING: $RG has no Environment tag"
  else
    echo "OK: $RG -> Environment=$ENV_TAG"
  fi
done
```

Save it as `check-tags.sh`. Nothing here is a new bash concept — it's the exact shebang, variable,
`for`, and `if`/`fi` pattern from earlier in this program, pointed at `az` output instead of log
files.

## Running it and reading the output

```
$ chmod +x check-tags.sh
$ ./check-tags.sh
OK: rg-prod-eastus -> Environment=production
MISSING: rg-temp-sandbox has no Environment tag
OK: rg-data-warehouse -> Environment=production
```

One run checks every resource group in the subscription and prints a flat, scannable list — the
kind of report you'd paste straight into a ticket or a Slack message, instead of clicking into each
resource group's tags blade one at a time.

## Key terms

| Term | Meaning |
|---|---|
| Command substitution | `$(...)` — runs a command and captures its output as a value |
| `--query` | `az`'s JMESPath filter, used to pull specific fields out of a JSON response |
| `-o tsv` | Output format flag that strips JSON down to plain tab-separated text, easy for bash to loop over |
| `[ -z "$VAR" ]` | A bash test that's true when `$VAR` is an empty string |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what does `-o tsv` change about
an `az` command's output, and why does that matter for feeding the result into a `for` loop?
