# Lesson 1 — Authentication and Authorization

**Chapter 1 · Identity Foundations · Lesson 1 of 24**

## What you'll learn

- The precise difference between authentication and authorization, and why architects can't afford to blur them
- The three classic factors of authentication (something you know, have, are) and where Salesforce implements each
- How Salesforce evaluates authorization after login, layer by layer
- Why identity architecture is really "who are you" (authn) plus "what can you do" (authz) as two separate, composable decisions

## Two questions, two systems

Every secure system, Salesforce included, answers two completely different questions before it lets a user touch any data:

1. **Authentication (AuthN): "Who are you?"** This is the act of proving identity — typing a username and password, approving a push notification, presenting a client certificate. The outcome is binary: the system either believes you are who you claim to be, or it doesn't.
2. **Authorization (AuthZ): "What are you allowed to do, now that I know who you are?"** This happens after authentication succeeds, and it's where profiles, permission sets, role hierarchy, sharing rules, and field-level security all live.

Architects who conflate the two design broken systems. A classic mistake is assuming that because someone authenticated successfully (they proved who they are), they must be authorized for everything they're asking to do. Salesforce treats these as independent layers on purpose: you can authenticate through a dozen different paths — username/password, SSO, a connected mobile app, an API token — and every single one of those paths still has to pass through the exact same authorization model once the session exists. Changing *how* someone proves their identity never changes *what* they're allowed to do once they're in.

## The three authentication factors

Security literature groups every authentication method into three factors:

| Factor | Description | Salesforce example |
|---|---|---|
| Something you **know** | A secret only the user should know | Password, security question |
| Something you **have** | A physical or digital item the user possesses | Authenticator app (Salesforce Authenticator, Google Authenticator), security key, mobile device receiving a push |
| Something you **are** | A biometric trait | Fingerprint or face unlock on a mobile device, used as the local unlock step before an authenticator app approves a login |

Single-factor authentication relies on just one of these — traditionally a password. Multi-factor authentication (MFA), which we cover in depth in Lesson 11, requires at least two different factors before granting access. Salesforce has required MFA for direct UI logins since February 2022, which is itself a strong architectural signal: identity is no longer treated as a "nice to have" layered on top of the platform, it's baked into the login contract for every org.

## Where authorization actually lives in Salesforce

Once a user authenticates, Salesforce decides what they can do using a stack of independent, additive and subtractive controls:

- **Object-level security** — profiles and permission sets grant or deny Create/Read/Edit/Delete/View All/Modify All on each object.
- **Field-level security** — independently controls which fields on an accessible object are visible or editable.
- **Record-level security** — organization-wide defaults, role hierarchy, sharing rules, and manual sharing decide which specific *records* of an accessible object a user can see.
- **Session-level security** — session security levels (Standard vs. High Assurance) can require a stronger authentication method before a sensitive action, like viewing a report with PII, is allowed — authentication and authorization interacting directly.

That last point matters for identity architecture specifically: Salesforce lets you make an *authorization* decision ("can this user run this report?") conditional on an *authentication* fact ("did they log in with MFA?"). Session security levels are the bridge between the two systems, and we'll return to them in Lesson 18.

## Key terms

| Term | Meaning |
|---|---|
| Authentication (AuthN) | Proving who a user is |
| Authorization (AuthZ) | Determining what an authenticated user is allowed to do |
| Factor | A category of proof used in authentication (knowledge, possession, inherence) |
| Multi-factor authentication (MFA) | Authentication requiring two or more different factors |
| Session security level | An authorization gate (Standard/High Assurance) tied to how strongly a session was authenticated |

## Lab

Scenario: Your client's security team asks you to explain, in writing, why requiring employees to use a company VPN does not, by itself, improve their Salesforce authorization model. Write a short memo (150–250 words) that:

1. Classifies VPN access as either an authentication control, an authorization control, or neither, and justifies the classification.
2. Explains what would actually need to change in Salesforce (profiles, permission sets, sharing rules, or session settings) if the security team's real goal is to restrict *what* remote employees can see or do, as opposed to *how* they connect.
3. Proposes one concrete session-security-level setting (introduced above, detailed in Lesson 18) that could legitimately combine both concerns.

## Check yourself

- In one sentence each, define authentication and authorization, and explain why they're evaluated independently in Salesforce.
- Name the three authentication factors and give a Salesforce-relevant example of each.
- True or false: if a user authenticates via SSO instead of username/password, Salesforce authorization rules change for that session. Justify your answer.
