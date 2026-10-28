# Lesson 18 — Managing Resources with AWS CLI Commands

**Chapter 5 · AWS CLI & Automation Basics · Lesson 18 of 32**

## What you'll learn

- The `aws <service> <command>` pattern that every AWS CLI call follows
- Real examples across services: `aws ec2 describe-instances`, `aws s3 ls`, `aws s3 cp`
- Choosing `--output table`, `json`, or `text`
- Filtering with `--query` and JMESPath, and why AWS's nested JSON shapes the query you write

## The `aws <service> <command>` pattern

With credentials configured (Lesson 17), every AWS CLI command follows the same shape:
`aws <service> <command> --<parameter> <value>`. The service name tells you which API you're
calling; the command tells you the action:

```
aws ec2 describe-instances          # list EC2 instances
aws s3 ls                           # list S3 buckets
aws s3 ls s3://my-bucket            # list objects inside a bucket
aws s3 cp report.csv s3://my-bucket # upload a local file to S3
aws iam list-users                  # list IAM users
```

Once you recognize the pattern, you can often guess the command you need: `aws ec2` administers
EC2, so `aws ec2 stop-instances` is a reasonable guess, and it's correct. This is the same
discoverability idea behind the Azure CLI's `az <group> <command>` pattern covered in the
prerequisite course — a predictable shape beats memorizing an arbitrary command list, and it holds
across almost every AWS service you'll touch in this course.

## Choosing an output format

Every `aws` command returns JSON by default. `--output` reformats that for the way you're working:

```
aws ec2 describe-instances --output table   # human-readable columns, good while working interactively
aws ec2 describe-instances --output json    # full JSON, good for piping into another tool
aws ec2 describe-instances --output text    # tab-separated, no formatting, good for scripting
```

`table` is what you reach for while reading results at a terminal. `text` strips the formatting
down to something a shell script can loop over line by line — exactly what Lesson 19's CloudShell
script does. `json` stays the default because it's the format the CLI itself operates on before
`--output` reformats it for display, which matters once `--query` enters the picture.

## Filtering with `--query` and JMESPath

An account with forty running instances returns forty objects' worth of detail you probably don't
want all of. `--query` applies a **JMESPath** expression to the raw JSON before `--output` ever
touches it — the same JMESPath concept the Azure CLI's `--query` uses, now against AWS's own JSON
shape:

```
aws ec2 describe-instances \
  --query "Reservations[].Instances[].{ID:InstanceId,Type:InstanceType,State:State.Name}" \
  --output table
```

The query itself has to match how AWS actually nests the data: `describe-instances` doesn't return
a flat list of instances — it returns a list of **Reservations**, and each reservation contains a
list of **Instances**. `Reservations[].Instances[]` flattens both levels into one list of instance
objects, and the `{ID:InstanceId, Type:InstanceType, State:State.Name}` part builds a smaller
object per instance, picking out just the three fields you asked for, including the nested
`State.Name` field, out of the dozens each instance object actually has.

## Key terms

| Term | Meaning |
|---|---|
| `aws <service> <command>` | The pattern every AWS CLI call follows, e.g. `aws ec2 describe-instances` |
| `--output` | Formats results: `table` for reading, `text` for scripting, `json` by default |
| `--query` | Applies a JMESPath expression to filter and reshape the raw JSON before `--output` |
| Reservations / Instances | The two nested levels `aws ec2 describe-instances` actually returns |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why does the `--query` expression
for EC2 instances need `Reservations[].Instances[]` instead of just `Instances[]`, and what's the
difference between what `--query` does and what `--output` does?
