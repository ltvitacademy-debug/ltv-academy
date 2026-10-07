# Resource Monitoring

Services crash, deploys stall, and disks fill up quietly for days before anyone notices — resource monitoring is how you catch it before it becomes an outage instead of after. This lesson covers the core command-line tools for checking CPU, memory, and disk usage on a running server. Northbridge Retail's ops team checks these every time a service feels slow, before ever touching application logs.

## What you'll learn

- How to read `top` and `htop` for live CPU and memory usage per process
- How to check memory with `free`
- How to check disk space with `df` and find what's actually consuming it with `du`
- How `uptime` and load average tell you whether a server is under pressure

## Live process monitoring with top

`top` refreshes every few seconds, showing the most resource-hungry processes first:

```
$ top
top - 14:32:01 up 3 days,  2:14,  1 user,  load average: 0.42, 0.38, 0.31
Tasks: 112 total,   1 running, 111 sleeping
%Cpu(s):  8.3 us,  2.1 sy,  0.0 ni, 89.1 id
MiB Mem :   3942.0 total,   812.4 free,  1890.2 used,  1239.4 buff/cache

  PID USER      PR  NI    VIRT    RES  %CPU  %MEM  COMMAND
 2210 nbapp     20   0  412300  98104  12.3   2.5  node
 1012 www-data  20   0   45200  10400   0.3   0.3  nginx
```

Press `q` to quit, `M` to sort by memory instead of CPU. `htop`, if installed, is a friendlier, color-coded version of the same information with mouse support — it's not installed by default on most minimal images, so `top` is the one you can always count on.

## Checking memory with free

`free -h` shows memory in human-readable units:

```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:           3.9Gi       1.8Gi       812Mi        45Mi       1.2Gi       1.9Gi
Swap:          2.0Gi          0B       2.0Gi
```

`buff/cache` is memory the kernel is using to cache disk data — it's reclaimed instantly if an application needs it, so a server showing low "free" but high "available" is not actually short on memory. `available` is the number that matters.

## Checking disk space

`df -h` shows free and used space per mounted filesystem:

```
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        40G   31G  7.2G   82%  /
/dev/sdb1       100G   88G   7.1G  93%  /data
```

When a filesystem is nearly full, `du` finds what's actually using the space. `-sh` summarizes each argument instead of listing every file, and sorting the output finds the biggest offenders fast:

```
$ du -sh /var/log/* | sort -rh | head -5
2.1G    /var/log/nginx
890M    /var/log/journal
210M    /var/log/northbridge
```

This is exactly how Northbridge's ops team tracked down a disk that hit 93% — an nginx access log nobody had rotated in months.

## uptime and load average

`uptime` shows how long the system has been running and its load average — the average number of processes wanting CPU time, over the last 1, 5, and 15 minutes:

```
$ uptime
 14:32:01 up 3 days,  2:14,  1 user,  load average: 0.42, 0.38, 0.31
```

A load average near or above the number of CPU cores means the system is saturated; well below it means there's headroom. A rising trend across the three numbers (1-min higher than 15-min) means load is building right now, not easing off.

## Key terms

- **`top`** — shows live, auto-refreshing CPU and memory usage per process
- **`htop`** — a friendlier, color-coded alternative to top, not installed by default everywhere
- **`free -h`** — shows total, used, and available memory in human-readable units
- **`available` memory** — the memory actually free for new use, accounting for reclaimable cache
- **`df -h`** — shows disk space used and free per mounted filesystem
- **`du -sh`** — summarizes disk usage for a file or directory
- **Load average** — the average number of processes wanting CPU time over 1/5/15 minutes
