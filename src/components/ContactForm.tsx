"use client";

import { useCallback, useState } from "react";
import { Loader, Send } from "lucide-react";

import { profile } from "@/lib/profile";
import { cn } from "@/utils/cn";

function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
  const body = encodeURIComponent(
    [`Hi ${profile.name.split(" ")[0] ?? profile.name},`, "", message, "", `— ${name}`, email].join(
      "\n",
    ),
  );
  return `mailto:${profile.links.email}?subject=${subject}&body=${body}`;
}

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-base text-zinc-100 placeholder:text-zinc-400 outline-none transition-colors focus:border-[color-mix(in_oklab,var(--accent)_40%,transparent)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_45%,transparent)]";

const labelCls =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setStatus("sending");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _hp: hp,
          }),
        });

        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          useMailto?: boolean;
          error?: string;
        };

        if (data.ok) {
          setStatus("sent");
          setName("");
          setEmail("");
          setMessage("");
          setHp("");
          return;
        }

        if (data.useMailto === true) {
          window.location.href = buildMailto(
            name.trim(),
            email.trim(),
            message.trim(),
          );
          setStatus("idle");
          return;
        }

        setError(data.error ?? "Something went wrong.");
        setStatus("error");
      } catch {
        window.location.href = buildMailto(name.trim(), email.trim(), message.trim());
        setStatus("idle");
      }
    },
    [name, email, message, hp],
  );

  return (
    <form
      onSubmit={submit}
      className="relative space-y-4"
      aria-busy={status === "sending"}
    >
      <input
        type="text"
        name="website"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelCls}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            minLength={2}
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelCls}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={8000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputCls, "min-h-[7.5rem] resize-y leading-relaxed")}
          placeholder="What you’re building, timelines, and how I can help…"
        />
      </div>

      {error ? (
        <p className="text-sm font-medium text-amber-100" role="alert">
          {error}
        </p>
      ) : null}

      {status === "sent" ? (
        <p className="text-sm font-medium text-emerald-200" role="status">
          Sent — I’ll get back to you soon.
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-zinc-50 px-6 text-base font-semibold text-zinc-950 transition-all sm:w-auto",
            "hover:bg-white hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        >
          {status === "sending" ? (
            <>
              <Loader className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
