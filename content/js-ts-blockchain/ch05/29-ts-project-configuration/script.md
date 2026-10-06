# Script — TS Project Configuration

## Segment 1 (title)

A handful of tsconfig settings decide whether bigint literals even compile, and whether a nullable chain field gets caught or crashes in production.

## Segment 2 (code: minimal tsconfig)

A real web3 tsconfig needs just six settings: target ES2022, module and moduleResolution set to NodeNext, strict true, skipLibCheck true, and resolveJsonModule true. Every one of these earns its place for a reason specific to blockchain code, not generic best-practice boilerplate.

## Segment 3 (code: target and bigint)

Every lesson so far has used bigint literals for wei amounts. Those literals specifically require target ES2020 or newer — set target to ES2017 or lower, and the compiler rejects every single one of those literals with an error, even though the bigint type itself has existed since TypeScript 3.2.

## Segment 4 (steps: strict mode flags that matter)

Strict mode bundles several checks, but three matter most here. strictNullChecks forces you to actually handle the null cases on a pending transaction or a contract-creation call. noImplicitAny stops an RPC response from silently becoming untyped any, which would erase everything gained from a typed wrapper function. And noUncheckedIndexedAccess — worth adding even though it's not bundled into strict — makes reading transactions at index zero come back possibly undefined, instead of assuming the array always has an element.

## Segment 5 (code: moduleResolution and the rest)

Many web3 libraries ship ESM-only. Setting module and moduleResolution to NodeNext resolves imports the way modern Node actually does, instead of breaking with a confusing "cannot find module" error. skipLibCheck skips type-checking inside node_modules' own type definitions, so one outdated dependency can't block your whole build. resolveJsonModule lets you import a compiled contract's ABI straight from its JSON file.

## Segment 6 (outro)

Next lesson: the TypeScript patterns that show up again and again across real, working web3 repositories.
