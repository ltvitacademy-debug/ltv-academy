# Script — Links, Archives & Compression

## Segment 1 (title)

Every file you've worked with so far has had exactly one name in exactly one place. This lesson breaks that rule three ways: links let a file be reachable from more than one location, archives bundle many files into one, and compression shrinks that bundle. You'll use all three packaging up a server's configuration and logs to send to a backup server.

## Segment 2 (code)

A hard link is a second name pointing at the exact same data on disk. Create one with ln, and you'll see both filenames share the same inode number, with the link count now showing two. Editing either name edits the same underlying bytes, and the data only disappears once every name pointing to it is gone.

## Segment 3 (code)

A symbolic link is different — it's a small file that just stores a path to another file or directory, created with ln dash s. The leading l and the arrow in the listing both mark it as a symlink. Symlinks can point at directories and cross filesystems, but they break if the target gets moved, which is the tradeoff for being so much more flexible than a hard link.

## Segment 4 (code)

Tar bundles a directory into one archive file, but on its own it doesn't compress anything. Add the dash z flag, and tar pipes the archive through gzip compression as it builds it, so dash c dash z dash f creates a compressed archive in a single command. Extraction mirrors that exactly, swapping dash c for dash x.

## Segment 5 (steps)

Three different jobs, three different tools. Ln and ln dash s create a second way to reach a file, either a true duplicate name or a path pointer. Tar bundles files together without touching their size. And gzip, or zip for cross platform work, shrinks that bundle down for storage or transfer.

## Segment 6 (outro)

Links, archives, and compression round out the file management toolkit for this chapter. Next up, lesson nine: editing files directly on the server with nano and vim.
