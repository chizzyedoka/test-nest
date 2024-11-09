export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  difficulty: string;
  rating: number;
  imageUrl?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MenuItem {
  name: string;
  price: string;
  toppings: string[];
  allergies: string[];
}

export interface MenuResponse {
  items: MenuItem[];
}

export interface IngredientsItem {
  name: string;
  ingredients: string[];
  allergies: string[];
}

export interface IngredientsResponse {
  items: IngredientsItem[];
}

export interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

export interface OrderSummary {
  items: OrderItem[];
  totalAmount: string;
}

export interface PriceCorrection {
  items: {
    name: string;
    price: string;
  }[];
}

export interface PriceItem {
  name: string;
  price: string;
  size: string | undefined;
  category: string;
  description: string;
}

export interface PriceList {
  title?: string;
  items: PriceItem[];
  note?: string;
}

export type ResponseType =
  | "recipe"
  | "nutrition"
  | "recommendation"
  | "text"
  | "menu"
  | "ingredients"
  | "order-summary"
  | "price-correction"
  | "price-list";

export interface SingleResponse {
  type: ResponseType;
  content: string;
  data?: Recipe | NutritionInfo | MenuResponse | IngredientsResponse | OrderSummary | PriceCorrection | PriceList;
}

export type ParsedBotResponse = SingleResponse | SingleResponse[];

export interface FoodBotResponseProps {
  content: string;
  type: ResponseType;
  data?: Recipe | NutritionInfo | MenuResponse | IngredientsResponse | OrderSummary | PriceCorrection | PriceList;
}

export interface Pattern {
  type: ResponseType;
  triggers: string[];
  regex: {
    split: RegExp;
    name: RegExp;
    price: RegExp;
    size: RegExp;
    followUp: RegExp;
    [key: string]: RegExp;
  };
}