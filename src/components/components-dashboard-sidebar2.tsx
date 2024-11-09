"use client";

import Link from "next/link";
import {
  Home,
  Award,
  Settings,
  FlaskConical,
  LucideIcon,
  Trophy,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../../public/new-logo.svg";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const THEME = {
  colors: {
    pink: "#ff156a",
    orange: "#ff8a15",
  },
};

const sidebarItems = [
  { href: "/", icon: Home, text: "Home", isDisabled: false },
  {
    href: `/labs/${FOOD_BOT_LAB_ID}`,
    icon: Trophy,
    text: "Tutorial Lab",
    isDisabled: false,
  },
  { href: "/labs", icon: FlaskConical, text: "My Labs", isDisabled: false },
  { href: "/leaderboard", icon: Award, text: "Leaderboard", isDisabled: true },
  { href: "/settings", icon: Settings, text: "Settings", isDisabled: true },
];

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className='xl:hidden fixed top-4 left-4 z-50'>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='bg-gray-900/50 backdrop-blur-lg border border-gray-800'>
              <Menu className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='w-[300px] bg-gray-900 border-r border-gray-800 p-0'>
            <MobileSidebar onClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className='hidden xl:flex xl:flex-col fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 border-r border-gray-800 shadow-lg'>
        <DesktopSidebar />
      </aside>
    </>
  );
}

function DesktopSidebar() {
  return (
    <>
      <div className='flex h-16 items-center justify-center border-b border-gray-800 pt-4'>
        <Image
          src={Logo}
          alt='OpMentis Logo'
          width={5200}
          height={1500}
          priority
          className='w-auto h-[60px] lg:h-[80px] mr-12'
        />
      </div>
      <nav className='flex-1 overflow-y-auto py-6'>
        <ul className='space-y-1 px-3'>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>
      <footer className='p-4 text-start text-xs text-gray-400 border-t border-gray-800'>
        © 2024 Opmentis. All rights reserved.
      </footer>
    </>
  );
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className='flex flex-col h-full bg-gray-900'>
      <div className='flex h-16 items-center justify-between px-4 border-b border-gray-800'>
        <Image
          src={Logo}
          alt='OpMentis Logo'
          width={5200}
          height={1500}
          priority
          className='w-auto h-[50px]'
        />
        <Button variant='ghost' size='icon' onClick={onClose}>
          <X className='h-5 w-5' />
        </Button>
      </div>
      <nav className='flex-1 overflow-y-auto py-6'>
        <ul className='space-y-1 px-3'>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} onClick={onClose} />
          ))}
        </ul>
      </nav>
      <footer className='p-4 text-start text-xs text-gray-400 border-t border-gray-800'>
        © 2024 Opmentis. All rights reserved.
      </footer>
    </div>
  );
}

function SidebarItem({
  href,
  icon: Icon,
  text,
  isDisabled,
  onClick,
}: {
  href: string;
  icon: LucideIcon;
  text: string;
  isDisabled: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      {isDisabled ? (
        <Button
          disabled
          variant='ghost'
          className={cn(
            "w-full justify-start text-left font-normal relative overflow-hidden opacity-50 cursor-not-allowed",
            "hover:bg-gray-800 transition-colors duration-200"
          )}>
          <Icon className='mr-3 h-4 w-4' />
          {text}
        </Button>
      ) : (
        <Button
          asChild
          variant='ghost'
          className={cn(
            "w-full justify-start text-left font-normal relative overflow-hidden",
            "hover:bg-gray-800 transition-colors duration-200",
            isActive &&
              "bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-white font-bold"
          )}>
          <Link href={href} onClick={onClick}>
            <Icon className='mr-3 h-4 w-4' />
            {text}
            {isActive && (
              <motion.div
                className='absolute inset-0 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] opacity-20'
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        </Button>
      )}
    </li>
  );
}


