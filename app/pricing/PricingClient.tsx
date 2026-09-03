"use client";

import Link from "next/link";
import {
  Check,
  Minus,
  MessageCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  BadgePercent,
  Sparkles,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Data                                                                   */
/* ---------------------------------------------------------------------- */

type Tier = {
  key: string;
  name: string;
  type: string;
  badge?: "popular" | "value";
  price: number;
  originalPrice: number;
  delivery: string;
  suitedFor: string;
  bullets: string[];
};

const TIERS: Tier[] = [
  {
    key: "cast",
    name: "Cast",
    type: "Static website",
    price: 4999,
    originalPrice: 9999,
    delivery: "5 working days",
    suitedFor: "New shops",
    bullets: [
      "3–5 page static website",
      "Fully responsive, mobile-ready",
      "Starter logo",
      "WhatsApp, call & map buttons",
      "Basic on-page SEO",
    ],
  },
  {
    key: "temper",
    name: "Temper",
    type: "Static website",
    price: 7999,
    originalPrice: 15999,
    delivery: "8 working days",
    suitedFor: "Growing local business",
    bullets: [
      "Up to 7 page static website",
      "Google Business Profile setup",
      "Starter logo + tagline",
      "Visiting card design",
      "Full on-page SEO",
    ],
  },
  {
    key: "forge",
    name: "Forge",
    type: "Partially dynamic",
    badge: "popular",
    price: 11999,
    originalPrice: 23999,
    delivery: "10 working days",
    suitedFor: "Brands wanting leads",
    bullets: [
      "Partially dynamic website, as per need",
      "Branding kit — logo, tagline, card, letterhead, founder story, ID template + 1 signage",
      "WhatsApp lead alerts",
      "Website analytics",
      "3 months Care Plan free",
    ],
  },
  {
    key: "alloy",
    name: "Alloy",
    type: "Fully dynamic",
    badge: "value",
    price: 29999,
    originalPrice: 59999,
    delivery: "15 working days",
    suitedFor: "Ordering & bookings",
    bullets: [
      "Fully dynamic site, as per need",
      "Identity kit — custom ID cards, signage + flex/banner, invoice/quotation, social kit",
      "Self-update panel",
      "Online booking",
      "12 months Care Plan free",
    ],
  },
];

type Cell = string | boolean;

type Row = {
  feature: string;
  values: [Cell, Cell, Cell, Cell];
};

const ROWS: Row[] = [
  {
    feature: "Pages",
    values: ["3–5", "Up to 7", "As per need", "As per need"],
  },
  { feature: "Revisions", values: ["2", "3", "5", "8"] },
  {
    feature: "Logo",
    values: ["Starter", "Starter", "Custom kit", "Custom kit"],
  },
  {
    feature: "Tagline, letterhead, founder story",
    values: [false, false, true, true],
  },
  { feature: "Visiting card", values: [false, true, true, true] },
  {
    feature: "ID cards & signage",
    values: [false, false, "Template + 1", "Custom + flex/banner"],
  },
  {
    feature: "Invoice/quotation & social kit",
    values: [false, false, false, true],
  },
  { feature: "WhatsApp, call & map buttons", values: [true, true, true, true] },
  { feature: "On-page SEO", values: ["Basic", "Full", "Full", "Full"] },
  { feature: "Google Business Profile", values: [false, true, true, true] },
  { feature: "WhatsApp lead alerts", values: [false, false, true, true] },
  { feature: "Website analytics", values: [false, false, true, true] },
  { feature: "Self-update panel", values: [false, false, false, true] },
  { feature: "Online booking", values: [false, false, false, true] },
  {
    feature: "Care Plan free",
    values: [false, false, "3 months", "12 months"],
  },
];

const currency = (n: number) => new Intl.NumberFormat("en-IN").format(n);

// Approximate USD equivalent — rate locked for pricing page display only.
// (metadata promises "priced in INR with short USD equivalents").
const USD_RATE = 83;
const usd = (n: number) =>
  `US$ ${Math.round(n / USD_RATE).toLocaleString("en-US")}`;

const savePercent = (tier: Tier) =>
  Math.round((1 - tier.price / tier.originalPrice) * 100);

/* ---------------------------------------------------------------------- */
/*  WhatsApp links                                                         */
/*  Number below matches the site-wide float widget (WhatsAppWidget.tsx). */
/* ---------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "919034009062";

// Generic pricing inquiry — used by the bottom "WhatsApp us" CTA.
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Maldonite! I'd like to know more about your website packages and pricing.",
)}`;

// Per-package pre-filled message — each card's "Get started" button opens
// WhatsApp with the specific package name so our team can quote accurately.
const whatsappUrl = (tier: Tier) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Maldonite! I'd like to know more about the ${tier.name} package (${tier.type}, ₹${currency(tier.price)} + GST）. Can you share the details?`,
  )}`;

/* ---------------------------------------------------------------------- */
/*  Small building blocks                                                 */
/* ---------------------------------------------------------------------- */

function FractureRule() {
  // A thin, cracked divider line — a nod to the fracture pattern left when
  // a gold-bismuth casting is broken out of its mould.
  return (
    <svg
      viewBox="0 0 640 16"
      className="mx-auto h-4 w-40 text-gold"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 8 L120 8 L138 2 L156 14 L180 8 L640 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Eyebrow label:  [— gold rule —] CAPS LABEL [— gold rule —] */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-text dark:text-gold">
        {children}
      </span>
      <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
    </div>
  );
}

/* Ambient dot-grid background, used behind heroes (same as Careers page). */
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 text-gray-900 opacity-[0.04] dark:text-white dark:opacity-[0.05]"
      style={{
        backgroundImage:
          "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

function Cell({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <Check
        className="mx-auto h-4 w-4 text-gold"
        strokeWidth={2.5}
        aria-label="Included"
      />
    );
  }
  if (value === false) {
    return (
      <Minus
        className="mx-auto h-4 w-4 text-gray-300 dark:text-white/20"
        strokeWidth={2}
        aria-label="Not included"
      />
    );
  }
  return (
    <span className="text-sm text-gray-600 dark:text-white/80">{value}</span>
  );
}

/*  Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function PricingPage() {
  return (
    <main className="overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-darkbg1 dark:text-white">
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 text-center sm:px-6 sm:pt-36 md:pb-24">
        {/* Ambient background — gold wash, floating orbs, dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-gold/10 to-transparent" />
          <div
            className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-accent-blue/10 blur-3xl"
          />
          <div
            className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
          />
          <DotGrid />
        </div>

        <div
          className="relative z-10 mx-auto max-w-4xl"
        >
          {/* Eyebrow badge */}
          <div
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gold-text backdrop-blur-sm shadow-lg shadow-gold/5 dark:text-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              Website packages
            </span>
          </div>

          <h1
            className="mx-auto mt-5 max-w-3xl font-[var(--font-display)] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          >
            Pricing built like the work
            <br />
            <span>solid, considered, built to last.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl text-balance text-base text-gray-500 dark:text-gray-400 md:text-lg"
          >
            Four packages, priced in INR with short USD equivalents — fifty
            percent advance, the balance on go-live. No hidden charges, ever.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="#plans"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/30 sm:w-auto"
            >
              Explore packages
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#compare"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold text-gold-text transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold/10 dark:text-gold sm:w-auto"
            >
              Compare plans
            </a>
          </div>

          {/* Trust chips */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {[
              { icon: ShieldCheck, label: "No hidden charges, ever" },
              { icon: Clock, label: "Delivery committed in writing" },
              { icon: BadgePercent, label: "50% advance, balance on go-live" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-gray-600 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
              >
                <chip.icon className="h-3.5 w-3.5 text-gold" />
                {chip.label}
              </span>
            ))}
          </div>

          <div
            className="mt-9"
          >
            <FractureRule />
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* Pricing cards                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="plans" className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((tier) => {
            const isPopular = tier.badge === "popular";
            const isValue = tier.badge === "value";
            return (
              <div
                key={tier.key}
                className="h-full"
              >
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-7 transition-shadow duration-300 ${
                    isPopular
                      ? "border-accent-blue/40 bg-gradient-to-b from-accent-blue/[0.06] to-white shadow-xl shadow-accent-blue/10 ring-1 ring-accent-blue/30 xl:-translate-y-3 xl:scale-[1.03] dark:from-accent-blue/[0.12] dark:to-darkbg2"
                      : "border-gray-200 bg-white shadow-sm hover:border-gold/40 hover:shadow-md dark:border-white/10 dark:bg-darkbg2 dark:hover:border-gold/40"
                  }`}
                >
                  {tier.badge && (
                    <span
                      className={`mb-5 inline-flex w-fit items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${
                        isPopular
                          ? "bg-accent-blue text-white shadow-sm shadow-accent-blue/40"
                          : isValue
                            ? "border border-gold/40 bg-gold/10 text-gold-text dark:text-gold"
                            : ""
                      }`}
                    >
                      {isPopular ? "Most popular" : "Best value"}
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-white/40">
                    {tier.type}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">
                      ₹{currency(tier.originalPrice)}
                    </span>
                    <span className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs font-bold text-accent-blue">
                      {savePercent(tier)}% off
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-[var(--font-display)] text-4xl font-extrabold tracking-tight text-accent-blue">
                      ₹{currency(tier.price)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      + GST
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>≈ {usd(tier.price)}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-white/20" />
                    <span className="text-gray-400 dark:text-white/30">
                      ~{usd(tier.originalPrice)} originally
                    </span>
                  </div>

                  {/* Delivery */}
                  <div className="mt-5 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200">
                    <Clock className="h-4 w-4 shrink-0 text-gold" />
                    Delivery in {tier.delivery}
                  </div>

                  {/* Bullets */}
                  <ul className="mt-5 flex-1 space-y-3">
                    {tier.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          strokeWidth={3}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-xs text-gray-400 dark:text-white/35">
                    Best suited for {tier.suitedFor.toLowerCase()}
                  </p>

                  {/* CTA — gold stays gold even inside pricing/commerce */}
                  <Link
                    href={whatsappUrl(tier)}
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-gold text-navy shadow-lg shadow-gold/25 hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/30"
                        : "border border-gold/40 text-gold-text hover:bg-gold/10 dark:text-gold"
                    }`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Get started
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* Full comparison table                                            */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="compare"
        className="scroll-mt-24 border-t border-gray-200 px-4 py-16 dark:border-white/10 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div
          >
            <SectionEyebrow>Comprehensive breakdown</SectionEyebrow>
            <h2 className="mt-3 text-center font-[var(--font-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              Full feature comparison
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-gray-500 dark:text-gray-400">
              Everything committed to in writing — and delivered before time,
              wherever we can.
            </p>
          </div>

          <div
            className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-darkbg2"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.03]">
                    <th className="w-56 px-5 py-5 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Feature
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.key}
                        className={`px-5 py-5 text-left ${
                          tier.badge === "popular"
                            ? "bg-accent-blue/[0.05]"
                            : ""
                        }`}
                      >
                        <div
                          className={`text-base font-semibold ${
                            tier.badge === "popular"
                              ? "text-accent-blue"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {tier.name}
                        </div>
                        <div className="mt-0.5 text-sm font-bold text-accent-blue">
                          ₹{currency(tier.price)}
                          <span className="ml-1.5 font-normal text-gray-400 dark:text-white/40">
                            ≈ {usd(tier.price)}
                          </span>
                        </div>
                        {tier.badge && (
                          <div
                            className={`mt-1 text-xs font-semibold ${
                              tier.badge === "popular"
                                ? "text-accent-blue"
                                : "text-gold-text dark:text-gold"
                            }`}
                          >
                            {tier.badge === "popular"
                              ? "Most popular"
                              : "Best value"}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-4 text-sm font-medium text-gray-500 dark:text-white/70">
                      Website type
                    </td>
                    {TIERS.map((tier) => (
                      <td
                        key={tier.key}
                        className={`px-5 py-4 text-center text-sm text-gray-700 dark:text-white/80 ${
                          tier.badge === "popular"
                            ? "bg-accent-blue/[0.05]"
                            : ""
                        }`}
                      >
                        {tier.type}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-4 text-sm font-medium text-gray-500 dark:text-white/70">
                      Delivery time
                    </td>
                    {TIERS.map((tier) => (
                      <td
                        key={tier.key}
                        className={`px-5 py-4 text-center text-sm text-gray-600 dark:text-white/80 ${
                          tier.badge === "popular"
                            ? "bg-accent-blue/[0.05]"
                            : ""
                        }`}
                      >
                        {tier.delivery}
                      </td>
                    ))}
                  </tr>
                  {ROWS.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 dark:border-white/5 dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-gray-500 dark:text-white/70">
                        {row.feature}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={TIERS[i].key}
                          className={`px-5 py-4 text-center ${
                            TIERS[i].badge === "popular"
                              ? "bg-accent-blue/[0.05]"
                              : ""
                          }`}
                        >
                          <Cell value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-5 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white/70">
                      Best suited for
                    </td>
                    {TIERS.map((tier) => (
                      <td
                        key={tier.key}
                        className={`px-5 py-5 text-center text-sm font-medium text-gray-600 dark:text-white/80 ${
                          tier.badge === "popular"
                            ? "bg-accent-blue/[0.05]"
                            : ""
                        }`}
                      >
                        {tier.suitedFor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* Trust strip                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "50% advance only",
              text: "Half up front — the balance on go-live. No hidden charges.",
            },
            {
              icon: Clock,
              title: "Delivery committed in writing",
              text: "Every deadline put on paper and honoured, mostly ahead of time.",
            },
            {
              icon: Sparkles,
              title: "Care Plan included",
              text: "Free Care Plan on Forge & Alloy tiers, so your site keeps working.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-darkbg2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                <f.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {f.title}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ---------------------------------------------------------------- */}
      {/* Guidance CTA — gold panel, mirrors BottomCTA / CTAWithForm        */}
      {/* ---------------------------------------------------------------- */}
      <section className="px-4 pb-20 pt-16 sm:px-6">
        <div
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gold px-6 py-12 text-center sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 text-navy opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-navy/70">
              Not sure yet?
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-2xl font-extrabold tracking-tight text-navy sm:text-4xl">
              Tell us what your business needs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-navy/80 sm:text-base">
              Every package carries the same promise — no hidden charges,
              delivery committed in writing, and a team that stays until it
              works. Compare the full breakdown above, or send us a message and
              we&apos;ll point you to the right one.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#compare"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Compare all plans
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={WHATSAPP_URL}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-md transition-transform duration-300 hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
