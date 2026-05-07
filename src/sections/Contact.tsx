"use client";

import { FileText, Link2, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/lib/profile";
import { cn } from "@/utils/cn";

function SocialChip({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-zinc-200 transition-colors sm:min-h-11 sm:px-4 sm:text-sm",
        "hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-zinc-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
      )}
    >
      {children}
    </a>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-section border-t border-white/[0.06] py-5 sm:py-6 lg:py-8"
    >
      <Container className="lg:px-0">
        <FadeIn>
          <SectionHeading eyebrow="Contact" title="Tell me what you’re shipping" />

          <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-950/50 shadow-[0_14px_36px_-18px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div
              className="pointer-events-none absolute -right-12 top-0 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)] blur-2xl"
              aria-hidden
            />

            {/* items-start: intro column height matches its content (no dead space under LinkedIn) */}
            <div className="relative grid gap-0 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start xl:grid-cols-[minmax(0,24rem)_1fr]">
              <aside
                className="border-b border-white/[0.06] p-4 sm:p-5 lg:border-b-0 lg:border-r lg:border-white/[0.06] lg:p-5 xl:p-6"
                aria-label="How to reach out"
              >
                <p className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                  Send a short note: problem, stack, and timeline. I’ll follow up with
                  questions or a call — typically within{" "}
                  <span className="font-medium text-zinc-200">48 hours</span>.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <SocialChip href={profile.links.linkedin} label="Open LinkedIn profile">
                    <Link2 className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                    LinkedIn
                  </SocialChip>
                  <SocialChip
                    href={`mailto:${profile.links.email}`}
                    label={`Email ${profile.name}`}
                  >
                    <Mail className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                    Email
                  </SocialChip>
                  <SocialChip
                    href={profile.links.resume}
                    label="Download resume PDF"
                  >
                    <FileText className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                    Resume
                  </SocialChip>
                </div>

                <div className="mt-5 border-t border-white/[0.06] pt-4">
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    <MapPin
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500"
                      aria-hidden
                    />
                    <span>
                      <span className="font-medium text-zinc-300">Location</span>
                      <span className="mx-1.5 text-zinc-600" aria-hidden>
                        ·
                      </span>
                      {profile.location}. Open to remote roles and async collaboration.
                    </span>
                  </p>
                </div>
              </aside>

              <div className="p-4 sm:p-5 lg:p-5 xl:p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
