# Lesson 2 — Scoping a Penetration Test So Everyone Agrees on the Boundaries

**Chapter 1 · Ethical Hacking Fundamentals and Methodology · Lesson 2 of 4**

## What you'll learn

- Why vague scope ("test our network") is the single most common cause
  of pentest disputes — and how real scoping documents prevent it
- How to define in-scope and out-of-scope systems precisely enough that
  neither the client nor the tester is ever surprised
- The real-world scoping questions around cloud assets, third-party
  services, denial-of-service testing, and social engineering
- What happens, in a professionally run engagement, when the tester
  discovers something interesting just outside the agreed boundary

## Scope is where authorization becomes specific

Lesson 1 covered *why* written authorization has to exist before testing
starts. Scoping is the practical work of turning that authorization into
a precise map: exactly which systems, applications, and techniques are
in bounds, and which aren't. Authorization answers "are we allowed to
test this client at all." Scope answers "which of their systems,
specifically, and how."

This matters because the two sides of an engagement have genuinely
different incentives if scope is left loose. A client may assume "test
our network" obviously excludes their production payroll database,
production customer data, and the office printers — but "obviously"
isn't a legal or contractual term. A tester working from a vague mandate
might reasonably touch something the client never intended to expose to
testing. A precise, written scope is how both sides agree on the same
boundary *before* anyone starts, instead of arguing about it after
something breaks.

## Defining in-scope and out-of-scope precisely

Real scoping documents name systems explicitly rather than describing
them loosely:

```
IN SCOPE
  - Web application at app.clientdomain.com (production)
  - API gateway: 203.0.113.0/24
  - Corporate VPN endpoint (external-facing only)

OUT OF SCOPE
  - Payroll and HR systems (hosted by a separate ADP instance)
  - Production payment processing (PCI-scoped, tested separately)
  - Physical office locations (no on-site social engineering)
  - Any system not explicitly listed above
```

Notice the last line: a well-written scope defaults to exclusion.
Anything not named is out of bounds, which protects the tester from
"well, you didn't say we *couldn't* touch that" arguments later.

## The questions a scoping conversation has to settle

A few categories cause more scope disputes than anything else, so a
professional scoping process addresses them explicitly, every time:

- **Cloud and third-party assets.** If the client's app runs on AWS,
  Azure, or a SaaS vendor, does the client's authorization cover the
  underlying cloud infrastructure, or only the application layer they
  control? (Most cloud providers have their own rules about testing
  their infrastructure — AWS and Azure both publish acceptable-use
  policies covering this.)
- **Denial-of-service testing.** Is intentionally degrading availability
  in scope at all? Most engagements explicitly exclude DoS testing
  against production systems unless a client deliberately wants
  resilience tested in a controlled window.
- **Social engineering.** Is phishing specific named employees in
  scope? Physical premises? These require their own explicit
  sign-off, often from HR or legal, separate from the technical scope.
- **Data handling.** What happens to any sensitive data the tester
  accesses or exfiltrates during testing — how it's stored, for how
  long, and how it's destroyed afterward.

## When the tester finds something just outside the line

This happens constantly in real engagements: scanning an in-scope subnet
turns up a server that's reachable but was never named in scope. The
professional answer is never "test it anyway, it's basically in scope" —
it's to stop, document what was observed from outside, and go back to
the client for a written scope amendment before touching it further.
Scope changes mid-engagement are normal and expected; testing outside
scope without that written amendment is not a gray area — it's exactly
the unauthorized access problem Lesson 1 covered.

## Key terms

| Term | Meaning |
|---|---|
| Scope | The precise, written list of in-scope and out-of-scope systems, techniques, and assets agreed to before testing begins |
| Default-exclude scoping | The practice of listing only what's in scope and treating everything else as explicitly out of bounds |
| Scope amendment | A written, signed update to the scope document, required before testing any system discovered outside the original boundary |
| Acceptable-use policy | A cloud provider's own published rules (e.g. AWS, Azure) governing what security testing is permitted against their infrastructure |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does a well-written scope list only what's in scope rather than only
what's excluded, and what's the correct next step when a tester finds a
reachable system that was never named in the scope document?
