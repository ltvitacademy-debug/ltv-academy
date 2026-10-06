# Lesson 2 — Approval Processes

**Chapter 1 · Declarative Business Logic · Lesson 2 of 18**

## What you'll learn

- What an approval process is and when it's the right tool instead of a validation rule
- The two wizards Salesforce offers — Jump Start and Standard Setup — and why Standard is the one admins actually use
- The core steps of the Standard Setup Wizard: entry criteria, approver and editability, notification templates
- How a record actually gets submitted for approval once the process is live

## What an approval process does that a validation rule can't

A validation rule can only say yes or no, instantly, using data already on the record. It cannot ask a human to look at something and decide. An **approval process** fills that gap: it takes a record, locks it, routes it to one or more people for a decision, and unlocks it (or takes some other action) once they respond.

Our running example for this chapter: a sales rep wants to apply a discount over 10% on an Opportunity. That's a judgment call, not something a formula alone should decide — it needs a manager's sign-off. That's an approval process.

## Starting the wizard

From Setup, search **Approval Processes** in Quick Find, then pick the object to manage approval processes for (Opportunity, in our example). Click **Create New Approval Process**, and you'll see two choices:

- **Use Jump Start Wizard** — a condensed, one-step wizard with Salesforce's suggested defaults. Fine for the simplest single-approver cases.
- **Use Standard Setup Wizard** — the full wizard, broken into named steps, and the one almost every real-world process needs because it exposes entry criteria, editability, and notification templates individually.

This course uses the Standard Setup Wizard throughout, because the individual steps map directly to decisions you'll actually need to make and defend to a stakeholder.

## Step 2: Specify Entry Criteria

Entry criteria decide which records even enter the process. Leave it blank and *every* record of that type enters the process the moment someone clicks Submit. For our discount example, the criteria would filter to something like `Discount_Percent__c > 10` — only opportunities that actually need a manager's eyes.

Get this step wrong and you'll either force approval on records that don't need it (frustrating reps) or let records skip approval that should have required it (a compliance problem). Entry criteria is the single most consequential screen in the wizard.

## Step 3: Approver Field and Record Editability Properties

This step answers two separate questions:

1. **Automated routing** — can you use a hierarchy field (like a user's manager) to automatically determine the next approver, instead of hard-coding a name?
2. **Who can edit the record while it's locked** — by default, only an admin. You can loosen this to also allow the currently assigned approver, which is useful if the approver needs to correct a value (like the discount percentage itself) before approving.

## Step 4: Notification templates

Every approval step needs an email template to notify the approver a request is waiting on them. This is the same template mechanism you'll see again in Lesson 6 — an approval process is, among other things, a structured way of triggering an Email Alert at the right moment.

## Submitting a record

Once activated, a **Submit for Approval** action appears on the record (added to page layouts automatically, or manually if you prefer control over placement). A user clicks it, the record locks, and the first approval step's approver gets notified. The **Approval History** related list tracks every step, every response, and every comment, which is exactly the audit trail a discount approval needs.

## Recap

- Approval processes route records to people for a decision; validation rules only block or allow based on data already present.
- The Standard Setup Wizard, not Jump Start, is the one you'll use for anything beyond the simplest case.
- Entry criteria decides who enters the process at all — get it wrong and the whole process is wrong.
- Record editability and notification templates round out the core configuration before you ever add approval steps (next lesson).

## Try it yourself

In a sandbox or Developer Edition org, start a new approval process on Opportunity with the Standard Setup Wizard. Set entry criteria of `Amount > 50000`, leave editability at Administrators Only, and pick (or create) a simple email template for notifications. Don't activate it yet — Lesson 3 adds the actual approval steps.

## Check yourself

Why does leaving Entry Criteria blank on an approval process cause a problem, even if the approval step itself is configured correctly?
