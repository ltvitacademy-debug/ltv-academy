# Script — Configuration as Code

## Segment 1 (title)

Provisioning gets you a server. It doesn't get you the right sp_configure values or max server memory setting, every time, without someone remembering to set it by hand. That's what configuration as code is for.

## Segment 2 (code: PowerShell DSC's declarative shape)

DSC is a PowerShell platform for declaring the state a system should be in, then having an engine continuously reconcile the system to that state. The SqlServerDsc module exposes resources for common SQL Server settings — you declare MaxDop should be 4, and the engine only changes it if it doesn't already match.

## Segment 3 (code: declarative vs. imperative)

An imperative script that runs sp_configure once has no idea whether the setting already matches — it just runs. A declarative DSC resource can be safely re-applied on a schedule, catching drift if someone manually changed the setting later, without a DBA remembering to re-run anything.

## Segment 4 (outro)

Next up: environment consistency — why dev, test, and prod servers drift apart when they're configured by hand, and how provisioning all three from the same template fixes it.
