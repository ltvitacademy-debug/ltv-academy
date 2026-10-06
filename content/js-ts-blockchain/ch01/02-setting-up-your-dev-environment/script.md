# Script — Setting Up Your Dev Environment

## Segment 1 (title)

Your browser already runs JavaScript, but this course writes standalone scripts, installs packages, and eventually talks to a live blockchain from the command line — none of which works inside a browser tab. Node.js is a JavaScript runtime that runs outside the browser, as a real program on your machine, and almost everything in this course depends on it being installed first.

## Segment 2 (screenshot: nodejs.org)

Head to nodejs.org — it detects your operating system and offers a Windows download with two buttons: LTS and Current. Always pick LTS, the Long-Term Support version, for this course. It's the stable, recommended release, not the bleeding-edge one.

## Segment 3 (screenshot: install wizard)

Run the downloaded installer and the Node.js Setup Wizard opens with a simple welcome screen. Click Next through the default options — the defaults are correct here, including keeping npm, Node's package manager, selected.

## Segment 4 (screenshot: version check)

Once it's installed, open a terminal and run node -v, then npm -v. A correctly installed Node prints back a version number for each one. If you instead see "node is not recognized," close the terminal and open a fresh one — it was likely opened before the install finished.

## Segment 5 (screenshot: VS Code terminal)

Now install VS Code, the free Microsoft code editor every lesson in this course assumes you're using. Open its built-in terminal panel and run that same node -v command — it works identically there, so you never have to leave the editor to run anything.

## Segment 6 (code: first script)

Create a file named hello.js with one line: console.log("Hello, blockchain"). Then run it from the terminal with node hello.js. If you see the text printed back, your environment is fully working end to end.

## Segment 7 (outro)

Node.js installed, confirmed with node -v and npm -v, and VS Code set up with its own terminal. Next up: variables and data types — the actual building blocks of every script you write from here on.
