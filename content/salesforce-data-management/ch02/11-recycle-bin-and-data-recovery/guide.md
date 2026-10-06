# Recycle Bin and Data Recovery

**Chapter 2 · Getting Data Out and Keeping It Safe · Lesson 11 of 20**

Every tool and technique in this chapter has been about preventing data loss — exports, backups, careful use of "permanently delete." This lesson covers the safety net that catches everything else: the Recycle Bin, where a normal (non-permanent) delete actually goes, and how to get records back out of it before they're gone for good.

## What you'll learn

- What happens to a record when it's deleted normally, not permanently
- How to find the Recycle Bin, and the difference between My and Org views
- How to restore records, and the retention window you're working against
- Why adding Recycle Bin to your navigation bar is worth the thirty seconds

## Finding the Recycle Bin

![Salesforce App Launcher, filtered to "Recycle," showing "Recycle Bin" highlighted in the search results under All Items.](/courses/salesforce-data-management/ch02/11-recycle-bin-and-data-recovery/recycle-bin-app-launcher-search.png)

If Recycle Bin isn't already in your app's navigation bar, open the **App Launcher** (the grid icon), search **Recycle**, and select it. This works in any app, any time — you don't need to be an admin to find your own deleted records this way.

## My Recycle Bin vs. Org Recycle Bin

![The Recycle Bin page, open to "My Recycle Bin," showing a list view toggle between "My Recycle Bin (Pinned list)" and "Org Recycle Bin," a single deleted record, and Restore/Delete buttons in the top right.](/courses/salesforce-data-management/ch02/11-recycle-bin-and-data-recovery/my-vs-org-recycle-bin.png)

The list view toggle in the top-left matters: **My Recycle Bin** shows only records you personally deleted. **Org Recycle Bin** (visible to admins and users with the right permission) shows everything deleted org-wide — useful when you're trying to recover something a colleague deleted, or tracking down what happened to a record nobody can explain. Both views show the same core columns: record name, type, who deleted it, and when.

## Restoring records

![The Org Recycle Bin, showing a numbered walkthrough: (1) the Recycle Bin list view selector, (2) the Restore button, (3) the Delete button, over a table of deleted Contact, Lead, and Opportunity records with their deletion dates.](/courses/salesforce-data-management/ch02/11-recycle-bin-and-data-recovery/recycle-bin-restore-delete.png)

Select one or more records with the checkboxes on the left, then click **Restore**. The record comes back exactly as it was at the moment of deletion — same ID, same field values, same relationships, as long as nothing those relationships depended on (like a parent record) was also deleted and not yet restored. **Delete** on this screen does something different from a normal delete: it permanently removes the record from the Recycle Bin immediately, the same irreversible outcome as "permanently delete" in Lesson 10's Mass Delete tool.

## The retention window

Records sit in the Recycle Bin for **15 days** before Salesforce purges them automatically — or sooner, if your org's deleted-data storage fills up and older records get purged early to make room. Fifteen days sounds generous until you're the one discovering a mistaken delete on day sixteen, which is exactly why the earlier lessons in this chapter — exports (Lesson 7), scheduled backups (Lesson 8) — exist as a second layer behind the Recycle Bin, not a replacement for it.

## Making the Recycle Bin easier to reach

If you or your users delete things often enough that hunting through the App Launcher gets old, an admin can add Recycle Bin directly to an app's navigation bar through the **Lightning App Builder**: App Settings → Navigation Items, search for Recycle Bin, add it, and save. Thirty seconds of setup saves a search every time someone needs it.

## Try it yourself

In a sandbox, delete a test record (anything low-stakes), then use the App Launcher to find the Recycle Bin and restore it. Toggle between My Recycle Bin and Org Recycle Bin to see the difference in what's listed, and check the Deleted Date column to understand how the 15-day countdown works in practice.

## Recap

- A normal delete sends a record to the Recycle Bin, not permanent deletion — that's a 15-day window to undo it.
- My Recycle Bin shows your own deletions; Org Recycle Bin shows everyone's, for admins and permitted users.
- Restore brings a record back exactly as it was; Delete on this screen is permanent and immediate.
- Exports and scheduled backups exist as a second layer behind the Recycle Bin's 15-day limit, not a substitute for it.

## Check yourself

A colleague deleted an Opportunity eighteen days ago and needs it back. In one sentence, why won't the Recycle Bin help here, and what's the fallback?
