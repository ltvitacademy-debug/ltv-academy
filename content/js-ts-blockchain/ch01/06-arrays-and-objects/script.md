# Script — Arrays & Objects

## Segment 1 (title)

Arrays and objects are how JavaScript structures more than one value at a time, and they're exactly the shape real blockchain data arrives in — a block containing a list of transactions, each one a small object of its own.

## Segment 2 (code: arrays)

An array is an ordered list. The first element is always at index 0, not 1 — a detail that trips up every beginner at least once. length tells you how many elements it holds, and push adds one more to the end.

## Segment 3 (code: objects)

An object holds named properties instead of numbered positions. Dot notation is the common style for reading them; bracket notation does the same thing and is required when the property name is stored in a variable instead of written directly.

## Segment 4 (code: nesting)

Real blockchain data is almost never one flat value — it's an object, like a block, containing an array of its transactions, where each transaction is itself an object. Reading block.transactions zero dot to chains property access and array indexing together, and that pattern shows up constantly once this course starts working with real contract data.

## Segment 5 (code: missing properties)

Accessing a property that doesn't exist on an object doesn't throw an error in JavaScript — it quietly returns undefined. That's forgiving, but it also means a typo in a property name fails silently instead of loudly.

## Segment 6 (outro)

Arrays for ordered lists, objects for named properties, and nesting them together to match real-world data shapes. Next up: the console and debugging — actually seeing what your code is doing.
