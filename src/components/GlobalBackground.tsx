'use client';

import { usePathname } from 'next/navigation';

export default function GlobalBackground() {
  const pathname = usePathname();

  // Don't show the background on the admin pages to keep the dashboard clean
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Full page background color and dots */}
      <div className="fixed inset-0 pointer-events-none z-[-2]">
        <div className="absolute inset-0 bg-[#f6fafe]"></div>
        <div className="absolute inset-0 dot-pattern"></div>
      </div>

      {/* Floating blobs restricted to the top (hero section) */}
      <div className="absolute top-0 left-0 w-full h-[80vh] overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#1B2A6B]/5 blur-3xl rounded-full floating" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#E8192C]/5 blur-3xl rounded-full floating-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-[#0097A7]/20 to-transparent rounded-full floating" style={{ animationDelay: '1s' }}></div>
        <svg className="absolute top-[60%] left-1/4 opacity-10 floating-slow" height="150" style={{ animationDelay: '3s' }} viewBox="0 0 100 100" width="150">
          <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#1B2A6B" strokeWidth="2"></path>
        </svg>
      </div>
    </>
  );
}
