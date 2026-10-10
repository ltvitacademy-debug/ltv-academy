# Lesson 14 — Enterprise Identity Landscape

**Chapter 3 · Enterprise Design · Lesson 14 of 22**

## What you'll learn

- Why identity has to be designed at the enterprise level, not configured independently inside each system
- How Salesforce can act as either a SAML service provider or a SAML identity provider, and why the distinction matters
- What Identity Connect and SCIM-based provisioning solve that SSO alone doesn't
- How enterprise identity design connects to the security concerns from Lesson 7

## One identity, many systems

Every employee at a reasonably sized enterprise touches multiple systems in a single day: email, Salesforce, the ERP, an HR self-service portal, dozens of smaller SaaS tools. If each system manages that employee's credentials independently, the enterprise ends up with the employee maintaining a dozen separate passwords, IT managing a dozen separate account lifecycles, and a near-certainty that when the employee leaves, at least one of those accounts gets forgotten and stays active long after it should have been disabled. **Enterprise identity** is the discipline of managing a person's digital identity once, centrally, and letting every system — Salesforce included — trust that central source rather than maintaining its own independent notion of who that person is.

## Salesforce on both sides of SAML

Salesforce supports SAML-based single sign-on in two distinct roles, and a System Architect needs to be precise about which role applies in a given design:

- **Salesforce as the service provider (SP).** The enterprise's own identity provider (a corporate IdP) handles authentication, and Salesforce trusts assertions that IdP sends it. The identity provider does most of the setup work; it posts SAML assertions to Salesforce using the SAML Web Browser POST profile, and Salesforce verifies each assertion against its own configuration before granting access. This is the far more common enterprise scenario: an employee logs into the corporate identity provider once, and that single login grants access to Salesforce along with every other connected application.
- **Salesforce as the identity provider (IdP).** Salesforce itself authenticates the user and then vouches for them to other, external service providers, each configured in Salesforce as a SAML-enabled connected app. This is less common in a large enterprise (where a dedicated corporate IdP usually plays that role instead), but it matters for smaller organizations or specific use cases where Salesforce is the central hub employees log into first.

## Just-in-time provisioning and ongoing sync

SSO solves authentication — proving who someone is — but an enterprise also needs to solve provisioning: making sure the right Salesforce user record exists, with the right profile and permissions, in the first place. **Just-in-time (JIT) provisioning** can automatically create a Salesforce user account the first time someone signs in through the corporate IdP, using attributes carried in the SAML assertion. For ongoing synchronization after that initial creation — keeping a user's Salesforce record current as their role, department, or employment status changes in the system of record — enterprises commonly use **Identity Connect** to push updates from Active Directory into Salesforce, or the open **SCIM (System for Cross-Domain Identity Management)** standard for the same purpose across other directory systems. Without one of these mechanisms, user records drift out of sync with the HR system of record exactly the way Lesson 3's "dueling systems of record" problem predicts.

## Where this connects to enterprise security

Enterprise identity design is inseparable from the enterprise security concerns Lesson 7 introduced. A compromised identity provider, or a Mover-type access gap where an employee changes roles but retains their old access (a pattern familiar from access governance generally), is exactly the kind of enterprise-wide risk that a well-designed identity landscape is meant to close off. A System Architect designing Salesforce's place in this landscape has to treat identity not as a Salesforce configuration detail, but as one piece of an enterprise-wide identity and access management strategy that spans every connected system.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise identity | The discipline of managing a person's digital identity once, centrally, with every system trusting that central source |
| Salesforce as SAML service provider | Salesforce trusts SAML assertions sent by a corporate identity provider to authenticate users |
| Salesforce as SAML identity provider | Salesforce itself authenticates users and vouches for them to other connected service providers |
| Just-in-time (JIT) provisioning | Automatically creating a Salesforce user account the first time someone signs in through a trusted identity provider |
| Identity Connect | A Salesforce tool that pushes user record updates from Active Directory into Salesforce |

## Lab

A new employee joins a company that uses a corporate identity provider for SSO into Salesforce and several other tools. Walk through what should happen, step by step, from their first day (account provisioning) through a mid-tenure role change (a department transfer) to their eventual departure (offboarding), identifying at each step whether SSO, JIT provisioning, or an ongoing sync mechanism like Identity Connect or SCIM is doing the work. Note specifically where a gap in this design would leave a stale, still-active Salesforce account behind.

## Check yourself

Can you explain the difference between Salesforce acting as a SAML service provider versus a SAML identity provider? Can you describe what problem JIT provisioning and ongoing identity sync each solve, and why SSO alone doesn't solve either one?

Sources: [Identity Basics: Protocols](https://trailhead.salesforce.com/en/modules/identity_basics/units/identity_basics_protocols), [Salesforce Single Sign-On guide](https://resources.docs.salesforce.com/212/latest/en-us/sfdc/pdf/salesforce_single_sign_on.pdf)
