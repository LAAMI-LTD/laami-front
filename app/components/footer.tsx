import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-[#004d98] dark:border-[#004d98] bg-white dark:bg-gray-900 flex items-center justify-center">
                <Image
                  src="/laami.png"
                  alt="Laami Labs Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#004d98]">
                  LAAMI<span className="text-[#a50044]">LABS</span>
                </span>
                <span className="text-xs font-medium tracking-widest text-gray-600 dark:text-gray-400 uppercase -mt-0.5">
                  Building What Companies Run On
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              Building sustainable digital foundations for mission-driven
              organizations. From idea to impact—without the hassle.
            </p>
            
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:hello@laamilabs.co.ke"
                className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                aria-label="Email"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
            <a
              href="mailto:hello@laamilabs.co.ke"
              className="py-2 text-base text-neutral-800 dark:text-neutral-200 hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors break-all"
            >
              hello@laamilabs.co.ke
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-lg">
              Services
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="/portfolio#software"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="/portfolio#software"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="/portfolio#marketing"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Brand Design
                </a>
              </li>
              <li>
                <a
                  href="/portfolio#marketing"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Business Formation
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-6 text-gray-900 dark:text-white text-lg">
              Connect
            </h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <a
                  href="mailto:hello@laamilabs.co.ke"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Case Studies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Laami Labs. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-500 hover:text-[#004d98] dark:hover:text-[#004d98] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-500 hover:text-[#004d98] dark:hover:text-[#004d98] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-500 hover:text-[#004d98] dark:hover:text-[#004d98] transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
