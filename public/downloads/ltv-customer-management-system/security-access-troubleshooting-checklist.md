# Security Access Troubleshooting Checklist

> The layered diagnostic order from the Security & Access Fundamentals course's "Security
> Troubleshooting and Access Reviews" lesson, as a quick reference — use this whenever a user
> reports they can or can't see/edit something they shouldn't (or should). Required for Category
> 6 of the capstone's acceptance rubric.

## The real evaluation order

Salesforce checks access in this order. A symptom that looks like one layer is often actually a
different one — work through the layers in order instead of guessing:

```
1. Object permissions   Can this profile/permission set touch this OBJECT at all
                         (Read/Create/Edit/Delete)? If not, nothing below matters.

2. Field-Level Security  Can this profile/permission set see or edit this specific FIELD?
   (FLS)                 A user can have full object access and still be blocked on
                          one field.

3. Organization-Wide     What's the DEFAULT visibility for this record, before anything
   Default (OWD)         else adds access back?

4. Role hierarchy        Does this user's role sit above the record owner's role?
                         Access rolls UP, never down or sideways.

5. Sharing rules /       Does a specific rule or manual share grant this user access
   manual sharing        the role hierarchy alone doesn't cover?

6. Restriction /         Is anything narrowing access further for this specific
   scoping rules          user/profile, after everything above would otherwise allow it?
```

## Applying it to a real symptom

**"A user can see a record but can't edit one specific field."** This is almost always layer 2
(FLS) — the object-level Edit permission is present (they can open and edit the record), but one
field's own Edit checkbox is off for their profile or permission set. Check layer 2 *before*
chasing OWD or sharing rules, which control whether the record is visible at all, not which
fields on a visible record are editable.

**"A user can't see a record at all."** Work top to bottom: confirm object Read permission first
(layer 1) — if that's missing, nothing else matters. If object permission is fine, check OWD
(layer 3): is the default Private, and does nothing yet grant this user access back? Then role
hierarchy (layer 4): does this user's role sit above the owner's? Then sharing rules (layer 5):
is there a rule that should apply but doesn't match this specific record's criteria?

**"A user used to see something and now can't" (or the reverse).** Something changed at one
specific layer — check what changed recently (a role reassignment, a sharing rule edit, a
permission set removed) before re-deriving the whole picture from scratch. The Setup Audit Trail
is the tool for finding what changed and when.

## The gotcha: permission sets and profiles combine, they don't override

If a profile denies something, a permission set can still grant it back — **access is additive
(a union), there's no "most restrictive wins" or explicit deny from a permission set.** The one
real exception is muting: a permission set group can explicitly mute a specific permission from
one of its member permission sets. When two overlapping grants seem to disagree, the overlapping
or union access — not a guessed "whichever is stricter" — is almost always what's actually
happening. Check this specifically before concluding a setting "isn't working."

## Verifying your diagnosis, not just guessing

Use **Login As** (or an equivalent permission-check tool) to confirm the actual experience of the
affected user directly, rather than inferring it from reading Setup pages. A setting that looks
correct in Setup can still produce a different real result than expected — test as the user, not
just as an administrator reading their permissions.
