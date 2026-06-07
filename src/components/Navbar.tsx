'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Study in Japan', href: '/study-in-japan' },
  { name: 'Language Class', href: '/language-class' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <motion.nav
        className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-[#d6dade] h-[72px] px-4 md:px-6 lg:px-8 xl:px-16 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/yms-logo-transparent.png" alt="YMS Education Logo" width={185} height={48} className="object-contain mix-blend-multiply" priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 ml-auto mr-4 xl:mr-8">
          {NAV_LINKS.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`font-noto-sans text-[12px] xl:text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'text-[#E8192C]' : 'text-[#1B2A6B] hover:text-[#E8192C]'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <Link
            href="/contact"
            className="px-6 py-2 rounded-full border-2 border-[#1B2A6B] text-[#1B2A6B] font-bold text-sm hover:bg-[#1B2A6B] hover:text-white transition-all"
          >
            BOOK FREE COUNSELING
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-[#1B2A6B] p-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[101]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[102] flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-4 flex justify-end border-b border-[#d6dade]">
                <button
                  className="text-[#1B2A6B] p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
              
              <div className="flex flex-col p-6 gap-4 overflow-y-auto">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-noto-sans font-semibold text-lg py-2 border-b border-gray-100 ${
                        isActive ? 'text-[#E8192C]' : 'text-[#1B2A6B]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                
                <div className="mt-8 flex flex-col gap-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-6 py-3 rounded-full bg-[#E8192C] text-white font-bold"
                  >
                    BOOK FREE COUNSELING
                  </Link>
                  <a
                    href="https://wa.me/9779767220276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-bold"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
