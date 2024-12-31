export interface Recipe {
  id?: number;
  title: string;
  photo: string;
  ingredients: string;
  instruction: string;
  tags: string;
  description: string;
  cooktime: string;
  preptime: string;
  difficulty: string;
  ing?: string[];
}
