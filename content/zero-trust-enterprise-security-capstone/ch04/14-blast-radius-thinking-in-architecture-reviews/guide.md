# Lesson 14 — Blast-Radius Thinking in Architecture Reviews

**Chapter 4 · Assume Breach: Designing for Containment · Lesson 2 of 4**

## What you'll learn

- A precise definition of blast radius: the maximum damage possible if
  one specific credential or resource is compromised
- The three dimensions you have to trace to estimate it — identity
  reach, network reach, and detection time
- Where blast radius typically hides in a real architecture: golden
  images, shared secrets, and broadly-scoped IAM roles
- A repeatable set of questions you can bring into any architecture
  review to make blast radius a documented artifact, not a guess

## Blast radius, defined

**Blast radius is the maximum scope of damage possible if one
specific credential, device, or resource is compromised.** It is not
a measure of how likely that compromise is — that's a risk or
likelihood question, and it belongs to a different conversation.
Blast radius answers a narrower, more useful question: *if this one
thing is compromised, regardless of how, what is everything an
attacker could then do with it?*

That distinction matters because likelihood estimates are routinely
wrong, and they get revised downward by people who want to ship
something. Blast radius doesn't depend on anyone's estimate of
probability. It's a structural fact about the system — this service
account can reach these fourteen resources, this VM template is shared
across these forty machines, this role can write to this storage
account — and structural facts are exactly what an architecture review
can and should pin down before approval, not after an incident forces
the question.

## Three things to trace

Estimating blast radius for a credential or resource means tracing
three separate dimensions, because they don't move together:

**Identity reach.** What can this specific identity — a user, a
service principal, a managed identity — actually do once it's
authenticated? Not what it's *supposed* to do; what the IAM role,
Azure RBAC assignment, or AWS policy attached to it actually permits.
A service account scoped to "Contributor" on a subscription has a
vastly larger identity reach than one scoped to "Storage Blob Data
Reader" on a single container, even if both were created for
"automation."

**Network reach.** If this device or workload is compromised, what
can it connect to over the network? This is where micro-segmentation
from Chapter 3 pays off directly: a workload sitting in a tightly
scoped segment with only the specific east-west paths it needs has a
small network blast radius. A workload on a flat subnet that can reach
every other host on port 445 has an enormous one, independent of what
its IAM role says.

**Detection time.** How long would it take anyone to notice this
credential or device behaving abnormally? A blast radius that's small
on paper but invisible to logging and alerting is still effectively
large, because nothing limits how long an attacker gets to operate
inside it. This is the dimension most architecture reviews skip
entirely, and it's the one Lesson 16 comes back to when it talks about
automated response.

## Where blast radius hides

Three patterns consistently produce a larger blast radius than anyone
intended, and all three are worth specifically hunting for in a
review:

**Golden images and shared templates.** A VM image or container base
that's reused across dozens of workloads often carries the same local
credentials, the same baked-in service principal, or the same
over-permissioned agent into every one of them. Compromising one
instance built from that image can mean compromising the credential
material for all of them.

**Shared secrets.** A single API key, connection string, or signing
certificate used by multiple applications multiplies blast radius by
the number of things that trust it. This is the same failure mode as
a shared local administrator password, just at the application layer
instead of the OS layer — and it's exactly the pattern Lesson 15
covers from the attacker's side.

**Broadly-scoped IAM roles.** "Just give it Contributor, it's easier"
is the single most common way blast radius grows silently. A role
scoped to exactly the operations a workload needs has a blast radius
bounded by those operations. A role scoped to "manage everything in
this subscription" has a blast radius bounded only by the subscription
itself.

## Making it a documented artifact

A blast-radius estimate only does its job if it's written down and
attached to the design, not reasoned about once in someone's head
during a meeting. For any new credential, service account, or
significant resource, a review should be able to answer, in writing:
what can this reach today (identity and network), is that reach
actually required for the stated purpose, and how would abnormal use
of it be detected. Where the honest answer is "more than it needs" or
"we wouldn't know," that's the finding — and it's a finding the review
caught before deployment instead of an incident responder discovering
it afterward.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | The maximum scope of damage possible if one specific credential or resource is compromised, independent of how likely that compromise is |
| Identity reach | What a specific identity can actually do, based on its real IAM/RBAC permissions rather than its intended purpose |
| Network reach | What a compromised device or workload can connect to, shaped directly by segmentation decisions from Chapter 3 |
| Detection time | How long it would take to notice abnormal behavior from a given credential or device — the dimension most reviews skip |
| Golden image | A shared base VM image or container template whose embedded credentials or agents multiply blast radius across every instance built from it |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: name
the three dimensions of blast radius, and describe one specific
architectural pattern — a golden image, a shared secret, or an
over-scoped IAM role — that silently grows each one.
