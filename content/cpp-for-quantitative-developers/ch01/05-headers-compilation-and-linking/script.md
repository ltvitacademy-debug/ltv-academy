# Script — Headers, Compilation & Linking

## Segment 1 (title)

Chapter one closes by connecting two things you've already seen: the compilation pipeline and functions. Real programs are split across files, and headers are what let code in one file use something declared in another. This lesson is about how that actually works.

## Segment 2 (code)

Here's the distinction everything else depends on. A declaration tells the compiler a name and its signature exist, nothing more. A definition is the actual implementation. Every definition works as a declaration too, but not the other way around — and that gap is exactly why headers are useful at all.

## Segment 3 (steps)

Say one file defines a pricing function and another file wants to call it. The compiler processes each file on its own and has no idea the function exists unless something tells it. A header solves this: it holds just the declaration, and both the file that defines the function and the file that calls it include that same header. The linker is what actually connects the call to the definition afterward.

## Segment 4 (code)

One more detail matters here. If a header's contents get included more than once in the same file — easy to happen indirectly through other headers — the compiler sees the same declarations twice, which is an error for something like a struct. This pragma tells the preprocessor to skip the file's contents the second time around. Every major compiler supports it.

## Segment 5 (steps)

Two linker errors come up constantly, and both are really just this declaration-versus-definition split breaking down. Undefined reference means the linker found a call to a function but never found its definition anywhere — usually a missing file in the build or a typo. Multiple definition means the same function body ended up in more than one object file — usually a full definition sitting in a header with no safeguard, included into two different source files.

## Segment 6 (outro)

Headers share declarations, the linker connects them to one true definition, and now you know what it's telling you when that breaks. That's chapter one. Up next, chapter two begins with lesson six: the stack, the heap, and object lifetime — where all of this data actually lives in memory.
