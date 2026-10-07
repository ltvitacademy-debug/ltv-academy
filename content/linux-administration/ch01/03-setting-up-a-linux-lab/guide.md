# Setting Up a Linux Lab

Before Northbridge Retail's team touches a production server, everyone practices on a disposable lab machine first — somewhere you can run `rm -rf` on the wrong directory and the only consequence is rebuilding a VM. This lesson covers the three realistic ways to get a real Linux shell in front of you, so you can follow along with every remaining lesson in this course on an actual machine, not just by reading.

## What you'll learn

- Three practical ways to get a real Linux environment: WSL2, a local VM, and a free-tier cloud server
- The trade-offs between them — convenience vs. how close they are to a real production server
- How to confirm you've actually landed in a Linux shell, not just a Linux-flavored prompt
- Which option this course's labs assume going forward

## Option 1: WSL2 on Windows

If you're on Windows, **WSL2** (Windows Subsystem for Linux, version 2) runs a real Linux kernel inside a lightweight VM Windows manages for you — no separate hypervisor software to install. From an elevated PowerShell prompt:

```
PS> wsl --install
Installing: Ubuntu
Ubuntu has been installed.
The requested operation is successful. Changes will not be effective until the system is rebooted.
```

After the reboot and first-run setup, confirm it's running:

```
PS> wsl -l -v
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

WSL2 is the fastest path to a working shell and is what most of this course's labs assume, but it shares a kernel with Windows in ways a real standalone server never does — fine for learning commands, not a substitute for the real networking and boot-process topics in later chapters.

## Option 2: A local VM with VirtualBox

For anything involving the boot process, disk partitioning, or networking between two machines, you want a real, isolated virtual machine. Download the Ubuntu Server ISO from ubuntu.com, install Oracle VirtualBox (or VMware Workstation Player), create a new VM with at least 2 GB RAM and 20 GB disk, attach the ISO, and boot through the Ubuntu Server installer. The end result is a VM that behaves exactly like a standalone physical server — because as far as the OS inside is concerned, it is one.

## Option 3: A free-tier cloud server

Both AWS and Oracle Cloud offer an always-free or free-trial tier that includes a small Linux VM — genuinely useful once you reach the networking and remote-access lessons later in this course, since it's reachable over the real internet instead of just your own machine. Once launched, you connect the same way you will to Northbridge Retail's actual servers:

```
$ ssh ubuntu@203.0.113.42
Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-91-generic x86_64)
...
ubuntu@ip-172-31-5-10:~$
```

Notice the prompt changed to `ubuntu@ip-172-31-5-10` — that's the cloud provider's internal hostname, your first clue you're on a real remote machine rather than your own laptop.

## Confirming you've actually landed in Linux

Whichever option you pick, run these three commands before trusting anything else:

```
$ whoami
ubuntu

$ hostname
ip-172-31-5-10

$ uname -a
Linux ip-172-31-5-10 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux
```

`whoami` confirms which user you're logged in as, `hostname` confirms which machine, and `uname -a` (from Lesson 1) confirms it's genuinely the Linux kernel underneath — not a lookalike shell.

## Which option this course uses

The labs from here forward assume you have **some** real Ubuntu shell available — WSL2 is perfectly fine for Chapters 1 through 3. Once this course reaches networking and multi-machine topics, you'll want either a local VM or a free-tier cloud instance, since those lessons depend on having more than one machine to talk to. Set one up now so Lesson 4 isn't the first time you're typing real commands.

## Key terms

- **WSL2** — Windows Subsystem for Linux version 2; runs a real Linux kernel in a lightweight VM managed by Windows
- **Hypervisor** — software (like VirtualBox or VMware) that creates and runs virtual machines
- **Free-tier cloud VM** — a small virtual server offered free or trial-free by a cloud provider, reachable over the real internet
- **`ssh`** — the command used to open a remote shell session on another Linux machine
- **`whoami` / `hostname`** — commands that report the current user and machine name, useful for confirming exactly where you're logged in
