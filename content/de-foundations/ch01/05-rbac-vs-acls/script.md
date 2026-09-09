# Lesson 5 — RBAC vs. ACLs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two different permission systems protect everything in your data
lake. Azure doesn't make you choose between them — it checks both, in
a specific order, every single time.

## S2 · SCREENSHOT (flow diagram)

Here's that real order, straight from Microsoft's own documentation. A
request comes in. RBAC gets checked first — is the required role
assigned? If yes, access is granted immediately. Only if RBAC and any
conditions don't already grant it does Azure fall through to checking
ACLs.

## S3 · SCREENSHOT (concrete example)

Here's exactly what that looks like for three real operations. Notice
the pattern: an Owner or Contributor role assignment grants access
immediately, every single time — the ACL check on the right never
even runs. ACLs only matter for identities that DON'T already have one
of those broad roles.

## S4 · STEPS CARD (RBAC vs ACLs)

So think of it this way. RBAC is coarse but easy — a handful of role
assignments cover a whole team's access to an entire account. ACLs are
granular — read, write, execute, on one specific directory or file —
and they only exist because Lesson 4's hierarchical namespace gives
you real directories to attach them to.

## S5 · OUTRO CARD

Broad access through RBAC, genuine exceptions through ACLs — that's
how real production data lakes actually manage this. Next lesson:
managed identities, letting an application authenticate to storage
without a secret sitting in your code at all. See you there.
