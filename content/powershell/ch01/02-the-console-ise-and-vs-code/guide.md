# Lesson 2 — The Console, ISE & VS Code

**Chapter 1 · PowerShell Basics · Lesson 2 of 18**

## What you'll learn

- The three places you'll actually type or write PowerShell, and what each one is for
- Why the PowerShell ISE still shows up on servers but shouldn't be where you write anything new
- The honest, practical recommendation: VS Code with the PowerShell extension for anything beyond a one-liner
- How to open each one, so Lesson 3 can start using them immediately

## The PowerShell console: quick, interactive, disposable

The console (`powershell.exe` or, on newer systems, `pwsh.exe` for
PowerShell 7+) is the blue or black window you get by typing
`powershell` into the Start menu or a Run dialog. It's a
**read-eval-print loop** — you type a command, press Enter, and see
the result immediately. That immediacy is exactly what it's good for:
checking a service's status, listing files in a folder, running a
single cmdlet to answer a quick question. It is a bad place to write
anything longer than two or three lines, because there's no real
editing, no syntax highlighting, and nothing is saved when you close
the window.

## The PowerShell ISE: legacy, still installed, largely superseded

The **Integrated Scripting Environment** (ISE) was Microsoft's first
attempt at a real script editor for PowerShell — a split window with
a script pane on top and a console pane below. You'll still find it
preinstalled on older Windows Server boxes, and you may open someone
else's `.ps1` file in it because it's already there. But Microsoft
stopped actively developing it years ago, and it only ever supported
Windows PowerShell 5.1 — it can't run PowerShell 7+. Know it exists
and know how to open it (`powershell_ise.exe`), because you'll bump
into it on real servers, but don't build a habit around it.

## VS Code: the current real standard

**Visual Studio Code with the PowerShell extension** is what
Microsoft actively develops for and what most working admins and
engineers actually use to write scripts today. It gives you real
syntax highlighting, IntelliSense (autocomplete that knows cmdlet
names and parameters as you type), an integrated terminal that runs
the same console you already know, inline error squiggles before you
even run the script, and a debugger that can step through a script
line by line. None of that exists in the ISE.

## The honest recommendation

Use the **console** for a one-off command you'll never need again.
Use **VS Code** for anything you're going to save, rerun, hand to a
teammate, or come back to next week — which, realistically, is almost
everything from Chapter 3 onward. This course writes every `.ps1`
script in VS Code starting in Chapter 3, so if you haven't installed
it yet, install VS Code and search its Extensions panel for
"PowerShell" (the official Microsoft extension) before that chapter.

## Key terms

| Term | Meaning |
|---|---|
| Console | The interactive PowerShell prompt (`powershell.exe` / `pwsh.exe`) — type and run one command at a time |
| ISE | Integrated Scripting Environment — legacy built-in script editor, Windows PowerShell 5.1 only |
| VS Code | Microsoft's actively developed code editor; with the PowerShell extension, the real standard for writing scripts today |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
is the console the right tool for a quick one-liner but the wrong
tool for a script you'll reuse next month?
