# Lesson 16 — A Script That Reconciles Resources Across Both Clouds

**Chapter 4 · Multi-Cloud CLI Scripting · Lesson 16 of 32**

## What you'll learn

- How to combine everything from this chapter — az, aws, bash control flow, and jq — into one script
- How to count compute instances in Azure and AWS separately, then compare them side by side
- How bash arithmetic (`$(( ))`) and numeric comparisons (`-gt`, `-eq`) let a script react to the numbers it just computed, not just print them
- Why this kind of reconciliation script is exactly the shape of real multi-cloud operations work

## What "reconciling" means here

A company running workloads in both Azure and AWS eventually needs one question answered without
opening two separate consoles: **how much compute is actually running in each cloud right now, and
how do the two compare?** That's a reconciliation report — not a fix, just an accurate, automated
count from both sides, side by side. It's the same instinct behind Lesson 13's tag check and
Lesson 14's owner check: don't trust a mental tally across dozens of resources, compute it.

## Counting Azure VMs with jq

```bash
AZURE_VMS=$(az vm list --output json | jq '. | length')
```

`az vm list --output json` returns every VM as a JSON array. `jq '. | length'` takes the identity
filter's output — the whole array, unchanged — and counts its elements. No loop needed; `jq`
counts the array in one step, and the result lands straight in `$AZURE_VMS`.

## Counting non-terminated AWS instances with jq

```bash
AWS_INSTANCES=$(aws ec2 describe-instances --output json \
  | jq '[.Reservations[].Instances[] | select(.State.Name != "terminated")] | length')
```

This reuses Lesson 15's `select()` pattern, but wraps the filtered result in `[...]` to build a new
array out of only the non-terminated instances, then takes `length` of *that* array. Terminated
instances still show up in `describe-instances` for a while after they're gone, so excluding them
is what makes this a fair count of instances actually running or stopped, not a stale number.

## Comparing the two counts

```bash
TOTAL=$((AZURE_VMS + AWS_INSTANCES))

if [ "$AZURE_VMS" -gt "$AWS_INSTANCES" ]; then
  echo "Azure has more compute instances than AWS."
elif [ "$AWS_INSTANCES" -gt "$AZURE_VMS" ]; then
  echo "AWS has more compute instances than Azure."
else
  echo "Both clouds have the same number of compute instances."
fi
```

`$(( ))` is bash **arithmetic expansion** — it evaluates `AZURE_VMS + AWS_INSTANCES` as numbers and
hands back the sum, unlike `$(...)`, which runs a command. `-gt` ("greater than") is the numeric
comparison test inside `[ ]`, the direct counterpart to the string test `==` used back in Lesson 14.

## The complete script

```bash
#!/bin/bash
echo "=== Multi-Cloud Compute Inventory ==="

AZURE_VMS=$(az vm list --output json | jq '. | length')
echo "Azure VMs: $AZURE_VMS"

AWS_INSTANCES=$(aws ec2 describe-instances --output json \
  | jq '[.Reservations[].Instances[] | select(.State.Name != "terminated")] | length')
echo "AWS EC2 instances (non-terminated): $AWS_INSTANCES"

TOTAL=$((AZURE_VMS + AWS_INSTANCES))
echo "Combined total: $TOTAL"

if [ "$AZURE_VMS" -gt "$AWS_INSTANCES" ]; then
  echo "Azure has more compute instances than AWS."
elif [ "$AWS_INSTANCES" -gt "$AZURE_VMS" ]; then
  echo "AWS has more compute instances than Azure."
else
  echo "Both clouds have the same number of compute instances."
fi
```

Save it as `multi-cloud-inventory.sh`. Every piece of it came from this chapter: `az` and `aws`
commands with `--output json`, `jq` doing the counting and filtering, and the shebang/variable/`if`
pattern from the very first shell-scripting lesson in this program — just now comparing two clouds
instead of checking one.

## Running it

```
$ chmod +x multi-cloud-inventory.sh
$ ./multi-cloud-inventory.sh
=== Multi-Cloud Compute Inventory ===
Azure VMs: 14
AWS EC2 instances (non-terminated): 9
Combined total: 23
Azure has more compute instances than AWS.
```

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Comparing counts or state across two systems to get one accurate, combined picture |
| `jq '. \| length'` | Counts the elements of a JSON array in one step, no loop required |
| `$(( ))` | Bash arithmetic expansion — evaluates a numeric expression |
| `-gt` / `-eq` | Numeric comparison tests inside `[ ]`, the counterpart to string tests like `==` |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: why does the AWS count in this
script filter out instances where `State.Name == "terminated"`, and what would the combined total
have looked like without that filter?
