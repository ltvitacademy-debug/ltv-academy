# Text, Number, Date, and Checkbox Fields

**Chapter 2 · Fields · Lesson 10 of 23**

These four types make up what Lesson 9 called the "simple value" family — fields that just hold a
piece of data, with no formula and no relationship behind them. They're the most common fields in
any org by a wide margin, and getting their settings right at creation avoids a lot of messy data
later.

## What you'll learn

- What Text, Number, Date, and Checkbox each store, and the real settings each one asks for
- Why a Number field's settings include decimal places, and a Text field's includes a length limit
- What a real record looks like once these fields are filled in

## Text: length matters

A **Text** field stores up to 255 characters on a single line — names, short codes, reference
numbers. The one setting that actually matters at creation is **Length**: Salesforce asks for a
maximum character count up front, and that cap is enforced on every record going forward. Set it
too low (say, 20 characters for a field meant to hold a full street address) and users will hit a
save error the first time they need more room.

For free-form notes longer than one line, Salesforce offers **Text Area** and **Text Area (Long)**
instead — same basic idea, more room.

## Number: decide precision up front

A **Number** field stores a numeric value and asks for two settings: **Length** (digits before the
decimal point) and **Decimal Places** (digits after it). A field meant to hold whole-unit counts —
like a quantity — should have 0 decimal places; a field meant to hold a measurement like square
footage might need one or two.

![The Number, Percent, Phone, and Text/Text Area family on the Choose the Field Type screen.](/courses/salesforce-data-model-fundamentals/ch02/10-text-number-date-and-checkbox-fields/new-field-number-text-types.png)

**Currency** is a close cousin of Number — same decimal-place setting, but it formats the value with
a currency symbol and (in orgs with multiple currencies enabled) respects each record's own
currency.

## Date and Checkbox: simple by design

A **Date** field stores a calendar date with a pop-up calendar picker; **Date/Time** adds a time
component. Neither stores anything a formula couldn't also compute — they're just the raw input a
user types or picks, which other fields (like a formula calculating "days since created") can later
reference.

A **Checkbox** is the simplest field Salesforce offers: a single True/False (checked/unchecked)
value, with no length or precision to configure at all.

![Step 1 of a new field on Account, with Date selected — Checkbox, Currency, and Date/Time sit in the same group.](/courses/salesforce-data-model-fundamentals/ch02/10-text-number-date-and-checkbox-fields/new-field-date-checkbox-types.png)

## What these look like once they're filled in

Here's a real Property record with several simple value fields populated: Property Name (Text),
Bedrooms and Square Footage (Number), Price (Currency), and Listed On (Date).

![A Property record's Details tab, showing Text, Number, Currency, and Date field values together.](/courses/salesforce-data-model-fundamentals/ch02/10-text-number-date-and-checkbox-fields/field-values-on-record.png)

Nothing about this record's layout tells you which field is custom and which is standard — that's a
question Lesson 15 answers. What matters here is that four different data types are sitting
side by side, each doing exactly one simple job.

## Key terms

| Term | Meaning |
|---|---|
| Length (Text) | The maximum character count a Text field accepts, set at creation |
| Length / Decimal Places (Number) | Digits before and after the decimal point a Number or Currency field stores |
| Date/Time | A Date field with an added time-of-day component |
| Checkbox | A True/False field with no additional precision settings |

## Check yourself

A Text field was created with a Length of 20, and users keep hitting save errors entering full
addresses. What's the fix, and does it require a new field or just an edit to the existing one?
