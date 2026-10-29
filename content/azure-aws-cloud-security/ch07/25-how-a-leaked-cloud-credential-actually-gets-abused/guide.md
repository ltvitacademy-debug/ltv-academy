# Lesson 25 — How a Leaked Cloud Credential Actually Gets Abused

**Chapter 7 · Detecting and Responding to Cloud Attacks · Lesson 1 of 4**

## What you'll learn

- The real ways an AWS access key or Azure service principal secret ends
  up in an attacker's hands in the first place
- The predictable sequence an attacker runs once they have it:
  enumerate, escalate, persist, then act
- Why the very first API calls an attacker makes are almost always
  harmless-looking read-only calls, not an obvious smash-and-grab
- The MITRE ATT&CK Cloud techniques that describe this sequence, so you
  have a shared vocabulary for writing it up

## How the credential actually leaks

This almost never starts with a sophisticated zero-day. The
well-documented leak paths are mundane:

- A developer commits an `.env` file or a hardcoded `aws_secret_access_key`
  to a public GitHub repo. Attackers run automated scanners (the same
  category of tool as TruffleHog or GitGuardian) across public commits
  looking for exactly this pattern, often within minutes of the push.
- A CI/CD pipeline log prints an environment variable during a failed
  build step, and that log is either public or reachable by more people
  than it should be.
- A server-side request forgery (SSRF) vulnerability in a web app lets
  an attacker reach the instance metadata service and pull the
  temporary credentials attached to an EC2 instance role — the attack
  pattern that made IMDSv2's session-token requirement a default
  hardening step industry-wide.
- A phishing email harvests a user's credentials, and if that user is
  an Azure AD Global Administrator or holds standing access to a
  privileged service principal, the attacker now effectively holds that
  identity's cloud permissions too.
- Malware on a developer's laptop reads `~/.aws/credentials` or a
  cached Azure CLI token straight off disk.

## The sequence: enumerate, escalate, persist, act

Once an attacker has a working credential, the pattern is remarkably
consistent across real-world incident writeups (this maps directly to
MITRE ATT&CK's Cloud matrix):

1. **Enumeration (T1087, discovery tactics).** The first calls are
   quiet and read-only: `aws sts get-caller-identity` to confirm what
   the key can do, then `iam list-attached-user-policies`,
   `s3api list-buckets`, `ec2 describe-instances`. In Azure, the
   equivalent is `az account show`, then Microsoft Graph calls to
   enumerate directory roles and app registrations the identity can
   see. None of this looks like an attack in isolation — it looks like
   a script running `describe` commands, which is exactly why it's easy
   to miss.
2. **Privilege escalation attempts (T1078.004, Valid Accounts: Cloud
   Accounts).** If the leaked identity isn't already highly privileged,
   the attacker looks for a path upward — covered in depth next lesson.
3. **Persistence (T1098.001, Account Manipulation: Additional Cloud
   Credentials; T1136.003, Create Account: Cloud Account).** Before
   doing anything destructive, the attacker creates a second access key
   on the same IAM user, a brand-new IAM user or Azure AD app
   registration with its own secret, or an SSH key added to an EC2
   instance. This way, if the original leaked key gets rotated, the
   attacker still has a foothold.
4. **Actual abuse.** Only now does the attacker do something that
   produces a bill or a data loss: launching EC2 instances for
   cryptomining (one of the single most common documented outcomes of
   leaked AWS keys), dumping S3 bucket contents, or using cross-account
   role trust to pivot into a second account entirely.

## Why the order matters to you

Every step before "actual abuse" is detectable and, critically,
produces almost no visible damage on its own. An organization that
only watches for the final stage — a cost spike, a data-loss alert —
is catching this after the credential has already been fully
persisted, which means rotating the original key does nothing. The
defensive posture this course builds toward is catching enumeration
and persistence, not just the payoff.

## Key terms

| Term | Meaning |
|---|---|
| IMDSv2 | AWS's hardened instance metadata service that requires a session token, closing the SSRF-to-credential-theft path that IMDSv1 allowed |
| MITRE ATT&CK Cloud matrix | The shared, public catalog of real-world cloud attack techniques (enumeration, privilege escalation, persistence) this lesson's sequence maps to |
| Persistence (cloud context) | An attacker creating a second, independent credential so that rotating the originally leaked one doesn't remove their access |
| Service principal | Azure AD's non-human identity type, roughly analogous to an AWS IAM role — and a common persistence target because its secrets are easy to add without anyone noticing |

## Check yourself

You're ready for Lesson 26 when you can explain why an attacker's
first API calls after a credential leak are almost always read-only
`describe`/`list` calls, and why persistence happens before the
attacker does anything visibly damaging.
