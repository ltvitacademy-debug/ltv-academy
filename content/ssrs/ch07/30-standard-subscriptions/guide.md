# Lesson 30 — Standard Subscriptions

**Chapter 7 · Subscriptions & Delivery · Lesson 30 of 40**

## What you'll learn

- What a standard subscription is, and why it's the right choice when one
  report always goes to the same fixed set of recipients, on a fixed
  schedule
- The requirements a report has to meet before the **New Subscription**
  option is even available
- Why a standard subscription is described as using "static values" —
  one set of parameters, one destination, one schedule, every time it runs
- Where subscriptions live once created, and how to tell whether the last
  run succeeded

## One report, one delivery, every time

A **standard subscription** is one that an individual user sets up because
they want a specific report delivered to them (or to a shared folder)
automatically — through e-mail or to a Windows file share. Unlike a
data-driven subscription (Lesson 31), a standard subscription has exactly
one set of report presentation options, one set of delivery options, and
one set of report parameter values. Nothing about it varies from run to
run except the report's underlying data. If you need the recipient list or
the parameter values to change based on a query, that's a data-driven
subscription's job, not a standard one's.

## Before "New Subscription" even shows up

Two requirements have to be met first, or the button won't be there at all:

- The report's data source must be configured to use **stored
  credentials**, or **no credentials** — a subscription runs unattended,
  with nobody sitting there to type in a login.
- Any parameters the report uses must have **default values** set, since
  nobody's available to fill them in when the subscription fires.

## Creating one from the web portal

From the web portal, right-click the report and choose **Subscribe** (or
open the report's **Manage** menu and select **Subscriptions**, then
**+ New Subscription**). You'll set a **Description**, and notice the
**Owner** field is locked to whoever is creating the subscription — you
can change the owner later from the subscription's properties, but not at
creation time.

Under **Type of Subscription**, this is the fork in the road: **Standard
subscription** generates and delivers one report, one time per schedule
trigger. **Data-driven subscription** generates and delivers one report
*per row* in a dataset you supply — a completely different mechanism
covered next lesson.

![Type of Subscription section: Standard subscription generates one report; data-driven generates one per dataset row.](/courses/ssrs/ch07/30-standard-subscriptions/type-of-subscription.png)
*Standard subscription: one report, one delivery — versus one per dataset row.*

Everything past this choice — Destination (Lesson 32) and Schedule
(Lesson 33) — gets its own dedicated lesson, because both sections are
substantial enough to deserve real depth rather than a rushed mention here.

## Where subscriptions live afterward

Every subscription you create shows up on the report's **Subscriptions**
page (reached via **Manage → Subscriptions**), alongside every other
subscription anyone has created for that report — assuming you have
permission to manage all subscriptions; otherwise you only see your own.

![The Subscriptions management page listing one Standard, E-Mail subscription, with Edit, Enable, Disable, Run Now, and Delete controls.](/courses/ssrs/ch07/30-standard-subscriptions/manage-subscriptions.png)
*The Subscriptions page: Edit, Enable, Disable, Run Now, and Delete.*

The **Result** column is the first place to check when a subscription
didn't behave — it holds the outcome or error message from the most
recent run. **Run Now** is your friend during setup and testing: it fires
the subscription immediately instead of waiting for its schedule to come
around.

## Key terms

| Term | Meaning |
|---|---|
| Standard subscription | One fixed set of parameters, delivery options, and recipients per report, owned by an individual user |
| Owner | The user account a subscription is tied to; fixed at creation, changeable afterward |
| Type of Subscription | The New Subscription section where you choose Standard vs. Data-driven |
| Stored credentials | A data source setting required before New Subscription becomes available at all |
| Subscriptions page | Lists every subscription for a report, with Edit, Enable, Disable, Run Now, Delete |

## Lab

1. Pick a report on your Report Server (or lab environment) whose data
   source uses stored credentials, and whose parameters — if any — have
   default values set.
2. Create a standard subscription to it. Choose either delivery
   destination for now; Lesson 32 covers the delivery options in depth.
3. Use **Run Now** on the Subscriptions page to trigger it immediately,
   then check the **Result** column once it finishes.
4. If you don't yet have a Report Server available, read through the
   steps above and be ready to do this hands-on once Lesson 32 and 33
   round out the full picture.

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: what
makes a subscription "standard" rather than data-driven, and what two
requirements does a report have to meet before you can even create one?
