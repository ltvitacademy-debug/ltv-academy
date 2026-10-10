# Lesson 40 — Invocable Methods and Flow

**Chapter 6 · Apex Beyond the Basics · Lesson 40 of 43**

## What you'll learn

- How to make an Apex method callable directly from Flow Builder as an action
- Why `@InvocableMethod` requires a `List` of a wrapper class as both input and output, even for a single value
- The `@InvocableVariable` annotation and the fields it's allowed to mark
- The `label` and `description` parameters that control how the action appears to Flow builders
- Why a Flow-callable method needs its own permission check on the running user

## Why Apex sometimes needs to be callable from Flow

Flow can do an enormous amount declaratively, but some logic is either too complex to express in Flow's visual building blocks or already exists as Apex for other reasons (reused from a trigger handler, say). `@InvocableMethod` is the bridge: it exposes a `public` or `global` `static` Apex method as an action a Flow (or Process Builder) can call directly, with no code on the Flow side.

## The method and its wrapper classes

```apex
public with sharing class OpportunityDiscountAction {

    @InvocableMethod(label='Apply Loyalty Discount' description='Applies a loyalty discount to the given Opportunities.')
    public static List<Result> apply(List<Request> requests) {
        List<Result> results = new List<Result>();
        List<Opportunity> toUpdate = new List<Opportunity>();

        for (Request req : requests) {
            Opportunity opp = new Opportunity(Id = req.opportunityId);
            opp.Amount = req.currentAmount * (1 - req.discountPercent / 100);
            toUpdate.add(opp);

            Result r = new Result();
            r.newAmount = opp.Amount;
            results.add(r);
        }

        update toUpdate;
        return results;
    }

    public class Request {
        @InvocableVariable(label='Opportunity Id' required=true)
        public Id opportunityId;

        @InvocableVariable(label='Current Amount' required=true)
        public Decimal currentAmount;

        @InvocableVariable(label='Discount Percent' required=true)
        public Decimal discountPercent;
    }

    public class Result {
        @InvocableVariable(label='New Amount')
        public Decimal newAmount;
    }
}
```

## Why List<Request> in, List<Result> out — always

This is the detail that surprises people coming from regular Apex: `@InvocableMethod` always takes a `List` of its input wrapper class and always returns a `List` of its output wrapper class, even when the Flow using it only ever passes one record at a time. This is because Flow (like a trigger) can invoke an action against a bulk collection of records in one call, and Apex REST-style one-at-a-time method signatures would force Flow into the same per-record performance problem Lesson 27 warned about. The method itself is responsible for bulk-processing the full `requests` list — building `toUpdate` across the loop and issuing one `update` at the end, exactly the pattern from Chapter 4.

## @InvocableVariable rules

Only `global` or `public` variables can be marked `@InvocableVariable` — a `private`, `protected`, `static`, or `final` member cannot be. The `label` parameter controls what a Flow builder actually sees in Flow Builder's UI for that field (it defaults to the variable's own name if omitted); `description` provides explanatory text; `required` (default `false`) marks whether Flow Builder must supply a value for that input — though `required` has no effect on an output variable, since Flow doesn't need to supply those.

## Permissions matter here too

A Flow that calls Apex only succeeds if the user running that Flow has access to the invoked Apex class — through their profile or a permission set, exactly the kind of access control Lesson 31 covered for other entry points into Apex. A method working perfectly when tested as a System Administrator can fail silently (or with a permission error) for a standard user whose profile was never granted access to the class.

## Key terms

| Term | Meaning |
|---|---|
| `@InvocableMethod` | Marks a `static` Apex method as callable as an action from Flow or Process Builder |
| `@InvocableVariable` | Marks a `public`/`global` field as a Flow-visible input or output on an invocable method's wrapper class |
| Wrapper class | The simple class bundling related fields together, used as the required List input/output type |

## Lab

In a Developer Edition org, create the `OpportunityDiscountAction` class exactly as shown. Build a simple screen Flow that collects an Opportunity Id, a current amount, and a discount percentage from the user, calls this Apex action, and displays the returned new amount. Run the Flow and confirm the Opportunity's Amount was actually updated.

## Check yourself

Why does `@InvocableMethod` require a List as both its parameter and return type, even for a Flow that only ever passes one record? What determines whether a variable is allowed to be marked `@InvocableVariable`?
