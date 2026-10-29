# Lesson 10 — Software-Defined Perimeters and Private Access Without a VPN

**Chapter 3 · Least-Privilege Access and Micro-Segmentation · Lesson 10 of 32**

## What you'll learn

- Why a traditional VPN grants broad network reach the moment it connects,
  regardless of which single app a user actually needs
- What a software-defined perimeter (SDP) is, and the "cloak the app until
  authorized" idea at its center
- How Zero Trust Network Access (ZTNA) products implement SDP concretely —
  an outbound-only broker connection, no inbound port ever opened
- Why this is micro-segmentation (Lesson 9) applied to remote access itself,
  not a separate idea

## What a VPN actually grants

A traditional VPN authenticates a user once, at connection time, and then
places their device onto the corporate network — often with a routable IP
in the same address space as everything else. From that point on, whatever
the network itself allows the user to reach, the user can reach, because
the VPN's job ended at "let this device onto the network." Reaching the one
internal app a contractor actually needs to use for a project almost always
means the VPN first grants reachability to a great deal else nearby on that
same network — exactly the flat-network problem Lesson 9 described, just
applied to a remote user instead of a workload.

## The software-defined perimeter idea

A **software-defined perimeter (SDP)** inverts that model. Instead of
connecting a user to a network and letting network reachability decide what
they can touch, an SDP evaluates identity and device posture first, and
only *then* opens a connection to the one specific application that
request was authorized for — nothing else on that network becomes reachable
at all. The defining property is sometimes called "default deny, cloaked
until authorized": an application behind an SDP has no listening port
exposed to the internet and doesn't respond to a connection attempt from
anyone who hasn't already been authenticated and authorized for it. To an
unauthorized party scanning the network, the application doesn't appear to
exist — there's nothing to probe, because nothing answers.

## How ZTNA implements this, concretely

**Zero Trust Network Access (ZTNA)** is the product category built around
the SDP concept, and it typically works through a broker and a lightweight
connector rather than a VPN gateway. A small connector runs inside the
private network, near the application, and makes an **outbound-only**
connection to a cloud broker — no inbound firewall port ever has to be
opened for it. When an authorized user requests access, the broker
verifies their identity and device compliance, then stitches together a
connection between the user and that one connector, scoped to that one
application. The user's device never gets a routable IP on the private
network and never sees anything else that network hosts. Real products in
this category include Zscaler Private Access, Cloudflare Access, and
Microsoft Entra Private Access — each a different implementation of the
same broker-and-connector pattern.

## The same move as Lesson 9, for a different kind of access

Lesson 9 shrank network policy from a subnet to a single workload. ZTNA
does the same shrinking for remote user access: instead of a VPN connection
granting reachability to a whole network segment, a ZTNA session grants
reachability to exactly one application, for exactly the duration of an
authorized, continuously-evaluated session. It's least-privilege access,
applied to the question "what can this remote connection even see,"
answered as narrowly as the policy allows rather than as broadly as the
network topology happens to permit.

## Key terms

| Term | Meaning |
|---|---|
| Software-defined perimeter (SDP) | A model where an application stays cloaked and unreachable until a request is explicitly authenticated and authorized |
| Zero Trust Network Access (ZTNA) | The product category implementing SDP, typically via a broker and an outbound-only connector |
| Outbound-only connector | A lightweight agent inside the private network that initiates its connection to the broker, requiring no inbound firewall rule |
| Default deny, cloaked until authorized | The property that an unauthorized party cannot even detect that a protected application exists |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why does
a traditional VPN's "connect to the network" model violate least privilege
even when the user authenticates correctly, and what specifically does the
outbound-only connector in a ZTNA deployment avoid having to do?
