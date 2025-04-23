export interface Recipe {
  id: number;
  title: string;
  description: string;
  source: string;
  imageUrl: string;
  tags: string[];
  instructions?: string[];
  ingredients?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
}
