# Lesson 13 — Identity and Access Management

**Chapter 3 · Architecture Domains · Lesson 13 of 19**

## What you'll learn

- The difference between authentication (who you are) and authorization (what you can do), and why architects must keep them conceptually separate
- The identity provider / service provider relationship, and how Salesforce can play either role
- What a Federation ID actually does, in plain terms
- Why identity architecture decisions ripple into every other domain this chapter covers

## Authentication and authorization are not the same question

**Authentication** answers "who is this, actually?" **Authorization** answers "now that we know who they are, what are they allowed to do?" These sound similar enough that they often get collapsed into one conversation, but keeping them separate matters architecturally: a user can be authenticated perfectly (the system is completely certain who they are) and still be authorized for almost nothing, or authenticated weakly and over-authorized, which is its own serious risk. Identity and access management as a domain is really about getting the first question — authentication, establishing trust in who someone is — right, as the foundation everything in Lesson 14's security and sharing domain then builds on. Confusing the two leads to designs that either over-invest in proving identity while leaving access controls loose, or vice versa.

## Identity provider and service provider

When a user logs into one system and that login is trusted by another system without logging in again, two roles are involved: the **identity provider (IdP)**, which actually authenticates the user and vouches for who they are, and the **service provider (SP)**, which is the system the user is trying to reach and which trusts the IdP's vouching instead of authenticating the user itself. Salesforce can play either role depending on the setup: it can act as the service provider, trusting an external identity provider like a company's own corporate directory so employees log into Salesforce using the same credentials they use everywhere else; or it can act as the identity provider, letting a user who's already logged into Salesforce access a separate connected service without logging in again there. Which role Salesforce plays in a given design is itself an architecture decision, driven by where the business wants its "source of truth" for who an employee is to live.

The most common protocol behind this handshake is **SAML**: the service provider asks the identity provider whether a given user may access its service, the identity provider checks its own records and returns a signed assertion confirming the user's identity (and often some basic profile information along with it), and the service provider verifies that signature before trusting the assertion and letting the user in. This exchange happens in the background during login — the user experiences it as a single sign-on, not as a visible multi-step handshake.

## The Federation ID: the key that links the two sides

For a service provider to know which of its own user records corresponds to the identity an identity provider just vouched for, both sides need to agree on a shared identifier. In Salesforce, this is the **Federation ID**: an attribute on the user record that links a Salesforce user to their identity on the external identity provider's side. It has to be unique per user within the org, which is why an email address is a common (though not mandatory) choice for it. Getting the Federation ID mapping wrong — reusing one by mistake, or leaving it blank for some users — is a common, very concrete single sign-on failure mode, and it's exactly the kind of detail an architect should be naming as a risk (per Lesson 8) during design, not discovering during a go-live weekend.

## Why this ripples into every other domain

An identity decision rarely stays contained to identity alone. Choosing to federate authentication through a corporate identity provider raises an immediate security question (what happens to a user's Salesforce access the instant their corporate account is disabled — does it follow automatically, or does Salesforce access linger independently), an integration question (the identity provider connection is itself an integration that needs monitoring and failure handling), and a development-lifecycle question (how is this tested in a sandbox without accidentally pointing a test environment at the real production identity provider). This is Lesson 4's cross-domain principle showing up concretely: identity decisions are rarely "just" an identity decision.

## Key terms

| Term | Meaning |
|---|---|
| Authentication | Establishing who a user actually is |
| Authorization | Determining what an authenticated user is allowed to do |
| Identity provider (IdP) | The system that authenticates a user and vouches for their identity to another system |
| Service provider (SP) | The system that trusts an identity provider's vouching instead of authenticating the user itself |
| Federation ID | The Salesforce user attribute that links a user record to their identity on an external identity provider |

## Lab

A company wants employees to log into Salesforce using the same corporate credentials they already use for email and other internal tools, with Salesforce trusting that corporate system's login. Identify which role Salesforce plays (identity provider or service provider) in this setup, name one risk this lesson would flag around the Federation ID or deprovisioning, and write one sentence about how you'd test this safely without risking a live employee's production access during setup.

## Check yourself

Can you explain the difference between authentication and authorization, with your own example of a system that's strong on one but weak on the other? Can you describe, at a high level, what an identity provider and a service provider each do during a SAML-based login? Can you explain what a Federation ID does and name one real risk if it's configured incorrectly?
