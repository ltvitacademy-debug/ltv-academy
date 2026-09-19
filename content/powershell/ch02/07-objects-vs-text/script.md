# Script — Objects vs. Text

## Segment 1 (title)

What you see printed in the console is not the same thing as what actually flows through the pipeline. This is the deepest idea in this pair of chapters, and it's been building since Lesson 1.

## Segment 2 (code: proving the object is still there)

Get-Process | Select-Object -First 3 prints something that looks exactly like a plain text table. It isn't — PowerShell is auto-formatting real objects for your eyes. Get-Process | Get-Member proves it: CPU, Id, ProcessName, dozens of real queryable properties, whether or not they showed up as a column.

## Segment 3 (code: Format-Table changes something real)

Get-Process | Format-Table Name, CPU -AutoSize also prints what looks like a plain text table — but Format-Table converts the pipeline into formatting instruction objects, not the original Process objects anymore. That's why a Format cmdlet should be the last thing in a pipeline.

## Segment 4 (code: the bash-habit mistake)

Format-Table -AutoSize sizes each column to fit the widest value in that batch of results — add one longer process name tomorrow and every column shifts width. Parsing that text by splitting on spaces breaks silently. Select-Object Name, CPU instead returns real objects with real properties, immune to display formatting.

## Segment 5 (outro)

Work with objects through every stage of a pipeline, and only format at the very end for a human to read. That's the habit that makes a PowerShell script reliable in the way Lesson 1 promised. Next up: Where-Object, Select-Object & ForEach-Object.
