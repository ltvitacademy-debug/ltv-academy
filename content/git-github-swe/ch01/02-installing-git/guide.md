# Lesson 2 — Installing Git & Your First Repository

**Chapter 1 · Git Fundamentals · Lesson 2 of 22**

## What you'll learn

- Installing Git on Windows, macOS, and Linux
- Confirming the install and checking your version
- The one-time identity setup every machine needs: `user.name` and `user.email`
- Where the config actually lives, and how to change it later

## Installing Git

Git installs differently depending on your operating system, but the result
is the same everywhere: a `git` command available in your terminal.

**Windows** — download the installer from
[git-scm.com/download/win](https://git-scm.com/download/win). The default
options are fine for almost everyone; the installer also adds **Git Bash**,
a Unix-style terminal, which most of this course's examples assume.

**macOS** — if you have Homebrew:

```bash
brew install git
```

Otherwise, running `git --version` in Terminal for the first time prompts
macOS to install Apple's Command Line Tools, which include Git.

**Linux** — use your distribution's package manager:

```bash
sudo apt install git      # Debian / Ubuntu
sudo dnf install git      # Fedora
```

## Confirming the install

Whichever platform you're on, confirm it worked the same way:

```bash
git --version
```

```
git version 2.43.0
```

Any 2.x version is fine for this course. If the command isn't found, the
most common cause is that your terminal was opened before the install
finished — close it and open a new one.

## One-time setup: your identity

Before your first commit, Git needs to know who you are — this is what gets
attached to every commit you make, and it's what Lesson 3 will show printed
alongside each snapshot:

```bash
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"
```

The `--global` flag means this applies to every repository on this machine,
not just one project — you only do this once per machine. Check what's set
at any time with:

```bash
git config --global --list
```

## Where this lives

That `--global` config is written to a plain text file — `~/.gitconfig` on
macOS/Linux, or `C:\Users\<you>\.gitconfig` on Windows. You can open and
edit it directly in any text editor if you'd rather not use
`git config` for every change; it's a normal file, not a hidden database.

## Key terms

| Term | Meaning |
|---|---|
| `git --version` | Confirms Git is installed and shows which version |
| `git config --global` | Sets a setting (like your name/email) for every repo on this machine |
| `~/.gitconfig` | The plain text file your global Git settings are stored in |
| Git Bash | The Unix-style terminal the Windows installer adds |

## Check yourself

You're ready for Lesson 3 when `git --version` works in your terminal, and
`git config --global --list` shows your name and email set correctly.
