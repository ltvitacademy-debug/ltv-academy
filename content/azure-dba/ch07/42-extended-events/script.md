# Script — Extended Events

## Segment 1 (title)

SQL Trace and its GUI, Profiler, are deprecated — Microsoft has said for years a future version removes them entirely. Extended Events is the lightweight tracing system that replaced them, capturing only the events and data fields you actually ask for, instead of Profiler's heavier default footprint.

## Segment 2 (code: the session model)

A session is built from four pieces. Event — the specific thing you want to capture. Action — extra context attached to it, like session ID or client hostname. Predicate — a filter, like only statements over 500 milliseconds. Target — where captured data goes, a ring buffer in memory or a file on disk.

## Segment 3 (screenshot: choosing events)

SSMS's New Session wizard walks you through that model visually. Here you're picking which events this session actually captures — query execution, errors, logins. Only the events you pick add any overhead, which is the entire point versus Profiler's older mechanism.

## Segment 4 (screenshot: configuring data storage)

After picking events, the wizard asks where the captured data goes. Save to an event file on disk when you need a durable, reviewable capture you can walk away from and come back to. Keep it in-memory only for a short live look — it disappears the moment the session stops.

## Segment 5 (code: reading it back with T-SQL)

Once a session is writing to a file target, you don't need the SSMS UI to read it back. sys.fn_xe_file_target_read_file reads the .xel file directly and returns each captured event as XML, ready to shred for the specific fields you need — the same session you built visually, read back in plain T-SQL.

## Segment 6 (outro)

Extended Events captures the actual events as they happen. Next up, the last lesson of this chapter — tying sessions, connections, CPU, memory, I/O, and storage together into one real investigation checklist.
