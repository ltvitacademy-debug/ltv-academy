# Processes & Signals

Every command you run becomes a process — a running instance of a program with its own PID, its own memory, and its own place in the kernel's scheduler. This lesson covers how to see what's running, how to send a process to the background so your terminal stays free, and how to ask a process to stop with a signal instead of just assuming `kill` is violent. Northbridge Retail's ops team lives in this daily: a long-running sync job gets backgrounded so a deploy can continue in the same session, and a worker that's stuck gets a polite `SIGTERM` before anyone reaches for `-9`.

## What you'll learn

- How to list running processes with `ps` and `top`, and read the columns that matter
- The difference between running a job in the foreground, the background, and detached with `nohup`
- What a signal actually is, and why `SIGTERM` and `SIGKILL` behave so differently
- How to find and stop a process by name instead of hunting for its PID by hand

## Viewing running processes

`ps aux` lists every process on the system, one line each:

```
$ ps aux | grep northbridge
nbapp       2210  0.3  1.2 412300 98104 ?        Sl   09:02   0:14 node /opt/northbridge/sync-worker.js
root        2381  0.0  0.0   7376  2048 pts/0    S+   09:15   0:00 grep northbridge
```

The columns that matter most: `PID` (the process ID), `%CPU`/`%MEM` (current usage), `STAT` (process state, like `S` for sleeping or `R` for running), and the command itself. `top` shows the same kind of data, but live and sorted by CPU usage — press `q` to quit.

## Foreground, background, and detached

By default, a command you run occupies your terminal until it finishes — that's the foreground. Appending `&` sends it to the background instead, handing your prompt back immediately:

```
$ /opt/northbridge/sync-worker.js &
[1] 2210
```

The number in brackets is the shell's job number; the PID beside it is the process ID. `jobs` lists what's running in the background of the current shell, and `fg %1` brings job 1 back to the foreground.

A background job started this way is still tied to your terminal session — close that terminal, and the job gets a `SIGHUP` and usually dies with it. `nohup` detaches a command from that signal entirely, so it keeps running after you log out:

```
$ nohup /opt/northbridge/sync-worker.js &
[1] 2301
$ nohup: ignoring input and appending output to 'nohup.out'
```

## Signals and kill

A signal is a message sent to a process asking it to do something — stop, reload, or die. `kill` sends signals despite its name; the signal number or name decides the behavior:

```
$ kill -TERM 2210
$ kill -9 2210
```

`SIGTERM` (the default, signal 15) asks the process to shut down cleanly — it can catch this signal, close open files, and exit gracefully. `SIGKILL` (signal 9) is not a request; the kernel terminates the process immediately and it cannot catch, ignore, or clean up after it. Always try `SIGTERM` first — `SIGKILL` is for a process that's already ignoring it.

```
$ kill -l | head -5
1) SIGHUP   2) SIGINT   3) SIGQUIT  4) SIGILL   5) SIGTRAP
```

## Finding and stopping a process by name

Hunting for a PID with `ps aux | grep` works, but `pkill` and `pgrep` search by process name directly:

```
$ pgrep -a sync-worker
2210 node /opt/northbridge/sync-worker.js

$ pkill -TERM sync-worker
```

`pgrep` just lists matching PIDs (`-a` also shows the full command line); `pkill` sends a signal to every process whose name matches, which is faster than copying a PID by hand when Northbridge's ops team needs to restart a stuck worker.

## Key terms

- **Process** — a running instance of a program, identified by a unique PID
- **`ps aux`** — lists all running processes with their resource usage and state
- **Foreground / background** — whether a job occupies the terminal or runs behind it (`&`)
- **`nohup`** — detaches a command from the terminal so it survives logout
- **Signal** — a message sent to a process requesting an action, like stop or reload
- **`SIGTERM`** — the default, catchable signal asking a process to shut down cleanly
- **`SIGKILL`** — an uncatchable signal that forces immediate termination
- **`pgrep` / `pkill`** — find or signal processes by name instead of by PID
