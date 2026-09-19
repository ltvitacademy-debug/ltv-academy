# Script — IaaS vs. PaaS for SQL Server

## Segment 1 (title)

If you took Azure Fundamentals Lesson 2, you already know the general IaaS versus PaaS distinction. This lesson applies it specifically to SQL Server, where "the platform" means both the operating system and the database engine itself.

## Segment 2 (code: mapping the framework)

Azure SQL Database and Managed Instance are both PaaS — Microsoft patches the OS and SQL Server in both. SQL Server on an Azure VM is IaaS — you patch both yourself. That makes the VM look strictly worse for patching, but it's the option you reach for when you need OS-level access PaaS won't give you at all.

## Segment 3 (code: PaaS isn't one point on a dial)

Azure SQL Database and Managed Instance are both PaaS for patching purposes, but they expose very different amounts of instance surface — Database hides instance-level concepts entirely, Managed Instance exposes nearly all of them while still keeping the patching promise.

## Segment 4 (outro)

Every deployment decision in this course comes back to this same lever: how much of the platform do you actually need to control. Next up: the tools you'll actually use as a DBA — the Portal, SSMS, and Azure Data Studio.
