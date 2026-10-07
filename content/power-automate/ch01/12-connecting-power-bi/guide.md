# Connecting Power BI: Data Alerts and Refresh Notifications

Castlebridge Logistics' operations dashboard tracks on-time delivery rate on a Power BI tile. A number on a screen is only useful if someone looks at it — this lesson connects that tile to Power Automate, so a threshold crossing or a refresh problem turns into an email or Teams message automatically, with nobody watching the dashboard at all.

## What you'll learn

- How a Power BI **data alert**, set on a tile, becomes a Power Automate trigger
- The two ways to build the flow: from a ready-made template, or from scratch
- How to monitor a **dataflow refresh**, and the real limitation around dataset refresh completion
- How Castlebridge Logistics wires its on-time-delivery alert to notify the ops team

## Where it starts: the data alert, set in Power BI

Before Power Automate is involved at all, a data alert is set directly on a Power BI tile — for example, "notify when on-time delivery rate drops below 90%." Power BI's own alert settings include a link, "Use Microsoft Power Automate to trigger additional actions," which hands off to Power Automate with the alert already selected.

## Building the flow from a template

The fastest path is Power BI's own flow template, "Send an e-mail to any audience when a Power BI data alert is triggered."

![Screenshot of the Power Automate Send an e-mail to any audience when a Power BI data alert is triggered template.](/courses/power-automate/ch01/12-connecting-power-bi/power-automate-templates.png)
*The template already wires the Power BI alert trigger to an Outlook send-email action — you only fill in the alert and the recipients.*
Source: [Microsoft Learn — Integrate Power BI Data Alerts with Power Automate](https://learn.microsoft.com/en-us/power-bi/collaborate-share/office-integration/service-flow-integration)

## Building the flow from scratch

If a template doesn't fit, the same trigger — **Power BI – When a data driven alert is triggered** — is available to drop into any flow built from a blank canvas, exactly like the SharePoint or Outlook triggers from earlier lessons.

![Screenshot of the Alert ID dropdown where you select your data alert.](/courses/power-automate/ch01/12-connecting-power-bi/power-automate-select-alert-id.png)
*The trigger's only required field is Alert ID — the specific data alert, previously created on a Power BI tile, that this flow listens for.*
Source: [Microsoft Learn — Integrate Power BI Data Alerts with Power Automate](https://learn.microsoft.com/en-us/power-bi/collaborate-share/office-integration/service-flow-integration)

From there, add whatever actions the scenario calls for: send an email, post to Teams, or create an Outlook calendar event, all using the alert's tile value and tile URL as dynamic content in the message.

## Refresh notifications — and a real limitation

"Refresh notifications" means something slightly different depending on what's refreshing. For a **dataflow**, Power Automate has a dedicated trigger, "When a dataflow refresh completes," which fires with the refresh status attached — set a condition on "Succeeded" or "Failed" and branch accordingly.

For a **dataset**, there's no equivalent completion trigger. The "Refresh a dataset" action only reports that the refresh request was *accepted*, not that it *finished*. To actually notify on a dataset refresh result, flows add a short delay after calling refresh, then call the Power BI REST API to pull the dataset's refresh history, and branch on the status that comes back — more plumbing than the dataflow case, but the only reliable option today.

## Key terms

- **Data alert** — a threshold rule set on a Power BI tile, in Power BI itself, before any flow exists
- **When a data driven alert is triggered** — the Power Automate trigger that fires when that alert crosses its threshold
- **Alert ID** — the trigger's required field identifying which specific data alert to listen for
- **When a dataflow refresh completes** — the real trigger available for dataflow refresh status, with no dataset equivalent
