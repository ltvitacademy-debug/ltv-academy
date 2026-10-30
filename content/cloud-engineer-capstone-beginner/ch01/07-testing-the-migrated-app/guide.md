# Lesson 7 — Testing the Migrated App End to End

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 7 of 10**

## What you'll learn

- Why testing each piece in isolation (Lessons 4–6) isn't the same as testing the whole system
  together
- How to build a short, repeatable end-to-end test checklist instead of testing by vibes
- How to confirm monitoring actually works, not just that it's configured
- What "ready for cutover" means concretely, and what still falls short of it

## Why isolated checks aren't enough

Lesson 4 validated the images. Lesson 5 validated the VM serves traffic. Lesson 6 validated an
alert rule exists. Each of those checks passing doesn't guarantee the whole system works
together the way a real customer will actually experience it — a product page could load, but
reference a broken image URL; the app could run fine, but the alert that's supposed to catch a
problem could be silently misconfigured. End-to-end testing means walking through the system as
a user and as an on-call engineer would, not just confirming each piece in isolation.

## A real end-to-end checklist

1. **Load the catalog homepage** at `vm-catalog01`'s public address (or its DNS name, if one's
   assigned) and confirm the page returns `200 OK` and renders correctly.
2. **Browse to at least three different product categories**, not just one — confirming the
   migration works across the catalog, not just the first page someone happened to test.
3. **Confirm every product image loads from its Blob Storage URL**, with no broken-image icons
   and no requests still pointing at the old on-prem local path.
4. **Check the Activity Log** for the resource group to confirm every resource was created the
   way it was intended, with no unexpected changes from testing along the way:

```
AzureActivity
| where ResourceGroup == "rg-driftwood-eastus-catalog"
| where TimeGenerated > ago(7d)
| project TimeGenerated, Caller, OperationNameValue, ActivityStatusValue
```

5. **Trigger the alert rule for real**, rather than trusting it exists. A short CPU-stress
   command on the VM, left running past the 5-minute window, should produce an actual email to
   the Action Group's addresses:

```
stress-ng --cpu 2 --timeout 360s
```

6. **Confirm the alert resolves** once the stress test ends and CPU drops back under 80% —
   an alert that fires but never clears is as much a configuration problem as one that never
   fires at all.

## What "ready for cutover" actually means

After this checklist passes, "ready for cutover" means: the app renders correctly across the
catalog, every image loads from its new location, the Activity Log shows a clean resource
history, and the alert rule has been proven to both fire and clear — not assumed to work because
the `az monitor metrics alert create` command didn't return an error. Anything that fails this
checklist gets fixed now, while there's still a buffer before launch — not discovered during the
actual cutover in Lesson 9.

## What this checklist doesn't cover

Consistent with the project's scope, this is correctness and basic reliability testing, not load
testing at full launch-day traffic, security penetration testing, or disaster-recovery failover
testing. Those are real practices for a more mature platform, not what this Beginner project's
deadline calls for.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end test | Validating the whole system together, the way a real user or on-call engineer would experience it |
| Broken-image check | Confirming no part of the app still references the old on-prem local file path |
| Alert resolution | An alert clearing once its condition stops being true, proving it isn't stuck permanently firing |
| Ready for cutover | The concrete, checked state a migration needs to reach before the real switch-over |

## Lab

Run the full six-step checklist above against your own `vm-catalog01` setup, including actually
triggering the CPU alert and confirming the notification email arrives and later clears. Note
anything that fails, and fix it before moving on.

## Check yourself

You're ready for Lesson 8 when you can explain, from memory, why testing images, VM, and
monitoring separately isn't the same as testing them together, and why triggering the alert for
real matters more than confirming the alert rule merely exists.
