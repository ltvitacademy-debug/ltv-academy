# Script — Setting Up a Linux Lab

## Segment 1 (title)

Before anyone on Northbridge Retail's team touches a production server, they practice on a disposable lab machine first, somewhere a bad command only costs you a rebuild. This lesson covers three real ways to get an actual Linux shell running, so you can follow the rest of this course hands-on.

## Segment 2 (steps)

WSL2 on Windows is the fastest start — it runs a genuine Linux kernel inside a lightweight VM that Windows manages for you, no separate hypervisor needed. A local VM in VirtualBox or VMware behaves exactly like a standalone server, which matters once you reach boot process and networking topics, though it does need real resources set aside up front, at least 2 gigabytes of RAM and 20 gigabytes of disk for Ubuntu Server. And a free-tier cloud VM from AWS or Oracle Cloud is reachable over the real internet, which is genuinely useful once this course gets to remote access.

## Segment 3 (code)

Getting WSL2 running takes one command from an elevated PowerShell prompt: wsl --install. After it reboots and finishes first-run setup, wsl -l -v confirms Ubuntu is installed and running as a version 2 WSL distribution.

## Segment 4 (code)

Whichever option you pick, run three commands before trusting anything else. Whoami confirms which user you're logged in as. Hostname confirms which machine you're actually on. And uname -a, from lesson one, confirms it's genuinely the Linux kernel underneath, not just a lookalike prompt. Together, those three answers rule out the most common beginner mistake: assuming you're on a real Linux box when you're actually still sitting in a Windows terminal.

## Segment 5 (outro)

WSL2 is fine for the next few chapters; once this course reaches networking, you'll want a local VM or cloud instance instead. Set one up now. Next, lesson four: the filesystem hierarchy you'll be navigating in that shell.
