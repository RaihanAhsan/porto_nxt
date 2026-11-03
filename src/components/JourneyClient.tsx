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

export type JourneyCategory =
  | "education"
  | "experience"
  | "research"
  | "business";

export interface JourneyItemBilingual {
  id: string;
  type: JourneyCategory;
  icon: string;
  orgIcon: string;
  tags: string[];
  en: {
    badgeLabel: string;
    period: string;
    roleOrDegree: string;
    organization: string;
    summary: string;
  };
  idLang: {
    badgeLabel: string;
    period: string;
    roleOrDegree: string;
    organization: string;
    summary: string;
  };
}

// ============================================================================
// ACTUAL PROFESSIONAL, ACADEMIC, RESEARCH & BUSINESS JOURNEY DATA
// Ordered chronologically (Most Recent / Active -> Earlier)
// ============================================================================
const JOURNEY_DATA: JourneyItemBilingual[] = [
  {
    id: "nudira-internship",
    type: "experience",
    icon: "fas fa-briefcase",
    orgIcon: "fas fa-building",
    tags: [
      "Laravel",
      "PHP",
      "Real-Time Web App",
      "nudirafactory.my.id",
      "Factory Management",
    ],
    en: {
      badgeLabel: "Internship",
      period: "Aug 2025 — Sep 2025",
      roleOrDegree: "Fullstack Software Engineer (Internship)",
      organization: "Nudira Sumber Daya Indonesia",
      summary:
        "Developed a real-time web-based factory management application (deployed at nudirafactory.my.id) using Laravel and PHP to streamline operational monitoring and production workflows.",
    },
    idLang: {
      badgeLabel: "Kerja Praktek / Magang",
      period: "Agustus 2025 — September 2025",
      roleOrDegree: "Fullstack Software Engineer (Internship/Kerja Praktek)",
      organization: "Nudira Sumber Daya Indonesia",
      summary:
        "Pembuatan aplikasi pengelolaan pabrik berbasis website secara real-time menggunakan Laravel dan PHP (di-deploy pada nudirafactory.my.id).",
    },
  },
  {
    id: "smart-weather-iot",
    type: "research",
    icon: "fas fa-flask",
    orgIcon: "fas fa-microchip",
    tags: [
      "Next.js",
      "FastAPI (Python)",
      "VPS Ubuntu",
      "RS485 Sensor",
      "BMKG Standard",
      "On Going",
    ],
    en: {
      badgeLabel: "Research & IoT (On Going)",
      period: "On Going",
      roleOrDegree: "Smart Weather System",
      organization: "Internet of Things (IoT) • BMKG Standard",
      summary:
        "Ongoing smart weather station system built to BMKG standards. Hardware weather sensors connected via RS485 serial interface transmit real-time telemetry to a FastAPI (Python) backend on an Ubuntu VPS and display live metrics on a Next.js dashboard.",
    },
    idLang: {
      badgeLabel: "Riset & IoT (On Going)",
      period: "Masih Dikerjakan (On Going)",
      roleOrDegree: "Smart Weather System",
      organization: "Internet of Things (IoT) • Standar BMKG",
      summary:
        "Sistem stasiun cuaca pintar (masih dikerjakan / On Going) mengacu pada standar BMKG. Sensor cuaca hardware yang terkoneksi dengan RS485 mengirimkan data ke backend FastAPI (Python) pada VPS Ubuntu untuk ditampilkan secara real-time di dashboard Next.js.",
    },
  },
  {
    id: "unikom-education",
    type: "education",
    icon: "fas fa-graduation-cap",
    orgIcon: "fas fa-university",
    tags: [
      "Electrical Engineering",
      "UNIKOM",
      "IoT & Embedded Systems",
      "Software Engineering",
    ],
    en: {
      badgeLabel: "Education",
      period: "2022 — 2026",
      roleOrDegree: "Bachelor of Electrical Engineering (S.T.)",
      organization: "Universitas Komputer Indonesia (UNIKOM)",
      summary:
        "Undergraduate studies in Electrical Engineering combining hardware instrumentation, Internet of Things (IoT), and full-stack software engineering.",
    },
    idLang: {
      badgeLabel: "Pendidikan",
      period: "2022 — 2026",
      roleOrDegree: "Sarjana Teknik Elektro",
      organization: "Universitas Komputer Indonesia (UNIKOM)",
      summary:
        "Menempuh pendidikan Sarjana Teknik Elektro dengan fokus integrasi sistem perangkat keras, Internet of Things (IoT), dan rekayasa perangkat lunak full-stack.",
    },
  },
  {
    id: "vapestore-business",
    type: "business",
    icon: "fas fa-store",
    orgIcon: "fas fa-cash-register",
    tags: [
      "Entrepreneurship",
      "Telegram Bot API",
      "Database",
      "QRIS Integration",
      "Inventory Automation",
    ],
    en: {
      badgeLabel: "Business & Entrepreneurship",
      period: "2022 — 2026",
      roleOrDegree: "Owner Vapestore",
      organization: "Retail Business & Custom Store Automation",
      summary:
        "Operated a single-store offline retail vapestore and independently built its digital ecosystem featuring QRIS payment integration and an automated database-connected Telegram Bot inventory system to streamline stock tracking and prevent monthly Stock Opname (SO) discrepancies.",
    },
    idLang: {
      badgeLabel: "Bisnis & Wirausaha",
      period: "2022 — 2026",
      roleOrDegree: "Owner Vapestore",
      organization: "Bisnis Ritel & Otomasi Sistem Toko",
      summary:
        "Menjalankan bisnis ritel vapestore offline single-store. Mengembangkan ekosistem toko secara mandiri dengan integrasi pembayaran QRIS dan sistem manajemen inventori (stok barang) otomatis berbasis Bot Telegram yang terhubung ke database untuk efisiensi tracking stok dan mencegah selisih barang saat Stock Opname (SO) bulanan.",
    },
  },
  {
    id: "telkom-akses-internship",
    type: "experience",
    icon: "fas fa-briefcase",
    orgIcon: "fas fa-network-wired",
    tags: [
      "Fiber Optics",
      "Network Infrastructure",
      "Telecommunications",
      "Field Engineering",
    ],
    en: {
      badgeLabel: "Internship",
      period: "Aug 2020 — Oct 2020",
      roleOrDegree: "Fiber Optic Technician (Internship)",
      organization: "PT. Telkom Akses Lhokseumawe",
      summary:
        "Hands-on field internship focusing on fiber optic network installation, splicing, signal quality testing, and telecommunications infrastructure maintenance.",
    },
    idLang: {
      badgeLabel: "Magang",
      period: "Agustus 2020 — Oktober 2020",
      roleOrDegree: "Teknisi Fiber Optik (Magang)",
      organization: "PT. Telkom Akses Lhokseumawe",
      summary:
        "Pelaksanaan magang teknis lapangan pada instalasi, penyambungan (splicing), pengujian kualitas sinyal, dan pemeliharaan jaringan infrastruktur fiber optik.",
    },
  },
];

