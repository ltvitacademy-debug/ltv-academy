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
      L(1, "hardware-operating-systems-and-software", "Hardware, Operating Systems & Software"),
      L(2, "processes-memory-and-storage", "Processes, Memory & Storage"),
      L(3, "servers-vs-clients", "Servers vs. Clients"),
      L(4, "virtual-machines-and-hypervisors", "Virtual Machines & Hypervisors"),
    ],
  },
  {
    n: 2,
    title: "Networking Foundations",
    lessons: [
      L(5, "how-networks-work", "How Networks Work"),
      L(6, "the-osi-and-tcp-ip-models", "The OSI & TCP/IP Models"),
      L(7, "ip-addressing", "IP Addressing"),
      L(8, "subnets-and-cidr", "Subnets & CIDR"),
      L(9, "switching-and-routing-basics", "Switching & Routing Basics"),
    ],
  },
  {
    n: 3,
    title: "Core Protocols",
    lessons: [
      L(10, "dns", "DNS"),
      L(11, "dhcp", "DHCP"),
      L(12, "tcp-vs-udp", "TCP vs. UDP"),
      L(13, "http-and-https", "HTTP & HTTPS"),
      L(14, "tls-and-certificates", "TLS & Certificates"),
    ],
  },
  {
    n: 4,
    title: "Network Security & Services",
    lessons: [
      L(15, "firewalls-and-security-groups", "Firewalls & Security Groups"),
      L(16, "nat-and-port-forwarding", "NAT & Port Forwarding"),
      L(17, "load-balancers-and-reverse-proxies", "Load Balancers & Reverse Proxies"),
      L(18, "vpns-and-bastion-hosts", "VPNs & Bastion Hosts"),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting",
    lessons: [
      L(19, "ping-traceroute-and-dig", "ping, traceroute & dig"),
      L(20, "curl-netstat-and-ss", "curl, netstat & ss"),
      L(21, "a-troubleshooting-methodology", "A Troubleshooting Methodology"),
      L(22, "common-failure-scenarios", "Common Failure Scenarios"),
    ],
  },
  {
    n: 6,
    title: "Cloud Fundamentals",
    lessons: [
      L(23, "what-cloud-computing-is", "What Cloud Computing Is"),
      L(24, "iaas-paas-and-saas", "IaaS, PaaS & SaaS"),
      L(25, "regions-and-availability", "Regions & Availability"),
      L(26, "the-shared-responsibility-model", "The Shared Responsibility Model"),
      L(27, "cloud-cost-basics", "Cloud Cost Basics"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff-design-and-troubleshoot-a-small-network", "Capstone Kickoff: Design and Troubleshoot a Small Network"),
      L(29, "capstone-build-it", "Capstone: Build It"),
      L(30, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
