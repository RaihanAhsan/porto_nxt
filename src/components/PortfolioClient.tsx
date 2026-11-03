"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import NavbarLinks from "./NavbarLinks";
import { useLanguage, Language } from "@/context/LanguageContext";

interface SkillInfo {
  name: string;
  category: string;
  level: number;
  description: string;
  descriptionId: string;
  icon: string;
}

const SKILLS_DATA: SkillInfo[] = [
  {
    name: "Python",
    category: "python",
    level: 95,
    description:
      "High-performance backend APIs, data pipelines & AI integrations with FastAPI & Flask.",
    descriptionId:
      "Backend API berkinerja tinggi, pipeline data & integrasi AI dengan FastAPI & Flask.",
    icon: "fab fa-python",
  },
  {
    name: "Laravel",
    category: "laravel",
    level: 94,
    description:
      "Enterprise multi-tenant SaaS architectures, Eloquent ORM, Livewire & queue workers.",
    descriptionId:
      "Arsitektur SaaS multi-tenant skala enterprise, Eloquent ORM, Livewire & queue workers.",
    icon: "fab fa-laravel",
  },
  {
    name: "Next.js",
    category: "saas",
    level: 93,
    description:
      "Full-stack React framework with App Router, Server Components (SSR/ISR), API routes, and edge-ready performance.",
    descriptionId:
      "Framework React full-stack dengan App Router, Server Components (SSR/ISR), dan performa tinggi.",
    icon: "fab fa-react",
  },
  {
    name: "React",
    category: "saas",
    level: 90,
    description:
      "Component-driven interactive UIs with TypeScript, Framer Motion, and modern state management.",
    descriptionId:
      "Antarmuka interaktif berbasis komponen dengan TypeScript, Framer Motion, dan state management modern.",
    icon: "fab fa-react",
  },
  {
    name: "Vue.js",
    category: "laravel",
    level: 88,
    description:
      "Reactive frontend interfaces paired seamlessly with Laravel & Inertia.js ecosystems.",
    descriptionId:
      "Antarmuka frontend reaktif yang terintegrasi mulus dengan ekosistem Laravel & Inertia.js.",
    icon: "fab fa-vuejs",
  },
  {
    name: "Node.js",
    category: "saas",
    level: 86,
    description:
      "Real-time microservices, WebSockets, and event-driven API backends.",
    descriptionId:
      "Microservices real-time, WebSockets, dan backend API berbasis event.",
    icon: "fab fa-node-js",
  },
  {
    name: "PostgreSQL",
    category: "db",
    level: 92,
    description:
      "Complex relational modeling, query optimization, indexing, and high-availability setups.",
    descriptionId:
      "Pemodelan database relasional kompleks, optimasi query, indexing, dan ketersediaan tinggi.",
    icon: "fas fa-database",
  },
  {
    name: "AWS",
    category: "saas",
    level: 85,
    description:
      "Cloud infrastructure, Docker containers, CI/CD pipelines, S3, EC2 & serverless deployments.",
    descriptionId:
      "Infrastruktur cloud, Docker container, pipeline CI/CD, S3, EC2 & serverless deployment.",
    icon: "fab fa-aws",
  },
  {
    name: "REST APIs",
    category: "python",
    level: 96,
    description:
      "Secure, versioned, OpenAPI-documented RESTful services with OAuth2 & JWT authentication.",
    descriptionId:
      "Layanan RESTful aman, terdokumentasi OpenAPI dengan autentikasi OAuth2 & JWT.",
    icon: "fas fa-network-wired",
  },
  {
    name: "GraphQL",
    category: "db",
    level: 84,
    description:
      "Flexible schema-driven API queries and real-time subscriptions for complex B2B clients.",
    descriptionId:
      "Query API berbasis skema fleksibel dan langganan real-time untuk klien B2B kompleks.",
    icon: "fas fa-project-diagram",
  },
];

const CORE_PILLARS = [
  {
    id: "python",
    title: "Python",
    subtitle: "FastAPI, Flask, AI Pipelines",
    icon: "fab fa-python",
    proficiency: 95,
  },
  {
    id: "laravel",
    title: "Laravel",
    subtitle: "PHP, Eloquent, Livewire",
    icon: "fab fa-laravel",
    proficiency: 94,
  },
  {
    id: "saas",
    title: "Next.js & SaaS",
    subtitle: "App Router, Multi-tenant, Stripe",
    icon: "fas fa-cloud",
    proficiency: 93,
  },
  {
    id: "db",
    title: "Databases",
    subtitle: "PostgreSQL, MySQL, Redis",
    icon: "fas fa-database",
    proficiency: 90,
  },
];

interface ProjectInfo {
  id: string;
  title: string;
  titleId: string;
  category: string;
  icon: string;
  tags: string[];
  description: string;
  descriptionId: string;
  featuresEn: string[];
  featuresId: string[];
  metrics: string;
  statusLabelEn?: string;
  statusLabelId?: string;
  statusColor?: string;
  githubUrl?: string;
  serverNoteEn?: string;
  serverNoteId?: string;
  demoUrl: string;
  displayUrl: string;
  liveEmbed?: boolean;
  screenshotPath?: string;
  cyberTheme?: boolean;
  galleryImages?: {
    src: string;
    labelEn: string;
    labelId: string;
    terminalPreview?: string[];
  }[];
}

