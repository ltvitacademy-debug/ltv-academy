# Lesson 14 — Writing a Bash Script with the AWS CLI

**Chapter 4 · Multi-Cloud CLI Scripting · Lesson 14 of 32**

## What you'll learn

- How the exact same command-substitution-plus-loop pattern from Lesson 13 applies to the AWS CLI, with no new bash concepts required
- How to list every EC2 instance in a region and pull back each one's state with `aws ec2 describe-instances`
- How AWS's `--query` filter uses the same JMESPath language as `az`, just against a differently-shaped JSON response
- A real quirk of AWS CLI text output — a missing value prints as the literal word `None`, not an empty string — and why your script has to check for it

## Same shape, different cloud

Lesson 13 built a script around one pattern: capture an `az` command's output in a variable with
`$(...)`, loop over it, and run a second `az` call inside the loop to check something per item.
That pattern isn't `az`-specific — it's just bash. The AWS CLI accepts the same `$(...)`,
`for`, and `if` you already know; only the command names and the shape of the JSON they return
change.

## Listing every EC2 instance

```bash
INSTANCE_IDS=$(aws ec2 describe-instances \
  --query "Reservations[].Instances[].InstanceId" \
  --output text)
```

`aws ec2 describe-instances` returns every EC2 instance in the current region, but nested one level
deeper than `az group list` was: AWS groups instances inside "reservations," so the JMESPath has to
walk through `Reservations[].Instances[]` before it reaches `InstanceId`. `--output text` is AWS's
equivalent of `az`'s `-o tsv` — plain lines, one value per line, ready for a `for` loop.

## Pulling the state and an owner tag for each instance

```bash
for ID in $INSTANCE_IDS; do
  STATE=$(aws ec2 describe-instances --instance-ids "$ID" \
    --query "Reservations[0].Instances[0].State.Name" --output text)

  OWNER=$(aws ec2 describe-instances --instance-ids "$ID" \
    --query "Reservations[0].Instances[0].Tags[?Key=='Owner'].Value | [0]" \
    --output text)

  if [ "$OWNER" == "None" ]; then
    echo "MISSING TAG: $ID is $STATE with no Owner tag"
  else
    echo "OK: $ID is $STATE, owned by $OWNER"
  fi
done
```

`--instance-ids "$ID"` narrows the describe call to one instance, so `Reservations[0].Instances[0]`
reaches it directly. `Tags[?Key=='Owner'].Value | [0]` is a JMESPath filter — the `?` matches only
tags whose `Key` equals `"Owner"`, pulls that tag's `Value`, and `| [0]` takes the first (and only)
match. The important quirk: when AWS CLI text output has nothing to print for a value — like a tag
that doesn't exist — it prints the literal word `None` instead of an empty line. That's different
from `az`'s `-o tsv`, which prints nothing at all, so the check has to match `== "None"` instead of
`-z`.

## The complete script

```bash
#!/bin/bash
INSTANCE_IDS=$(aws ec2 describe-instances \
  --query "Reservations[].Instances[].InstanceId" \
  --output text)

for ID in $INSTANCE_IDS; do
  STATE=$(aws ec2 describe-instances --instance-ids "$ID" \
    --query "Reservations[0].Instances[0].State.Name" --output text)
  OWNER=$(aws ec2 describe-instances --instance-ids "$ID" \
    --query "Reservations[0].Instances[0].Tags[?Key=='Owner'].Value | [0]" \
    --output text)

  if [ "$OWNER" == "None" ]; then
    echo "MISSING TAG: $ID is $STATE with no Owner tag"
  else
    echo "OK: $ID is $STATE, owned by $OWNER"
  fi
done
```

Save it as `check-ec2-owners.sh`. The structure is identical to `check-tags.sh` from Lesson 13 —
list, loop, check, report — because that structure was never about Azure or AWS specifically.

## Running it

```
$ chmod +x check-ec2-owners.sh
$ ./check-ec2-owners.sh
OK: i-0a1b2c3d4e5f67890 is running, owned by data-team
MISSING TAG: i-0f9e8d7c6b5a43210 is stopped with no Owner tag
OK: i-0123456789abcdef0 is running, owned by platform-team
```

## Key terms

| Term | Meaning |
|---|---|
| `describe-instances` | The AWS CLI call that returns EC2 instance detail, nested under `Reservations[].Instances[]` |
| `--output text` | AWS's plain-line output format, the equivalent of `az`'s `-o tsv` |
| `Tags[?Key=='X'].Value \| [0]` | A JMESPath filter that finds a specific tag by key and returns its value |
| `None` (AWS text output) | The literal string AWS CLI prints for a missing value in `--output text` — not an empty string |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why does the AWS version of this
script check `[ "$OWNER" == "None" ]` instead of `[ -z "$OWNER" ]`, when Lesson 13's `az` version
used `-z`?
