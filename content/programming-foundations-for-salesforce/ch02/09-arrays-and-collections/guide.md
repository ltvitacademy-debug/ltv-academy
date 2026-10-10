# Lesson 9 — Arrays and Collections

**Chapter 2 · Structuring Code · Lesson 9 of 18**

## What you'll learn

- Why a single variable isn't enough once you're working with many values of the same kind
- Apex's three core collection types: List, Set, and Map, and when to reach for each
- How indexing works, and the classic off-by-one indexing mistake
- Why this chapter matters enormously for the Apex-specific courses ahead, where collections are everywhere

## One variable per value doesn't scale

Lesson 3 covered variables that hold a single value each. That's fine for one customer's name, but real programs deal with many values of the same kind at once — every product in an order, every customer in a region, every stage a deal might be in. Declaring a separate variable for each one (`customer1`, `customer2`, `customer3`...) doesn't scale and makes looping over them (Lesson 6) impossible, since a loop needs one name it can refer to repeatedly, not a different name for every item. **Collections** solve this: they hold multiple values together under one name.

## List: an ordered, indexable collection

A **List** holds an ordered sequence of values, and allows duplicates. Each item has a position, called an **index**, starting at `0` — not `1`:

```apex
List<String> customerNames = new List<String>();
customerNames.add('Jordan');
customerNames.add('Priya');
customerNames.add('Jordan'); // duplicates are allowed in a List

System.debug(customerNames[0]); // Jordan
System.debug(customerNames[1]); // Priya
System.debug(customerNames.size()); // 3
```

The index of the first item is `0`, the second is `1`, and so on — the last valid index is always `size() - 1`, never `size()`. Trying to access `customerNames[3]` here, when there are only 3 items at indexes 0, 1, and 2, throws a runtime error. This off-by-one confusion between "the third item" and "index 3" is one of the single most common mistakes across every programming language that uses zero-based indexing, Apex included.

## Set: unique values, no guaranteed order

A **Set** holds a collection of values with no duplicates allowed and no guaranteed order:

```apex
Set<String> uniqueStages = new Set<String>();
uniqueStages.add('Prospecting');
uniqueStages.add('Closed Won');
uniqueStages.add('Prospecting'); // ignored -- already in the set

System.debug(uniqueStages.size()); // 2, not 3
```

Reach for a Set specifically when "does this collection already contain this value" matters more than order, or when you need to guarantee no duplicates — deduplicating a list of record Ids is a textbook real-world use case you'll see constantly once you reach Apex-specific work.

## Map: keyed lookups

A **Map** holds key-value pairs, where each key maps to exactly one value, and you look values up by key rather than by position:

```apex
Map<String, Integer> loyaltyPointsByName = new Map<String, Integer>();
loyaltyPointsByName.put('Jordan', 50);
loyaltyPointsByName.put('Priya', 20);

System.debug(loyaltyPointsByName.get('Jordan')); // 50
System.debug(loyaltyPointsByName.containsKey('Priya')); // true
```

A Map is the right tool whenever you need to look something up quickly by a known identifier instead of scanning through an entire List checking each item one at a time. This becomes especially important once you're working with real Salesforce data, where looking up a record by its Id is an extremely common pattern.

## Choosing between them

A quick way to decide: do you care about order and allow duplicates? Use a **List**. Do you only care whether something is present, with no duplicates? Use a **Set**. Do you need to look values up by a specific key rather than by position? Use a **Map**. All three can be looped over with a `for each` loop from Lesson 6, and all three get used constantly once you're writing real Apex against real Salesforce data later in this path.

## Key terms

| Term | Meaning |
|---|---|
| Collection | A single variable that holds multiple values together |
| List | An ordered collection, indexed from 0, allowing duplicates |
| Index | A position within a List, starting at 0 |
| Set | An unordered collection with no duplicate values allowed |
| Map | A collection of key-value pairs, looked up by key rather than position |

## Lab

Write Apex code (no org needed) that builds a `List<String>` of five fictional product names, then loops over it with a `for each` loop printing each one. Then build a `Map<String, Decimal>` mapping each of those same five product names to a price, and write code that looks up and prints the price for exactly one of them by name. Finally, explain in one sentence why you'd reach for a Map instead of a List if your real goal was fast lookup by product name.

## Check yourself

Can you explain, without looking back, why the valid indexes of a List with 5 items run from 0 to 4, not 1 to 5? Can you describe, in your own words, a realistic scenario where you'd choose a Set over a List, and a different scenario where you'd choose a Map over both?
