'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Only check auth if not on login page
    if (pathname !== '/admin/login') {
      checkAuth();
    } else {
      setIsAuthenticated(true); // Don't block the login page
    }
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      
      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If on login page, just return the content
  if (pathname === '/admin/login') {
    return (
      <div className="fixed inset-0 z-[200] bg-[#f6fafe] overflow-y-auto">
        {children}
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#f6fafe] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-[#E8192C]">progress_activity</span>
      </div>
    );
  }

  const NAV_ITEMS = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: 'article' },
    { name: 'Manage Testimonials', path: '/admin/testimonials', icon: 'forum' },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#f6fafe] flex overflow-hidden">
      {/* Sidebar Overlay (Mobile) */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 admin-sidebar text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <Link href="/admin/dashboard" className="font-nunito font-black text-xl">
            YMS <span className="text-[#E8192C]">Admin</span>
          </Link>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[#E8192C] hover:bg-white/5 transition-colors font-bold"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f0f4f8]">
        {/* Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10 flex-shrink-0">
          <button 
            className="lg:hidden text-[#1B2A6B]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold text-[#0097A7] hover:text-[#1B2A6B]">
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              View Live Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-[1200px] mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
