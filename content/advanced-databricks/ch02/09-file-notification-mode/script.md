# Script — File Notification Mode

## Segment 1 (title)

Every Auto Loader example so far ran in directory listing mode without ever naming it — periodically listing the target directory and diffing against its own state. It never needed naming before because at modest scale it just works.

## Segment 2 (code: why listing gets expensive)

Listing cost scales with how many objects and prefixes exist, not just how many are new. A deep, continuously growing partition tree means every trigger pays a real cloud-storage API cost to re-list a tree that's mostly unchanged since the last check.

## Segment 3 (code: file notification mode)

Instead of listing, Auto Loader can set up a cloud-native event pipeline — on Azure, an Event Grid subscription feeding a queue — so the storage account pushes a notification the moment a file lands, instead of Auto Loader asking.

## Segment 4 (steps: when it's worth it)

Notification mode isn't strictly better — it trades one-time setup and a small event-queue cost for eliminating re-listing cost entirely. Worth it for very large or deep trees and high-frequency arrival; listing mode's simplicity still wins for anything modest.

## Segment 5 (outro)

Listing versus notification — a real infrastructure trade-off, not a strict upgrade. Next up: Auto Loader plus Structured Streaming, running continuously.
