"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Logo from "../../../public/new-logo.svg";
import { client } from "@/lib/client";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "@/app/actions/login";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({
  searchTerm,
  setSearchTerm,
  isDarkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  // const activeAccount = useActiveAccount();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800'>
      <div className='container mx-auto px-4 py-3'>
        <nav className='flex items-center justify-between gap-4'>
          <div className='flex justify-start items-center '>
            <Image
              src={Logo}
              alt='OpMentis Logo'
              width={5200}
              height={1500}
              priority
              className='w-auto h-[60px] lg:h-[80px]'
            />
          </div>
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='flex-shrink-0'>
            <h1 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>
              Prompt Mining Labs
            </h1>
          </motion.div> */}

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4 flex-1 justify-end'>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search labs...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-all duration-300 focus:ring-2 ring-purple-500/20'
              />
            </motion.div>

            <ConnectButton
              detailsModal={{
                hideBuyFunds: true,
                hideReceiveFunds: true,
                hideSendFunds: true,
                hideSwitchWallet: true,
                showTestnetFaucet: false,
              }}
              wallets={wallets}
              connectModal={{ size: "compact" }}
              client={client}
              auth={{
                isLoggedIn: async (address: string) => await isLoggedIn(),
                doLogin: async (params) => await login(params),
                getLoginPayload: async ({ address }) =>
                  generatePayload({ address }),
                doLogout: async () => {
                  localStorage.removeItem("food_bot_walletAddress");
                  await logout();
                },
              }}
            />
          </div>

          {/* Mobile Navigation */}
          <div className='flex md:hidden items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className='h-5 w-5' />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <div className='flex flex-col gap-4 pt-8'>
                  <ConnectButton
                    detailsModal={{
                      hideBuyFunds: true,
                      hideReceiveFunds: true,
                      hideSendFunds: true,
                      hideSwitchWallet: true,
                      showTestnetFaucet: false,
                    }}
                    wallets={wallets}
                    connectModal={{ size: "compact" }}
                    client={client}
                    auth={{
                      isLoggedIn: async (address: string) => await isLoggedIn(),
                      doLogin: async (params) => await login(params),
                      getLoginPayload: async ({ address }) =>
                        generatePayload({ address }),
                      doLogout: async () => {
                        localStorage.removeItem("food_bot_walletAddress");
                        await logout();
                      },
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {/* Mobile Search */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='md:hidden pt-3'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search labs...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 w-full bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
