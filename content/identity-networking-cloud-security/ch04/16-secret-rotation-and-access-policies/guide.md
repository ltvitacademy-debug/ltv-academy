# Lesson 16 — Secret Rotation and Access Policies

**Chapter 4 · Secrets Management in the Cloud · Lesson 16 of 32**

## What you'll learn

- What **secret rotation** actually buys you when a credential leaks without anyone noticing
- Why rotation limits the *window of usefulness* of a leaked secret instead of preventing the leak itself
- What **least-privilege access policies** mean in practice for who can read a given secret
- How rotation and least-privilege access work together as the two practical controls this chapter has been building toward

## Rotation: limiting the damage of a leak you don't know about

**Secret rotation** means periodically changing a secret's value —
automatically, on a schedule — rather than setting it once and
leaving it unchanged indefinitely. The reason this matters isn't
that rotation *prevents* a leak. A secret can still end up in a
build log, a misconfigured public repo, or an old laptop backup no
matter how good your rotation policy is. What rotation changes is
what happens **after** that leak, specifically in the gap before
anyone notices it:

- Without rotation: a leaked password that nobody detects stays valid **indefinitely** — it could be used a day, a month, or a year later
- With rotation: that same leaked password stops working the next time rotation runs, whether anyone caught the leak or not

A credential rotated every 30 days has, at most, a 30-day window of
usefulness to someone who stole it without being noticed. That's the
entire value proposition — rotation assumes leaks will sometimes go
undetected, and shrinks the damage a forgotten or missed leak can do,
rather than assuming detection will always catch it in time.

## Access policies: least privilege in practice

Rotation limits how long a leaked secret works; **access policies**
limit who can get at the secret in the first place. The governing
idea is **least privilege**: a secret should be readable only by the
specific application or service identity that actually needs it —
never by "everyone in this resource group" or "every developer on
the team," even though that broader access would often be more
convenient.

```
# Least privilege: one identity, one secret, nothing broader
grant: read secret "prod/orders-db" to identity "orders-api-managed-identity"
deny:  everything else, by default
```

In both Azure Key Vault and AWS Secrets Manager / Parameter Store,
this is the default posture to design toward: each secret has its
own small list of who can read it, built from what's actually
needed, not from what's convenient to set up once. A broad grant —
giving an entire team "read all secrets" access because it's easier
than scoping each one individually — turns one compromised developer
account into access to every secret in the vault at once.

## The two controls together

Rotation and least-privilege access aren't alternatives to each
other — they cover different failure modes. Access policies try to
prevent unauthorized reads from happening at all. Rotation assumes
that, despite your best access control, a leak will sometimes slip
through anyway, and makes sure that leak expires. A mature secrets
practice uses both: tightly scoped access policies so as few
identities as possible can ever read a given secret, and rotation on
anything sensitive enough to warrant it, so an undetected leak still
runs out the clock.

## Key terms

| Term | Meaning |
|---|---|
| Secret rotation | Automatically changing a secret's value on a schedule, limiting how long a leaked credential stays valid |
| Window of usefulness | The length of time a leaked-but-undetected credential remains valid before rotation invalidates it |
| Least privilege | Granting a secret's read access only to the specific identity that needs it, not broadly |
| Access policy | The rule set (in Key Vault, Secrets Manager, or Parameter Store) defining exactly which identities can read which secrets |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
does rotation matter even for a secret that was never actually
leaked, and why is "grant read access to the whole team" the opposite
of least privilege?
