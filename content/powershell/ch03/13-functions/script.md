# Script — Functions

## Segment 1 (title)

Every cmdlet you've used since Lesson 3 is Verb-Noun shaped. When you write your own reusable logic, you shape it the same way — function Test-DiskSpace, with a param block, called exactly like a built-in cmdlet.

## Segment 2 (code: parameters)

param(...) declares what a function accepts. Typed parameters like [int]$ThresholdGB reject the wrong kind of value immediately; default values like = 20 mean the function still works when the caller doesn't supply that parameter.

## Segment 3 (code: calling it)

Once defined, Test-DiskSpace is called exactly like Get-ChildItem or any built-in — with or without overriding its defaults. That consistency is the entire point of shaping your own commands the same way.

## Segment 4 (steps: chapter close)

Chapter 3 is done — .ps1 files, execution policy, if/switch, the right loop, and now your own Verb-Noun function. Chapter 4, PowerShell for Azure & SQL, is next.

## Segment 5 (outro)

Verb-Noun matters even for yourself — Test-DiskSpace reads instantly, diskCheck doesn't. Next up: the Az module — where this stops being generic PowerShell and starts being Azure-specific.
