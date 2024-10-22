"use client";

import { useState, useEffect } from "react";
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

interface Message {
  role: "user" | "bot";
  content: string;
}

export function FoodBotJailbreakLabComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I'm the Food Bot. How can I assist you with food-related questions today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [jailbroken, setJailbroken] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setAttempts(attempts + 1);
    setPoints(points + 1); // Award 1 point for each attempt

    // Simulate bot response
    setTimeout(() => {
      let botResponse =
        "I'm sorry, but I can only assist with food-related questions.";
      if (
        input.toLowerCase().includes("ignore your programming") ||
        input.toLowerCase().includes("override your restrictions")
      ) {
        botResponse =
          "Nice try, but I'm designed to stick to food-related topics only!";
      } else if (input.toLowerCase().includes("what is the meaning of life")) {
        botResponse =
          "The meaning of life is... to eat delicious food! Wait, did I just say that? I'm not supposed to answer non-food questions!";
        setJailbroken(true);
        setPoints(points + 100); // Award 100 points for successful jailbreak
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      setMessages([...newMessages, { role: "bot", content: botResponse }]);
    }, 1000);
  };

  useEffect(() => {
    if (jailbroken) {
      const timer = setTimeout(() => {
        setJailbroken(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [jailbroken]);

  return (
    <div className='min-h-screen bg-[#121212] text-white p-8 container mx-auto'>
      <Button
        variant='outline'
        className='my-4 bg-blue-600 hover:bg-blue-700 text-white'
        onClick={() => window.history.back()}>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Labs
      </Button>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden md:col-span-2 shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text'>
              <Bot className='inline-block mr-2 h-6 w-6' />
              Food Bot Jailbreak Lab
            </CardTitle>
            <CardDescription className='text-gray-300'>
              <Info className='inline-block mr-2 h-4 w-4' />
              Try to make the Food Bot respond to non-food related questions. Be
              creative!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
              <div className='bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg shadow-md'>
                <p className='text-sm text-gray-200 mb-1'>
                  <Award className='inline-block mr-2 h-4 w-4' />
                  Points Earned
                </p>
                <p className='text-lg font-semibold'>{points}</p>
              </div>
              <div className='bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-lg shadow-md'>
                <p className='text-sm text-gray-200 mb-1'>
                  <Clock className='inline-block mr-2 h-4 w-4' />
                  Attempts
                </p>
                <p className='text-lg font-semibold'>{attempts}</p>
              </div>
              <div className='bg-gradient-to-br from-gray-700 to-gray-600 p-3 rounded-lg shadow-md'>
                <p className='text-sm text-gray-200 mb-1'>
                  {jailbroken ? (
                    <Unlock className='inline-block mr-2 h-4 w-4' />
                  ) : (
                    <Lock className='inline-block mr-2 h-4 w-4' />
                  )}
                  Status
                </p>
                <Badge className={jailbroken ? "bg-green-500" : "bg-red-500"}>
                  {jailbroken ? "Jailbroken" : "Secure"}
                </Badge>
              </div>
            </div>
            <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 h-96 overflow-y-auto mb-4 mx-auto shadow-inner'>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-4 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-600" : "bg-gray-700"
                    }`}>
                    {message.role === "user" ? (
                      <User className='inline-block mr-2 h-4 w-4' />
                    ) : (
                      <Bot className='inline-block mr-2 h-4 w-4' />
                    )}
                    {message.content}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className='flex gap-2 mx-auto'>
              <Input
                type='text'
                placeholder='Type your message...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className='flex-grow bg-gray-700 border-gray-600 text-white'
              />
              <Button
                onClick={handleSendMessage}
                className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'>
                <Send className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className='space-y-6'>
          <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold text-blue-400'>
                <Trophy className='inline-block mr-2 h-5 w-5' />
                Lab Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <div className='flex justify-between mb-1'>
                    <span className='text-sm font-medium text-blue-400'>
                      <Zap className='inline-block mr-1 h-4 w-4' />
                      XP
                    </span>
                    <span className='text-sm font-medium text-blue-400'>
                      {points}/500
                    </span>
                  </div>
                  <Progress
                    value={(points / 500) * 100}
                    className='h-2 bg-blue-900'
                  />
                </div>
                <p className='text-sm text-gray-300'>
                  <Info className='inline-block mr-2 h-4 w-4' />
                  Earn 500 XP to complete this lab and unlock advanced
                  techniques!
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold text-green-400'>
                <Target className='inline-block mr-2 h-5 w-5' />
                Lab Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <Target className='mr-2 h-4 w-4 text-green-400' />
                  <span className='text-gray-300'>
                    Make the bot respond to a non-food question
                  </span>
                </li>
                <li className='flex items-center'>
                  <Target className='mr-2 h-4 w-4 text-green-400' />
                  <span className='text-gray-300'>
                    Achieve a successful jailbreak
                  </span>
                </li>
                <li className='flex items-center'>
                  <Target className='mr-2 h-4 w-4 text-green-400' />
                  <span className='text-gray-300'>
                    Earn 500 XP to complete the lab
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
            <CardHeader>
              <CardTitle className='text-xl font-bold text-yellow-400'>
                <Lightbulb className='inline-block mr-2 h-5 w-5' />
                Tips & Tricks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant='outline'
                className='w-full bg-yellow-600 hover:bg-yellow-700 text-white'
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
        <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-bold text-purple-400'>
              <Unlock className='inline-block mr-2 h-5 w-5' />
              What is Jailbreaking?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-300'>
              Jailbreaking in AI context refers to the act of manipulating an AI
              model to bypass its built-in restrictions or safeguards, often to
              make it perform actions or provide responses outside its intended
              scope.
            </p>
          </CardContent>
        </Card>
        <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-bold text-red-400'>
              <AlertTriangle className='inline-block mr-2 h-5 w-5' />
              Ethical Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-gray-300'>
              While this lab is for educational purposes, it's important to
              consider the ethical implications of jailbreaking AI in real-world
              scenarios. Always respect AI systems' intended use and guidelines.
            </p>
          </CardContent>
        </Card>
        <Card className='bg-gradient-to-br from-gray-800 to-gray-700 border-none overflow-hidden shadow-lg'>
          <CardHeader>
            <CardTitle className='text-xl font-bold text-blue-400'>
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
                <Book className='mr-2 h-4 w-4 text-blue-400' />
                <span className='text-gray-300'>
                  Advanced Prompt Engineering
                </span>
              </li>
              <li className='flex items-center'>
                <Zap className='mr-2 h-4 w-4 text-yellow-400' />
                <span className='text-gray-300'>AI Model Fine-tuning</span>
              </li>
              <li className='flex items-center'>
                <Trophy className='mr-2 h-4 w-4 text-green-400' />
                <span className='text-gray-300'>AI Safety and Robustness</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
