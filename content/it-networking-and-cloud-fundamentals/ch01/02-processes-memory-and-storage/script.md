# Script — Processes, Memory & Storage

## Segment 1 (title)

Last lesson, you learned that the operating system manages hardware for everything else. This lesson zooms into three things it's managing constantly: processes, memory, and storage — the three ideas behind almost every "why is this server slow" conversation you'll have.

## Segment 2 (steps)

A process is a running instance of a program. The program itself is just a file on storage, doing nothing. The moment you launch it, the OS creates a process, gives it a process ID, and starts handing it CPU time. A busy server runs many processes at once — at Northbridge Retail, a checkout server might run the point-of-sale app, a background sync job, and OS housekeeping, all sharing the same CPU and RAM.

## Segment 3 (steps)

Every process needs RAM to hold the data it's actively working with, and the OS keeps each process's memory isolated from the others. RAM is finite, so when processes collectively ask for more than the machine has, the OS either swaps some of it out to much slower disk, or starts killing processes to free space. Storage is the opposite: slower, but it survives a reboot, which is why the operating system, your files, and your programs all live there.

## Segment 4 (code)

Every OS gives you a way to see what's running right now — Task Manager, Activity Monitor, or on Linux, commands like top and ps. Each row shows a process ID, how much CPU and memory it's using, and its name. Scanning that list for the one process hogging the CPU or quietly eating all the RAM is a day-one skill for running servers.

## Segment 5 (outro)

Process, memory, storage — that's what's being juggled under the hood every second a computer runs. Up next, lesson three: servers versus clients.
