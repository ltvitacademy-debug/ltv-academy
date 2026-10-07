# Script — Building & Distributing Extensions

## Segment 1 (title)

A pybind11 source file isn't useful until it's compiled into a platform-specific binary Python can actually import. This lesson covers the two realistic ways to build one — CMake for local development, and a pip-installable package for everyone else.

## Segment 2 (code)

pybind11 ships a CMake function, pybind11_add_module, that wraps the normal add_library call, sets the right compiler flags, and names the output so Python recognizes it as an importable extension — a .pyd on Windows, a .so on Linux and macOS. You list your source files, turn on optimization, and build — this is the fast, iterate-quickly workflow while you're actively writing the extension.

## Segment 3 (steps)

There are really two build paths here, for two audiences. Calling CMake directly is what you use while developing, for fast rebuilds and full control. Wrapping that same CMake project behind pyproject-dot-toml and scikit-build-core is what you use to hand it to someone else — it drives CMake automatically the moment they run pip install.

## Segment 4 (code)

The pyproject.toml just declares scikit-build-core and pybind11 as build requirements, points at the scikit-build-core backend, and gives the package a name and version. From that point on, pip install dot compiles the extension and installs it, exactly like installing any other Python package from source.

## Segment 5 (steps)

One thing doesn't go away no matter how you build it: a compiled extension bakes in the target operating system's ABI and the exact Python version it was compiled against. That's why wheel filenames carry tags like cp311 win amd64. There's no universal binary — you build a matrix of wheels in CI, or you simply ship source and let pip compile it locally. "It works on my machine" almost always means a mismatched wheel tag.

## Segment 6 (outro)

So now there's a real bridge between Python and C++ — a module that builds, imports, and distributes. The real question left is when crossing that bridge is actually worth it, which is exactly where lesson thirty-four picks up: when to move code from Python to C++.
