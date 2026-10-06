# Report Folders and Sharing

**Chapter 2 · Report Management · Lesson 10 of 22**

A report that only you can see is barely more useful than a spreadsheet on your own laptop. Salesforce controls who can see a report through the **folder** it lives in, not through a setting on the report itself. Learn how folder sharing works and you've learned how reports and dashboards get distributed to an entire sales floor — or kept away from everyone but you.

## What you'll learn

- Why access to a report is really access to its folder
- The access levels: Viewer, Editor, and Manager
- Who you can share a folder with
- How subfolders inherit sharing from their parent
- Public, hidden, and private folders

## Every report lives in exactly one folder

Reports and dashboards tabs each list a set of **folders** on the left: Created by Me, Shared with Me, All Folders. A report's visibility is controlled entirely by which folder it's saved into and how that folder is shared — not by a permission on the report itself. Move a report to a different folder and its audience changes immediately, with no other setting to touch.

## Sharing a folder

From the folder's dropdown menu, choose **Share**. The Share Folder dialog lets you pick **who** (a user, a public group, a role, or a role-and-subordinates) and **what access level** they get:

| Access level | What it allows |
|---|---|
| Viewer | Run reports in the folder; can't edit or move them |
| Editor | Run and edit reports and dashboards in the folder |
| Manager | Full control, including re-sharing the folder with others |

The **Who Can Access** list on that same dialog shows everyone currently sharing the folder and lets you change or revoke their access level at any time.

## Subfolders inherit, folders don't nest sharing rules twice

Create a subfolder inside a shared folder and it picks up the same sharing by default — you don't have to re-share it from scratch. That's convenient for organizing a big shared folder into sub-groups, but it also means a careless subfolder can silently expose more than intended if you're not paying attention to what it inherited.

## Public, hidden, and private

A folder can be visible to the entire org, shared with specific audiences as above, or marked **Hidden from Sharing List** / kept private so only the owner (and admins) can see it at all. Scratch work and drafts belong in a private folder until they're ready to share — nothing stops a report from being visible company-wide the moment it's saved into the wrong folder.

## Recap

- Folder sharing — not a setting on the report — is what controls who can see it.
- Viewer, Editor, and Manager are the three access levels, each more permissive than the last.
- Subfolders inherit their parent's sharing automatically.
- Use private or hidden folders for anything that isn't ready for an audience yet.

## Check yourself

A colleague says they shared "just this one report" with the sales team, but now the whole team can see three other reports too. What's the most likely explanation?
