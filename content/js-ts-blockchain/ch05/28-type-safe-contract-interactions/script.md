# Script — Type-Safe Contract Interactions

## Segment 1 (title)

Three pieces combine into fully type-safe contract calls: a const ABI, a typed wrapper function, and a result type that makes failure part of the signature.

## Segment 2 (code: ABI as const)

A plain ABI array type-checks structurally, but TypeScript can't tell which function names are actually valid for calls against it. Declare the ABI with "as const" and it becomes a literal type the compiler can read function by function — now readContract can narrow functionName to only real names on that ABI, and infer the args and return type directly, with zero manual generics.

## Segment 3 (code: typed wrapper function)

Most real projects wrap a repeated call shape behind a small helper. Type its parameters as PublicClient and Address, and its return as Promise of bigint — now a caller gets autocomplete, and a compile error the moment they pass a plain string where a branded Address was expected.

## Segment 4 (code: Result discriminated union)

A contract read can fail — bad endpoint, reverted call, timeout. Instead of a try-catch a caller might forget, encode failure directly in the return type: a Result type that's either ok-true with a value, or ok-false with an error string. That "ok" field is the tag of a discriminated union — inside an if-result-dot-ok block, TypeScript knows value exists and is a bigint; outside it, error exists instead. The compiler won't let you read value on a failed result.

## Segment 5 (steps: why this matters)

Stack all three together — const ABIs, typed wrappers, Result types — and an entire category of production incidents becomes a compile error instead of a 2am page: a typo'd function name, an address passed where an amount belonged, a forgotten check for a reverted call.

## Segment 6 (outro)

Next lesson: configuring a real TypeScript project — tsconfig, strict mode, and the settings a web3 repo actually needs.
