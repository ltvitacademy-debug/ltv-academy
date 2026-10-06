# Lesson 2 — Setting Up Your Dev Environment

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 2 of 39**

## What you'll learn

- What Node.js is, and why you need it installed even though JavaScript already runs in your browser
- How to download and install Node.js on Windows, step by step
- How to confirm the install actually worked using the terminal
- Why VS Code (not Notepad, not the browser console) is where you'll write every script in this course

## Why you need Node.js at all

Your browser already runs JavaScript — that's how every website's buttons
and animations work. But this course isn't just writing code that lives
inside a web page; later chapters write standalone scripts, read files,
install packages, and eventually talk to a live blockchain from the command
line. None of that works inside a browser tab. **Node.js** is a JavaScript
runtime that runs JavaScript outside the browser — on your own machine, as
a real program you launch from a terminal. Every blockchain deploy script,
every indexing bot, every `npm install` in this entire course depends on it
being installed first.

## Installing Node.js on Windows

1. Go to [nodejs.org](https://nodejs.org) — it detects your OS and offers a Windows x64 download, with an **LTS** (Long-Term Support) button and a **Current** button. Always pick **LTS** for this course; it's the stable, recommended version, not the bleeding-edge one.
2. Run the downloaded `.msi` installer. The Node.js Setup Wizard opens with a simple welcome screen — click Next through the default options (the defaults are correct for this course; there's no reason to change the install location or deselect npm).
3. Finish the wizard. The installer adds both `node` and `npm` (Node's package manager, covered in Chapter 6) to your system automatically.

## Confirming it worked

Open a terminal — PowerShell, Command Prompt, or (once it's installed) VS
Code's own integrated terminal — and run two commands:

```
node -v
npm -v
```

If Node.js installed correctly, you'll see a version number printed back for
each one, like `v16.14.0` and `8.3.1`. If you instead get "node is not
recognized," the installer didn't finish, or your terminal was opened
before the install completed — close it and open a fresh one.

## Installing VS Code

Visual Studio Code is a free, official Microsoft code editor, and it's what
every lesson in this course assumes you're using. Download it from
[code.visualstudio.com](https://code.visualstudio.com), install it with the
defaults, then open it and use **View → Terminal** (or the built-in terminal
panel) to run commands without leaving the editor — the same `node -v` you
just ran in PowerShell works identically inside VS Code's terminal.

## Key terms

| Term | Meaning |
|---|---|
| Node.js | A JavaScript runtime that runs JS outside the browser, as a standalone program |
| npm | Node's package manager, installed automatically alongside Node.js |
| LTS | "Long-Term Support" — the stable, recommended release channel |

## Check yourself

You're ready for Lesson 3 when `node -v` and `npm -v` both print a version
number in your terminal, and you can open and run a command inside VS
Code's own integrated terminal.
