# DNS

Every time someone types northbridgeretail.com into a browser, the network itself has no idea what that means — IP packets only know how to find numeric addresses. The Domain Name System, or DNS, is the directory service that turns a name a person can remember into an address a router can actually use. It is one of the oldest protocols on the internet and still one of the first things to check when "the site is down" turns out to mean "the site can't be found."

## What you'll learn

- Why computers need DNS instead of routing directly on human-readable names
- The step-by-step path a single DNS lookup takes, from a laptop to the server that holds the real answer
- The most common DNS record types and what each one is actually for
- How a record's TTL controls how quickly a change propagates everywhere

## Why DNS exists

Every device on the internet is addressed by an IP address — something like 203.0.113.42. Nobody wants to memorize that to shop at Northbridge Retail's site, so DNS maps the memorable name, northbridgeretail.com, to the numeric address its web servers actually listen on. Without DNS, every bookmark, every email, and every link on the web would have to be a raw IP address, and that address would have to stay fixed forever — which breaks the moment a company moves to a new host or a new cloud region.

## How a DNS lookup actually resolves

A single lookup for northbridgeretail.com passes through several hands before an answer comes back:

1. **Stub resolver** — the operating system on the shopper's laptop checks its own local cache first. If it has a recent answer, it uses it and nothing else happens.
2. **Recursive resolver** — if there's no cached answer, the request goes to a recursive resolver, typically run by the shopper's ISP or a public service. This resolver does the legwork on the shopper's behalf.
3. **Root and TLD servers** — the recursive resolver asks a root server where to find `.com`, then asks the `.com` TLD server where to find `northbridgeretail.com` specifically.
4. **Authoritative name server** — the TLD server points to Northbridge Retail's authoritative name server, which holds the actual records and returns the real IP address.

That answer then travels back down the chain to the shopper's laptop, which finally has an address to connect to.

## Common DNS record types

Not every DNS record stores an IP address. A domain's zone file is made up of several record types, each with a specific job:

| Record | Purpose |
|---|---|
| A | Maps a name to an IPv4 address (e.g. `northbridgeretail.com → 203.0.113.42`) |
| AAAA | Same as A, but for an IPv6 address |
| CNAME | Points one name to another name, e.g. `cdn.northbridgeretail.com → assets.cdnprovider.net` |
| MX | Routes email for the domain to a specific mail server, ordered by priority |
| TXT | Holds arbitrary text, commonly used to prove domain ownership or publish email anti-spoofing rules |
| NS | Lists which name servers are authoritative for the domain |

## TTL and caching

Every DNS record carries a Time-To-Live, or TTL, measured in seconds. It tells every resolver that caches the answer how long it's allowed to keep using that cached value before asking again. If Northbridge Retail's checkout service record has a TTL of 3600, a resolver that already has the answer won't re-check for up to an hour — which is efficient, but means a DNS change can take up to that long to be visible everywhere. Before a planned migration of checkout.northbridgeretail.com to a new server, their infrastructure team lowers the TTL to something like 60 seconds well in advance, so that when the real cutover happens, the change is visible almost immediately instead of trickling out over the old, longer TTL.

## Key terms

| Term | Meaning |
|---|---|
| DNS | The system that translates human-readable domain names into IP addresses |
| Recursive resolver | The server that does the lookup work on a client's behalf, querying other servers as needed |
| Authoritative name server | The server that holds the real, official records for a domain |
| TTL | How long, in seconds, a resolver is allowed to cache a DNS answer before re-checking |
