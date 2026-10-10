# Lesson 2 — How Software Runs

**Chapter 1 · Programming Concepts · Lesson 2 of 18**

## What you'll learn

- The difference between source code, compiling, and execution
- What it means for a language to be "compiled" vs. "interpreted," and where Apex fits
- What actually happens, in order, when a piece of code runs
- Why understanding this sequence helps you make sense of error messages later in this course

## From text file to running program

The code a developer writes is just a text file — readable words and symbols, nothing a computer's processor can act on directly. Getting from that text file to a running program takes at least one translation step. Different languages handle that translation differently, but the goal is always the same: turn human-readable source code into something a machine can actually execute.

**Compiled** languages translate the entire program into a lower-level form before anything runs — the compiler reads the whole file, checks it for structural correctness, and produces something executable (or rejects the file with errors if the structure is broken). **Interpreted** languages instead translate and run code line by line, as it goes, with no separate translation pass beforehand. Each approach has trade-offs: compiling catches a whole class of mistakes before execution ever starts, while interpreting can be more flexible for quick, exploratory code.

Apex is a compiled language: Salesforce's platform compiles your Apex code before it ever runs, checking it for structural errors first. This is exactly why, as you'll see in Chapter 2's lesson on errors, Apex gives you compile-time errors (caught before execution, like a misspelled keyword or a missing semicolon) as a distinct category from runtime errors (which only show up once the code is actually running, like dividing by zero).

## What "running" a program actually does

Once code is compiled, running it means the computer executes its instructions one at a time, in order — reading each instruction, carrying out whatever it says, and moving to the next. This sounds almost too simple to matter, but it's the foundation for everything the rest of this chapter builds on. A line like:

```apex
Integer total = 10 + 5;
System.debug(total);
```

executes in exactly two steps, in exactly this order: first, the expression `10 + 5` is evaluated and the result is stored in a new variable called `total`; second, that stored value is handed to `System.debug`, which outputs it. Nothing happens out of order, and nothing happens that isn't explicitly written. If you swapped the two lines, the second line would fail, because `total` wouldn't exist yet when `System.debug` tried to use it.

## A program is a sequence, until it isn't

Left entirely alone, a program just runs top to bottom, one instruction after another — this is called **sequential execution**. But very few useful programs are only sequential from start to finish. Two mechanisms break the strict top-to-bottom order, and both get full lessons later in this chapter:

- **Control flow** (Lessons 5 and 6) lets a program skip some instructions, repeat others, or choose between alternatives, based on conditions evaluated while the program runs.
- **Functions** (Lesson 7) let a program jump to a separate block of instructions, run it, and jump back to where it left off.

Both of these still execute strictly in order underneath — a computer never does two things at once within a single thread of execution — they just give the programmer tools to control *which* instructions run next, rather than always running the very next line.

## Why this matters for reading error messages

Knowing that compiling happens before running explains something that confuses a lot of beginners: a compile-time error (like a typo in a keyword) stops the entire program from running at all, even the parts that had nothing wrong with them, because the whole file failed its structural check before execution ever began. A runtime error, by contrast, only happens once execution actually reaches the broken line — which is why a program can run successfully for a while and then fail partway through. Chapter 2's lesson on errors and exceptions builds directly on this distinction.

## Key terms

| Term | Meaning |
|---|---|
| Source code | The human-readable text a developer writes |
| Compiled language | A language translated into executable form entirely before anything runs, with structural errors caught up front |
| Interpreted language | A language translated and run line by line, with no separate upfront translation pass |
| Sequential execution | A program's default behavior of running instructions one after another, top to bottom |
| Compile-time error | An error caught during translation, before the program ever starts running |
| Runtime error | An error that only occurs once execution actually reaches the broken instruction |

## Lab

Without running any code, trace through this short piece of Apex by hand, line by line, writing down what value each variable holds after each line executes:

```apex
Integer a = 4;
Integer b = a + 6;
a = b - 1;
System.debug(a);
```

Write down the final value `System.debug` would output, and explain in one sentence why the order of the lines matters to get that answer.

## Check yourself

Can you explain, without looking back at this lesson, the difference between a compile-time error and a runtime error, and why that difference exists? Can you say which category Apex falls into — compiled or interpreted — and what that means for when structural mistakes get caught?
