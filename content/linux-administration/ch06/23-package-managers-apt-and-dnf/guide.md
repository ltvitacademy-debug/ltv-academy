# Package Managers: apt & dnf

Installing software on Linux almost never means downloading an installer — it means asking a package manager to pull a known-good build from a repository, along with everything it depends on. Debian and Ubuntu use `apt`; Red Hat, Rocky, and Fedora use `dnf`. Northbridge Retail runs both: Ubuntu for most app servers, Rocky Linux for a few systems inherited from an acquisition, so their ops team is fluent in both toolchains.

## What you'll learn

- How to update package lists, install, and remove packages with `apt` (Debian/Ubuntu)
- How to do the same with `dnf` (RHEL/Rocky/Fedora)
- The difference between a package manager's cache/metadata and the packages actually installed
- How to search for a package and see what's already installed

## apt on Debian and Ubuntu

`apt update` refreshes the local list of available packages and versions from configured repositories — it doesn't install or upgrade anything by itself:

```
$ sudo apt update
Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease
Get:2 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
Fetched 126 kB in 1s
```

`apt install` installs a package and its dependencies:

```
$ sudo apt install nginx
The following additional packages will be installed:
  nginx-common nginx-core
0 upgraded, 3 newly installed, 0 to remove and 4 not upgraded.
```

`apt upgrade` upgrades every installed package to its latest available version; `apt remove` uninstalls a package but leaves its config files behind, while `apt purge` removes those too:

```
$ sudo apt upgrade
$ sudo apt remove nginx
$ sudo apt purge nginx
```

`apt search` looks for a package by name or description; `apt list --installed` shows what's currently on the system:

```
$ apt search nginx | head -3
nginx/noble 1.24.0-2ubuntu7 all
  small, powerful, scalable web/proxy server

$ apt list --installed | grep nginx
nginx/noble,now 1.24.0-2ubuntu7 all [installed]
```

## dnf on RHEL-family distributions

`dnf` covers the same operations with a near-identical command structure. There's no separate "update metadata" step before most commands — `dnf` refreshes its cache automatically when it's stale:

```
$ sudo dnf install nginx
Installing:
 nginx           x86_64   1:1.24.0-1.el9   appstream   570 k
Install  1 Package
```

```
$ sudo dnf update
$ sudo dnf remove nginx
```

`dnf search` and `dnf list installed` work the same way `apt` does:

```
$ dnf search nginx | head -3
nginx.x86_64 : A high performance web server and reverse proxy server

$ dnf list installed | grep nginx
nginx.x86_64    1:1.24.0-1.el9    @appstream
```

To force a metadata refresh explicitly rather than rely on automatic staleness checks:

```
$ sudo dnf makecache
```

## Mapping between the two

| Task | apt | dnf |
|---|---|---|
| Refresh package metadata | `apt update` | `dnf makecache` (usually automatic) |
| Install a package | `apt install <pkg>` | `dnf install <pkg>` |
| Remove, keep config | `apt remove <pkg>` | `dnf remove <pkg>` |
| Remove, including config | `apt purge <pkg>` | `dnf remove <pkg>` + manual cleanup |
| Upgrade everything | `apt upgrade` | `dnf update` |
| Search for a package | `apt search <term>` | `dnf search <term>` |
| List installed packages | `apt list --installed` | `dnf list installed` |

## Key terms

- **Package manager** — a tool that installs, updates, and removes software from trusted repositories, resolving dependencies automatically
- **`apt`** — the package manager used by Debian, Ubuntu, and derivatives
- **`dnf`** — the package manager used by Fedora, RHEL, Rocky Linux, and derivatives (successor to `yum`)
- **Repository** — a remote source of packages and version metadata a package manager pulls from
- **Dependency** — another package a given package requires to run, installed automatically alongside it
- **`purge`** — (apt) removes a package along with its configuration files, not just the binaries
