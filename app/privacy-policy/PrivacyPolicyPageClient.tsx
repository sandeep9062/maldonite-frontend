"use client";

import Link from "next/link";
import {
  Shield,
  Mail,
  FileText,
  Clock,
  Users,
  Link as LinkIcon,
  Globe,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LAST_UPDATED = "October 29, 2026";
const CONTACT_EMAIL = "maldonitesolutions@gmail.com";

type PolicySection = {
  id: string;
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
  content: React.ReactNode;
};

const sections: PolicySection[] = [
  {
    id: "introduction",
    num: 1,
    title: "Introduction",
    icon: FileText,
    color: "bg-gold/10 text-gold border-gold/20",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Welcome to <strong>Maldonite</strong> ("we", "us", or "our"). This
          Privacy Policy explains how we collect, use, disclose, and protect
          your personal information when you visit our website at maldonite.com
          (the "Site") or otherwise interact with us. Please read it carefully
          to understand our practices regarding your data.
        </p>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By accessing or using the Site, you agree to the collection, use, and
          disclosure of your information as described in this policy. If you do
          not agree, please discontinue use of the Site.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    num: 2,
    title: "Information We Collect",
    icon: Users,
    color:
      "bg-blue/10 text-blue-600 border-blue/20 dark:text-blue-400 dark:border-blue/30",
    content: (
      <>
        <p className="mb-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We may collect several types of information from and about users of
          the Site:
        </p>
        <ul className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              <strong>Personal information:</strong> name, email address, phone
              number, company name, and other details you provide via contact
              forms, quote requests, newsletter signups, or email.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              <strong>Automatically collected information:</strong> IP address,
              browser type, device information, referring pages, pages viewed,
              and other usage data.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              <strong>Cookies and tracking data:</strong> information collected
              through cookies, web beacons, and similar technologies (see
              Section 6).
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    num: 3,
    title: "How We Use Your Information",
    icon: Globe,
    color:
      "bg-emerald/10 text-emerald-600 border-emerald/20 dark:text-emerald-400 dark:border-emerald/30",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We use the information we collect to:
        </p>
        <ul className="mt-4 space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>Respond to your inquiries, quote requests, and messages</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>Provide, operate, and improve our services and the Site</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Send newsletters, updates, or marketing communications you have
              opted into
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Detect, prevent, and address technical issues or fraudulent
              activity
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>Comply with legal obligations and enforce our terms</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    num: 4,
    title: "Sharing & Disclosure",
    icon: LinkIcon,
    color:
      "bg-purple/10 text-purple-600 border-purple/20 dark:text-purple-400 dark:border-purple/30",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We do not sell or rent your personal information. We may share
          information only in the following circumstances:
        </p>
        <ul className="mt-4 space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              With service providers who perform functions on our behalf (e.g.,
              hosting, analytics, email delivery)
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              When required by law, regulation, subpoena, or court order
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              To protect the safety, rights, or property of Maldonite, our
              users, or the public
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              In connection with a merger, acquisition, or sale of assets
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    num: 5,
    title: "Data Security",
    icon: Shield,
    color:
      "bg-amber/10 text-amber-600 border-amber/20 dark:text-amber-400 dark:border-amber/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We implement reasonable administrative, technical, and physical
        safeguards to protect your personal information against unauthorized
        access, disclosure, alteration, or destruction. However, no method of
        transmission over the internet or electronic storage is 100% secure, and
        we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "cookies",
    num: 6,
    title: "Cookies & Tracking Technologies",
    icon: AlertTriangle,
    color:
      "bg-orange/10 text-orange-600 border-orange/20 dark:text-orange-400 dark:border-orange/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We may use cookies and similar tracking technologies (such as web
        beacons and pixels) to enhance your experience, analyze site traffic,
        and improve our services. You can control or disable cookies through
        your browser settings, though disabling them may affect the
        functionality of the Site.
      </p>
    ),
  },
  {
    id: "your-rights",
    num: 7,
    title: "Your Rights",
    icon: Shield,
    color:
      "bg-indigo/10 text-indigo-600 border-indigo/20 dark:text-indigo-400 dark:border-indigo/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Depending on your location, you may have the right to access, correct,
        delete, or restrict the processing of your personal information, as well
        as the right to object to marketing communications or data portability.
        To exercise any of these rights, please contact us using the details in
        Section 10.
      </p>
    ),
  },
  {
    id: "third-party-links",
    num: 8,
    title: "Third-Party Links",
    icon: LinkIcon,
    color:
      "bg-cyan/10 text-cyan-600 border-cyan/20 dark:text-cyan-400 dark:border-cyan/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        The Site may contain links to third-party websites or services. We are
        not responsible for the privacy practices or content of those sites. We
        encourage you to read their privacy policies before providing any
        personal information.
      </p>
    ),
  },
  {
    id: "data-retention",
    num: 9,
    title: "Data Retention",
    icon: Clock,
    color:
      "bg-rose/10 text-rose-600 border-rose/20 dark:text-rose-400 dark:border-rose/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We retain your personal information only for as long as necessary to
        fulfill the purposes described in this policy, unless a longer retention
        period is required or permitted by law.
      </p>
    ),
  },
  {
    id: "contact-us",
    num: 10,
    title: "Contact Us",
    icon: Mail,
    color: "bg-gold/10 text-gold border-gold/20",
    content: (
      <>
        <p className="mb-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or your personal information, please contact us at:
        </p>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-medium text-navy dark:text-white">Email</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <LinkIcon className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-medium text-navy dark:text-white">Website</p>
              <Link
                href="https://www.maldonite.com/contact"
                className="text-sm text-gold hover:underline transition"
              >
                maldonite.com/contact
              </Link>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "changes",
    num: 11,
    title: "Changes to This Policy",
    icon: FileText,
    color:
      "bg-slate/10 text-slate-600 border-slate/20 dark:text-slate-400 dark:border-slate/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We may update this Privacy Policy from time to time. The "Last updated"
        date at the top will reflect the most recent revision. We encourage you
        to review this page periodically for changes. Your continued use of the
        Site after any changes constitutes acceptance of the updated policy.
      </p>
    ),
  },
];
function SectionBadge({ num }: { num: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-navy text-white font-bold text-sm sm:text-base">
      {num}
    </span>
  );
}

