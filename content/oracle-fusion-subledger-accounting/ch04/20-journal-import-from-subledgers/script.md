# Script — Journal Import from Subledgers

## Segment 1 (title)

Lesson nineteen covered Transfer Journal Entries to GL at the process level. This lesson looks underneath it, at the actual mechanism that lands subledger journal data inside General Ledger's own tables.

## Segment 2 (steps)

When transfer moves a Final subledger entry to GL, it has to become a real GL journal batch - the same object you already know from General Ledger. The mechanism that does that conversion is journal import: it takes journal data from an outside source and creates it as a properly structured GL batch, with a batch name, source, category, and every other attribute a GL batch needs.

## Segment 3 (steps)

Here's the part people miss: journal import isn't built only for Subledger Accounting. It's the same general-purpose mechanism used for a spreadsheet upload, an FBDI file, or a feed from a non-Oracle system. SLA is just the highest-volume user of it, because every subledger transaction has to land in GL through exactly this path.

## Segment 4 (steps)

Every journal landing through import carries a source - which system or process it came from - and a category, the type of activity, like Purchase Invoices or Receipts. These trace straight back to the event class and subledger application from chapter one. The classification you set up at the very start is still visible all the way at the GL journal level.

## Segment 5 (code)

If a transfer seemingly didn't work - Final ran, but nothing shows up in GL - journal import is one place to check. Filter the GL journal batch list by source, category, ledger, and date to confirm whether import actually created the batch, versus the problem sitting upstream at Create Accounting or the transfer step itself.

## Segment 6 (outro)

So remember: journal import is the shared GL mechanism that turns external journal data, most often transferred SLA entries, into standard GL batches tagged by source and category. That closes chapter four. Up next, chapter five, lesson twenty-one: subledger reports, journal entries, and account analysis.
