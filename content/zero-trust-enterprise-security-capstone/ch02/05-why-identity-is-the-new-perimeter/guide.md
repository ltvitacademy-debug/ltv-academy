# Lesson 5 — Why Identity Is the New Perimeter

**Chapter 2 · Verifying Identity Explicitly · Lesson 1 of 4**

## What you'll learn

- Why "verify explicitly" means every access decision is an identity
  decision, not a network-location decision
- What broke in the old perimeter model once work moved off the
  corporate network and onto SaaS, mobile devices, and public cloud
- How the signals you already know from Conditional Access and PIM
  — user, device, location, risk, session — replace the firewall as
  the actual control point
- Why "identity is the new perimeter" is a design statement, not a
  slogan: it changes where you put your controls, not just what you
  call them

## The old model: trust followed the network

Classic network security drew one hard line. Inside the corporate
network — behind the firewall, on the VPN, plugged into the office
switch — you were trusted. Outside it, you weren't. Access control
largely meant: get the person onto the trusted network, and most of
the hard work was done. A user who successfully connected to the VPN
could usually reach a wide swath of internal systems with only a
username and password standing between them and the data.

That model made sense when "the network" and "the organization" were
roughly the same shape. It stopped making sense once they weren't.
SaaS applications live outside any network you control. Employees
connect from laptops on home Wi-Fi, phones on cellular data, and
airport kiosks. Contractors and partners need access without ever
touching your VPN. The moment a resource can be reached from the
public internet with valid credentials, the network perimeter isn't
protecting it — the credentials are. And credentials get phished,
reused, and stolen constantly, which means a model that trusts
"on the network" is really trusting "whoever has the password."

## The new model: trust follows the identity, every time

Zero trust's "verify explicitly" pillar relocates the control point.
Instead of asking "is this connection coming from inside the
network?", every single request to every resource asks: who is this,
on what device, from where, carrying what risk signals, right now?
Network location becomes just one more signal among several — useful,
but no longer sufficient on its own and no longer necessary on its
own either.

You've already built the muscle for this in the identity course: a
Conditional Access policy doesn't grant access because a connection
originated somewhere trusted. It evaluates the user's group
membership, the sign-in risk Identity Protection assigned to this
specific attempt, whether the device meets compliance, and the
sensitivity of the app being requested — then renders a decision:
allow, block, or allow-with-conditions like requiring MFA. Privileged
Identity Management applies the same logic to elevation: a user isn't
"an admin" as a standing network-location fact, they're eligible for
an admin role that gets activated, justified, and time-boxed per
request. Both patterns already treat identity-plus-context as the
real perimeter. This chapter makes that pattern explicit and extends
it with two more signals — continuous evaluation and device
compliance — before Lesson 8 assembles all of it into one fabric that
also reaches into AWS.

## Why this is an architectural shift, not a rebrand

Calling identity "the new perimeter" isn't just evocative language —
it changes three concrete things about how you design controls:

1. **The control point moves.** Instead of concentrating defenses at
   network chokepoints (firewalls, VPN concentrators), you concentrate
   them at the policy decision point that evaluates every access
   request — Conditional Access, in the Microsoft Entra world.
2. **"Trusted" stops being permanent.** A user on the corporate
   network at 9am isn't automatically still trustworthy at 9:05am if
   their risk signal changes. Trust has to be re-earned continuously,
   which is exactly the gap Lesson 6's Continuous Access Evaluation
   closes.
3. **The device becomes part of the identity story.** The same valid
   credentials typed into a compliant, encrypted, managed laptop and
   into an unknown personal device are not the same risk — which is
   why device compliance (Lesson 7) is evaluated alongside identity,
   not as a separate, optional check.

## Key terms

| Term | Meaning |
|---|---|
| Verify explicitly | The zero-trust tenet that every access request is authenticated and authorized using all available signals, rather than trusted by default based on network location |
| Perimeter (zero-trust sense) | The policy decision point that evaluates identity, device, risk, and context on every request — not a network boundary |
| Policy decision point | The component (Conditional Access, in Entra ID) where identity and context signals are evaluated to produce an allow/block/conditional decision |
| Standing trust | The old model's assumption that being on the network, or holding a role, grants access indefinitely rather than per-request |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does a valid VPN connection no longer mean "trusted" in a zero-trust
design, and which three signals does an access decision evaluate
instead of network location?
