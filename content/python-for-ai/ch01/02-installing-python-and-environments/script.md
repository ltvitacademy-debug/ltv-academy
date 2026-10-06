# Script — Installing Python & Environments

## Segment 1 (title)

Let's get Python installed on your machine. This lesson is hands-on — by the end, you'll have a working Python, a code editor, and your first virtual environment.

## Segment 2 (screenshot: the installer)

Download the installer from python.org slash downloads — not a third-party site. When it opens, there's one checkbox that trips up almost every beginner: "Add python.exe to PATH." It's unchecked by default. If you skip it, your terminal won't know what the word "python" means later. Check that box before clicking Install Now.

## Segment 3 (screenshot: VS Code and the Python extension)

This course uses Visual Studio Code. After installing it, open the Extensions view, search "python," and install the official Python extension from Microsoft — the one with the blue checkmark and millions of installs. It's what lets you run and debug Python files directly inside the editor.

## Segment 4 (screenshot: virtual environments)

Next, a virtual environment — an isolated copy of Python just for one project. Without one, a package installed for Project A can quietly break Project B. Create it with python dash m venv dot venv, then use VS Code's Select Interpreter command to point the editor at it — VS Code marks it "Recommended" once it finds it.

## Segment 5 (screenshot: confirm it worked)

Confirm everything's connected by actually running a file. VS Code's integrated terminal shows exactly which python.exe ran your script — here it's the one inside dot venv — and the real output underneath. That's the proof the install, the extension, and the environment are all wired together correctly.

## Segment 6 (outro)

With Python installed, confirmed, and a virtual environment ready, the actual language starts next lesson: variables and data types.
