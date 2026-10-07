# Script — Scheduled and Recurring Flows

## Segment 1 (title)

Not every flow should wait for something to happen — some should just run on a clock. Castlebridge Logistics wants a load-planning summary emailed to its dispatch supervisors every Monday morning with nobody kicking it off by hand. This closing lesson of Chapter 1 covers the Recurrence trigger, the piece that turns a flow into something scheduled.

## Segment 2 (screenshot)

Three fields define that schedule. Interval is a number, Frequency is the unit — minute, hour, day, week, or month — and Start time anchors it to an exact date and time, always entered in Coordinated Universal Time no matter where the flow's owner actually sits.

## Segment 3 (screenshot)

Both of Power Automate's designers expose the same recurrence settings, just differently. The new designer opens a configuration pane right in the canvas the moment you select the trigger. The classic designer needs you to expand Show advanced options on the Recurrence card first to see the same fields.

## Segment 4 (code)

Castlebridge Logistics runs its flow every Monday with a Start time set in UTC, then converts that timestamp to Eastern time for its run log using convertFromUtc, so nobody has to do UTC-to-Eastern math by hand when checking whether Monday's summary actually went out on schedule.

## Segment 5 (outro)

That's all fifteen lessons of Business Process Automation — triggers, conditions, loops, connectors from Outlook to Power BI, approvals, error handling, and now scheduling, all built around Castlebridge Logistics' real day-to-day work. Chapter 1 is complete.
