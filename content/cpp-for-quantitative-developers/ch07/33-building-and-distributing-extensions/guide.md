# Building & Distributing Extensions

A pybind11 source file isn't useful until it's compiled into a platform-specific binary and installed where Python can find it. This lesson covers the two realistic ways to build a pybind11 extension — CMake for local/CI builds, and `scikit-build-core` for a `pip install`-able package — plus the metadata that makes the result distributable.

## What you'll learn

- Building a pybind11 module directly with CMake and `pybind11_add_module`
- Packaging that build behind `pyproject.toml` + `scikit-build-core` so `pip install .` works
- Why extension modules are platform- and Python-version-specific (the wheel tag problem)
- A sanity checklist for a build that compiles but won't import

## Building with CMake

`pybind11_add_module` is a CMake function pybind11 ships that wraps `add_library`, sets the right compiler flags, and names the output correctly for Python to import (`.pyd` on Windows, `.so` on Linux/macOS, with the right ABI tag):

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.15)
project(quantlib_cpp LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(extern/pybind11)
pybind11_add_module(quantlib_cpp src/pricer_module.cpp src/payoff.cpp)

target_compile_options(quantlib_cpp PRIVATE -O3)
```

```bash
cmake -S . -B build
cmake --build build --config Release
# produces build/quantlib_cpp*.so (or .pyd on Windows)
```

This is the right workflow while you're actively developing the extension — fast rebuilds, full control over compiler flags, easy to step through with a debugger.

## Packaging for pip install

To hand the extension to a teammate (or the capstone grader) as something they `pip install`, wrap the same CMake build in `pyproject.toml` using `scikit-build-core`, which drives CMake under the hood during `pip install`:

```toml
# pyproject.toml
[build-system]
requires = ["scikit-build-core>=0.8", "pybind11>=2.11"]
build-backend = "scikit_build_core.build"

[project]
name = "quantlib-cpp"
version = "0.1.0"
requires-python = ">=3.9"

[tool.scikit-build]
cmake.minimum-version = "3.15"
wheel.packages = ["python/quantlib_cpp"]
```

```bash
pip install .            # builds the extension and installs it
pip install -e .         # editable install, rebuilds on reimport in dev
python -m build --wheel  # produces a distributable .whl
```

## Why extensions are platform- and version-specific

A compiled extension embeds the target OS's ABI and the exact Python version's C API it was built against. A wheel built for Python 3.11 on Linux will not import under Python 3.12 on Windows — this is why PyPI wheel filenames carry tags like `quantlib_cpp-0.1.0-cp311-cp311-win_amd64.whl`. For a small internal library, building separate wheels per platform/version in CI (or simply distributing source and letting `pip` compile locally) is the normal answer; there is no way to produce one universal binary.

## A build-that-compiles-but-won't-import checklist

- **ImportError: DLL load failed / undefined symbol** — a C++ ABI mismatch, usually a Release/Debug mismatch between the extension and the Python interpreter it's loaded into, or a missing runtime dependency
- **Wrong Python picked up** — `cmake` found a different Python than the one running your script; pin it explicitly with `-DPython_EXECUTABLE=$(which python)`
- **Module compiles but a function is "missing"** — the C++ function was never added with `m.def(...)` inside `PYBIND11_MODULE`, or the module wasn't rebuilt after a change
- **Works locally, fails for a teammate** — almost always the wheel-tag problem above; confirm both are on the same OS/Python combination, or rebuild from source

## Key terms

| Term | Meaning |
|---|---|
| `pybind11_add_module` | CMake function that compiles a pybind11 source file into a correctly named Python extension |
| `scikit-build-core` | A `pyproject.toml` build backend that drives CMake so `pip install` works |
| Wheel tag | Encodes the target Python version, ABI, and platform a compiled wheel was built for |
| Editable install (`pip install -e .`) | Installs the package so local source edits are picked up without a full reinstall |

## Recap

CMake with `pybind11_add_module` is the right tool while developing; `scikit-build-core` behind `pyproject.toml` turns the same build into something `pip install` can run for a teammate, with the understanding that a compiled wheel is tied to one OS and one Python version. Next up, Lesson 34: When to Move Code From Python to C++.
