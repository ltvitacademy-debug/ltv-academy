# Lesson 4 — AWS IAM Identity Center and External Identity Providers

**Chapter 1 · Hybrid Identity: Connecting On-Prem AD to the Cloud · Lesson 4 of 32**

## What you'll learn

- What AWS IAM Identity Center actually is (formerly AWS SSO) and the problem it solves across multiple AWS accounts
- How it connects to an external identity provider like Entra ID or Okta over SAML
- Why multi-cloud and hybrid organizations often need to bridge AWS identity to the same central directory, not just Azure
- How this closes the loop on the chapter's hybrid identity story before Chapter 2 turns to Zero Trust

## The problem: more than one AWS account

Organizations of any real size almost never run a single AWS account. They use **AWS
Organizations** with multiple accounts — separate production, development, security, and logging
accounts, for example — specifically for isolation, billing clarity, and limiting the blast radius
of any one mistake or breach. Without centralized identity, an administrator would need to create
a separate IAM user in every single account, each with its own password, which leads to permission
sprawl and a painful offboarding process: when someone leaves, access has to be removed from every
account individually.

## AWS IAM Identity Center: one hub for many accounts

**AWS IAM Identity Center** — formerly called **AWS Single Sign-On (AWS SSO)** — is AWS's
centralized hub for workforce access across every account in an AWS Organization. Administrators
define **permission sets**, a named collection of IAM permissions, and assign users or groups to
specific accounts with a specific permission set, all from one place. A user signs in once at the
Identity Center access portal and sees every AWS account and role they've actually been granted,
without ever having separate IAM credentials for each account.

## Connecting to an external identity provider

Identity Center doesn't have to manage its own user directory at all. It can instead be configured
to trust an **external identity provider** over **SAML 2.0** federation (often paired with SCIM
for automatic user and group provisioning). Common external identity providers include Microsoft
Entra ID, Okta, Ping, and Google Workspace. When it's connected to Entra ID, the organization's
existing Entra ID tenant — which is itself already synchronized from on-prem AD, per the earlier
lessons in this chapter — becomes the single source of truth for AWS too. AWS trusts Entra ID's
SAML assertions, and access to AWS accounts follows the exact same group memberships and lifecycle
as everything else the organization already manages centrally.

## Why hybrid and multi-cloud organizations need this bridge

An organization running both Azure and AWS workloads, which is increasingly common, does not want
a third, disconnected identity silo. On-prem AD synchronizing into Entra ID is one bridge, already
covered. Without also bridging AWS, there would be a separate island of AWS-only accounts with no
connection to the rest of the organization's identity story. By federating IAM Identity Center to
the same Entra ID tenant, the exact same employee identity — and its onboarding and offboarding
lifecycle — governs access to the file server, Microsoft 365, Azure, and now every AWS account
too. That closes the loop so there is genuinely one identity across on-prem, Azure, and AWS,
instead of three.

## Example: an engineer joining the cloud platform team

A new cloud engineer is hired. HR and IT create exactly one account, in on-prem AD, on day one —
synchronized to Entra ID per Lesson 2. IT adds that user to an Entra ID group called
`AWS-Platform-Engineers`. Because IAM Identity Center is federated to that same tenant, and that
group is mapped to a permission set in the organization's "Networking" and "Security" AWS
accounts, the new engineer can sign into the Identity Center portal with their normal corporate
credentials and immediately see exactly the AWS accounts and roles they need. No separate
AWS-only account was ever created. When they eventually leave, removing them from that one Entra
ID group removes their AWS access too, along with everything else.

## Key terms

| Term | Meaning |
|---|---|
| AWS IAM Identity Center | AWS's centralized hub (formerly AWS SSO) for workforce access across every account in an AWS Organization |
| Permission set | A named collection of IAM permissions assigned to a user or group for a specific AWS account, from Identity Center |
| External identity provider | A directory outside AWS (e.g. Entra ID, Okta) that IAM Identity Center can trust via SAML instead of managing its own user directory |
| SAML federation | The standard IAM Identity Center uses to trust sign-ins that were already verified by an external identity provider |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: without bridging AWS IAM
Identity Center to the same Entra ID tenant an organization already uses, what identity problem
does an engineer working across Azure and AWS end up with?
