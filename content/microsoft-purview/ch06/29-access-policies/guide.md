# Lesson 29 — Access Policies

**Chapter 6 · Governance Workflows · Lesson 29 of 35**

## What you'll learn

- The self-service side of a Purview access policy: what a data consumer actually sees and clicks
- The three-click path from finding an asset to sending a request
- What happens after Send — who gets notified, and what a completed request becomes
- The four request statuses every access request moves through, and what each one means

## Why self-service access matters

Lesson 28 covered how a governance team writes a policy. This lesson follows the other half of the same system: what happens when a data consumer — someone who isn't a governance specialist, just a person who needs a dataset for their work — actually wants access to something they found in the catalog. Without a self-service path, every access need becomes a support ticket, an email thread, or a hallway conversation, routed through whoever happens to know who owns the data. Microsoft Purview's self-service access request flow exists to replace that with something searchable, trackable, and consistent — every request goes through the same few steps and leaves the same kind of record behind.

## The three-click path

**Step one: find the asset.** A consumer starts in the catalog, using either the search bar or the Browse assets option — the same discovery tools covered back in Chapter 4.

![Screenshot of the Microsoft Purview governance portal home page, with the search bar and the Browse assets tile both highlighted.](/courses/microsoft-purview/ch06/29-access-policies/search-or-browse.png)

*Search or browse — the same two entry points into the catalog a consumer already knows.*

**Step two: ask for it.** On the asset's own details page, **Request access** sits in the same menu bar as Edit, Refresh, and Delete — it isn't buried in a separate system a consumer would have to go find.

![Screenshot of a data asset's overview page in Microsoft Purview, with the Request access button highlighted in the page's action menu.](/courses/microsoft-purview/ch06/29-access-policies/request-access.png)

*Request access, right there on the asset page — no separate portal to learn.*

**Step three: submit it.** A short text box for justification, an optional checkbox for requesting on someone else's behalf, then **Send** — which is the action that actually fires the underlying workflow and notifies whoever needs to approve it.

![Screenshot of the Request access panel in Microsoft Purview, with a comment field and the Send button highlighted.](/courses/microsoft-purview/ch06/29-access-policies/send.png)

*Send is the real trigger — everything before this is just filling out the form.*

## What approval actually creates

Once an owner approves the request, it doesn't just vanish into a "granted" state with no trace. It becomes a tracked record — the data source path, the access type granted, who requested it, and when.

![Screenshot of the Self-service access policies list in Microsoft Purview, showing one row with a data source path, access type Read, a requestor name, and a date created.](/courses/microsoft-purview/ch06/29-access-policies/purview-studio-self-service-tab-pic-4.png)

*An audit trail, not a one-time favor — every granted request stays visible as a record afterward.*

That record is what turns self-service access from a convenience into something a governance team can actually audit later: who has access to what, and who approved it, without anyone having to reconstruct the history from old emails.

## The four request statuses

Every access request — in both the classic self-service flow covered here and the newer Unified Catalog data product request flow — moves through the same small set of states:

- **Pending** — sent to an approver, waiting for a decision.
- **Declined** — the approver denied the request.
- **Approved** — granted, but the underlying access to the actual data asset hasn't been provisioned yet.
- **Completed** — the asset is provisioned, and the consumer can actually use the data.

A request can move from Pending to Declined, or from Pending to Approved and then on to Completed — but it never skips a state. That predictability is part of the point: anyone looking at a request's status knows exactly what's happened and what's still outstanding, without having to ask.

## Key terms

| Term | Meaning |
|---|---|
| Request access | The button, on an asset's own page, that starts a self-service access request |
| Self-service access policy | The record created once a request is approved — a tracked grant, not a one-time action |
| Pending / Declined / Approved / Completed | The four states every access request moves through, in that order (except a decline, which ends it) |

## Lab

Pick any data asset you can picture (a real one from your work, or a hypothetical "Q3-Sales-Report"). Write out, in one or two sentences each, what you'd type in the justification box when requesting access to it, and what you'd expect an approver to want to see before granting it.

## Check yourself

Can you name the three clicks a consumer makes to request access to an asset, and explain the difference between a request's Approved status and its Completed status?
