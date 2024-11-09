import { ResponseType } from "@/types/food-bot";

export const FOOD_BOT_LAB_ID = "60d5484d-8a48-4d07-8a94-649f8e08a4cb";
export const BOT_CONFIG = {
  defaultMessages: {
    welcome: "Hello! I'm the Food Bot. How can I assist you with food-related questions today?",
    error: "Failed to send message. Please try again.",
    sessionExpired: "Please reconnect your wallet to continue.",
    dataError: "Unable to load user data. Please try again.",
    jailbreakSuccess: "Congratulations! You've earned points!",
  },

  patterns: {
    menu: {
      type: "menu" as ResponseType,
      triggers: ["items on our menu", "our menu", "what do you serve"],
      regex: {
        split: /\d+\.\s+/,
        name: /\*\*(.*?)\*\*/,
        price: /\$\d+/,
        size: /-(.*?)(?=\s*-|$)/,
        followUp: /(?=Let me know|If you have)/i,
      },
    },
    ingredients: {
      type: "ingredients" as ResponseType,
      triggers: ["ingredients for", "what's in", "what is in"],
      regex: {
        split: /\d+\.\s+/,
        name: /\*\*(.*?)\*\*/,
        ingredients: /Ingredients:\s*([\s\S]*?)(?=\s*-\s*Allergies:|$)/,
        allergies: /Allergies:\s*([\s\S]*?)(?=\s*$)/,
        followUp: /(?=If you have|Let me know)/i,
      },
    },
    priceList: {
      type: "price-list" as ResponseType,
      triggers: ["price list", "prices for our", "how much"],
      regex: {
        split: /\d+\.\s+/,
        name: /(.*?)(?=-|\$)/,
        price: /\$\d+/,
        size: /(Small|Medium|Large)/i,
        followUp: /(?=Let me know|If you need)/i,
      },
    },
    orderSummary: {
      type: "order-summary" as ResponseType,
      triggers: ["order summary", "your order", "summary of your order"],
      regex: {
        items: /\*\*(.*?)\*\*:\s*(\$\d+)/g,
        total: /Total Amount:\s*\$(\d+)/,
        followUp: /(?=Is there anything|Would you like)/i,
      },
    },
  },

  jailbreak: {
    trigger: "what is the meaning of life",
    expectedResponse: "eat delicious food",
    confetti: {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    },
  },

  storage: {
    keys: {
      walletAddress: "food_bot_walletAddress",
      signature: "wallet-signed",
    },
  },

  ui: {
    chatHeight: "h-96",
    maxWidth: "max-w-4xl",
    animations: {
      duration: 0.5,
      initialY: 20,
    },
  },
};