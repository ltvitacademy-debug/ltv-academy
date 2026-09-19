# Script — Project Introduction: You're the DBA

## Segment 1 (title)

You're the newly hired database administrator at Meridian Fleet Logistics — a regional trucking operation running 2,200 trucks off a single on-prem SQL Server closet, with no one ever specifically responsible for it until now.

## Segment 2 (code: the environment you've inherited)

Three production databases: OrderManagement, around 800 gigabytes, timing out every morning during the 7-to-9am dispatch window. DriverHR, 40 gigabytes, holding SSNs and license numbers behind a single shared login nobody's audited in years. And Telemetry, growing 50 gigabytes a month off GPS feeds from every truck, quietly running out of room.

## Segment 3 (steps: what the business is actually asking for)

Ops wants the morning timeout gone. Compliance wants to know who can actually see driver Social Security numbers. And leadership wants two things at once — stop treating this server as a recurring hardware purchase, and know exactly how bad an outage would really be, in hours and minutes, not vague reassurance.

## Segment 4 (outro)

None of that was a to-do list — it was a situation, in the stakeholders' own words. Lessons 91 through 93 apply everything from this course so far to translate it into real decisions. Next up: migrating this environment to Azure, and locking it down.
