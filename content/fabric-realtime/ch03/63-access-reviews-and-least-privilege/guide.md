# Lesson 63 — Access Reviews and Least Privilege

**Chapter 3 · Production Data Engineering · Lesson 63 of 70**

## What you'll learn

- Least privilege — granting only what's actually needed, nothing more
- Permission creep — how access grows even when nobody's doing anything wrong
- Access reviews as the recurring fix, same pattern as Lesson 55's capacity checks
- Where this connects to everything else Chapter 3 already built

## Least privilege, stated plainly

**Least privilege** means every person and every automated process
gets exactly the access needed to do its job, and no more. Lesson
44 already applied a version of this to environments — dev's
relaxed permissions, prod's tightly scoped ones. This lesson
generalizes it: the same discipline applies to *individual* access
grants, not just environment-wide defaults.

## Permission creep — nobody did anything wrong

```
Month 1:  An engineer gets temporary write access to the prod
          KQL Database to help resolve an incident (Lesson 57)
Month 2:  The incident is long resolved. The access grant is still there --
          nobody revoked it, because nobody was specifically watching for that.
Month 12: Ten more grants like this exist, scattered across the workspace,
          each individually reasonable at the time, collectively excessive now.
```

**Permission creep** is the natural, gradual accumulation of access
that was reasonable when granted but was never revoked once it
stopped being needed. Nobody in this scenario did anything
malicious or even careless in the moment — the problem is entirely
that granting access is a deliberate action, while revoking it
almost never is, unless something forces the question.

## Access reviews — the recurring fix

```
Every quarter:
1. List every grant of write/admin access across the workspace
2. For each one, ask: does this person still need this, right now?
3. Revoke anything the answer is "no" or "not sure" to
```

This is the same structural fix as Lesson 55's capacity
right-sizing: a recurring, scheduled check rather than a one-time
setup, because access needs — like compute needs — drift away from
whatever was true when the grant was first made. "Not sure" is
treated the same as "no" deliberately: the burden of justifying
continued access should sit with keeping it, not with revoking it.

## Where this connects to everything else

Lesson 61's masking controls who sees sensitive values; access
reviews control who has broader write/admin rights that could
bypass those controls entirely. Lesson 62's secrets management
protects specific credentials; access reviews protect the human and
service accounts that could request those credentials in the first
place. None of Chapter 3's individual security lessons fully works
without this recurring check behind it.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Exactly the access needed, and no more |
| Permission creep | Access that accumulates because revoking is never automatic |
| Access review | A recurring, scheduled check, the same pattern as capacity right-sizing |

## Check yourself

You're ready for Lesson 64 when you can explain, without looking: why
does permission creep happen even when nobody involved does anything
wrong?
