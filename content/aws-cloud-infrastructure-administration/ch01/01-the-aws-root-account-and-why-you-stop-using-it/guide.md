# Lesson 1 — The AWS Root Account and Why You Stop Using It

**Chapter 1 · AWS Account & IAM Fundamentals · Lesson 1 of 32**

## What you'll learn

- What the root user is, and how it's different from every other identity you'll ever create in AWS
- Why root has complete, unrestricted access to the account — and why that's exactly the problem
- The real best-practice sequence: enable MFA on root, create an IAM administrator user, then lock root away
- The short, real list of tasks that still require signing in as root

## The root user: born with the account

When you first create an AWS account, you sign up with an email address and a
password. That identity — the one tied to the sign-up email — is the **root
user**. It isn't an IAM user, it isn't assigned a name, and it can't be
deleted without closing the account entirely. Root is simply *the account
itself*, wearing a login screen.

That matters because root comes with **complete, unrestricted access** to
every AWS service and every resource in the account, including billing. There
is no permissions boundary you can put around root the way you can around an
IAM identity — by design, it can do anything the account is capable of doing.

## Why that's a problem for daily work

Unrestricted access sounds convenient until you think about what it means in
practice: there's no "undo" on a root-level mistake, and if root's email and
password ever leak, whoever has them owns the entire account — every server,
every stored file, every dollar on the bill. AWS's own guidance is blunt about
this: root should almost never be the identity you're signed in as while
doing actual work.

If you worked through this path's Azure course, you've effectively seen a
version of this already — Entra ID's **Global Administrator** role is the
same idea: the highest-privilege identity in the directory, one best practice
says to protect carefully and avoid using day to day. AWS just draws the line
even more sharply, because root isn't a *role* you can strip away — it's the
account's one unremovable super-identity.

## Example: securing root the real way

The standard, documented sequence looks like this, done once, right after an
account is created:

1. **Enable MFA (multi-factor authentication) on the root user** — a second
   verification step beyond the password, so a leaked password alone isn't
   enough to sign in as root.
2. **Create an IAM user with administrator permissions** (the `AdministratorAccess`
   managed policy is the common choice) and start signing in as *that* user
   for everyday administration instead.
3. **Store the root password and MFA device somewhere safe** — a password
   manager or a physical safe — and stop using root for anything routine.

From that point on, root is something you reach for a few times a year, not
something you log into Monday morning.

## What still requires root

A handful of account-level actions genuinely can't be delegated to an IAM
user and do require signing in as root — among them, closing the AWS account
entirely, changing the root user's own email address or password, viewing
certain billing and tax-related documents, changing the account's AWS Support
plan, and restoring an IAM user's permissions if that user has locked
themselves out of the account. Everything else — launching servers, managing
storage, writing IAM policies, reading logs — belongs to the IAM admin user
you create in step 2 above.

## Key terms

| Term | Meaning |
|---|---|
| Root user | The identity created with the AWS account itself, tied to the sign-up email, with unrestricted access to everything in the account |
| MFA | Multi-factor authentication — a second verification step beyond a password |
| IAM administrator user | An IAM user granted broad permissions (e.g., `AdministratorAccess`) and used for daily admin work instead of root |
| Least privilege | Giving an identity only the access it actually needs, never more by default |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why is
*locking root away* a better strategy than simply being careful while signed
in as root?
