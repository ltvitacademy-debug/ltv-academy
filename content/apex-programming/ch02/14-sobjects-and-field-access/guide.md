# Lesson 14 — SObjects and Field Access

**Chapter 2 · Working with Data in Apex · Lesson 14 of 43**

## What you'll learn

- The generic `SObject` type and how it differs from a typed sObject like `Account`
- Reading and writing fields dynamically with `get()` and `put()`
- Casting a generic `SObject` to a specific type to use normal dot notation
- Getting a record's type at runtime with `getSObjectType()`
- A first look at `Schema` describe information

## Typed sObjects vs. the generic SObject

Every Salesforce object you've used so far — `Account`, `Contact`,
`Opportunity` — is a specific **sObject type**. Apex also has a generic
`SObject` type that can hold a record of *any* object, standard or custom,
without knowing which one at compile time:

```apex
SObject genericRecord = [SELECT Id, Name FROM Account LIMIT 1];
```

With a typed variable, you read and write fields with ordinary dot notation
(`acct.Name = 'New Name';`). A generic `SObject` variable doesn't expose
dot notation for object-specific fields, because the compiler doesn't know
what fields that type has. Instead, you access fields dynamically.

## get() and put()

The `SObject` class exposes `get(fieldName)` to read a field's value and
`put(fieldName, value)` to write one, both keyed by the field's API name as
a `String`:

```apex
SObject rec = [SELECT Id, Name, Industry FROM Account LIMIT 1];

Object nameValue = rec.get('Name');
System.debug('Name is: ' + nameValue);

rec.put('Industry', 'Technology');
update rec;
```

Because `get()` returns the generic `Object` type, you typically cast it to
the type you expect (`String`, `Decimal`, `Date`, and so on) before using it:

```apex
String industry = (String) rec.get('Industry');
```

This dynamic pattern is what makes it possible to write one block of Apex
that works against *any* sObject type passed into it — for example, a
reusable utility method that takes `SObject` as a parameter and works the
same whether it's handed an `Account` or a `Case`.

## Casting back to a specific type

If you know the underlying type and want normal dot notation back, cast the
generic `SObject` to its specific type:

```apex
SObject generic = [SELECT Id, Name FROM Account LIMIT 1];
Account acct = (Account) generic;
System.debug(acct.Name); // dot notation works again
```

## Finding the type at runtime

When code genuinely doesn't know in advance what kind of record it's
holding — for example, inside a generic trigger-handler utility — you can
ask the record for its own type:

```apex
SObject rec = [SELECT Id FROM Contact LIMIT 1];
Schema.SObjectType objType = rec.getSObjectType();
System.debug('This record is a: ' + objType);
```

`Schema.SObjectType` is the entry point into Apex's describe system: calling
`.getDescribe()` on it returns metadata about the object itself (its label,
whether it's queryable, its fields, and more) — useful for building code
that adapts to an object's actual schema rather than assuming field names
exist. Describe information is covered in more depth once we reach dynamic
Apex later in the course.

## When to reach for this

Most everyday Apex — triggers and classes written for one specific object —
uses typed sObjects and ordinary dot notation. Reach for the generic
`SObject` type, `get()`/`put()`, and `getSObjectType()` when you're writing
something genuinely object-agnostic: a logging utility, a generic
field-copy helper, or code driven by configuration rather than a hardcoded
object name.

## Key terms

| Term | Meaning |
|---|---|
| `SObject` | The generic sObject type that can represent a record of any object |
| `get(fieldName)` | Reads a field's value dynamically by API name, returning `Object` |
| `put(fieldName, value)` | Writes a field's value dynamically by API name |
| `getSObjectType()` | Returns the `Schema.SObjectType` describing a record's actual object type |

## Lab

In Execute Anonymous, using the Account object:

```apex
SObject rec = [SELECT Id, Name, Industry FROM Account LIMIT 1];

System.debug('Current name: ' + rec.get('Name'));
rec.put('Industry', 'Apparel');
update rec;

Account typed = (Account) rec;
System.debug('Back to typed access: ' + typed.Industry);

System.debug('Object type: ' + rec.getSObjectType());
```

Confirm the debug log shows the original name, the Industry value you set,
and the correct object type.

## Check yourself

Why can't you write `genericRecord.Industry = 'Technology';` directly on a
variable declared as `SObject`? What do you have to do first to use ordinary
dot notation on it again?
