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
  User,
  Lock,
  Copyright,
  CreditCard,
  Trash2,
  Gavel,
  Send,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LAST_UPDATED = "October 29, 2026";
const CONTACT_EMAIL = "maldonitesolutions@gmail.com";

type TermsSection = {
  id: string;
  num: number;
  title: string;
  icon: React.ElementType;
  color: string;
  content: React.ReactNode;
};

const sections: TermsSection[] = [
  {
    id: "acceptance",
    num: 1,
    title: "Acceptance of Terms",
    icon: FileText,
    color: "bg-gold/10 text-gold border-gold/20",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By accessing or using maldonite.com (the "Site") or any related
          services (the "Services"), you agree to be bound by these Terms of
          Service (the "Terms"). If you do not agree, please do not use the Site
          or Services.
        </p>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We may update these Terms from time to time. Continued use of the Site
          after changes are posted means you accept the revised Terms.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    num: 2,
    title: "Eligibility",
    icon: User,
    color:
      "bg-blue/10 text-blue-600 border-blue/20 dark:text-blue-400 dark:border-blue/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        You must be at least 13 years old (or the minimum age required in your
        jurisdiction) to use the Services. If you are using the Services on
        behalf of an organization, you represent that you have the authority to
        bind that organization to these Terms.
      </p>
    ),
  },
  {
    id: "accounts",
    num: 3,
    title: "Accounts and Security",
    icon: Lock,
    color:
      "bg-emerald/10 text-emerald-600 border-emerald/20 dark:text-emerald-400 dark:border-emerald/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Some features may require you to create an account. You agree to provide
        accurate information, keep your credentials confidential, and notify us
        promptly of any unauthorized use. You are responsible for all activity
        that occurs under your account.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    num: 4,
    title: "Acceptable Use",
    icon: AlertTriangle,
    color:
      "bg-orange/10 text-orange-600 border-orange/20 dark:text-orange-400 dark:border-orange/30",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          You agree not to:
        </p>
        <ul className="space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Use the Services for any unlawful, harmful, or fraudulent purpose.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Attempt to gain unauthorized access to the Site, other accounts,
              or connected systems.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Interfere with or disrupt the integrity or performance of the
              Services.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Scrape, copy, or redistribute content in bulk without our written
              permission.
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="shrink-0 w-5 h-5 text-gold mt-0.5" />
            <span>
              Upload malicious code, or content that infringes the rights of
              others.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-content",
    num: 5,
    title: "User Content",
    icon: Users,
    color:
      "bg-indigo/10 text-indigo-600 border-indigo/20 dark:text-indigo-400 dark:border-indigo/30",
    content: (
      <>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          You retain ownership of any content you submit through the Services.
          By submitting content, you grant Maldonite a non-exclusive, worldwide,
          royalty-free license to host, store, display, and process that content
          solely as needed to operate and improve the Services.
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          You are responsible for ensuring you have the necessary rights to the
          content you submit.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    num: 6,
    title: "Intellectual Property",
    icon: Copyright,
    color:
      "bg-purple/10 text-purple-600 border-purple/20 dark:text-purple-400 dark:border-purple/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        The Site, including its design, text, graphics, logos, and software, is
        owned by Maldonite or its licensors and is protected by intellectual
        property laws. Except as expressly permitted, you may not copy, modify,
        distribute, or create derivative works from any part of the Site.
      </p>
    ),
  },
  {
    id: "payments",
    num: 7,
    title: "Payments and Refunds",
    icon: CreditCard,
    color:
      "bg-amber/10 text-amber-600 border-amber/20 dark:text-amber-400 dark:border-amber/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        If any part of the Services is paid, you agree to pay all applicable
        fees and taxes. Unless stated otherwise at the time of purchase or
        required by law, fees are non-refundable. We may change pricing with
        reasonable advance notice.
      </p>
    ),
  },
  {
    id: "third-party",
    num: 8,
    title: "Third-Party Links and Services",
    icon: LinkIcon,
    color:
      "bg-cyan/10 text-cyan-600 border-cyan/20 dark:text-cyan-400 dark:border-cyan/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        The Site may link to third-party websites or services. We do not control
        and are not responsible for their content, policies, or practices. Your
        use of third-party services is at your own risk.
      </p>
    ),
  },
  {
    id: "disclaimers",
    num: 9,
    title: "Disclaimers",
    icon: Globe,
    color:
      "bg-rose/10 text-rose-600 border-rose/20 dark:text-rose-400 dark:border-rose/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        The Site and Services are provided on an "as is" and "as available"
        basis without warranties of any kind, whether express or implied, to the
        fullest extent permissible under applicable law. Maldonite disclaims all
        warranties, including merchantability, fitness for a particular purpose,
        and non-infringement.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    num: 10,
    title: "Limitation of Liability",
    icon: Trash2,
    color:
      "bg-slate/10 text-slate-600 border-slate/20 dark:text-slate-400 dark:border-slate/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        To the fullest extent permitted by law, Maldonite shall not be liable
        for any indirect, incidental, special, consequential, or punitive
        damages, or any loss of profits or revenues, whether incurred directly
        or indirectly, or any loss of data, use, goodwill, or other intangible
        losses, arising out of or relating to your use or inability to use the
        Site or Services.
      </p>
    ),
  },
  {
    id: "indemnification",
    num: 11,
    title: "Indemnification",
    icon: Shield,
    color: "bg-gold/10 text-gold border-gold/20",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        You agree to indemnify and hold harmless Maldonite from any claims,
        damages, or expenses (including reasonable legal fees) arising from your
        violation of these Terms or your misuse of the Services.
      </p>
    ),
  },
  {
    id: "termination",
    num: 12,
    title: "Termination",
    icon: Send,
    color:
      "bg-blue/10 text-blue-600 border-blue/20 dark:text-blue-400 dark:border-blue/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We may terminate or suspend your access to the Site or Services, without
        notice or liability, for any reason, including breach of these Terms.
        Upon termination, your right to use the Services immediately ceases.
      </p>
    ),
  },
  {
    id: "governing-law",
    num: 13,
    title: "Governing Law",
    icon: Gavel,
    color:
      "bg-emerald/10 text-emerald-600 border-emerald/20 dark:text-emerald-400 dark:border-emerald/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        These Terms are governed by the laws of India, without regard to
        conflict-of-law principles. Any disputes will be resolved in the courts
        located in India.
      </p>
    ),
  },
  {
    id: "changes",
    num: 14,
    title: "Changes to These Terms",
    icon: Clock,
    color:
      "bg-purple/10 text-purple-600 border-purple/20 dark:text-purple-400 dark:border-purple/30",
    content: (
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We may revise these Terms at any time. The "Last updated" date at the
        top will reflect the most recent revision. Your continued use of the
        Site after any changes constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "contact-us",
    num: 15,
    title: "Contact Us",
    icon: Mail,
    color: "bg-gold/10 text-gold border-gold/20",
    content: (
      <>
        <p className="mb-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          If you have any questions about these Terms, please contact us at:
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

export default function TermsPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 sm:mb-8">
            <FileText className="w-4 h-4" />
            Terms of Service
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-navy dark:text-white tracking-tight leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mb-8 sm:mb-12">
            These terms govern your use of maldonite.com and our services.
            Please read them carefully before using the Site.
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
                title: "Eligibility",
                desc: "13+ years to use the Services",
                icon: User,
              },
              {
                title: "IP Rights",
                desc: "Content owned by Maldonite",
                icon: Copyright,
              },
              {
                title: "No Selling",
                desc: "We never sell your data",
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

      {/* Terms Sections */}
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
                  Have questions about these Terms? Reach out to us directly.
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
