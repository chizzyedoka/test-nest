"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "@/app/actions/login";

import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/client";

export function Navbar() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  // const { connect } = useConnect();

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-none shadow-sm ml-64 transition-opacity duration-300`}>
      <div className='container mx-auto px-4'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='text-xl font-semibold lg:hidden'>
              <Image
                className='object-contain hidden xl:block'
                src='/Full.png'
                alt='Logo'
                width={160}
                height={80}
              />
            </div>
            <div className='hidden md:block ml-4'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='pl-8 w-[300px]'
                />
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full'></span>
              <span className='sr-only'>Notifications</span>
            </Button>
            {walletAddress ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='w-[180px] justify-start'>
                    <User className='mr-2 h-4 w-4' />
                    {walletAddress}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Transactions</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setWalletAddress(null)}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
                  isLoggedIn: async (address) => {
                    console.log("checking if logged in!", { address });
                    return await isLoggedIn();
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
            )}
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
