"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import TiltCard from "./TiltCard";
import MagneticButton from "./MagneticButton";
import { useLanguage, Language } from "@/context/LanguageContext";

export interface JourneyItemBilingual {
  id: string;
  type: "experience" | "education";
  period: string;
  icon: string;
  tags: string[];
  en: {
    badgeLabel: string;
    roleOrDegree: string;
    organization: string;
    summary: string;
    deliverablesTitle: string;
    deliverables: string[];
  };
  idLang: {
    badgeLabel: string;
    roleOrDegree: string;
    organization: string;
    summary: string;
    deliverablesTitle: string;
    deliverables: string[];
  };
}

// ============================================================================
// COMPACT BILINGUAL JOURNEY DATA (EN Default & ID)
// ============================================================================
const JOURNEY_DATA: JourneyItemBilingual[] = [
  {
    id: "fullstack-engineer",
    type: "experience",
    period: "2025 — Present",
    icon: "fas fa-laptop-code",
    tags: ["Next.js", "Python", "FastAPI", "Laravel", "PostgreSQL", "Docker"],
    en: {
      badgeLabel: "Work Experience",
      roleOrDegree: "Full-Stack Software Engineer",
      organization: "SaaS & B2B Digital Solutions",
      summary:
        "Building scalable multi-tenant SaaS & B2B web platforms with Python, Laravel, and Next.js.",
      deliverablesTitle: "Key Deliverables",
      deliverables: [
        "Architected multi-tenant SaaS apps with RBAC auth & automated Stripe billing.",
        "Built high-speed FastAPI services & optimized PostgreSQL/Redis queries (-45% latency).",
        "Automated zero-downtime CI/CD deployment pipelines using Docker & GitHub Actions.",
      ],
    },
    idLang: {
      badgeLabel: "Pengalaman Kerja",
      roleOrDegree: "Full-Stack Software Engineer",
      organization: "SaaS & B2B Digital Solutions",
      summary:
        "Membangun platform web multi-tenant SaaS & B2B menggunakan Python, Laravel, dan Next.js.",
      deliverablesTitle: "Apa yang Dikerjakan",
      deliverables: [
        "Merancang aplikasi multi-tenant SaaS dengan autentikasi RBAC & integrasi pembayaran.",
        "Membangun layanan API FastAPI & optimasi query PostgreSQL/Redis (-45% latensi).",
        "Otomasi deployment CI/CD tanpa downtime menggunakan Docker & GitHub Actions.",
      ],
    },
  },
  {
    id: "software-engineer-intern",
    type: "experience",
    period: "2024 — 2025",
    icon: "fas fa-briefcase",
    tags: ["Next.js", "Python", "Laravel", "PostgreSQL", "REST API", "Git"],
    en: {
      badgeLabel: "Internship",
      roleOrDegree: "Software Engineer Intern",
      organization: "Tech & Enterprise Partner",
      summary:
        "Contributed to full-cycle B2B module development, real-time analytics dashboards, and API integrations.",
      deliverablesTitle: "What I Did During Internship",
      deliverables: [
        "Developed interactive Next.js analytics dashboards for real-time operational metrics.",
        "Built & documented 15+ REST API endpoints using Python & Laravel with unit tests.",
        "Optimized PostgreSQL schemas, automated PDF/Excel reports & joined Agile Scrum sprints.",
      ],
    },
    idLang: {
      badgeLabel: "Magang / Internship",
      roleOrDegree: "Software Engineer Intern",
      organization: "Tech & Enterprise Partner",
      summary:
        "Terlibat dalam pengembangan modul B2B, dashboard analitik real-time, dan integrasi REST API.",
      deliverablesTitle: "Apa yang Dikerjakan Selama Magang",
      deliverables: [
        "Mengembangkan dashboard analitik interaktif Next.js untuk metrik operasional real-time.",
        "Membangun & mendokumentasikan 15+ endpoint REST API dengan Python & Laravel.",
        "Optimasi database PostgreSQL, fitur ekspor laporan otomatis, & sprint Agile Scrum.",
      ],
    },
  },
  {
    id: "backend-web-intern",
    type: "experience",
    period: "2023 — 2024",
    icon: "fas fa-server",
    tags: ["Laravel", "PHP", "Python", "Vue.js", "MySQL", "JWT"],
    en: {
      badgeLabel: "Internship",
      roleOrDegree: "Backend & Web Developer Intern",
      organization: "Digital Innovation Studio",
      summary:
        "Focused on backend architecture, database management, and internal B2B administration portals.",
      deliverablesTitle: "What I Did During Internship",
      deliverables: [
        "Built B2B admin portals and CRUD modules using Laravel, Eloquent ORM, and Vue.js.",
        "Created Python automation scripts for data cleaning, validation, and synchronization.",
        "Implemented OAuth2 / JWT authentication and multi-role authorization middleware.",
      ],
    },
    idLang: {
      badgeLabel: "Magang / Internship",
      roleOrDegree: "Backend & Web Developer Intern",
      organization: "Digital Innovation Studio",
      summary:
        "Fokus pada pengembangan backend, manajemen database, dan portal administrasi B2B.",
      deliverablesTitle: "Apa yang Dikerjakan Selama Magang",
      deliverables: [
        "Membangun portal admin B2B menggunakan Laravel, Eloquent ORM, dan Vue.js.",
        "Membuat script otomasi Python untuk validasi dan sinkronisasi data antar layanan.",
        "Implementasi autentikasi OAuth2 / JWT serta middleware otorisasi multi-role.",
      ],
    },
  },
  {
    id: "university-education",
    type: "education",
    period: "2021 — 2025",
    icon: "fas fa-graduation-cap",
    tags: ["Computer Science", "Software Engineering", "Databases", "AI & Web"],
    en: {
      badgeLabel: "Education",
      roleOrDegree: "B.Sc. in Computer Science / Informatics",
      organization: "University • Indonesia",
      summary:
        "Strong foundation in Software Engineering, Distributed Systems, Databases, and Full-Stack Development.",
      deliverablesTitle: "Academic Focus & Capstone",
      deliverables: [
        "Core Coursework: Data Structures, Software Engineering, Database Systems & AI.",
        "Capstone Project: Built a scalable B2B web platform powered by Python & Next.js.",
        "Active in programming labs, software engineering teams & tech communities.",
      ],
    },
    idLang: {
      badgeLabel: "Pendidikan",
      roleOrDegree: "S1 Teknik Informatika / Ilmu Komputer",
      organization: "Universitas • Indonesia",
      summary:
        "Fondasi kuat di bidang Rekayasa Perangkat Lunak, Sistem Basis Data, dan Full-Stack Web Development.",
      deliverablesTitle: "Fokus Studi & Tugas Akhir",
      deliverables: [
        "Mata Kuliah: Struktur Data, Rekayasa Perangkat Lunak, Basis Data & AI.",
        "Proyek Akhir: Merancang platform B2B skalabel berbasis Python & Next.js.",
        "Aktif dalam asisten/praktikum lab dan kolaborasi tim pengembangan software.",
      ],
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
    tabExp: string;
    tabEdu: string;
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
    heroBadge: "Education & Internship Timeline",
    heroTitle1: "My Career",
    heroTitle2: "Journey",
    heroSub:
      "A concise overview of my education, internships, and what I built along the way.",
    tabAll: "All",
    tabExp: "Internship & Work",
    tabEdu: "Education",
    ctaTitle1: "Let's build something",
    ctaTitleHighlight: "great",
    ctaTitle2: "together",
    ctaSub: "Interested in working together? Reach out anytime.",
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
    heroBadge: "Pendidikan, Magang & Pengalaman",
    heroTitle1: "Perjalanan",
    heroTitle2: "Karier",
    heroSub:
      "Ringkasan padat mengenai pendidikan, pengalaman magang, dan apa yang saya kerjakan.",
    tabAll: "Semua",
    tabExp: "Magang & Kerja",
    tabEdu: "Pendidikan",
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

  const [filter, setFilter] = useState<"all" | "experience" | "education">(
    "all"
  );

  // Navbar & Modal States
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoScrolled, setLogoScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Ensure body preloader class is removed on this route & mark preloader as seen
  useEffect(() => {
    document.body.classList.remove("preloader-active");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("raihan_preloader_shown", "true");
    }
  }, []);

  // Cursor Glow Tracking
  useEffect(() => {
    const cursorBg = document.getElementById("cursor-bg");
    if (!cursorBg) return;

    let ticking = false;
    const updateCursor = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      cursorBg.style.setProperty("--mouse-x", `${x}%`);
      cursorBg.style.setProperty("--mouse-y", `${y}%`);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateCursor(e.clientX, e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Navbar Scroll Shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setLogoScrolled(scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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

          <ul
            className={`nav-links nav-center ${mobileMenuOpen ? "open" : ""}`}
            role="menubar"
          >
            <li role="none">
              <Link href="/" role="menuitem">
                {t.navHome}
              </Link>
            </li>
            <li role="none">
              <Link href="/#skills" role="menuitem">
                {t.navSkills}
              </Link>
            </li>
            <li role="none">
              <Link href="/#projects" role="menuitem">
                {t.navProjects}
              </Link>
            </li>
            <li role="none">
              <Link href="/journey" role="menuitem" className="active">
                <motion.span
                  layoutId="navActivePill"
                  className="nav-active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
                {t.navJourney}
              </Link>
            </li>
            <li role="none" className="mobile-contact">
              <button
                type="button"
                className="nav-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactOpen(true);
                }}
              >
                <i className="fas fa-paper-plane" /> {t.navContact}
              </button>
            </li>
          </ul>

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

      {/* Compact Journey Hero Header */}
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
                maxWidth: "540px",
                fontSize: "0.92rem",
              }}
            >
              {t.heroSub}
            </p>

            {/* Filter Tabs */}
            <div className="journey-tabs" role="tablist">
              {[
                { id: "all", label: t.tabAll, icon: "fas fa-th-large" },
                {
                  id: "experience",
                  label: t.tabExp,
                  icon: "fas fa-briefcase",
                },
                {
                  id: "education",
                  label: t.tabEdu,
                  icon: "fas fa-graduation-cap",
                },
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
                    setFilter(tab.id as "all" | "experience" | "education")
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

      {/* Compact 2-Column Journey Cards Section */}
      <section className="journey-section">
        <div className="container">
          <motion.div layout className="journey-compact-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const content = lang === "en" ? item.en : item.idLang;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                  >
                    <TiltCard className="journey-card" intensity={5}>
                      <div className="journey-card-top">
                        <span className={`journey-type-badge ${item.type}`}>
                          <i className={item.icon} />
                          {content.badgeLabel}
                        </span>
                        <span className="journey-period">
                          <i className="far fa-calendar-alt" />
                          {item.period}
                        </span>
                      </div>

                      <h2 className="journey-role-title">
                        {content.roleOrDegree}
                      </h2>
                      <div className="journey-org">
                        <i className="fas fa-building" />
                        <span>{content.organization}</span>
                      </div>

                      <p className="journey-summary">{content.summary}</p>

                      <div className="deliverables-box">
                        <div className="deliverables-title">
                          <i className="fas fa-tasks" />
                          <span>{content.deliverablesTitle}</span>
                        </div>
                        <ul className="deliverables-list">
                          {content.deliverables.map((point, i) => (
                            <li key={i}>
                              <i className="fas fa-check-circle" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="journey-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Compact Contact CTA */}
      <section id="contact" style={{ padding: "40px 0 60px" }}>
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
