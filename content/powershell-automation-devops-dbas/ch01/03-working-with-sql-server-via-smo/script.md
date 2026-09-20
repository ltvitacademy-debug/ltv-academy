# Script — Working With SQL Server via SMO

## Segment 1 (title)

dbatools is the tool you'll reach for first, but it doesn't invent its own way of talking to SQL Server. Under the hood, most of it is built on SMO, SQL Server Management Objects. There's a wide surface of functionality with no dedicated dbatools cmdlet, and SMO is how you reach it.

## Segment 2 (code: the .NET API underneath dbatools)

SMO is the .NET class library Microsoft ships for programmatically managing SQL Server — the same underlying API SQL Server Management Studio itself uses to render its object tree. dbatools loads this assembly for you automatically when you import it.

## Segment 3 (code: the Server object is the root of the tree)

Everything in SMO branches off a Server object, the root of the whole tree. Databases, logins, jobs, linked servers, and configuration settings are all properties or collections hanging off it. This is the same object model dbatools wraps.

## Segment 4 (code: something SMO can do, no dbatools cmdlet for it)

A real example dbatools doesn't wrap directly: scripting a table's exact CREATE TABLE definition, with full control over dependencies and options, using SMO's Scripter object. dbatools focuses its cmdlets on repeatable DBA tasks, not every granular SMO option.

## Segment 5 (outro)

For the tasks dbatools already covers cleanly, use dbatools. For the edge cases, dropping down to SMO directly is the way through. Next up: scripting patterns — parameterizing, -WhatIf, and splatting for safer, more readable DBA scripts.
