# Lesson 22 — Expression Language & System Variables

**Chapter 4 · Control Flow & Orchestration · Lesson 6 of 6**

## What you'll learn

- The `@` syntax underneath every expression this chapter has used
- The difference a bare expression and `@{...}` string interpolation make
- The six categories of built-in functions worth knowing exist
- The system variables available at pipeline and trigger scope

## The `@` syntax, formalized

Every dynamic value in Data Factory — a parameter reference, a
variable, an activity output — is written in one **expression
language**, evaluated at runtime. Three rules cover nearly everything:

- Start an expression with **`@`**: `@pipeline().parameters.password`
- A literal string with no `@` is returned exactly as written.
- Escape a literal `@` character with **`@@`**.

```
@pipeline().parameters.myNumber        // returns 42 (a number)
@{pipeline().parameters.myNumber}      // returns "42" (a string)
"Answer is: @{pipeline().parameters.myNumber}"   // "Answer is: 42"
```

That last pattern — `@{...}` wrapped **inside** a string — is
**string interpolation**: it forces the result into a string, useful
the moment you're building a dynamic file name or message rather than
passing a value through untouched.

## Six categories of built-in functions

| Category | Purpose | A few examples |
|---|---|---|
| **Date/Time** | Timestamp manipulation | `utcNow`, `addDays`, `formatDateTime` |
| **String** | Text operations | `concat`, `split`, `replace`, `toUpper` |
| **Collection** | Array/object operations | `contains`, `first`, `length`, `union` |
| **Logical** | Boolean operations | `and`, `or`, `equals`, `if` |
| **Conversion** | Type conversion | `string`, `int`, `bool`, `json` |
| **Math** | Numeric operations | `add`, `sub`, `max`, `rand` |

You don't need to memorize every function in every category — you
need to know these six categories **exist**, so that when a pipeline
needs to format a date or build a dynamic path, you know where to
look rather than reaching for a workaround.

## System variables: pipeline scope

Referenced anywhere in a pipeline's JSON, no setup required:

| Variable | Returns |
|---|---|
| `@pipeline().Pipeline` | The pipeline's name |
| `@pipeline().RunId` | This specific run's ID |
| `@pipeline().TriggerType` | What kind of trigger fired this run |
| `@pipeline().TriggerTime` | When the trigger actually fired |
| `@pipeline().DataFactory` | The data factory's own name |

## System variables: trigger scope

Different trigger types expose their own system variables — Chapter 6
covers triggers properly, but two worth knowing now:

- **Schedule trigger**: `@trigger().scheduledTime` (when it was
  supposed to fire) vs. `@trigger().startTime` (when it actually
  did — these can differ slightly).
- **Storage event trigger**: `@triggerBody().fileName` and
  `@triggerBody().folderPath` — exactly what file arriving actually
  fired the pipeline.

## Why this lesson closes the chapter

Every activity across this entire chapter — If Condition's boolean,
Switch's string, ForEach's array, Until's loop condition, Execute
Pipeline's parameters — is powered by this same expression language
underneath. Chapter 3 taught the activities; this chapter taught the
control-flow logic connecting them; and this lesson is the syntax
that both were secretly speaking the entire time.

## Key terms

| Term | Meaning |
|---|---|
| Expression | A dynamic value starting with `@`, evaluated at pipeline runtime |
| String interpolation | Wrapping an expression in `@{...}` inside a string to force a string result |
| System variable | A built-in value (like `@pipeline().RunId`) requiring no manual definition |

## Lab

1. Build a Set Variable activity that stores
   `@concat('Run-', pipeline().RunId)` and confirm its value in Debug
   output.
2. Try both a bare expression and a string-interpolated one
   referencing the same parameter — compare the two results.
3. Name one function from each of the six categories above, from
   memory, without checking back.

## Check yourself

Chapter 4 is complete when you can explain, in one sentence, the
difference between `@pipeline().parameters.myValue` and
`@{pipeline().parameters.myValue}`, and why that difference actually
matters when building a dynamic file path.
