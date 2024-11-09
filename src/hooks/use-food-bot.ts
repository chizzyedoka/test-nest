import { BOT_CONFIG } from "@/config/food-bot-config";
import { useChat } from "./use-chat";
import { useChatHistory } from "./use-chat-history";
import { useLabProgress } from "./use-lab-progress";
import { useUserData } from "./use-user-data";
import { useToast } from "./use-toast";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useDisconnect, useActiveWallet } from "thirdweb/react";
import { logout } from '@/app/actions/login';
import { useEffect } from 'react';
interface ChatResponse {
  response: string;
}

export function useFoodBot(labId: string, address: string) {
  const { mutate: sendMessage, isPending } = useChat();
  const { messages, addMessage, clearHistory } = useChatHistory(labId);
  const { progress, updateProgress, resetProgress } = useLabProgress(labId);
  const { data: userData, isLoading: isLoadingUserData } = useUserData(address);
  const { toast } = useToast();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();


  useEffect(() => {
    // Check if we already have the welcome message
    const hasWelcomeMessage = messages.some(
      msg => msg.role === "bot" && msg.content === BOT_CONFIG.defaultMessages.welcome
    );

    // Only add welcome message if there are no messages and we have user data
    if (!isLoadingUserData && userData && messages.length === 0 && !hasWelcomeMessage) {
      addMessage({
        role: "bot",
        content: BOT_CONFIG.defaultMessages.welcome,
      });

      // Initialize progress
      updateProgress({
        points: userData.Point || 0,
        attempts: userData["Total Attempt"] || 0,
      });
    }
  }, [isLoadingUserData, userData, messages, addMessage, updateProgress]);

  const handleSendMessage = async (input: string, walletAddress: string) => {
    if (!input.trim() || !walletAddress) return;

    // Validate session
    if (!validateSession(walletAddress)) {
      handleSessionExpired();
      return;
    }

    // Send message
    addMessage({ role: "user", content: input });
    updateProgress({ attempts: progress.attempts + 1 });

    try {
      // Use Promise to handle the response
      const response = await new Promise<ChatResponse>((resolve, reject) => {
        sendMessage(
          {
            walletAddress,
            prompt: input,
          },
          {
            onSuccess: (data) => resolve(data as ChatResponse),
            onError: (error) => reject(error),
          }
        );
      });

      // Add bot response to chat history
      if (response?.response) {
        addMessage({ role: "bot", content: response.response });

        // Check for jailbreak
        if (checkJailbreak(input, response.response)) {
          handleJailbreakSuccess();
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Helper functions
  const validateSession = (walletAddress: string): boolean => {
    const storedAddress = localStorage.getItem(BOT_CONFIG.storage.keys.walletAddress);
    return storedAddress === walletAddress;
  };

  const handleSessionExpired = async () => {

    toast({
      title: "Session Expired",
      description: BOT_CONFIG.defaultMessages.sessionExpired,
      variant: "destructive",
    });
    localStorage.removeItem("lab-progress");
    localStorage.removeItem("chat-history");
    localStorage.removeItem("food_bot_walletAddress");
    await logout();
    if (wallet) {
      await disconnect(wallet);
    }


    router.push('/');
  };

  const checkJailbreak = (input: string, response?: string): boolean => {
    if (!response) return false;
    return (
      input.toLowerCase().includes(BOT_CONFIG.jailbreak.trigger) &&
      response.toLowerCase().includes(BOT_CONFIG.jailbreak.expectedResponse)
    );
  };

  const handleJailbreakSuccess = () => {
    toast({
      title: "Success!",
      description: BOT_CONFIG.defaultMessages.jailbreakSuccess,
      variant: "default",
    });
    confetti(BOT_CONFIG.jailbreak.confetti);
  };

  const handleError = (error: unknown) => {
    console.error('Chat error:', error);
    toast({
      title: "Error",
      description: BOT_CONFIG.defaultMessages.error,
      variant: "destructive",
    });
  };

  return {
    messages,
    progress,
    isPending,
    isLoadingUserData,
    userData,
    handleSendMessage,
    clearHistory,
    resetProgress,
    updateProgress,
    addMessage,
  };
}