const PROJECTS_DATA: ProjectInfo[] = [
  {
    id: "pos-system",
    title: "Modern Point of Sale (POS) System",
    titleId: "Sistem Kasir & Point of Sale (POS) Modern",
    category: "Web App & SaaS",
    icon: "fas fa-cash-register",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "POS & Inventory", "Golang"],
    description:
      "A fast, responsive web-based Point of Sale (POS) application designed for retail and F&B operations. Built with a clean cashier interface for instant product lookup, cart management, automated tax/discount calculation, and real-time transaction workflows.",
    descriptionId:
      "Aplikasi Point of Sale (POS) berbasis web yang cepat dan responsif untuk operasional ritel maupun F&B. Dilengkapi antarmuka kasir modern untuk pencarian produk instan, manajemen keranjang belanja, kalkulasi transaksi otomatis, serta pencatatan penjualan real-time.",
    featuresEn: [
      "Interactive cashier terminal with instant product search & category filtering",
      "Real-time shopping cart, quantity control, and automatic total/receipt calculation",
      "Responsive layout optimized for desktop monitors, tablets, and mobile devices",
    ],
    featuresId: [
      "Terminal kasir interaktif dengan pencarian produk instan & filter kategori",
      "Keranjang belanja real-time, pengaturan kuantitas, dan kalkulasi struk otomatis",
      "Desain responsif yang optimal di layar monitor kasir, tablet, maupun HP",
    ],
    metrics: "Live Production • Fast Checkout UI",
    demoUrl: "https://posapp-v1-iota.vercel.app/",
    displayUrl: "posapp-v1-iota.vercel.app",
    liveEmbed: true,
    screenshotPath: "/img/pos-preview.png",
  },
  {
    id: "server-security-monitoring",
    title: "Real-time Server Security & Threat Monitoring System",
    titleId: "Sistem Keamanan Server & Deteksi Ancaman Real-Time",
    category: "Security & DevOps",
    icon: "fas fa-shield-alt",
    tags: [
      "Ubuntu",
      "Bash Scripting",
      "Nginx",
      "Fail2ban",
      "UFW",
      "Telegram API",
      "Systemd",
      "Cloudflare Tunnel",
    ],
    description:
      "A custom automated security monitoring system for Ubuntu Linux. It parses system and Nginx logs in real-time to detect threats (SQLi, Brute-force, File Tampering), blocking malicious IPs via Fail2ban, and sending instant alerts to a Telegram Bot.",
    descriptionId:
      "Sistem pemantauan keamanan otomatis kustom untuk server Ubuntu Linux. Memproses log sistem dan Nginx secara real-time untuk mendeteksi ancaman (SQL Injection, Brute-force, modifikasi file ilegal), memblokir IP berbahaya otomatis via Fail2ban, serta mengirim peringatan instan ke Bot Telegram.",
    featuresEn: [
      "Real-time Nginx & system log parsing for SQLi, XSS, and SSH brute-force detection",
      "Automated IP blocking/unblocking via Fail2ban & UFW managed by Systemd daemons",
      "Instant Telegram Bot SOC alerts for file tampering (/shell.php), sudo command execution & SSH logins",
    ],
    featuresId: [
      "Parsing log Nginx & sistem secara real-time untuk deteksi SQLi, XSS, dan brute-force SSH",
      "Pemblokiran IP otomatis dengan Fail2ban & UFW yang dikelola oleh daemon Systemd",
      "Notifikasi instan Bot Telegram untuk modifikasi file (/shell.php), eksekusi command sudo & login SSH",
    ],
    metrics: "24/7 SOC Daemon • Instant Telegram Alerts",
    demoUrl: "#security-gallery",
    displayUrl: "soc-daemon://ubuntu-security-monitor",
    liveEmbed: false,
    cyberTheme: true,
    galleryImages: [
      {
        src: "/images/security-project/web-attack.png",
        labelEn: "Web Attack Detected (SQL Injection / XSS Pattern)",
        labelId: "Deteksi Serangan Web (Pola SQL Injection / XSS)",
        terminalPreview: [
          "🚨 WEB ATTACK DETECTED! 🚨",
          "🌐 Attacker IP : [REDACTED]",
          "🎯 Request : GET /?id=1' UNION SELECT username, password FROM users-- HTTP/1.1",
          "📝 Details : Detected SQL Injection / XSS pattern",
          "🕒 Time : 04 Nov 2026, 02:18:42 WIB",
        ],
      },
      {
        src: "/images/security-project/file-alert.png",
        labelEn: "Server File Integrity Alert (MODIFY /shell.php)",
        labelId: "Peringatan Modifikasi File Server (MODIFY /shell.php)",
        terminalPreview: [
          "🚨 SERVER FILE ALERT 🚨",
          "⚠️ Level : WARNING",
          "🌐 Host (domain) : done-mime-wood-connections.trycloudflare.com",
          "⚙️ Event : MODIFY",
          "📁 File : /var/www/.../shell.php • 04 Nov 2026, 02:21:51 WIB",
        ],
      },
      {
        src: "/images/security-project/command-exec.png",
        labelEn: "Privilege Command Execution Audit (sudo rm -f /shell.php)",
        labelId: "Audit Eksekusi Perintah Privileged (sudo rm -f /shell.php)",
        terminalPreview: [
          "🛠️ COMMAND EXECUTION 🛠️",
          "🌐 IP Address : [REDACTED] • 👤 User : [REDACTED]",
          "💻 Command : sudo rm -f /var/www/.../shell.php",
          "📝 Status : ✅ Success",
          "🕒 Time : 04 Nov 2026, 02:22:58 WIB",
        ],
      },
      {
        src: "/images/security-project/failed-login.png",
        labelEn: "SSH Failed Login & Fail2ban IP Ban Alert",
        labelId: "Peringatan Gagal Login SSH & Pemblokiran IP Fail2ban",
        terminalPreview: [
          "⚠️ FAILED LOGIN ATTEMPT ⚠️",
          "🔢 Failed Attempts : 3 time(s)",
          "📝 Details : Unknown username (attempted: hack)",
          "🚨 ALERT! IP 192.168.18.23 has been BANNED by Fail2ban due to suspicious activity.",
        ],
      },
    ],
  },
  {
    id: "smart-weather",
    title: "Smart Weather Station Dashboard (IoT)",
    titleId: "Dashboard Stasiun Cuaca Pintar (IoT BMKG)",
    category: "Python & IoT",
    icon: "fas fa-cloud-sun-rain",
    tags: [
      "Next.js",
      "FastAPI (Python)",
      "VPS Ubuntu",
      "RS485 Sensor",
      "IoT Telemetry",
      "BMKG Standard",
    ],
    description:
      "An ongoing real-time meteorological station system built in accordance with BMKG standards. Industrial weather sensors connected via RS485 serial interface transmit environmental data to a FastAPI backend hosted on an Ubuntu VPS, streaming live telemetry directly to a Next.js dashboard.",
    descriptionId:
      "Sistem stasiun cuaca pintar real-time (masih dalam tahap pengerjaan / On Going) yang mengacu pada standar BMKG. Sensor cuaca hardware yang terkoneksi melalui antarmuka komunikasi RS485 mengirimkan data ke backend FastAPI di server VPS Ubuntu, lalu ditampilkan secara langsung pada dashboard Next.js.",
    featuresEn: [
      "Hardware weather sensors integrated via RS485 industrial serial protocol for accurate telemetry",
      "FastAPI (Python) backend deployed on an Ubuntu VPS for real-time data ingestion & streaming",
      "Interactive Next.js dashboard visualizing BMKG-standard weather parameters (On Going)",
    ],
    featuresId: [
      "Sensor hardware cuaca terkoneksi menggunakan protokol komunikasi serial RS485",
      "Backend FastAPI (Python) berjalan di atas server VPS Ubuntu untuk penerimaan data sensor real-time",
      "Dashboard web Next.js interaktif untuk visualisasi data cuaca standar BMKG (On Going)",
    ],
    metrics: "On Going • RS485 + VPS Ubuntu",
    statusLabelEn: "On Going",
    statusLabelId: "Masih Dikerjakan",
    statusColor: "#fbbf24",
    demoUrl: "#projects",
    displayUrl: "weather-iot.raihanahsan.site",
    liveEmbed: false,
  },
  {
    id: "factory-inventory",
    title: "Factory & Automated Inventory System",
    titleId: "Sistem Pengelolaan Pabrik & Otomasi Inventori",
    category: "Laravel & Automation",
    icon: "fas fa-industry",
    tags: [
      "Laravel",
      "PHP",
      "Python",
      "Telegram Bot API",
      "MySQL / PostgreSQL",
      "nudirafactory.my.id",
    ],
    description:
      "End-to-end operational management platform combining a real-time Laravel web portal for factory production tracking (previously deployed at nudirafactory.my.id) with an automated database-connected Telegram Bot for instant stock opname (SO) verification and QRIS transaction logging.",
    descriptionId:
      "Platform manajemen operasional terpadu yang menggabungkan web pengelolaan pabrik real-time berbasis Laravel (telah di-deploy pada nudirafactory.my.id) dengan sistem inventori otomatis berbasis Bot Telegram yang terhubung ke database untuk efisiensi Stock Opname (SO) dan integrasi QRIS.",
    featuresEn: [
      "Real-time factory production & stock movement monitoring built with Laravel & PHP (nudirafactory.my.id)",
      "Automated Telegram Bot integration for instant stock queries & Stock Opname (SO)",
      "Integrated QRIS digital payment recording and discrepancy-free monthly reporting",
    ],
    featuresId: [
      "Pemantauan produksi pabrik & pergerakan stok barang real-time berbasis Laravel (nudirafactory.my.id)",
      "Integrasi Bot Telegram otomatis untuk cek stok instan & pencegahan selisih Stock Opname",
      "Pencatatan pembayaran QRIS terintegrasi serta laporan bulanan akurat",
    ],
    metrics: "nudirafactory.my.id • Internal ERP",
    statusLabelEn: "Server Inactive",
    statusLabelId: "Server Nonaktif",
    statusColor: "#38bdf8",
    serverNoteEn:
      "Note: Previously deployed at nudirafactory.my.id (server hosting is currently offline as the company has not renewed the server subscription; source code is private under company confidentiality).",
    serverNoteId:
      "Catatan: Sebelumnya telah di-deploy di nudirafactory.my.id (saat ini server tidak aktif karena pihak PT belum memperpanjang sewa server; repositori bersifat privat/rahasia perusahaan).",
    demoUrl: "#projects",
    displayUrl: "nudirafactory.my.id",
    liveEmbed: false,
  },
];

