# Script — Custom Report Types

## Segment 1 (title)

Standard report types are joins Salesforce decided on for you. Sooner or later someone asks for a combination that isn't one of them, and that's where custom report types come in.

## Segment 2 (steps: why they exist)

Three situations send admins to custom report types. A custom object needs a report type of its own. Two standard objects relate in a way no built-in type exposes. Or a report needs to show records that are missing a related record entirely, like accounts with zero opportunities. None of those are possible with what ships out of the box.

## Segment 3 (steps: building one)

Building one starts in Setup, under Report Types. Click New Custom Report Type, pick a primary object — that choice is permanent once you save — then add a display label, a category so people can find it, and a status. In Development hides it from everyone but admins while you test; Deployed makes it live for the org.

## Segment 4 (steps: the relationship choice)

The real power move is the relationship setting on any related object. "Each A must have a related B" behaves like an inner join: only parent records with a match show up. "A may or may not have a related B" behaves like a left join: every parent record shows up, matched or not. That second option is the only way to report on records missing something — leads nobody's called, accounts with no opportunities.

## Segment 5 (steps: layout and deploy)

Last step is field layout. Drag fields from the Fields panel into sections, hide what you don't want cluttering things, and pull in extra fields with Lookup Fields if you need them. Then flip the status to Deployed so report builders across the org can actually pick it.

## Segment 6 (outro)

Get the relationship setting right and a custom report type can answer questions standard types never could. Next up: where those reports actually live — folders, and who gets to see inside them.
