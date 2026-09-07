# Lesson 82 — Dynamic Row-Level Security

**Chapter 11 · Security · Lesson 4 of 5**

## What you'll learn

- Why dynamic RLS scales better than a static role per value
- How `USERPRINCIPALNAME()` behaves differently in Desktop vs. service
- The **Test as role** feature, and its real limitation
- How to build a working user-mapping table pattern

## The problem static roles don't scale to

A static role like `[Region] = "West"` (Lesson 80) works for a
handful of regions — but a real sales org with 40 territories would
need 40 separate roles, one per territory, each manually assigned.
**Dynamic RLS** solves this with a *single* role whose filter adapts
based on who's actually signed in:

```
[UserEmail] = USERPRINCIPALNAME()
```

One role, one filter expression, and every user assigned to it sees
only the rows matching their own identity in a **user-mapping table**
— a small table you add to the model, pairing each person's UPN/email
with the territory (or region, or customer, or whatever) they should
see.

## `USERNAME()` vs. `USERPRINCIPALNAME()` — format matters

| Function | In Desktop | In the service |
|---|---|---|
| `USERNAME()` | `DOMAIN\username` | User Principal Name (UPN) — like an email |
| `USERPRINCIPALNAME()` | `user@contoso.com` format | Also the UPN |

This is the single most common source of "dynamic RLS isn't working"
bug reports: whichever function you use, your user-mapping table's
values must match the *format that function returns in the service* —
not necessarily what it shows while you're testing in Desktop.

## Validating with Test as role

Once a role is defined and you're viewing the published report:

1. Select **More options (...)** next to the role, then **Test as
   role**.

   ![Screenshot of the Test as role option.](/courses/power-bi/ch11/82-dynamic-rls/row-level-security-test-role.png)
   *Dashboards can't be tested this way — you're redirected to the underlying report.*

2. Confirm the report shows only the filtered rows, and that dynamic
   RLS reflects the identity shown under **Now viewing as**:

   ![Screenshot of the Now viewing as dropdown for testing as a specific person.](/courses/power-bi/ch11/82-dynamic-rls/row-level-security-test-role-2.png)
   *You can test a role, a combination of roles, or impersonate a specific person's permissions.*

## The limitation worth remembering

**Test as role uses your own identity** to evaluate the dynamic
expression — `USERPRINCIPALNAME()` returns *your* UPN while testing,
not the UPN of whoever you're trying to simulate. It's genuinely
useful for confirming the *filter logic* works, but it can't prove a
specific colleague will see the right data — for that, they have to
sign in and view the report themselves.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic RLS | A single role whose filter adapts based on the signed-in user's identity |
| User-mapping table | A small table pairing each user's UPN/email with what they should see |
| Test as role | A service feature simulating a role's filter using your own identity |
| UPN (User Principal Name) | A sign-in identifier, formatted like an email address |

## Lab

1. Add a small user-mapping table to your `AdventureWorksDW2014`
   model — two columns: an email/UPN column and a territory column,
   with a couple of made-up rows for testing.
2. Build a dynamic RLS role filtering on
   `[UserEmail] = USERPRINCIPALNAME()`, relating the mapping table to
   `DimSalesTerritory`.
3. Publish, then use **Test as role** to confirm the filter logic
   works before ever assigning a real person to it.

## Check yourself

You're ready for Lesson 83 when you can explain why Test as role
can't actually prove what a specific external colleague will see,
even though it's genuinely useful for checking the filter itself.
