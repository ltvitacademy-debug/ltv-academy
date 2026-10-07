# Text Editors: nano & vim

Every command so far has worked on files from the outside — copying them, reading them, bundling them. Sooner or later you need to actually edit a config file's contents while sitting at a terminal with no graphical desktop, which is the normal situation on a production server. Linux gives you two editors for this out of the box on almost every distribution: `nano`, which is simple and forgiving, and `vim`, which is faster once you know it but has a learning curve that catches almost everyone off guard the first time. You'll use both at Northbridge Retail — `nano` for a quick one-line fix, `vim` once it's second nature.

## What you'll learn

- Opening, editing, and saving a file in `nano`
- The handful of `nano` keyboard shortcuts you'll use constantly
- Why `vim` has "modes," and how to tell which one you're in
- Entering insert mode, making edits, and returning to normal mode
- Saving and quitting `vim` with `:wq`, and escaping without saving with `:q!`

## Editing with nano

Open any file, existing or new, with `nano filename`:

```
$ nano app/nginx.conf
```

`nano` drops you straight into an editable view of the file with a menu of shortcuts along the bottom of the screen, using the caret (`^`) to mean `Ctrl`. The ones you'll use on nearly every visit:

| Shortcut | Action |
|---|---|
| `Ctrl+O` | Write out (save) the file |
| `Ctrl+X` | Exit nano |
| `Ctrl+K` | Cut the current line |
| `Ctrl+U` | Paste (uncut) the last cut line |
| `Ctrl+W` | Search for text |

Saving and exiting is `Ctrl+O`, `Enter` to confirm the filename, then `Ctrl+X`. If you try to exit with unsaved changes, `nano` asks first:

```
Save modified buffer?
 Y Yes
 N No           ^C Cancel
```

There's no "mode" to think about — whatever you type is inserted at the cursor, exactly like a simple text box. That's what makes `nano` the right choice for a fast, low-stakes edit.

## Why vim is different: modes

`vim` opens the same way: `vim app/nginx.conf`. The first surprise for newcomers is that typing does nothing useful at first — that's because `vim` starts in **normal mode**, where keystrokes are commands, not text. You have to deliberately switch to **insert mode** to type text:

```
$ vim app/nginx.conf
```

Press `i` to enter insert mode (you'll see `-- INSERT --` appear at the bottom of the screen), type your changes normally, then press `Esc` to return to normal mode. That return to normal mode is the step beginners forget, and it's the cause of almost every "vim ate my keystrokes" moment — you're still in insert mode, typing what you think are commands as literal text.

## Common normal-mode commands

Once you're back in normal mode, a few commands cover most editing:

| Command | Action |
|---|---|
| `dd` | Delete (cut) the current line |
| `yy` | Yank (copy) the current line |
| `p` | Paste after the cursor |
| `/searchterm` | Search forward for text, `Enter` to jump to it |
| `u` | Undo the last change |

## Saving and quitting vim

Saving and quitting both happen from normal mode, starting with `:` to open the command line at the bottom of the screen:

```
:wq
```

`:wq` writes the file and quits. If you opened a file, made changes you don't want, and just want out, `:q!` quits and discards everything unsaved — the `!` forces it, overriding vim's normal refusal to quit with unsaved changes:

```
:q!
```

A reliable mental model for your first weeks: `Esc` to be sure you're in normal mode, then `:wq` to save and leave, or `:q!` to abandon changes and leave.

## Key terms

- **nano** — a simple, mode-free terminal text editor; shortcuts use `Ctrl` combinations shown at the bottom of the screen
- **vim** — a modal terminal text editor; faster once learned, but requires understanding normal vs. insert mode
- **normal mode** — vim's default mode, where keystrokes are commands rather than text
- **insert mode** — the vim mode where typed characters are inserted into the file; entered with `i`, exited with `Esc`
- **:wq** — vim's command to write (save) the file and quit
- **:q!** — vim's command to quit without saving, discarding unsaved changes
