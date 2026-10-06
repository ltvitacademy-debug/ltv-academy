# Script — Collections

## Segment 1 (title)

A regular variable holds one value. A collection variable holds many — multiple numbers, multiple text strings, or multiple full records. You'll see it called a collection, a collection variable, or a record collection — all the same thing.

## Segment 2 (screenshot: get records canvas)

The most common way a collection gets created is a Get Records element. Change its "How Many Records to Store" setting from "Only the first record" to "All records," and suddenly that element hands you a collection instead of a single record.

## Segment 3 (screenshot: toolbox)

You'll see it in the Toolbox under its own heading — Record Collection Variables — kept separate from ordinary single-record Variables, so you always know at a glance which of your variables hold one record and which hold many.

## Segment 4 (steps: filter vs sort)

Two elements work directly on collections. Collection Filter removes anything that doesn't match your criteria — but it builds a brand-new collection to do it, leaving the original completely untouched. Collection Sort is different: it reorders the collection you give it, in place, and it can also truncate it — sort by Amount descending, keep only the top 10, and the rest are simply dropped.

## Segment 5 (screenshot: full pipeline)

Here's the whole pattern on one canvas: Filter Generators narrows a big opportunity collection down to just the generator-category ones, Top 10 Generator Opps sorts that by Amount and keeps only the top 10, and from there a Transform element and a Create Records element turn those opportunities into campaign members.

## Segment 6 (outro)

One more thing worth remembering: if you already know your filter and sort criteria when you configure Get Records, use its own filter and sort settings — it's more efficient than adding separate Collection Filter and Collection Sort elements afterward. Save those for when the criteria isn't known until later in the flow. Next up: Get Records itself — the element every collection in this lesson started from.
