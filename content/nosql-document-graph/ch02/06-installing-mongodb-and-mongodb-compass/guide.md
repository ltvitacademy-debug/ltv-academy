# Installing MongoDB & MongoDB Compass

Lesson 5 covered MongoDB's storage hierarchy in the abstract. Before the rest of this
chapter goes further, you need an actual MongoDB server to point commands at. This lesson
walks through the two realistic ways to get one running locally, and installs the tool
you'll use to look inside it: MongoDB Compass, the official free GUI. Nothing here is
optional scaffolding — every later lesson's shell commands and CRUD examples assume you
have a running `mongod` and a way to browse what's in it.

## What you'll learn

- The two realistic paths to a local MongoDB server: the official Community Server
  installer, or Docker's official `mongo` image
- What MongoDB Compass actually is, and why it's the tool a relational DBA should reach
  for first, the way you'd reach for SSMS against SQL Server
- The ordered steps to install, start, and connect to a local MongoDB instance

## Path one: MongoDB Community Server

MongoDB Community Server is the free, source-available edition of the database engine
itself — the `mongod` process. Real, ordered install steps:

1. **Download** the installer from `mongodb.com/try/download/community`, picking your OS
   (an MSI for Windows, a Homebrew formula for macOS, or `.deb`/`.rpm` packages via
   MongoDB's own apt/yum repositories for Linux).
2. **Install** it. On Windows, the MSI installer offers to register MongoDB as a Windows
   Service, so `mongod` starts automatically with the machine — no separate step needed.
   On Linux, the package sets up a `systemd` unit (`sudo systemctl start mongod`).
3. **Confirm it's running.** By default, `mongod` listens on port `27017` and stores data
   files in a default data directory (`/data/db` on Linux/macOS, or a path under
   `Program Files` on Windows, configurable either way).

This is the direct equivalent of installing a SQL Server instance — one server process,
one default port, one place data files live.

## Path two: Docker's official mongo image

If you'd rather not install anything system-wide — especially useful for the disposable
lab environment this course set up in Lesson 4 — Docker's official `mongo` image gets a
server running in two commands:

```
docker pull mongo
docker run --name mongodb -d -p 27017:27017 \
  -v mongodb-data:/data/db mongo
```

The `-p 27017:27017` maps the container's MongoDB port to your machine's, so it's
reachable exactly like a native install. The `-v mongodb-data:/data/db` mounts a named
Docker volume for the data directory, so your data survives a container restart — without
it, deleting the container deletes your data too. This is genuinely the fastest path from
zero to a working `mongod`, and it's what many real MongoDB developers use for local work.

## MongoDB Compass: the real official GUI

MongoDB Compass is MongoDB's own free, official GUI client — the closest thing MongoDB
has to SSMS. It's a separate download (`mongodb.com/try/download/compass`, and on some
platforms it's offered alongside the Community Server installer). Connecting is a short,
ordered flow:

1. **Open Compass.**
2. **New Connection** — paste a connection string. For a local default install or the
   Docker container above, that's `mongodb://localhost:27017`.
3. **Connect.**
4. **Browse** — the left sidebar lists every database, and inside each one, every
   collection. Clicking a collection shows its documents, lets you edit them directly,
   run filter queries through a query bar, and — on the tab most relevant going forward —
   run commands through an embedded shell.

Compass won't replace the shell commands the rest of this chapter builds on, but it's the
fastest way to actually look at what those commands did, and it's where you'll visually
confirm the documents, collections, and databases from Lesson 5's hierarchy really do look
the way that lesson described.

## Key terms

| Term | Meaning |
|---|---|
| `mongod` | The MongoDB server daemon process; listens on port 27017 by default |
| MongoDB Compass | MongoDB's free, official GUI client for browsing and querying data |
| Connection string | A URI like `mongodb://localhost:27017` used by any client to reach a server |
| Docker `mongo` image | The official, pre-built MongoDB server image on Docker Hub |

## Check yourself

You're setting up a throwaway lab environment you'll tear down and rebuild often. Which
of the two install paths in this lesson fits that better, and why?
