import { useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { parseUnits } from "ethers";

interface UseOpmTransactionProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useOpmTransaction({ onSuccess, onError }: UseOpmTransactionProps = {}) {
  const opmTokenAddress = "0x52662717e448be36Cb54588499D5A8328BD95292";
  const treasuryAddress = "YOUR_TREASURY_ADDRESS";

  const { mutate: sendTransaction, isLoading } = useSendTransaction();

  const debitOpmTokens = async (amount: number) => {
    try {
      const transaction = prepareContractCall({
        contract: {
          address: opmTokenAddress,
          abi: ["function transfer(address to, uint256 amount)"],
        },
        method: "transfer",
        params: [
          treasuryAddress,
          parseUnits(amount.toString(), 18) // Assuming 18 decimals
        ],
      });

      await sendTransaction(transaction, {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
          console.error("Transaction failed:", error);
        }
      });
    } catch (error) {
      onError?.(error as Error);
      console.error("Failed to prepare transaction:", error);
    }
  };

  return {
    debitOpmTokens,
    isLoading
  };
}