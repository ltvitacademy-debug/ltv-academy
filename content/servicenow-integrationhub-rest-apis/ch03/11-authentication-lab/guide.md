# Lesson 11 — Authentication Lab

**Chapter 3 · Authentication for Integrations · Lesson 11 of 29**

## What you'll learn

- How to evaluate which authentication mechanism actually fits a real integration requirement, not just which one is fastest to configure
- How to translate that decision into the specific OAuth Entity Profile fields ServiceNow asks for
- How an OAuth Entity Profile connects back to the REST Message's Authentication Profile from Chapter 2
- How to defend an authentication choice the way a technical reviewer or architect actually would

## The scenario

You're building an outbound integration with a partner's REST API — think a vendor that handles purchase order fulfillment. Their API documentation says they support two authentication options: Basic Auth, and OAuth 2.0 using the Client Credentials grant. No human user is involved anywhere in this integration; it's a scheduled ServiceNow job that checks order status every 15 minutes and updates records accordingly. You have to decide which authentication option to configure, and be ready to justify it.

## Step 1 — Why not just take the faster path

Basic Auth is, by a wide margin, faster to set up: a username and password, dropped into a REST Message's Authentication Profile, and the integration works. But walk through what Lesson 8 already established about what that actually costs here. This job runs every 15 minutes, every day, indefinitely — meaning the real username and password get sent on the wire thousands of times a month, for as long as the integration exists. If that credential is ever compromised, it has no expiration, so it stays valid until someone notices and manually rotates it. And if this partner's credential is ever shared with another integration down the line — a common way these things sprawl — revoking it means breaking that integration too. None of that is hypothetical; it's the exact failure mode Lesson 8 walked through. Given the partner explicitly offers OAuth, there's no real reason to accept that risk just to save initial setup time.

## Step 2 — Choosing the grant type

With OAuth decided, the next decision is the grant type. Lesson 9 drew a clear line: Client Credentials grant when the integration authenticates as itself with no human user involved, Authorization Code grant when it needs to act on behalf of a specific person who has explicitly authorized that access. This scenario has no human user anywhere in the loop — it's a scheduled job checking order status on ServiceNow's own behalf. That makes the choice straightforward: Client Credentials grant.

## Step 3 — The OAuth Entity Profile fields you'd actually need

Configuring this in ServiceNow means populating an OAuth Entity record with three pieces of information the partner's API documentation would provide:

- **Client ID** — the identifier the partner issues to identify this specific integration as a registered client of their API
- **Client secret** — the corresponding secret value, paired with the client ID, that proves this client is who it claims to be when requesting a token
- **Token endpoint URL** — the specific URL on the partner's side that issues access tokens; this is where ServiceNow sends the client ID and secret to receive a token back

Once that OAuth Entity record exists, an OAuth Entity Profile is built on top of it, selecting the Client Credentials grant type and pointing at that record.

## Step 4 — Wiring it to the REST Message's Authentication Profile

This is the piece that ties Chapter 2 and Chapter 3 together. The REST Message built in Chapter 2 — the one pointed at the partner's order-status endpoint — has an Authentication Profile field. That's where the finished OAuth Entity Profile gets attached. From that point forward, every call that REST Message makes automatically goes through ServiceNow's OAuth handling: a token gets requested against the token endpoint URL, cached, and silently refreshed whenever it expires — exactly the mechanism Lesson 9 covered. Nothing in the REST Message's own script needs to know a token exists at all.

## Defending the decision

If a technical reviewer asked why OAuth over Basic Auth here, the honest, specific answer is the one this lab just walked: this is a recurring, unattended job with no human user, run against a partner that explicitly supports the stronger option, so there's no justification for accepting Basic Auth's every-request credential exposure and manual revocation problem just to save a few minutes of setup. That's the kind of answer a real architect review expects — not "OAuth is more secure" in the abstract, but a reasoned walk from requirement, to grant type, to the specific fields configured.

## Key terms

| Term | Meaning |
|---|---|
| Client Credentials grant | The OAuth grant type for integrations that authenticate as themselves, with no human user involved |
| OAuth Entity record | Holds the client ID, client secret, and token endpoint URL for the external system |
| OAuth Entity Profile | Selects the grant type and attaches to a REST Message's Authentication Profile |
| Token endpoint URL | The external system's URL that issues access tokens in exchange for a client ID and secret |
| Authentication Profile | The REST Message field where the finished OAuth Entity Profile actually gets wired in |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: in this scenario, what specifically about the integration (not just "OAuth is better") justifies choosing Client Credentials over Basic Auth, and which three fields does the OAuth Entity record need before an OAuth Entity Profile can be attached to the REST Message's Authentication Profile?
