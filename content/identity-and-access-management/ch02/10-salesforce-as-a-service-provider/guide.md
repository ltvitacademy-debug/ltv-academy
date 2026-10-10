# Lesson 10 — Salesforce as a Service Provider

**Chapter 2 · Enterprise Identity · Lesson 10 of 24**

## What you'll learn

- How the Single Sign-On Settings page from Lesson 3 is used when Salesforce is specifically the SP (not the IdP)
- The difference between enabling SP-initiated SSO and simply uploading an IdP's metadata
- What "Login Page" behavior options control once SAML SSO is active
- How to avoid the most common self-inflicted outage in SP configuration: locking out admins

## Salesforce as the trusting party

This is the inverse of Lesson 9. Here, an external identity system — a corporate Okta tenant, Microsoft Entra ID, a custom enterprise IdP — authenticates the user, and Salesforce trusts that authentication instead of asking for its own credentials. The configuration surface is the same **Single Sign-On Settings** page from Lesson 3, but the fields are filled in from the opposite direction: instead of Salesforce issuing a certificate, Salesforce *uploads and trusts* the external IdP's certificate.

## Enabling SP-initiated SSO

Once the SAML SSO Setting record exists (Issuer, Identity Provider Login URL, Identity Provider Certificate — all from Lesson 4), there's a separate step to actually make SP-initiated login work for users hitting the standard Salesforce login page:

![The Salesforce Single Sign-On Settings page with a checkbox/option to enable SAML and make it the identity provider used for SP-initiated login from the standard login page.](/courses/identity-and-access-management/ch02/10-salesforce-as-a-service-provider/enable-sp-initiated-sso.png)
*Enabling SAML as the active login method — the step that actually redirects unauthenticated users on the login page out to the trusted external IdP.*

This matters because having a valid SAML SSO Setting configured is not, by itself, enough to redirect users: an admin has to explicitly turn on SP-initiated behavior (sometimes by setting the SSO config as the org's default and/or disabling the standard login form for specific profiles) before ordinary users are actually routed through SSO when they visit the login page.

## Don't lock yourself out

The single most common self-inflicted outage in SP configuration: an admin disables the standard username/password login page for all users, assuming SSO will always work — and then the external IdP has an outage, a misconfiguration, or a certificate expires. With the standard login page disabled for everyone including admins, nobody can get back in to fix it.

The standard mitigation, and a point worth memorizing for architect-level scenario questions: **always leave at least one admin profile able to use the standard login page**, or keep a "break glass" admin account that bypasses SSO, specifically for this failure mode. Salesforce's own guidance on SSO rollout emphasizes testing the configuration with a non-admin pilot group before disabling standard login broadly, for exactly this reason.

## What SP-initiated SSO does not change

As with IdP-initiated SSO (Lesson 9) and SSO generally (Lesson 3), none of this touches Salesforce's authorization model. A user authenticated via an external IdP still gets their access entirely from their Salesforce profile, permission sets, role, and sharing rules — the only thing that changed is who vouched for their login. This is worth restating a third time in this course because it's the single most frequently misunderstood point by people new to identity architecture, and because getting it right is often the deciding factor in whether an architect review board scenario question is answered correctly.

## Key terms

| Term | Meaning |
|---|---|
| Service Provider (SP) | The role Salesforce plays when it trusts an external IdP's authentication |
| SP-initiated SSO | The flow where Salesforce redirects an unauthenticated user out to the trusted IdP |
| Break-glass admin account | An account deliberately kept able to bypass SSO, used only to recover from an SSO outage |

## Lab

Scenario: a client wants to roll out SP-initiated SSO using their corporate Okta tenant as the IdP, and asks whether it's safe to disable the standard Salesforce login page for every profile immediately after testing with a handful of pilot users. Write a short recommendation (100–200 words) that explains why this is risky, and describe the specific safeguard you'd put in place before any broader rollout.

## Check yourself

- What's the key difference between configuring Salesforce as an SP versus as an IdP, in terms of which party issues versus trusts the certificate?
- Why isn't a valid SAML SSO Setting record enough, by itself, to make SP-initiated login work for ordinary users?
- Describe the "lockout" failure mode this lesson warns about, and the standard mitigation.
