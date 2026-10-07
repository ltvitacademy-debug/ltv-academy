# Processes, Memory & Storage

In the last lesson, you learned that an operating system manages hardware on behalf of everything else. This lesson zooms into the three things it's managing most constantly: processes (running programs), memory (where their data lives while they run), and storage (where everything lives when the power is off). These three ideas come up in almost every troubleshooting conversation you'll have as a DevOps engineer, from "why is this server slow" to "why did this container get killed."

## What you'll learn

- What a process is, and how it differs from the program file it was started from
- How RAM is allocated to processes, and what happens when a machine runs out of it
- The difference between volatile memory (RAM) and persistent storage (disk)
- How to read a basic process list, the way you would on a Northbridge Retail server

## What a process actually is

A **process** is a running instance of a program. The distinction matters: the program is a file sitting on storage, doing nothing. The moment you launch it, the operating system creates a process — it allocates memory, assigns the program an identifier (a process ID, or PID), and starts handing it CPU time via scheduling. Open the same application twice, and you get two separate processes, each with its own memory space, even though they both started from the same program file.

A busy server runs many processes at once. At Northbridge Retail, a single checkout server might simultaneously run the point-of-sale application, a background sync job pushing sales data to the warehouse system, and the OS's own housekeeping processes — all sharing the same CPU and RAM, coordinated by the scheduler you learned about in Lesson 1.

## Memory: fast, temporary, and finite

Every process needs RAM to hold the data it's actively working with — variables, open files, network buffers. The operating system hands out chunks of RAM to each process and keeps them isolated from one another, so one process can't read or corrupt another's memory by accident.

RAM is finite. When processes collectively ask for more memory than a machine has, the operating system has to make a choice: it can slow things down by swapping some memory out to disk (far slower than RAM), or in more extreme cases, it starts terminating processes to free up space. This is why "out of memory" is one of the most common failure modes you'll diagnose on a server — a process, or several processes together, simply asked for more RAM than the machine had.

## Storage: slower, but it survives a reboot

Storage (an SSD or hard drive) holds everything that needs to exist after the power is cut: the operating system itself, installed programs, configuration files, logs, and data. It's dramatically slower to read and write than RAM, which is exactly why the OS keeps active work in RAM and only reads from or writes to storage when it has to.

Capacity and speed are usually described in the same units at different scales — a modern server might have 32 gigabytes (GB) of RAM but 2 terabytes (TB, 1,000 GB) of storage, because storage is cheap to make large and RAM is not.

## Reading a process list

Every operating system gives you a way to see what's currently running: Task Manager on Windows, Activity Monitor on macOS, and the `top` or `ps` commands on Linux. Each entry typically shows the process ID, how much CPU and memory it's using, and its name. Learning to scan this list quickly — spotting the one process using 95% of the CPU, or the one that's quietly consuming all the RAM — is one of the most practical day-one skills for anyone running servers.

## Key terms

| Term | Meaning |
|---|---|
| Process | A running instance of a program, with its own memory and a process ID (PID) |
| PID | Process ID — a unique number the OS assigns to each running process |
| RAM | Volatile (temporary) memory used by running processes |
| Storage | Persistent memory (SSD/HDD) that survives a reboot or power loss |
| Swapping | Using disk space as overflow memory when RAM runs out, at a steep speed cost |

## Recap

A process is a running program with its own memory, tracked by a PID. RAM holds what's actively in use and disappears on power-off; storage holds everything else and survives it. When RAM runs short, the OS swaps to disk or kills processes — which is why memory pressure is one of the first things to check when a server misbehaves. Next up, Lesson 3: servers vs. clients.