const UI_TEXT: Record<
  Language,
  {
    navHome: string;
    navSkills: string;
    navProjects: string;
    navJourney: string;
    navContact: string;
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSub: string;
    tabAll: string;
    tabEdu: string;
    tabExp: string;
    tabRes: string;
    tabBiz: string;
    ctaTitle1: string;
    ctaTitleHighlight: string;
    ctaTitle2: string;
    ctaSub: string;
    ctaBtn: string;
    ctaProjects: string;
    modalTitle: string;
    modalSub: string;
    copied: string;
    quickCopy: string;
  }
> = {
  en: {
    navHome: "Home",
    navSkills: "Skills",
    navProjects: "Projects",
    navJourney: "Journey",
    navContact: "Contact",
    heroBadge: "Education, Experience, Research & Business",
    heroTitle1: "My Career",
    heroTitle2: "Journey",
    heroSub:
      "A chronological timeline of my academic background, engineering internships, IoT research, and business automation.",
    tabAll: "All",
    tabEdu: "Education",
    tabExp: "Work & Intern",
    tabRes: "Research & IoT",
    tabBiz: "Business",
    ctaTitle1: "Let's build something",
    ctaTitleHighlight: "great",
    ctaTitle2: "together",
    ctaSub: "Interested in collaborating? Reach out anytime.",
    ctaBtn: "Get in Touch",
    ctaProjects: "View Projects",
    modalTitle: "Let's Connect",
    modalSub: "Choose your preferred platform to reach me",
    copied: "Email copied to clipboard!",
    quickCopy: "Quick Copy: mraihanahsan@gmail.com",
  },
  id: {
    navHome: "Beranda",
    navSkills: "Keahlian",
    navProjects: "Proyek",
    navJourney: "Perjalanan",
    navContact: "Kontak",
    heroBadge: "Pendidikan, Magang, Riset & Bisnis",
    heroTitle1: "Perjalanan",
    heroTitle2: "Karier",
    heroSub:
      "Linimasa perjalanan akademik, pengalaman magang, riset IoT, serta otomasi bisnis yang saya bangun.",
    tabAll: "Semua",
    tabEdu: "Pendidikan",
    tabExp: "Magang & Kerja",
    tabRes: "Riset & IoT",
    tabBiz: "Bisnis",
    ctaTitle1: "Mari bangun sesuatu yang",
    ctaTitleHighlight: "hebat",
    ctaTitle2: "bersama",
    ctaSub: "Tertarik berkolaborasi? Hubungi saya kapan saja.",
    ctaBtn: "Hubungi Saya",
    ctaProjects: "Lihat Proyek",
    modalTitle: "Mari Terhubung",
    modalSub: "Pilih platform untuk menghubungi saya",
    copied: "Email berhasil disalin!",
    quickCopy: "Salin Cepat: mraihanahsan@gmail.com",
  },
};

