# Sandbox-to-Production Change Set Deployment Checklist

> Chapter 5's real sequence for moving any configuration change safely — build and test in a
> sandbox first, deploy with a change set, check what else is about to change, verify on the
> other side. Mirrors Lesson 36's Step 5 for onboarding Meridian Fixtures Co.'s new sales team,
> generalized to any admin change that touches a shared org.

## Before you touch production

```
[ ] 1. Build the change in a SANDBOX, not production — even a change that
       feels routine (a new permission set, one new record type) can touch a
       page layout or profile that other teams already depend on.

[ ] 2. Choose the right sandbox type for what you're testing:
       - Developer sandbox: fine for building/testing in isolation
       - Partial Copy / Full sandbox: use when you need real-shaped data
         volume to validate against (e.g. testing a report or a flow against
         something closer to production scale)

[ ] 3. List every component the change actually touches:
       [ ] New/changed objects or fields
       [ ] New/changed page layouts
       [ ] New/changed record types
       [ ] New/changed profiles or permission sets
       [ ] New/changed validation rules, flows, or approval processes
       [ ] New/changed reports or report types
       A change set has to include every dependency, not just the one thing
       you think you changed — missing a dependency is the single most common
       reason a change set deploy fails or deploys incompletely.

[ ] 4. Test the change as the actual affected user, not just as yourself
       (System Administrator access hides a lot of real-world problems).
```

## Checking for collisions before you deploy

```
[ ] 5. Check Release Updates / Critical Updates for anything scheduled to
       activate soon that could interact with your change (an assignment
       rule, a sharing recalculation, a platform behavior change).

[ ] 6. Confirm the shared components you're about to touch (a page layout,
       a profile, a validation rule) aren't also mid-change by someone else
       — coordinate before two admins deploy conflicting changes to the same
       component in the same week.
```

## Deploying

```
[ ] 7. Build the Outbound Change Set in the sandbox, add every component
       from Step 3's list.

[ ] 8. Upload to production (or the next environment in your release path).

[ ] 9. In production, go to Inbound Change Sets and VALIDATE before you
       deploy — this runs the deployment's checks without actually
       committing it, surfacing missing dependencies before they become a
       production incident.

[ ] 10. Deploy the validated change set.
```

## After deployment — verify, don't assume

```
[ ] 11. Spot-check Login History (or the specific feature you changed) to
        confirm real users are getting the access/behavior you intended —
        the fastest way to catch a licensing, profile, or permission
        mistake before someone has to file a help-desk ticket about it.

[ ] 12. Check the Setup Audit Trail entry for your own change — confirm it
        recorded what you expected, and that nothing unexpected deployed
        alongside it.

[ ] 13. Document what changed and why, in a durable change log — not just
        in your own memory. The next admin (or future you) needs this,
        not a reconstruction from scratch.
```

## The judgment behind the order

Access changes before configuration changes, configuration before object-level tuning, and
testing before any of it touches the shared org other users already rely on. That sequencing —
not any single setting — is what "safe to deploy" actually depends on.
