// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Settings, ChevronDown, User, History, Globe, CreditCard, LogOut, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
       if (
         isProfileMenuOpen &&
         !(event.target as Element).closest('button[aria-label="Profile Menu"]') &&
         !(event.target as Element).closest('div[aria-labelledby="profile-menu-button"]')
       ) {
         setIsProfileMenuOpen(false);
       }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
       window.removeEventListener('scroll', handleScroll);
       document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileMenuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out
                  ${isScrolled ? 'bg-background shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-10 py-4 flex justify-between items-center">

        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/" className="text-2xl md:text-3xl font-display text-primary cursor-pointer transition-transform duration-200 hover:scale-105">
            STREAMFLIX
          </Link>
          <div className="hidden md:flex space-x-4">
             <Link href="/" className={`font-medium transition-colors duration-200 ${isActive('/') ? 'text-primary font-semibold' : 'text-text hover:text-primary'}`}>Home</Link>
            <Link href="/series" className={`font-medium transition-colors duration-200 ${isActive('/series') ? 'text-primary font-semibold' : 'text-text hover:text-primary'}`}>Series</Link>
            <Link href="/movies" className={`font-medium transition-colors duration-200 ${isActive('/movies') ? 'text-primary font-semibold' : 'text-text hover:text-primary'}`}>Movies</Link>
            <Link href="/my-list" className={`font-medium transition-colors duration-200 ${isActive('/my-list') ? 'text-primary font-semibold' : 'text-text hover:text-primary'}`}>My List</Link>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full text-text-muted transition-all duration-300 hover:text-primary hover:shadow-neon-glow hover:scale-110 focus:outline-none focus-visible:text-primary focus-visible:shadow-neon-glow bg-transparent hover:bg-background-lighter/50"
            aria-label="Search"
          >
            <Search className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full text-text-muted transition-all duration-300 hover:text-primary hover:shadow-neon-glow hover:scale-110 focus:outline-none focus-visible:text-primary focus-visible:shadow-neon-glow bg-transparent hover:bg-background-lighter/50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="relative">
            <button
              id="profile-menu-button"
              onClick={() => setIsProfileMenuOpen(prev => !prev)}
              className="
                group flex items-center justify-center space-x-1
                cursor-pointer bg-transparent text-text-muted
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                h-8 md:h-10 w-auto px-1 md:px-2 rounded-full
                transition-all duration-300
                hover:text-primary hover:shadow-neon-glow hover:scale-110
                hover:bg-background-lighter/50
              "
              aria-label="Profile Menu"
              aria-haspopup="true"
              aria-expanded={isProfileMenuOpen}
            >
              <Settings className="h-5 w-5 md:h-6 md:w-6" />
              <ChevronDown
                className={`h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            {isProfileMenuOpen && (
              <div
                aria-labelledby="profile-menu-button"
                className="absolute top-full right-0 mt-3 w-56
                           bg-background-light border border-border
                           rounded-md shadow-lg py-2
                           focus:outline-none"
                role="menu"
              >
                <a href="#" role="menuitem" className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-background-lighter hover:text-primary rounded-md mx-1 focus:outline-none focus:bg-background-lighter focus:text-primary transition-colors duration-150">
                  <User size={18} /> <span>Profile</span>
                </a>
                <a href="#" role="menuitem" className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-background-lighter hover:text-primary rounded-md mx-1 focus:outline-none focus:bg-background-lighter focus:text-primary transition-colors duration-150">
                  <LogOut size={18} /> <span>Sign Out</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}