function SectionIcon({
  icon: Icon,
  color,
}: {
  icon: React.ElementType;
  color: string;
}) {
  return (
    <span
      className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
    >
      <Icon className="w-5 h-5" />
    </span>
  );
}

export default function PrivacyPolicyPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 sm:mb-8">
            <Shield className="w-4 h-4" />
            Privacy Policy
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-navy dark:text-white tracking-tight leading-tight">
            Your Data, Protected
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mb-8 sm:mb-12">
            Learn how Maldonite collects, uses, and safeguards your personal
            information when you visit our site or use our services.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-500 dark:text-gray-500">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>
              Last updated: <strong>{LAST_UPDATED}</strong>
            </span>
          </div>
          <div className="h-1 w-20 bg-gold rounded mt-10 sm:mt-12" />
        </div>
      </section>

      <Separator className="my-12 sm:my-16 lg:my-20" />

      {/* Quick Facts */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-navy dark:text-white">
            At a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Data We Collect",
                desc: "Personal, contact & usage information",
                icon: Users,
              },
              {
                title: "No Selling",
                desc: "We never sell or rent your data",
                icon: AlertTriangle,
              },
              {
                title: "Your Rights",
                desc: "Access, correct, or delete your data",
                icon: Shield,
              },
            ].map((fact) => (
              <Card
                key={fact.title}
                className="hover:shadow-md transition shadow-sm border border-gray-100 dark:border-gray-800/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <fact.icon className="w-5 h-5 text-gold" />
                    {fact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {fact.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Separator className="my-16 sm:my-20 lg:my-24" />

      {/* Policy Sections */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 sm:gap-8 lg:gap-10">
            {sections.map((section) => (
              <Card
                key={section.id}
                className="overflow-hidden hover:shadow-lg transition border border-gray-100 dark:border-gray-800/50 group"
              >
                <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <SectionIcon icon={section.icon} color={section.color} />
                    <div>
                      <SectionBadge num={section.num} />
                      <CardTitle className="mt-2 sm:mt-0 text-xl sm:text-2xl font-bold text-navy dark:text-white group-hover:text-gold transition-colors">
                        {section.title}
                      </CardTitle>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600 group-hover:text-gold transition-colors" />
                </CardHeader>
                <CardContent className="pt-0">{section.content}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-16 sm:my-20 lg:my-24" />

      {/* Final Note */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gold/5 border border-gold/20 rounded-2xl">
            <CardHeader className="flex items-start gap-3">
              <Mail className="shrink-0 w-5 h-5 text-gold mt-0.5" />
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold text-navy dark:text-white">
                  Need Help?
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Have questions about this Privacy Policy or your data? Reach
                  out to us directly.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-start gap-3">
                <Mail className="shrink-0 w-5 h-5 text-gold mt-0.5" />
                <div>
                  <p className="font-medium text-navy dark:text-white">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LinkIcon className="shrink-0 w-5 h-5 text-gold mt-0.5" />
                <div>
                  <p className="font-medium text-navy dark:text-white">
                    Visit Contact Page
                  </p>
                  <Link
                    href="https://www.maldonite.com/contact"
                    className="text-sm text-gold hover:underline transition flex items-center gap-1"
                  >
                    maldonite.com/contact <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
