# Script — Modules: import & export

## Segment 1 (title)

A real project is never one file. Splitting code into focused files keeps each one short enough to actually understand, and a module is just a file whose exports other files can import.

## Segment 2 (code: named exports)

A named export can export as many things as a file needs, each with its own name. The importing file picks exactly which ones it wants inside curly braces, using the same names they were exported with, or renaming them with "as".

## Segment 3 (code: default exports)

A file can have exactly one default export — typically its main thing, like a class or a single primary function. Importing a default doesn't use curly braces, and the importing file can name it anything it wants, since there's no exported name to match. Many blockchain libraries structure their main export this way.

## Segment 4 (code: CommonJS vs ES modules)

Node.js originally used CommonJS, require and module.exports, which loads synchronously at runtime. ES modules, import and export, are the modern standard, used in the browser and modern Node.js, parsed statically before the code runs. You'll see both in real projects.

## Segment 5 (outro)

Named exports for multiple named things, a default export for a file's one main thing, and CommonJS versus ES modules as the two systems you'll actually encounter. Next up: array methods — map, filter, and reduce.
