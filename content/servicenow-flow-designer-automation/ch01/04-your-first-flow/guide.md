# Lesson 4 — Your First Flow

**Chapter 1 · Flow Designer Fundamentals · Lesson 4 of 27**

## What you'll learn

- How to translate a plain-language automation request into a trigger and a sequence of actions
- How to choose the right table, change type, and condition for a Record trigger
- How to add and configure a Notify action using a value from the triggering record
- The real difference between saving a flow and activating it
- How this worked scenario pulls together everything from Lessons 1 through 3

## The business request

Here's a real request, the kind a Service Desk manager would actually bring to you: "When a new Incident comes in marked Priority 1 — Critical, send a notification to the manager of the group it gets assigned to, so they know immediately without having to watch the queue." Nothing about that sentence says "script" or "workflow" — it says what should happen and when, which is exactly the shape Flow Designer wants. Your job is to translate it into one trigger and a short sequence of actions, the same vocabulary you learned in Lessons 2 and 3.

## Step 1 — Choose the trigger

This is a reaction to something happening — a new Incident arriving — not a periodic, time-based job, so per Lesson 3 this is a Record trigger, not a Scheduled trigger. In the trigger configuration, you set the table to Incident, and the condition to "Created" rather than "Updated," because the request is about catching the Incident the moment it's new, not reacting to every later edit. Then you add the condition that narrows it to the records that matter: Priority is 1 - Critical. Without that condition, the flow would fire on every new Incident regardless of priority, which is not what was asked for. With it, the flow only starts running when a brand-new Incident actually matches "Priority 1 - Critical" at creation.

## Step 2 — Add the Notify action

With the trigger built, the next step in the flow is an Action — specifically, the built-in Notify action, which is designed to send a notification using the instance's existing notification infrastructure. You configure who the notification goes to by using a data pill from the trigger: instead of typing in a fixed name, you reference the triggering Incident record's Assignment Group, and from there the manager of that group — a dynamic reference that resolves differently for every Incident, rather than a single hardcoded recipient. (Data pills get their own full treatment in Lesson 5, right after this chapter — for now, understand that the Notify action is pulling a real value off the record that triggered the flow, not a value you typed once and left fixed.) You'd also configure the message itself to reference the Incident's number and short description, so the manager sees exactly which Incident needs attention and why, without opening the record first.

## Step 3 — Save, then activate

Building the trigger and the action gets you a flow that exists, but a newly built flow is saved in an inactive state by default — it will not run against real records yet. Saving preserves your work and lets you keep adjusting the configuration; activating is the separate, deliberate step that turns the flow on so ServiceNow's trigger engine actually starts watching for matching Incidents. This two-step separation exists on purpose: it means you can build, review, and even show a flow to a stakeholder before it's live, and nothing fires until you consciously flip it to active. For this scenario, once you're confident the trigger's table, condition, and the Notify action's recipient and message are all correct, you activate the flow — and from that moment forward, every new Priority 1 Incident triggers a notification to the right manager automatically, with no one watching the queue by hand.

## What this scenario actually demonstrated

Every piece of this flow traces back to the first three lessons: the trigger-plus-actions shape from Lesson 2, the Record trigger with a narrowing condition from Lesson 3, and a built-in Action doing the real work. Nothing here required a line of JavaScript. That's the entire point of Flow Designer: a request stated in plain business language turned into a working, activated automation using a trigger, a condition, and one action — and every flow you build for the rest of this course adds more pieces onto this exact same foundation.

## Key terms

| Term | Meaning |
|---|---|
| Notify action | The built-in Action that sends a notification through the instance's existing notification infrastructure |
| Data pill | A reference to a value from an earlier step (like the trigger record) instead of a typed, fixed value — covered fully in Lesson 5 |
| Save (a flow) | Preserves your flow's configuration without making it run against real records |
| Activate (a flow) | The deliberate step that turns a saved flow on so its trigger starts watching for matching records |

## Check yourself

You're ready for Chapter 2 when you can walk through this exact scenario from memory: which trigger type, which table and condition, which action, and the real difference between saving the flow and activating it.
