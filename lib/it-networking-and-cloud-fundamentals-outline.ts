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
      L(1, "hardware-operating-systems-and-software", "Hardware, Operating Systems & Software", { contentDir: "ch01/01-hardware-operating-systems-and-software", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447205/ltv-it-networking-and-cloud-fundamentals/hardware-operating-systems-and-software.mp4", durationLabel: "1 min 46 s" }),
      L(2, "processes-memory-and-storage", "Processes, Memory & Storage", { contentDir: "ch01/02-processes-memory-and-storage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447331/ltv-it-networking-and-cloud-fundamentals/processes-memory-and-storage.mp4", durationLabel: "1 min 54 s" }),
      L(3, "servers-vs-clients", "Servers vs. Clients", { contentDir: "ch01/03-servers-vs-clients", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447475/ltv-it-networking-and-cloud-fundamentals/servers-vs-clients.mp4", durationLabel: "1 min 40 s" }),
      L(4, "virtual-machines-and-hypervisors", "Virtual Machines & Hypervisors", { contentDir: "ch01/04-virtual-machines-and-hypervisors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447623/ltv-it-networking-and-cloud-fundamentals/virtual-machines-and-hypervisors.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 2,
    title: "Networking Foundations",
    lessons: [
      L(5, "how-networks-work", "How Networks Work", { contentDir: "ch02/05-how-networks-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447855/ltv-it-networking-and-cloud-fundamentals/how-networks-work.mp4", durationLabel: "2 min 3 s" }),
      L(6, "the-osi-and-tcp-ip-models", "The OSI & TCP/IP Models", { contentDir: "ch02/06-the-osi-and-tcp-ip-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448024/ltv-it-networking-and-cloud-fundamentals/the-osi-and-tcp-ip-models.mp4", durationLabel: "2 min 12 s" }),
      L(7, "ip-addressing", "IP Addressing", { contentDir: "ch02/07-ip-addressing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448193/ltv-it-networking-and-cloud-fundamentals/ip-addressing.mp4", durationLabel: "2 min 18 s" }),
      L(8, "subnets-and-cidr", "Subnets & CIDR", { contentDir: "ch02/08-subnets-and-cidr", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448396/ltv-it-networking-and-cloud-fundamentals/subnets-and-cidr.mp4", durationLabel: "1 min 58 s" }),
      L(9, "switching-and-routing-basics", "Switching & Routing Basics", { contentDir: "ch02/09-switching-and-routing-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448537/ltv-it-networking-and-cloud-fundamentals/switching-and-routing-basics.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 3,
    title: "Core Protocols",
    lessons: [
      L(10, "dns", "DNS", { contentDir: "ch03/10-dns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792458801/ltv-it-networking-and-cloud-fundamentals/dns.mp4", durationLabel: "1 min 47 s" }),
      L(11, "dhcp", "DHCP", { contentDir: "ch03/11-dhcp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792458921/ltv-it-networking-and-cloud-fundamentals/dhcp.mp4", durationLabel: "1 min 40 s" }),
      L(12, "tcp-vs-udp", "TCP vs. UDP", { contentDir: "ch03/12-tcp-vs-udp", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459012/ltv-it-networking-and-cloud-fundamentals/tcp-vs-udp.mp4", durationLabel: "1 min 38 s" }),
      L(13, "http-and-https", "HTTP & HTTPS", { contentDir: "ch03/13-http-and-https", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459119/ltv-it-networking-and-cloud-fundamentals/http-and-https.mp4", durationLabel: "1 min 43 s" }),
      L(14, "tls-and-certificates", "TLS & Certificates", { contentDir: "ch03/14-tls-and-certificates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459218/ltv-it-networking-and-cloud-fundamentals/tls-and-certificates.mp4", durationLabel: "1 min 37 s" }),
    ],
  },
  {
    n: 4,
    title: "Network Security & Services",
    lessons: [
      L(15, "firewalls-and-security-groups", "Firewalls & Security Groups", { contentDir: "ch04/15-firewalls-and-security-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459364/ltv-it-networking-and-cloud-fundamentals/firewalls-and-security-groups.mp4", durationLabel: "2 min 5 s" }),
      L(16, "nat-and-port-forwarding", "NAT & Port Forwarding", { contentDir: "ch04/16-nat-and-port-forwarding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459449/ltv-it-networking-and-cloud-fundamentals/nat-and-port-forwarding.mp4", durationLabel: "1 min 53 s" }),
      L(17, "load-balancers-and-reverse-proxies", "Load Balancers & Reverse Proxies", { contentDir: "ch04/17-load-balancers-and-reverse-proxies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459530/ltv-it-networking-and-cloud-fundamentals/load-balancers-and-reverse-proxies.mp4", durationLabel: "1 min 47 s" }),
      L(18, "vpns-and-bastion-hosts", "VPNs & Bastion Hosts", { contentDir: "ch04/18-vpns-and-bastion-hosts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459602/ltv-it-networking-and-cloud-fundamentals/vpns-and-bastion-hosts.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 5,
    title: "Troubleshooting",
    lessons: [
      L(19, "ping-traceroute-and-dig", "ping, traceroute & dig", { contentDir: "ch05/19-ping-traceroute-and-dig", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459684/ltv-it-networking-and-cloud-fundamentals/ping-traceroute-and-dig.mp4", durationLabel: "1 min 57 s" }),
      L(20, "curl-netstat-and-ss", "curl, netstat & ss", { contentDir: "ch05/20-curl-netstat-and-ss", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459754/ltv-it-networking-and-cloud-fundamentals/curl-netstat-and-ss.mp4", durationLabel: "1 min 47 s" }),
      L(21, "a-troubleshooting-methodology", "A Troubleshooting Methodology", { contentDir: "ch05/21-a-troubleshooting-methodology", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459828/ltv-it-networking-and-cloud-fundamentals/a-troubleshooting-methodology.mp4", durationLabel: "1 min 48 s" }),
      L(22, "common-failure-scenarios", "Common Failure Scenarios", { contentDir: "ch05/22-common-failure-scenarios", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459895/ltv-it-networking-and-cloud-fundamentals/common-failure-scenarios.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 6,
    title: "Cloud Fundamentals",
    lessons: [
      L(23, "what-cloud-computing-is", "What Cloud Computing Is", { contentDir: "ch06/23-what-cloud-computing-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459967/ltv-it-networking-and-cloud-fundamentals/what-cloud-computing-is.mp4", durationLabel: "1 min 47 s" }),
      L(24, "iaas-paas-and-saas", "IaaS, PaaS & SaaS", { contentDir: "ch06/24-iaas-paas-and-saas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460052/ltv-it-networking-and-cloud-fundamentals/iaas-paas-and-saas.mp4", durationLabel: "2 min 12 s" }),
      L(25, "regions-and-availability", "Regions & Availability", { contentDir: "ch06/25-regions-and-availability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460133/ltv-it-networking-and-cloud-fundamentals/regions-and-availability.mp4", durationLabel: "2 min 3 s" }),
      L(26, "the-shared-responsibility-model", "The Shared Responsibility Model", { contentDir: "ch06/26-the-shared-responsibility-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460211/ltv-it-networking-and-cloud-fundamentals/the-shared-responsibility-model.mp4", durationLabel: "2 min 3 s" }),
      L(27, "cloud-cost-basics", "Cloud Cost Basics", { contentDir: "ch06/27-cloud-cost-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460305/ltv-it-networking-and-cloud-fundamentals/cloud-cost-basics.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(28, "capstone-kickoff-design-and-troubleshoot-a-small-network", "Capstone Kickoff: Design and Troubleshoot a Small Network", { contentDir: "ch07/28-capstone-kickoff-design-and-troubleshoot-a-small-network", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460390/ltv-it-networking-and-cloud-fundamentals/capstone-kickoff-design-and-troubleshoot-a-small-network.mp4", durationLabel: "2 min 1 s" }),
      L(29, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/29-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460469/ltv-it-networking-and-cloud-fundamentals/capstone-build-it.mp4", durationLabel: "2 min 3 s" }),
      L(30, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/30-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460567/ltv-it-networking-and-cloud-fundamentals/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
];
