# Lesson 92 — Configure Security & Refresh

**Chapter 12 · Capstone Project · Lesson 9 of 10**

## What you'll learn

- Adding an RLS role to this specific model, and why it's realistic here
- Scheduling refresh against your gateway from Chapter 10
- Sharing the app with an actual, scoped audience
- The final security/refresh checklist before calling this "live"

## Why RLS makes sense for this project

Adventure Works Cycles has regional sales managers who should only
see their own territory's numbers — a textbook case for the
**dynamic RLS** pattern from Lesson 82. Rather than one role per
territory, build a single role using a user-mapping table:

```
[UserEmail] = USERPRINCIPALNAME()
```

relating each manager's email to their `DimSalesTerritory` region.
Anyone assigned to this role, once published, sees only their own
territory across every page — Regional Performance, Product
Profitability, and Fulfillment & Trend alike, since RLS filters the
whole semantic model, not one page at a time.

## Assigning members

Following Lesson 81: hover the semantic model in your capstone
workspace, **More options → Security**, and add real (or test)
email addresses to the role. Remember Lesson 79's rule — this only
restricts people with the workspace **Viewer** role, not Contributors
or above.

## Validating before trusting it

Use **Test as role** (Lesson 82) to confirm a manager sees only their
territory's data before adding any real person to the role. If the
filter doesn't work as expected, check your user-mapping table's
email format against what `USERPRINCIPALNAME()` actually returns in
the service — the exact bug Lesson 82 warned about.

## Scheduling refresh

Following Lesson 77: on the semantic model's **Refresh → Schedule
refresh** screen, confirm your Chapter 10 gateway is online, then
set a daily refresh — once a night is realistic for a sales
dashboard nobody needs updated by the minute.

## Sharing with the actual audience

Back in the app's **Audience** tab (Lesson 73), add the VP of Sales
and regional managers to the audience group, granting **view** access
only — this project's scope (Lesson 84) never called for anyone
outside leadership to edit or rebuild it.

## The final checklist

- [ ] RLS role built and validated with Test as role
- [ ] Real members (or realistic test accounts) assigned to the role
- [ ] Scheduled refresh configured, gateway confirmed online
- [ ] App audience matches exactly who Lesson 84's scope intended
- [ ] No one outside the intended audience has been granted Build or
      Contributor-level access

## Key terms

| Term | Meaning |
|---|---|
| Dynamic RLS (recap) | One role, filtering per signed-in user via a mapping table |
| Scheduled refresh (recap) | An automatic, gateway-dependent refresh on a set cadence |

## Lab

1. Build and validate a dynamic RLS role restricting sales managers to
   their own territory.
2. Configure a daily scheduled refresh, confirming the gateway shows
   online.
3. Walk through the final checklist above, line by line, before
   moving to Lesson 93.

## Check yourself

You're ready for Lesson 93 when every box on the checklist above is
checked, and you can explain exactly what a regional manager would
and wouldn't see if they opened this dashboard right now.
