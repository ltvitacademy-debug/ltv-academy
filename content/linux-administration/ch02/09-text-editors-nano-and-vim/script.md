# Script — Text Editors: nano & vim

## Segment 1 (title)

Every command so far has worked on files from the outside — copying, reading, bundling them. Sooner or later you need to actually edit a config file's contents while sitting at a terminal with no desktop, which is the normal situation on a production server. Linux gives you two editors for that: nano, simple and forgiving, and vim, faster once you know it but with a learning curve that catches almost everyone the first time.

## Segment 2 (steps)

Nano drops you straight into an editable view of the file, with a menu of shortcuts along the bottom using the caret symbol to mean control. Control O writes out the file, control X exits, control K cuts the current line, and control W searches. There's no mode to think about — whatever you type is inserted at the cursor, exactly like a simple text box.

## Segment 3 (code)

Vim opens the same way, but the first surprise is that typing does nothing useful at first. That's because vim starts in normal mode, where keystrokes are commands, not text. Press i to enter insert mode — you'll see dash dash insert dash dash appear at the bottom — type your changes, then press escape to return to normal mode. Forgetting that last step is the cause of almost every vim ate my keystrokes moment.

## Segment 4 (steps)

Back in normal mode, a handful of commands cover most editing. Dd deletes the current line, yy copies it, and p pastes it back. A forward slash followed by a search term jumps you to the next match. These are commands, not text, because you're in normal mode when you type them.

## Segment 5 (code)

Saving and quitting both start with a colon from normal mode. Colon w q writes the file and quits. If you just want out without saving, colon q exclamation point quits and discards everything unsaved — the exclamation point forces past vim's normal refusal to quit with unsaved changes.

## Segment 6 (outro)

Nano for a quick fix, vim once it's second nature, and escape, then colon w q or colon q exclamation point to leave either safely. Next up, chapter three, lesson ten: permissions and ownership — who's actually allowed to edit the files you've been working with.
