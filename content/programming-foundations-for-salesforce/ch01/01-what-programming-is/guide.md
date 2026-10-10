# Lesson 1 — What Programming Is

**Chapter 1 · Programming Concepts · Lesson 1 of 18**

## What you'll learn

- What "programming" actually means, stripped of hype
- The difference between an algorithm and the code that expresses it
- Why this course teaches ideas in Apex-flavored examples instead of a general-purpose language
- The three ingredients every program is built from: data, instructions, and order

## Programming is giving precise instructions

A computer does exactly what it's told, and nothing more. **Programming** is the act of writing a precise, unambiguous sequence of instructions that tells a computer what to do with some data, step by step. The computer brings no judgment, no context, and no ability to guess what you "probably meant." If an instruction is missing or ambiguous, the program either fails outright or does the wrong thing silently — which is worse. Learning to program is really learning to think with that level of precision, then translating that thinking into a language a computer can execute.

This is the single biggest adjustment for someone new to programming: in ordinary conversation, people fill in gaps for each other constantly. A computer fills in nothing. "Give the customer a discount if they're a loyal customer" means nothing to a computer until you define, exactly, what "loyal" means (five purchases? two years as a customer?) and exactly what "discount" means (10% off? $5 off?). Programming is the skill of turning a vague human intention into a sequence of steps with no gaps left for the computer to guess at.

## An algorithm vs. the code

An **algorithm** is the step-by-step logic for solving a problem, independent of any particular programming language — you could write one on a whiteboard, in plain English, or as a flowchart. **Code** is that same logic written in a specific language's exact syntax so a computer can actually run it. You could describe the same algorithm — "find the largest number in a list" — in English, in pseudocode, or in real code, and the underlying logic wouldn't change; only the notation would. Separating these two ideas matters because most of the real thinking in programming happens at the algorithm level, before a single line of syntax gets typed. Programmers who skip straight to typing code, without first working out the algorithm, tend to produce code that technically runs but solves the wrong problem.

## Why this course uses Apex-flavored examples

This course is a deliberate primer: it teaches general programming concepts — variables, data types, conditions, loops, functions, basic object-oriented thinking — the same ideas that exist in every mainstream programming language. The examples throughout, though, are written in **Apex**, Salesforce's own programming language, because that's the language this entire Salesforce Technical Architect path builds toward. You won't need a Salesforce org to follow these first eighteen lessons; what you need is to get comfortable with how code *looks* and *thinks* in an Apex-shaped, curly-brace, strongly-typed language, so that a dedicated Apex course later in this path isn't also your first exposure to programming itself.

## The three ingredients of every program

Nearly everything a program does can be broken into three ingredients, which the rest of this chapter covers one at a time:

- **Data** — the values a program works with (a customer's name, an order total, a true/false flag).
- **Instructions** — the individual operations a program performs on that data (add two numbers, compare two values, print a message).
- **Order** — the sequence those instructions run in, including which ones repeat and which ones only run under certain conditions.

Every program you will ever read or write, no matter how large, is built from combinations of just these three things.

## Key terms

| Term | Meaning |
|---|---|
| Programming | Writing precise, unambiguous instructions that tell a computer what to do with data |
| Algorithm | The step-by-step logic for solving a problem, independent of any specific language |
| Code | An algorithm expressed in a specific programming language's syntax |
| Apex | Salesforce's own programming language, used for the examples in this course |
| Pseudocode | Informal, language-independent notation for describing an algorithm's logic |

## Lab

Pick an everyday task you do without thinking — making a cup of coffee, or checking out at a grocery store self-checkout. Write it out as a numbered list of steps precise enough that someone who has never done the task could follow it with zero guessing. Then find at least two places in your list where you quietly assumed something a computer couldn't assume (for example, "add milk" assumes the reader knows how much, and from where). Rewrite those two steps to remove the ambiguity.

## Check yourself

Can you explain, in your own words, why a computer "doing exactly what it's told, and nothing more" is the reason precision matters so much in programming? Can you describe the difference between an algorithm and code without using the word "language" in your definition of algorithm?
