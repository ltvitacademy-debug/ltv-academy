# Script — Role-Playing Dimensions

## Segment 1 (title)

Last lesson consolidated too many small dimensions into one. This lesson is almost the opposite problem: one real dimension that legitimately needs to show up more than once on the same fact table.

## Segment 2 (steps: the classic example)

The example you'll hit constantly is the date dimension. A sales fact table usually needs three separate date questions answered: when was the order placed, when did it ship, when did it actually get delivered. Those are three genuinely different business questions, but there's no reason to build three separate date dimensions to answer them — a date is a date. So the fact table carries three foreign keys, order date, ship date, and delivery date, that all point at the exact same single Date dimension table.

## Segment 3 (real Microsoft Fabric diagram)

Microsoft's own Fabric Warehouse guidance shows the identical pattern with a completely different business, to prove it's a general technique. A Flight fact table relates to an Airport dimension twice — once as the departure airport, once as the arrival airport. There's only one physical Airport table in the warehouse; it just plays two distinct roles for this one fact.

## Segment 4 (steps: physical vs. logical)

Here's the detail that trips people up: you build and maintain exactly one physical dimension table, never one copy per role. Duplicating it means multiple ETL loads to keep in sync and the real risk that supposedly identical copies drift apart. The distinction between the roles gets made downstream instead — in a Power BI semantic model, only one relationship between the fact and that dimension is active by default, and a DAX measure has to explicitly activate any of the others with USERELATIONSHIP.

## Segment 5 (outro)

One dimension, multiple roles on one fact table. Next lesson covers a different kind of multiplication: when a fact and a dimension relate many-to-many instead of the clean one-to-many you've been building all course.
