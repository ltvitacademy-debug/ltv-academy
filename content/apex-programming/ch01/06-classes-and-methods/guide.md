# Lesson 6 — Classes and Methods

**Chapter 1 · Apex Fundamentals · Lesson 6 of 43**

## What you'll learn

- The exact syntax for defining an Apex class
- How to define methods: parameters, return types, and calling them
- Constructors, including overloaded constructors and constructor chaining
- How `new` instantiates an object from a class

## Defining a class

Salesforce's reference syntax for a top-level class looks like this:

```text
private | public | global
[virtual | abstract | with sharing | without sharing]
class ClassName [implements InterfaceNameList] [extends ClassName]
{
    // the body of the class
}
```

A top-level class **must** declare an access modifier (`public` or
`global` are what you'll use most). A minimal, real example:

```apex
public class Invoice {
    public Decimal amount;

    public Decimal getAmountWithTax(Decimal taxRate) {
        return amount * (1 + taxRate);
    }
}
```

## Methods: parameters and return types

A method declares its return type, its name, and a parameter list — use
`void` if it returns nothing:

```apex
public class MathHelper {
    public Integer addNumbers(Integer a, Integer b) {
        return a + b;
    }

    public void logMessage(String message) {
        System.debug(message);
    }
}
```

Call a method on an instance using dot notation:

```apex
MathHelper helper = new MathHelper();
Integer sum = helper.addNumbers(4, 7); // 11
helper.logMessage('Done calculating.');
```

## Constructors

A constructor runs when you create an object from a class using `new`. If
you don't write one, Apex gives you a default, no-argument public
constructor automatically — but the moment you write *any* constructor,
that default disappears and you must define your own no-argument one if
you still want it.

```apex
public class TestObject {
    public TestObject() {
        // runs whenever new TestObject() is called
    }
}

TestObject myTest = new TestObject();
```

A constructor never declares a return type, and it isn't inherited.

## Overloaded constructors and constructor chaining

Apex allows multiple constructors for the same class, as long as each has
a different parameter list — this is called overloading. One constructor
can call another using `this(...)`, known as constructor chaining:

```apex
public class TestObject2 {
    private static final Integer DEFAULT_SIZE = 10;
    Integer size;

    // No-argument constructor
    public TestObject2() {
        this(DEFAULT_SIZE); // calls the one-argument constructor below
    }

    // One-argument constructor
    public TestObject2(Integer objectSize) {
        size = objectSize;
    }
}

TestObject2 a = new TestObject2();   // size ends up 10
TestObject2 b = new TestObject2(42); // size ends up 42
```

## Key terms

| Term | Meaning |
|---|---|
| Class | A blueprint for objects, defined with an access modifier and the `class` keyword |
| Method | A named block of code with a return type and a parameter list |
| Constructor | Code that runs when an object is instantiated with `new`; never has a return type |
| Overloading | Defining multiple methods/constructors with the same name but different parameter lists |
| Constructor chaining | One constructor calling another using `this(...)` |
| `new` | The keyword used to instantiate an object from a class |

## Lab

In the Developer Console, create a new Apex class called `GreetingHelper`:

```apex
public class GreetingHelper {
    public String name;

    public GreetingHelper() {
        this('Trailblazer');
    }

    public GreetingHelper(String name) {
        this.name = name;
    }

    public String buildGreeting() {
        return 'Hello, ' + name + '!';
    }
}
```

Save it, then run this in Execute Anonymous:

```apex
GreetingHelper g1 = new GreetingHelper();
GreetingHelper g2 = new GreetingHelper('Ana');
System.debug(g1.buildGreeting());
System.debug(g2.buildGreeting());
```

## Check yourself

What happens to Apex's default no-argument constructor the moment you
write your own constructor for a class, and what keyword lets one
constructor call another?
