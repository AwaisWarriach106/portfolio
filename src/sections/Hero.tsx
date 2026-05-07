"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Link2, Mail } from "lucide-react";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { SiteNav } from "@/components/SiteNav";
import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <header className="border-b border-white/10">
      <Container className="py-10">
        <div className="flex items-center justify-between gap-6">
          <a
            href="#top"
            className="text-sm font-medium tracking-tight text-zinc-50"
          >
            {profile.name}
          </a>
          <SiteNav className="hidden sm:flex" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-14 max-w-3xl"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            {profile.headline}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Full stack engineering with a bias for clean UI, API design clarity,
            and pragmatic system architecture.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary">
              View projects
            </Button>
            <Button href={profile.links.resume} variant="secondary" external>
              Download resume <Download className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {profile.stackChips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-zinc-300">
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 hover:bg-white/[0.04] hover:text-zinc-50"
              href="#projects"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Live demos
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 hover:bg-white/[0.04] hover:text-zinc-50"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Link2 className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-1 hover:bg-white/[0.04] hover:text-zinc-50"
              href={`mailto:${profile.links.email}`}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email
            </a>
          </div>
        </motion.div>
      </Container>
    </header>
  );
}

