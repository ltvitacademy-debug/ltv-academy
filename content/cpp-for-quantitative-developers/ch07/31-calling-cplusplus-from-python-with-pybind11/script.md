# Script — Calling C++ From Python With pybind11

## Segment 1 (title)

Every optimization trick from the last chapter exists for one reason: somewhere, a hot loop is too slow in Python and needs to run in C++. This lesson closes that loop — turning a C++ function and class into something you can simply import from Python.

## Segment 2 (steps)

You have three options for bridging the two languages. Python's raw C API works but means hand-written reference counting and huge boilerplate for every function. ctypes needs no compiling, but it only understands flat C functions — no classes, no automatic conversion of richer types. pybind11 splits the difference: it reads your ordinary C++ declarations and generates all of that glue code for you.

## Segment 3 (code)

A pybind11 module is just a C++ file with one macro, PYBIND11_MODULE, naming the module Python will import. Inside it, m-dot-def binds a free function — here, a Black-Scholes call pricer — and py colon colon arg gives each parameter a name, so Python callers can pass spot, strike, rate, vol, and time to expiry as keyword arguments, exactly like a native Python function.

## Segment 4 (steps)

Functions alone aren't enough for real quant code — you want objects with state. py colon colon class underscore binds a C++ class itself; def with py colon colon init binds its constructor; and every other def binds a method the exact same way a free function is bound. A Bond class with a price method becomes a fully usable Python class with almost no extra code.

## Segment 5 (code)

Once compiled, the result looks like ordinary Python. You import quantlib_cpp, call black_scholes_call with keyword arguments, construct a Bond, and call price on it. The C++ doubles, ints, and class instance all convert automatically — no manual marshaling anywhere in sight.

## Segment 6 (outro)

That automatic conversion is exactly what breaks down the moment you want to hand a binding a whole NumPy array instead of one double — and that's where we go next, in lesson thirty-two: exposing numerical code to NumPy.
