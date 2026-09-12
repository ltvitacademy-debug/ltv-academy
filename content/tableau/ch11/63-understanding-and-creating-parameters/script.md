# Script — Understanding & Creating Parameters

## Segment 1 (title)

A parameter is a single value that lives in the workbook itself, completely independent of any connected data source — closer to a variable in a programming language than to a field.

## Segment 2 (screenshot: Create Parameter menu)

Creating one starts here, in the real Data pane context menu — Create Parameter sits right next to Create Calculated Field. That placement matters: parameters and calculated fields work together constantly, which is exactly what next lesson covers.

## Segment 3 (screenshot: Create Parameter dialog)

This is the real Create Parameter dialog. Every parameter gets a name, a data type, a current value, and — most importantly — an allowable values setting: All lets someone type anything, List gives a fixed dropdown of specific choices, and Range gives a slider between a minimum and maximum.

## Segment 4 (steps: All, List, or Range)

All accepts any value of that data type. List is the right choice when you want a clean dropdown of named options, like choosing between Sales, Profit, and Quantity. Range is the right choice for a continuous value, like a target profit margin between zero and one hundred percent.

## Segment 5 (outro)

By itself, a parameter doesn't change anything in your view — nothing references it yet. Next lesson, you'll connect a parameter to a calculated field, which is where a parameter actually starts to do something.
