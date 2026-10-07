## Segment 1 (title)

Lesson Eleven used CMD and left it there. There's a second instruction, ENTRYPOINT, that looks similar but behaves differently -- and understanding both lets Northbridge build one image that's sensible by default but still flexible.

## Segment 2 (code)

Exec form, the JSON array, runs the command directly as the container's main process, PID one -- it gets signals like SIGTERM from docker stop directly. Shell form wraps it in slash bin slash sh dash c instead, which becomes PID one, so signals go to the shell, not necessarily to the app. Northbridge standardizes on exec form everywhere.

## Segment 3 (code)

With only CMD set, docker run can replace the entire command by appending one -- running node debug.js instead of node server.js, no questions asked. Useful for a one-off debugging session, but it also means anyone running the image can accidentally start the wrong thing.

## Segment 4 (code)

ENTRYPOINT behaves differently -- it isn't replaced by arguments on docker run, they're appended to it instead. Running the image with dash dash inspect doesn't override node server.js, it runs node server.js dash dash inspect. Good for an image that should always run the same program, accepting only extra flags.

## Segment 5 (steps)

Combine them and you get the pattern Northbridge actually ships: ENTRYPOINT fixes the program, node server.js, and CMD supplies a default argument, the port, that docker run can still override by appending its own.

## Segment 6 (outro)

That's CMD versus ENTRYPOINT. Next up: multi-stage builds -- separating the tools used to build an app from what actually ships, and shrinking the image in the process.
