export interface Ingredient {
  id?: number;
  food_id?: number;
  food_name?: string;
  measurement: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
}
