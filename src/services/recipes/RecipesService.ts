import ingredients, {
  Ingredient,
  Ingredients,
} from '../../databases/postgre/entities/IngredientsEnt';

export class RecipesService {
  constructor(public ingredients: Ingredients) {}

  async getIngredientsByType(payload: {
    type: Ingredient['type'];
    lastId: Ingredient['id'];
  }) {
    return this.ingredients.getByType(payload);
  }

  async searchIngredients(payload: { term: string; page: number }) {
    return this.ingredients.search(payload);
  }
}

export default new RecipesService(ingredients);
