# Script — Report Templates

## Segment 1 (title)

With a data model producing XML, the template is where that data becomes something a human actually reads: a formatted page, a table, a form. Let's build one.

## Segment 2 (steps)

Most financial report templates are RTF files, ordinary Word documents enhanced with the BI Publisher Template Builder add-in. That's deliberate, it lets someone comfortable in Word design the layout using Word's own formatting, instead of requiring a programmer to hand-code it.

## Segment 3 (steps)

The workflow: get sample XML from the data model, build the Word document's visual layout, then use the Template Builder to map areas of the document to fields in that XML, a placeholder becomes "insert Invoice Number here," a table row becomes a loop that repeats per detail row. Preview against the sample data, then upload the finished RTF as the report's layout.

## Segment 4 (code)

Two mechanics do almost all the work. A field is a single placeholder tied to one XML element. A loop repeats a chunk of layout once per row in a repeating data set, that's how one table row in the template produces a multi-page listing at run time. Getting the loop boundaries right, wrapping only the detail fields and not the header above it, is the most common first mistake.

## Segment 5 (outro)

Beyond RTF, BI Publisher supports other template types and a range of output formats, PDF, Excel, PowerPoint, HTML, depending on how the report will be consumed. Up next, lesson eighteen: running and scheduling the finished report.
