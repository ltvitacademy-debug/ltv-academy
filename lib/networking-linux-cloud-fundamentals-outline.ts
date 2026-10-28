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
      L(6, "switches-routers-and-how-traffic-actually-flows", "Switches, Routers & How Traffic Actually Flows", { contentDir: "ch02/06-switches-routers-and-how-traffic-actually-flows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/switches-routers-and-how-traffic-actually-flows.mp4", durationLabel: "2 min 28 s" }),
      L(7, "dns-how-names-become-addresses", "DNS: How Names Become Addresses", { contentDir: "ch02/07-dns-how-names-become-addresses", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/dns-how-names-become-addresses.mp4", durationLabel: "2 min 14 s" }),
      L(8, "dhcp-and-dynamic-ip-assignment", "DHCP & Dynamic IP Assignment", { contentDir: "ch02/08-dhcp-and-dynamic-ip-assignment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/dhcp-and-dynamic-ip-assignment.mp4", durationLabel: "2 min 10 s" }),
      L(9, "nat-firewalls-and-basic-network-security", "NAT, Firewalls & Basic Network Security Concepts", { contentDir: "ch02/09-nat-firewalls-and-basic-network-security", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/nat-firewalls-and-basic-network-security.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 3,
    title: "Linux Fundamentals I — The Shell & Filesystem",
    lessons: [
      L(10, "why-linux-runs-the-cloud", "Why Linux Runs the Cloud", { contentDir: "ch03/10-why-linux-runs-the-cloud", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/why-linux-runs-the-cloud.mp4", durationLabel: "2 min 15 s" }),
      L(11, "the-linux-filesystem-hierarchy", "The Linux Filesystem Hierarchy", { contentDir: "ch03/11-the-linux-filesystem-hierarchy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/the-linux-filesystem-hierarchy.mp4", durationLabel: "2 min 20 s" }),
      L(12, "essential-shell-commands-for-navigation-and-files", "Essential Shell Commands for Navigation & Files", { contentDir: "ch03/12-essential-shell-commands-for-navigation-and-files", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/essential-shell-commands-for-navigation-and-files.mp4", durationLabel: "2 min 12 s" }),
      L(13, "linux-users-groups-and-permissions", "Linux Users, Groups & Permissions", { contentDir: "ch03/13-linux-users-groups-and-permissions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/linux-users-groups-and-permissions.mp4", durationLabel: "2 min 14 s" }),
      L(14, "linux-package-management", "Package Management (apt, yum & dnf)", { contentDir: "ch03/14-linux-package-management", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/linux-package-management.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 4,
    title: "Linux Fundamentals II — Administration",
    lessons: [
      L(15, "processes-services-and-systemd", "Processes, Services & systemd", { contentDir: "ch04/15-processes-services-and-systemd", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/processes-services-and-systemd.mp4", durationLabel: "2 min 23 s" }),
      L(16, "ssh-remote-access-and-key-based-authentication", "SSH: Remote Access & Key-Based Authentication", { contentDir: "ch04/16-ssh-remote-access-and-key-based-authentication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/ssh-remote-access-and-key-based-authentication.mp4", durationLabel: "2 min 10 s" }),
      L(17, "linux-logs-and-where-to-look-when-something-breaks", "Linux Logs & Where to Look When Something Breaks", { contentDir: "ch04/17-linux-logs-and-where-to-look-when-something-breaks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/linux-logs-and-where-to-look-when-something-breaks.mp4", durationLabel: "2 min 14 s" }),
      L(18, "shell-scripting-basics-for-automation", "Shell Scripting Basics for Automation", { contentDir: "ch04/18-shell-scripting-basics-for-automation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/shell-scripting-basics-for-automation.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
  {
    n: 5,
    title: "Virtualization Fundamentals",
    lessons: [
      L(19, "what-virtualization-actually-is-hypervisors", "What Virtualization Actually Is: Type 1 vs. Type 2 Hypervisors", { contentDir: "ch05/19-what-virtualization-actually-is-hypervisors", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/what-virtualization-actually-is-hypervisors.mp4", durationLabel: "2 min 16 s" }),
      L(20, "virtual-machines-cpu-memory-and-storage-virtualization", "Virtual Machines: CPU, Memory & Storage Virtualization", { contentDir: "ch05/20-virtual-machines-cpu-memory-and-storage-virtualization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/virtual-machines-cpu-memory-and-storage-virtualization.mp4", durationLabel: "2 min 30 s" }),
      L(21, "containers-vs-virtual-machines", "Containers vs. Virtual Machines", { contentDir: "ch05/21-containers-vs-virtual-machines", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/containers-vs-virtual-machines.mp4", durationLabel: "2 min 21 s" }),
      L(22, "why-cloud-computing-is-built-on-virtualization", "Why Cloud Computing Is Built on Virtualization", { contentDir: "ch05/22-why-cloud-computing-is-built-on-virtualization", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/why-cloud-computing-is-built-on-virtualization.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 6,
    title: "Cloud Computing Fundamentals",
    lessons: [
      L(23, "iaas-paas-and-saas-the-service-models", "IaaS, PaaS & SaaS: The Cloud Service Models", { contentDir: "ch06/23-iaas-paas-and-saas-the-service-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/iaas-paas-and-saas-the-service-models.mp4", durationLabel: "2 min 36 s" }),
      L(24, "the-shared-responsibility-model", "The Shared Responsibility Model", { contentDir: "ch06/24-the-shared-responsibility-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/the-shared-responsibility-model.mp4", durationLabel: "2 min 30 s" }),
      L(25, "public-private-and-hybrid-cloud", "Public, Private & Hybrid Cloud", { contentDir: "ch06/25-public-private-and-hybrid-cloud", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/public-private-and-hybrid-cloud.mp4", durationLabel: "2 min 29 s" }),
      L(26, "regions-availability-zones-and-why-they-matter", "Regions, Availability Zones & Why They Matter", { contentDir: "ch06/26-regions-availability-zones-and-why-they-matter", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/regions-availability-zones-and-why-they-matter.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 7,
    title: "Cloud Networking & Storage Concepts",
    lessons: [
      L(27, "virtual-networks-vpcs-and-vnets", "Virtual Networks: VPCs and VNets", { contentDir: "ch07/27-virtual-networks-vpcs-and-vnets", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/virtual-networks-vpcs-and-vnets.mp4", durationLabel: "2 min 16 s" }),
      L(28, "subnets-routing-tables-and-security-groups-in-the-cloud", "Subnets, Routing Tables & Security Groups in the Cloud", { contentDir: "ch07/28-subnets-routing-tables-and-security-groups-in-the-cloud", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/subnets-routing-tables-and-security-groups-in-the-cloud.mp4", durationLabel: "2 min 8 s" }),
      L(29, "load-balancing-fundamentals", "Load Balancing Fundamentals", { contentDir: "ch07/29-load-balancing-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/load-balancing-fundamentals.mp4", durationLabel: "2 min 28 s" }),
      L(30, "cloud-storage-types-object-block-and-file", "Cloud Storage Types: Object, Block & File", { contentDir: "ch07/30-cloud-storage-types-object-block-and-file", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/cloud-storage-types-object-block-and-file.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 8,
    title: "Bringing It Together",
    lessons: [
      L(31, "lab-provisioning-and-networking-a-linux-vm-end-to-end", "Lab: Provisioning and Networking a Linux VM End to End", { contentDir: "ch08/31-lab-provisioning-and-networking-a-linux-vm-end-to-end", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/lab-provisioning-and-networking-a-linux-vm-end-to-end.mp4", durationLabel: "2 min 34 s" }),
      L(32, "foundations-capstone-diagnosing-a-connectivity-problem", "Foundations Capstone: Diagnosing a Connectivity Problem", { contentDir: "ch08/32-foundations-capstone-diagnosing-a-connectivity-problem", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-networking-linux-cloud-fundamentals/foundations-capstone-diagnosing-a-connectivity-problem.mp4", durationLabel: "2 min 46 s" }),
    ],
  },
];
