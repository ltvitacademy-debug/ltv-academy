# Script — Installing MongoDB & MongoDB Compass

## Segment 1 (title)

Before the rest of this chapter goes further, you need an actual MongoDB server to point commands at. This lesson gets you a running local server and installs MongoDB Compass, the official GUI you'll use to look inside it.

## Segment 2 (steps: MongoDB Community Server)

The first path: MongoDB Community Server. Download the installer for your OS from mongodb.com, install it — on Windows it registers as a Windows Service, on Linux it's a systemd unit — and confirm it's running. By default, mongod listens on port 27017.

## Segment 3 (code: Docker's official mongo image)

If you'd rather not install anything system-wide, Docker's official mongo image gets a server running in two commands. Map the container's port to your machine's with -p 27017:27017, and mount a named volume so your data survives a restart.

## Segment 4 (steps: MongoDB Compass)

MongoDB Compass is MongoDB's own free, official GUI — the closest thing to SSMS. Open it, start a new connection with mongodb://localhost:27017, connect, and browse every database and collection in the left sidebar.

## Segment 5 (outro)

Compass won't replace the shell commands ahead, but it's the fastest way to see what they actually did. Next up: BSON, the real binary format every MongoDB document is stored in.
