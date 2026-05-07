"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { SectionNav } from "@/components/SectionNav";
import { profile } from "@/lib/profile";

export function MobileTopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 border-b border-white/10 bg-[var(--background)]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/75">
      <div
        className="flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3"
        style={{
          paddingTop: "max(0.625rem, env(safe-area-inset-top, 0px))",
        }}
      >
        <a
          href="#top"
          className="min-h-10 min-w-0 touch-manipulation py-1 text-sm font-medium leading-snug text-zinc-50 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          {profile.name}
        </a>
        <button
          type="button"
          aria-label={open ? "Close section menu" : "Open section menu"}
          aria-expanded={open}
          aria-controls="mobile-section-nav"
          className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-zinc-200 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-section-nav"
        className="max-h-[min(70vh,calc(100dvh-5.5rem))] overflow-y-auto overscroll-contain px-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:px-6"
        hidden={!open}
      >
        <SectionNav
          onNavigate={() => setOpen(false)}
          className="touch-manipulation border-t border-white/[0.06] pt-2"
        />
      </div>
    </header>
  );
}
