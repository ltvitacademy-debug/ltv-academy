# Lesson 41 — Apex Enums and Wrapper Classes

**Chapter 6 · Apex Beyond the Basics · Lesson 41 of 43**

## What you'll learn

- Declaring and using an `enum` in Apex
- Using an enum inside a `switch on` statement
- What a wrapper class is, and why it's just an ordinary class with a specific purpose
- A realistic wrapper class example bundling data for a Lightning Web Component or REST response
- Why wrapper classes and `@InvocableVariable` wrapper classes (Lesson 40) are the same underlying idea

## Declaring an enum

An `enum` defines a fixed, named set of possible values — useful anywhere a variable should only ever hold one of a small, known set of options, rather than an arbitrary `String` that could contain a typo with no compile-time warning:

```apex
public enum OpportunityRisk {
    LOW,
    MEDIUM,
    HIGH
}

OpportunityRisk currentRisk = OpportunityRisk.MEDIUM;
```

Unlike a `String` holding `'MEDIUM'`, an `OpportunityRisk` variable can only ever be assigned one of the three declared values — `OpportunityRisk.LOW`, `.MEDIUM`, or `.HIGH` — and a typo like `OpportunityRisk.MEDIM` is a compile error, not a silent runtime bug.

## Using an enum in a switch statement

Apex's `switch on` statement pairs naturally with enums:

```apex
public String describeRisk(OpportunityRisk risk) {
    switch on risk {
        when LOW {
            return 'Low risk — proceed as normal.';
        }
        when MEDIUM {
            return 'Medium risk — flag for manager review.';
        }
        when HIGH {
            return 'High risk — requires executive sign-off.';
        }
        when else {
            return 'Unknown risk level.';
        }
    }
}
```

`switch on` can match against multiple values in one `when` branch by separating them with commas (`when LOW, MEDIUM { ... }`), and `when else` provides a fallback branch, similar in spirit to `ELSE` in a SQL `CASE` expression or `default` in other C-family languages.

## What a wrapper class actually is

A **wrapper class** isn't a special Apex language feature — it's just an ordinary class whose entire purpose is to bundle several related values together into one object, usually because some other API (a Visualforce page, an `@AuraEnabled` Lightning Web Component method, a REST response) needs to return more structured data than a single sObject or primitive naturally represents.

```apex
public class OpportunitySummary {
    public String opportunityName;
    public Decimal amount;
    public OpportunityRisk risk;
    public Integer daysUntilClose;
}
```

```apex
@AuraEnabled
public static List<OpportunitySummary> getOpenOpportunitySummaries() {
    List<OpportunitySummary> summaries = new List<OpportunitySummary>();

    for (Opportunity opp : [SELECT Name, Amount, CloseDate FROM Opportunity WHERE IsClosed = false]) {
        OpportunitySummary s = new OpportunitySummary();
        s.opportunityName = opp.Name;
        s.amount = opp.Amount;
        s.daysUntilClose = opp.CloseDate.daysBetween(Date.today());
        summaries.add(s);
    }

    return summaries;
}
```

A Lightning Web Component calling `getOpenOpportunitySummaries()` gets back exactly the shape it needs — ready to bind directly into its UI — rather than a raw `List<Opportunity>` plus a separate calculation the component would otherwise have to perform itself.

## The same idea you already saw in Lesson 40

Lesson 40's `Request` and `Result` classes for `@InvocableMethod` were wrapper classes too — the same general-purpose pattern (bundle related fields into one class for a specific calling context) just applied to Flow's input/output requirements instead of an LWC's data shape. Once you recognize a wrapper class for what it is, you'll notice the same pattern reused constantly across Apex REST responses, Flow actions, and LWC controller methods.

## Key terms

| Term | Meaning |
|---|---|
| `enum` | A fixed, named set of possible values for a variable, checked at compile time |
| `switch on` | A control-flow statement that branches based on matching a value, well-suited to enums |
| Wrapper class | An ordinary class whose purpose is to bundle related values together for a specific calling context |

## Lab

In a Developer Edition org, declare the `OpportunityRisk` enum and `describeRisk()` method exactly as shown, and test it with all three enum values plus (if you can trigger the `else` branch legitimately) confirm the fallback text. Then write the `OpportunitySummary` wrapper class and the `getOpenOpportunitySummaries()` method, and call it from an anonymous Apex script, printing each summary's fields to the debug log.

## Check yourself

Why is an `enum` safer than a plain `String` for representing a fixed set of options like Low/Medium/High risk? In what sense are the `Request`/`Result` classes from Lesson 40 the same kind of thing as the `OpportunitySummary` class in this lesson?
