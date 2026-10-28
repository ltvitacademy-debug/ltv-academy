// IT, Networking & Cybersecurity Fundamentals course outline. Lessons without a contentDir
// render as "in production". Course 2 of the Cybersecurity Analyst → Security Engineer path's
// Job-Ready Foundation stage — networking and security fundamentals every SOC analyst starts from.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/it-networking-cybersecurity-fundamentals/
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

export const IT_NETWORKING_CYBERSECURITY_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Networking Fundamentals I: The OSI & TCP/IP Models",
    lessons: [
      L(1, "the-osi-model-seven-layers-of-networking", "The OSI Model: Seven Layers of Networking", { contentDir: "ch01/01-the-osi-model-seven-layers-of-networking", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/the-osi-model-seven-layers-of-networking.mp4", durationLabel: "1 min 44 s" }),
      L(2, "the-tcpip-model-and-how-it-maps-to-osi", "The TCP/IP Model and How It Maps to OSI", { contentDir: "ch01/02-the-tcpip-model-and-how-it-maps-to-osi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/the-tcpip-model-and-how-it-maps-to-osi.mp4", durationLabel: "2 min 4 s" }),
      L(3, "network-topologies-and-physical-media", "Network Topologies and Physical Media", { contentDir: "ch01/03-network-topologies-and-physical-media", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/network-topologies-and-physical-media.mp4", durationLabel: "1 min 51 s" }),
      L(4, "ethernet-mac-addresses-and-switching-basics", "Ethernet, MAC Addresses, and Switching Basics", { contentDir: "ch01/04-ethernet-mac-addresses-and-switching-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/ethernet-mac-addresses-and-switching-basics.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 2,
    title: "Networking Fundamentals II: IP Addressing & Routing",
    lessons: [
      L(5, "ipv4-addressing-and-subnetting", "IPv4 Addressing and Subnetting", { contentDir: "ch02/05-ipv4-addressing-and-subnetting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/ipv4-addressing-and-subnetting.mp4", durationLabel: "1 min 55 s" }),
      L(6, "ipv6-addressing-fundamentals", "IPv6 Addressing Fundamentals", { contentDir: "ch02/06-ipv6-addressing-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/ipv6-addressing-fundamentals.mp4", durationLabel: "1 min 48 s" }),
      L(7, "routing-basics-how-packets-find-their-way", "Routing Basics: How Packets Find Their Way", { contentDir: "ch02/07-routing-basics-how-packets-find-their-way", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/routing-basics-how-packets-find-their-way.mp4", durationLabel: "1 min 41 s" }),
      L(8, "nat-dhcp-and-dns-in-practice", "NAT, DHCP, and DNS in Practice", { contentDir: "ch02/08-nat-dhcp-and-dns-in-practice", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/nat-dhcp-and-dns-in-practice.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 3,
    title: "Ports, Protocols & Network Services",
    lessons: [
      L(9, "tcp-vs-udp-and-the-three-way-handshake", "TCP vs. UDP and the Three-Way Handshake", { contentDir: "ch03/09-tcp-vs-udp-and-the-three-way-handshake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/tcp-vs-udp-and-the-three-way-handshake.mp4", durationLabel: "2 min 20 s" }),
      L(10, "common-ports-and-protocols-every-analyst-must-know", "Common Ports and Protocols Every Analyst Must Know", { contentDir: "ch03/10-common-ports-and-protocols-every-analyst-must-know", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/common-ports-and-protocols-every-analyst-must-know.mp4", durationLabel: "2 min 34 s" }),
      L(11, "network-services-web-email-file-transfer", "Network Services: Web, Email, File Transfer", { contentDir: "ch03/11-network-services-web-email-file-transfer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/network-services-web-email-file-transfer.mp4", durationLabel: "2 min 21 s" }),
      L(12, "wireless-networking-and-wifi-security-basics", "Wireless Networking and Wi-Fi Security Basics", { contentDir: "ch03/12-wireless-networking-and-wifi-security-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/wireless-networking-and-wifi-security-basics.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 4,
    title: "Cybersecurity Foundations: Core Concepts",
    lessons: [
      L(13, "the-cia-triad-confidentiality-integrity-availability", "The CIA Triad: Confidentiality, Integrity, Availability", { contentDir: "ch04/13-the-cia-triad-confidentiality-integrity-availability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/the-cia-triad-confidentiality-integrity-availability.mp4", durationLabel: "2 min 25 s" }),
      L(14, "threat-actors-motivations-and-attack-surfaces", "Threat Actors, Motivations, and Attack Surfaces", { contentDir: "ch04/14-threat-actors-motivations-and-attack-surfaces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/threat-actors-motivations-and-attack-surfaces.mp4", durationLabel: "2 min 43 s" }),
      L(15, "vulnerabilities-threats-and-risk-how-they-relate", "Vulnerabilities, Threats, and Risk: How They Relate", { contentDir: "ch04/15-vulnerabilities-threats-and-risk-how-they-relate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/vulnerabilities-threats-and-risk-how-they-relate.mp4", durationLabel: "2 min 20 s" }),
      L(16, "the-cybersecurity-kill-chain-and-mitre-attck-framework", "The Cybersecurity Kill Chain and the MITRE ATT&CK Framework", { contentDir: "ch04/16-the-cybersecurity-kill-chain-and-mitre-attck-framework", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/the-cybersecurity-kill-chain-and-mitre-attck-framework.mp4", durationLabel: "2 min 42 s" }),
    ],
  },
  {
    n: 5,
    title: "Authentication, Access Control & Cryptography Basics",
    lessons: [
      L(17, "authentication-factors-and-multi-factor-authentication", "Authentication Factors and Multi-Factor Authentication", { contentDir: "ch05/17-authentication-factors-and-multi-factor-authentication", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/authentication-factors-and-multi-factor-authentication.mp4", durationLabel: "2 min 9 s" }),
      L(18, "authorization-models-rbac-dac-mac", "Authorization Models: RBAC, DAC, MAC", { contentDir: "ch05/18-authorization-models-rbac-dac-mac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/authorization-models-rbac-dac-mac.mp4", durationLabel: "2 min 23 s" }),
      L(19, "symmetric-vs-asymmetric-encryption", "Symmetric vs. Asymmetric Encryption", { contentDir: "ch05/19-symmetric-vs-asymmetric-encryption", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/symmetric-vs-asymmetric-encryption.mp4", durationLabel: "2 min 8 s" }),
      L(20, "hashing-digital-signatures-and-pki-basics", "Hashing, Digital Signatures, and PKI Basics", { contentDir: "ch05/20-hashing-digital-signatures-and-pki-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/hashing-digital-signatures-and-pki-basics.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 6,
    title: "Common Attack Types & Social Engineering",
    lessons: [
      L(21, "malware-types-viruses-worms-trojans-ransomware", "Malware Types: Viruses, Worms, Trojans, Ransomware", { contentDir: "ch06/21-malware-types-viruses-worms-trojans-ransomware", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-it-networking-cybersecurity-fundamentals/malware-types-viruses-worms-trojans-ransomware.mp4", durationLabel: "2 min 20 s" }),
      L(22, "social-engineering-phishing-pretexting-and-baiting", "Social Engineering: Phishing, Pretexting, and Baiting", { contentDir: "ch06/22-social-engineering-phishing-pretexting-and-baiting" }),
      L(23, "network-attacks-mitm-dosddos-and-spoofing", "Network Attacks: MITM, DoS/DDoS, and Spoofing", { contentDir: "ch06/23-network-attacks-mitm-dosddos-and-spoofing" }),
      L(24, "web-application-attacks-injection-and-xss-basics", "Web Application Attacks: Injection and XSS Basics", { contentDir: "ch06/24-web-application-attacks-injection-and-xss-basics" }),
    ],
  },
  {
    n: 7,
    title: "Security Policy, Governance & Defense in Depth",
    lessons: [
      L(25, "defense-in-depth-and-the-security-layered-model", "Defense in Depth and the Security Layered Model", { contentDir: "ch07/25-defense-in-depth-and-the-security-layered-model" }),
      L(26, "security-policies-standards-and-acceptable-use", "Security Policies, Standards, and Acceptable Use", { contentDir: "ch07/26-security-policies-standards-and-acceptable-use" }),
      L(27, "compliance-frameworks-nist-iso-27001-and-why-they-matter", "Compliance Frameworks: NIST, ISO 27001, and Why They Matter", { contentDir: "ch07/27-compliance-frameworks-nist-iso-27001-and-why-they-matter" }),
      L(28, "physical-security-and-environmental-controls", "Physical Security and Environmental Controls", { contentDir: "ch07/28-physical-security-and-environmental-controls" }),
    ],
  },
  {
    n: 8,
    title: "Putting It Together: Lab & Capstone",
    lessons: [
      L(29, "building-a-home-lab-for-security-practice", "Building a Home Lab for Security Practice", { contentDir: "ch08/29-building-a-home-lab-for-security-practice" }),
      L(30, "packet-capture-basics-reading-traffic-with-wireshark", "Packet Capture Basics: Reading Traffic with Wireshark", { contentDir: "ch08/30-packet-capture-basics-reading-traffic-with-wireshark" }),
      L(31, "case-study-tracing-an-attack-through-the-kill-chain", "Case Study: Tracing an Attack Through the Kill Chain", { contentDir: "ch08/31-case-study-tracing-an-attack-through-the-kill-chain" }),
      L(32, "chapter-capstone-networking-and-security-fundamentals-review", "Chapter Capstone: Networking & Security Fundamentals Review", { contentDir: "ch08/32-chapter-capstone-networking-and-security-fundamentals-review" }),
    ],
  },
];
