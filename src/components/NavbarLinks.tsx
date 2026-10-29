"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Language } from "@/context/LanguageContext";

export type NavItemId = "hero" | "skills" | "projects" | "journey";

interface NavbarLinksProps {
  activeId: NavItemId;
  lang: Language;
  mobileMenuOpen: boolean;
  onSelectSection?: (e: React.MouseEvent, id: "hero" | "skills" | "projects") => void;
  onCloseMobileMenu: () => void;
  onOpenContact: () => void;
}

// Simpan posisi kapsul terakhir di memori modul agar perpindahan halaman (/ <-> /journey) tetap mulus tanpa jumping
let savedPillRect: {
  left: number;
  top: number;
  width: number;
  height: number;
} | null = null;

export default function NavbarLinks({
  activeId,
  lang,
  mobileMenuOpen,
  onSelectSection,
  onCloseMobileMenu,
  onOpenContact,
}: NavbarLinksProps) {
  const ulRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<NavItemId, HTMLLIElement | null>>({
    hero: null,
    skills: null,
    projects: null,
    journey: null,
  });

  const [pillRect, setPillRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(() => savedPillRect);

  const updatePillPosition = useCallback(() => {
    const activeEl = itemRefs.current[activeId];
    if (!activeEl) return;

    const newRect = {
      left: activeEl.offsetLeft,
      top: activeEl.offsetTop,
      width: activeEl.offsetWidth,
      height: activeEl.offsetHeight,
    };

    savedPillRect = newRect;
    setPillRect(newRect);
  }, [activeId]);

  useEffect(() => {
    updatePillPosition();
    // Re-measure after font/layout settle or window resize
    const raf = requestAnimationFrame(updatePillPosition);
    window.addEventListener("resize", updatePillPosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updatePillPosition);
    };
  }, [updatePillPosition, lang, mobileMenuOpen]);

  const sectionItems: { id: "hero" | "skills" | "projects"; label: string; href: string }[] = [
    { id: "hero", label: lang === "en" ? "Home" : "Beranda", href: "/#hero" },
    { id: "skills", label: lang === "en" ? "Skills" : "Keahlian", href: "/#skills" },
    { id: "projects", label: lang === "en" ? "Projects" : "Proyek", href: "/#projects" },
  ];

  return (
    <ul
      ref={ulRef}
      className={`nav-links nav-center ${mobileMenuOpen ? "open" : ""}`}
      role="menubar"
    >
      {/* Kapsul indikator aktif tunggal yang bergeser mulus tanpa unmount/remount */}
      {pillRect && (
        <motion.span
          className="nav-active-pill"
          initial={false}
          animate={{
            x: pillRect.left,
            y: pillRect.top,
            width: pillRect.width,
            height: pillRect.height,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 34,
            mass: 0.7,
          }}
        />
      )}

      {sectionItems.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li
            key={item.id}
            ref={(el) => {
              itemRefs.current[item.id] = el;
            }}
            role="none"
          >
            {onSelectSection ? (
              <a
                href={`#${item.id}`}
                role="menuitem"
                className={isActive ? "active" : ""}
                onClick={(e) => onSelectSection(e, item.id)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                role="menuitem"
                className={isActive ? "active" : ""}
                onClick={onCloseMobileMenu}
              >
                {item.label}
              </Link>
            )}
          </li>
        );
      })}

      <li
        ref={(el) => {
          itemRefs.current.journey = el;
        }}
        role="none"
      >
        <Link
          href="/journey"
          role="menuitem"
          className={activeId === "journey" ? "active" : ""}
          onClick={onCloseMobileMenu}
        >
          {lang === "en" ? "Journey" : "Perjalanan"}
        </Link>
      </li>

      <li role="none" className="mobile-contact">
        <button
          type="button"
          className="nav-contact-btn"
          onClick={() => {
            onCloseMobileMenu();
            onOpenContact();
          }}
        >
          <i className="fas fa-paper-plane" />{" "}
          {lang === "en" ? "Contact" : "Kontak"}
        </button>
      </li>
    </ul>
  );
}
