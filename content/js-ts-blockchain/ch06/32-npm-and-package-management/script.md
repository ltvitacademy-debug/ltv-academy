# Script — npm & Package Management

## Segment 1 (title)

package.json, package-lock.json, semver ranges, npm scripts — the handful of pieces that decide exactly what code actually ends up running on your machine.

## Segment 2 (code: package.json)

Every Node project has one package.json at its root — name, scripts, and two dependency lists. npm install reads this file and downloads everything listed, plus everything those packages depend on, into node_modules.

## Segment 3 (steps: dependencies vs devDependencies, and semver)

dependencies are needed for the program to actually run; devDependencies are only needed while building, like the TypeScript compiler. A caret range allows new minor and patch versions automatically; a tilde allows only patch updates; an exact version string allows no automatic upgrades at all. Knowing which range a library is pinned to matters most for something like ethers, where version 6 removed the BigNumber class version 5 used.

## Segment 4 (code: package-lock.json and npx)

package.json says "any 6.x is fine" — package-lock.json records the exact version actually installed, for the entire dependency tree, and should always be committed so two developers don't silently end up on different versions. npm run dev runs whatever's under "scripts". npx runs a package's command-line tool on demand without a permanent global install.

## Segment 5 (outro)

Next lesson: using everything from this chapter so far to build a real, runnable Node script.
