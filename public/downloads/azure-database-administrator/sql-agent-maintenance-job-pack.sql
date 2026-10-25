/* =====================================================================
   AZURE DBA COURSE — SQL AGENT MAINTENANCE JOB PACK
   =====================================================================
   A template from Chapter 10 (SQL Server Agent & Automation),
   covering job/step/schedule creation (Lesson 60), alerts and
   operators (Lesson 61), and the correct maintenance sequencing from
   Lesson 63: integrity check FIRST, index maintenance SECOND,
   statistics maintenance THIRD — in that order, every time, because
   running them out of order wastes work or causes contention.

   Applies most directly to Managed Instance or VM-hosted SQL Server
   (Azure SQL Database has limited native Agent support and already
   automates much of this — see Lesson 63). Swap job names, database
   names, and the operator's email for your own environment.
   ===================================================================== */

USE msdb;
GO


/* ---------------------------------------------------------------------
   STEP 1 — An operator who actually gets paged when something fails
   (Lesson 61). An alert with nobody attached to it is exactly how
   Meridian's permissions review went unchecked for years.
   --------------------------------------------------------------------- */

EXEC dbo.sp_add_operator
    @name = N'DBA On-Call',
    @enabled = 1,
    @email_address = N'dba-oncall@example.com';


/* ---------------------------------------------------------------------
   STEP 2 — Job 1: Integrity check. Runs FIRST. There is no point
   optimizing indexes on a database that's already corrupted.
   --------------------------------------------------------------------- */

EXEC dbo.sp_add_job
    @job_name = N'01 - Nightly Integrity Check';

EXEC dbo.sp_add_jobstep
    @job_name = N'01 - Nightly Integrity Check',
    @step_name = N'DBCC CHECKDB',
    @subsystem = N'TSQL',
    @command = N'DBCC CHECKDB (''OrderManagement'') WITH NO_INFOMSGS;',
    @on_fail_action = 2;   -- quit the job reporting failure

EXEC dbo.sp_add_schedule
    @schedule_name = N'Nightly1AM',
    @freq_type = 4,              -- daily
    @freq_interval = 1,
    @active_start_time = 010000; -- 1:00 AM

EXEC dbo.sp_attach_schedule
    @job_name = N'01 - Nightly Integrity Check',
    @schedule_name = N'Nightly1AM';

EXEC dbo.sp_add_jobserver
    @job_name = N'01 - Nightly Integrity Check';


/* ---------------------------------------------------------------------
   STEP 3 — Job 2: Index maintenance. Runs SECOND, after integrity is
   confirmed. Rebuilding an index updates its statistics as a side
   effect (Lesson 53) — that's WHY step 4 runs last, not before this.
   --------------------------------------------------------------------- */

EXEC dbo.sp_add_job
    @job_name = N'02 - Nightly Index Maintenance';

EXEC dbo.sp_add_jobstep
    @job_name = N'02 - Nightly Index Maintenance',
    @step_name = N'Rebuild/Reorganize by fragmentation threshold',
    @subsystem = N'TSQL',
    @command = N'EXEC dbo.usp_MaintainIndexesByFragmentation;', -- your own
                                                                 -- Lesson 53
                                                                 -- logic, or
                                                                 -- Ola
                                                                 -- Hallengren's
                                                                 -- IndexOptimize
    @on_fail_action = 2;

EXEC dbo.sp_add_schedule
    @schedule_name = N'Nightly2AM',
    @freq_type = 4,
    @freq_interval = 1,
    @active_start_time = 020000; -- 2:00 AM, after the 1 AM integrity check

EXEC dbo.sp_attach_schedule
    @job_name = N'02 - Nightly Index Maintenance',
    @schedule_name = N'Nightly2AM';

EXEC dbo.sp_add_jobserver
    @job_name = N'02 - Nightly Index Maintenance';


/* ---------------------------------------------------------------------
   STEP 4 — Job 3: Statistics maintenance. Runs THIRD — catches any
   tables whose indexes weren't touched (and therefore didn't get a
   free statistics update) in Step 3.
   --------------------------------------------------------------------- */

EXEC dbo.sp_add_job
    @job_name = N'03 - Nightly Statistics Update';

EXEC dbo.sp_add_jobstep
    @job_name = N'03 - Nightly Statistics Update',
    @step_name = N'Update stale statistics',
    @subsystem = N'TSQL',
    @command = N'EXEC sp_updatestats;', -- or Ola Hallengren's
                                        -- UpdateStatistics for a more
                                        -- selective, sample-aware pass
    @on_fail_action = 2;

EXEC dbo.sp_add_schedule
    @schedule_name = N'Nightly330AM',
    @freq_type = 4,
    @freq_interval = 1,
    @active_start_time = 033000; -- 3:30 AM, after index maintenance

EXEC dbo.sp_attach_schedule
    @job_name = N'03 - Nightly Statistics Update',
    @schedule_name = N'Nightly330AM';

EXEC dbo.sp_add_jobserver
    @job_name = N'03 - Nightly Statistics Update';


/* ---------------------------------------------------------------------
   STEP 5 — Alerts: notify the operator on failure of any of the three
   jobs above, instead of a failure sitting unnoticed until someone
   happens to look (Lesson 61, 64).
   --------------------------------------------------------------------- */

EXEC dbo.sp_add_alert
    @name = N'Integrity Check Failed',
    @message_id = 0,
    @severity = 0,
    @enabled = 1,
    @notification_message = N'Nightly DBCC CHECKDB failed — investigate immediately.';

EXEC dbo.sp_add_notification
    @alert_name = N'Integrity Check Failed',
    @operator_name = N'DBA On-Call',
    @notification_method = 1; -- email


/* ---------------------------------------------------------------------
   NOTE — don't reinvent this from scratch (Lesson 63)
   Ola Hallengren's Maintenance Solution is the real, widely-adopted,
   free community standard for exactly this job/step/schedule shape,
   with smarter REBUILD-vs-REORGANIZE decisions than a blanket rule.
   This template exists to show the correct SEQUENCE and alerting
   pattern — in a real environment, swap the step 3 EXEC commands for
   Hallengren's IndexOptimize/CommandExecute procedures once installed.
   ===================================================================== */
