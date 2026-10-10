# Lesson 8 — Identity Providers

**Chapter 2 · Enterprise Identity · Lesson 8 of 24**

## What you'll learn

- How to enable Salesforce as an Identity Provider at the org level
- What a "Service Provider" definition inside Salesforce actually configures
- The relationship between enabling the IdP feature and defining individual SPs it will vouch for
- Why My Domain is a hard prerequisite for Salesforce to act as an IdP

## Enabling the Identity Provider feature

Before Salesforce can vouch for a user's identity to any outside system, the **Identity Provider** feature itself has to be turned on at the org level. From Setup, search Quick Find for **Identity Provider**. The page issues (or lets you upload) a certificate Salesforce will use to sign the assertions it sends to service providers:

![The Identity Provider setup page in Salesforce Setup, showing the certificate selection and Enable Identity Provider option.](/courses/identity-and-access-management/ch02/08-identity-providers/identity-provider-setup.png)
*Enabling the Identity Provider feature — the first step before Salesforce can vouch for any user's identity to an outside application.*

This is a prerequisite, not the whole job: enabling the feature makes Salesforce *capable* of being an IdP, but it doesn't yet tell Salesforce *which* outside systems to vouch for, or under what conditions. That's what Service Provider definitions handle.

My Domain (Lesson 13) must be enabled and deployed before the Identity Provider feature can be turned on — Salesforce needs a stable, org-specific domain to serve as the basis for the Issuer/Entity ID values it will put into every assertion it signs.

## Defining a Service Provider

Once the IdP feature is on, each external application Salesforce will vouch for needs its own **Service Provider** definition, found under Identity Provider → Service Providers, or created as a **Connected App** (Lesson 7) with SAML or OAuth enabled on the receiving end. For a SAML-based SP, Salesforce needs:

- The SP's **Entity ID** (so Salesforce knows which audience the assertion is meant for).
- The SP's **Assertion Consumer Service (ACS) URL** (where to POST the signed assertion).
- Which **Salesforce attribute** maps to the SP's expected subject identifier (Federation ID, username, or a custom field).

This is the mirror image of the SAML Single Sign-On Setting from Lesson 4: there, Salesforce was the SP trusting an external IdP's certificate. Here, Salesforce is the IdP, and the external system trusts Salesforce's certificate instead.

When the external SP is itself another Salesforce org, the setup is often done as a **Connected App** in the IdP org that represents the SP side of the relationship, as shown here:

![A Connected App definition screen in the Identity Provider org, configured to represent a Service Provider, with SAML-related fields visible.](/courses/identity-and-access-management/ch02/08-identity-providers/define-connected-app-for-service-provider.png)
*Defining a Connected App in the IdP org to represent the Service Provider it will issue assertions for.*

## Why this matters architecturally

Turning Salesforce into an IdP is what makes it possible for a user who's already logged into Salesforce to single-sign-on into other systems — a help desk tool, a partner portal, a second Salesforce org — without logging in again. This is the foundation Lessons 9 (Salesforce as IdP, in depth) and 15–16 (customer/partner identity, Experience Cloud) build directly on. Architecturally, the decision to make Salesforce an IdP is also a decision about **where the authoritative identity lives** for an organization: if Salesforce is the IdP for a dozen downstream apps, then Salesforce's user records, deactivation process, and MFA enforcement become the single point that controls access everywhere downstream, which raises the stakes on getting Salesforce's own identity hygiene right.

## Key terms

| Term | Meaning |
|---|---|
| Identity Provider (IdP) feature | The org-level setting that enables Salesforce to vouch for user identities to outside systems |
| Service Provider definition | The record describing a specific external app Salesforce will issue assertions for |
| Entity ID | The unique identifier for an IdP or SP in a SAML trust relationship |
| Assertion Consumer Service (ACS) URL | The SP endpoint that receives a signed assertion |

## Lab

Scenario: Your client runs Salesforce as the central login for employees and wants to add a third-party expense-reporting tool as a new downstream application, using Salesforce as the IdP. Write a short setup plan (150–250 words) listing, in order:

1. The org-level prerequisite that must already be in place before enabling the Identity Provider feature.
2. What specifically needs to be defined once the feature is on, to let the expense tool trust Salesforce.
3. Two pieces of information you'd need to collect from the expense-reporting vendor before you could finish the Service Provider definition.

## Check yourself

- What has to be true about My Domain before Salesforce can be enabled as an Identity Provider?
- What's the difference between "enabling the Identity Provider feature" and "defining a Service Provider"?
- Why does making Salesforce the IdP for several downstream apps raise the stakes on Salesforce's own user deactivation and MFA practices?
