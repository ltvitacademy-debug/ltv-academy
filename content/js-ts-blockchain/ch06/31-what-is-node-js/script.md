# Script — What Is Node.js?

## Segment 1 (title)

Node.js takes the same engine your browser uses to run JavaScript and drops it into a standalone program — no browser required. That's why almost every blockchain tool you'll use runs on it.

## Segment 2 (code: checking your install and the REPL)

node dash v prints your installed version. Running node with no file at all opens the REPL — a scratchpad for trying one line of JavaScript at a time, genuinely useful for checking whether a line of ethers or viem syntax actually works before committing it to a real script.

## Segment 3 (steps: what Node gives you beyond the language)

Beyond the JavaScript language itself, Node gives you file system access through the fs module, network access through http and the built-in fetch, a process object for reading command-line arguments and environment variables, and npm, the package manager that ships with it by default.

## Segment 4 (code: CommonJS vs ES modules)

Node supports two module systems, and web3 tutorials mix both. CommonJS is the older default — require and module.exports — with no "type" field in package.json, or "type: commonjs". ES modules are the modern system — import and export — turned on with "type: module" in package.json. They don't mix in the same file: require doesn't exist in an ESM file, and bare import statements don't work in CommonJS without extra setup.

## Segment 5 (outro)

Next lesson: npm, the package manager Node ships with, and how real projects manage their dependencies.
