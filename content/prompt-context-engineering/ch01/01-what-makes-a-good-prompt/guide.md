# Lesson 1 — What Makes a Good Prompt

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 1 of 24**

## What you'll learn

- The four ingredients every strong prompt has: Task, Context, Format, Constraints
- Why a vague prompt forces the model to guess — and why that guess is usually wrong
- How to rewrite a one-line request into a prompt that gets a usable answer on the first try
- A reusable before/after pattern you can apply to any prompt you write from here on

## A prompt is a specification, not a suggestion

A large language model has no access to what's in your head — the deadline you're
under, the audience you're writing for, the format your editor expects. Every
one of those things has to show up in the text of the prompt itself, or the
model fills the gap with its own default assumption. A "good" prompt isn't
one that sounds polite or clever; it's one that leaves the model nothing to
guess about.

```
Vague prompt:                         Specific prompt:
"Write about dogs."                   "Write a 150-word blog intro for a
                                       pet-adoption nonprofit's newsletter,
                                       aimed at first-time dog owners. Warm,
                                       encouraging tone. End with a call to
                                       action to visit the shelter this
                                       Saturday."
```

Both prompts are grammatically fine. Only one of them tells the model what
"about dogs" is supposed to accomplish.

## The four ingredients

| Ingredient | Question it answers | Missing it looks like |
|---|---|---|
| **Task** | What exact action and deliverable do you want? | "Help me with this" |
| **Context** | Who is this for, and what situation is it in? | No audience, no purpose given |
| **Format** | What shape should the output take — length, structure, medium? | A paragraph when you needed a table |
| **Constraints** | What tone, scope, or things-to-avoid matter? | The model picks a tone for you |

A prompt doesn't need all four spelled out in separate sentences — a single
well-written paragraph can carry all four at once, the way the "specific
prompt" above does. The test is whether a stranger reading only the prompt,
with no other context, could produce roughly the output you want.

## A second example: debugging code

```
Vague:                                 Specific:
"Fix this code."                       "This Python function raises a
                                        KeyError when the dict is missing
                                        'email'. Add a check that returns
                                        None instead of raising, and explain
                                        the fix in one sentence."
```

The vague version forces the model to guess what "fix" means — silence the
error? Add logging? Rewrite the whole function? The specific version removes
every one of those guesses.

## Key terms

| Term | Meaning |
|---|---|
| Prompt engineering | Deliberately designing the text sent to a model to get a reliable, usable output |
| Task | The concrete action and deliverable the prompt asks for |
| Context | The situational information the model needs but can't infer |
| Constraint | A boundary on tone, scope, length, or content the output must respect |

## Lab

Take a one-line request you've actually typed into an AI tool before (or
write one now, as vague as you like). Rewrite it using the four ingredients
above — Task, Context, Format, Constraints — so that a stranger with no
other context could produce the output you actually wanted.

## Check yourself

You're ready for Lesson 2 when you can name all four ingredients of a strong
prompt without looking, and explain why a vague prompt doesn't just risk a
*wrong* answer — it risks the model silently picking the wrong *job*.
