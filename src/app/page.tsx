import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { ExperienceTimeline } from "@/sections/ExperienceTimeline";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Skills } from "@/sections/Skills";
import { MobileTopNav } from "@/components/MobileTopNav";
import { Sidebar } from "@/components/Sidebar";
import { Container } from "@/components/Container";
import { profile } from "@/lib/profile";

export default function Home() {
  return (
    <div id="top" className="min-h-screen min-h-dvh bg-[var(--background)]">
      <MobileTopNav />
      <main id="main-content" className="isolate" tabIndex={-1}>
        <Container className="py-3 sm:py-5 lg:py-6">
          <div className="lg:grid lg:grid-cols-[minmax(17rem,25rem)_1fr] lg:gap-6 xl:gap-8">
            <aside className="w-full lg:min-h-0 lg:self-stretch lg:pr-5 lg:border-r lg:border-white/[0.06]">
              <Sidebar />
            </aside>
            <div className="min-w-0 border-t border-white/[0.05] pt-4 sm:pt-5 lg:border-t-0 lg:pt-0">
              <div className="space-y-0">
                <About />
                <FeaturedProjects />
                {/* <SystemDesign /> */}
                <Skills />
                <ExperienceTimeline />
                <Contact />
              </div>
              <footer className="mt-6 border-t border-white/[0.06] pt-3 sm:mt-7 sm:pt-4 lg:mt-8">
                <div className="flex flex-col gap-1.5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pb-6 lg:pb-8">
                  <p className="font-mono text-[11px] leading-relaxed tracking-wide text-zinc-500">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-zinc-400">{profile.name}</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-zinc-500">
                    <span>{profile.location}</span>
                    <span className="mx-2 text-zinc-700" aria-hidden>
                      ·
                    </span>
                    <span className="font-mono">Next.js</span>
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
