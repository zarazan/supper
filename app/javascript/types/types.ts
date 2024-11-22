export interface Ingredient {
  id?: number;
  food_id: number;
  food_name?: string;
  measurement: string;
  _destroy?: boolean;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
}
