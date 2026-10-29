# Lesson 1 — Why the Perimeter Model Stopped Working

**Chapter 1 · Zero Trust Principles · Lesson 1 of 4**

## What you'll learn

- What the "castle-and-moat" perimeter model actually assumed, and why
  those assumptions were reasonable for a long time
- The four real changes — cloud, remote work, BYOD, and lateral
  movement — that broke each of those assumptions one at a time
- Why a VPN, an NSG, or a firewall rule is still useful but can no
  longer be the thing your access decisions are *based on*
- How this failure, not a marketing term, is the actual reason Zero
  Trust architecture exists

## The castle-and-moat model, and what it assumed

For most of enterprise IT history, network security worked like a
castle: build a strong wall (the firewall), control the few gates in
and out (VPN concentrators, proxy servers), and trust almost
everything once it was inside. That design rested on a stack of
assumptions that used to hold up reasonably well:

- The enterprise owned and controlled its network infrastructure —
  the switches, the WAN links, the data center.
- Devices on that network were enterprise-managed and inventoried;
  if a laptop was plugged into a corporate switch, IT had probably
  imaged it.
- Users authenticated once, usually at the network edge — a VPN
  login, a domain logon — and after that, "being on the network" was
  treated as an ongoing proof of trust.
- The resources worth protecting — file servers, databases,
  line-of-business apps — lived physically inside that same
  perimeter.

Under those conditions, network location was a genuinely useful proxy
for trust. You already know the tools that enforced it: VPN gateways,
perimeter firewalls, NSGs and security groups segmenting subnets.
None of those tools are obsolete — you'll keep using them. What
stopped being true is the assumption underneath them: that reaching a
network location is itself evidence a connection should be trusted.

## What actually broke it

Four real-world shifts dismantled those assumptions, one at a time,
over roughly a decade:

**Cloud and SaaS.** Once your CRM, your ticketing system, and your
file storage live in Salesforce, Microsoft 365, and S3 buckets instead
of an on-prem data center, there is no single network perimeter left
to put a wall around. The "inside" of the castle doesn't physically
exist anymore — your most sensitive resources sit on infrastructure
you don't control, reachable from the public internet by design.

**Remote and hybrid work.** The default user location flipped from
"inside the office, on the corporate LAN" to "outside, on a home
network or coffee-shop Wi-Fi, connecting over the internet." A VPN
can still extend the perimeter out to that user, but now the perimeter
has to extend to every laptop, everywhere, all the time — which is a
very different and much leakier boundary than a building with a
badge reader.

**BYOD and third parties.** Contractors, partners, and
personally-owned devices routinely need some access to enterprise
resources, but they were never part of the "enterprise-managed device"
assumption the model depended on. Forcing every one of them through
the same all-or-nothing trust boundary as a fully managed corporate
laptop is either too permissive or too restrictive — usually both, for
different resources.

**Lateral movement.** This is the one that actually breaks the
model's security promise, not just its convenience. Once an attacker
compromises *any* credential or device that's "inside" — a phished
VPN login, a single unpatched workstation — the castle-and-moat model
offers almost no resistance to that attacker moving sideways to other
systems, because everything inside the wall was implicitly trusted by
design. The perimeter was never built to stop an adversary who's
already past it.

## Why this matters for the rest of this course

NIST SP 800-207, *Zero Trust Architecture*, names this exact shift as
its starting motivation: the enterprise's resources, users, and
devices no longer sit neatly inside one network boundary, so a
security model that keys access decisions off network location can no
longer protect what actually matters. That's not a rejection of
firewalls, NSGs, or VPNs — it's a rejection of treating "reached the
network" as equivalent to "should be trusted." The rest of this
chapter builds the architecture NIST proposes instead.

## Key terms

| Term | Meaning |
|---|---|
| Perimeter-based security | Trust model where network location (inside vs. outside a boundary) determines access |
| Castle-and-moat | Informal name for the perimeter model: a strong boundary, trusted interior |
| Implicit trust | Trust granted automatically because of where a connection originates, not because it was verified |
| Lateral movement | An attacker moving from an initial foothold to other systems, enabled when "inside" is implicitly trusted |
| De-perimeterization | The industry term for the breakdown of a single enforceable network boundary, driven by cloud and remote access |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: name
the four real-world changes that broke the castle-and-moat model, and
for each one, what specific assumption it violated.
