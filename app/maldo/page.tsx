import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";

/**
 * MALDO — character/bio page for the Maldonite site.
 *
 * Drop this file at: app/maldo/page.tsx
 *
 * Assets expected (add real files, these paths are placeholders):
 *   /public/maldo/hero.png        — full-body hero portrait (mug + backpack shot)
 *   /public/maldo/story.png       — "at the desk with laptop" shot
 *   /public/maldo/insta1.png ... insta3.png — recent post thumbnails
 *   /public/maldo/story.png       — also reused as the 4th Instagram post
 *
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet Maldo | Maldonite",
  description:
    "Maldo is Maldonite's resident builder — part hiker, part engineer, entirely obsessed with turning your vision into something gold-standard.",
};

const process = [
  { label: "Idea", detail: "We start with your problem, not a template." },
  {
    label: "Code",
    detail: "Clean, modern builds — Next.js, MERN, whatever fits.",
  },
  {
    label: "Build",
    detail: "Design and development move together, not in sequence.",
  },
  {
    label: "Launch",
    detail: "Shipped, tested, and built to actually hold up.",
  },
  {
    label: "Impact",
    detail: "The only metric that matters: did it work for you.",
  },
];

const offTheClock = [
  { label: "Coffee order", value: "Black. No sugar. No exceptions." },
  { label: "Desk or trail", value: "Both, usually the same day." },
  { label: "Currently reading", value: "Docs. Mostly docs." },
  {
    label: "Debugging soundtrack",
    value: "Silence, then panic, then silence again.",
  },
];

// Fixed (non-random) rotation values so server-rendered markup is deterministic.
const journalTilts = [-2, 1.5, -1.5, 2];
const polaroidTilts = [-3, 2, -2, 3];

// Instagram-themed posts (mirrors the files in /public/maldo/)
const instaPosts = [
  {
    img: "insta1",
    likes: "2,174 likes",
    caption: "Camp > debugger. Tent up, Wi-Fi down, zero blockers. 🏕️",
    hashtags: "#traildays #deskOrTrail",
  },
  {
    img: "insta2",
    likes: "986 likes",
    caption:
      "Deploy day = trailhead day. Shipped at dawn, summited by noon. ⛰️",
    hashtags: "#buildinpublic #goldenstandard",
  },
  {
    img: "insta3",
    likes: "1,529 likes",
    caption: "Golden hour compile. Zero errors, one very good view. ✨",
    hashtags: "#devlife #maldo",
  },
  {
    img: "story",
    likes: "1,208 likes",
    caption: "Workstation of the day. Whole office, one backpack. 💻",
    hashtags: "#remotework #deskOrTrail",
  },
];

/* ---------- small icon marks, used as a recurring motif ---------- */

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function CompassMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" />
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1 5"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="8"
          x2="50"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <path
        d="M50 22 L60 50 L50 78 L40 50 Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}

function FlagMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 21V3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 4.5h12l-3.2 4 3.2 4H6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

function TopoLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <path
        d="M-40,140 C100,90 180,200 340,150 C500,100 560,200 740,150"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-40,220 C100,170 180,280 340,230 C500,180 560,280 740,230"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-40,300 C100,250 180,360 340,310 C500,260 560,360 740,310"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-40,380 C100,330 180,440 340,390 C500,340 560,440 740,390"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-40,460 C100,410 180,520 340,470 C500,420 560,520 740,470"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function MaldoPage() {
  return (
    <main
      className={`${fraunces.variable} ${sora.variable} bg-navy text-white`}
      style={{ fontFamily: "var(--font-sora)" }}
    >
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden border-b border-navy/10 bg-gradient-to-b from-gold-cream via-white to-white dark:border-white/10 dark:from-darkbg2 dark:via-navy dark:to-navy">
        <TopoLines className="pointer-events-none absolute inset-0 h-full w-full text-gold-text/[0.12] dark:text-gold/15" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="order-2 md:order-1">
            <p className="flex items-center gap-2 text-sm text-navy/70 dark:text-white/70">
              <CompassMark className="h-4 w-4 text-gold-text dark:text-gold" />
              Maldonite&rsquo;s resident builder
            </p>

            <h1
              className="mt-4 text-5xl leading-[1.05] md:text-6xl text-navy dark:text-white"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Meet <span className=" italic">Maldo</span>.
            </h1>

            <p className="mt-6 max-w-md text-lg text-navy/80 dark:text-white/80">
              Half hiker, half engineer, entirely obsessed with turning your
              vision into something gold-standard. She codes your site, debugs
              your worst edge cases, and still makes it to the trailhead by
              sunrise.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-2xl bg-gold px-6 py-3 font-medium text-navy transition-colors hover:bg-gold/90"
              >
                Start a project
              </Link>
              <a
                href="https://instagram.com/maldonite.solutions"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-navy/80 underline decoration-navy/40 underline-offset-4 hover:text-gold-text hover:decoration-gold-text dark:text-white/80 dark:decoration-white/40 dark:hover:text-gold dark:hover:decoration-gold"
              >
                Follow her on Instagram
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-gold-glow/80 blur-3xl dark:bg-gold/20"
              />
              <Image
                src="/maldo/hero.png"
                alt="Maldo, Maldonite's mascot, sitting on a rock in a mountain landscape holding a coffee mug"
                fill
                sizes="(min-width: 768px) 400px, 320px"
                className="object-contain"
                priority
              />

              {/* passport-stamp badge */}
              <div
                aria-hidden
                className="absolute -right-2 top-6 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border border-gold/70 bg-navy/70 text-gold backdrop-blur-sm md:h-24 md:w-24"
              >
                <CompassMark className="h-14 w-14 md:h-16 md:w-16" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- HER STORY ---------- */}
      <section className="bg-darkbg2 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <Image
              src="/maldo/story.png"
              alt="Maldo working on a laptop outdoors"
              fill
              sizes="(min-width: 768px) 448px, 320px"
              className="rounded-3xl object-cover"
            />
            <div className="absolute -bottom-6 -right-4 rotate-[-4deg] rounded-xl border border-gold/40 bg-navy px-4 py-3 text-sm text-white shadow-lg shadow-black/20">
              Focus. Build. <span className="text-gold">Grow.</span> Repeat.
            </div>
          </div>

          <div>
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Why there&rsquo;s a face behind the code
            </h2>
            <p className="mt-6 text-white/80">
              Maldonite builds websites, but a company logo doesn&rsquo;t answer
              emails and it definitely doesn&rsquo;t survive a client&rsquo;s
              ninth &ldquo;one small change.&rdquo; Maldo does. She&rsquo;s the
              name behind the commits, the person who actually reads your
              feedback twice, and the reason &ldquo;we treat your vision like
              gold&rdquo; isn&rsquo;t just a tagline on a hoodie.
            </p>
            <p className="mt-4 text-white/80">
              When she&rsquo;s not shipping a client&rsquo;s site, she&rsquo;s
              usually somewhere with a view, a mug in hand, thinking about the
              next thing worth building.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PROCESS — rendered as an elevation profile ---------- */}
      <section className="bg-gold-cream text-navy dark:bg-navy dark:text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2
            className="max-w-lg text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            How Maldo gets you from idea to impact
          </h2>
          <p className="mt-4 max-w-md text-navy/70 dark:text-white/70">
            Five stages, one climb. Every project takes the same route, just at
            a different pace.
          </p>

          {/* desktop: ascending trail */}
          <div
            className="relative mt-20 hidden md:block"
            style={{ height: 260 }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 border-t border-dashed border-gold-text/25 dark:border-gold/25"
            />
            {process.map((step, i) => {
              const bottom = 36 + i * 34;
              const left = 6 + i * (88 / (process.length - 1));
              const isSummit = i === process.length - 1;
              return (
                <div
                  key={step.label}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${left}%`,
                    bottom: `${bottom}px`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <span className="mb-2 w-36 text-center text-sm leading-snug text-navy/70 dark:text-white/70">
                    {step.detail}
                  </span>
                  <p
                    className="mb-2 text-lg text-gold-text dark:text-gold"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {step.label}
                  </p>
                  {isSummit ? (
                    <FlagMark className="h-5 w-5 text-gold-text dark:text-gold" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full border border-gold-text/50 bg-gold-glow dark:border-gold/50 dark:bg-gold/20" />
                  )}
                  <span
                    aria-hidden
                    className="border-l border-dashed border-gold-text/25 dark:border-gold/25"
                    style={{ height: `${bottom}px` }}
                  />
                </div>
              );
            })}
          </div>

          {/* mobile: vertical trail */}
          <ol className="mt-14 space-y-8 border-l border-dashed border-gold-text/25 pl-6 md:hidden dark:border-gold/25">
            {process.map((step, i) => {
              const isSummit = i === process.length - 1;
              return (
                <li key={step.label} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-gold-text/50 bg-gold-glow dark:border-gold/50 dark:bg-gold/20"
                  />
                  {isSummit && (
                    <FlagMark className="absolute -left-9 top-0 h-5 w-5 text-gold-text dark:text-gold" />
                  )}
                  <p
                    className="text-lg text-gold-text dark:text-gold"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm text-navy/70 dark:text-white/70">{step.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- OFF THE CLOCK — pinned journal cards ---------- */}
      <section className="bg-darkbg2 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Off the clock
          </h2>

          <dl className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {offTheClock.map((item, i) => (
              <div
                key={item.label}
                className="relative bg-white px-6 py-7 shadow-[0_16px_28px_-16px_rgba(11,20,38,0.4)] dark:bg-navy dark:shadow-black/40"
                style={{
                  transform: `rotate(${journalTilts[i % journalTilts.length]}deg)`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-8 h-5 w-16 bg-gold"
                  style={{ transform: "rotate(-3deg)" }}
                />
                <dt className="text-sm text-navy/50 dark:text-white/50">{item.label}</dt>
                <dd
                  className="mt-2 text-lg italic text-navy dark:text-white"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- INSTAGRAM STRIP — polaroids, Instagram-themed ---------- */}
      <section className="border-t border-white/20 bg-gradient-to-tr from-[#FEDA75] via-[#FA7E1E] via-[#D62976] via-[#962FBF] to-[#4F5BD5]">
        <div className="mx-auto max-w-6xl px-6 py-6 md:py-8">
          {/* Instagram-style header */}
          <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm tracking-[0.2em] text-white/85">
                <InstagramMark className="h-5 w-5 text-white" />
                INSTAGRAM
              </p>
              <h2
                className="mt-0.5 max-w-md text-2xl text-white md:text-3xl"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                She posts more than she pushes to prod
              </h2>
            </div>
            <a
              href="https://instagram.com/maldonite.solutions"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-lg shadow-black/10 transition-colors hover:bg-white/90"
            >
              Follow @maldonite.solutions
            </a>
          </header>

          {/* Instagram post cards (kept slightly tilted like polaroids) */}
          <div className="mt-5 flex gap-6 overflow-x-auto px-1 pb-1">
            {instaPosts.map((post, i) => (
              <article
                key={post.img}
                className="w-48 flex-shrink-0 rounded-2xl mt-4 m-2 bg-white shadow-2xl ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-1 md:w-56 dark:bg-navy dark:ring-white/10"
                style={{
                  transform: `rotate(${polaroidTilts[i % polaroidTilts.length]}deg)`,
                }}
              >
                {/* post header */}
                <div className="flex items-center gap-2.5 px-3 pb-1 pt-1.5">
                  <span
                    className="rounded-full p-[2px]"
                    style={{
                      background:
                        "conic-gradient(from 180deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FEDA75)",
                    }}
                  >
                    <Image
                      src="/ignot-logo.png"
                      alt=""
                      width={28}
                      height={28}
                      className="block h-7 w-7 bg-white rounded-full border-2 border-white object-cover dark:bg-navy dark:border-navy"
                    />
                  </span>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="flex items-center gap-1 text-[12px] font-semibold text-navy dark:text-white">
                      maldonite.solutions
                      <BadgeCheck
                        className="h-3 w-3 text-sky-500"
                        aria-label="Verified"
                      />
                    </p>
                    <p className="text-[10px] text-navy/50 dark:text-white/50">
                      Somewhere on the trail
                    </p>
                  </div>
                  <MoreHorizontal className="h-4 w-4 text-navy/40 dark:text-white/40" />
                </div>

                {/* post image */}
                <div className="relative aspect-square overflow-hidden bg-gold-glow dark:bg-gold/20">
                  <Image
                    src={`/maldo/${post.img}.png`}
                    alt="Maldo Instagram post"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>

                {/* action bar */}
                <div className="px-3 pb-2 pt-1.5">
                  <div className="flex items-center gap-3 text-navy dark:text-white">
                    <Heart className="h-4 w-4 transition-colors hover:fill-red-500 hover:text-red-500" />
                    <MessageCircle className="h-4 w-4" />
                    <Send className="h-4 w-4" />
                    <Bookmark className="ml-auto h-4 w-4" />
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-navy dark:text-white">
                    {post.likes}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-navy/80 dark:text-white/80">
                    <span className="font-semibold text-navy dark:text-white">
                      maldonite.solutions
                    </span>{" "}
                    {post.caption}{" "}
                    <span className="font-medium text-sky-600">
                      {post.hashtags}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOOTER CTA ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gold-cream dark:from-navy dark:to-darkbg2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gold-glow/60 via-white to-white dark:from-gold/20 dark:via-navy dark:to-navy"
        />
        <CompassMark className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 text-gold-text/[0.1] dark:text-gold/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <h2
            className="text-3xl md:text-5xl text-navy dark:text-white"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Got a vision? Maldo&rsquo;s already sketching it.
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-2xl bg-gold px-8 py-3.5 font-medium text-navy transition-colors hover:bg-gold/90"
            >
              Work with Maldo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
