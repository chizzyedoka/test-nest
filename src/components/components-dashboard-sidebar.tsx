"use client";

import Link from "next/link";
import { Home, Award, Settings, Sparkle, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const sidebarItems = [
  { href: "/dashboard", icon: Home, text: "Dashboard" },
  { href: "/labs", icon: Beaker, text: "Labs" },
  { href: "/leaderboard", icon: Award, text: "Leaderboard" },
  { href: "/settings", icon: Settings, text: "Settings" },
];

export function Sidebar() {
  return (
    <aside className='hidden xl:flex xl:flex-col fixed left-0 top-0 z-40 h-screen w-64 bg-background border-none'>
      <div className='flex h-16 items-center justify-center '>
        <Image
          className='object-contain hidden xl:block'
          src='/Full.png'
          alt='Logo'
          width={160}
          height={80}
        />
      </div>
      <nav className='flex-1 overflow-y-auto py-6'>
        <ul className='space-y-1 px-3'>
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  href,
  icon: Icon,
  text,
}: {
  href: string;
  icon: React.ElementType;
  text: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href} passHref>
        <Button
          variant='ghost'
          className={cn(
            "w-full justify-start text-left font-normal relative overflow-hidden",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground font-medium"
          )}>
          <Icon className='mr-2 h-4 w-4' />
          {text}
          {isActive && (
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Button>
      </Link>
    </li>
  );
}
