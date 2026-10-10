# Lesson 1 — Introduction to Apex and the Developer Console

**Chapter 1 · Apex Fundamentals · Lesson 1 of 43**

## What you'll learn

- What Apex is and where it runs
- How Apex differs from (and resembles) Java
- The Developer Console and its Execute Anonymous window
- How to read a debug log

## What is Apex?

Apex is Salesforce's own programming language. Salesforce's official definition is
direct about it:

> Apex is a strongly typed, object-oriented programming language that allows
> developers to execute flow and transaction control statements on the
> Salesforce Platform server, in conjunction with calls to the API.

Two words matter most here: **strongly typed** and **object-oriented**. Every
variable has a declared type that is checked when your code compiles, and
Apex code is organized into classes, much like Java. In fact, Salesforce
describes Apex as being "like Java for Salesforce" — the syntax will look
familiar if you've seen Java or C#, but Apex runs *on* the Salesforce
Lightning Platform, not on your own server. It has direct, built-in access to
your org's data and automatically enforces platform rules (you'll meet
governor limits in Chapter 4).

## Where Apex code runs

Apex only runs inside Salesforce. You don't install a compiler or a runtime —
you write Apex in classes and triggers that live in your org, or you type
one-off code directly into the Developer Console to test an idea without
saving anything.

## The Developer Console

The Developer Console is Salesforce's built-in IDE. Open it from Setup
(the gear icon → **Developer Console**). Inside it you can create classes
and triggers, view debug logs, and — most useful while you're learning —
run throwaway code instantly with **Execute Anonymous**.

## Execute Anonymous: running code without saving it

Salesforce calls this kind of code an **anonymous block**: Apex that is
compiled and executed but never stored as metadata in your org.

```apex
// Typed directly into the Execute Anonymous window
Integer total = 5 + 10;
System.debug('The total is: ' + total);
```

Open the Developer Console, go to **Debug → Open Execute Anonymous
Window**, paste code like this in, and click **Execute**. Nothing here gets
saved as a class — it's a scratchpad for trying out Apex syntax, which is
exactly why this course leans on it so heavily in early labs.

A couple of real constraints worth knowing up front:

- User-defined methods inside an anonymous block **cannot use the `static`
  keyword**.
- Anonymous blocks run as the current user, so they are still subject to
  your object- and field-level permissions.

## Debug logs

Every time you run Execute Anonymous, Salesforce automatically generates a
**debug log** — a line-by-line record of what happened, including the
output of any `System.debug()` calls. After clicking Execute, open
**Debug → View Log Panel** (or double-click the newest entry in Logs) to
see it. Look for lines tagged `USER_DEBUG` — that's where your own
`System.debug()` output shows up among the platform's own log lines.

## Key terms

| Term | Meaning |
|---|---|
| Apex | Salesforce's strongly typed, object-oriented programming language |
| Developer Console | Salesforce's built-in browser IDE for writing and debugging Apex |
| Anonymous block | Apex code that compiles and runs but is never saved as metadata |
| Execute Anonymous | The Developer Console window used to run an anonymous block |
| Debug log | The generated record of what happened during an Apex execution, including `System.debug()` output |
| `System.debug()` | Writes a message into the debug log |

## Lab

In a free Developer Edition org (or any sandbox/scratch org you have access
to):

1. Open **Setup → Developer Console**.
2. Go to **Debug → Open Execute Anonymous Window**.
3. Type and run:

```apex
String name = 'Apex';
Integer year = 2026;
System.debug('Hello from ' + name + ' in ' + year);
```

4. Open **Debug → View Log Panel**, double-click the log entry you just
   created, and find your message on a `USER_DEBUG` line.

## Check yourself

Without looking back: what makes an anonymous block "anonymous," and why
does an anonymous block's debug log always show at least one `USER_DEBUG`
line if your code calls `System.debug()`?
