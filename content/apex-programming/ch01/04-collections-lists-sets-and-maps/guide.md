# Lesson 4 — Collections: Lists, Sets, and Maps

**Chapter 1 · Apex Fundamentals · Lesson 4 of 43**

## What you'll learn

- `List<T>`: an ordered collection, indexed from 0, that allows duplicates
- `Set<T>`: an unordered collection with no duplicates
- `Map<K,V>`: key-value pairs where each unique key maps to one value
- The core methods you'll reach for on each: `add`, `get`, `put`, `size`, `containsKey`, `keySet`

## Lists

A list is an ordered collection of elements distinguished by their
indices. The index of the first element is always `0`.

```apex
List<String> colors = new List<String>();
colors.add('Red');
colors.add('Orange');
colors.add('Red'); // duplicates are allowed

Integer total = colors.size();     // 3
String first = colors.get(0);      // 'Red'
colors.set(0, 'Crimson');          // replace index 0
colors.clear();                    // remove everything
```

You can also populate a list at declaration time with curly-brace syntax:

```apex
List<Integer> scores = new List<Integer>{90, 85, 77};
```

## Sets

A set is an unordered collection of elements that contains no duplicates.
You cannot access a set element by index — you can only iterate over it or
check membership.

```apex
Set<String> cities = new Set<String>();
cities.add('Austin');
cities.add('Austin'); // ignored -- already present

System.assert(cities.contains('Austin')); // true
cities.remove('Austin');
System.debug(cities.size()); // 0
```

Sets are useful whenever you care about *whether* something exists, not
how many times or in what order — a classic example later in this course
is collecting a set of unique Ids before querying related records.

## Maps

A map holds key-value pairs where each unique key maps to a single value.
Declare one with the `Map` keyword, followed by the key and value types
inside `<>`:

```apex
Map<Integer, String> entries = new Map<Integer, String>();
entries.put(1, 'First entry');
entries.put(2, 'Second entry');

System.assert(entries.containsKey(1));      // true
String value = entries.get(2);              // 'Second entry'
Set<Integer> allKeys = entries.keySet();     // {1, 2}
```

You can also populate a map at declaration using `=>` between key and
value:

```apex
Map<String, String> currencies = new Map<String, String>{
    'United States' => 'Dollar',
    'Japan' => 'Yen'
};
```

A few behaviors worth knowing: adding an entry whose key already exists
**overwrites** the old value, map keys can be `null`, and Map keys of type
`String` are **case-sensitive** — `'Red'` and `'red'` are two distinct
keys.

## Choosing between them

- Need order, and might have duplicates? Use a **List**.
- Only care whether something exists, with no duplicates? Use a **Set**.
- Need to look something up by a unique key? Use a **Map**.

## Key terms

| Term | Meaning |
|---|---|
| `List<T>` | An ordered collection, indexed from 0, that allows duplicate elements |
| `Set<T>` | An unordered collection with no duplicate elements |
| `Map<K,V>` | A collection of key-value pairs where each key maps to exactly one value |
| `keySet()` | Returns a `Set` containing every key currently in a map |
| `containsKey()` | Checks whether a map already has a given key |

## Lab

In Execute Anonymous:

```apex
List<String> names = new List<String>{'Ana', 'Beto', 'Chloe'};
Set<String> uniqueNames = new Set<String>(names);
Map<String, Integer> nameLengths = new Map<String, Integer>();

for (String n : names) {
    nameLengths.put(n, n.length());
}

System.debug('List size: ' + names.size());
System.debug('Set size: ' + uniqueNames.size());
System.debug('Map keys: ' + nameLengths.keySet());
System.debug('Length of Beto: ' + nameLengths.get('Beto'));
```

Add a duplicate name to the `names` list and re-run it — confirm the
list's size grows but the set's size doesn't.

## Check yourself

Why can't you retrieve an element from a `Set` by index the way you can
from a `List`, and what happens if you `put()` a value into a `Map` using
a key that's already there?
