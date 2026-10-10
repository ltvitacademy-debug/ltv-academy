# Lesson 9 — Salesforce as an Identity Provider

**Chapter 2 · Enterprise Identity · Lesson 9 of 24**

## What you'll learn

- How IdP-initiated SSO actually looks in practice when Salesforce is the IdP
- How a Salesforce user record gets linked to the corresponding account on the downstream service provider
- The role of the Federation ID field specifically
- What breaks, and how, when the identity link between the two systems is wrong or missing

## IdP-initiated login, from the Salesforce side

Lesson 8 covered enabling the Identity Provider feature and defining a Service Provider. Once that's done, users who are already authenticated into Salesforce can single-sign-on into the downstream app directly — often from an app launcher tile or a custom link that points at Salesforce's IdP-initiated login endpoint for that specific SP:

![A Salesforce IdP-initiated SSO link, generated after defining a Service Provider, used to log an already-authenticated Salesforce user directly into the downstream service provider.](/courses/identity-and-access-management/ch02/09-salesforce-as-an-identity-provider/idp-initiated-sso.png)
*An IdP-initiated SSO URL — clicking it from inside an already-authenticated Salesforce session sends a signed assertion straight to the downstream SP, no separate login required.*

Behind that single click, Salesforce builds a SAML assertion (Lesson 4) about the currently logged-in user, signs it with the IdP certificate, and POSTs it to the SP's Assertion Consumer Service URL — exactly the browser-POST mechanism from Lesson 4, just initiated from the IdP side rather than the SP side.

## Linking the identity: the Federation ID

The signed assertion has to tell the downstream SP *which* user it's vouching for, in a way the SP can match against its own user records. Salesforce uses the **Federation ID** field on the user record for exactly this purpose: it's a value both systems agree represents "this same person," independent of what either system calls them internally.

![A Salesforce user detail page showing the Federation ID field populated, used to link this user's identity across to a downstream service provider.](/courses/identity-and-access-management/ch02/09-salesforce-as-an-identity-provider/user-federation-id-setup.png)
*Setting a user's Federation ID — the shared identifier both the IdP and SP use to agree this is the same person.*

Depending on how the Service Provider definition is configured, Salesforce can instead use the username or a custom SAML attribute as the subject identifier — but Federation ID is the most common and most explicitly "identity-only" choice, because unlike a username it carries no login credentials and can be set independently of how the user authenticates.

## What goes wrong when the link is wrong

A mismatched or missing identity link is one of the most common real-world SSO failures, and it manifests differently depending on direction:

- If the SP receives an assertion with a Federation ID that doesn't match any of its own user records, the login typically fails outright, often with a generic SSO error rather than something actionable like "no matching user."
- If **Just-in-Time provisioning** (Lesson 12) is configured, a missing match can instead silently create a brand-new user record rather than failing — which is a feature when onboarding new employees automatically, and a serious problem when it's actually a typo in someone's Federation ID creating a duplicate account.
- If a user is deactivated in Salesforce but the downstream SP never receives that signal, the SP may continue trusting stale sessions or allow re-authentication through a cached assertion path — which is exactly the architectural risk flagged in Lesson 2 about Salesforce becoming the authoritative identity source for other systems.

## Key terms

| Term | Meaning |
|---|---|
| IdP-initiated SSO link | A Salesforce-generated URL that sends an authenticated user's assertion directly to a specific SP |
| Federation ID | A user field holding the shared identifier used to match a Salesforce user to their counterpart record on an SP |
| Subject identifier | Whatever value (Federation ID, username, custom attribute) the SAML assertion's Subject uses to identify the user |

## Lab

Scenario: a new employee is set up in Salesforce, and their Federation ID is typed as `jsmith02` while the downstream helpdesk SP has their account registered under `jsmith2` (missing the leading zero). Write a short troubleshooting note (100–200 words) covering:

1. What symptom the employee would most likely see when trying to IdP-initiate SSO into the helpdesk tool.
2. Where in Salesforce you would go to check and correct the mismatch.
3. One process recommendation to prevent this exact typo class of bug from recurring during future employee onboarding.

## Check yourself

- What does Salesforce do, mechanically, when a user clicks an IdP-initiated SSO link?
- What is the Federation ID used for, and why is it often preferred over username as the subject identifier?
- Describe one real failure mode that results from a Federation ID mismatch, and one that results from a deactivation signal not propagating downstream.
