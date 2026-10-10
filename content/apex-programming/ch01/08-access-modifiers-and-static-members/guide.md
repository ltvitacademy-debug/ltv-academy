# Lesson 8 — Access Modifiers and Static Members

**Chapter 1 · Apex Fundamentals · Lesson 8 of 43**

## What you'll learn

- The four access modifiers: `private`, `protected`, `public`, `global`
- Why `public` in Apex is not the same thing as `public` in Java
- Static vs. instance methods and variables
- How to reference a static member correctly, through the class name

## Access modifiers

Apex methods and variables can use four access modifiers:

```apex
private String s1 = '1';     // default if you write nothing

public String getSz() {
    return s1;
}
```

| Modifier | Visibility |
|---|---|
| `private` | The default. Visible only within the Apex class where it's defined. |
| `protected` | Visible to inner classes of the defining class, and to classes that extend it. Only valid on instance methods/variables. |
| `public` | Visible to all Apex within the same application namespace. |
| `global` | Visible to any Apex code anywhere that has access to the class. If a method or inner class is `global`, the outer class must be `global` too. |

If you don't write a modifier at all, the member defaults to `private`.

One genuinely important gotcha: **`public` in Apex does not mean the same
thing as `public` in Java.** Salesforce deliberately scoped it down to
discourage applications from reaching into each other's code — if you want
"public like Java" visibility, you need `global` instead. Salesforce's own
guidance is to use `global` rarely, since cross-application dependencies
are hard to maintain.

## Static vs. instance members

An **instance** member belongs to a specific object — every object you
create from the class gets its own copy:

```apex
public class Counter {
    public Integer count = 0; // instance variable -- one per object

    public void increment() {
        count++;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();
System.debug(c1.count); // 1
System.debug(c2.count); // 0 -- c2 has its own separate count
```

A **static** member belongs to the class itself, not to any one object.
All instances share a single copy:

```apex
public class RunTracker {
    public static Integer totalRuns = 0;

    public RunTracker() {
        totalRuns++;
    }
}

RunTracker r1 = new RunTracker();
RunTracker r2 = new RunTracker();
System.debug(RunTracker.totalRuns); // 2
```

## Referencing static members correctly

Static members are accessed **through the class name**, never through an
instance. Trying to reach a static member off an object reference is
flatly illegal:

```apex
RunTracker r1 = new RunTracker();
// r1.totalRuns is NOT a legal expression
System.debug(RunTracker.totalRuns); // correct
```

Static methods follow the same rule, and because a static method is only
associated with the class, it can never access instance (non-static)
member variables — it has no object to read them from.

## Static and the current transaction

A static variable's value persists only for the duration of the current
Apex transaction — it is reset between transactions, not shared across
the whole org. This matters a lot once you reach triggers: a static
"already ran once" flag defined in a class can survive across multiple
trigger invocations within the same transaction, which is exactly how
developers guard against recursive triggers later in this course.

## Key terms

| Term | Meaning |
|---|---|
| `private` | Default visibility; accessible only inside the defining class |
| `protected` | Visible to inner classes and subclasses; instance members only |
| `public` | Visible across the same application namespace (not the same as Java's `public`) |
| `global` | Visible to any Apex code with access to the class |
| Static member | Belongs to the class itself; one shared copy across all instances |
| Instance member | Belongs to a specific object; each instance has its own copy |

## Lab

In the Developer Console, save this class:

```apex
public class VisitCounter {
    public static Integer totalVisits = 0;
    public Integer thisVisitorId;

    public VisitCounter(Integer visitorId) {
        thisVisitorId = visitorId;
        totalVisits++;
    }
}
```

Then run in Execute Anonymous:

```apex
VisitCounter v1 = new VisitCounter(1);
VisitCounter v2 = new VisitCounter(2);

System.debug('Total visits: ' + VisitCounter.totalVisits); // 2
System.debug('v1 visitor id: ' + v1.thisVisitorId);         // 1
System.debug('v2 visitor id: ' + v2.thisVisitorId);         // 2
```

## Check yourself

Why is `public` in Apex considered more restrictive than `public` in
Java, and why is `myInstance.totalVisits` not a legal way to read a static
variable?
