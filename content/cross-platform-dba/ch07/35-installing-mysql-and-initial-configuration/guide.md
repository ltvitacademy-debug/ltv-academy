# Installing MySQL and Initial Configuration

Every earlier platform in this course had its own installation ritual — Oracle's is notoriously
heavy, involving a database creation wizard and a listener to configure. MySQL's installation is
deliberately lighter, which is part of why it spread so widely through web hosting and
application stacks. This lesson walks the real install flow, on Linux with a package manager and
with Docker, and the one script every fresh MySQL install should run before anything touches it.

## What you'll learn

- Installing MySQL via a Linux distribution's package manager
- Running MySQL in a container with Docker, and why that's now a common production pattern
- What `mysql_secure_installation` actually does, step by step
- How to confirm the server is up and reachable before moving on

## Installing via a package manager

On Debian/Ubuntu-family systems, MySQL (or its fork MariaDB, which ships by default on some
distributions) installs through the system package manager:

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl enable --now mysql
sudo systemctl status mysql
```

On Red Hat/CentOS/Oracle Linux systems, the equivalent is `dnf install mysql-server` (or MySQL's
own official `.rpm` repository, since some distributions substitute MariaDB by default and a
package literally named `mysql-server` doesn't always mean Oracle's MySQL). The package manager
handles the binary install and registers a `systemd` service, but on a fresh install the server
starts with no root password set through the normal path — some distributions generate a
temporary one and log it, which is the first thing to look for.

## Installing via Docker

Running MySQL in a container is now a completely normal pattern for local development and
increasingly for production, especially inside Kubernetes:

```bash
docker run --name mysql-dev \
  -e MYSQL_ROOT_PASSWORD=changeme \
  -p 3306:3306 \
  -v mysql-data:/var/lib/mysql \
  -d mysql:8.0
```

The official `mysql` image on Docker Hub accepts environment variables that set the root
password and can create a database and a non-root user on first startup (`MYSQL_DATABASE`,
`MYSQL_USER`, `MYSQL_PASSWORD`). The named volume (`mysql-data` above) is what makes the data
survive a container restart — without it, `docker rm` on the container destroys the database
along with it.

## Running mysql_secure_installation

Whether installed via package manager or built from source, MySQL ships a script that should run
immediately after install, before the server does any real work:

```bash
sudo mysql_secure_installation
```

This is an interactive script that walks through a fixed checklist: optionally set up the
`validate_password` component to enforce password strength, set (or confirm) the root password,
remove anonymous user accounts that some installs create by default, disable remote root login so
`root` can only connect from `localhost`, remove the `test` database and the privileges that grant
access to it, and reload the privilege tables so the changes take effect immediately. None of
these are cosmetic — each one closes a specific, well-known attack surface on a default MySQL
install, and this lesson's hardening details get a full lesson of their own later in Chapter 8.

## Confirming the server is up

```bash
mysql -u root -p -e "SELECT VERSION();"
```

A successful connection and version string confirms the server accepted the connection, the
credentials are correct, and the client can actually reach the port — the same "can I even get
in" check a SQL Server DBA runs with `sqlcmd` after any fresh install.

## Key terms

| Term | Meaning |
|---|---|
| `mysql_secure_installation` | Official post-install hardening script; sets root password, removes anonymous users and the test database |
| `systemctl` | Linux service manager used to start, stop, and check the MySQL service on package-manager installs |
| Named volume | A Docker-managed storage location that keeps container data alive across container restarts/removal |
| `MYSQL_ROOT_PASSWORD` | Docker environment variable that sets the root password on first container startup |

## Check yourself

If you `docker run` a MySQL container without a `-v` volume flag, what happens to your data the
first time you remove and recreate that container, and why?
