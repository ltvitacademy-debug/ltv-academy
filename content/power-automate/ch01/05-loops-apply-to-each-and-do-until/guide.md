# Loops: Apply to Each and Do Until

Every flow so far has acted on one item — one SharePoint request, one approval. Castlebridge Logistics' dispatch team needs more: check every unread email in a shared inbox, not just the first one. That's what a **loop** does — it repeats a set of actions, once per item in a list, or until a condition is finally met. Power Automate gives you two: **Apply to each** and **Do until**.

## What you'll learn

- How Apply to each repeats actions once for every item in an array
- How a real Apply to each flow combines a loop with the conditions from Lesson 4
- How Do until repeats actions until a condition becomes true, checking after each run
- Which loop to reach for, depending on whether you already have a list or are waiting for a state to change

## Apply to each: once per item in a list

**Apply to each** takes an array — like the body of 10 unread emails — and runs its inner actions once per item. Here's the shape of a scheduled flow Castlebridge's dispatch team could use: get the last 10 unread inbox messages, then loop through each one checking its subject and sender:

![Diagram showing a flow: get top 10 unread emails every 15 minutes, start an apply to each loop for each email, check if subject contains "meet now," then nested checks for high importance or sender, ending in a push notification or doing nothing.](/courses/power-automate/ch01/05-loops-apply-to-each-and-do-until/foreach-flow-visio.png)
*One Apply to each loop, with a Condition from Lesson 4 nested inside it, run once per email in the array.*
Source: [Microsoft Learn — Use the Apply to each action](https://learn.microsoft.com/en-us/power-automate/apply-to-each)

The array has to exist before the loop can run on it — here, that's the **Get emails (V3)** action configured to fetch the top 10 unread messages from the Inbox:

![Screenshot of a configured "Get emails (V3)" action with Folder set to Inbox, Fetch Only Unread Messages set to Yes, and the Top field set to 10, highlighted in red.](/courses/power-automate/ch01/05-loops-apply-to-each-and-do-until/foreach-5.png)
*That "Top: 10" value is exactly the array Apply to each will loop over — 10 emails, 10 iterations.*
Source: [Microsoft Learn — Use the Apply to each action](https://learn.microsoft.com/en-us/power-automate/apply-to-each)

For Castlebridge, the same shape applies to a list of shipment records: fetch every record flagged "pending," then Apply to each one to send a reminder.

## Do until: repeat until something becomes true

**Do until** is the other loop — instead of a fixed list, it repeats its inner actions until a condition you specify becomes true, checking that condition again after every pass. Because the check happens at the *end* of each iteration, the actions inside always run at least once:

![Screenshot of a Do until action configured with Loop Until set to "Number is equal to 100," and advanced parameters Count set to 60 and Timeout set to PT1H.](/courses/power-automate/ch01/05-loops-apply-to-each-and-do-until/do-until-count.jpg)
*Loop Until defines the condition; Count and Timeout are safety limits so a stuck loop can't run forever.*
Source: [SPGuides — Power Automate Do Until](https://www.spguides.com/power-automate-do-until/)

A Castlebridge use case: poll a shipment-tracking API every few minutes with Do until, stopping once the status finally comes back "Delivered" — there's no fixed list of items here, just a condition you're waiting on.

## Apply to each or Do until — which one

- Already have a list (an array of emails, SharePoint items, shipment records)? **Apply to each.**
- Waiting for a one-time state to change, with no list involved (a status polling check)? **Do until.**

## Key terms

- **Apply to each** — a loop that runs its inner actions once for every item in an array
- **Array** — an ordered list of values, such as the emails returned by Get emails (V3)
- **Do until** — a loop that repeats its inner actions until a specified condition becomes true
- **Count / Timeout** — the two safety limits on Do until that stop a loop from running indefinitely
