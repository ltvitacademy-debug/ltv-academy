# Lesson 8 — IP Restrictions and Network Controls

**Chapter 2 · Operating Securely · Lesson 8 of 13**

## What you'll learn

- The three distinct IP-related controls Salesforce offers, and why conflating them causes real integration outages
- The difference between a profile's Login IP Range (which blocks) and an org's Trusted IP Range (which skips a verification challenge, but doesn't block anything)
- How a connected app's own IP relaxation setting interacts with both of the above
- Why JWT Bearer and SAML Bearer flows behave differently here than other OAuth flows

## Three separate controls, easily confused

Salesforce has three IP-related settings that sound similar but do genuinely different things, and an architect who conflates them will eventually either lock out a legitimate integration or leave a gap they thought was closed:

**Profile Login IP Ranges** are an access control that actually blocks. Set on an individual profile, they define the IP addresses a user with that profile is allowed to log in from at all; a login attempt from outside the range is denied outright. By default this check happens at login; a separate org-wide session setting, "Enforce login IP ranges on every request," extends the check to every subsequent request too — meaning a user (or integration) that logged in successfully from an allowed address and then moved to a different one gets cut off on the very next request, including requests from a client application.

**Org-wide Trusted IP Ranges** do something different, and the distinction matters: they don't block access from outside the range. Instead, a login from an address within the trusted range skips the extra identity-verification challenge (like a one-time code) that would otherwise appear for an unrecognized location or device. A login from outside the trusted range isn't blocked by this setting alone — it just has to pass the additional verification step. Treating Trusted IP Ranges as if they were an access-blocking control is a common and consequential mistake.

**Connected App IP Relaxation** is a third, separate dial, set on the connected app itself. Its options run from the strict default (the app's users are still bound by whatever IP restrictions their own profile defines) through intermediate options (such as relaxing the check specifically when a refresh token is later used) to fully relaxing IP restrictions for that connected app's traffic. This setting governs the connected app's OAuth-based traffic specifically, layered on top of (not instead of) whatever the user's own profile defines.

## Why this matters for a real integration

An integration server typically runs from a small, stable set of known IP addresses — a data center range, a specific cloud provider's egress IPs, or a middleware vendor's published IP list. Pointing an integration's Login IP Range or Trusted IP Range at exactly those known addresses, and nothing broader, shrinks the integration's attack surface by denying or challenging any login attempt using that credential from anywhere else — which matters precisely because an integration credential is unattended (Lesson 1) and won't notice a login prompt from an unfamiliar location the way a human would. The trade-off runs the other way too: an integration whose outbound IP changes (a cloud provider rotating egress IPs, a middleware vendor migrating infrastructure) will break the moment its actual source IP falls outside whatever range was configured, which is why IP ranges for integrations need to be reviewed whenever the integration's own infrastructure changes, not just set once and forgotten.

## The JWT Bearer and SAML Bearer exception

One specific wrinkle worth knowing: the JWT Bearer and SAML Bearer OAuth flows always enforce IP restrictions, regardless of what relaxation policy is set on the connected app. An architect who's used to connected-app IP relaxation "fixing" an IP-related integration failure for other flows will find that lever doesn't exist for JWT/SAML Bearer — for those two flows, the integration's source IP has to actually fall within whatever Login IP Range or Trusted IP Range applies, full stop.

## Putting the three together

A deliberately configured integration typically combines: a Login IP Range on the integration user's profile scoped to the integration's known source IPs (the actual blocking control), a Trusted IP Range entry if the org wants to also skip verification challenges for other legitimate traffic from that same range, and a connected-app IP relaxation setting chosen based on which OAuth flow the integration uses and whether the always-enforced JWT/SAML Bearer exception applies. Getting this right means naming, for each integration, which of the three controls is actually doing the blocking — not assuming any one of them covers what another one does.

## Key terms

| Term | Meaning |
|---|---|
| Profile Login IP Range | A profile-level setting that blocks login (and, if enforced on every request, all subsequent requests) from outside a defined IP range |
| Enforce login IP ranges on every request | An org-wide session setting extending the Login IP Range check beyond login to every request, cutting off a session if the client's IP falls outside the range mid-session |
| Trusted IP Range | An org-wide setting that skips the extra identity-verification challenge for logins from listed IPs -- it does not block logins from outside the range |
| Connected App IP Relaxation | A connected-app-level setting controlling whether that app's OAuth traffic is bound by the org's IP restrictions, with several levels of strictness |

## Lab

An integration server runs from three known, stable static IP addresses provided by a middleware vendor, authenticating via the JWT Bearer flow. Design the IP control setup: what would you configure in the integration user's profile, whether a Trusted IP Range entry is also useful here and why, and what you'd tell the client about the connected app's IP relaxation setting given that this integration uses JWT Bearer specifically. Then describe what happens to this integration if the vendor migrates to a new data center with new IPs next year, and what review step would have caught it before it broke.

## Check yourself

Can you explain, in one sentence each, what Profile Login IP Ranges, Trusted IP Ranges, and Connected App IP Relaxation each actually do -- and which ones block versus which ones only skip a challenge? Can you explain why JWT Bearer flow is a special case for IP enforcement?
