# Building Your First Flow: An Approval on a New SharePoint Item

Time to build a real flow. Castlebridge Logistics runs its vacation requests through a SharePoint list, and right now a supervisor manually emails each approval decision back. This lesson walks through replacing that manual step with a flow: when someone creates a request in the list, the flow starts an approval, emails the decision, and updates the list automatically — the same shape you'll reuse for shipping approvals later in this course.

## What you'll learn

- The real end-to-end shape of an approval flow, trigger through list update
- How to add the **Start and wait for an approval** action to a flow
- How to configure an approval's title, assignee, and details using dynamic content
- How a completed flow looks in the designer once every action is wired up

## The flow you're building

Here's the overview of what gets built in this lesson, using a SharePoint vacation-request list as the example — Castlebridge's shipping-approval flow later in this course follows the identical shape:

![Diagram showing a SharePoint Online vacation request flowing into Power Automate: an approval request sent in email and to the approval center, approval decision made, decision email sent, and SharePoint list item updated.](/courses/power-automate/ch01/03-building-your-first-flow/create-flow-overview.png)
*Four steps, one trigger: SharePoint item created → approval requested → decision emailed → list updated.*
Source: [Microsoft Learn — Create and test an approval workflow](https://learn.microsoft.com/en-us/power-automate/modern-approvals)

The flow starts with an automated trigger, **When an item is created**, pointed at the SharePoint list. Everything after that is actions.

## Adding the approval action

After the trigger, search the **Add an action** panel for "approval" and select **Start and wait for an approval**:

![Screenshot of the Add an action search panel with "approval" typed in the search box, showing the Approvals category with "Start and wait for an approval" highlighted.](/courses/power-automate/ch01/03-building-your-first-flow/select-approvals-new-designer.png)
*"Start and wait for an approval" pauses the flow until someone responds — exactly what a vacation or shipping approval needs.*
Source: [Microsoft Learn — Create and test an approval workflow](https://learn.microsoft.com/en-us/power-automate/modern-approvals)

## Configuring the approval

The approval card needs an **Approval type** (Approve/Reject — First to respond is the simplest), a **Title**, who it's **Assigned to**, and **Details** describing the request. The Title and Details fields accept dynamic content pulled straight from the trigger — the actual requester's name and dates, not static text:

![Screenshot of a configured "Start and wait for an approval" card: Approval type set to Approve/Reject - First to respond, Title "Vacation request for [name]," an assignee, and a Details field combining dynamic content with plain text.](/courses/power-automate/ch01/03-building-your-first-flow/provide-approval-config-info-new-designer.png)
*Dynamic content (the teal chips) and typed text mix freely in the same field — this is how "wants to go on vacation from [date] until [date]" gets built.*
Source: [Microsoft Learn — Create and test an approval workflow](https://learn.microsoft.com/en-us/power-automate/modern-approvals)

## The completed flow

Once you add a condition on the approver's response (covered fully in Lesson 4) and an email plus a list update on each branch, the finished flow looks like this:

![Screenshot of a completed flow in the designer: When an item is created, Get my profile (V2), Start and wait for an approval, a For each loop containing a Condition with True and False branches, each branch sending an email and updating the SharePoint item.](/courses/power-automate/ch01/03-building-your-first-flow/completed-flow-new-designer.png)
*Trigger, profile lookup, approval, condition, two branches — five building blocks you already know the names of.*
Source: [Microsoft Learn — Create and test an approval workflow](https://learn.microsoft.com/en-us/power-automate/modern-approvals)

Every piece in that screenshot is something this chapter covers by name: a trigger (Lesson 2), an approval action, a condition (Lesson 4), and a loop (Lesson 5). Nothing about it is more advanced than the pieces you already have.

## Key terms

- **Start and wait for an approval** — the action that sends an approval request and pauses the flow until someone responds
- **Approval type** — the response pattern for an approval, such as Approve/Reject – First to respond
- **Dynamic content** — values pulled from an earlier step (like the trigger) and inserted into a later field, instead of typed as static text
- **Approvals center** — the Power Automate screen where pending approval requests also appear, in addition to email
