# Script — Flow Data Types and Records

## Segment 1 (title)

Lesson 4 showed where the Data Type dropdown lives. This lesson covers what's actually in it — and the one data type that matters most for this course: Record.

## Segment 2 (screenshot: New Resource window)

Text, Number, Currency, Boolean, Date, Date/Time — these work like picking a field type for a custom field. Boolean specifically needs Flow's True and False global constants, not the literal words "true" and "false."

## Segment 3 (screenshot: Start element, object selection)

But Record is different — it holds every field value from one Salesforce record at once, each still in its own data type. Every record-triggered flow starts by picking an object right here, at the Start element.

## Segment 4 (screenshot: Create Records screen)

Once that object's selected, the flow is automatically handed a record variable holding the triggering record — you never build that one by hand. And data elements like Create Records let you set new field values manually, or copy them straight from a record variable like that one.

## Segment 5 (steps: data type cheat sheet)

Quick cheat sheet: Text for strings and IDs, Number or Currency for numeric values, Boolean for true or false, Date or Date/Time for timestamps, and Record when you need the whole thing at once.

## Segment 6 (outro)

Chapter 1 is done. Chapter 2 starts building real flows — starting with record-triggered flows, before-save and after-save.
