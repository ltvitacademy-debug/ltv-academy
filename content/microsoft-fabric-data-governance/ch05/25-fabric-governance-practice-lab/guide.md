# Lesson 25 — Fabric Governance Practice Lab

**Chapter 5 · Governed Analytics · Lesson 25 of 25**

## What you'll learn

- How to actually set up a small, governed Fabric workspace yourself, end to end
- Which specific setting from each of this course's five chapters you'll touch, in order
- How to verify your own work at each step, not just follow instructions
- Where the Data Governance career path goes next

## This is the lab, not another case study

Lesson 24 walked through a fictional company. This lesson is yours to actually do — in a free Fabric trial tenant, or your own organization's sandbox workspace if you have one. Nothing here needs production data; a handful of rows you type in yourself is enough to prove each setting actually works the way this course said it would.

## The exercise

Work through these five tasks in order. Each one maps to one chapter of this course — don't skip ahead, since later steps assume the earlier ones are in place.

**1. Set up the structure (Chapter 1).** Create a new workspace. Open its settings and assign it to a domain (create one if your tenant doesn't have one yet — call it anything, `Practice` works fine). Add a second account if you have one available, or at least open the workspace's **Manage access** pane and confirm you understand the difference between Admin, Member, Contributor, and Viewer before assigning anyone a role.

**2. Land real data, governed (Chapter 2).** Create a Lakehouse inside that workspace. Upload a small CSV (even five rows of made-up sales data) into **Files**, then use **Load to Tables** to turn it into a real Delta table. Open OneLake's security settings for that Lakehouse and note where you'd restrict a folder if this were sensitive data, even if you don't apply a restriction yet.

**3. Protect it (Chapter 3).** Open the Lakehouse's default semantic model. Apply a sensitivity label to it — Public is fine for practice data, but walk through what Confidential or Highly Confidential would change. If your tenant has row-level security configured anywhere, open its role editor and read through an existing DAX filter expression, even if you don't write a new one.

**4. Make it discoverable (Chapter 4).** Open the OneLake catalog and find the item you just created. Confirm its owner, lineage, and documentation are what you expect. Open its item settings and set Endorsement to **Promoted** — you're the owner, so you can. Try to set it to **Certified** and notice what happens if certification isn't enabled or you're not an authorized reviewer in your tenant.

**5. Close the loop (Chapter 5).** Open your semantic model's **Manage permissions** page and confirm who has Build access — right now, that's probably just you. Write, in plain English, what a **Request access** flow should say if a teammate asked for Build permission tomorrow. If your organization already uses Purview, note (even without touching it) where this workspace's items would need to be scanned in to join the enterprise catalog.

## Check your own work

For each of the five tasks above, you should be able to answer, specifically — not generally — for the item you just built:

- Which domain and workspace is this in, and who has which role there?
- Where does its underlying data actually live, and is it a copy or a shortcut?
- What sensitivity label does it carry, and who set it?
- Is it Promoted, Certified, or neither — and who is allowed to change that?
- Who can Build against it right now, and how would a new request actually get handled?

If you can answer all five without opening five different screens to check, you've internalized the course, not just completed the lab.

## Key terms

| Term | Meaning |
|---|---|
| Domain | The organizing boundary a workspace belongs to, set in Chapter 1 |
| Load to Tables | Turning a raw file into a governed Delta table, from Chapter 2 |
| Sensitivity label | The protection classification an item carries, from Chapter 3 |
| Endorsement | The Promoted/Certified/Master Data discoverability signal, from Chapter 4 |
| Manage permissions | Where Build, Read, and Reshare get granted, from Chapter 5 |

## Lab

Complete the five numbered tasks above, in your own Fabric trial or sandbox tenant, in order. Keep a short written note next to each one — one sentence, in your own words, for what that chapter's governance control is actually protecting against. That note is the real deliverable, more than the workspace itself.

## Where the path continues

This closes Microsoft Fabric Data Governance. Congratulations — you've gone from Chapter 1's tenant-level structure all the way through a certified, permissioned, cataloged semantic model feeding an enterprise Purview catalog. The Data Governance career path continues next with **Databricks Unity Catalog Governance** — the same governance instincts you just practiced here, applied to Databricks' own catalog, access model, and lineage tooling.

## Check yourself

Before moving on, can you explain, without looking: for the item you built in this lab, which single setting would break first if nobody maintained it — and which chapter of this course taught you to notice that?
