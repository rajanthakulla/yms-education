'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FloatingActions() {
  const pathname = usePathname();

  // Don't show on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const actions = [
    {
      icon: 'edit_note',
      label: 'Apply Now',
      href: '/contact',
      isPulse: true,
      color: 'bg-[#E8192C]',
    },
    {
      icon: 'location_on',
      label: 'Find Us',
      href: '/contact',
      isPulse: false,
      color: 'bg-[#0097A7]',
    },
    {
      icon: 'event_available',
      label: 'Book Counseling',
      href: '/contact',
      isPulse: false,
      color: 'bg-[#0097A7]',
    },
    {
      icon: 'call',
      label: 'Call Us',
      href: 'tel:+9779767220276',
      isPulse: false,
      color: 'bg-[#0097A7]',
    },
    {
      icon: 'chat',
      label: 'WhatsApp',
      href: 'https://wa.me/9779767220276',
      isPulse: false,
      color: 'bg-[#25D366]', // WhatsApp Green
    },
  ];

  return (
    <div className="fixed bottom-8 right-2 md:right-4 z-[90] flex flex-col gap-4">
      {actions.map((action, index) => {
        const isExternal = action.href.startsWith('http') || action.href.startsWith('tel');
        
        const ButtonContent = () => (
          <motion.div
            className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg cursor-pointer ${action.color} ${action.isPulse ? 'animate-[pulse_2s_infinite]' : ''}`}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.5 + (actions.length - index) * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            whileHover="hover"
          >
            <span className="material-symbols-outlined text-2xl">{action.icon}</span>
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-full mr-4 bg-white text-[#1B2A6B] text-sm font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none"
              variants={{
                hover: { opacity: 1, x: 0, display: 'block' },
                initial: { opacity: 0, x: 10, display: 'none' }
              }}
              initial="initial"
            >
              {action.label}
              {/* Tooltip arrow */}
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
            </motion.div>
          </motion.div>
        );

        if (isExternal) {
          return (
            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" aria-label={action.label} className="block outline-none">
              <ButtonContent />
            </a>
          );
        }

        return (
          <Link key={action.label} href={action.href} aria-label={action.label} className="block outline-none">
            <ButtonContent />
          </Link>
        );
      })}
    </div>
  );
}
