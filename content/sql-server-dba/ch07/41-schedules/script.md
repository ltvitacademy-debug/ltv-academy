# Script — Schedules

## Segment 1 (title)

A job with steps only runs when someone starts it manually until it has a schedule attached — the object that tells Agent when to run it automatically, and unlike a step, a schedule is reusable across many jobs.

## Segment 2 (code: sp_add_schedule — nightly)

sp_add_schedule builds a schedule from frequency codes — freq_type sets the overall pattern: once, daily, weekly, or monthly. This one runs daily at 11 PM using active_start_time as an HHMMSS integer.

## Segment 3 (code: recurring within the day)

freq_subday_type and freq_subday_interval repeat the job within a day — here every 15 minutes, weekdays only, using freq_interval as a bitmask of days of the week, between a 6 AM and 8 PM active window.

## Segment 4 (steps: reuse across jobs)

sp_add_schedule creates the schedule on its own; sp_attach_schedule links it to a specific job in sysjobschedules. Because the schedule is a separate object, the same one can drive several different jobs without duplicating the frequency logic.

## Segment 5 (outro)

Next up: alerts and operators — notifying a person automatically when something goes wrong.
