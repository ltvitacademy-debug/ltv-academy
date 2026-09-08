# Lesson 2 — Command Line Basics: npm, git & the Terminal

**Chapter 7 · Testing & Tooling (Foundry) · Lesson 2 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, using the real macOS Terminal (the same commands work in Windows Command Prompt).

## What you'll learn

- How to check whether Node.js and npm are actually installed
- How to install git and verify it worked
- The real commands to download a project and navigate into it
- Why every professional Solidity workflow eventually leaves the browser

## Terminal and Command Prompt are the same idea

Real, direct quote: *"Terminal and command prompt are the same thing,
just on different devices."* Terminal is macOS's version; Command
Prompt (or PowerShell) is Windows's. Everything in this lesson works
the same on either.

## Checking your setup

![The real terminal output from class: `npm -v` returning a version number, then installing git with `npm install git`.](/courses/blockchain/ch07/02-terminal-git-npm/shot_npm_version_check.png)
*A real, live version check — if a number comes back, npm is already installed.*

```bash
npm -v
```

If this returns a real version number (the instructor's own machine
returned `10.7.0`), **npm is already installed**. Node.js and npm come
bundled together from the same download at nodejs.org — if you don't
have either, that's the one place to get both.

## Installing and verifying git

```bash
npm install git
```

Afterward, typing just `git` by itself and seeing a real list of
commands is your confirmation that git installed successfully.

## Cloning a real repository and navigating into it

![Real terminal output: `git clone` downloading a repository, then `cd LTV...` navigating into it.](/courses/blockchain/ch07/02-terminal-git-npm/shot_git_clone_cd.png)
*The exact real commands that get a project from GitHub onto your own machine, ready to work with.*

```bash
git clone <repository-URL>
cd LTV-Blockchain-Course
ls
```

- **`git clone`** followed by a repository's real URL downloads the
  entire project to your computer.
- **`cd`** (change directory) — this is the real, textual equivalent of
  double-clicking into a folder. You can even press **Tab** to
  autocomplete a folder name as you type it.
- **`ls`** (list) — shows every file in your current folder, the same
  information you'd see by opening the folder visually.

## Why this actually matters

Every tool covered later in this chapter and the ones after it —
Foundry, Hardhat, deployment scripts — runs from exactly this same
terminal. Getting comfortable typing real commands instead of clicking
through Remix's browser interface is a genuine, necessary step toward
professional Solidity development.

## Key terms

| Term | Meaning |
|---|---|
| Terminal / Command Prompt | The real text-based interface for running commands on your computer |
| npm | Node's package manager — installs tools like git |
| git clone | Downloads a complete copy of a real repository to your machine |
| cd | Changes your current directory — the textual way to navigate folders |

## Check yourself

You've finished this lesson when you can explain, in your own words,
what `cd` actually does, and why it's described as the textual
equivalent of clicking into a folder.
