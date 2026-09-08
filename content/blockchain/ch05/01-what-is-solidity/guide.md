# Lesson 1 — What Is Solidity? High-Level vs. Low-Level Languages

**Chapter 5 · Solidity Programming · Lesson 1 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine.

## What you'll learn

- What Solidity actually is, and why it's called "contract-oriented"
- The real difference between low-level and high-level programming languages
- The car-driving analogy the instructor used to make this concrete
- Which languages actually influenced Solidity's design

## Solidity: a high-level, contract-oriented language

**Solidity** is a high-level, contract-oriented programming language — "high
level" because it's written to be readable by humans, and "contract-oriented"
because its entire design centers on writing and deploying smart contracts.

Underneath every programming language, computers only understand **binary**
— ones and zeros. Between raw binary and the code a human actually types,
there's a real ladder of abstraction:

- **Low-level languages** (like assembly or C) — you're working close to
  the hardware, with full control but more room for error.
- **High-level languages** (like Python, JavaScript, or Solidity) — you
  trade some low-level control for speed of development and readability.

## The real analogy used in class

![The instructor's actual ChatGPT-generated analogy: low-level languages compared to building and tuning a car's engine yourself.](/courses/blockchain/ch05/01-what-is-solidity/shot_car_analogy.png)
*"Car Driving Analogy" — low-level languages like assembly or C mean building and tuning the engine yourself, manually adjusting pistons, spark plugs, and fuel flow.*

![The second half of the same real analogy: high-level languages compared to driving a car with a steering wheel and pedals, letting the engine handle the complexity.](/courses/blockchain/ch05/01-what-is-solidity/shot_high_level_analogy.png)
*High-level languages like Python or JavaScript: you're driving the car with a steering wheel and pedals, letting the engine handle the complex parts.*

With low-level languages, you have full control over exactly how the
machine works — harder and more error-prone, but more efficient, since
you're essentially programming directly for the hardware. With high-level
languages, you sacrifice some of that control for convenience and speed of
development — ideal for building applications quickly without worrying
about memory or CPU details.

## What actually influenced Solidity

Solidity wasn't designed in a vacuum — it borrows real ideas from
languages you may already recognize:

| Language | What it contributed |
|---|---|
| JavaScript | The programming language of the internet — Solidity borrows syntax conventions from it |
| Python | Used heavily for data science, machine learning, and AI — contributed readability influences |
| C++ | A statically typed, compiled language known for object-oriented patterns and low-level control |

## Why this matters going forward

Every one of these influences shows up later in this course: Solidity's
contract structure borrows from object-oriented languages like C++, while
its syntax often reads closer to JavaScript. Recognizing these
similarities will make the actual code, once you start writing it, feel
far less unfamiliar.

## Key terms

| Term | Meaning |
|---|---|
| High-level language | Code written to be readable by humans; more abstraction, less direct hardware control |
| Low-level language | Code close to the hardware; more control, more complexity |
| Contract-oriented language | A language designed specifically around writing and deploying smart contracts |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why a language like Solidity trades some raw performance for
readability — and why that trade-off makes sense for writing smart
contracts.
