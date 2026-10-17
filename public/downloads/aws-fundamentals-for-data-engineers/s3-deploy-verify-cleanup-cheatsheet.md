# AWS CLI: Deploy, Verify, Clean Up — Cheat Sheet

The exact command loop this course's Lesson 17 walks through by hand,
collected as a quick reference, plus the named-profile and `s3 sync`
commands from Lesson 15 you will actually reach for day to day.

## 1. Configure a named profile (once per identity)

```bash
aws configure --profile dev-sandbox
# AWS Access Key ID, Secret Access Key, region, output format
```

Every command below can take `--profile dev-sandbox` to make sure it
runs against the right account — forgetting it silently falls back to
`[default]`, which is a common source of "why did that touch the wrong
account" confusion.

## 2. Deploy — create a bucket and put an object in it

```bash
aws s3 mb s3://my-unique-bucket-name-2026 --region us-east-1
echo "hello from the CLI" > hello.txt
aws s3 cp hello.txt s3://my-unique-bucket-name-2026/
```

Remember: S3 bucket names are globally unique across **every** AWS
account, not just yours. `mb` fails with `BucketAlreadyExists` if
someone else already has the name.

## 3. Verify — don't assume a clean exit code means it worked

```bash
aws s3 ls s3://my-unique-bucket-name-2026/
aws s3 cp s3://my-unique-bucket-name-2026/hello.txt -   # "-" = stdout
```

The second command prints the object's actual content to the terminal
instead of downloading a file — the fastest way to confirm what's
really in the bucket, not just that something is.

## 4. Sync a whole folder (the command you'll use the most)

```bash
aws s3 sync ./local-folder s3://my-unique-bucket-name-2026/raw/
```

Only new or changed files transfer — critical once "upload a folder"
means thousands of files instead of one.

## 5. Clean up — in order, every time

```bash
aws s3 rm s3://my-unique-bucket-name-2026/hello.txt
aws s3 rb s3://my-unique-bucket-name-2026
```

`rb` (remove-bucket) only works on an **empty** bucket — a deliberate
safety guard. If `rb` fails, something is still in the bucket; `aws s3
ls` to find it before trying again.

## 6. The full loop, one line each

```
mb (make bucket) -> cp (put object) -> ls / cp - (verify) -> rm -> rb (clean up)
```

## 7. Reading a command for the IAM permission it needs

A rough map from CLI command to the policy `Action` it actually calls —
useful for predicting an `AccessDenied` before you hit one:

| Command | Backing IAM action |
|---|---|
| `aws s3 ls` | `s3:ListBucket` |
| `aws s3 cp <file> s3://...` | `s3:PutObject` |
| `aws s3 cp s3://... <file>` | `s3:GetObject` |
| `aws s3 rm` | `s3:DeleteObject` |
| `aws s3 mb` / `rb` | `s3:CreateBucket` / `s3:DeleteBucket` |
| `aws glue start-job-run` | `glue:StartJobRun` |
