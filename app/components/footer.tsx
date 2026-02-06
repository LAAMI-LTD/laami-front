import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-16 px-4">
      {/* Make container full width but center content */}
      <div className="w-full flex justify-center">
        <div className="w-full lg:px-5">
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
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg leading-relaxed">
                Building sustainable digital foundations for mission-driven
                organizations. From idea to impact—without the hassle.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                  </div>
                  <a
                    href="https://wa.me/254707848528"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 transition-colors"
                  >
                    WhatsApp/Call: 0707 848 528
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-500"
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
                  </div>
                  <a
                    href="mailto:hello@laamilabs.co.ke"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors break-all"
                  >
                    hello@laamilabs.co.ke
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1Zv7PtL4T3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                  aria-label="Laami Labs on Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/laamilabs?igsh=ZndvbzF2bzc5NWtr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                  aria-label="Laami Labs on Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.318.975.975 1.256 2.242 1.318 3.608.058 1.266.069 1.646.069 4.84 0 3.204-.012 3.584-.069 4.85-.062 1.366-.343 2.633-1.318 3.608-.975.975-2.242 1.256-3.608 1.318-1.266.058-1.646.069-4.85.069-3.204 0-3.584-.012-4.85-.069-1.366-.062-2.633-.343-3.608-1.318-.975-.975-1.256-2.242-1.318-3.608C2.175 15.584 2.163 15.204 2.163 12c0-3.194.012-3.574.069-4.84.062-1.366.343-2.633 1.318-3.608.975-.975 2.242-1.256 3.608-1.318C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.772.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.529 2.315 4.809.256 6.089.244 6.498.244 12c0 5.502.012 5.911.071 7.191.059 1.28.353 2.45 1.32 3.417.967.967 2.137 1.261 3.417 1.32 1.28.059 1.689.071 7.191.071 5.502 0 5.911-.012 7.191-.071 1.28-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.137 1.32-3.417.059-1.28.071-1.689.071-7.191 0-5.502-.012-5.911-.071-7.191-.059-1.28-.353-2.45-1.32-3.417-.967-.967-2.137-1.261-3.417-1.32C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@laamilabs.co.ke"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:border-[#004d98] dark:hover:border-[#004d98] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-[#004d98] dark:hover:text-[#004d98] transition-all"
                  aria-label="Email Laami Labs"
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
                    href="https://wa.me/254707848528"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#a50044] dark:hover:text-[#a50044] transition-colors inline-flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a50044] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    WhatsApp/Call
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
      </div>
    </footer>
  );
}
