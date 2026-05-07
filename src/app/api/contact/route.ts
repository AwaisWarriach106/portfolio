import nodemailer from "nodemailer";

import { profile } from "@/lib/profile";

const MAX = { name: 120, email: 254, message: 8000 };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Contact delivery uses **Nodemailer** (MIT) over **SMTP** — works with any
 * standards-compliant mail server, including self-hosted open-source stacks
 * (e.g. Postfix, Mailcow, Stalwart, docker-mailserver) or your VPS relay.
 *
 * `.env.local` (server only — never commit real passwords):
 *
 *   SMTP_HOST=mail.example.com
 *   SMTP_PORT=587
 *   SMTP_SECURE=false          # true for port 465 (implicit TLS)
 *   SMTP_USER=you@example.com   # omit if your relay allows unauthenticated (rare)
 *   SMTP_PASSWORD=...
 *   SMTP_FROM=Portfolio <you@example.com>
 *   CONTACT_TO_EMAIL=you@gmail.com   # inbox that receives form mail (optional)
 *
 * If `SMTP_HOST` is unset, the client falls back to a mailto: draft.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const { name, email, message, _hp } = body as Record<string, unknown>;

  if (typeof _hp === "string" && _hp.trim() !== "") {
    return Response.json({ ok: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return Response.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const n = name.trim().slice(0, MAX.name);
  const e = email.trim().slice(0, MAX.email);
  const m = message.trim().slice(0, MAX.message);

  if (n.length < 2 || m.length < 10) {
    return Response.json(
      { ok: false, error: "Please add a bit more detail (name + message)." },
      { status: 400 },
    );
  }

  if (!isValidEmail(e)) {
    return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST?.trim();
  if (!host) {
    return Response.json({
      ok: false,
      useMailto: true,
      error: "SMTP not configured.",
    });
  }

  const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD;

  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? profile.links.email;
  const from =
    process.env.SMTP_FROM?.trim() ??
    (user ? `Portfolio <${user}>` : `Portfolio <${to}>`);

  const text = [
    `New message via portfolio contact form`,
    ``,
    `From: ${n}`,
    `Visitor email: ${e}`,
    ``,
    m,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      ...(user && pass !== undefined && pass !== ""
        ? { auth: { user, pass } }
        : {}),
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: e,
      subject: `[Portfolio] Message from ${n}`,
      text,
    });

    return Response.json({ ok: true, via: "smtp" });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "SMTP send failed";
    const gmailAppPasswordHint =
      /534|Application-specific password|InvalidSecondFactor/i.test(raw)
        ? " Gmail: enable 2-Step Verification, then create an App Password (Google Account → Security → App passwords) and put that 16-character value in SMTP_PASSWORD — not your normal Gmail password."
        : "";
    return Response.json(
      { ok: false, error: `Email could not be sent: ${raw}${gmailAppPasswordHint}` },
      { status: 502 },
    );
  }
}