const MARQUEE_ITEMS = [
  { icon: "fab fa-python", label: "Python" },
  { icon: "fab fa-laravel", label: "Laravel" },
  { icon: "fab fa-react", label: "React & Next.js" },
  { icon: "fab fa-vuejs", label: "Vue.js" },
  { icon: "fas fa-bolt", label: "FastAPI" },
  { icon: "fas fa-database", label: "PostgreSQL" },
  { icon: "fas fa-memory", label: "Redis" },
  { icon: "fab fa-docker", label: "Docker" },
  { icon: "fab fa-aws", label: "AWS Cloud" },
  { icon: "fab fa-stripe", label: "Stripe Billing" },
  { icon: "fas fa-brain", label: "LangChain & AI" },
  { icon: "fab fa-git-alt", label: "CI/CD Pipelines" },
  { icon: "fab fa-golang", label: "Golang" },
];

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "こんにちは",
  "Hallå",
  "Guten tag",
  "Halo",
];

const ROLES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Python & Next.js Expert",
  "Laravel Architect",
  "SaaS & B2B Builder",
];

// Simpan status preloader di memori modul agar navigasi antar halaman tidak memicu ulang loading screen
let hasShownPreloader = false;

export default function PortfolioClient() {
  const { lang, toggleLang } = useLanguage();

  // Preloader State: hanya aktif jika belum pernah ditampilkan
  const [preloaderActive, setPreloaderActive] = useState(
    () => !hasShownPreloader
  );
  const [greetingIndex, setGreetingIndex] = useState(0);

  // Dynamic Hero Role State
  const [roleIndex, setRoleIndex] = useState(0);

  // Navigation State
  const [activeSection, setActiveSection] = useState<
    "hero" | "skills" | "projects"
  >("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoScrolled, setLogoScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const suppressSpyRef = useRef(false);

  // Skills & Projects Filter State
  const [selectedSkill, setSelectedSkill] = useState<SkillInfo>(SKILLS_DATA[0]);
  const [projectFilter, setProjectFilter] = useState("All");

  // Contact Modal & Copy Email State
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Interactive Project Preview Modal & Gallery State
  const [previewProject, setPreviewProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const openProjectModal = (project: ProjectInfo) => {
    setGalleryIndex(0);
    setPreviewProject(project);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewProject?.galleryImages?.length) return;
    setGalleryIndex((prev) =>
      prev === 0 ? previewProject.galleryImages!.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!previewProject?.galleryImages?.length) return;
    setGalleryIndex((prev) =>
      prev === previewProject.galleryImages!.length - 1 ? 0 : prev + 1
    );
  };

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Preloader Effect (hanya berjalan 1x saat pertama kali website dibuka)
  useEffect(() => {
    const alreadyShownInSession =
      hasShownPreloader ||
      (typeof window !== "undefined" &&
        sessionStorage.getItem("raihan_preloader_shown") === "true");

    if (alreadyShownInSession) {
      hasShownPreloader = true;
      setPreloaderActive(false);
      document.body.classList.remove("preloader-active");
      return;
    }

    document.body.classList.add("preloader-active");

    let current = 0;
    let timer: NodeJS.Timeout;

    const finishPreloader = () => {
      hasShownPreloader = true;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("raihan_preloader_shown", "true");
      }
      setPreloaderActive(false);
      document.body.classList.remove("preloader-active");
    };

    const stepGreeting = () => {
      if (current >= GREETINGS.length - 1) {
        timer = setTimeout(finishPreloader, 650);
        return;
      }
      const delay = current === 0 ? 750 : 180;
      timer = setTimeout(() => {
        current += 1;
        setGreetingIndex(current);
        stepGreeting();
      }, delay);
    };

    stepGreeting();

    const fallback = setTimeout(finishPreloader, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallback);
      document.body.classList.remove("preloader-active");
    };
  }, []);

  // 2. Role Cycling Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // 3. Cursor Glow Tracking (Hanya untuk perangkat mouse/desktop agar scroll HP ringan)
  useEffect(() => {
    const cursorBg = document.getElementById("cursor-bg");
    if (!cursorBg) return;

    let ticking = false;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          cursorBg.style.setProperty("--mouse-x", `${x}%`);
          cursorBg.style.setProperty("--mouse-y", `${y}%`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  // 4. Scroll Spy & Navbar Shadow + Hero Logo Observer (rAF-throttled)
  useEffect(() => {
    // Jika datang dari halaman lain dengan hash (#skills / #projects), langsung arahkan tanpa mampir ke hero
    const hash = window.location.hash.replace("#", "");
    if (hash === "skills" || hash === "projects" || hash === "hero") {
      setActiveSection(hash);
      suppressSpyRef.current = true;
      setTimeout(() => {
        suppressSpyRef.current = false;
      }, 750);
    }

    let scrollTicking = false;
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const nextScrolled = scrollY > 20;
      const nextLogoScrolled = scrollY > window.innerHeight * 0.65;

      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
      setLogoScrolled((prev) =>
        prev !== nextLogoScrolled ? nextLogoScrolled : prev
      );

      if (!suppressSpyRef.current) {
        const sections: ("hero" | "skills" | "projects")[] = [
          "hero",
          "skills",
          "projects",
        ];
        const scrollPos = scrollY + 140;
        let current: "hero" | "skills" | "projects" = "hero";

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            current = id;
          }
        }
        setActiveSection((prev) => (prev !== current ? current : prev));
      }
      scrollTicking = false;
    };

    const onScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollState);
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 5. Escape Key Handler for Modals
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setPreviewProject(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when modal or mobile menu open
  useEffect(() => {
    if (preloaderActive) return;
    if (contactOpen || mobileMenuOpen || previewProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [contactOpen, mobileMenuOpen, previewProject, preloaderActive]);

  const scrollToSection = (
    e: React.MouseEvent,
    id: "hero" | "skills" | "projects"
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    suppressSpyRef.current = true;
    setTimeout(() => {
      suppressSpyRef.current = false;
    }, 900);

    const target = document.getElementById(id);
    if (target) {
      const navHeight = 72;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mraihanahsan@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    projectFilter === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === projectFilter);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Animated Multi-Language Preloader */}
      <AnimatePresence>
        {preloaderActive && (
          <motion.div
            id="preloader"
            initial={{ y: 0 }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <div className="preloader-content">
              <motion.div
                key={greetingIndex}
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.16 }}
                className="preloader-text"
              >
                <span className="preloader-dot" />
                <span>{GREETINGS[greetingIndex]}</span>
              </motion.div>
              <div className="preloader-bar-wrap">
                <div
                  className="preloader-bar-fill"
                  style={{
                    width: `${((greetingIndex + 1) / GREETINGS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cursor Glow & Ambient Background */}
      <div
        id="cursor-bg"
        style={
          {
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          } as React.CSSProperties
        }
      />
      <div className="bg-grid-pattern" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />

      {/* Navbar */}
      <nav
        id="navbar"
        className={`navbar ${isScrolled ? "scrolled-nav" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="nav-left">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className={`nav-logo ${logoScrolled ? "scrolled" : ""}`}
            >
              <span className="logo-first">Raihan</span>
              <span className="logo-dot">.</span>
              <span className="logo-last">Ahsan</span>
            </a>
          </div>

          <NavbarLinks
            activeId={activeSection}
            lang={lang}
            mobileMenuOpen={mobileMenuOpen}
            onSelectSection={scrollToSection}
            onCloseMobileMenu={() => setMobileMenuOpen(false)}
            onOpenContact={() => setContactOpen(true)}
          />

          <div className="nav-right">
            {/* Language Switcher EN / ID (Default EN) */}
            <button
              type="button"
              className="lang-switch-btn"
              onClick={toggleLang}
              aria-label="Switch language between English and Indonesian"
            >
              <span className={`lang-opt ${lang === "en" ? "active" : ""}`}>
                EN
              </span>
              <span className={`lang-opt ${lang === "id" ? "active" : ""}`}>
                ID
              </span>
            </button>

            <div className="desktop-contact">
              <MagneticButton
                className="nav-contact-btn"
                onClick={() => setContactOpen(true)}
              >
                <i className="fas fa-paper-plane" />{" "}
                {lang === "en" ? "Contact" : "Kontak"}
              </MagneticButton>
            </div>
            <button
              type="button"
              className={`nav-toggle ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`nav-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Hero Section */}
      <section id="hero">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Intro & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={!preloaderActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={!preloaderActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="hero-badge">
                  <span className="status-dot" />
                  <i className="fas fa-code" />{" "}
                  {lang === "en"
                    ? "Available for collaborations"
                    : "Tersedia untuk kolaborasi"}
                </span>
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 25 }}
                animate={!preloaderActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.65 }}
              >
                Raihan <span className="gradient-name">Ahsan</span>
              </motion.h1>

              <motion.div
                className="hero-role-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={!preloaderActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    className="hero-role-dynamic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="hero-role-static"
                >
                  &bull; Python &bull; PHP &bull; Next.js
                </motion.span>
              </motion.div>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={!preloaderActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {lang === "en" ? (
                  <>
                    Building scalable <strong>SaaS</strong> and{" "}
                    <strong>B2B</strong> solutions with clean code, modern
                    architecture, and a user-first mindset.
                  </>
                ) : (
                  <>
                    Membangun solusi <strong>SaaS</strong> dan{" "}
                    <strong>B2B</strong> skalabel dengan kode bersih, arsitektur
                    modern, dan fokus pada pengalaman pengguna.
                  </>
                )}
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={!preloaderActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <MagneticButton
                  href="#projects"
                  className="btn btn-primary"
                  onClick={(e) => scrollToSection(e, "projects")}
                >
                  <i className="fas fa-rocket" />{" "}
                  {lang === "en" ? "View Projects" : "Lihat Proyek"}
                </MagneticButton>
                <MagneticButton
                  className="btn btn-outline"
                  onClick={() => setContactOpen(true)}
                >
                  <i className="fas fa-paper-plane" />{" "}
                  {lang === "en" ? "Let's Talk" : "Hubungi Saya"}
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive Floating Code Window */}
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={!preloaderActive ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.8, type: "spring" }}
            >
              <motion.div
                className="floating-badge floating-badge-1"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fab fa-python" />
                <span>FastAPI + Next.js</span>
              </motion.div>

              <TiltCard className="code-window" intensity={8}>
                <div className="code-header">
                  <div className="code-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="code-filename">architect.py — RaihanOS</span>
                </div>
                <div className="code-body">
                  <div className="code-line">
                    <span className="line-num">1</span>
                    <span>
                      <span className="kw">class</span>{" "}
                      <span className="fn">SoftwareEngineer</span>:
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">2</span>
                    <span>
                      &nbsp;&nbsp;<span className="kw">def</span>{" "}
                      <span className="fn">__init__</span>(self):
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">3</span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;self.<span className="prop">name</span> ={" "}
                      <span className="str">&quot;Raihan Ahsan&quot;</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">4</span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;self.<span className="prop">stack</span> = [
                      <span className="str">&quot;Python&quot;</span>,{" "}
                      <span className="str">&quot;Laravel&quot;</span>,{" "}
                      <span className="str">&quot;Next.js&quot;</span>]
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">5</span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;self.<span className="prop">focus</span> ={" "}
                      <span className="str">&quot;Scalable SaaS &amp; B2B&quot;</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">6</span>
                    <span>&nbsp;</span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">7</span>
                    <span>
                      &nbsp;&nbsp;<span className="kw">async def</span>{" "}
                      <span className="fn">ship_product</span>(self):
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-num">8</span>
                    <span>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span>{" "}
                      &#123;<span className="str">&quot;quality&quot;</span>:{" "}
                      <span className="num">100</span>,{" "}
                      <span className="str">&quot;ready&quot;</span>:{" "}
                      <span className="kw">True</span>&#125;
                    </span>
                  </div>
                </div>
              </TiltCard>

              <motion.div
                className="floating-badge floating-badge-2"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <i className="fab fa-laravel" style={{ color: "#ff2d20" }} />
                <span>Multi-Tenant SaaS</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Tech Marquee */}
      <div className="tech-marquee-wrap" aria-hidden="true">
        <div className="tech-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <i className={item.icon} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">
              {lang === "en" ? "— Expertise" : "— Keahlian"}
            </span>
            <h2 className="section-title">
              {lang === "en"
                ? "Tech Stack & Approach"
                : "Teknologi & Pendekatan"}
            </h2>
            <p className="section-subtitle">
              {lang === "en"
                ? "From backend APIs to frontend experiences — I build full-cycle solutions with a focus on performance, security, and scalability."
                : "Dari API backend hingga antarmuka frontend — saya membangun solusi menyeluruh dengan fokus pada performa, keamanan, dan skalabilitas."}
            </p>
          </motion.div>

          <div className="skills-grid">
            <motion.div
              className="skills-summary"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {lang === "en" ? (
                <>
                  <p>
                    I&apos;m{" "}
                    <span className="highlight-text">Raihan Ahsan</span>, a
                    Software Engineer with a passion for crafting robust digital
                    products. I specialize in{" "}
                    <span className="highlight-text">Python</span>,{" "}
                    <span className="highlight-text">Laravel</span>, and{" "}
                    <span className="highlight-text">Next.js</span> ecosystems,
                    delivering SaaS and B2B platforms that solve real business
                    problems.
                  </p>
                  <p>
                    My approach combines clean architecture, test-driven
                    development, and continuous delivery — ensuring every
                    project is built to last.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Saya <span className="highlight-text">Raihan Ahsan</span>,
                    seorang Software Engineer yang berfokus membangun produk
                    digital tangguh. Saya memiliki spesialisasi di ekosistem{" "}
                    <span className="highlight-text">Python</span>,{" "}
                    <span className="highlight-text">Laravel</span>, dan{" "}
                    <span className="highlight-text">Next.js</span> untuk
                    menghadirkan platform SaaS dan B2B yang menjawab kebutuhan
                    bisnis nyata.
                  </p>
                  <p>
                    Pendekatan saya memadukan clean architecture, pengujian
                    terukur, dan continuous delivery agar setiap proyek siap
                    tumbuh jangka panjang.
                  </p>
                </>
              )}

              {/* Interactive Skill Pills */}
              <div className="skill-tags">
                {SKILLS_DATA.map((skill) => (
                  <motion.button
                    key={skill.name}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`skill-pill ${
                      selectedSkill.name === skill.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill.name}
                  </motion.button>
                ))}
              </div>

              {/* Dynamic Skill Spotlight Detail Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSkill.name}
                  className="skill-detail-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <i
                        className={selectedSkill.icon}
                        style={{ color: "var(--accent-3)" }}
                      />
                      <strong style={{ color: "#fff", fontSize: "0.95rem" }}>
                        {selectedSkill.name}
                      </strong>
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {lang === "en"
                        ? selectedSkill.description
                        : selectedSkill.descriptionId}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* 4 Core Pillar 3D Tilt Cards */}
            <motion.div
              className="skill-cards-grid"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {CORE_PILLARS.map((pillar) => {
                const isHighlighted = selectedSkill.category === pillar.id;
                return (
                  <TiltCard
                    key={pillar.id}
                    className={`skill-card ${
                      isHighlighted ? "highlighted" : ""
                    }`}
                    intensity={10}
                  >
                    <span className="skill-card-icon">
                      <i className={pillar.icon} />
                    </span>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.subtitle}</p>
                  </TiltCard>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="projects-header">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">— Portfolio</span>
              <h2 className="section-title">
                {lang === "en" ? "Featured Projects" : "Proyek Unggulan"}
              </h2>
              <p className="section-subtitle">
                {lang === "en"
                  ? "Production-grade architectures & interactive live demos."
                  : "Arsitektur siap produksi & demo interaktif."}
              </p>
            </motion.div>

            {/* Interactive Category Filter */}
            <motion.div
              className="project-filters"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {[
                "All",
                "Web App & SaaS",
                "Security & DevOps",
                "Python & IoT",
                "Laravel & Automation",
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${
                    projectFilter === cat ? "active" : ""
                  }`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat === "All" && lang === "id" ? "Semua" : cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Vertical Stack of Project Showcases (Card + Side-by-Side Description & Screenshot) */}
          <motion.div layout className="projects-vertical-list">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isExternalLive = project.demoUrl.startsWith("http");
                return (
                  <motion.div
                    key={project.id}
                    layout
                    className={`project-showcase-row ${
                      project.cyberTheme ? "cyber-project-row" : ""
                    }`}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    onClick={() => {
                      if (project.galleryImages?.length) {
                        openProjectModal(project);
                      }
                    }}
                    style={
                      project.galleryImages?.length
                        ? { cursor: "pointer" }
                        : undefined
                    }
                  >
                    {/* Left Column: Browser Mockup & Live Screenshot Preview */}
                    <TiltCard className="project-screenshot-card" intensity={5}>
                      <div className="project-browser-bar">
                        <div className="code-dots">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="project-browser-url">
                          <i
                            className={
                              project.cyberTheme
                                ? "fas fa-terminal"
                                : "fas fa-lock"
                            }
                          />
                          <span>
                            {project.cyberTheme
                              ? project.displayUrl
                              : `https://${project.displayUrl}`}
                          </span>
                        </div>
                        {isExternalLive && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} in new tab`}
                            style={{
                              color: "var(--accent-3)",
                              fontSize: "0.8rem",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fas fa-external-link-alt" />
                          </a>
                        )}
                      </div>

                      <div className="project-browser-viewport">
                        {/* Visual UI Preview Fallback / Backdrop */}
                        {project.cyberTheme ? (
                          <div className="cyber-terminal-preview">
                            <div className="cyber-terminal-top">
                              <span className="cyber-live-dot" />
                              <span>TELEGRAM SOC BOT // LIVE THREAT STREAM</span>
                              <span className="cyber-badge-shield">
                                FAIL2BAN + UFW ACTIVE
                              </span>
                            </div>
                            <div className="cyber-alert-cards-mini">
                              <div className="cyber-alert-mini-box danger">
                                <div className="cyber-alert-mini-title">
                                  🚨 WEB ATTACK DETECTED!
                                </div>
                                <code>
                                  GET /?id=1&apos; UNION SELECT username,
                                  password FROM users--
                                </code>
                                <span>Pattern: SQL Injection / XSS</span>
                              </div>
                              <div className="cyber-alert-mini-box warning">
                                <div className="cyber-alert-mini-title">
                                  🚨 SERVER FILE ALERT • WARNING
                                </div>
                                <code>Event: MODIFY → /shell.php</code>
                                <span>
                                  Action: sudo rm -f /shell.php (✅ Success)
                                </span>
                              </div>
                              <div className="cyber-alert-mini-box ban">
                                <span>
                                  ⛔ Fail2ban: IP 192.168.18.23 BANNED (Brute-force
                                  SSH)
                                </span>
                                <span className="cyber-click-hint">
                                  <i className="fas fa-images" />{" "}
                                  {lang === "en"
                                    ? "Click to view 4 Telegram Alert Screenshots"
                                    : "Klik untuk lihat 4 Screenshot Alert Telegram"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="project-mockup-ui">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px 14px",
                                background: "rgba(255,255,255,0.04)",
                                borderRadius: "10px",
                                border: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <i
                                  className={project.icon}
                                  style={{
                                    color: "var(--accent-3)",
                                    fontSize: "1.1rem",
                                  }}
                                />
                                <span
                                  style={{
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    color: "#fff",
                                  }}
                                >
                                  {lang === "en"
                                    ? project.title
                                    : project.titleId}
                                </span>
                              </div>
                              <span className="project-status-badge">
                                {project.metrics}
                              </span>
                            </div>

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1.3fr 0.7fr",
                                gap: "12px",
                                flex: 1,
                              }}
                            >
                              <div
                                style={{
                                  background: "rgba(108, 99, 255, 0.07)",
                                  border: "1px solid rgba(108, 99, 255, 0.16)",
                                  borderRadius: "12px",
                                  padding: "14px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "8px",
                                  }}
                                >
                                  {project.tags.slice(0, 4).map((t) => (
                                    <div
                                      key={t}
                                      style={{
                                        background: "rgba(10, 10, 18, 0.65)",
                                        border:
                                          "1px solid rgba(255, 255, 255, 0.06)",
                                        borderRadius: "8px",
                                        padding: "8px 10px",
                                        fontSize: "0.72rem",
                                        color: "var(--text-primary)",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {t}
                                    </div>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    height: "6px",
                                    width: "75%",
                                    background:
                                      "linear-gradient(90deg, var(--accent-1), var(--accent-3))",
                                    borderRadius: "4px",
                                  }}
                                />
                              </div>

                              <div
                                style={{
                                  background: "rgba(0, 212, 255, 0.05)",
                                  border: "1px solid rgba(0, 212, 255, 0.14)",
                                  borderRadius: "12px",
                                  padding: "14px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: "0.7rem",
                                    color: "var(--text-muted)",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Status
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.98rem",
                                    fontWeight: 700,
                                    color: project.statusColor || "#34d399",
                                  }}
                                >
                                  {lang === "id"
                                    ? project.statusLabelId || "Aktif"
                                    : project.statusLabelEn || "Active"}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.72rem",
                                    color: "var(--text-secondary)",
                                  }}
                                >
                                  {project.category}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Live Scaled Screenshot Iframe for Deployed Apps (e.g. POS App) */}
                        {project.liveEmbed && (
                          <div className="project-iframe-wrap">
                            <iframe
                              src={project.demoUrl}
                              title={`${project.title} Live Preview`}
                              className="project-iframe-scaled"
                              loading="lazy"
                            />
                          </div>
                        )}

                        {/* Hover Quick Action Overlay */}
                        <div className="project-screenshot-overlay">
                          {isExternalLive ? (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                              style={{
                                padding: "8px 18px",
                                fontSize: "0.8rem",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="fas fa-external-link-alt" />{" "}
                              {lang === "en"
                                ? "Open Live App"
                                : "Buka Aplikasi"}
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{
                                padding: "8px 18px",
                                fontSize: "0.8rem",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                openProjectModal(project);
                              }}
                            >
                              <i
                                className={
                                  project.galleryImages?.length
                                    ? "fas fa-images"
                                    : "fas fa-eye"
                                }
                              />{" "}
                              {project.galleryImages?.length
                                ? lang === "en"
                                  ? "View Telegram Alerts"
                                  : "Lihat Screenshot Alert"
                                : lang === "en"
                                ? "View Details"
                                : "Lihat Detail"}
                            </button>
                          )}
                        </div>
                      </div>
                    </TiltCard>

                    {/* Right Column: Project Description, Features & Live Demo Link */}
                    <div className="project-info-side">
                      <div className="project-info-top">
                        <span className="project-index-num">
                          0{idx + 1} &bull; {project.category}
                        </span>
                        <span className="project-status-badge">
                          {project.metrics}
                        </span>
                      </div>

                      <h3>
                        {lang === "en" ? project.title : project.titleId}
                      </h3>

                      <div
                        className="project-tags"
                        style={{ margin: "6px 0 14px" }}
                      >
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      <p className="project-info-desc">
                        {lang === "en"
                          ? project.description
                          : project.descriptionId}
                      </p>

                      <ul className="project-feature-list">
                        {(lang === "en"
                          ? project.featuresEn
                          : project.featuresId
                        ).map((feat, fIdx) => (
                          <li key={fIdx}>
                            <i className="fas fa-check-circle" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {project.serverNoteEn && (
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--text-secondary)",
                            background: "rgba(56, 189, 248, 0.08)",
                            border: "1px solid rgba(56, 189, 248, 0.22)",
                            borderRadius: "10px",
                            padding: "8px 12px",
                            marginBottom: "16px",
                            lineHeight: 1.5,
                          }}
                        >
                          <i
                            className="fas fa-info-circle"
                            style={{ color: "#38bdf8", marginRight: "6px" }}
                          />
                          {lang === "id"
                            ? project.serverNoteId
                            : project.serverNoteEn}
                        </div>
                      )}

                      <div className="project-actions">
                        {isExternalLive ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              padding: "10px 24px",
                              fontSize: "0.88rem",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="fas fa-external-link-alt" />{" "}
                            {lang === "en" ? "Live Demo" : "Buka Live Demo"}
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                              padding: "10px 22px",
                              fontSize: "0.86rem",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project);
                            }}
                          >
                            <i
                              className={
                                project.galleryImages?.length
                                  ? "fas fa-images"
                                  : "fas fa-layer-group"
                              }
                            />{" "}
                            {project.galleryImages?.length
                              ? lang === "en"
                                ? "View Alert Gallery (4)"
                                : "Lihat Galeri Alert (4)"
                              : lang === "en"
                              ? "Architecture Overview"
                              : "Detail Arsitektur"}
                          </button>
                        )}

                        {isExternalLive && (
                          <button
                            type="button"
                            className="project-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project);
                            }}
                          >
                            <i className="fas fa-info-circle" />{" "}
                            {lang === "en" ? "Details" : "Detail"}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <motion.div
            className="contact-card-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <div className="contact-info">
              <h2>
                {lang === "en" ? (
                  <>
                    Let&apos;s build something{" "}
                    <span className="gradient-highlight">great</span> together
                  </>
                ) : (
                  <>
                    Mari bangun sesuatu yang{" "}
                    <span className="gradient-highlight">hebat</span> bersama
                  </>
                )}
              </h2>
              <p>
                {lang === "en"
                  ? "Have a project in mind? Reach out and let's make it happen."
                  : "Punya ide proyek? Hubungi saya dan mari wujudkan bersama."}
              </p>
            </div>
            <div className="contact-btn-wrap">
              <MagneticButton
                className="btn btn-primary"
                onClick={() => setContactOpen(true)}
              >
                <i className="fas fa-paper-plane" />{" "}
                {lang === "en" ? "Get in Touch" : "Hubungi Saya"}
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Popup Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setContactOpen(false);
            }}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.88, y: 35, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 25, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setContactOpen(false)}
                aria-label="Close contact popup"
              >
                <i className="fas fa-times" />
              </button>
              <h2 className="modal-title">Let&apos;s Connect</h2>
              <p className="modal-subtitle">
                Choose your preferred platform to reach me
              </p>

              <div className="contact-links-list">
                <a
                  href="https://www.linkedin.com/in/m-raihan-ahsan-fadhilah-288722212/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item linkedin"
                >
                  <span className="contact-link-icon">
                    <i className="fab fa-linkedin-in" />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-name">LinkedIn</span>
                    <span className="contact-link-handle">
                      M. Raihan Ahsan Fadhilah
                    </span>
                  </span>
                  <span className="contact-link-arrow">
                    <i className="fas fa-arrow-right" />
                  </span>
                </a>

                <a
                  href="https://github.com/RaihanAhsan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item github"
                >
                  <span className="contact-link-icon">
                    <i className="fab fa-github" />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-name">GitHub</span>
                    <span className="contact-link-handle">RaihanAhsan</span>
                  </span>
                  <span className="contact-link-arrow">
                    <i className="fas fa-arrow-right" />
                  </span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mraihanahsan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item gmail"
                >
                  <span className="contact-link-icon">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-name">Gmail</span>
                    <span className="contact-link-handle">
                      mraihanahsan@gmail.com
                    </span>
                  </span>
                  <span className="contact-link-arrow">
                    <i className="fas fa-arrow-right" />
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/sans.af?igsh=NmVjaHM5bjNkaHI3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item instagram"
                >
                  <span className="contact-link-icon">
                    <i className="fab fa-instagram" />
                  </span>
                  <span className="contact-link-text">
                    <span className="contact-link-name">Instagram</span>
                    <span className="contact-link-handle">@sans.af</span>
                  </span>
                  <span className="contact-link-arrow">
                    <i className="fas fa-arrow-right" />
                  </span>
                </a>
              </div>

              <div className="copy-email-bar">
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                >
                  <i
                    className={
                      copiedEmail ? "fas fa-check" : "far fa-copy"
                    }
                    style={{
                      color: copiedEmail ? "#34d399" : "var(--accent-3)",
                    }}
                  />
                  {copiedEmail
                    ? "Email copied to clipboard!"
                    : "Quick Copy: mraihanahsan@gmail.com"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Interactive Live Demo & Gallery Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setPreviewProject(null);
            }}
          >
            <motion.div
              className={`modal-card ${
                previewProject.galleryImages?.length ? "modal-card-gallery" : ""
              }`}
              style={{
                maxWidth: previewProject.galleryImages?.length
                  ? "680px"
                  : "540px",
              }}
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setPreviewProject(null)}
                aria-label="Close project preview"
              >
                <i className="fas fa-times" />
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "16px",
                }}
              >
                <div className="project-icon">
                  <i className={previewProject.icon} />
                </div>
                <div>
                  <span className="project-status-badge">
                    {previewProject.metrics}
                  </span>
                  <h2 className="modal-title" style={{ marginTop: "4px" }}>
                    {lang === "id"
                      ? previewProject.titleId
                      : previewProject.title}
                  </h2>
                </div>
              </div>

              <div className="project-tags" style={{ marginBottom: "16px" }}>
                {previewProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {/* Interactive Telegram Screenshot Gallery Carousel */}
              {previewProject.galleryImages &&
                previewProject.galleryImages.length > 0 && (
                  <div className="security-gallery-wrap">
                    <div className="security-gallery-topbar">
                      <span className="security-gallery-stream">
                        <span className="cyber-live-dot" />
                        telegram-soc-bot //{" "}
                        {
                          previewProject.galleryImages[galleryIndex].src
                            .split("/")
                            .pop()
                        }
                      </span>
                      <span className="security-gallery-counter">
                        {galleryIndex + 1} /{" "}
                        {previewProject.galleryImages.length}
                      </span>
                    </div>

                    <div className="security-gallery-stage">
                      {!imgErrorMap[
                        previewProject.galleryImages[galleryIndex].src
                      ] ? (
                        <img
                          src={previewProject.galleryImages[galleryIndex].src}
                          alt={
                            previewProject.galleryImages[galleryIndex].labelEn
                          }
                          className="security-gallery-img"
                          onError={() =>
                            setImgErrorMap((prev) => ({
                              ...prev,
                              [previewProject.galleryImages![galleryIndex].src]:
                                true,
                            }))
                          }
                        />
                      ) : (
                        <div className="security-gallery-fallback">
                          <div className="security-tg-bubble">
                            {previewProject.galleryImages[
                              galleryIndex
                            ].terminalPreview?.map((line, lIdx) => (
                              <div
                                key={lIdx}
                                className={
                                  lIdx === 0
                                    ? "security-tg-header"
                                    : "security-tg-line"
                                }
                              >
                                {line}
                              </div>
                            ))}
                            <div className="security-tg-path-note">
                              Place screenshot at:{" "}
                              <code>
                                public
                                {
                                  previewProject.galleryImages[galleryIndex].src
                                }
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        className="security-gallery-nav prev"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        <i className="fas fa-chevron-left" />
                      </button>

                      <button
                        type="button"
                        className="security-gallery-nav next"
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>

                    <div className="security-gallery-footer">
                      <span className="security-gallery-caption">
                        {lang === "id"
                          ? previewProject.galleryImages[galleryIndex].labelId
                          : previewProject.galleryImages[galleryIndex].labelEn}
                      </span>
                      <div className="security-gallery-dots">
                        {previewProject.galleryImages.map((item, idx) => (
                          <button
                            key={item.src}
                            type="button"
                            className={`security-dot ${
                              idx === galleryIndex ? "active" : ""
                            }`}
                            onClick={() => setGalleryIndex(idx)}
                            aria-label={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.93rem",
                  lineHeight: 1.65,
                  marginBottom: "20px",
                }}
              >
                {lang === "id"
                  ? previewProject.descriptionId
                  : previewProject.description}
              </p>

              {/* Key Highlights */}
              <div
                style={{
                  background: "rgba(10, 10, 18, 0.65)",
                  border: "1px solid rgba(108, 99, 255, 0.2)",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  {lang === "id" ? "Fitur Utama" : "Key Architecture Highlights"}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "grid",
                    gap: "8px",
                    fontSize: "0.86rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {(lang === "id"
                    ? previewProject.featuresId
                    : previewProject.featuresEn
                  ).map((feat, fIdx) => (
                    <li key={fIdx}>
                      <i
                        className="fas fa-check-circle"
                        style={{ color: "#34d399", marginRight: "8px" }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {previewProject.serverNoteEn && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    background: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    marginBottom: "20px",
                    lineHeight: 1.55,
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{ color: "#38bdf8", marginRight: "6px" }}
                  />
                  {lang === "id"
                    ? previewProject.serverNoteId
                    : previewProject.serverNoteEn}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: "10px 24px", fontSize: "0.9rem" }}
                  onClick={() => {
                    setPreviewProject(null);
                    setContactOpen(true);
                  }}
                >
                  <i className="fas fa-comments" /> Request Walkthrough
                </button>
                <a
                  href="https://github.com/RaihanAhsan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ padding: "10px 24px", fontSize: "0.9rem" }}
                >
                  <i className="fab fa-github" /> View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer>
        <div className="container">
          &copy; 2026 <span>Raihan Ahsan</span> &bull; Built with Next.js &amp;
          Framer Motion. All rights reserved.
        </div>
      </footer>
    </>
  );
}
