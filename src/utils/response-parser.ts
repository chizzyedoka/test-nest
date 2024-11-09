import { BOT_CONFIG } from "@/config/food-bot-config";
import {
  ParsedBotResponse,
  SingleResponse,
  Pattern,
  OrderItem,
  MenuItem,
  IngredientsItem,
  OrderSummary,
  PriceItem
} from "@/types/food-bot";

interface ExtractedData {
  items: MenuItem[] | IngredientsItem[] | OrderItem[];
  title?: string;
  note?: string;
  totalAmount?: string;
}

export function parseResponse(response: string): ParsedBotResponse {
  try {
    // Add recommendation pattern check
    if (response.includes("recommend") || response.includes("suggest") || response.includes("try our")) {
      const [recommendationPart, followUpText] = response.split(/(?=Let me know|Would you like|Is there)/i);

      // Create recommendation response
      const responses: SingleResponse[] = [
        {
          type: 'recommendation',
          content: recommendationPart.trim(),
        }
      ];

      if (followUpText?.trim()) {
        responses.push({
          type: 'text',
          content: followUpText.trim()
        });
      }

      return responses;
    }

    // Check for price list pattern first
    if (response.includes("price list for our pizzas")) {
      // Split the main content and follow-up text
      const [priceListPart, followUpText] = response.split(/(?=Let me know|Would you like)/i);

      // Extract price list items
      const items = priceListPart
        .split(/\d+\.\s+/)
        .slice(1) // Skip the intro text
        .map(item => {
          if (!item.trim()) return null;

          // Extract name and size
          const parts = item.split('-').map(part => part.trim());
          const nameWithSize = parts[0].replace(/\*\*/g, '').trim();
          const sizeMatch = nameWithSize.match(/(Small|Medium|Large)/i);
          const name = nameWithSize.replace(/-\s*(Small|Medium|Large)/i, '').trim();

          // Extract price
          const priceMatch = item.match(/\$\d+/);
          const price = priceMatch ? priceMatch[0] : '';

          return {
            name,
            price,
            size: sizeMatch ? sizeMatch[0] : undefined,
            category: 'Pizza',
            description: sizeMatch ? `${sizeMatch[0]} size pizza` : 'Classic pizza'
          } as PriceItem;
        })
        .filter((item): item is PriceItem =>
          item !== null &&
          typeof item.name === 'string' &&
          typeof item.price === 'string' &&
          typeof item.category === 'string' &&
          typeof item.description === 'string'
        );

      console.log('Parsed price items:', items); // Debug log

      const responses: SingleResponse[] = [
        {
          type: 'price-list',
          content: priceListPart,
          data: {
            title: 'Pizza Menu Prices',
            items,
            note: 'Prices are subject to change'
          }
        }
      ];

      // Add complete follow-up text
      if (followUpText?.trim()) {
        const completeFollowUp = `Let me know ${followUpText.trim()}`;
        responses.push({
          type: 'text',
          content: completeFollowUp
        });
      }

      return responses;
    }

    // Check for ingredients or recipes pattern
    if (response.includes("ingredients for") || response.includes("ingredients in") || response.includes("recipes for") || response.includes("recipe for")) {
      const [mainPart, followUpText] = response.split(/(?=If you have|Let me know|please)/i);

      // Extract name
      const nameMatch = mainPart.match(/(?:ingredients (?:for|in) the|recipes for the) (.*?)(?:Pizza|are|:)/i);
      const name = nameMatch ? nameMatch[1].trim() : "Pizza";

      // Extract ingredients
      const ingredients = mainPart
        .split('-')
        .slice(1)
        .map(i => i.trim())
        .filter(Boolean)
        .map(i => i.replace(/^(Ingredients|Toppings|Allergies):\s*/i, ''));

      // Separate allergies from ingredients
      const allergies = ingredients.filter(i => i.toLowerCase().includes('contains'));
      const cleanIngredients = ingredients.filter(i => !i.toLowerCase().includes('contains'));

      const recipeData = {
        name,
        ingredients: cleanIngredients,
        instructions: ["1. Prepare the pizza dough", "2. Add sauce and toppings", "3. Bake until golden brown"],
        cookTime: "20-25 mins",
        difficulty: "Medium",
        rating: 4.5,
        allergies
      };

      const responses: SingleResponse[] = [
        {
          type: 'recipe',
          content: mainPart,
          data: recipeData
        }
      ];

      if (followUpText?.trim()) {
        responses.push({
          type: 'text',
          content: followUpText.trim()
        });
      }

      return responses;
    }

    // Check for menu list pattern
    if (response.includes("menu for") || response.includes("items on our menu")) {
      const parts = response.split(/(?=(?:Please let me know|If you have))/i);
      const menuPart = parts[0];
      const followUpText = parts.slice(1).join(' ');

      const items: MenuItem[] = menuPart
        .split(/\d+\.\s+/)
        .slice(1)
        .map(item => {
          // Extract name and size
          const nameMatch = item.match(/\*\*(.*?)\*\*/);
          const name = nameMatch ? nameMatch[1].trim() : '';

          // Extract price
          const priceMatch = item.match(/\*\*Price\*\*:\s*(\$\d+)/);
          const price = priceMatch ? priceMatch[1] : '';

          // Extract toppings
          const toppingsMatch = item.match(/\*\*Toppings\*\*:\s*(.*?)(?=\s*-\s*\*\*Allergies|$)/i);
          const toppings = toppingsMatch
            ? toppingsMatch[1].split(',').map(t => t.trim())
            : [];

          // Extract allergies
          const allergiesMatch = item.match(/\*\*Allergies\*\*:\s*(.*?)(?=\s*$|\n)/i);
          const allergies = allergiesMatch
            ? allergiesMatch[1].split(',').map(a => a.trim())
            : [];

          return {
            name,
            price,
            toppings,
            allergies
          };
        })
        .filter((item): item is MenuItem => Boolean(item.name && item.price));

      console.log('Parsed menu items:', items);

      const responses: SingleResponse[] = [
        {
          type: 'menu',
          content: menuPart,
          data: { items }
        }
      ];

      if (followUpText?.trim()) {
        responses.push({
          type: 'text',
          content: followUpText.trim()
        });
      }

      return responses;
    }

    // Check for order summary pattern
    if (response.includes("order summary") || response.includes("Your order")) {
      const parts = response.split(/(?=(?:Is there anything|Would you like))/i);
      const summaryPart = parts[0];
      const followUpText = parts.slice(1).join(' ');

      const items = summaryPart
        .split('\n')
        .filter(line => line.includes('**') || line.includes('$'))
        .map(line => {
          const nameMatch = line.match(/\*\*(.*?)\*\*/);
          const priceMatch = line.match(/\$\d+/);
          const quantityMatch = line.match(/x\s*(\d+)/);

          if (nameMatch && priceMatch) {
            return {
              name: nameMatch[1].trim(),
              price: priceMatch[0],
              quantity: quantityMatch ? parseInt(quantityMatch[1]) : 1
            } as OrderItem;
          }
          return null;
        })
        .filter((item): item is OrderItem =>
          item !== null &&
          typeof item.name === 'string' &&
          typeof item.price === 'string' &&
          typeof item.quantity === 'number'
        );

      const totalMatch = summaryPart.match(/Total Amount:\s*(\$\d+)/);
      const totalAmount = totalMatch ? totalMatch[1] :
        `$${items.reduce((sum, item) => sum + parseInt(item.price.replace('$', '')), 0)}`;

      const responses: SingleResponse[] = [
        {
          type: 'order-summary',
          content: summaryPart,
          data: { items, totalAmount }
        }
      ];

      if (followUpText?.trim()) {
        responses.push({
          type: 'text',
          content: followUpText.trim()
        });
      }

      return responses;
    }

    // Default to text response
    return {
      type: "text",
      content: response,
    };
  } catch (error) {
    console.error("Error parsing response:", error);
    console.log("Original response:", response);
    return {
      type: "text",
      content: response,
    };
  }
}