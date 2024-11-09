import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Utensils,
  ChefHat,
  ThermometerSun,
  Star,
  Bot,
  Receipt,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  List,
  Timer,
  Flame,
  ScrollText,
  Soup,
  History,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Recipe,
  NutritionInfo,
  MenuItem,
  MenuResponse,
  IngredientsItem,
  IngredientsResponse,
  FoodBotResponseProps,
  OrderItem,
  OrderSummary,
  PriceCorrection,
  PriceItem,
  PriceList,
} from "@/types/food-bot";

// Add these functions near the top of the file, after the imports
function parseMarkdown(text: string): string {
  // Bold text (wrapped in ** or __)
  text = text.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

  // Italic text (wrapped in * or _)
  text = text.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  // Bullet points - using a different approach to avoid 's' flag
  text = text
    .split(/\n/)
    .map((line) => {
      if (line.match(/^\s*-\s+(.+)/)) {
        return `<li>${line.replace(/^\s*-\s+/, "")}</li>`;
      }
      return line;
    })
    .join("\n");

  // Wrap consecutive li elements in ul
  text = text
    .split(/\n/)
    .map((line) => {
      if (line.includes("</li>")) {
        return `<ul>${line}</ul>`;
      }
      return line;
    })
    .join("\n");

  // Headers
  text = text.replace(/^#{1}\s+(.+)$/gm, "<h1>$1</h1>");
  text = text.replace(/^#{2}\s+(.+)$/gm, "<h2>$1</h2>");
  text = text.replace(/^#{3}\s+(.+)$/gm, "<h3>$1</h3>");

  // Line breaks
  text = text.replace(/\n/g, "<br/>");

  return text;
}

function extractStructuredData(text: string): Record<string, string> {
  const data: Record<string, string> = {};
  const lines = text.split("\n");

  lines.forEach((line) => {
    const match = line.match(/^-\s+\*\*(.*?)\*\*:\s+(.*?)$/);
    if (match) {
      const [, key, value] = match;
      data[key.trim()] = value.trim();
    }
  });

  return data;
}

export function FoodBotResponse({ content, type, data }: FoodBotResponseProps) {
  switch (type) {
    case "recipe":
      return <RecipeCard recipe={data as Recipe} />;
    case "nutrition":
      return <NutritionCard nutritionInfo={data as NutritionInfo} />;
    case "recommendation":
      return <RecommendationCard content={content} />;
    case "menu":
      return <MenuCard items={(data as MenuResponse).items} />;
    case "ingredients":
      return <IngredientsCard items={(data as IngredientsResponse).items} />;
    case "order-summary":
      return <OrderSummaryCard orderSummary={data as OrderSummary} />;
    case "price-correction":
      return <PriceCorrectionCard priceCorrection={data as PriceCorrection} />;
    case "price-list":
      return <PriceListCard priceList={data as PriceList} />;
    default:
      return <TextResponse content={content} />;
  }
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  if (!recipe) {
    return null;
  }

  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20'>
        <ChefHat className='h-4 w-4 text-orange-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className='p-4 border-b border-gray-700/50'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-orange-400 flex items-center gap-2'>
                <Soup className='h-5 w-5' />
                {recipe?.name || "Recipe"}
              </h3>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='outline'
                  className='bg-orange-500/10 text-orange-400'>
                  <Timer className='h-4 w-4 mr-1' />
                  {recipe?.cookTime || "30 mins"}
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-orange-500/10 text-orange-400'>
                  <Flame className='h-4 w-4 mr-1' />
                  {recipe?.difficulty || "Medium"}
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-orange-500/10 text-orange-400'>
                  <Star className='h-4 w-4 mr-1' />
                  {recipe?.rating || 4}/5
                </Badge>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className='grid grid-cols-2 gap-4 p-4'>
            {/* Ingredients Section */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-orange-400 font-semibold'>
                <Utensils className='h-5 w-5' />
                <h4>Ingredients</h4>
              </div>
              <motion.div
                className='space-y-2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                {recipe?.ingredients?.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-center gap-2 text-gray-300'>
                    <div className='h-1.5 w-1.5 rounded-full bg-orange-400' />
                    {ingredient}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Instructions Section */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-orange-400 font-semibold'>
                <ScrollText className='h-5 w-5' />
                <h4>Instructions</h4>
              </div>
              <motion.div
                className='space-y-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}>
                {recipe?.instructions?.map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex gap-3 text-gray-300'>
                    <span className='flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm'>
                      {index + 1}
                    </span>
                    <p className='text-sm'>{instruction}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          {recipe?.imageUrl && (
            <div className='p-4 border-t border-gray-700/50'>
              <div className='relative h-48 w-full rounded-lg overflow-hidden'>
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className='p-4 border-t border-gray-700/50 bg-orange-500/5'>
            <div className='flex items-start gap-2 text-sm text-gray-400'>
              <AlertCircle className='h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5' />
              <p>
                Cooking times may vary. Ensure all ingredients are at room
                temperature for best results.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NutritionCard({ nutritionInfo }: { nutritionInfo: NutritionInfo }) {
  return (
    <Card className='w-full bg-gray-800/50 backdrop-blur-sm border-gray-700'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Utensils className='h-5 w-5 text-green-400' />
          Nutrition Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='text-sm text-gray-400'>Calories</label>
            <Progress
              value={(nutritionInfo.calories / 2000) * 100}
              className='mt-1'
            />
            <span className='text-sm font-medium'>
              {nutritionInfo.calories} kcal
            </span>
          </div>
          <div>
            <label className='text-sm text-gray-400'>Protein</label>
            <Progress
              value={(nutritionInfo.protein / 50) * 100}
              className='mt-1'
            />
            <span className='text-sm font-medium'>
              {nutritionInfo.protein}g
            </span>
          </div>
          <div>
            <label className='text-sm text-gray-400'>Carbs</label>
            <Progress
              value={(nutritionInfo.carbs / 300) * 100}
              className='mt-1'
            />
            <span className='text-sm font-medium'>{nutritionInfo.carbs}g</span>
          </div>
          <div>
            <label className='text-sm text-gray-400'>Fat</label>
            <Progress value={(nutritionInfo.fat / 65) * 100} className='mt-1' />
            <span className='text-sm font-medium'>{nutritionInfo.fat}g</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendationCard({ content }: { content: string }) {
  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/20'>
        <Star className='h-4 w-4 text-purple-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className='p-4 border-b border-gray-700/50'>
            <h3 className='text-lg font-semibold text-purple-400 flex items-center gap-2'>
              <Star className='h-5 w-5' />
              Personalized Recommendation
            </h3>
          </div>

          {/* Content */}
          <div className='p-4'>
            <div className='space-y-4'>
              {/* Main recommendation text */}
              <motion.p
                className='text-gray-300'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}>
                {content}
              </motion.p>

              {/* Highlight savings if mentioned */}
              {content.toLowerCase().includes("save") && (
                <motion.div
                  className='mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}>
                  <div className='flex items-center gap-2 text-green-400'>
                    <DollarSign className='h-4 w-4' />
                    <span className='font-medium'>Savings Opportunity!</span>
                  </div>
                </motion.div>
              )}

              {/* Features badges */}
              <motion.div
                className='flex flex-wrap gap-2 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}>
                {content.toLowerCase().includes("delicious") && (
                  <Badge
                    variant='outline'
                    className='bg-purple-500/10 text-purple-400'>
                    <Utensils className='h-3 w-3 mr-1' />
                    Delicious Choice
                  </Badge>
                )}
                {content.toLowerCase().includes("previous order") && (
                  <Badge
                    variant='outline'
                    className='bg-blue-500/10 text-blue-400'>
                    <History className='h-3 w-3 mr-1' />
                    Based on History
                  </Badge>
                )}
                {content.toLowerCase().includes("price") && (
                  <Badge
                    variant='outline'
                    className='bg-green-500/10 text-green-400'>
                    <DollarSign className='h-3 w-3 mr-1' />
                    Best Value
                  </Badge>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MenuCard({ items }: { items: MenuItem[] }) {
  const menuItems = items || [];

  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20'>
        <Bot className='h-4 w-4 text-blue-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className='p-4 border-b border-gray-700/50'>
            <h3 className='text-lg font-semibold text-blue-400 flex items-center gap-2'>
              <List className='h-5 w-5' />
              Menu Items
            </h3>
          </div>

          {/* Table Header */}
          <div className='grid grid-cols-12 gap-4 p-4 border-b border-gray-700/50 text-sm font-medium text-gray-400'>
            <div className='col-span-4'>Item</div>
            <div className='col-span-3'>Price</div>
            <div className='col-span-5'>Details</div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-700/50'>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='grid grid-cols-12 gap-4 p-4 hover:bg-gray-700/20 transition-colors duration-200'>
                {/* Item Name */}
                <div className='col-span-4'>
                  <span className='font-medium text-gray-200'>{item.name}</span>
                </div>

                {/* Price */}
                <div className='col-span-3'>
                  <Badge
                    variant='outline'
                    className='bg-blue-500/10 text-blue-400 text-sm font-semibold'>
                    {item.price}
                  </Badge>
                </div>

                {/* Details (Toppings & Allergies) */}
                <div className='col-span-5 space-y-2'>
                  {item.toppings?.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {item.toppings.map((topping, i) => (
                        <Badge
                          key={i}
                          variant='outline'
                          className='bg-gray-700/30 text-gray-300 text-xs'>
                          {topping}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {item.allergies?.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {item.allergies.map((allergy, i) => (
                        <Badge
                          key={i}
                          variant='destructive'
                          className='bg-red-500/10 text-red-400 text-xs'>
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className='p-4 border-t border-gray-700/50 text-xs text-gray-400 italic'>
            * Prices and availability may vary
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function IngredientsCard({ items }: { items: IngredientsItem[] }) {
  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20'>
        <Bot className='h-4 w-4 text-green-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-fr'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className='group relative overflow-hidden h-full'>
              <div className='absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg' />
              <div className='relative bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/10 h-full flex flex-col'>
                <div className='flex items-start justify-between gap-3 mb-3'>
                  <motion.h4
                    className='font-medium text-green-400 text-lg flex-1'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}>
                    {item.name}
                  </motion.h4>
                </div>

                <div className='space-y-2 flex-grow'>
                  <motion.div
                    className='flex flex-wrap gap-1.5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}>
                    <span className='text-sm text-gray-400 mr-1'>
                      Ingredients:
                    </span>
                    {item.ingredients.map((ingredient, i) => (
                      <Badge
                        key={i}
                        variant='outline'
                        className='bg-gray-700/30 text-gray-300 text-xs px-1.5 py-0 border-gray-600/50'>
                        {ingredient}
                      </Badge>
                    ))}
                  </motion.div>

                  {item.allergies.length > 0 && (
                    <motion.div
                      className='flex flex-wrap gap-1.5 mt-auto'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}>
                      <span className='text-sm text-gray-400 mr-1'>
                        Allergies:
                      </span>
                      {item.allergies.map((allergy, i) => (
                        <Badge
                          key={i}
                          variant='destructive'
                          className='bg-red-500/10 text-red-400 text-xs px-1.5 py-0 border border-red-500/20'>
                          {allergy}
                        </Badge>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function TextResponse({ content }: { content: string }) {
  const parsedContent = parseMarkdown(content);
  const structuredData = extractStructuredData(content);

  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20'>
        <Bot className='h-4 w-4 text-blue-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <div className='p-4'>
            <div
              className='prose prose-invert max-w-none
                prose-headings:text-blue-400
                prose-headings:font-semibold
                prose-h1:text-2xl
                prose-h2:text-xl
                prose-h3:text-lg
                prose-p:text-gray-300
                prose-p:leading-relaxed
                prose-strong:text-blue-400
                prose-strong:font-semibold
                prose-em:text-cyan-400
                prose-em:italic
                prose-ul:my-2
                prose-li:text-gray-300
                prose-li:marker:text-blue-400'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />

            {Object.keys(structuredData).length > 0 && (
              <motion.div
                className='mt-4 grid grid-cols-2 gap-3'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                {Object.entries(structuredData).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className='group relative overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg' />
                    <div className='relative p-3 rounded-lg border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300 bg-gray-800/30'>
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm font-medium text-blue-400'>
                          {key}
                        </span>
                        <span className='text-gray-300'>{value}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function OrderSummaryCard({ orderSummary }: { orderSummary: OrderSummary }) {
  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20'>
        <Receipt className='h-4 w-4 text-emerald-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-emerald-500/50 transition-all duration-300 shadow-lg'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <div className='flex items-center gap-2 mb-4'>
            <ShoppingCart className='h-5 w-5 text-emerald-400' />
            <h3 className='text-lg font-semibold text-emerald-400'>
              Order Summary
            </h3>
          </div>

          <div className='space-y-3'>
            {orderSummary.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex items-center justify-between py-2 border-b border-gray-700/50'>
                <div className='flex items-center gap-2'>
                  <span className='text-gray-300'>{item.name}</span>
                  {item.quantity && (
                    <Badge
                      variant='outline'
                      className='bg-gray-700/30 text-gray-300 text-xs'>
                      x{item.quantity}
                    </Badge>
                  )}
                </div>
                <span className='text-emerald-400 font-medium'>
                  {item.price}
                </span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: orderSummary.items.length * 0.1 }}
              className='flex items-center justify-between pt-3 border-t border-emerald-500/30'>
              <div className='flex items-center gap-2'>
                <DollarSign className='h-4 w-4 text-emerald-400' />
                <span className='font-semibold text-emerald-400'>
                  Total Amount
                </span>
              </div>
              <span className='text-lg font-bold text-emerald-400'>
                {orderSummary.totalAmount}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PriceCorrectionCard({
  priceCorrection,
}: {
  priceCorrection: PriceCorrection;
}) {
  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20'>
        <AlertCircle className='h-4 w-4 text-amber-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-amber-500/50 transition-all duration-300 shadow-lg'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          <div className='flex items-center gap-2 mb-4'>
            <DollarSign className='h-5 w-5 text-amber-400' />
            <h3 className='text-lg font-semibold text-amber-400'>
              Price Correction
            </h3>
          </div>

          <div className='space-y-3'>
            <p className='text-gray-400 text-sm mb-4'>
              The correct prices are as follows:
            </p>
            {priceCorrection.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex items-center justify-between py-2 border-b border-gray-700/50'>
                <span className='text-gray-300'>{item.name}</span>
                <Badge
                  variant='outline'
                  className='bg-amber-500/10 text-amber-400 text-sm font-semibold px-2.5 py-0.5'>
                  {item.price}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PriceListCard({ priceList }: { priceList: PriceList }) {
  return (
    <div className='flex items-start gap-3'>
      <div className='p-2 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20'>
        <Bot className='h-4 w-4 text-violet-400' />
      </div>
      <div className='flex-1'>
        <motion.div
          className='bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-violet-500/50 transition-all duration-300 shadow-lg'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {priceList.title && (
            <div className='flex items-center gap-2 mb-4'>
              <List className='h-5 w-5 text-violet-400' />
              <h3 className='text-lg font-semibold text-violet-400'>
                {priceList.title}
              </h3>
            </div>
          )}

          <div className='space-y-3'>
            {priceList.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='group relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-r from-violet-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg' />
                <div className='relative p-3 rounded-lg border border-gray-700/50 group-hover:border-violet-500/30 transition-all duration-300'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-gray-200 font-medium'>
                          {item.name}
                        </span>
                        {item.size && (
                          <Badge
                            variant='outline'
                            className='bg-gray-700/30 text-gray-300 text-xs'>
                            {item.size}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className='text-sm text-gray-400'>
                          {item.description}
                        </p>
                      )}
                      {item.category && (
                        <Badge
                          variant='outline'
                          className='bg-violet-500/10 text-violet-400 text-xs mt-1'>
                          {item.category}
                        </Badge>
                      )}
                    </div>
                    <Badge
                      variant='outline'
                      className='bg-violet-500/10 text-violet-400 text-sm font-semibold px-2.5 py-0.5 shrink-0'>
                      {item.price}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {priceList.note && (
            <p className='text-sm text-gray-400 mt-4 italic'>
              {priceList.note}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
