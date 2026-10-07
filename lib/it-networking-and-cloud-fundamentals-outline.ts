// The IT, Networking & Cloud Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 1 of the DevOps Engineer path. No prior IT background assumed.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/it-networking-and-cloud-fundamentals/
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

export const IT_NETWORKING_AND_CLOUD_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "How Computers Work",
    lessons: [
      L(1, "hardware-operating-systems-and-software", "Hardware, Operating Systems & Software", { contentDir: "ch01/01-hardware-operating-systems-and-software" }),
      L(2, "processes-memory-and-storage", "Processes, Memory & Storage", { contentDir: "ch01/02-processes-memory-and-storage" }),
      L(3, "servers-vs-clients", "Servers vs. Clients", { contentDir: "ch01/03-servers-vs-clients" }),
      L(4, "virtual-machines-and-hypervisors", "Virtual Machines & Hypervisors", { contentDir: "ch01/04-virtual-machines-and-hypervisors" }),
    ],
  },
  {
    n: 2,
    title: "Networking Foundations",
    lessons: [
      L(5, "how-networks-work", "How Networks Work", { contentDir: "ch02/05-how-networks-work" }),
      L(6, "the-osi-and-tcp-ip-models", "The OSI & TCP/IP Models", { contentDir: "ch02/06-the-osi-and-tcp-ip-models" }),
      L(7, "ip-addressing", "IP Addressing", { contentDir: "ch02/07-ip-addressing" }),
      L(8, "subnets-and-cidr", "Subnets & CIDR", { contentDir: "ch02/08-subnets-and-cidr" }),
      L(9, "switching-and-routing-basics", "Switching & Routing Basics", { contentDir: "ch02/09-switching-and-routing-basics" }),
    ],
  },
  {
    n: 3,
    title: "Core Protocols",
    lessons: [
      L(10, "dns", "DNS", { contentDir: "ch03/10-dns" }),
      L(11, "dhcp", "DHCP", { contentDir: "ch03/11-dhcp" }),
      L(12, "tcp-vs-udp", "TCP vs. UDP", { contentDir: "ch03/12-tcp-vs-udp" }),
      L(13, "http-and-https", "HTTP & HTTPS", { contentDir: "ch03/13-http-and-https" }),
      L(14, "tls-and-certificates", "TLS & Certificates", { contentDir: "ch03/14-tls-and-certificates" }),
    ],
  },
  {
    n: 4,
    title: "Network Security & Services",
    lessons: [
      L(15, "firewalls-and-security-groups", "Firewalls & Security Groups", { contentDir: "ch04/15-firewalls-and-security-groups" }),
      L(16, "nat-and-port-forwarding", "NAT & Port Forwarding", { contentDir: "ch04/16-nat-and-port-forwarding" }),
      L(17, "load-balancers-and-reverse-proxies", "Load Balancers & Reverse Proxies", { contentDir: "ch04/17-load-balancers-and-reverse-proxies" }),
      L(18, "vpns-and-bastion-hosts", "VPNs & Bastion Hosts", { contentDir: "ch04/18-vpns-and-bastion-hosts" }),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting",
    lessons: [
      L(19, "ping-traceroute-and-dig", "ping, traceroute & dig", { contentDir: "ch05/19-ping-traceroute-and-dig" }),
      L(20, "curl-netstat-and-ss", "curl, netstat & ss", { contentDir: "ch05/20-curl-netstat-and-ss" }),
      L(21, "a-troubleshooting-methodology", "A Troubleshooting Methodology", { contentDir: "ch05/21-a-troubleshooting-methodology" }),
      L(22, "common-failure-scenarios", "Common Failure Scenarios", { contentDir: "ch05/22-common-failure-scenarios" }),
    ],
  },
  {
    n: 6,
    title: "Cloud Fundamentals",
    lessons: [
      L(23, "what-cloud-computing-is", "What Cloud Computing Is", { contentDir: "ch06/23-what-cloud-computing-is" }),
      L(24, "iaas-paas-and-saas", "IaaS, PaaS & SaaS", { contentDir: "ch06/24-iaas-paas-and-saas" }),
      L(25, "regions-and-availability", "Regions & Availability", { contentDir: "ch06/25-regions-and-availability" }),
      L(26, "the-shared-responsibility-model", "The Shared Responsibility Model", { contentDir: "ch06/26-the-shared-responsibility-model" }),
      L(27, "cloud-cost-basics", "Cloud Cost Basics", { contentDir: "ch06/27-cloud-cost-basics" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff-design-and-troubleshoot-a-small-network", "Capstone Kickoff: Design and Troubleshoot a Small Network", { contentDir: "ch07/28-capstone-kickoff-design-and-troubleshoot-a-small-network" }),
      L(29, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/29-capstone-build-it" }),
      L(30, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/30-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
