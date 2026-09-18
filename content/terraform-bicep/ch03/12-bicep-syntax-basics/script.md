# Script — Bicep Syntax Basics

## Segment 1 (title)

Every Bicep resource declaration follows the same shape: a symbolic name Bicep uses internally, a resource type string with its API version, and a body of properties.

## Segment 2 (code: the resource keyword)

The symbolic name isn't the Azure resource's actual name — it's what other parts of the same file use to reference this resource, for dependencies or to read its properties later. The real Azure name is the name property inside the body.

## Segment 3 (code: the same resource as raw ARM JSON)

Bicep is a friendlier syntax over the exact same deployment engine. The resource compiles down to that same ARM template JSON — same type, same API version, same properties. Only how many characters you type and how easy the result is to read changes.

## Segment 4 (screenshot: the Bicep Visualizer)

Declare more than one resource, and Bicep infers a dependency automatically whenever one resource's property references another's symbolic name — no explicit dependsOn needed, unlike raw ARM JSON. The Visualizer renders that exact graph live, generated from the file you're looking at, never hand-drawn and never stale.

## Segment 5 (outro)

Same deployment engine, friendlier syntax, and a live graph to check your work. Next up: parameters and variables in Bicep.
