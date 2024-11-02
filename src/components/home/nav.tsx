"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAutoConnect } from "thirdweb/react";
import { client } from "@/lib/client";

import { useActiveAccount } from "thirdweb/react";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "@/app/actions/login";

import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

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
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-lg'>
      <div className='container mx-auto px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between'>
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>
            Prompt Mining Labs
          </motion.h1>
          <div className='flex items-center space-x-4'>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <Input
                type='text'
                placeholder='Search labs...'
                className='w-full sm:w-64 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                isLoggedIn: async (address: string): Promise<boolean> => {
                  console.log("checking if logged in!", { address });
                  const result = await isLoggedIn();
                  return result;
                },
                doLogin: async (params) => {
                  console.log("logging in!");
                  await login(params);
                },
                getLoginPayload: async ({ address }) =>
                  generatePayload({ address }),
                doLogout: async () => {
                  console.log("logging out!");
                  await logout();
                },
              }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
