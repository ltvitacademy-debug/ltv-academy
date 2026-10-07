# Script — Connecting Power BI: Data Alerts and Refresh Notifications

## Segment 1 (title)

Castlebridge Logistics tracks on-time delivery rate on a Power BI dashboard tile, but a number on a screen only matters if someone's watching it. Lesson 12 connects that tile to Power Automate, so a threshold crossing — or a refresh problem — becomes an automatic notification instead of something a dispatcher has to remember to check.

## Segment 2 (screenshot)

The alert itself is set in Power BI, on the tile, before Power Automate ever enters the picture. The fastest way to act on it is this template: "send an email to any audience when a Power BI data alert is triggered." It's already wired end to end — you just pick the alert and the recipients.

## Segment 3 (screenshot)

If a template doesn't fit your scenario, the same trigger — Power BI, when a data driven alert is triggered — drops into any flow built from scratch. Its only required field is Alert ID, the specific tile alert this flow listens for, and from there you can send an email, post to Teams, or create a calendar event.

## Segment 4 (steps)

Refresh notifications work differently depending on what's refreshing. Dataflows have a real completion trigger that reports success or failure directly. Datasets don't — the refresh action only confirms the request was accepted, not that it finished, so getting an actual pass or fail means adding a delay and checking the refresh history afterward.

## Segment 5 (outro)

You've connected a flow to a live Power BI alert and learned where refresh notifications genuinely work and where they need a workaround. Next, in Lesson 13, you'll build approval workflows using Start and wait for an approval — the action Castlebridge Logistics leans on constantly.
