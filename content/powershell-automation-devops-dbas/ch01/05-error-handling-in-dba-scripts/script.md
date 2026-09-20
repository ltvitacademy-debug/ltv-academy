# Script — Error Handling in DBA Scripts

## Segment 1 (title)

An unhandled error in a typical script just means a failed run and a red message. An unhandled error in the middle of a DBA maintenance script can leave a database mid-backup or an index rebuild half done. Error handling matters more here because the blast radius is production data.

## Segment 2 (code: try / catch / finally)

Try wraps the code that might fail. Catch runs only if something inside throws a terminating error, and gives you the error record to inspect or log. Finally runs every time, whether try succeeded or catch fired — the right place for cleanup that always has to happen.

## Segment 3 (code: -ErrorAction Stop is what makes catch fire)

Here's the detail that catches people out: most cmdlets produce a non-terminating error by default, which prints in red but does not trigger catch. The script just falls through to the next line as if nothing happened, unless you add -ErrorAction Stop.

## Segment 4 (code: $ErrorActionPreference for the whole script)

ErrorActionPreference sets the default for the whole script instead of one command at a time. Setting it to Stop at the top means every error becomes terminating by default — a reasonable choice for an unattended maintenance job you want to fail loud, not silently.

## Segment 5 (outro)

A failed report generation is annoying; a DBA script that fails partway through can leave a database genuinely broken. Robust error handling is what makes a script safe to actually run unattended against production. Next up, Chapter Two: automating backups with PowerShell.
