# Lesson 15 — Parsing CLI JSON Output with jq

**Chapter 4 · Multi-Cloud CLI Scripting · Lesson 15 of 32**

## What you'll learn

- Why `--query` and `--output text` start to get fragile once you need more than one or two fields out of a response
- What `jq` is, and why it exists specifically to make JSON a first-class citizen inside a bash script
- The core `jq` syntax: `.`, `[]`, `select()`, and `-r`
- How to pipe real `az` and `aws` JSON output straight into a `jq` filter to pull exactly the fields a script needs

## Where --query starts to strain

Lessons 13 and 14 leaned on `--query` and `-o tsv` / `--output text` to flatten JSON down to plain
lines. That works well for pulling one or two fields. It gets awkward fast once you need several
fields together, want to filter on a condition, or want to reshape the result — JMESPath inside a
`--query` string is powerful, but it's still one long string crammed into a command-line argument.
**`jq`** is a separate command-line tool built for exactly this: it reads JSON from standard input
and lets you query, filter, and reshape it with its own small, purpose-built language.

## Why this matters for both clouds

Both the `az` CLI and the `aws` CLI can emit raw JSON with `--output json` (`az`'s own default is
already JSON). Piped into `jq`, that JSON becomes something a script can slice however it needs —
instead of fragile text parsing with `grep` and `cut`, or juggling an increasingly complicated
`--query` string, the JSON stays JSON the whole way through, and `jq` does the extraction.

## The core jq syntax

```bash
az vm list --output json | jq '.'
```

`.` by itself is the **identity filter** — it just pretty-prints whatever JSON came in. From there:

```bash
az vm list --output json | jq -r '.[] | .name'
```

`.[]` iterates over every element of the top-level array `az vm list` returns. `.name` then pulls
the `name` field from each one. `-r` means **raw output** — print the result as plain text,
without the double quotes `jq` would otherwise wrap around a string value.

## Filtering with select()

```bash
aws ec2 describe-instances --output json \
  | jq -r '.Reservations[].Instances[] | select(.State.Name == "running") | .InstanceId'
```

This walks the same nested `Reservations[].Instances[]` shape from Lesson 14, but instead of
calling `describe-instances` once per instance to check its state, `select(.State.Name == "running")`
filters the whole JSON response down to only the running instances in one pass, and `.InstanceId`
pulls just the ID from what's left. One `aws` call, one `jq` filter, no loop required at all.

## Combining fields into one readable line

```bash
az vm list --output json \
  | jq -r '.[] | "\(.name) (\(.location))"'
```

`\(...)` inside a `jq` string is **string interpolation** — it drops the value of `.name` and
`.location` straight into a formatted line, so the output reads `web-vm-01 (eastus)` instead of
requiring a second script step to stitch two separate fields together.

## Key terms

| Term | Meaning |
|---|---|
| `jq` | A command-line JSON processor — reads JSON from input, filters/reshapes it with its own query language |
| `.` | The identity filter — pretty-prints the input unchanged |
| `.[]` | Iterates over every element of a JSON array |
| `select(condition)` | Keeps only the elements where `condition` is true |
| `-r` | Raw output — prints string values without surrounding quotes |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what does
`select(.State.Name == "running")` do inside a `jq` filter, and why is filtering with `jq` on one
JSON response often simpler than calling `describe-instances` once per instance the way Lesson 14 did?
