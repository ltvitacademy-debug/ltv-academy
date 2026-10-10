# Lesson 13 — Working with Related Records

**Chapter 2 · Working with Data in Apex · Lesson 13 of 43**

## What you'll learn

- Child-to-parent traversal with dot notation
- Parent-to-child traversal with a subquery in the `SELECT` list
- How relationship names differ for standard vs. custom objects (`__r` suffix)
- Filtering on a parent's fields from a child query
- Why relationship queries save you from writing a second, separate query

## Child-to-parent: dot notation

When you're querying a child object (like `Contact`) and need a field from
its parent (`Account`), you reach up through the lookup or master-detail
relationship using dot notation — no second query needed:

```apex
List<Contact> contacts = [
    SELECT Name, Account.Name, Account.Industry
    FROM Contact
    WHERE Account.Industry = 'Technology'
];

for (Contact c : contacts) {
    System.debug(c.Name + ' works at ' + c.Account.Name);
}
```

You can also filter on the parent's fields directly in the `WHERE` clause,
as shown above with `Account.Industry` — this is one query against the
database, not a query plus a loop.

## Parent-to-child: a subquery

Going the other direction — starting from the parent and pulling its related
children — uses a **subquery** nested inside the outer `SELECT` list, wrapped
in its own parentheses:

```apex
List<Account> accounts = [
    SELECT Name, (SELECT LastName, Email FROM Contacts)
    FROM Account
    WHERE Industry = 'Technology'
];

for (Account a : accounts) {
    for (Contact c : a.Contacts) {
        System.debug(a.Name + ' -> ' + c.LastName);
    }
}
```

`Contacts` here is the **child relationship name** — the plural, pluralized
form Salesforce exposes for the standard Account-to-Contact relationship.
Accessing `a.Contacts` on the parent record gives you a `List<Contact>` of
just the children that matched the subquery.

## Relationship names on custom objects

For custom objects, the parent-to-child relationship name is the custom
relationship's name with `__r` instead of `__c`:

```apex
List<Merchandise__c> items = [
    SELECT Name, (SELECT Name, Quantity__c FROM Line_Items__r)
    FROM Merchandise__c
    WHERE Name LIKE 'Acme%'
];
```

The same `__r` suffix applies going child-to-parent on a custom lookup/master-
detail field, e.g. `Line_Item__c.Merchandise__r.Name`.

## A subquery can have its own WHERE clause

Because a subquery is itself a query, you can filter the children
independently of the parent's filter:

```apex
List<Account> accounts = [
    SELECT Name, (SELECT LastName FROM Contacts WHERE Email != null)
    FROM Account
];
```

This returns every matching Account, but each Account's nested `Contacts`
list only includes contacts that have an email address.

## Choosing a direction

Start from whichever side has the filter you actually care about:

- Need accounts with a certain industry, and want their contacts too? Start
  at Account, subquery into Contacts (parent-to-child).
- Need contacts missing an email, and want to know their account's name?
  Start at Contact, dot into Account (child-to-parent).

## Key terms

| Term | Meaning |
|---|---|
| Child-to-parent query | Querying the child object and reading parent fields with dot notation |
| Parent-to-child query | Querying the parent object with a nested subquery for its children |
| Child relationship name | The plural name used to access subquery results, e.g. `Contacts` |
| `__r` | Suffix used for custom-object relationship names, on both lookups and subqueries |

## Lab

Using standard Account/Contact/Opportunity data in a Developer Edition org,
run in Execute Anonymous:

```apex
for (Account a : [
    SELECT Name, (SELECT Name, Amount FROM Opportunities WHERE IsClosed = false)
    FROM Account
    LIMIT 10
]) {
    System.debug('Account: ' + a.Name);
    for (Opportunity o : a.Opportunities) {
        System.debug('  Open opp: ' + o.Name + ' ($' + o.Amount + ')');
    }
}

for (Opportunity o : [SELECT Name, Account.Name, Account.Industry FROM Opportunity LIMIT 10]) {
    System.debug(o.Name + ' belongs to ' + o.Account.Name + ' (' + o.Account.Industry + ')');
}
```

Confirm both directions return sensible results against your org's sample
Accounts/Opportunities.

## Check yourself

What's the difference between the relationship name you use in a subquery
(like `Contacts`) and the field name you use with dot notation child-to-parent
(like `Account.Name`)? Why does a custom object's subquery relationship name
end in `__r` instead of `__c`?
