# Disks, Partitions & Mounts

A disk attached to a Linux server isn't usable until it's partitioned, formatted with a filesystem, and mounted somewhere in the directory tree. This lesson covers reading that structure on an existing server, and attaching new storage to it — the exact task Northbridge Retail's ops team faced when `/data` filled up and a second volume had to be added without downtime.

## What you'll learn

- How to list disks, partitions, and their filesystems with `lsblk` and `blkid`
- How mounting attaches a filesystem to a directory in the tree
- How to mount a filesystem temporarily, and make that mount permanent in `/etc/fstab`
- How to check filesystem usage once something is mounted

## Listing disks and partitions

`lsblk` lists every block device and its partitions in a tree, along with size and mount point:

```
$ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   40G  0 disk
├─sda1   8:1    0   39G  0 part /
└─sda2   8:2    0    1G  0 part [SWAP]
sdb      8:16   0  100G  0 disk
└─sdb1   8:17   0  100G  0 part
```

`sdb1` here has no mountpoint — it's a partition that exists but isn't attached anywhere yet. `blkid` shows each partition's filesystem type and UUID, which matters for `/etc/fstab` later:

```
$ sudo blkid /dev/sdb1
/dev/sdb1: UUID="7a3f21b0-1c44-4e9e-9a21-5e6d2f9b8a01" TYPE="ext4"
```

## Mounting a filesystem

`mount` attaches a filesystem at a directory — the mount point must already exist:

```
$ sudo mkdir -p /data
$ sudo mount /dev/sdb1 /data
$ df -h /data
Filesystem      Size  Used Avail Use% Mounted on
/dev/sdb1       98G   61M   93G    1%  /data
```

Everything under `/data` now reads and writes to `sdb1` instead of the root filesystem. `umount /data` detaches it again — this fails with "target is busy" if a process still has an open file on that filesystem.

## Making a mount permanent

A `mount` run at the command line doesn't survive a reboot. `/etc/fstab` lists filesystems to mount automatically at boot, one line per filesystem, referenced by UUID rather than a device name like `/dev/sdb1` — device names can shift if a disk is added or removed, but a UUID never changes:

```
# /etc/fstab
UUID=7a3f21b0-1c44-4e9e-9a21-5e6d2f9b8a01  /data  ext4  defaults  0  2
```

The fields, in order: UUID, mount point, filesystem type, mount options, dump flag (legacy, usually `0`), and fsck pass order. After editing `/etc/fstab`, `mount -a` mounts anything listed that isn't already mounted — this is also the safest way to test the file for typos before rebooting:

```
$ sudo mount -a
```

A typo in `/etc/fstab` can leave a server unable to boot normally, which is exactly why Northbridge's ops team always runs `mount -a` to validate the entry before ever rebooting.

## Checking what's mounted and how full it is

```
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        39G   12G   25G   33%  /
/dev/sdb1        98G   61M   93G    1%  /data
```

`mount` with no arguments lists every currently mounted filesystem and the options it was mounted with — useful for confirming a filesystem is actually mounted read-write and not accidentally read-only.

## Key terms

- **Partition** — a defined section of a physical disk, treated as its own storage device
- **`lsblk`** — lists block devices and partitions in a tree, with size and mount point
- **`blkid`** — shows a partition's filesystem type and UUID
- **Mount point** — the directory in the filesystem tree where a filesystem is attached
- **`mount` / `umount`** — attaches or detaches a filesystem at/from a mount point
- **`/etc/fstab`** — the file listing filesystems to mount automatically at boot
- **UUID** — a filesystem's unique identifier, stable across reboots even if the device name changes
