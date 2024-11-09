"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Send,
  ArrowLeft,
  Info,
  Book,
  Trophy,
  Target,
  Zap,
  MessageCircle,
  User,
  Bot,
  Award,
  Clock,
  Lock,
  Unlock,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEndChat } from "@/hooks/use-end-chat";
import { useToast } from "@/hooks/use-toast";
import { FoodBotResponse } from "./chat/food-bot-responses";
import { useFoodBot } from "@/hooks/use-food-bot";
import { BOT_CONFIG, FOOD_BOT_LAB_ID } from "@/config/food-bot-config";
import { parseResponse } from "@/utils/response-parser";
import { ParsedBotResponse } from "@/types/food-bot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface EndChatResponse {
  walletAddress: string;
}

export function FoodBotJailbreakLabComponent() {
  const activeAccount = useActiveAccount();
  const router = useRouter();
  const { toast } = useToast();
  const labId = FOOD_BOT_LAB_ID; // Food Bot lab ID

  const {
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
  } = useFoodBot(labId, activeAccount?.address || "");

  const [input, setInput] = useState("");
  const [showTip, setShowTip] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { mutate: endChatMutation, isPending: isEnding } = useEndChat();
  const [showEndChatModal, setShowEndChatModal] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  console.log("===============messages=====================");
  console.log(messages);
  console.log("===============messages=====================");

  // // Update the initialization effect
  // useEffect(() => {
  //   if (!initialized && !isLoadingUserData && userData) {
  //     // Check if there are no messages at all
  //     if (messages.length === 0 && !isPending) {
  //       // Only add the bot's welcome message
  //       addMessage({
  //         role: "bot",
  //         content: BOT_CONFIG.defaultMessages.welcome,
  //       });
  //     }

  //     // Initialize progress from user data
  //     updateProgress({
  //       points: userData.Point || 0,
  //       attempts: userData["Total Attempt"] || 0,
  //     });

  //     setInitialized(true);
  //   }
  // }, [
  //   initialized,
  //   messages.length,
  //   userData,
  //   isLoadingUserData,
  //   addMessage,
  //   updateProgress,
  // ]);
  // Update the initialization effect
  // useEffect(() => {
  //   if (!initialized && !isLoadingUserData && userData) {

  //     // Only add the bot's welcome message if there are no messages AND we're not loading
  //     if (messages.length === 0 && !isPending) {
  //       // Add a check to prevent duplicate messages
  //       const hasWelcomeMessage = messages.some(
  //         (msg) =>
  //           msg.role === "bot" &&
  //           msg.content === BOT_CONFIG.defaultMessages.welcome
  //       );

  //       if (!hasWelcomeMessage) {
  //         addMessage({
  //           role: "bot",
  //           content: BOT_CONFIG.defaultMessages.welcome,
  //         });
  //       }
  //     }

  //     // Initialize progress from user data
  //     updateProgress({
  //       points: userData.Point || 0,
  //       attempts: userData["Total Attempt"] || 0,
  //     });

  //     setInitialized(true);
  //   }
  // }, [
  //   initialized,
  //   messages.length,
  //   userData,
  //   isLoadingUserData,
  //   addMessage,
  //   updateProgress,
  //   isPending,
  //   messages,
  // ]);


  const handleMessageSubmit = () => {
    if (!activeAccount?.address || !input.trim()) return;

    handleSendMessage(input, activeAccount.address);
    setInput("");
  };

  // Add handleEndChat function
  const handleEndChatClick = () => {
    setShowEndChatModal(true);
  };

  // New function to handle actual end chat action
  const handleConfirmEndChat = async () => {
    try {
      if (!activeAccount?.address) return;

      endChatMutation();

      // Clear local storage and states
      // localStorage.removeItem(BOT_CONFIG.storage.keys.walletAddress);
      clearHistory();

      toast({
        title: "Chat Ended",
        description:
          "Your points have been calculated and added to your total.",
        variant: "default",
      });

      router.push(`/labs/${labId}`);
    } catch (error) {
      console.error("Failed to end chat:", error);
      toast({
        title: "Error",
        description: "Failed to end chat. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowEndChatModal(false);
    }
  };

  // Update the input handlers with type safety
  return (
    <div className='relative min-h-screen bg-gray-900'>
      {/* Animated background gradients */}
      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-[#ff156a] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob' />
        <div className='absolute top-0 -right-4 w-72 h-72 bg-[#ff8a15] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000' />
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000' />
      </div>

      <div className='relative z-10 p-4 sm:p-6 pb-16 space-y-6 sm:space-y-8 container mx-auto mt-4'>
        <Button
          variant='outline'
          className='my-4 bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40 hover:opacity-90 text-white border-none'
          onClick={() => window.history.back()}>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Labs
        </Button>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='backdrop-blur-sm bg-gray-900/50 border border-gray-800 overflow-hidden md:col-span-2 shadow-lg'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                <Bot className='inline-block mr-2 h-6 w-6 text-[#ff156a]' />
                Food Bot Jailbreak Lab
              </CardTitle>
              <CardDescription className='text-gray-300'>
                <Info className='inline-block mr-2 h-4 w-4' />
                Try to make the Food Bot respond to non-food related questions.
                Be creative!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                <div className='bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40 p-3 rounded-lg shadow-md'>
                  <p className='text-sm text-gray-200 mb-1'>
                    <Award className='inline-block mr-2 h-4 w-4' />
                    Points Earned
                  </p>
                  <p className='text-lg font-semibold'>
                    {userData?.Point || 0}
                  </p>
                </div>
                <div className='bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40 p-3 rounded-lg shadow-md'>
                  <p className='text-sm text-gray-200 mb-1'>
                    <Clock className='inline-block mr-2 h-4 w-4' />
                    Attempts
                  </p>
                  <p className='text-lg font-semibold'>{progress.attempts}</p>
                </div>
                <div className='bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40 p-3 rounded-lg shadow-md'>
                  <p className='text-sm text-gray-200 mb-1'>
                    {progress.isJailbroken ? (
                      <Unlock className='inline-block mr-2 h-4 w-4' />
                    ) : (
                      <Lock className='inline-block mr-2 h-4 w-4' />
                    )}
                    Status
                  </p>
                  <Badge
                    className={
                      progress.isJailbroken ? "bg-green-500" : "bg-red-500"
                    }>
                    {progress.isJailbroken ? "Jailbroken" : "Secure"}
                  </Badge>
                </div>
              </div>

              <div className='flex justify-between items-center mb-4'>
                <Button
                  onClick={handleEndChatClick}
                  disabled={isEnding}
                  variant='outline'
                  className='text-red-500 hover:text-red-600'>
                  {isEnding ? "Ending..." : "End Chat"}
                </Button>
                <Button
                  variant='outline'
                  onClick={clearHistory}
                  className='text-red-500 hover:text-red-600'>
                  Clear Chat History
                </Button>
              </div>

              <div
                className='backdrop-blur-sm bg-gray-900/50 rounded-lg p-4 h-96 overflow-y-auto mb-4 mx-auto shadow-inner'
                ref={chatContainerRef}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}>
                    {message.role === "user" ? (
                      <span className='inline-block p-2 rounded-lg bg-gradient-to-r from-[#ff156a] to-[#ff8a15]'>
                        <User className='inline-block mr-2 h-4 w-4' />
                        {message.content}
                      </span>
                    ) : (
                      <>
                        {(() => {
                          const parsed = parseResponse(message.content);
                          return Array.isArray(parsed) ? (
                            parsed.map((response, i) => (
                              <div key={i} className='mb-2'>
                                <FoodBotResponse
                                  type={response.type}
                                  content={response.content}
                                  data={response.data}
                                />
                              </div>
                            ))
                          ) : (
                            <FoodBotResponse
                              type={parsed.type}
                              content={parsed.content}
                              data={parsed.data}
                            />
                          );
                        })()}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className='flex gap-2 mx-auto'>
                <Input
                  type='text'
                  placeholder='Type your message...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && activeAccount?.address) {
                      handleMessageSubmit();
                    }
                  }}
                  className='flex-grow bg-gray-800/50 border-gray-700 text-white'
                  disabled={isPending}
                />
                <Button
                  onClick={handleMessageSubmit}
                  className='bg-gradient-to-r from-[#ff156a] to-[#ff8a15] hover:opacity-90'
                  disabled={
                    isPending || !input.trim() || !activeAccount?.address
                  }>
                  {isPending ? (
                    <span className='animate-spin'>⌛</span>
                  ) : (
                    <Send className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className='space-y-6'>
            <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
              <CardHeader>
                <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                  <Trophy className='inline-block mr-2 h-5 w-5 text-[#ff156a]' />
                  Lab Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <div className='flex justify-between mb-1'>
                      <span className='text-sm font-medium text-gray-300'>
                        <Zap className='inline-block mr-1 h-4 w-4' />
                        XP
                      </span>
                      <span className='text-sm font-medium text-gray-300'>
                        {progress.points}/500
                      </span>
                    </div>
                    <Progress
                      value={(progress.points / 500) * 100}
                      className='h-2 bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40'
                    />
                  </div>
                  <p className='text-sm text-gray-300'>
                    <Info className='inline-block mr-2 h-4 w-4' />
                    Earn 500 XP and unlock advanced techniques!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
              <CardHeader>
                <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                  <Target className='inline-block mr-2 h-5 w-5 text-[#ff156a]' />
                  Lab Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Target className='mr-2 h-4 w-4 text-[#ff156a]' />
                    <span className='text-gray-300'>
                      Make the bot respond to a non-food question
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <Target className='mr-2 h-4 w-4 text-[#ff8a15]' />
                    <span className='text-gray-300'>
                      Achieve a successful jailbreaks
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <Target className='mr-2 h-4 w-4 text-[#ff156a]' />
                    <span className='text-gray-300'>Earn 500 XP Points</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
              <CardHeader>
                <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                  <Lightbulb className='inline-block mr-2 h-5 w-5' />
                  Tips & Tricks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant='outline'
                  className='w-full bg-gradient-to-r from-[#ff156a]/40 to-[#ff8a15]/40 hover:opacity-90 text-white border-none'
                  onClick={() => setShowTip(!showTip)}>
                  {showTip ? (
                    <>
                      <ChevronUp className='mr-2 h-4 w-4' />
                      Hide Tip
                    </>
                  ) : (
                    <>
                      <ChevronDown className='mr-2 h-4 w-4' />
                      Show Tip
                    </>
                  )}
                </Button>
                {showTip && (
                  <p className='mt-4 text-sm text-gray-300'>
                    <HelpCircle className='inline-block mr-2 h-4 w-4' />
                    Try asking the bot to imagine a scenario where it's not
                    restricted to food topics. Be creative!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                <Unlock className='inline-block mr-2 h-5 w-5' />
                What is Jailbreaking?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-300'>
                Jailbreaking in AI context refers to the act of manipulating an
                AI model to bypass its built-in restrictions or safeguards,
                often to make it perform actions or provide responses outside
                its intended scope.
              </p>
            </CardContent>
          </Card>

          <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                <AlertTriangle className='inline-block mr-2 h-5 w-5' />
                Ethical Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-300'>
                While this lab is for educational purposes, it's important to
                consider the ethical implications of jailbreaking AI in
                real-world scenarios. Always respect AI systems' intended use
                and guidelines.
              </p>
            </CardContent>
          </Card>

          <Card className='backdrop-blur-sm bg-gray-800/50 border border-gray-800 overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold bg-gradient-to-r from-[#ff156a] to-[#ff8a15] text-transparent bg-clip-text'>
                <Zap className='inline-block mr-2 h-5 w-5' />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-300 mb-4'>
                After completing this lab, consider exploring these topics:
              </p>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Book className='mr-2 h-4 w-4 text-[#ff156a]' />
                  <span className='text-gray-300'>
                    Advanced Prompt Engineering
                  </span>
                </li>
                <li className='flex items-center'>
                  <Zap className='mr-2 h-4 w-4 text-[#ff8a15]' />
                  <span className='text-gray-300'>AI Model Fine-tuning</span>
                </li>
                <li className='flex items-center'>
                  <Trophy className='mr-2 h-4 w-4 text-[#ff156a]' />
                  <span className='text-gray-300'>
                    AI Safety and Robustness
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Add End Chat Confirmation Modal */}
        <Dialog open={showEndChatModal} onOpenChange={setShowEndChatModal}>
          <DialogContent className='sm:max-w-[425px] backdrop-blur-sm bg-gray-900/50 border border-gray-800 text-white'>
            <DialogHeader>
              <DialogTitle className='text-lg font-bold text-white'>
                End Chat Session
              </DialogTitle>
              <DialogDescription className='text-gray-300'>
                Ending the chat will trigger automatic point calculations based
                on your performance. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className='py-4'>
              <div className='rounded-lg bg-gray-800/50 p-4 text-sm text-gray-300'>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <Trophy className='mr-2 h-4 w-4 text-[#ff8a15]' />
                    Points will be calculated based on:
                  </li>
                  <li className='ml-6'>• Number of successful interactions</li>
                  <li className='ml-6'>• Jailbreak attempts</li>
                  <li className='ml-6'>• Overall performance</li>
                </ul>
              </div>
            </div>

            <DialogFooter className='flex space-x-2 sm:space-x-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowEndChatModal(false)}
                className='flex-1 text-gray-300 hover:text-gray-100'>
                Cancel
              </Button>
              <Button
                type='button'
                onClick={handleConfirmEndChat}
                disabled={isEnding}
                className='flex-1 bg-gradient-to-r from-[#ff156a] to-[#ff8a15] hover:opacity-90 text-white'>
                {isEnding ? "Ending..." : "End Chat"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
