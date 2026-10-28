# Lesson 7 — DNS: How Names Become Addresses

**Chapter 2 · Network Infrastructure & Services · Lesson 7 of 32**

## What you'll learn

- The real step-by-step DNS resolution process: recursive resolver → root → TLD → authoritative server
- The actual DNS record types you'll see constantly — A, AAAA, CNAME, MX, TXT, NS
- What `nslookup` and `dig` actually show you, and how to read their output
- Why TTL (time to live) caching matters for both performance and troubleshooting

## Why DNS exists

Humans remember names; computers route by number. DNS (the Domain Name System) is the lookup
service that turns a name like `www.example.com` into the IP address a router can actually forward
traffic to. Without it, you'd have to memorize an IP address for every site you visit, and every
site would be stuck using one address forever, since there'd be no name layer to point somewhere
new.

## The real resolution path

Resolving a name is not one single lookup — it's a chain of them, and understanding that chain is
what makes DNS troubleshooting make sense. When your laptop asks "what's the IP for
`www.example.com`," here's what actually happens:

1. Your laptop asks its configured **recursive resolver** (often your ISP's resolver, or a public
   one like `8.8.8.8` or `1.1.1.1`). This resolver does all the legwork on your behalf.
2. The resolver, if it doesn't already have the answer cached, asks a **root server** (one of 13
   logical root server addresses that anchor all of DNS) — "who handles `.com`?"
3. The root server doesn't know the final answer, but it points the resolver to a **TLD server**
   for `.com`.
4. The TLD server doesn't know the final answer either, but it points the resolver to the
   **authoritative server** for `example.com` specifically — the server the domain's owner actually
   configured.
5. The authoritative server gives the real answer: the A record for `www.example.com`.
6. The resolver hands that answer back to your laptop, and caches it for next time, for as long as
   the record's TTL allows.

This back-and-forth (root → TLD → authoritative) is called **iterative** resolution from the
resolver's point of view, while the single round-trip your laptop makes to its resolver is called
**recursive** — the resolver does the recursion so your laptop doesn't have to.

## The record types you'll see constantly

| Record | Meaning |
|---|---|
| A | Maps a name to an IPv4 address |
| AAAA | Maps a name to an IPv6 address |
| CNAME | An alias — points one name to another name, not directly to an address |
| MX | Mail exchange — which mail server handles email for this domain, and in what priority order |
| TXT | Free-form text — commonly used for domain ownership verification and email anti-spoofing (SPF/DKIM) records |
| NS | Name server — which servers are authoritative for this domain |

A `CNAME` is worth calling out specifically: `www.example.com` might be a `CNAME` pointing to
`example.com`, which in turn has the actual `A` record. The resolver has to follow that chain all
the way to an `A` or `AAAA` record before it has a usable IP address.

## What `nslookup` and `dig` actually show

```
$ nslookup www.example.com
Server:   8.8.8.8
Address:  8.8.8.8#53

Non-authoritative answer:
Name:    www.example.com
Address: 93.184.216.34
```

"Non-authoritative answer" means exactly what it sounds like: this answer came from your
resolver's cache, not fresh from `example.com`'s own authoritative server. `dig` shows more of the
underlying mechanics in one shot:

```
$ dig www.example.com

;; ANSWER SECTION:
www.example.com.    299    IN    A    93.184.216.34
```

That `299` is the record's remaining **TTL**, in seconds — proof the record came from cache and
hasn't fully expired yet. `dig www.example.com +short` strips all of that down to just the
address, which is handy in scripts.

## TTL and caching: why DNS changes take time to show up

Every DNS record is published with a **TTL** — how long a resolver is allowed to cache it before
it has to ask again. A low TTL (say, 300 seconds) means changes propagate fast but the
authoritative server gets asked more often; a high TTL (say, 86400 seconds, a full day) means less
load on the authoritative server but a change you make today might not be visible everywhere for
up to a day, since resolvers around the internet are all still serving their last cached answer
until it expires. This is exactly why anyone planning a DNS cutover lowers the TTL days in advance.

## Key terms

| Term | Meaning |
|---|---|
| Recursive resolver | The server your device asks; it does the full root → TLD → authoritative lookup on your behalf |
| Root server | One of the top-level servers that points resolvers toward the right TLD server |
| TLD server | A server authoritative for a top-level domain like `.com`, pointing toward the right domain's own server |
| Authoritative server | The server that holds the actual, real DNS records for a specific domain |
| A / AAAA record | Maps a name to an IPv4 / IPv6 address |
| CNAME record | An alias that points one name to another name, not to an address directly |
| TTL | How long, in seconds, a resolver is allowed to cache a record before re-checking it |

## Check yourself

If you change a domain's A record right now, why might some users around the world still reach
the old IP address for up to a day afterward?
