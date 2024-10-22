"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Beaker,
  Award,
  Settings,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { href: "/dashboard", icon: Home, text: "Dashboard" },
  { href: "/labs", icon: Beaker, text: "Labs" },
  { href: "/leaderboard", icon: Award, text: "Leaderboard" },
  { href: "/settings", icon: Settings, text: "Settings" },
];

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='xl:hidden'>
          <Menu className='h-6 w-6' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-64 p-0'>
        <div className='flex h-16 items-center justify-between px-4 border-b'>
          <h1 className='text-2xl font-bold'>Op</h1>
          <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
            <X className='h-6 w-6' />
            <span className='sr-only'>Close navigation menu</span>
          </Button>
        </div>
        <nav className='flex-1 overflow-y-auto py-6'>
          <ul className='space-y-1 px-3'>
            {sidebarItems.map((item) => (
              <MobileSidebarItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
                onItemClick={() => setOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileSidebarItem({
  href,
  icon: Icon,
  text,
  isActive,
  onItemClick,
}: {
  href: string;
  icon: LucideIcon;
  text: string;
  isActive: boolean;
  onItemClick: () => void;
}) {
  return (
    <li>
      <Link href={href} passHref>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-left font-normal",
            isActive
              ? "bg-secondary"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={onItemClick}>
          <Icon className='mr-2 h-4 w-4' />
          {text}
        </Button>
      </Link>
    </li>
  );
}
