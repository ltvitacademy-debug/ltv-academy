# Lesson 14 — Package Management (apt, yum & dnf)

**Chapter 3 · Linux Fundamentals I — The Shell & Filesystem · Lesson 14 of 32**

## What you'll learn

- Why Linux software installation goes through a package manager instead of downloading installers
- The real `apt` / `apt-get` commands for Debian and Ubuntu systems
- The real `yum` and `dnf` commands for RHEL, CentOS, Fedora, and Amazon Linux systems
- Why knowing both command sets matters once you're working across real cloud distros

## No installers — packages, instead

On Linux, you almost never download an installer file and double-click it. Instead, each distro
ships a **package manager** that downloads software (and anything it depends on) from a trusted
repository, verifies it, and installs it with one command. That's not a minor convenience — it's
what makes it possible to patch a security hole across an entire fleet of servers with a single
command instead of visiting each one.

## Debian and Ubuntu: apt / apt-get

```
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install nginx
$ sudo apt remove nginx
$ apt search nginx
```

`apt update` refreshes the local list of available packages and their versions from the configured
repositories — it doesn't install or upgrade anything by itself, it just updates apt's own
knowledge of what's out there. `apt upgrade` then actually installs newer versions of packages you
already have. `apt install <package>` installs something new, `apt remove <package>` uninstalls it
(leaving configuration files behind — `apt purge` removes those too), and `apt search <term>` looks
for a package by name or description. `apt-get` is the older, more script-friendly version of the
same tool; `apt` is the newer, more human-friendly front end most people type interactively today.

## RHEL, CentOS, Fedora, and Amazon Linux: yum / dnf

```
$ sudo dnf check-update
$ sudo dnf update
$ sudo dnf install nginx
$ sudo dnf remove nginx
$ dnf search nginx
```

`dnf` (Dandified YUM) is the modern package manager on current RHEL, Fedora, CentOS Stream, and
recent Amazon Linux releases — `yum` is the older tool it replaced, and the two share nearly
identical syntax (older systems, and some Amazon Linux 2 setups, still use `yum` directly). `dnf
check-update` lists available updates without installing them, `dnf update` installs them, `dnf
install <package>` installs something new, and `dnf search <term>` looks one up by name. The
command *shapes* are deliberately close to apt's, even though the two tool families are unrelated
under the hood.

## Why both matter

| Task | Debian / Ubuntu | RHEL / Fedora / Amazon Linux |
|---|---|---|
| Refresh package list | `apt update` | `dnf check-update` |
| Install upgrades | `apt upgrade` | `dnf update` |
| Install software | `apt install nginx` | `dnf install nginx` |
| Remove software | `apt remove nginx` | `dnf remove nginx` |
| Search for a package | `apt search nginx` | `dnf search nginx` |

A real cloud career will put you in front of both families, often in the same week — an EC2
instance running Amazon Linux here, an Ubuntu VM there, a legacy RHEL box somewhere else. Knowing
that the *commands* differ but the *shape* of what you're doing (refresh, upgrade, install, remove,
search) stays identical means you're never actually starting from zero on an unfamiliar distro.

## Key terms

| Term | Meaning |
|---|---|
| Package manager | A tool that installs, updates, and removes software from a trusted repository, resolving dependencies automatically |
| `apt` / `apt-get` | The package manager used on Debian and Ubuntu |
| `yum` / `dnf` | The package manager used on RHEL, CentOS, Fedora, and Amazon Linux |
| Repository | A server hosting the packages a distro's package manager downloads from |

## Check yourself

You SSH into an unfamiliar cloud VM and need to install `curl`. Running `apt install curl` fails
with "command not found." What does that tell you about the distro, and what would you try
instead?
