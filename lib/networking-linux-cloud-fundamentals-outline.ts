// Networking, Linux, Virtualization & Cloud Fundamentals course outline. Lessons without a
// contentDir render as "in production". Course 2 of 15 in the Cloud Engineer → Cloud Architect
// path: the networking, Linux, and virtualization foundation every cloud-support role builds on.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/networking-linux-cloud-fundamentals/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const NETWORKING_LINUX_CLOUD_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Networking Fundamentals",
    lessons: [
      L(1, "how-networks-move-data-packets-frames-and-the-osi-model", "How Networks Move Data: Packets, Frames & the OSI Model", { contentDir: "ch01/01-how-networks-move-data-packets-frames-and-the-osi-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/how-networks-move-data-packets-frames-and-the-osi-model.mp4", durationLabel: "1 min 56 s" }),
      L(2, "the-tcp-ip-model-and-how-it-maps-to-osi", "The TCP/IP Model & How It Maps to OSI", { contentDir: "ch01/02-the-tcp-ip-model-and-how-it-maps-to-osi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/the-tcp-ip-model-and-how-it-maps-to-osi.mp4", durationLabel: "2 min 7 s" }),
      L(3, "ip-addressing-and-subnetting-fundamentals", "IP Addressing & Subnetting Fundamentals", { contentDir: "ch01/03-ip-addressing-and-subnetting-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/ip-addressing-and-subnetting-fundamentals.mp4", durationLabel: "1 min 43 s" }),
      L(4, "ipv4-vs-ipv6", "IPv4 vs. IPv6", { contentDir: "ch01/04-ipv4-vs-ipv6", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/ipv4-vs-ipv6.mp4", durationLabel: "2 min 2 s" }),
      L(5, "common-network-ports-and-protocols", "Common Network Ports & Protocols You'll See Daily", { contentDir: "ch01/05-common-network-ports-and-protocols", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/common-network-ports-and-protocols.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 2,
    title: "Network Infrastructure & Services",
    lessons: [
      L(6, "switches-routers-and-how-traffic-actually-flows", "Switches, Routers & How Traffic Actually Flows"),
      L(7, "dns-how-names-become-addresses", "DNS: How Names Become Addresses"),
      L(8, "dhcp-and-dynamic-ip-assignment", "DHCP & Dynamic IP Assignment"),
      L(9, "nat-firewalls-and-basic-network-security", "NAT, Firewalls & Basic Network Security Concepts"),
    ],
  },
  {
    n: 3,
    title: "Linux Fundamentals I — The Shell & Filesystem",
    lessons: [
      L(10, "why-linux-runs-the-cloud", "Why Linux Runs the Cloud"),
      L(11, "the-linux-filesystem-hierarchy", "The Linux Filesystem Hierarchy"),
      L(12, "essential-shell-commands-for-navigation-and-files", "Essential Shell Commands for Navigation & Files"),
      L(13, "linux-users-groups-and-permissions", "Linux Users, Groups & Permissions"),
      L(14, "linux-package-management", "Package Management (apt, yum & dnf)"),
    ],
  },
  {
    n: 4,
    title: "Linux Fundamentals II — Administration",
    lessons: [
      L(15, "processes-services-and-systemd", "Processes, Services & systemd"),
      L(16, "ssh-remote-access-and-key-based-authentication", "SSH: Remote Access & Key-Based Authentication"),
      L(17, "linux-logs-and-where-to-look-when-something-breaks", "Linux Logs & Where to Look When Something Breaks"),
      L(18, "shell-scripting-basics-for-automation", "Shell Scripting Basics for Automation"),
    ],
  },
  {
    n: 5,
    title: "Virtualization Fundamentals",
    lessons: [
      L(19, "what-virtualization-actually-is-hypervisors", "What Virtualization Actually Is: Type 1 vs. Type 2 Hypervisors"),
      L(20, "virtual-machines-cpu-memory-and-storage-virtualization", "Virtual Machines: CPU, Memory & Storage Virtualization"),
      L(21, "containers-vs-virtual-machines", "Containers vs. Virtual Machines"),
      L(22, "why-cloud-computing-is-built-on-virtualization", "Why Cloud Computing Is Built on Virtualization"),
    ],
  },
  {
    n: 6,
    title: "Cloud Computing Fundamentals",
    lessons: [
      L(23, "iaas-paas-and-saas-the-service-models", "IaaS, PaaS & SaaS: The Cloud Service Models"),
      L(24, "the-shared-responsibility-model", "The Shared Responsibility Model"),
      L(25, "public-private-and-hybrid-cloud", "Public, Private & Hybrid Cloud"),
      L(26, "regions-availability-zones-and-why-they-matter", "Regions, Availability Zones & Why They Matter"),
    ],
  },
  {
    n: 7,
    title: "Cloud Networking & Storage Concepts",
    lessons: [
      L(27, "virtual-networks-vpcs-and-vnets", "Virtual Networks: VPCs and VNets"),
      L(28, "subnets-routing-tables-and-security-groups-in-the-cloud", "Subnets, Routing Tables & Security Groups in the Cloud"),
      L(29, "load-balancing-fundamentals", "Load Balancing Fundamentals"),
      L(30, "cloud-storage-types-object-block-and-file", "Cloud Storage Types: Object, Block & File"),
    ],
  },
  {
    n: 8,
    title: "Bringing It Together",
    lessons: [
      L(31, "lab-provisioning-and-networking-a-linux-vm-end-to-end", "Lab: Provisioning and Networking a Linux VM End to End"),
      L(32, "foundations-capstone-diagnosing-a-connectivity-problem", "Foundations Capstone: Diagnosing a Connectivity Problem"),
    ],
  },
];
