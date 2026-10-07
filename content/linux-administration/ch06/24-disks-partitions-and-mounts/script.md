# Script — Disks, Partitions & Mounts

## Segment 1 (title)

A disk attached to a Linux server isn't usable until it's partitioned, formatted with a filesystem, and mounted somewhere in the directory tree. This lesson covers reading that structure on an existing server, and attaching new storage to it — exactly what Northbridge Retail's ops team did when a data volume filled up and a second disk had to be added.

## Segment 2 (code)

lsblk lists every block device and partition in a tree, along with its size and mount point, so you can see at a glance that a partition like sdb1 exists but isn't attached anywhere yet. blkid then shows that same partition's filesystem type and UUID, which matters for making the mount permanent later.

## Segment 3 (code)

mount attaches a filesystem at a directory, but that mount point has to already exist before you run it. Once /dev/sdb1 is mounted at /data, everything written under /data reads and writes to that disk instead of the root filesystem, confirmed instantly with df -h.

## Segment 4 (code)

A mount run at the command line doesn't survive a reboot, so /etc/fstab lists filesystems to mount automatically at boot — referenced by UUID rather than a device name, since a UUID never changes even if a disk gets added or removed and the device name shifts. Running mount -a after editing the file both applies new entries and safely checks for typos before ever rebooting.

## Segment 5 (steps)

Each fstab line has six fields in order: the UUID, the mount point, the filesystem type, the mount options, a legacy dump flag, and the fsck pass order. A typo in this file can leave a server unable to boot normally, which is exactly why mount -a is run to validate it first.

## Segment 6 (outro)

Disks aren't usable until they're partitioned, formatted, and mounted, and fstab is what keeps that attachment in place across every reboot. Up next, chapter six, lesson twenty-five: SSH and key-based access, for reaching this server securely, without typing a password.
