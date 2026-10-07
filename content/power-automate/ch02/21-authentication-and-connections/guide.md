# Authentication: Connections, Service Principals and OAuth

Every action you've built so far — SQL Server, SharePoint, the HTTP call to Meridian TrackAPI — had to prove to the target system who was asking. That proof is handled by a **connection**, and how that connection authenticates changes depending on who, or what, the flow is acting as. This lesson covers the three pieces that make enterprise flows secure and durable: connections, service principals, and OAuth.

## What you'll learn

- What a connection actually is, and where you create and manage them
- The difference between a connection that authenticates as a person and one that authenticates as an application
- What a service principal is, and why Castlebridge uses one instead of a human's password
- The basic shape of an OAuth client credentials exchange

## Connections: where authentication lives

A connection is Power Automate's record of "this flow is allowed to act as this identity against this service." Every connector-based action — the SQL Server action from Lesson 18, the Dataverse actions from Lessons 16 and 17 — runs through a connection, and every connection is created and managed from the same place.

![The Connections list in Power Automate, showing the connectors available to configure a new connection for](/courses/power-automate/ch02/21-authentication-and-connections/new-connection-list.png)
*The real Connections list in Power Automate — each tile is a connector you can authenticate against.*

## User-delegated vs. service principal

Most connections you've built in this course so far are **user-delegated** — they run as you, a specific signed-in person, and inherit exactly your access. That's fine for a flow one person owns, but it's fragile for an enterprise flow: if that person leaves Castlebridge or changes their password, the flow breaks.

A **service principal** solves that. It's a non-human application identity registered in Microsoft Entra ID, authenticated with a client ID and a client secret (or certificate) instead of a username and password. It has no mailbox, can't log in interactively, and doesn't depend on anyone's MFA. When a Castlebridge flow needs to authenticate to the company's own internal backend — not a person's mailbox, just a service-to-service call — a service principal is the right identity to use, and it keeps working even as individual employees come and go.

## Granting consent and the OAuth exchange

Behind both kinds of connections is **OAuth 2.0**. For a user-delegated connection, you'll sometimes be asked to consent to an application's access the first time you connect — the screen below shows exactly that consent step for Microsoft's own HTTP-with-Entra-ID connector.

![The Grant Consent screen asking a user to approve an application's requested access](/courses/power-automate/ch02/21-authentication-and-connections/grant-consent-to-application.png)
*A real Microsoft Entra ID consent screen — a user approving an application's requested permissions.*

A service principal connection skips that interactive consent entirely and uses the **client credentials grant**: the flow presents its client ID and secret directly to Entra ID's token endpoint, and gets back an access token it attaches to every subsequent call — no human in the loop at all.

## Key terms

- **Connection** — Power Automate's record that a flow may authenticate as a given identity against a given service
- **User-delegated connection** — a connection that runs as a specific signed-in person and inherits their access
- **Service principal** — a non-human application identity in Microsoft Entra ID, authenticated with a client ID and secret
- **OAuth client credentials grant** — the token exchange a service principal uses to authenticate without a human signing in
