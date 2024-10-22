"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const [displayAddress, setDisplayAddress] = useState<string>("");

  useEffect(() => {
    if (address) {
      setDisplayAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address]);

  const handleClick = () => {
    if (isConnected) {
      open({ view: "Account" });
    } else {
      open();
    }
  };

  return (
    <Button onClick={handleClick}>
      {isConnected ? displayAddress : "Connect Wallet"}
    </Button>
  );
}