export default function JourneyClient() {
  const { lang, toggleLang } = useLanguage();
  const t = UI_TEXT[lang];

  const [filter, setFilter] = useState<"all" | JourneyCategory>("all");

  // Navbar & Modal States
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoScrolled, setLogoScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Vertical Timeline Scroll Beam
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 25%"],
  });
  const timelineScaleY = useSpring(timelineProgress, {
    stiffness: 120,
    damping: 28,
  });

  // Ensure body preloader class is removed on this route & mark preloader as seen
  useEffect(() => {
    document.body.classList.remove("preloader-active");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("raihan_preloader_shown", "true");
    }
  }, []);

  // Cursor Glow Tracking (Mouse-only for 60fps mobile performance)
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
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  // Navbar Scroll Shadow (rAF-throttled)
  useEffect(() => {
    let scrollTicking = false;
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const nextScrolled = scrollY > 20;
      const nextLogoScrolled = scrollY > 120;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
      setLogoScrolled((prev) =>
        prev !== nextLogoScrolled ? nextLogoScrolled : prev
      );
      scrollTicking = false;
    };

    const onScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScroll);
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape Key Handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (contactOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [contactOpen, mobileMenuOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mraihanahsan@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredItems =
    filter === "all"
      ? JOURNEY_DATA
      : JOURNEY_DATA.filter((item) => item.type === filter);

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

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
            <Link
              href="/"
              className={`nav-logo ${logoScrolled ? "scrolled" : ""}`}
            >
              <span className="logo-first">Raihan</span>
              <span className="logo-dot">.</span>
              <span className="logo-last">Ahsan</span>
            </Link>
          </div>

          <NavbarLinks
            activeId="journey"
            lang={lang}
            mobileMenuOpen={mobileMenuOpen}
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
                <i className="fas fa-paper-plane" /> {t.navContact}
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

      {/* Journey Hero Header */}
      <header className="journey-hero">
        <div className="container">
          <motion.div
            className="journey-hero-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="hero-badge"
              style={{ marginBottom: "10px", padding: "4px 14px" }}
            >
              <span className="status-dot" />
              <i className="fas fa-route" /> {t.heroBadge}
            </span>
            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
                marginBottom: "8px",
              }}
            >
              {t.heroTitle1}{" "}
              <span className="gradient-name">{t.heroTitle2}</span>
            </h1>
            <p
              className="section-subtitle"
              style={{
                margin: "0 auto",
                maxWidth: "560px",
                fontSize: "0.92rem",
              }}
            >
              {t.heroSub}
            </p>

            {/* Category Filter Tabs */}
            <div className="journey-tabs" role="tablist">
              {[
                { id: "all", label: t.tabAll, icon: "fas fa-stream" },
                {
                  id: "education",
                  label: t.tabEdu,
                  icon: "fas fa-graduation-cap",
                },
                {
                  id: "experience",
                  label: t.tabExp,
                  icon: "fas fa-briefcase",
                },
                { id: "research", label: t.tabRes, icon: "fas fa-flask" },
                { id: "business", label: t.tabBiz, icon: "fas fa-store" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.id}
                  className={`journey-tab-btn ${
                    filter === tab.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setFilter(tab.id as "all" | JourneyCategory)
                  }
                >
                  {filter === tab.id && (
                    <motion.span
                      layoutId="journeyTabPill"
                      className="journey-tab-pill"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                  <i className={tab.icon} />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Responsive Vertical Timeline Section */}
      <section className="journey-section">
        <div className="container">
          <div className="v-timeline" ref={timelineRef}>
            {/* Central Vertical Line (Desktop Center / Mobile Left) */}
            <div className="v-timeline-line" aria-hidden="true">
              <motion.div
                className="v-timeline-line-fill"
                style={{ scaleY: timelineScaleY }}
              />
            </div>

            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const content = lang === "en" ? item.en : item.idLang;
                const sideClass = idx % 2 === 0 ? "left" : "right";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className={`v-timeline-item ${sideClass}`}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                  >
                    {/* Category Icon Node on the Timeline */}
                    <div className="v-timeline-node" aria-hidden="true">
                      <i className={item.icon} />
                    </div>

                    <div className="v-timeline-content">
                      <TiltCard className="journey-card" intensity={5}>
                        <div className="journey-card-top">
                          <span className={`journey-type-badge ${item.type}`}>
                            <i className={item.icon} />
                            {content.badgeLabel}
                          </span>
                          <span className="journey-period">
                            <i className="far fa-calendar-alt" />
                            {content.period}
                          </span>
                        </div>

                        <h2 className="journey-role-title">
                          {content.roleOrDegree}
                        </h2>
                        <div className="journey-org">
                          <i className={item.orgIcon} />
                          <span>{content.organization}</span>
                        </div>

                        <p className="journey-summary">{content.summary}</p>

                        <div className="journey-tags">
                          {item.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </TiltCard>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Compact Contact CTA */}
      <section id="contact" style={{ padding: "30px 0 60px" }}>
        <div className="container">
          <motion.div
            className="contact-card-banner"
            style={{ padding: "32px 32px" }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
          >
            <div className="contact-info">
              <h2 style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.8rem)" }}>
                {t.ctaTitle1}{" "}
                <span className="gradient-highlight">
                  {t.ctaTitleHighlight}
                </span>{" "}
                {t.ctaTitle2}
              </h2>
              <p style={{ fontSize: "0.95rem" }}>{t.ctaSub}</p>
            </div>
            <div
              className="contact-btn-wrap"
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              <MagneticButton
                className="btn btn-primary"
                onClick={() => setContactOpen(true)}
              >
                <i className="fas fa-paper-plane" /> {t.ctaBtn}
              </MagneticButton>
              <Link href="/#projects" className="btn btn-outline">
                <i className="fas fa-rocket" /> {t.ctaProjects}
              </Link>
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
              <h2 className="modal-title">{t.modalTitle}</h2>
              <p className="modal-subtitle">{t.modalSub}</p>

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
                    className={copiedEmail ? "fas fa-check" : "far fa-copy"}
                    style={{
                      color: copiedEmail ? "#34d399" : "var(--accent-3)",
                    }}
                  />
                  {copiedEmail ? t.copied : t.quickCopy}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer>
        <div className="container">
          &copy; 2026 <span>Raihan Ahsan</span> &bull; All rights reserved.
        </div>
      </footer>
    </>
  );
}
