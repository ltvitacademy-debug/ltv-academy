# Script — Monitoring: Setup Audit Trail and Login History

## Segment 1 (title)

Field History Tracking answers what changed on a record. It doesn't answer who changed a permission set, or who logged in from an unfamiliar location. Those are configuration and access questions, and Salesforce has two separate built-in tools to answer them: Setup Audit Trail and Login History.

## Segment 2 (screenshot: Setup Audit Trail list)

View Setup Audit Trail, found via Quick Find, shows the org's most recent configuration changes — permission sets, profiles, security settings, Apex, Flow versions — each row with a date, a user, and the action taken. The on-screen view shows the last 20; a download link pulls the full six months as CSV.

## Segment 3 (screenshot: Login History quick find)

Login History lives in the same Quick Find box, under Identity — same habit, completely different tool.

## Segment 4 (screenshot: Login History results)

It shows every login attempt, successful or failed, with username, time, source IP, location, status, browser, and platform. Status tells you success or failure; source IP and location are what you check when a login looks like it shouldn't have happened.

## Segment 5 (steps: three different questions)

Three tools, three different questions. Setup Audit Trail: who changed this setting. Login History: who logged in, from where, and did it succeed. Field History Tracking, from Chapter 3: what changed on this specific record. None of them replaces the other two.

## Segment 6 (outro)

Next up: Administration Best Practices and Change Management, pulling together how experienced admins actually work day to day.
