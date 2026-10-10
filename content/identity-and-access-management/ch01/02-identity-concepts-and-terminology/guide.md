# Lesson 2 — Identity Concepts and Terminology

**Chapter 1 · Identity Foundations · Lesson 2 of 24**

## What you'll learn

- The vocabulary every Salesforce Identity and Access Management (IAM) architect must use precisely: identity, principal, credential, assertion, token, federation
- The difference between an identity provider (IdP) and a service provider (SP), and why Salesforce can be either
- What a "trust relationship" means technically, not just conceptually
- Why this terminology matters when reading SAML/OAuth specs or configuring Setup pages later in this course

## Why vocabulary is the first architecture skill

Before touching a single Setup screen, an Identity and Access Management architect needs a shared, precise vocabulary. Salesforce's own documentation, SAML and OAuth specifications, and every enterprise IdP vendor (Okta, Microsoft Entra ID, Ping Identity) use these terms consistently, and misusing them in a design review or architect exam scenario is an immediate credibility problem. This lesson builds the glossary the rest of the course relies on.

## Core identity terms

- **Identity** — the set of attributes that represent a person (or a system) within a given context: a username, email, employee ID, or Federation ID. A person can have multiple identities across multiple systems that all represent the same real individual.
- **Principal** — the entity being authenticated: usually a human user, but it can also be a system, a service, or a device acting on its own behalf.
- **Credential** — the proof the principal presents to authenticate: a password, a certificate, a one-time code.
- **Identity provider (IdP)** — the system that authenticates the principal and vouches for their identity to other systems. The IdP owns the "who are you" answer.
- **Service provider (SP)** — the system that relies on the IdP's vouching to grant access, instead of authenticating the user itself. The SP trusts someone else's answer to "who are you."
- **Relying party** — a more general term for any system that relies on another party's authentication decision; in SAML language this is usually the SP, in OAuth/OIDC language it's often called the "client."

## Salesforce can be either side

This is the single most important architectural fact in this entire course, and it's why Chapter 2 is split the way it is: **Salesforce can act as the identity provider, the service provider, or both at once, in the same org.**

- As an **SP** (Lesson 10), Salesforce trusts an external IdP — a corporate Active Directory via Okta, for example — to authenticate users, and grants them a Salesforce session based on that external proof.
- As an **IdP** (Lesson 9), Salesforce authenticates the user itself and then vouches for that identity to other connected apps and service providers, letting the user single-sign-on into other systems from inside Salesforce.

Nothing about the underlying user record changes based on which role Salesforce is playing. The same profile, permission sets, and sharing rules apply either way — this is the authentication/authorization separation from Lesson 1 showing up again at the architecture level.

## Trust, assertions, and tokens

A "trust relationship" is not a vague handshake — it's a specific, configured, bidirectional agreement with cryptographic backing:

- The IdP and SP exchange **metadata**: certificates, entity IDs, and endpoint URLs, configured once and then relied on for every subsequent login.
- When a user authenticates, the IdP issues an **assertion** (in SAML) or a **token** (in OAuth/OIDC) — a signed, time-limited statement that says, in effect, "I, the IdP, vouch that this principal authenticated successfully, and here are some facts about them."
- The SP validates the assertion's signature against the certificate it already trusts, checks that it hasn't expired, and only then establishes a session.

No password ever crosses from the IdP to the SP. This is what makes federated identity (Lesson 17) more secure than each application maintaining its own password database — the SP never even sees a credential, only a signed claim it can cryptographically verify.

## Key terms

| Term | Meaning |
|---|---|
| Identity | The set of attributes representing a person or system in a given context |
| Principal | The entity being authenticated |
| Identity provider (IdP) | The system that authenticates a principal and vouches for them |
| Service provider (SP) | The system that relies on another party's authentication decision |
| Assertion | A signed, time-limited statement from an IdP that a user authenticated (SAML term) |
| Token | A signed, time-limited credential representing a successful authentication or granted access (OAuth/OIDC term) |

## Lab

Scenario: A client describes their desired setup as "employees log into Okta once in the morning, and from there they can get into Salesforce, Workday, and their email without logging in again." Using only the vocabulary from this lesson, write a 4–6 sentence description of this architecture that correctly identifies:

1. Which system is the IdP.
2. Which systems are SPs in this scenario.
3. What gets exchanged between Okta and Salesforce when an employee opens the Salesforce tile.
4. Whether the employee's Okta password is ever seen by Salesforce.

## Check yourself

- Define "identity provider" and "service provider" in your own words, without using the word "trust."
- Explain why Salesforce being able to act as both IdP and SP is architecturally significant rather than a minor feature detail.
- What is the difference between an assertion and a token, and which protocol family uses each term?
