import { Router } from 'express';
import { getIngredientsCtr, searchIngredientsCtr } from '../controllers';

const recipes = Router();

recipes.get('/ingredients', getIngredientsCtr);
recipes.get('/ingredients-search', searchIngredientsCtr);

export { recipes };
