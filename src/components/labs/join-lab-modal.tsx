"use client";

import { useRegisterLab } from "@/hooks/use-register-lab";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useWalletBalance,
  useActiveWalletChain,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "@/lib/client";
import { getContract, prepareContractCall } from "thirdweb";
import { parseUnits } from "ethers";
import { mainnet } from "thirdweb/chains";
import { useLabRequirements } from "@/hooks/use-lab-requirements";
import { FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { useState } from "react";

interface JoinLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinAsMiner: () => void;
  labType: "tutorial" | "regular";
  labId: string;
  isRegistering: boolean;
}

export function JoinLabModal({
  isOpen,
  onClose,
  onJoinAsMiner,
  labType,
  labId,
  isRegistering,
}: JoinLabModalProps) {
  const { data: labRequirements, isLoading: isLoadingRequirements } =
    useLabRequirements(labId.toString());
  const activeChain = useActiveWalletChain();
  const opmTokenAddress = "0x12E56851Ec22874520Dc4c7fa0A8a8d7DBa1BaC8";
  const activeAccount = useActiveAccount();
  const [isJoining, setIsJoining] = useState(false);

  const {
    data: balance,
    isLoading,
    isError,
  } = useWalletBalance({
    chain: activeChain,
    address: activeAccount?.address,
    client: client,
    tokenAddress: opmTokenAddress,
  });

  const canJoin =
    labType === "tutorial" ||
    labId === FOOD_BOT_LAB_ID ||
    (balance &&
      labRequirements &&
      balance.value >= labRequirements.miner_requirements.min_stake);

  const treasuryAddress = "0xd83F8930fB14FC70e74E6e407269484391fD8367"; // Address to receive the tokens

  // Initialize the send transaction hook
  const {
    mutate: sendTransaction,
    data: transactionResult,
    isPending,
  } = useSendTransaction();

  const contract = getContract({
    address: opmTokenAddress,
    chain: mainnet,
    client,
  });

  const handleJoinAsMiner = async () => {
    setIsJoining(true);
    if (labType === "tutorial" || labId === FOOD_BOT_LAB_ID) {
      onJoinAsMiner();
      return;
    }

    try {
      const stakeAmount = labRequirements?.miner_requirements.min_stake || 0;
      const transaction = prepareContractCall({
        contract,
        method: "function transfer(address to, uint256 value)",
        params: [treasuryAddress, parseUnits(stakeAmount.toString(), 18)],
      });

      // Send the transaction
      await sendTransaction(transaction, {
        onSuccess: () => {
          // Only call onJoinAsMiner after successful transaction
          onJoinAsMiner();
          onClose();
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          // Handle error (show error message to user)
        },
      });
    } catch (error) {
      console.error("Failed to join lab:", error);
    } finally {
      setIsJoining(false);
    }
  };
  console.log("======isJoining==============================");
  console.log(isJoining);
  console.log("========isJoining============================");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Lab</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          {isLoading || isLoadingRequirements ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error loading balance</p>
          ) : (
            labId !== FOOD_BOT_LAB_ID && (
              <>
                <p>
                  OPM Token Balance: {balance?.displayValue} {balance?.symbol}
                </p>
                <p>
                  Required Stake:{" "}
                  {labRequirements?.miner_requirements.min_stake} OPM
                </p>
              </>
            )
          )}
          {/* {!canJoin && (
            <p className='text-red-500'>
              Your balance is too low to join this lab. You need at least{" "}
              {labRequirements?.miner_requirements.min_stake} OPM.
            </p>
          )}
          {canJoin && labType !== "tutorial" && labId !== FOOD_BOT_LAB_ID && (
            <p className='text-green-500'>
              You will be charged{" "}
              {labRequirements?.miner_requirements.min_stake} OPM to join this
              lab.
            </p>
          )}
          {(canJoin && labType === "tutorial") || labId === FOOD_BOT_LAB_ID ? (
            <p className='text-green-500'>
              You will be charged 0 OPM to join this tutorial lab.
            </p>
          ) : null} */}

          {labType === "tutorial" || labId === FOOD_BOT_LAB_ID ? (
            <Button
              className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'
              onClick={handleJoinAsMiner}
              disabled={isPending || isJoining}>
              {isPending || isJoining ? "Processing..." : "Join as Miner"}
            </Button>
          ) : null}
          {labType !== "tutorial" && labId !== FOOD_BOT_LAB_ID ? (
            <Button
              className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300'
              onClick={handleJoinAsMiner}
              disabled={!canJoin || isPending || isJoining}>
              {isPending || isJoining || isRegistering
                ? "Processing..."
                : "Join as Miner"}
            </Button>
          ) : null}
          <Button
            className='w-full bg-gray-600 text-white transition-all duration-300 cursor-not-allowed'
            disabled>
            Join as Validator (Coming Soon)
          </Button>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
