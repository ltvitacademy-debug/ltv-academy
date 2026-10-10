# Lesson 19 — SOQL Injection and Bind Variables

**Chapter 4 · Advanced Queries and Optimization · Lesson 19 of 23**

## What you'll learn

- What SOQL injection actually is, using the vulnerable pattern from Lesson 18 as the example
- Why bind variables are the preferred defense, in both static and dynamic SOQL
- String.escapeSingleQuotes() as the documented fallback, and its real limits
- Other rules for what user input should never be allowed to control

## The vulnerability, concretely

Lesson 18 built a dynamic query by directly concatenating a string into the query text:

```apex
String queryStr = 'SELECT Id, Name FROM Account WHERE Industry = \'' + filterValue + '\'';
```

If `filterValue` comes from user input and a user enters `Technology' OR Name != ''` instead of a normal industry name, the resulting query text becomes:

```sql
SELECT Id, Name FROM Account WHERE Industry = 'Technology' OR Name != ''
```

That's no longer the narrow filter the developer intended — the attacker's input broke out of its intended string literal and added logic of its own. This is **SOQL injection**: letting attacker-controlled text change the *structure* of a query, not just the value being compared. It's conceptually identical to SQL injection, and it's a real, documented Salesforce security violation category, not a theoretical concern.

## Bind variables: the preferred fix

In **static** SOQL, a bind variable — a colon followed by an Apex variable name — passes the value as data, never as text spliced into the query:

```apex
String filterValue = userInput;
List<Account> accts = [SELECT Id, Name FROM Account WHERE Industry = :filterValue];
```

No matter what `userInput` contains, it's treated purely as a value being compared, never as additional query syntax — the injection above simply can't happen this way.

For **dynamic** SOQL, the equivalent protection is `Database.queryWithBinds`, which takes the query string (still with a colon-prefixed placeholder) plus a separate map of bind values:

```apex
String queryStr = 'SELECT Id, Name FROM Account WHERE Industry = :filterValue';
Map<String, Object> binds = new Map<String, Object>{ 'filterValue' => userInput };
List<SObject> results = Database.queryWithBinds(queryStr, binds, AccessLevel.USER_MODE);
```

Bind variables should be your default for any user-supplied value in a WHERE clause, static or dynamic — not a special-case defense you reach for only when something feels risky.

## The fallback: String.escapeSingleQuotes()

When a bind variable genuinely isn't an option, Salesforce's documented fallback is `String.escapeSingleQuotes()`, which escapes any single quote in a string with a backslash so it's treated as literal string content instead of ending the quoted literal early:

```apex
String safeValue = String.escapeSingleQuotes(userInput);
String queryStr = 'SELECT Id, Name FROM Account WHERE Industry = \'' + safeValue + '\'';
```

Salesforce's own guidance is explicit about this being a narrower, weaker fallback: use it only for simple string comparisons, combined with other validation, and understand that not every injection technique even requires a single quote character to work. Bind variables remain the stronger, preferred option whenever they're usable.

## What user input should never control directly

Beyond the WHERE clause's values, Salesforce's security guidance is blunt: never let user input directly supply object names, field names, or other structural parts of a query without validation. If a feature genuinely needs the user to pick which field to filter on (like Lesson 18's generic search example), validate that input against an explicit allow-list of real, permitted field names before it ever reaches the query string — never trust it as-is just because it happened to compile.

## Key terms

| Term | Meaning |
|---|---|
| SOQL injection | Letting attacker-controlled input change a query's structure, not just the value being compared |
| Bind variable | A colon-prefixed value passed as data, never spliced into query text — the preferred defense in static and dynamic SOQL |
| String.escapeSingleQuotes() | A documented fallback that escapes quote characters; weaker than bind variables, for simple cases only |

## Lab

Take the vulnerable dynamic query pattern from Lesson 18's lab and rewrite it two ways: once using `Database.queryWithBinds` for the filter value, and once validating the field name itself against a hardcoded allow-list of permitted fields before building the query string. Explain in a comment why each change closes a specific injection risk.

## Check yourself

Why does a bind variable prevent SOQL injection, when string concatenation of the same value does not? Why is String.escapeSingleQuotes() described as a fallback rather than a first-choice defense?
