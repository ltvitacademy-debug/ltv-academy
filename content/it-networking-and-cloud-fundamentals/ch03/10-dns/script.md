# Script — DNS

## Segment 1 (title)

The internet only knows how to route numeric IP addresses, not names like northbridgeretail.com. DNS is the directory service that translates one into the other, and it's one of the first things worth checking any time a site seems to be down.

## Segment 2 (steps)

A single lookup passes through several hands. First, the device checks its own cache. If nothing's there, it asks a recursive resolver to do the legwork. That resolver asks a root server where to find dot com, then asks the dot com server where to find the domain specifically. Finally, the authoritative name server for that domain hands back the real answer.

## Segment 3 (steps)

Not every DNS record stores an IP address. An A record maps a name straight to an IPv4 address. A CNAME points one name at another name, which is how a subdomain like checkout can ride on the main domain's infrastructure. MX records route email to the right mail server, and TXT and NS records handle ownership proof and naming authority.

## Segment 4 (code)

Every record carries a TTL, in seconds, telling resolvers how long they're allowed to cache the answer before checking again. Northbridge Retail's main site record might sit at an hour, which is efficient day to day. Before migrating their checkout service to a new server, they lower that record's TTL well in advance, so the real cutover is visible almost immediately instead of trickling out slowly.

## Segment 5 (outro)

DNS answers one question: what address does this name point to right now. Up next, lesson eleven: DHCP, which answers a related question — how a device gets an address of its own in the first place.
