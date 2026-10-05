# Lesson 19 — AWS Organizations and Service Controls

**Chapter 4 · Security and Compliance · Lesson 19 of 25**

## What you'll learn

- How AWS Organizations structures multiple accounts into a hierarchy of organizational units
- What a service control policy (SCP) actually restricts, and what it never touches
- How SCPs combine down an OU hierarchy — inheritance versus an explicit override
- A real SCP JSON document, read statement by statement

## One Azure subscription's worth of structure, scaled to whole accounts

Where Azure Policy (Lesson 18) governs individual resources, **AWS Organizations** governs at the level of entire **AWS accounts** — the AWS equivalent of having dozens of separate Azure subscriptions and needing one place to manage them centrally. Accounts are grouped into **organizational units (OUs)**, nested into a tree under a single **root**, with one account designated the **management account** that creates and administers the rest.

The console surfaces this hierarchy directly — expanding an OU shows its child OUs and any accounts placed inside it:

![Console screenshot showing the AWS Organizations tree view, with a Frontend OU expanded to show child OUs Application 1 and Application 2.](/courses/cloud-data-governance-azure-and-aws/ch04/19-aws-organizations-and-service-controls/orgs-ou-hierarchy.png)
*A tree view of the organization — Root, then nested OUs (Production, Frontend, Application 1/2).*

Selecting a specific OU shows exactly which accounts live inside it, with the option to move them elsewhere in the hierarchy:

![Console screenshot showing the accounts within a selected OU (Application 1), with Remove links next to each one.](/courses/cloud-data-governance-azure-and-aws/ch04/19-aws-organizations-and-service-controls/orgs-accounts-in-ou.png)
*Accounts inside "Application 1" — the OU an account sits in is what determines which SCPs apply to it.*

## Service control policies: a permission ceiling, not a grant

A **service control policy (SCP)** attaches to the root, an OU, or an individual account, and sets the *maximum available permissions* for every IAM user and role in the accounts it covers — it is a **ceiling**, never a grant. An SCP cannot give anyone permission to do anything; it can only narrow what IAM policies in that account are allowed to permit in the first place. Critically, **SCPs never apply to the management account itself** — only to member accounts.

The console shows exactly which SCPs are attached directly to an OU, and separately, which ones are inherited from a parent:

![Console screenshot showing Service control policies attached to an OU, plus a separate Policies inherited section listing policies from parent OUs.](/courses/cloud-data-governance-azure-and-aws/ch04/19-aws-organizations-and-service-controls/orgs-scp-list.png)
*Policies attached directly to this OU ("Blacklist Redshift," "FullAWSAccess") versus policies inherited from Frontend and Production above it.*

Every account starts with the default `FullAWSAccess` SCP attached, which — true to its name — permits everything, until an organization deliberately replaces or supplements it. The net effective permission ceiling for an account is the **intersection** of every SCP that applies to it: the one directly attached, plus every one inherited from each OU above it up to the root.

## A real SCP, read statement by statement

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyCloudTrailChanges",
      "Effect": "Deny",
      "Action": [
        "cloudtrail:StopLogging",
        "cloudtrail:DeleteTrail",
        "cloudtrail:UpdateTrail"
      ],
      "Resource": "*"
    }
  ]
}
```

This SCP denies three specific CloudTrail actions for every principal in every account it's attached to — meaning no IAM policy in those accounts, no matter how permissive, can ever re-enable the ability to stop or tamper with audit logging. That's the practical value of a ceiling: it's a guarantee that holds even against a future mistake or a compromised IAM policy, which is why SCPs are frequently used specifically to protect logging and auditing infrastructure (a theme Lesson 20 picks up directly).

## Key terms

| Term | Meaning |
|---|---|
| Organizational unit (OU) | A grouping of accounts within an AWS Organization, nested into a hierarchy |
| Management account | The account that creates and administers an organization; SCPs never apply to it |
| Service control policy (SCP) | A permission ceiling attached to the root, an OU, or an account |
| FullAWSAccess | The default SCP attached to every account, permitting everything until changed |

## Lab

Sketch (on paper or in the console) a three-level OU hierarchy: Root → Production → Frontend. Write an SCP that denies `s3:DeleteBucket` everywhere, attach it at the Production level, and explain which accounts end up restricted by it and why the management account would not be.

## Check yourself

- Why is an SCP described as a "ceiling" rather than a "grant"? What can it never do?
- If an SCP denying an action is attached to a parent OU, and a child OU has no SCPs of its own beyond the default, is an account inside that child OU still restricted? Why?
- Why don't SCPs ever apply to the organization's management account?
