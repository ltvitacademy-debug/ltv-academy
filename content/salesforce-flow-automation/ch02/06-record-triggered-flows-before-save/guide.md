**Chapter 2 · Flow Types · Lesson 6 of 31**

# Record-Triggered Flows: Before Save

This is where Chapter 1's vocabulary becomes a real flow type. A **record-triggered flow** runs
automatically whenever a record is created, updated, or deleted — no screen, no user sitting in
front of it. This lesson covers the **before-save** version specifically: the faster, more
limited of the two record-triggered flow modes.

## What you'll learn

- How to start a record-triggered flow from the New Flow screen
- What the Start element's trigger options control
- What "before-save" (Fast Field Updates) means, and why it's faster
- The one hard limitation of a before-save flow

## Starting a record-triggered flow

From New Flow, select **Record-Triggered Flow**:

![The New Flow screen with Record-Triggered Flow selected as the flow type.](/courses/salesforce-flow-automation/ch02/06-record-triggered-flows-before-save/new-flow-record-triggered-selected.png)

## Configuring the trigger

Every record-triggered flow starts at the same Configure Start panel. First, pick the **Object**
whose records should trigger the flow. Then pick when it fires:

![The Configure Start panel's trigger options: a record is created, updated, created or updated, or deleted.](/courses/salesforce-flow-automation/ch02/06-record-triggered-flows-before-save/start-element-record-trigger.png)

You can also set **entry conditions** here — criteria the triggering record must meet for the flow
to actually run, so the flow doesn't fire on every single save of that object.

## Fast Field Updates: the before-save option

Scroll down on that same Configure Start panel and you reach **Optimize the Flow For** — this is
where before-save and after-save actually diverge:

![The Optimize Flow section, showing Fast Field Updates and Actions and Related Records as the two options.](/courses/salesforce-flow-automation/ch02/06-record-triggered-flows-before-save/start-element-config-panel.png)

**Fast Field Updates** is the before-save option. Choosing it means the flow can only update
**fields on the record that triggered it** — nothing else — and it runs *before* that record is
saved to the database. Because it updates the record in memory rather than saving, then re-saving
it, a before-save flow is meaningfully faster than the alternative, and it doesn't count against
the org's per-transaction DML limits for that update.

## The trade-off

That speed comes with a real limitation: a before-save flow **cannot** create new records, update
any record other than the one that triggered it, or run an Action (sending an email, posting to
Chatter, calling Apex). If the business requirement is "when an Opportunity's Amount changes,
recalculate a formula-like field on that same Opportunity," before-save is exactly right. If the
requirement involves touching a different record or sending a notification, that's Lesson 7's
territory: after-save.

## Key terms

| Term | Meaning |
|---|---|
| Record-triggered flow | A flow that runs automatically when a record is created, updated, or deleted |
| Before-save (Fast Field Updates) | Runs before the record saves; can only update fields on the triggering record |
| Entry conditions | Criteria the triggering record must meet for the flow to actually run |
| Optimize the Flow For | The Configure Start setting that chooses before-save vs. after-save |

## Check yourself

A flow needs to set a Case's Priority field to "High" whenever its own Category field is changed
to "Outage" — nothing else happens. Which "Optimize the Flow For" option fits, and why is it the
faster choice here?
