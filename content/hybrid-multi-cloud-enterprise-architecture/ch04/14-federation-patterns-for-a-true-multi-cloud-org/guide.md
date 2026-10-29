# Lesson 14 — Federation Patterns for a True Multi-Cloud Org

**Chapter 4 · Hybrid Identity at Enterprise Scale · Lesson 2 of 4**

## What you'll learn

- Why a genuinely multi-cloud org needs exactly one identity source of
  truth, with every cloud federating into it as a relying party
- The real SAML federation pattern between Entra ID and AWS IAM
  Identity Center, including IdP-initiated vs. SP-initiated sign-in
- How Entra ID groups map to AWS permission sets so access decisions
  live in one place instead of being re-created per cloud
- Why federation replaces long-lived IAM access keys with short-lived
  STS credentials, and why that matters for security

## One source of truth, many relying parties

Lesson 13 got Entra ID and AWS talking to each other. This lesson is
about doing it in a way that actually holds up once you're managing
dozens of AWS accounts, several Azure subscriptions, and maybe a third
cloud besides — the point where "multi-cloud" stops being two
environments and starts being an org chart's worth of them.

The pattern that scales is: **Entra ID is the identity source of
truth. Every cloud is a relying party that trusts it.** Not "Azure has
its own identity and AWS has its own identity, and we sync them to
each other" — that's two sources of truth pretending to be one, and it
rots the moment someone changes a group membership in only one place.
Entra ID owns who exists, what groups they're in, and whether their
device and risk signals currently allow access. AWS, and anything
else, just consumes that decision.

## The SAML federation flow, concretely

With Entra ID's AWS IAM Identity Center gallery app configured, there
are two ways a sign-in can start:

- **IdP-initiated**: the user opens the Entra ID "My Apps" portal,
  clicks the AWS tile, and Entra ID sends a signed SAML assertion
  straight to AWS's SSO endpoint.
- **SP-initiated**: the user goes directly to the AWS access portal
  URL first; AWS redirects them to Entra ID to authenticate, then
  bounces them back with the assertion.

Either way, the assertion Entra ID sends isn't just "this user is
real." It carries attributes — group memberships, in particular —
that IAM Identity Center reads to decide which **permission sets**
(AWS's name for a reusable bundle of IAM policies) the user gets, and
in which AWS accounts. Map an Entra ID group like
`aws-prod-readonly` to a `ReadOnlyAccess` permission set on your
production AWS accounts, add someone to that group, and they have
exactly that access everywhere it applies — no AWS console step
required, and no drift between what Entra ID says and what AWS
enforces.

## Why this beats IAM users with access keys

Before this pattern existed — or in orgs that skip it — the default
was: create an IAM user per person per AWS account, generate an access
key, and hope someone rotates it. Those keys are long-lived,
frequently end up hardcoded somewhere they shouldn't, and don't carry
any of the context Entra ID knows about (was this a compliant device?
was there a risk signal on this sign-in?).

Federation replaces that with AWS STS (Security Token Service)
temporary credentials. After the SAML assertion is validated, IAM
Identity Center issues short-lived, auto-expiring credentials scoped
to the assigned permission set. There's no standing secret to leak,
and the access only exists because a real Entra ID sign-in happened
recently enough — which is exactly the lever Chapter 4's next lesson
uses to extend Conditional Access into AWS.

## Avoiding the duplicate-directory trap at scale

The same discipline applies as you add accounts and clouds: don't
let a team "just quickly" create a local IAM user because the
federation setup feels like overhead for one person. Every exception
is a thread back to the three-directory problem. AWS Organizations
plus IAM Identity Center is built to assign permission sets across
many accounts from one place — the friction of doing it right is
mostly a one-time setup cost, not a recurring one, and it's what keeps
one Entra ID group change from requiring a dozen manual AWS edits.

## Key terms

| Term | Meaning |
|---|---|
| Identity source of truth | The one system (Entra ID, in this pattern) that owns who exists and what they're allowed, with every cloud federating into it |
| IdP-initiated / SP-initiated SAML | The two orders a federated sign-in can start in — from the identity provider's portal, or from the service provider's URL |
| Permission set | AWS IAM Identity Center's reusable bundle of IAM policies, assigned to federated users/groups per AWS account |
| AWS STS | Security Token Service; issues the short-lived temporary credentials a federated sign-in actually uses, instead of a standing access key |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
does mapping an Entra ID group to an AWS permission set scale better
than creating IAM users by hand, and what does AWS STS give a
federated sign-in that a long-lived access key never could?
