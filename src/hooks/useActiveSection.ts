"use client";

import { useEffect, useMemo, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  const idSet = useMemo(() => new Set(ids), [ids]);

  useEffect(() => {
    if (ids.length === 0) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && idSet.has(hashId)) {
        setActive(hashId);
      }
    };

    const syncFromScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docBottom = document.documentElement.scrollHeight;
      if (scrollBottom >= docBottom - 2) {
        const lastId = sections.at(-1)?.id;
        if (lastId && idSet.has(lastId)) {
          setActive(lastId);
          return;
        }
      }

      const anchorLine = window.innerHeight * 0.3;
      let next = sections[0]?.id ?? "";

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= anchorLine) {
          next = section.id;
        } else {
          break;
        }
      }

      if (next && idSet.has(next)) {
        setActive(next);
      }
    };

    syncFromHash();
    syncFromScroll();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scroll", syncFromScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("scroll", syncFromScroll);
    };
  }, [ids, idSet]);

  return active;
}

