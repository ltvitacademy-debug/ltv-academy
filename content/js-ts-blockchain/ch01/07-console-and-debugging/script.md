# Script — Working With the Console & Debugging

## Segment 1 (title)

Every major browser ships with built-in developer tools, and the Console tab inside them is where you'll actually debug real code — not just console.log, but errors, tables, and a live JavaScript prompt against the real page.

## Segment 2 (screenshot: console panel with log/error/table)

console.log is what every beginner reaches for first, but it's not the only tool. console.error marks a message as an error, styled in red with a clickable stack trace showing exactly which line logged it. console.table renders an array of objects as an actual table — worth knowing specifically because arrays of objects are exactly the shape most blockchain data comes in.

## Segment 3 (screenshot: devtools opened to console)

Press F12 or Control Shift J in Chrome to open DevTools directly to the Console tab. It shows two things at once: anything your page's JavaScript logs, and a live prompt where you can type and run JavaScript yourself, immediately, against the actual page.

## Segment 4 (screenshot: running JS live against the page)

The console isn't just for reading output — it's a live prompt. Typing an expression and pressing Enter runs it immediately against the page you have open and prints back whatever it returns. This is how experienced developers debug: reaching in and querying or modifying a running page directly, instead of guessing.

## Segment 5 (outro)

console.log, console.error, console.table, and a live prompt that runs real JavaScript against a real page. Next up: ES6+ syntax — the modern JavaScript that every library in this course actually uses.
