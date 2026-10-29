# Lesson 3 — The Policy Engine, Policy Administrator, and Policy Enforcement Point

**Chapter 1 · Zero Trust Principles · Lesson 3 of 4**

## What you'll learn

- The three logical components NIST SP 800-207 defines to actually
  carry out the seven tenets from Lesson 2
- What the Policy Decision Point (PDP) is, and why it's really two
  components — the Policy Engine and the Policy Administrator —
  working together
- What the Policy Enforcement Point (PEP) does differently from the
  PDP, and why that separation matters
- How this model maps onto real systems you've already configured:
  Conditional Access, ZTNA gateways, and cloud-native access controls

## Three components, one access decision

NIST SP 800-207 defines a reference architecture with three logical
components that turn the seven tenets into an actual, enforced access
decision every time a subject tries to reach a resource:

- **Policy Engine (PE)** — the decision-maker. It runs a trust
  algorithm against policy and contextual input, and outputs a grant,
  deny, or revoke decision for a given subject/resource pair.
- **Policy Administrator (PA)** — the component that acts on the PE's
  decision. It's the one that actually establishes or shuts down the
  communication path, and generates or manages the session-specific
  credential or token the subject will use.
- **Policy Enforcement Point (PEP)** — the gatekeeper. It's the single
  component that both the subject and the resource communicate
  through, enabling, monitoring, and terminating the connection based
  on what the PA tells it to do.

NIST's own diagram groups the PE and PA together as the **Policy
Decision Point (PDP)** — the "brain" that decides and issues
credentials — with the PEP standing apart as the "gate" that actually
sits on the data path between subject and resource.

## What the Policy Engine actually evaluates

The PE's trust algorithm doesn't just check a password. NIST describes
it pulling in a range of inputs: a Continuous Diagnostics and
Mitigation (CDM) system reporting asset state, threat intelligence
feeds, activity logs from the network and systems involved, data
access policy, a PKI for certificate-based trust, an identity
management system, and SIEM data. You've already built pieces of
every one of those inputs in earlier courses — the PE is the
component that's supposed to pull them together into one decision
instead of leaving each one as a separate, disconnected signal.

## Why the PA and PEP are separate from the PE

The split matters because it separates *deciding* from *enforcing* —
and from *carrying the decision out*. The PE decides. The PA acts on
that decision: establishing the session, issuing the token. The PEP
is the thing that physically sits between the subject and the
resource and actually lets traffic through or blocks it, continuously,
for the life of that connection. NIST notes the PEP can be a single
logical component or split into a client-side piece (an agent on the
device) and a resource-side piece (a gateway in front of the
resource) — or even a single portal both sides pass through. The
decision itself never lives at the PEP; it only enforces what the PDP
already decided.

## Mapping this onto systems you already run

This three-part model isn't abstract once you connect it to tools you
already know:

- Azure AD/Entra **Conditional Access**'s evaluation engine behaves
  like a PE+PA pair: it evaluates signals (identity, device
  compliance, risk, location) and issues the decision plus the
  resulting session token.
- A **ZTNA gateway or SASE edge** — or an **AWS Verified Access**
  endpoint — behaves like a PEP: it's the thing actually sitting on
  the connection path, granting or cutting access based on what the
  decision engine told it, request by request.
- An **NSG, security group, or service-mesh sidecar enforcing mTLS**
  can also act as a PEP at a narrower scope — the enforcement point
  for one specific segment of the network rather than the whole access
  path.

You were already operating pieces of a PE/PA/PEP architecture before
this lesson had names for them. What changes now is being able to
point at a specific control and say precisely which of the three roles
it's playing — and where it still has gaps.

## Key terms

| Term | Meaning |
|---|---|
| Policy Engine (PE) | Runs the trust algorithm; decides grant/deny/revoke for a subject/resource pair |
| Policy Administrator (PA) | Acts on the PE's decision: establishes/ends the session, issues the token |
| Policy Decision Point (PDP) | NIST's grouping of the PE and PA together as the "brain" of the architecture |
| Policy Enforcement Point (PEP) | The gatekeeper on the data path that enables, monitors, and terminates the connection |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
specifically is the difference between what the PE does and what the
PA does, and why does the PEP never get to make the decision itself?
