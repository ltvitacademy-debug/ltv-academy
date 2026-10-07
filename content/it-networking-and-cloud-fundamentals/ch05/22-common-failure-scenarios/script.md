# Script — Common Failure Scenarios

## Segment 1 (title)

This closing lesson of the chapter walks through four genuinely common failure scenarios and applies the exact methodology from the last lesson to each one, each solvable with tools already covered in this chapter.

## Segment 2 (steps)

Stale DNS after a migration happens when a record's TTL wasn't lowered beforehand, so some resolvers keep serving the old answer for hours. An expired certificate causes a browser warning on a server that's otherwise completely healthy. A misconfigured firewall rule often shows up right after a security change, sometimes blocking the load balancer's own health checks by accident. And an overloaded backend produces intermittent, load-correlated failures rather than a clean, total outage.

## Segment 3 (code)

Here, two different public resolvers return two different answers for the same name — one still has the old server cached, one already has the new one. That split is the classic signature of a TTL that wasn't lowered before the cutover happened.

## Segment 4 (code)

Here, curl's handshake fails specifically on certificate validation — not a timeout, not a refused connection. That narrows the problem immediately to the certificate itself, ruling out the network and the application in the same step.

## Segment 5 (outro)

Every one of these is solvable with the same bottom-up approach and the same handful of tools from this chapter — the difference is only which layer the evidence happens to point to. With networking, security, and troubleshooting now behind it, the course moves on next to cloud fundamentals — how these same concepts show up once the infrastructure lives in someone else's data center.
