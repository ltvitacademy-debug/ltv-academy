# Script — Authentication: Connections, Service Principals and OAuth

## Segment 1 (title)

Every action you've built so far — SQL Server, SharePoint, the call to Meridian TrackAPI — had to prove to the target system who was asking. That proof is a connection, and this lesson covers how connections, service principals, and OAuth make that proof work in an enterprise flow.

## Segment 2 (screenshot)

This is the real Connections list in Power Automate. Every connector-based action you've used in this course runs through a connection created and managed right here, one tile per connector.

## Segment 3 (steps)

Most connections you've built so far are user-delegated — they run as you, a specific person, and inherit your access. That's fine for a flow one person owns, but it's fragile for the company: if that person leaves or changes their password, the flow breaks. A service principal fixes that. It's a non-human application identity in Microsoft Entra ID, authenticated with a client ID and secret instead of anyone's password.

## Segment 4 (screenshot)

Behind both kinds of connections is OAuth. For a user-delegated connection, you're sometimes asked to consent the first time — this is a real Microsoft Entra ID consent screen, a user approving exactly what an application is allowed to access.

## Segment 5 (code)

A service principal skips that interactive step entirely. It uses the client credentials grant: the flow presents its own client ID and secret straight to Entra ID's token endpoint and gets back an access token — no human signing in anywhere in the exchange.

## Segment 6 (outro)

Once a flow can authenticate reliably as its own identity, you can start reusing that same setup across many flows — which is exactly where custom connectors come in next.
