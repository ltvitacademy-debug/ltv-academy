# Schedules

Lesson 40 built a job with steps, targeted at a server. On its own that job only runs
when someone right-clicks "Start Job at Step" in SSMS. This lesson attaches a
**schedule** — the object that tells Agent when to run it automatically, and unlike a
step, a schedule is reusable across many jobs.

## What you'll learn

- Creating a reusable schedule with `sp_add_schedule`
- The frequency parameters that describe daily, weekly, and recurring-within-a-day
  patterns
- Attaching a schedule to a job with `sp_attach_schedule`

## sp_add_schedule and its frequency parameters

A schedule is its own object in `msdb.dbo.sysschedules`, independent of any job, built
almost entirely from a handful of integer codes:

- `@freq_type` — the overall pattern: `1` = once, `4` = daily, `8` = weekly, `16` =
  monthly
- `@freq_interval` — meaning depends on `@freq_type`. For daily (`4`), it's "every N
  days." For weekly (`8`), it's a bitmask of days of the week (1=Sunday, 2=Monday,
  4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday — OR them together, e.g.
  62 for Mon–Fri)
- `@freq_subday_type` / `@freq_subday_interval` — for running repeatedly within the
  day: subday_type `4` = minutes, `8` = hours, with the interval as the count
- `@active_start_time` / `@active_end_time` — the time window, as `HHMMSS` integers

A schedule that runs every night at 11 PM:

```sql
EXEC msdb.dbo.sp_add_schedule
    @schedule_name = N'Nightly 11PM',
    @freq_type = 4,              -- daily
    @freq_interval = 1,          -- every 1 day
    @active_start_time = 230000; -- 23:00:00
```

A schedule that runs every 15 minutes during business hours, weekdays only:

```sql
EXEC msdb.dbo.sp_add_schedule
    @schedule_name = N'Weekday Every 15 Min',
    @freq_type = 8,                 -- weekly
    @freq_interval = 62,             -- Mon(2)+Tue(4)+Wed(8)+Thu(16)+Fri(32)
    @freq_subday_type = 4,           -- minutes
    @freq_subday_interval = 15,
    @active_start_time = 60000,      -- 06:00:00
    @active_end_time = 200000;       -- 20:00:00
```

## Attaching a schedule to a job

A schedule created with `sp_add_schedule` exists on its own until it's attached:

```sql
EXEC msdb.dbo.sp_attach_schedule
    @job_name = N'Nightly Full Backup',
    @schedule_name = N'Nightly 11PM';
```

The link itself lives in `msdb.dbo.sysjobschedules`. Because a schedule is a separate
object from any one job, the same "Nightly 11PM" schedule can be attached to several
different jobs — a full backup and an index maintenance job can both run off the exact
same schedule definition without duplicating the frequency logic. That reuse is the
whole reason schedules and jobs are separate objects instead of frequency fields sitting
directly on `sysjobs`.

## Key terms

| Term | Meaning |
|---|---|
| `sp_add_schedule` | Creates a reusable schedule definition in `msdb.dbo.sysschedules` |
| `@freq_type` | The overall recurrence pattern: once, daily, weekly, monthly |
| `@freq_interval` | Meaning depends on freq_type — day count, or a weekday bitmask |
| `@freq_subday_type` / `@freq_subday_interval` | Repeating within the active window, e.g. every 15 minutes |
| `sp_attach_schedule` | Links an existing schedule to a job (`msdb.dbo.sysjobschedules`) |

## Check yourself

Two different jobs — a backup job and an index maintenance job — both need to run
every weekday at 1 AM. Do you need two separate schedule objects, or one? Why?
