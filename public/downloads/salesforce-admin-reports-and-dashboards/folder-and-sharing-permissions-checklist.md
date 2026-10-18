# Folder & Sharing Permissions Checklist

> Access to a report is really access to its FOLDER, not a setting on the report itself (Lesson
> 10). Work through this before sharing anything, and whenever someone reports seeing more (or
> less) than expected.

## Before sharing a folder

```
[ ] 1. Confirm the report/dashboard is actually saved in the folder you
       think it's in -- moving a report to a different folder changes its
       audience immediately, with no other setting involved.

[ ] 2. Decide the access level deliberately, don't default to the broadest one:
       [ ] Viewer  -- can run reports in the folder, can't edit or move them
       [ ] Editor  -- can run AND edit reports/dashboards in the folder
       [ ] Manager -- full control, including re-sharing the folder further

[ ] 3. Pick the recipient type on purpose:
       [ ] Specific user
       [ ] Public group
       [ ] Role
       [ ] Role and subordinates

[ ] 4. Check what ELSE already lives in this folder before sharing it.
       Sharing "just one report" actually shares every report and dashboard
       already saved in the same folder -- a careless shared folder exposes
       everything in it, not just the one item you meant to share.
```

## Subfolders — the inheritance gotcha

```
[ ] 5. Before creating a subfolder inside an already-shared folder, confirm
       you WANT it to inherit the parent's sharing automatically -- that's
       the default behavior, not an opt-in.

[ ] 6. If a subfolder needs a DIFFERENT (usually narrower) audience than its
       parent, re-share it explicitly after creating it -- don't assume it
       stays private just because you meant it to be.
```

## Private and hidden folders

```
[ ] 7. Keep scratch work and drafts in a PRIVATE folder until they're ready
       for an audience -- nothing stops a half-finished report from being
       visible company-wide the moment it's saved into the wrong folder.

[ ] 8. Use "Hidden from Sharing List" for folders that should exist but not
       be discoverable by browsing -- different from private; confirm which
       one the use case actually needs.
```

## Diagnosing "why can people see this report?"

```
[ ] 9. Open the folder (not the report) and check Who Can Access -- this
       lists every current grant and its access level in one place.

[ ] 10. If someone sees MORE than expected: check what else is in the same
        folder, and whether a subfolder silently inherited sharing from a
        parent folder nobody re-checked.

[ ] 11. If someone sees LESS than expected: confirm which folder the report
        actually lives in right now -- it may have been moved since it was
        last shared.
```

## The one-line rule to remember

**Move a report to control who sees it. Share the folder to control who sees everything already
in it.** Confusing "share this one report" with "share this folder" is the single most common
report-visibility mistake.
