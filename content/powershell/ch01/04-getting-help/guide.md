# Lesson 4 — Getting Help: Get-Help & Get-Command

**Chapter 1 · PowerShell Basics · Lesson 4 of 18**

## What you'll learn

- How `Get-Help <cmdlet> -Examples` gets you working syntax faster than a web search
- When to reach for `Get-Help <cmdlet> -Full` instead
- How `Get-Command -Verb Get -Noun *Process*` finds a cmdlet you don't even know the name of yet
- The real DBA skill this lesson is actually teaching: finding the right command instead of memorizing hundreds of them

## Get-Help: the built-in manual

Every cmdlet ships with its own help entry, and you don't need to
leave the console or your VS Code terminal to read it:

```
Get-Help Get-ChildItem
```

That gives you a short synopsis and syntax outline. Two switches
make it far more useful. `-Examples` is usually the fastest path to
working code:

```
Get-Help Get-ChildItem -Examples
```

This prints several real, runnable examples straight from
Microsoft's documentation — often faster than searching the web,
since it's already on the machine and already matches the exact
version of PowerShell installed there. When examples aren't enough
and you need every parameter, its type, and whether it's mandatory,
use `-Full`:

```
Get-Help Get-ChildItem -Full
```

The first time you run `Get-Help` on a fresh machine, PowerShell may
tell you help files aren't installed yet and prompt you to run
`Update-Help` (which needs internet access and admin rights). Do that
once per machine and you're set.

## Get-Command: finding a cmdlet you don't know the name of

`Get-Help` assumes you already know which cmdlet you want. Often you
don't — you know what you're trying to do, not what it's called.
That's what `Get-Command` is for. Combined with the approved-verb
list from Lesson 3, you can search by verb, by noun, or both:

```
Get-Command -Verb Get -Noun *Process*
```

This lists every installed cmdlet that starts with `Get-` and has
"Process" somewhere in its noun — which surfaces `Get-Process`
immediately, even if you'd never have guessed that exact name. You
can search more broadly too:

```
Get-Command -Verb Stop
```

lists every cmdlet on the machine that can stop something, which is
a genuinely fast way to find `Stop-Service` if you'd forgotten it
existed.

## The real skill: finding, not memorizing

This is the actual point of the lesson, and it's worth saying
directly: nobody memorizes hundreds of cmdlets, and nobody is
expected to. A DBA who's comfortable with `Get-Help` and
`Get-Command` can sit down at an unfamiliar server, running a
PowerShell version they've never used, and still find the right
command for the job in under a minute — because the discovery tools
are built into every install and don't depend on the internet being
reachable. That's a far more durable skill than knowing today's
list of cmdlet names by heart.

## Key terms

| Term | Meaning |
|---|---|
| `Get-Help -Examples` | Prints runnable example usages for a cmdlet |
| `Get-Help -Full` | Prints complete parameter documentation for a cmdlet |
| `Get-Command` | Searches installed cmdlets by verb, noun, or both |
| `Update-Help` | Downloads the full local help files (run once per machine, needs admin + internet) |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: if
you needed to find a cmdlet that creates a new scheduled task but
didn't know its exact name, which `Get-Command` call would you try
first, and why?
