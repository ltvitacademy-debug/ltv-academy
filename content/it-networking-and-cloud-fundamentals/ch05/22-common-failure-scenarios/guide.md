# Common Failure Scenarios

The previous lesson gave the methodology. This closing lesson of the chapter walks through four genuinely common failure patterns and applies that exact methodology to each one, before the course moves on into cloud fundamentals.

## What you'll learn

- What "DNS is still pointing at the old server" actually looks like in practice
- How a certificate expiring quietly causes a very specific kind of outage
- What a firewall or security group misconfiguration looks like from the outside
- How an overloaded backend produces symptoms that look like several other problems at once

## Stale DNS after a migration

Northbridge Retail moves checkout.northbridgeretail.com to a new server, updates the A record, and ships it — but support tickets keep describing the old behavior for hours afterward. Running dig from a few different networks usually reveals the cause immediately: some resolvers are still serving the old, cached answer because the record's TTL hadn't been lowered before the change, exactly the scenario the DNS lesson warned about. The fix for next time is procedural, not technical: lower the TTL well before a planned migration, not during it.

## A certificate that expired quietly

One morning, every visitor to checkout.northbridgeretail.com gets a browser security warning instead of the checkout page — nothing was deployed, nothing was changed, and the server is up and responding fine to ping. The certificate simply reached its expiration date overnight. curl with verbose output against the site shows the TLS handshake failing specifically on certificate validation, which immediately rules out the network and the application and points straight at renewal — a problem best prevented with automated renewal and an expiration alert well before the date actually arrives.

## A firewall rule blocking the wrong thing

After a security review, someone tightens a security group and, without meaning to, blocks the load balancer's own health-check traffic to the backend servers. ping and curl from inside the network still work fine, but the load balancer starts marking every backend unhealthy and traffic grinds to a halt. The giveaway is that the problem appeared immediately after a security group change, and the fix is checking exactly what that change actually opened or closed, rather than looking anywhere else first.

## An overloaded backend

Traffic spikes during a sale, and checkout starts intermittently timing out for some shoppers while working fine for others. ping still succeeds, DNS still resolves correctly, and curl to the health endpoint sometimes succeeds and sometimes hangs — which is the specific signature of a resource that's overwhelmed rather than broken: the service exists and mostly works, it just can't keep up with the current load. ss on the backend servers shows connection counts far above normal, confirming the bottleneck is capacity, not a misconfiguration.

| Scenario | First clue | Tool that confirms it |
|---|---|---|
| Stale DNS after migration | Old behavior persists past the expected cutover | dig from multiple networks |
| Expired certificate | Browser warning, server otherwise healthy | curl -v showing handshake failure |
| Misconfigured firewall rule | Started right after a security change | Checking the exact rule that changed |
| Overloaded backend | Intermittent, load-correlated failures | ss showing abnormal connection counts |

## Closing the chapter

Every one of these scenarios is solvable with the same bottom-up methodology and the same handful of tools from the last three lessons — the difference between them is simply which layer the evidence points to. With networking, security, and troubleshooting now covered, the course moves on to cloud fundamentals: how these same concepts show up once the infrastructure itself lives in someone else's data center.

## Key terms

| Term | Meaning |
|---|---|
| Stale DNS | Resolvers still serving an old cached answer after a record changed |
| Certificate expiration | A certificate's validity window ending, causing TLS handshakes to fail |
| Misconfiguration | A rule or setting changed incorrectly, often traceable to a recent change |
| Overload | A working service failing intermittently because demand exceeds its capacity |
