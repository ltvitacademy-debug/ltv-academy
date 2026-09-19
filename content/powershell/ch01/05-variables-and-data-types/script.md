# Script — Variables & Data Types

## Segment 1 (title)

Every PowerShell variable starts with a dollar sign, no declaration step, no type required up front — PowerShell figures out the type for you.

## Segment 2 (code: loose typing has a real consequence)

$serverName = "SQLPROD01" becomes a string because of the quotes. $maxConnections = 100 becomes an integer because it doesn't have any. That matters: "5" + 3 produces the string "53", while 5 plus 3 produces the integer 8 — same-looking numbers, different result, depending entirely on whether quotes made one of them text.

## Segment 3 (code: the common types)

String, int, double, bool, array, datetime — the handful of types you'll run into constantly, and you can force one explicitly with [int]$retryCount = 3 when you need to be certain.

## Segment 4 (code: Get-Member proves it)

Pipe anything into Get-Member and it lists the object's real type name plus every property and method on it. That's the exact tool that makes the next chapter's objects-versus-text distinction concrete instead of abstract.

## Segment 5 (outro)

Chapter 1, PowerShell Basics, is done: the console and VS Code, cmdlets, getting help, variables and types. Chapter 2, Working With Objects & Pipelines, is next — starting with the pipe operator itself.
