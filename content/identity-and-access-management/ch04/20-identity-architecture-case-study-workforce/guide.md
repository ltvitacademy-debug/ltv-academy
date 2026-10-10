# Lesson 20 — Identity Architecture Case Study: Workforce

**Chapter 4 · Review and Practice · Lesson 20 of 24**

## What you'll learn

- How to assemble Lessons 1–19 into one coherent workforce identity architecture
- A worked example end to end: discovery, IdP choice, provisioning, session policy, and failure-mode planning
- How to present an identity architecture decision to a client in terms they'll actually act on
- Where real workforce identity projects most often go wrong in practice

## The scenario

A 3,000-employee logistics company runs Microsoft Entra ID as its corporate directory, already synced from Workday HR data. They want employees to access Salesforce (Sales Cloud and Service Cloud) using their existing corporate credentials, with no separate Salesforce password to manage, strong authentication enforced centrally, and new hires or terminations reflected in Salesforce access automatically, without a manual admin step.

## Walking the architecture, lesson by lesson

**Landscape (Lesson 14):** Entra ID is the existing IAM hub; Workday is the authoritative identity source feeding it. Salesforce should be an SP, not an IdP, for this population — there's no indication any other app needs to launch *from* Salesforce.

**Protocol choice (Lessons 4, 6):** Entra ID supports both SAML and OIDC natively. Either works technically; SAML is the more common choice for this kind of enterprise SSO today, especially if the company has other SAML-based SP integrations already configured against the same Entra ID tenant, for configuration consistency.

**Prerequisite (Lesson 13):** My Domain must be enabled and deployed before anything else — the Single Sign-On Settings record's Entity ID depends on it.

**SSO configuration (Lessons 3, 10):** Configure Single Sign-On Settings with Entra ID's metadata (Issuer, Login URL, certificate). Enable SP-initiated SSO. Crucially: **keep at least one admin profile able to use the standard login page** as a break-glass path (Lesson 10's lockout warning).

**Provisioning (Lesson 12):** Since new hires should get access automatically, this needs more than JIT alone (which only fires at first login). Recommend SCIM-based or Entra ID's native Salesforce provisioning connector to pre-create accounts from Workday data, with JIT as a safety net for any attribute not carried by the provisioning connector.

**MFA (Lesson 11):** Since the company wants strong authentication "enforced centrally," the architect must explicitly confirm with the client's identity team that Entra ID enforces MFA for Salesforce-bound logins — not just assume SSO implies it.

**Session policy (Lesson 18):** Set tighter Session Security Levels for admin profiles, requiring High Assurance (MFA-backed) sessions for sensitive admin actions, even though regular employees' sessions are governed primarily by Entra ID's own policy.

## Where this kind of project actually goes wrong

In practice, the most common failure in a workforce SSO project isn't the SAML configuration itself — it's one of: (1) nobody tests the break-glass admin path before disabling standard login broadly, (2) deactivation in Workday doesn't actually propagate to Salesforce in a timely way because the provisioning connector was only ever tested for *creating* users, not deactivating them, or (3) the Federation ID mapping (Lesson 9) was done sloppily during a rushed go-live and a batch of users end up mismatched. All three are explicitly flagged in earlier lessons — this case study exists to show that the individual lesson topics aren't academic trivia, they're the exact checklist a real project needs walked through in order.

## Key terms

| Term | Meaning |
|---|---|
| Authoritative identity source | Here, Workday, feeding Entra ID |
| Break-glass path | The admin login path kept outside SSO for recovery |
| Provisioning connector | The mechanism (SCIM or vendor-specific) that creates/updates/deactivates Salesforce users from the IdP side |

## Lab

Using the scenario above, write a one-page (300–400 word) architecture summary memo suitable for presenting to the client's IT director. It should state: the chosen protocol and why, the provisioning approach and why JIT alone isn't sufficient, the MFA verification step you'd insist on before go-live, and the one failure mode you'd test explicitly before disabling standard login broadly.

## Check yourself

- Why is Salesforce the SP rather than the IdP in this scenario, and what would have to be different for that to flip?
- Name the three most common real-world failure points in a workforce SSO rollout, per this lesson.
- Why isn't JIT provisioning alone sufficient for this client's stated requirement that terminations reflect automatically?
