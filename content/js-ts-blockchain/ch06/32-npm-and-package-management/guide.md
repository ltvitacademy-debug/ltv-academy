# Lesson 32 — npm & Package Management

**Chapter 6 · Node.js Basics · Lesson 32 of 39**

## What you'll learn

- What `package.json` and `package-lock.json` each actually do
- `dependencies` vs. `devDependencies`, and when each belongs
- How semver ranges (`^`, `~`, exact) decide what `npm install` can upgrade
- `npm run` scripts and `npx` for running a package without installing it globally

## package.json: the project's manifest

Every Node project has one `package.json` at its root, describing the project and listing what it
depends on:

```json
{
  "name": "block-watcher",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx src/index.ts"
  },
  "dependencies": {
    "ethers": "^6.13.0",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tsx": "^4.16.0"
  }
}
```

`npm install` reads this file and downloads everything listed, plus everything *those* packages
depend on, into a `node_modules` folder.

## dependencies vs. devDependencies

`dependencies` are needed for the program to actually run (`ethers`, `dotenv` — your script
can't make an RPC call without them). `devDependencies` are only needed while building/developing
(`typescript` to compile, `tsx` to run TypeScript directly in development). The distinction
matters in production: `npm install --omit=dev` skips devDependencies entirely, which is exactly
what a deployment pipeline should do — no reason to ship a TypeScript compiler to a server that
only runs the already-compiled JavaScript.

## Semver ranges: what `^` and `~` actually allow

```
"ethers": "^6.13.0"   // allows 6.13.0 up to (but not including) 7.0.0
"ethers": "~6.13.0"   // allows 6.13.0 up to (but not including) 6.14.0
"ethers": "6.13.0"    // exact version only, no automatic upgrades
```

`^` (caret, the npm default) allows new *minor* and *patch* versions — safe under semver's
promise that a minor/patch release doesn't break your code. `~` (tilde) is stricter, allowing
only patch updates. For a library whose major-version changes have real breaking changes (like
ethers v5 → v6's `BigNumber` removal from Lesson 27), understanding which range you're on tells
you whether `npm install` could silently pull in a version with different syntax than the
tutorial you're reading.

## package-lock.json: exact, reproducible installs

`package.json` says "any 6.x is fine." `package-lock.json` records the *exact* version actually
installed, for every package in the whole dependency tree, down to sub-dependencies you never
listed yourself. Commit it to the repo. Without it, two developers running `npm install` a week
apart could end up on different versions of the same `^` range, and "works on my machine" bugs
follow.

## Scripts and npx

```
$ npm run dev        # runs the "dev" script from package.json
$ npx tsx src/index.ts   # runs a package's CLI without a permanent global install
```

`npm run <name>` runs whatever command is under `scripts` in `package.json` — this is how nearly
every real project standardizes "how do I build/run/test this," instead of everyone remembering a
different raw command. `npx` runs a package's command-line tool on demand, downloading it
temporarily if it isn't already installed — handy for a one-off tool you don't want cluttering a
global install.

## Key terms

| Term | Meaning |
|---|---|
| `package.json` | The project manifest: name, scripts, dependencies |
| `package-lock.json` | The exact, locked versions actually installed — always commit this |
| `^` / `~` | Semver ranges allowing minor+patch, or patch-only, upgrades |
| `npx` | Runs a package's CLI without a permanent global install |

## Lab

1. Run `npm init -y` in an empty folder and look at the `package.json` it generates.
2. Run `npm install ethers` and note what `^` range it adds, then open `package-lock.json` and
   find the exact version it actually resolved to.
3. Add a `"start"` script and run it with `npm run start`.

## Check yourself

You're ready for Lesson 33 when you can explain the difference between `package.json` and
`package-lock.json`, and why `devDependencies` shouldn't ship to production.
