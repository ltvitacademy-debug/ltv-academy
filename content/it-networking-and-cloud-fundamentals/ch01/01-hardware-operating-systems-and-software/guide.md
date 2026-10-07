# Hardware, Operating Systems & Software

Welcome to IT, Networking & Cloud Fundamentals, the first course on the DevOps Engineer path. Before you can automate a deployment pipeline or reason about a cloud outage, you need a solid mental model of what a computer actually is — the physical parts, the program that manages those parts, and the applications that run on top. This lesson builds that model from the ground up, using the same vocabulary you'll hear constantly once you reach servers, virtualization, and the cloud.

## What you'll learn

- The four pieces of hardware every computer needs: CPU, memory (RAM), storage, and a network interface
- What an operating system actually does for you, in plain terms
- How application software, the OS, and hardware relate to each other as layers
- Why this layered model matters once you start working with servers at Northbridge Retail

## The hardware layer

Strip away everything else, and a computer is four pieces of physical equipment working together:

- **CPU (Central Processing Unit)** — the chip that actually executes instructions, one at a time, billions of times per second.
- **RAM (memory)** — fast, temporary workspace. Whatever the CPU is actively working on lives here. Power off, and RAM's contents disappear.
- **Storage** — the slower, permanent home for data: an SSD or hard drive. Files, installed programs, and the operating system itself live here even when the power is off.
- **Network interface (NIC)** — the hardware that lets the machine talk to other machines, whether that's a laptop's Wi-Fi card or a data center server's wired network port.

Every device you'll touch in this path — a laptop, a rack server, a cloud virtual machine — is built from some version of these four pieces.

## What an operating system actually does

The operating system (OS) is the software that sits directly on top of the hardware and manages it on behalf of everything else. Three jobs matter most for this path:

1. **Process scheduling** — deciding which program gets to use the CPU, and for how long, so dozens of programs can appear to run "at the same time" on hardware that can really only do one thing at once per core.
2. **Memory management** — handing out chunks of RAM to programs as they need it, and taking it back when they close, so one misbehaving program can't simply grab all the memory on the machine.
3. **Device and file access** — giving programs a consistent way to read a file, print a document, or send network traffic, without each program needing to know the exact hardware details underneath.

Windows, Linux, and macOS are all operating systems doing the same three jobs, with different designs and different default tools. In this course, and across the DevOps path, Linux shows up constantly because it's the operating system of choice for most servers and cloud infrastructure.

## Where software fits

"Software" is a broader word than "operating system." An application — a web browser, a point-of-sale program, a database engine — is software that runs *through* the operating system, never talking to hardware directly. At Northbridge Retail, the checkout terminals in every store run a point-of-sale application on top of a Linux-based OS, while the buyers and merchandisers in the corporate office use ordinary productivity software on Windows laptops. Same three-layer model — hardware, OS, application — in both cases, just different choices at each layer.

## Key terms

| Term | Meaning |
|---|---|
| CPU | The chip that executes instructions; the "brain" of the computer |
| RAM | Fast, temporary memory that loses its contents when powered off |
| Storage | Slower, permanent storage for data and programs (SSD/HDD) |
| Operating system (OS) | Software that manages hardware and runs applications on top of it (Windows, Linux, macOS) |
| Application | Software that runs through the OS to do a specific job for a user |

## Recap

A computer is hardware (CPU, RAM, storage, network interface) managed by an operating system (scheduling processes, managing memory, handling devices and files), which in turn runs applications on behalf of users. That three-layer model — hardware, OS, software — is the lens you'll use for the rest of this course. Next up, Lesson 2: processes, memory, and storage in more depth.
