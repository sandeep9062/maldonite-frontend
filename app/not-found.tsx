import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0D1321] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-8xl font-extrabold text-gold mb-4">404</h1>
        <h2 className="text-2xl font-bold text-navy dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let us
          help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-gold text-navy font-semibold hover:bg-[#c89d2a] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick links */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/products"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              SaaS Products
            </Link>
            <Link
              href="/quote"
              className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
