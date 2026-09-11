# Script — The Expression Editor

## Segment 1 (title)

Welcome back. Every text box color, every number format, every conditional label you'll build for the rest of this chapter runs through one dialog box — the Expression editor. Let's get comfortable with it before we build anything real.

## Segment 2 (screenshot: expression-editor-left-function)

Almost any property on a report item can be set to an expression instead of a literal value — a text box's Value, its Color, a rectangle's Fill. Right-click that property, or click its fx button, and you get this same dialog every time. This screenshot shows it mid-build: someone's inserted the Left function into an expression for a text box's Value property.

Notice the four things happening here. At the top, the expression text area — labeled "Set expression for: Value" — is the actual text you're building, always starting with an equal sign. On the left, Category — the built-in collections like Parameters, Fields, Datasets, and Variables, plus a Common Functions node that expands into Text, Date and Time, Math, and more. In the middle, Item — whatever belongs to the category you picked; here, Common Functions expanded to Text shows Left, Len, LCase, and the rest of the string functions.

## Segment 3 (steps: four regions)

And on the right — Description and Example. The moment you click an item, this panel tells you what it does, in plain English, and shows a real working expression using it. For Left, that's "returns a string containing a specified number of characters from the left side of a string," with the example Left, Fields bang Description dot Value, comma 4. Double-click anything in that Item list, and it drops straight into your expression at the cursor — you're picking functions and fields, not typing them from memory.

## Segment 4 (outro)

Next lesson, we put this dialog to work on the patterns you'll use constantly — referencing a field, referencing a parameter, and making a decision with IIF.
