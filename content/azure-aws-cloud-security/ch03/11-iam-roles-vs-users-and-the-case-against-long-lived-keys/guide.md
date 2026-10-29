# Lesson 11 — IAM Roles vs. Users, and the Case Against Long-Lived Keys

**Chapter 3 · AWS Identity & Access Security · Lesson 3 of 4**

## What you'll learn

- The real structural difference between an IAM user and an IAM role
  — not "what permissions each one has," but how each one proves who
  it is
- How a trust policy decides who's allowed to assume a role, and how
  that's different from a permissions policy
- Why long-lived access keys on IAM users are a recurring root cause
  in real breaches, independent of how tightly scoped their
  permissions are
- What AWS actually recommends instead, for both workloads and humans

## Users authenticate with something long-lived; roles don't

An **IAM user** is a persistent identity with credentials that exist
until someone rotates or deletes them: a console password, and
optionally one or more **access keys** (an access key ID plus a
secret access key) for programmatic access. Those credentials are
valid indefinitely by default — there's no built-in expiration. If
an access key leaks into a GitHub repo, a log file, or a Slack
message, it keeps working until a human notices and deactivates it.

An **IAM role** has no credentials of its own at all. Instead, it has
a **trust policy** that defines who is allowed to assume it, and
anyone who's permitted does so by calling `sts:AssumeRole`, which
hands back **temporary security credentials** — an access key,
secret key, and session token, all with an expiration measured in
minutes to hours. There's nothing long-lived to leak, because nothing
long-lived was ever issued. If a set of temporary credentials does
leak, the exposure window is whatever's left of that session, not
"forever, until someone notices."

## Trust policy vs. permissions policy

A role actually has two separate policies doing two separate jobs,
and conflating them is a common source of confusion:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

That's the **trust policy** (also called the assume-role policy
document) — attached to the role, it answers only one question: *who
is allowed to assume this role?* Here it's the EC2 service itself,
which is how EC2 instance profiles work. A **permissions policy**
is the ordinary IAM policy attached to the role that answers the
second, separate question: *once assumed, what can this role
actually do?* You can hand someone the ability to assume a role
(trust) without granting any permissions at all, and vice versa — a
role with generous permissions but a tightly scoped trust policy
(say, only a specific CI/CD pipeline's role, via a `Condition` on
`aws:PrincipalTag` or an external ID) only matters to whoever can
clear that trust check first.

## Why workloads should use roles, not embedded keys

The classic mistake: an application running on an EC2 instance, in a
Lambda function, or in an ECS task needs to call other AWS APIs, so
someone creates an IAM user, generates an access key, and puts it in
an environment variable or a config file. That key now lives on disk,
in deployment artifacts, possibly in version control history, and in
every log line that happens to print the environment. AWS's actual
recommendation is to never do this:

```bash
# instead of embedding a user's long-lived access key,
# the instance/function/task is launched with a role attached:

aws ec2 run-instances \
  --iam-instance-profile Name=AppServerRole \
  --image-id ami-0123456789abcdef0 \
  --instance-type t3.micro
```

An **EC2 instance profile**, a **Lambda execution role**, or an
**ECS task role** all do the same thing: the compute service itself
assumes the role on the workload's behalf, the workload's SDK calls
pick up temporary credentials automatically from the instance
metadata service or the Lambda execution environment, and those
credentials rotate themselves continuously. No key to leak, no
rotation to forget, no secret to store in the first place.

## Why humans should use federated identity, not IAM users

The same logic extends to people. AWS's current recommendation for
human access is **IAM Identity Center** (the successor to the older
"AWS SSO" branding), which federates your workforce identity — Entra
ID, Okta, or another IdP — into temporary, role-based access across
every account in your Organization. A human signs in once to the
identity provider, picks the account and role they need, and gets
temporary credentials for that session instead of a standing,
indefinitely valid IAM user. IAM users still exist and are sometimes
genuinely necessary — a handful of break-glass accounts, or systems
that can't yet integrate with federation — but they should be the
exception you can name and justify, not the default way people get
into AWS.

## If you must use access keys

Sometimes a long-lived key really is unavoidable. When it is: rotate
it on a defined schedule, never commit it anywhere a repository
history can retain it, scope its permissions as tightly as the policy
work from Lesson 9 allows, and pull the **IAM credential report**
(`aws iam generate-credential-report`) periodically to see exactly
how old every access key in the account actually is — "we rotate
keys" and "we can prove when every key was last rotated" are
different claims, and only the second one holds up during an
incident.

## Key terms

| Term | Meaning |
|---|---|
| IAM user | A persistent identity with long-lived credentials (password, access keys) that don't expire on their own |
| IAM role | An identity with no credentials of its own; principals assume it via `sts:AssumeRole` to get temporary credentials |
| Trust policy | The policy attached to a role defining who is allowed to assume it — separate from what the role can do |
| Temporary security credentials | Short-lived access key, secret key, and session token issued by STS, with a defined expiration |
| IAM Identity Center | AWS's recommended federation service for human access, replacing standing IAM users with temporary role-based sessions |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what
two separate questions do a role's trust policy and permissions
policy each answer, and why does a leaked set of temporary
credentials matter less than a leaked long-lived access key?
