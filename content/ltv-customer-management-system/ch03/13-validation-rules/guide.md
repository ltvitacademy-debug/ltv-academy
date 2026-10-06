# Lesson 13 — Validation Rules

**Chapter 3 · Build: Automation and Security · Lesson 13 of 20**

## What you'll learn

- How to build four validation rules across three different objects in
  Cascade's org
- How to finally implement the Loss Reason rule Lesson 8 set up but
  deliberately didn't build
- How to implement the Decision Maker rule Lesson 6 foreshadowed, using
  one new field this lesson adds
- How to write a validation rule's error condition so it fires exactly
  when it should — and not when it shouldn't

Every rule below targets a real data-quality problem specific to
Cascade's data, not a generic "field can't be blank" example.

## Rule 1 — Loss Reason is required on Closed Lost (Opportunity)

Lesson 8 created the `Loss_Reason__c` field and explicitly deferred this
rule to Chapter 3. Build it now, under **Object Manager → Opportunity →
Validation Rules → New**:

```
Rule name: Loss_Reason_Required_When_Closed_Lost
Error condition:
  AND(
    ISPICKVAL(StageName, "Closed Lost"),
    ISBLANK(TEXT(Loss_Reason__c))
  )
Error message: "Loss Reason is required when a deal is Closed Lost."
Error location: Loss_Reason__c field
```

This only fires on the one stage where a reason is actually required —
every other stage saves normally with Loss Reason blank.

## Rule 2 — Decision Maker confirmed before Negotiation/Review (Opportunity)

Lesson 6 created `Decision_Maker__c` on Contact and said it would be
"used later by the Opportunity-stage validation rule in Chapter 3." To
make that real, this lesson adds one new field — **Primary Contact**
(`Primary_Contact__c`, a Lookup to Contact on Opportunity) — so an
Opportunity can reference the specific Contact driving the deal.

```
Rule name: Decision_Maker_Required_Before_Negotiation
Error condition:
  AND(
    OR(
      ISPICKVAL(StageName, "Negotiation/Review"),
      ISPICKVAL(StageName, "Closed Won")
    ),
    OR(
      ISBLANK(Primary_Contact__c),
      NOT(Primary_Contact__r.Decision_Maker__c)
    )
  )
Error message: "This Opportunity can't move to Negotiation/Review or
  Closed Won until its Primary Contact is set and flagged as a
  Decision Maker."
```

`Primary_Contact__r` is the relationship name Salesforce generates for
the lookup — the `__r` suffix is what lets a validation rule reach across
to a field on the related Contact record.

## Rule 3 — Target Install Date can't be in the past (Installation Project)

```
Rule name: Target_Install_Date_Not_Past
Error condition: Target_Install_Date__c < TODAY()
Error message: "Target Install Date can't be in the past."
Error location: Target_Install_Date__c field
```

Simple, but it closes a real gap: without it, nothing stops Marcus
Webb's team from accidentally scheduling (or leaving scheduled) an
installation on a date that's already passed.

## Rule 4 — Annual Value must be positive (Service Contract)

```
Rule name: Annual_Value_Positive
Error condition: Annual_Value__c <= 0
Error message: "Annual Value must be greater than zero."
Error location: Annual_Value__c field
```

A Service Contract with a zero or negative Annual Value is bad data
every time — this rule stops it at the point of entry instead of letting
it reach Chapter 4's renewal reports.

## Testing each rule before moving on

For each rule, do both a failing save and a passing save: try to close an
Opportunity as Closed Lost with no Loss Reason (should block), then add a
reason and save again (should succeed). The full test pass for all four
rules together happens formally in Lesson 17.

## Key terms

| Term | Meaning |
|---|---|
| Error condition | The formula that, when true, blocks the save and shows the error |
| Cross-object formula | A formula that reaches from one object to a field on a related record, via the relationship name |
| Relationship name (`__r`) | The suffix Salesforce generates for a custom lookup/master-detail field, used to traverse it in formulas |

## Lab

Build all four validation rules, plus the new `Primary_Contact__c` lookup
field on Opportunity that Rule 2 depends on. Test each rule with one
failing save and one passing save, exactly as described above.

## Check yourself

- Which validation rule did Lesson 8 set up the field for but
  deliberately defer to this chapter?
- What new field does Rule 2 require, and what object is it on?
- Why does `Primary_Contact__r.Decision_Maker__c` work in a formula, but
  `Primary_Contact__c.Decision_Maker__c` would not?
